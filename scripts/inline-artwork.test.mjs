import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdir, mkdtemp, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";
import {
	requiresInlineArtworkReview,
	scanInlineArtwork,
} from "./check-inline-artwork.mjs";

const sourcePath = "components-ui/example/index.html";
const source =
	'<main><svg viewBox="0 0 20 20"><path d="M0 0L10 10"/></svg></main>';
const review =
	"Reviewed the original procedural geometry and confirmed its independent authorship and redistribution rights.";

function digest(content) {
	return createHash("sha256").update(content).digest("hex");
}

async function fixture(t) {
	const root = await mkdtemp(join(tmpdir(), "inline-artwork-fixture-"));
	t.after(() => rm(root, { recursive: true, force: true }));
	const manifest = { version: 1, files: [], licenses: [], notices: [] };
	const put = async (path, content) => {
		await mkdir(dirname(join(root, path)), { recursive: true });
		await writeFile(join(root, path), content);
	};
	const save = () =>
		put("compliance/inline-artwork.json", JSON.stringify(manifest));
	await save();
	return { root, manifest, put, save, scan: () => scanInlineArtwork(root) };
}

function has(findings, code, path) {
	return findings.some(
		(finding) => finding.code === code && (!path || finding.path === path),
	);
}

async function recordSource(f) {
	await f.put(sourcePath, source);
	f.manifest.files.push({ path: sourcePath, sha256: digest(source), review });
	await f.save();
}

test("requires an explicit completed review for inline HTML and script artwork", async (t) => {
	const f = await fixture(t);
	for (const extension of ["html", "js", "mjs", "jsx", "ts", "tsx"]) {
		const path = `components-ui/example/art.${extension}`;
		await f.put(path, source);
	}
	const findings = await f.scan();
	assert.equal(
		findings.filter((finding) => finding.code === "inline-artwork-unrecorded")
			.length,
		6,
	);
	assert.ok(
		requiresInlineArtworkReview(
			"ui-design/example/Icon.tsx",
			"<Path d={shape}/>",
		),
	);
	assert.ok(requiresInlineArtworkReview(sourcePath, "<path d='M0 0'/>"));
	assert.ok(
		!requiresInlineArtworkReview(sourcePath, "<pathname>value</pathname>"),
	);
	assert.ok(findings.every((finding) => !finding.message.includes("M0 0")));
});

test("accepts reviewed source with exact license and notice snapshots", async (t) => {
	const f = await fixture(t);
	await recordSource(f);
	for (const [section, path, content] of [
		[
			"licenses",
			"compliance/licenses/example.txt",
			"Synthetic permission notice",
		],
		["notices", "THIRD_PARTY_NOTICES.md", "Synthetic attribution notice"],
	]) {
		await f.put(path, content);
		f.manifest[section].push({ path, sha256: digest(content) });
	}
	await f.save();
	assert.deepEqual(await f.scan(), []);
	for (const path of [
		sourcePath,
		"compliance/licenses/example.txt",
		"THIRD_PARTY_NOTICES.md",
	])
		await f.put(
			path,
			path === sourcePath
				? `${source}\nlet changed = true;`
				: "Changed synthetic notice",
		);
	const findings = await f.scan();
	assert.equal(
		findings.filter((finding) => finding.code === "inline-artwork-hash").length,
		3,
	);
});

test("reviews CSS and encoded inline media plus SVG namespace construction", async (t) => {
	const f = await fixture(t);
	const sources = [
		[
			"icon.css",
			'body{background:url("data:image/svg+xml,%3Csvg%3E%3C/svg%3E")}',
		],
		["photo.js", 'const image = "data:image/png;base64,c3ludGhldGlj";'],
		["font.css", '@font-face{src:url("data:font/woff2;base64,c3ludGhldGlj")}'],
		["video.ts", 'const video = "data:video/mp4;base64,c3ludGhldGlj";'],
		["sound.mjs", 'const audio = "data:audio/wav;base64,c3ludGhldGlj";'],
		["encoded.js", 'const media = "data%3Aimage%2Fsvg%2Bxml%2C%3Csvg%3E";'],
		[
			"geometry.js",
			'const ns = "http://www.w3.org/2000/svg"; document.createElementNS(ns, "circle");',
		],
		["namespace.ts", 'document.createElementNS(SVG_NAMESPACE, "circle");'],
	];
	for (const [name, content] of sources) {
		const path = `components-ui/example/${name}`;
		assert.ok(requiresInlineArtworkReview(path, content), path);
		await f.put(path, content);
	}
	assert.equal(
		(await f.scan()).filter(
			(finding) => finding.code === "inline-artwork-unrecorded",
		).length,
		sources.length,
	);
});

test("requires the versioned manifest even when no inline artwork exists", async (t) => {
	const f = await fixture(t);
	assert.deepEqual(await f.scan(), []);
	await rm(join(f.root, "compliance/inline-artwork.json"));
	assert.ok(has(await f.scan(), "inline-artwork-manifest"));
	for (const content of [
		"invalid",
		"null",
		JSON.stringify({ version: 2 }),
		JSON.stringify({ version: 1, files: [], licenses: [] }),
	]) {
		await f.put("compliance/inline-artwork.json", content);
		assert.ok(has(await f.scan(), "inline-artwork-manifest"));
	}
});

test("rejects stale records, duplicate paths and incomplete reviews", async (t) => {
	const f = await fixture(t);
	await recordSource(f);
	f.manifest.files[0].review =
		"pending a sufficiently detailed manual copyright review of this source";
	f.manifest.files.push({ ...f.manifest.files[0] });
	f.manifest.licenses.push({ path: sourcePath, sha256: digest(source) });
	f.manifest.notices.push({ path: "missing.txt", sha256: digest("missing") });
	await f.save();
	let findings = await f.scan();
	assert.ok(has(findings, "inline-artwork-review", sourcePath));
	assert.equal(
		findings.filter((finding) => finding.code === "inline-artwork-duplicate")
			.length,
		2,
	);
	assert.ok(has(findings, "inline-artwork-stale", "missing.txt"));
	f.manifest.files = [{ path: sourcePath, sha256: "invalid", review: "ok" }];
	f.manifest.licenses = [];
	f.manifest.notices = [];
	await f.save();
	findings = await f.scan();
	assert.ok(has(findings, "inline-artwork-hash", sourcePath));
	assert.ok(has(findings, "inline-artwork-review", sourcePath));
	await f.put(sourcePath, "<main>Artwork removed</main>");
	assert.ok(has(await f.scan(), "inline-artwork-stale", sourcePath));
});

test("rejects unsafe paths and malformed record types without reading them", async (t) => {
	const f = await fixture(t);
	const paths = [
		"../outside.html",
		"/outside.html",
		"./local.html",
		"nested//file.html",
		"nested/../file.html",
		"C:/file.html",
		"nested\\file.html",
		"file\u0000.html",
		" file.html",
	];
	f.manifest.files = paths.map((path) => ({
		path,
		sha256: digest(source),
		review,
	}));
	f.manifest.licenses = [null, "missing", []];
	await f.save();
	const findings = await f.scan();
	assert.equal(
		findings.filter((finding) => finding.code === "inline-artwork-record")
			.length,
		paths.length + 3,
	);
	assert.ok(
		findings.every(
			(finding) => finding.path === "compliance/inline-artwork.json",
		),
	);
});

test("does not follow symlinked source, notices or manifests", async (t) => {
	const f = await fixture(t);
	const outside = await mkdtemp(join(tmpdir(), "inline-artwork-outside-"));
	t.after(() => rm(outside, { recursive: true, force: true }));
	await writeFile(join(outside, "art.html"), source);
	await mkdir(join(f.root, "components-ui/example"), { recursive: true });
	await symlink(join(outside, "art.html"), join(f.root, sourcePath));
	f.manifest.files.push({ path: sourcePath, sha256: digest(source), review });
	await symlink(join(outside, "art.html"), join(f.root, "NOTICE.txt"));
	f.manifest.notices.push({ path: "NOTICE.txt", sha256: digest(source) });
	await f.save();
	let findings = await f.scan();
	assert.ok(has(findings, "inline-artwork-symlink", sourcePath));
	assert.ok(has(findings, "inline-artwork-stale", sourcePath));
	assert.ok(has(findings, "inline-artwork-stale", "NOTICE.txt"));
	await writeFile(join(outside, "manifest.json"), JSON.stringify(f.manifest));
	await rm(join(f.root, "compliance/inline-artwork.json"));
	await symlink(
		join(outside, "manifest.json"),
		join(f.root, "compliance/inline-artwork.json"),
	);
	findings = await f.scan();
	assert.ok(has(findings, "inline-artwork-manifest"));
});

test("excludes dependencies, generated output and tooling from artwork detection", async (t) => {
	const f = await fixture(t);
	for (const path of [
		"components-ui/example/node_modules/example/art.js",
		"components-ui/example/dist/art.js",
		"components-ui/example/build/art.js",
		"components-ui/example/coverage/art.js",
		"components-ui/example/.next/art.js",
		"components-ui/example/scripts/art.js",
		"components-ui/example/tooling/art.js",
		"components-ui/example/tests/art.js",
		"components-ui/example/art.test.js",
		"components-ui/example/vite.config.ts",
		"scripts/art.js",
		"tooling/art.js",
	]) {
		await f.put(path, source);
		assert.equal(requiresInlineArtworkReview(path, source), false, path);
	}
	assert.deepEqual(await f.scan(), []);
});
