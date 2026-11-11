import { readFile } from "node:fs/promises";
import { isAbsolute, win32 } from "node:path";

const manifestPath = "compliance/dependency-licenses.json";
const uncertain =
	/\b(?:unknown|unverified|uncertain|unclear|pending|tbd|todo|none|n\/a|unlicensed|not supplied|not recorded|not established|not verified|no permission|no license|no redistribution|not authorized|not permitted|not allowed|not granted|not licensed|denied|forbidden|prohibited|disallowed|unauthorized|all rights reserved)\b/i;
const packageName = /^(?:@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9][a-z0-9._-]*$/;
const version = /^\d+\.\d+\.\d+(?:-[a-zA-Z0-9.-]+)?(?:\+[a-zA-Z0-9.-]+)?$/;
const exactVersion = (value) =>
	typeof value === "string" && version.test(value);
const object = (value) =>
	value !== null && typeof value === "object" && !Array.isArray(value);
const meaningful = (value) =>
	typeof value === "string" &&
	value.trim().length >= 3 &&
	!uncertain.test(value);
const safePath = (value) =>
	typeof value === "string" &&
	value.length > 0 &&
	!isAbsolute(value) &&
	!win32.isAbsolute(value) &&
	!/[\\:\x00-\x1f\x7f]/.test(value) &&
	!value.split("/").some((part) => !part || part === "." || part === "..");

function origin(value) {
	try {
		if (typeof value !== "string" || !value.startsWith("https://"))
			return false;
		const url = new URL(value);
		return (
			url.protocol === "https:" && !url.username && !url.password && !url.hash
		);
	} catch {
		return false;
	}
}

function integrity(value) {
	if (typeof value !== "string") return false;
	const match = /^sha(256|384|512)-([A-Za-z0-9+/]+={0,2})$/.exec(value);
	if (!match) return false;
	const bytes = Buffer.from(match[2], "base64");
	return (
		bytes.length === Number(match[1]) / 8 &&
		bytes.toString("base64") === match[2]
	);
}

export async function scanDependencyProvenance(files, projects, records) {
	const findings = [];
	const add = (code, path, message) => findings.push({ code, path, message });
	const registered = new Set(
		(Array.isArray(projects) ? projects : [])
			.filter(
				(project) =>
					object(project) &&
					safePath(project.path) &&
					project.status === "cleared",
			)
			.map((project) => project.path),
	);
	if (!Array.isArray(records)) {
		add(
			"npm-manifest",
			manifestPath,
			"Expected an array of reviewed direct runtime dependencies.",
		);
		return findings;
	}
	const reviewed = new Map();
	for (const record of records) {
		if (
			!object(record) ||
			!safePath(record.project) ||
			typeof record.package !== "string" ||
			!packageName.test(record.package)
		) {
			add(
				"npm-record",
				manifestPath,
				"Dependency records need a safe project path and npm package name.",
			);
			continue;
		}
		const key = `${record.project}\0${record.package}`;
		if (reviewed.has(key))
			add(
				"npm-duplicate",
				record.project,
				`Duplicate runtime dependency record: ${record.package}`,
			);
		reviewed.set(key, record);
		if (!registered.has(record.project))
			add(
				"npm-stale",
				record.project,
				`Dependency belongs to an unregistered project: ${record.package}`,
			);
		if (
			!exactVersion(record.version) ||
			!meaningful(record.license) ||
			!origin(record.origin) ||
			!meaningful(record.redistribution_permission) ||
			record.redistribution_permission.trim().length < 8 ||
			!/\b(?:license|licensed|permitted|permission|granted|authorized|redistribution|redistribute|public domain)\b/i.test(
				record.redistribution_permission,
			)
		) {
			add(
				"npm-rights",
				record.project,
				`Dependency needs an exact version, license, HTTPS origin and completed redistribution review: ${record.package}`,
			);
		}
		if (record.license_files !== undefined) {
			const seen = new Set();
			if (
				!Array.isArray(record.license_files) ||
				record.license_files.length === 0
			)
				add(
					"npm-license-file",
					record.project,
					`License file records must be a nonempty array: ${record.package}`,
				);
			for (const file of Array.isArray(record.license_files)
				? record.license_files
				: []) {
				if (
					!object(file) ||
					!safePath(file.path) ||
					!file.path.startsWith(`node_modules/${record.package}/`) ||
					typeof file.sha256 !== "string" ||
					!/^[a-f\d]{64}$/.test(file.sha256) ||
					(file.bytes !== undefined &&
						(!Number.isSafeInteger(file.bytes) || file.bytes <= 0)) ||
					(file.source_url !== undefined && !origin(file.source_url))
				) {
					add(
						"npm-license-file",
						record.project,
						`License file metadata needs a safe package-relative path and SHA-256: ${record.package}`,
					);
				} else if (seen.has(file.path))
					add(
						"npm-license-file",
						record.project,
						`Duplicate license file record: ${record.package}`,
					);
				else seen.add(file.path);
			}
		}
	}
	async function json(path) {
		try {
			if (!files.has(path)) throw new Error("Missing file");
			const value = JSON.parse(await readFile(files.get(path), "utf8"));
			if (!object(value)) throw new Error("Expected an object");
			return value;
		} catch {
			add("npm-metadata", path, "Missing or malformed npm package metadata.");
			return null;
		}
	}
	function declarations(value, path) {
		if (value === undefined) return {};
		if (
			!object(value) ||
			Object.entries(value).some(
				([name, spec]) =>
					!packageName.test(name) || typeof spec !== "string" || !spec.trim(),
			)
		) {
			add(
				"npm-metadata",
				path,
				"Runtime dependencies must map npm package names to nonempty declarations.",
			);
			return {};
		}
		return value;
	}
	const required = new Set();
	for (const project of registered) {
		const packagePath = `${project}/package.json`;
		if (!files.has(packagePath)) continue;
		const pkg = await json(packagePath);
		if (!pkg) continue;
		const declared = declarations(pkg.dependencies, packagePath);
		const optional = declarations(pkg.optionalDependencies, packagePath);
		const runtime = { ...declared, ...optional };
		if (Object.keys(runtime).length === 0) continue;
		for (const name of Object.keys(runtime))
			required.add(`${project}\0${name}`);
		const lockPath = `${project}/package-lock.json`;
		const lock = await json(lockPath);
		if (!lock) continue;
		if (
			lock.lockfileVersion !== 3 ||
			!object(lock.packages) ||
			!object(lock.packages[""])
		) {
			add(
				"npm-lock",
				lockPath,
				"Runtime dependencies require a version 3 npm lockfile with root package metadata.",
			);
			continue;
		}
		for (const [group, expected] of [
			["dependencies", declared],
			["optionalDependencies", optional],
		]) {
			const actual = declarations(lock.packages[""][group], lockPath);
			if (
				Object.keys(actual).length !== Object.keys(expected).length ||
				Object.entries(expected).some(([name, spec]) => actual[name] !== spec)
			)
				add(
					"npm-lock",
					lockPath,
					`Root ${group} differ from package.json; regenerate and review the lockfile.`,
				);
		}
		for (const name of Object.keys(runtime)) {
			const record = reviewed.get(`${project}\0${name}`);
			if (!record)
				add(
					"npm-unreviewed",
					packagePath,
					`Runtime dependency lacks a rights record: ${name}`,
				);
			const locked = lock.packages[`node_modules/${name}`];
			if (
				!object(locked) ||
				locked.link ||
				locked.dev ||
				!exactVersion(locked.version) ||
				!origin(locked.resolved) ||
				!meaningful(locked.license) ||
				!integrity(locked.integrity)
			) {
				add(
					"npm-lock",
					lockPath,
					`Runtime dependency needs a resolved production package with version, HTTPS origin, license and integrity: ${name}`,
				);
				continue;
			}
			if (
				record &&
				(record.version !== locked.version ||
					record.origin !== locked.resolved ||
					record.license !== locked.license)
			)
				add(
					"npm-review-stale",
					lockPath,
					`Locked version, origin or license changed; renew the rights review: ${name}`,
				);
		}
	}
	for (const [key, record] of reviewed)
		if (registered.has(record.project) && !required.has(key))
			add(
				"npm-stale",
				record.project,
				`Record is not a declared runtime dependency: ${record.package}`,
			);
	return findings;
}
