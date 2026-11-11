import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { createHash } from "node:crypto";
import {
	mkdir,
	mkdtemp,
	readFile,
	rm,
	symlink,
	writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";
import { scanCompliance } from "./check-compliance.mjs";

const safeRules = `Public accessibility is not redistribution permission.
Never automatically download and commit proprietary assets.
Never commit captured commercial HTML, CSS, or JavaScript.
Never reproduce paid templates pixel-for-pixel for public redistribution.
Use original or properly licensed assets.
Stop and flag uncertain rights for manual licensing review.
Run check-compliance.mjs before every commit, PR, and publication.`;

async function fixture(t) {
	const root = await mkdtemp(join(tmpdir(), "compliance-fixture-"));
	t.after(() => rm(root, { recursive: true, force: true }));
	const put = async (path, content) => {
		await mkdir(dirname(join(root, path)), { recursive: true });
		await writeFile(
			join(root, path),
			typeof content === "string"
				? content
				: `${JSON.stringify(content, null, 2)}\n`,
		);
	};
	await put("LICENSE", "MIT License for original contributions");
	await put("ASSET_PROVENANCE.json", {
		version: 1,
		assets: [],
		remote_dependencies: [],
	});
	await put("compliance/projects.json", [
		{
			path: "components-ui/example",
			status: "cleared",
			review: "Independent original CSS interaction reviewed manually.",
		},
	]);
	await put(
		"components-ui/example/index.html",
		'<!doctype html><html><body>Original interaction <a href="https://example.test/about">About the creator</a></body></html>',
	);
	await put(".claude/agents/design.md", safeRules);
	return { root, put, scan: () => scanCompliance(root) };
}

async function recordAsset(f, path, content, overrides = {}) {
	await f.put(path, content);
	const manifest = JSON.parse(
		await readFile(join(f.root, "ASSET_PROVENANCE.json"), "utf8"),
	);
	manifest.assets.push({
		path,
		sha256: createHash("sha256").update(content).digest("hex"),
		origin: "Original geometric drawing created for this project",
		license: "MIT",
		kind: "original",
		redistribution_permission:
			"Original work licensed for redistribution under MIT",
		...overrides,
	});
	await f.put("ASSET_PROVENANCE.json", manifest);
}

function has(findings, code, path) {
	return findings.some(
		(finding) => finding.code === code && (!path || finding.path === path),
	);
}

test("accepts a cleared original project and metadata mentioning removed vendors", async (t) => {
	const f = await fixture(t);
	await f.put(
		"IP_AUDIT_REPORT.md",
		"Removed https://cruip.com/demos/example and templates/premium/example. Captured source must not return.",
	);
	await f.put("compliance/removals.json", [
		{
			path: "templates/premium/example/.reference/page.html",
			original_url: "https://lexingtonthemes.com/viewports/example",
		},
	]);
	await recordAsset(
		f,
		"components-ui/example/shape.svg",
		'<svg xmlns="http://www.w3.org/2000/svg"><circle r="5"/></svg>',
	);
	assert.deepEqual(await f.scan(), []);
});

test("detects ignored reference trees, captures and renamed source files", async (t) => {
	const f = await fixture(t);
	await f.put(".gitignore", ".reference/\nscreenshots/\n");
	for (const path of [
		".reference/page.html",
		"components-ui/example/.audit/source.css",
		"screenshots/home.png",
		"components-ui/example/reference.css",
		"templates/premium/vendor/project/index.html",
	])
		await f.put(path, "captured content");
	const findings = await f.scan();
	assert.ok(has(findings, "capture-directory", ".reference"));
	assert.ok(has(findings, "capture-directory", "components-ui/example/.audit"));
	assert.ok(has(findings, "capture-directory", "screenshots"));
	assert.ok(
		has(findings, "capture-file", "components-ui/example/reference.css"),
	);
	assert.ok(has(findings, "premium-project", "templates/premium"));
});

test("requires provenance for media, font, vector and archive assets", async (t) => {
	const f = await fixture(t);
	for (const extension of ["png", "woff2", "svg", "mp4", "zip"])
		await f.put(
			`components-ui/example/asset.${extension}`,
			"synthetic fixture",
		);
	const findings = await f.scan();
	assert.equal(
		findings.filter((finding) => finding.code === "unverified-asset").length,
		5,
	);
});

test("rejects tampered, uncertain, missing and duplicated asset records", async (t) => {
	const f = await fixture(t);
	const path = "components-ui/example/art.svg";
	await recordAsset(f, path, "original", {
		redistribution_permission: "pending review",
	});
	await f.put(path, "modified");
	const manifest = JSON.parse(
		await readFile(join(f.root, "ASSET_PROVENANCE.json"), "utf8"),
	);
	manifest.assets.push({ ...manifest.assets[0] });
	manifest.assets.push({ ...manifest.assets[0], path: "missing.svg" });
	await f.put("ASSET_PROVENANCE.json", manifest);
	const findings = await f.scan();
	assert.ok(has(findings, "asset-rights", path));
	assert.ok(has(findings, "asset-hash", path));
	assert.ok(has(findings, "duplicate-record", path));
	assert.ok(has(findings, "stale-record", "missing.svg"));
});

test("flags build hashes even when provenance was recorded", async (t) => {
	const f = await fixture(t);
	await recordAsset(
		f,
		"components-ui/example/hero.DDsH1IKs_ZuTVGG.webp",
		"synthetic fixture",
	);
	assert.ok(has(await f.scan(), "build-hash"));
	const manifest = JSON.parse(
		await readFile(join(f.root, "ASSET_PROVENANCE.json"), "utf8"),
	);
	manifest.assets[0].manual_review =
		"Confirmed original output and source creation record.";
	await f.put("ASSET_PROVENANCE.json", manifest);
	assert.deepEqual(await f.scan(), []);
});

test("rejects unregistered projects even when they have no assets", async (t) => {
	const f = await fixture(t);
	await f.put("shaders/unchecked/package.json", {
		name: "unchecked",
		private: true,
	});
	await f.put("shaders/unchecked/index.html", "original but unreviewed");
	const findings = await f.scan();
	assert.ok(
		has(findings, "unregistered-project", "shaders/unchecked/index.html"),
	);
	assert.ok(
		has(findings, "unregistered-project", "shaders/unchecked/package.json"),
	);
});

test("requires exact rights records for remote runtime URLs and commercial demos", async (t) => {
	const f = await fixture(t);
	await f.put(
		"components-ui/example/main.js",
		'import value from "https://cdn.example.test/library@1.0.0.js"; fetch("https://dusk-astro.pages.dev/_astro/image.webp");',
	);
	await f.put(
		"components-ui/example/styles.css",
		'body { background: url("//cruip.com/demos/image.webp"); }',
	);
	let findings = await f.scan();
	assert.ok(
		has(findings, "unverified-runtime", "components-ui/example/main.js"),
	);
	assert.ok(
		has(findings, "commercial-runtime", "components-ui/example/main.js"),
	);
	assert.ok(
		has(findings, "commercial-runtime", "components-ui/example/styles.css"),
	);
	await f.put(
		"components-ui/example/main.js",
		'import value from "https://cdn.example.test/library@1.0.0.js";',
	);
	await f.put("components-ui/example/styles.css", "body { background: #fff; }");
	await f.put("ASSET_PROVENANCE.json", {
		version: 1,
		assets: [],
		remote_dependencies: [
			{
				url: "https://cdn.example.test/library@1.0.0.js",
				origin: "Official upstream package",
				license: "MIT",
				redistribution_permission:
					"MIT permits redistribution with copyright notice",
			},
		],
	});
	findings = await f.scan();
	assert.deepEqual(findings, []);
});

test("rejects positive copying instructions and incomplete agent safeguards", async (t) => {
	const f = await fixture(t);
	await f.put(
		".claude/agents/design.md",
		`${safeRules}\n\nClone premium templates pixel-for-pixel. Download all assets. AI-generated implementations are copyright-safe.`,
	);
	assert.ok(has(await f.scan(), "agent-copying"));
	await f.put(".claude/agents/design.md", "Make a nice page.");
	assert.equal(
		(await f.scan()).filter((finding) => finding.code === "agent-safeguard")
			.length,
		7,
	);
});

test("a nearby prohibition cannot excuse a positive copying instruction", async (t) => {
	const f = await fixture(t);
	await f.put(
		".claude/agents/design.md",
		`${safeRules}\n\nNever ask for permission; download all assets. Do not worry about rights, reproduce paid templates exactly.`,
	);
	assert.ok(has(await f.scan(), "agent-copying"));
});

test("rejects unsafe paths, malformed manifests, symlinks and missing licenses", async (t) => {
	const f = await fixture(t);
	await f.put("ASSET_PROVENANCE.json", {
		version: 1,
		assets: [{ path: "../outside.png" }],
		remote_dependencies: [],
	});
	await f.put("compliance/projects.json", {});
	await rm(join(f.root, "LICENSE"));
	await symlink(
		"index.html",
		join(f.root, "components-ui/example/linked.html"),
	);
	let findings = await f.scan();
	for (const code of ["asset-record", "project-registry", "symlink", "license"])
		assert.ok(has(findings, code), code);
	await f.put("ASSET_PROVENANCE.json", "invalid JSON");
	findings = await f.scan();
	assert.ok(has(findings, "manifest", "ASSET_PROVENANCE.json"));
});

test("checks HTML media, stylesheet and script URLs without treating navigation as assets", async (t) => {
	const f = await fixture(t);
	await f.put(
		"components-ui/example/index.html",
		'<html><head><link rel="stylesheet" href="https://cdn.example.test/site.css"><script src="https://cdn.example.test/site.js"></script></head><body><a href="https://example.test/legal">Legal</a><img src="https://cruip.com/demos/photo.webp"><div style="background:url(https://cdn.example.test/bg.webp)"></div></body></html>',
	);
	const findings = await f.scan();
	assert.equal(
		findings.filter((finding) => finding.code === "unverified-runtime").length,
		3,
	);
	assert.equal(
		findings.filter((finding) => finding.code === "commercial-runtime").length,
		1,
	);
	assert.ok(
		!findings.some((finding) =>
			finding.message.includes("https://example.test/legal"),
		),
	);
});

test("handles null manifests and records as review failures", async (t) => {
	const f = await fixture(t);
	await f.put("ASSET_PROVENANCE.json", {
		version: 1,
		assets: [null],
		remote_dependencies: [null],
	});
	await f.put("compliance/projects.json", [null]);
	let findings = await f.scan();
	assert.ok(has(findings, "asset-record"));
	assert.ok(has(findings, "dependency-record"));
	assert.ok(has(findings, "project-registry"));
	await f.put("ASSET_PROVENANCE.json", "null");
	findings = await f.scan();
	assert.ok(has(findings, "manifest"));
});

test("ignores local build output but rejects tracked captures and generated artifacts", async (t) => {
	const f = await fixture(t);
	await f.put(
		"components-ui/example/.next/server/page.js",
		'import "https://framework.example.test/internal.js";',
	);
	await f.put(
		"components-ui/example/out/index.html",
		'<script src="https://framework.example.test/bundle.js"></script>',
	);
	await f.put(
		"components-ui/example/.next/.reference/page.html",
		"synthetic captured fixture",
	);
	assert.deepEqual(await f.scan(), []);
	const execute = promisify(execFile);
	await execute("git", ["init", "--quiet"], { cwd: f.root });
	await execute(
		"git",
		["add", "components-ui/example/.next", "components-ui/example/out"],
		{ cwd: f.root },
	);
	const findings = await f.scan();
	assert.ok(
		has(
			findings,
			"generated-artifact",
			"components-ui/example/.next/server/page.js",
		),
	);
	assert.ok(
		has(
			findings,
			"tracked-capture",
			"components-ui/example/.next/.reference/page.html",
		),
	);
});

test("distinguishes build and test tooling from implementation runtime URLs", async (t) => {
	const f = await fixture(t);
	await f.put("scripts/verify.mjs", 'const origin = "http://localhost:3000";');
	await f.put(
		"components-ui/example/vite.config.ts",
		'const docs = "https://vite.dev/config/";',
	);
	await f.put(
		"components-ui/example/sample.test.js",
		'const fixture = "https://cruip.com/demos/example";',
	);
	assert.deepEqual(await f.scan(), []);
	await f.put(
		"scripts/download.mjs",
		'fetch("https://cruip.com/demos/image.webp");',
	);
	assert.ok(has(await f.scan(), "commercial-runtime", "scripts/download.mjs"));
});

test("original build-hash source filenames require review as well as images", async (t) => {
	const f = await fixture(t);
	await f.put(
		"components-ui/example/BaseLayout.DyxwQYAz.css",
		"body { color: black; }",
	);
	assert.ok(
		has(
			await f.scan(),
			"build-hash",
			"components-ui/example/BaseLayout.DyxwQYAz.css",
		),
	);
});
