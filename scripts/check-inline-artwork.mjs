import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import { isAbsolute, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const manifestPath = "compliance/inline-artwork.json";
const skippedDirectories = new Set([
	".git",
	"node_modules",
	"_site",
	"dist",
	"build",
	".next",
	"out",
	"coverage",
]);
const categories = new Set([
	"3d-games",
	"animations-loaders",
	"components-ui",
	"hero-sections",
	"landing-pages",
	"portfolios",
	"shaders",
	"templates",
	"ui-design",
]);
const toolingDirectories = new Set([
	"scripts",
	"tooling",
	"tests",
	"__tests__",
]);

function runtimePath(path) {
	return (
		categories.has(path.split("/")[0]) &&
		/\.(?:html?|css|[cm]?js|jsx|tsx?|glsl|frag|vert)$/i.test(path) &&
		!path
			.split("/")
			.some(
				(part) => skippedDirectories.has(part) || toolingDirectories.has(part),
			) &&
		!/(?:\.(?:test|spec)\.[cm]?[jt]sx?|\.d\.ts)$/i.test(path) &&
		!/(?:^|\/)[^/]*config\.[cm]?[jt]s$/i.test(path)
	);
}

export function requiresInlineArtworkReview(path, text) {
	return (
		runtimePath(path) &&
		(/\.(?:glsl|frag|vert)$/i.test(path) ||
			/\b(?:gl_FragColor|gl_FragCoord|gl_Position|fragmentShader|vertexShader)\b/.test(
				text,
			) ||
			/<(?:svg|path)(?=[\s/:>])/i.test(text) ||
			/data(?::|%3a)(?:image|font|video|audio)(?:\/|%2f)/i.test(text) ||
			(/\bcreateElementNS\s*\(/.test(text) &&
				(/http:\/\/www\.w3\.org\/2000\/svg/i.test(text) ||
					/\bcreateElementNS\s*\(\s*[\w$.]*svg[\w$.]*\s*,/i.test(text))))
	);
}

function safePath(path) {
	return (
		typeof path === "string" &&
		path.length > 0 &&
		path === path.trim() &&
		!isAbsolute(path) &&
		!/[\\\u0000-\u001f\u007f:]/.test(path) &&
		!path.split("/").some((part) => !part || part === "." || part === "..")
	);
}

function meaningfulReview(review) {
	return (
		typeof review === "string" &&
		review.trim().length >= 40 &&
		review.trim().split(/\s+/).length >= 8 &&
		!/\b(?:pending|tbd|todo|unknown|unverified|uncertain|unclear|not reviewed|not checked|n\/a)\b/i.test(
			review,
		)
	);
}

export async function scanInlineArtwork(directory, suppliedFiles) {
	const root = resolve(directory);
	const findings = [];
	const add = (code, path, message) => findings.push({ code, path, message });
	const files = suppliedFiles ?? new Map();
	async function walk(current, prefix = "") {
		for (const item of await readdir(current, { withFileTypes: true })) {
			const path = prefix ? `${prefix}/${item.name}` : item.name;
			if (skippedDirectories.has(item.name)) continue;
			if (item.isSymbolicLink()) {
				add(
					"inline-artwork-symlink",
					path,
					"Symlinks cannot substitute for reviewed source or notices.",
				);
			} else if (item.isDirectory()) await walk(join(current, item.name), path);
			else if (item.isFile()) files.set(path, join(current, item.name));
		}
	}
	if (!suppliedFiles) await walk(root);
	let manifest;
	try {
		if (!files.has(manifestPath)) throw new Error();
		manifest = JSON.parse(await readFile(files.get(manifestPath), "utf8"));
	} catch {
		add(
			"inline-artwork-manifest",
			manifestPath,
			"The required inline artwork review manifest is missing or invalid JSON.",
		);
	}
	if (
		!manifest ||
		typeof manifest !== "object" ||
		Array.isArray(manifest) ||
		manifest.version !== 1 ||
		!["files", "licenses", "notices"].every((key) =>
			Array.isArray(manifest[key]),
		)
	) {
		if (manifest !== undefined)
			add(
				"inline-artwork-manifest",
				manifestPath,
				"Expected version 1 with files, licenses and notices arrays.",
			);
		manifest = { version: 1, files: [], licenses: [], notices: [] };
	}
	const artwork = new Set();
	const reviewed = new Set();
	const seen = new Set();
	for (const [path, absolute] of files) {
		if (!runtimePath(path)) continue;
		if (requiresInlineArtworkReview(path, await readFile(absolute, "utf8")))
			artwork.add(path);
	}
	for (const section of ["files", "licenses", "notices"]) {
		for (const entry of manifest[section]) {
			if (
				!entry ||
				typeof entry !== "object" ||
				Array.isArray(entry) ||
				!safePath(entry.path)
			) {
				add(
					"inline-artwork-record",
					manifestPath,
					"Review records require a safe repository-relative file path.",
				);
				continue;
			}
			if (seen.has(entry.path))
				add(
					"inline-artwork-duplicate",
					entry.path,
					"A file can appear only once in the review manifest.",
				);
			seen.add(entry.path);
			if (section === "files") {
				reviewed.add(entry.path);
				if (!meaningfulReview(entry.review))
					add(
						"inline-artwork-review",
						entry.path,
						"Inline artwork needs a substantive completed manual review finding.",
					);
				if (!artwork.has(entry.path))
					add(
						"inline-artwork-stale",
						entry.path,
						"The recorded file is no longer project runtime containing inline artwork.",
					);
			}
			if (!files.has(entry.path)) {
				add(
					"inline-artwork-stale",
					entry.path,
					"The recorded file is missing or outside the audited source tree.",
				);
				continue;
			}
			const digest = createHash("sha256")
				.update(await readFile(files.get(entry.path)))
				.digest("hex");
			if (!/^[a-f\d]{64}$/.test(entry.sha256 ?? "") || digest !== entry.sha256)
				add(
					"inline-artwork-hash",
					entry.path,
					"File bytes changed or the SHA-256 record is invalid; renew the manual review.",
				);
		}
	}
	for (const path of artwork)
		if (!reviewed.has(path))
			add(
				"inline-artwork-unrecorded",
				path,
				"Project runtime contains inline artwork without a recorded manual review.",
			);
	return findings;
}

if (
	process.argv[1] &&
	resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
	try {
		const findings = await scanInlineArtwork(
			process.argv[2] ?? join(import.meta.dirname, ".."),
		);
		for (const finding of findings)
			process.stderr.write(
				`${finding.code}: ${finding.path}: ${finding.message}\n`,
			);
		if (findings.length) process.exitCode = 1;
		else
			process.stdout.write(
				"Inline artwork safeguards passed. Manual rights review remains required.\n",
			);
	} catch (error) {
		process.stderr.write(
			`Inline artwork scan failed: ${error.code ?? error.name}\n`,
		);
		process.exitCode = 1;
	}
}
