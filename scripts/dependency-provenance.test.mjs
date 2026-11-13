import assert from "node:assert/strict";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";
import { scanDependencyProvenance } from "./check-dependency-provenance.mjs";

async function fixture(t) {
	const root = await mkdtemp(join(tmpdir(), "dependency-provenance-"));
	t.after(() => rm(root, { recursive: true, force: true }));
	const files = new Map();
	const project = "components-ui/example";
	const projects = [{ path: project, status: "cleared" }];
	const pkg = {
		dependencies: { "@example/runtime": "^1.2.0" },
		devDependencies: { "build-only": "^9.0.0" },
	};
	const locked = {
		version: "1.2.3",
		resolved: "https://registry.npmjs.org/@example/runtime/-/runtime-1.2.3.tgz",
		license: "MIT",
		integrity: `sha512-${Buffer.alloc(64).toString("base64")}`,
	};
	const lock = {
		lockfileVersion: 3,
		packages: {
			"": structuredClone(pkg),
			"node_modules/@example/runtime": locked,
			"node_modules/build-only": { version: "9.0.0", dev: true },
		},
	};
	const record = {
		project,
		package: "@example/runtime",
		version: locked.version,
		license: locked.license,
		origin: locked.resolved,
		redistribution_permission:
			"Retains upstream license and redistribution notices.",
	};
	const records = [record];
	async function put(path, value) {
		const absolute = join(root, path);
		await mkdir(dirname(absolute), { recursive: true });
		await writeFile(
			absolute,
			typeof value === "string" ? value : JSON.stringify(value),
		);
		files.set(path, absolute);
	}
	async function scan() {
		await put(`${project}/package.json`, pkg);
		await put(`${project}/package-lock.json`, lock);
		return scanDependencyProvenance(files, projects, records);
	}
	return {
		project,
		files,
		projects,
		pkg,
		lock,
		locked,
		record,
		records,
		put,
		scan,
	};
}

const has = (findings, code) =>
	findings.some((finding) => finding.code === code);

test("accepts reviewed runtime packages without installed dependencies or development provenance", async (t) => {
	const f = await fixture(t);
	assert.deepEqual(await f.scan(), []);
	f.lock.packages["node_modules/build-only"].version = "10.0.0";
	assert.deepEqual(await f.scan(), []);
});

test("rejects an unreviewed direct dependency and stale lock versions, origins or licenses", async (t) => {
	for (const change of ["missing", "version", "resolved", "license"])
		await t.test(change, async (t) => {
			const f = await fixture(t);
			if (change === "missing") f.records.length = 0;
			else
				f.locked[change] = {
					version: "1.2.4",
					resolved: "https://packages.example.test/runtime.tgz",
					license: "Apache-2.0",
				}[change];
			assert.ok(
				has(
					await f.scan(),
					change === "missing" ? "npm-unreviewed" : "npm-review-stale",
				),
			);
		});
});

test("rejects duplicate records, unregistered projects and development-only packages", async (t) => {
	const f = await fixture(t);
	f.records.push({ ...f.record });
	assert.ok(has(await f.scan(), "npm-duplicate"));
	f.records.splice(1);
	f.record.package = "build-only";
	assert.ok(has(await f.scan(), "npm-stale"));
	f.record.project = "components-ui/unregistered";
	assert.ok(has(await f.scan(), "npm-stale"));
});

test("requires completed rights records without treating matching SPDX text as a grant", async (t) => {
	for (const field of ["license", "origin", "redistribution_permission"])
		await t.test(field, async (t) => {
			const f = await fixture(t);
			f.record[field] =
				field === "origin" ? "file:local.tgz" : "pending review";
			assert.ok(has(await f.scan(), "npm-rights"));
		});
});

test("rejects explicit denial of redistribution permission", async (t) => {
	const f = await fixture(t);
	for (const value of [
		"Permission denied",
		"Redistribution not granted",
		"No redistribution permission",
		"Redistribution forbidden",
	]) {
		f.record.redistribution_permission = value;
		assert.ok(has(await f.scan(), "npm-rights"));
	}
});

test("rejects unsafe project, package and license-file paths without reading outside registered files", async (t) => {
	for (const change of ["project", "package", "license_file"])
		await t.test(change, async (t) => {
			const f = await fixture(t);
			if (change === "project") f.record.project = "../outside";
			if (change === "package") f.record.package = "@example/../../outside";
			if (change === "license_file")
				f.record.license_files = [
					{
						path: "node_modules/@example/runtime/../outside/LICENSE",
						sha256: "a".repeat(64),
					},
				];
			assert.ok(
				has(
					await f.scan(),
					change === "license_file" ? "npm-license-file" : "npm-record",
				),
			);
		});
});

test("validates recorded license metadata without requiring node_modules", async (t) => {
	const f = await fixture(t);
	f.record.license_files = [
		{
			path: "node_modules/@example/runtime/LICENSE",
			sha256: "a".repeat(64),
			bytes: 100,
		},
	];
	assert.deepEqual(await f.scan(), []);
	f.record.license_files.push({ ...f.record.license_files[0] });
	assert.ok(has(await f.scan(), "npm-license-file"));
	f.record.license_files[0].sha256 = "invalid";
	assert.ok(has(await f.scan(), "npm-license-file"));
});

test("covers optional production dependencies with their own exact review", async (t) => {
	const f = await fixture(t);
	f.pkg.optionalDependencies = { "optional-runtime": "2.0.0" };
	f.lock.packages[""].optionalDependencies = { ...f.pkg.optionalDependencies };
	f.lock.packages["node_modules/optional-runtime"] = {
		...f.locked,
		version: "2.0.0",
		optional: true,
		resolved:
			"https://registry.npmjs.org/optional-runtime/-/optional-runtime-2.0.0.tgz",
	};
	assert.ok(has(await f.scan(), "npm-unreviewed"));
	f.records.push({
		...f.record,
		package: "optional-runtime",
		version: "2.0.0",
		origin: f.lock.packages["node_modules/optional-runtime"].resolved,
	});
	assert.deepEqual(await f.scan(), []);
});

test("rejects package declaration drift, missing direct entries and development-only resolution", async (t) => {
	for (const change of ["declaration", "missing", "dev", "link", "integrity"])
		await t.test(change, async (t) => {
			const f = await fixture(t);
			if (change === "declaration")
				f.pkg.dependencies["@example/runtime"] = "^2.0.0";
			if (change === "missing")
				delete f.lock.packages["node_modules/@example/runtime"];
			if (change === "dev") f.locked.dev = true;
			if (change === "link") f.locked.link = true;
			if (change === "integrity") f.locked.integrity = "unverified";
			assert.ok(has(await f.scan(), "npm-lock"));
		});
});

test("rejects malformed lockfiles and invalid manifest records instead of crashing", async (t) => {
	const f = await fixture(t);
	for (const bad of [null, [], {}, { lockfileVersion: 3, packages: [] }]) {
		await f.put(`${f.project}/package.json`, f.pkg);
		await f.put(`${f.project}/package-lock.json`, bad);
		assert.ok(
			(await scanDependencyProvenance(f.files, f.projects, f.records)).length >
				0,
		);
	}
	await f.put(`${f.project}/package-lock.json`, "invalid JSON");
	assert.ok(
		has(
			await scanDependencyProvenance(f.files, f.projects, f.records),
			"npm-metadata",
		),
	);
	assert.ok(
		has(
			await scanDependencyProvenance(f.files, f.projects, {}),
			"npm-manifest",
		),
	);
	f.records.push(null, [], { ...f.record, package: 123 });
	assert.ok(has(await f.scan(), "npm-record"));
});

test("rejects non-string or truncated integrity and license hashes", async (t) => {
	const f = await fixture(t);
	for (const value of [
		[f.locked.integrity],
		"sha512-YWJjZA==",
		{ sha512: "invalid" },
	]) {
		f.locked.integrity = value;
		assert.ok(has(await f.scan(), "npm-lock"));
	}
	f.record.license_files = [
		{ path: "node_modules/@example/runtime/LICENSE", sha256: ["a".repeat(64)] },
	];
	assert.ok(has(await f.scan(), "npm-license-file"));
});
