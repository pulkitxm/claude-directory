import assert from "node:assert/strict";
import {
	mkdir,
	mkdtemp,
	readFile,
	readdir,
	rm,
	writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";
import { collectNotices, copyStaticProject } from "./build-pages.mjs";
import { verifyPublication } from "./verify-pages.mjs";

async function fixture(t) {
	const root = await mkdtemp(join(tmpdir(), "publication-fixture-"));
	t.after(() => rm(root, { recursive: true, force: true }));
	const put = async (path, text) => {
		await mkdir(dirname(join(root, path)), { recursive: true });
		await writeFile(join(root, path), text);
	};
	const projects = [{ path: "components-ui/cleared", status: "cleared" }];
	for (const name of [
		"index.html",
		"404.html",
		".nojekyll",
		"LICENSE",
		"THIRD_PARTY_NOTICES.txt",
	])
		await put(
			name,
			name === "index.html"
				? '<html><a href="components-ui/cleared/">Preview</a></html>'
				: "Original fixture metadata",
		);
	await put(
		"components-ui/cleared/index.html",
		'<html><link rel="stylesheet" href="assets/site.css"><img src="assets/art.svg"></html>',
	);
	await put(
		"components-ui/cleared/assets/site.css",
		"body { background: url(\"data:image/svg+xml,%3Csvg%3E%3Crect filter='url(%23n)'/%3E%3C/svg%3E\"); }",
	);
	await put(
		"components-ui/cleared/assets/art.svg",
		'<svg xmlns="http://www.w3.org/2000/svg"><circle r="3"/></svg>',
	);
	return {
		root,
		put,
		projects,
		verify: (options) => verifyPublication(root, projects, options),
	};
}

test("verifies nested assets and SVG data URIs without treating script templates as HTML", async (t) => {
	const f = await fixture(t);
	await f.put(
		"components-ui/cleared/index.html",
		'<html><link rel="stylesheet" href="assets/site.css"><img srcset="assets/art.svg 1x, assets/art.svg 2x"><script>const template = `<img src="assets/${name}.svg">`;</script></html>',
	);
	const result = await f.verify();
	assert.deepEqual(result.errors, []);
	assert.equal(result.checked, 4);
});

test("rejects root files, removed routes and hidden captures in the publication output", async (t) => {
	const f = await fixture(t);
	await f.put("disputed.html", "disputed fixture");
	await f.put("templates/premium/removed/index.html", "removed fixture");
	await f.put("components-ui/cleared/.reference/page.html", "captured fixture");
	const { errors } = await f.verify();
	assert.ok(
		errors.some((error) =>
			error.includes("Unapproved output file: disputed.html"),
		),
	);
	assert.ok(
		errors.some((error) =>
			error.includes("Unapproved output directory: templates"),
		),
	);
	assert.ok(errors.some((error) => error.includes("Capture in output:")));
});

test("detects missing cleared indexes, asset paths and license notices", async (t) => {
	const f = await fixture(t);
	await rm(join(f.root, "THIRD_PARTY_NOTICES.txt"));
	await rm(join(f.root, "components-ui/cleared/assets/art.svg"));
	let result = await f.verify();
	assert.ok(
		result.errors.some((error) =>
			error.includes("Missing publication metadata: THIRD_PARTY_NOTICES.txt"),
		),
	);
	assert.ok(result.errors.some((error) => error.includes("Broken reference:")));
	await rm(join(f.root, "components-ui/cleared/index.html"));
	result = await f.verify();
	assert.ok(
		result.errors.some((error) => error.includes("Missing cleared preview:")),
	);
});

test("validates exact remote assets while allowing ordinary outbound navigation", async (t) => {
	const f = await fixture(t);
	await f.put(
		"components-ui/cleared/index.html",
		'<html><a href="https://example.test/credits">Credits</a><img src="https://cdn.example.test/art.svg"></html>',
	);
	assert.equal((await f.verify()).errors.length, 1);
	assert.deepEqual(
		(
			await f.verify({
				remote_dependencies: [{ url: "https://cdn.example.test/art.svg" }],
			})
		).errors,
		[],
	);
});

test("static copying excludes tools, captures and process artifacts", async (t) => {
	const f = await fixture(t);
	for (const path of [
		"source/index.html",
		"source/assets/style.css",
		"source/assets/art.svg",
		"source/.reference/page.html",
		"source/captures/page.html",
		"source/scripts/verify.mjs",
		"source/reference.css",
		"source/report.md",
		"source/source.ts",
		"source/interaction.test.js",
		"source/THIRD_PARTY_NOTICES.txt",
		"source/unapproved.txt",
	])
		await f.put(path, "synthetic fixture");
	await copyStaticProject(join(f.root, "source"), join(f.root, "copied"));
	assert.deepEqual((await readdir(join(f.root, "copied"))).sort(), [
		"THIRD_PARTY_NOTICES.txt",
		"assets",
		"index.html",
	]);
	assert.equal(
		await readFile(join(f.root, "copied/THIRD_PARTY_NOTICES.txt"), "utf8"),
		"synthetic fixture",
	);
	assert.equal(
		await readFile(join(f.root, "copied/assets/art.svg"), "utf8"),
		"synthetic fixture",
	);
});

test("collects complete notices including hyphenated licenses, license directories and nested dependencies", async (t) => {
	const f = await fixture(t);
	const packages = [
		[
			"node_modules/package-one",
			"package-one",
			"LICENSE-MIT",
			"Permission for package one",
		],
		[
			"node_modules/@scope/package-two",
			"@scope/package-two",
			"LICENSES/MIT.txt",
			"Permission for package two",
		],
		[
			"node_modules/package-one/node_modules/nested",
			"nested",
			"NOTICE.txt",
			"Required notice for nested package",
		],
	];
	for (const [path, name, license, notice] of packages) {
		await f.put(
			`${path}/package.json`,
			JSON.stringify({ name, version: "1.0.0", license: "MIT" }),
		);
		await f.put(`${path}/${license}`, notice);
	}
	const notices = await collectNotices(f.root);
	for (const [, name, , notice] of packages) {
		assert.ok(notices.includes(`${name}@1.0.0`));
		assert.ok(notices.includes(notice));
	}
});
