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
import { localGitEnvironment, scanCompliance } from "./check-compliance.mjs";

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
	await put("compliance/inline-artwork.json", {
		version: 1,
		files: [],
		licenses: [],
		notices: [],
	});
	await put("compliance/projects.json", [
		{
			path: "components-ui/example",
			status: "cleared",
			review: "Independent original CSS interaction reviewed manually.",
		},
	]);
	await put("compliance/dependency-licenses.json", []);
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

test("runs npm provenance checks through the commit and publication compliance entry point", async (t) => {
	const f = await fixture(t);
	const dependency = {
		version: "1.2.3",
		resolved:
			"https://registry.npmjs.org/example-runtime/-/example-runtime-1.2.3.tgz",
		license: "MIT",
		integrity: `sha512-${Buffer.alloc(64).toString("base64")}`,
	};
	await f.put("components-ui/example/package.json", {
		dependencies: { "example-runtime": "^1.0.0" },
	});
	const lock = {
		lockfileVersion: 3,
		packages: {
			"": { dependencies: { "example-runtime": "^1.0.0" } },
			"node_modules/example-runtime": dependency,
		},
	};
	await f.put("components-ui/example/package-lock.json", lock);
	assert.ok(has(await f.scan(), "npm-unreviewed"));
	await f.put("compliance/dependency-licenses.json", [
		{
			project: "components-ui/example",
			package: "example-runtime",
			version: dependency.version,
			license: dependency.license,
			origin: dependency.resolved,
			redistribution_permission:
				"Retains upstream license and redistribution notices.",
		},
	]);
	assert.deepEqual(await f.scan(), []);
	dependency.version = "1.2.4";
	await f.put("components-ui/example/package-lock.json", lock);
	assert.ok(has(await f.scan(), "npm-review-stale"));
});

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

test("rejects explicit media redistribution denials even when permission keywords are present", async (t) => {
	const f = await fixture(t);
	await recordAsset(
		f,
		"components-ui/example/art.svg",
		"original synthetic media",
	);
	const manifest = JSON.parse(
		await readFile(join(f.root, "ASSET_PROVENANCE.json"), "utf8"),
	);
	for (const permission of [
		"Redistribution forbidden",
		"Redistribution prohibited",
		"Original work not licensed for redistribution",
		"Permission denied",
	]) {
		manifest.assets[0].redistribution_permission = permission;
		await f.put("ASSET_PROVENANCE.json", manifest);
		assert.ok(has(await f.scan(), "asset-rights"));
	}
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
	assert.ok(has(await f.scan(), "standalone-media"));
	assert.ok(!has(await f.scan(), "build-hash"));
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

test("distinguishes JSX credit links from resource URLs and reused network requests", async (t) => {
	const f = await fixture(t);
	await f.put(
		"components-ui/example/App.tsx",
		`export default function App(){return <main><a href="https://source.example.test/license">Source</a><img src="https://cdn.example.test/art.svg"/><a href="https://cdn.example.test/shared.js">Link</a><a href="https://source.example.test/legal" style={{backgroundImage:"url(https://cdn.example.test/background.webp)"}}>Legal</a><a data-href="https://cdn.example.test/data.bin">Metadata</a></main>} fetch("https://cdn.example.test/shared.js");`,
	);
	const findings = (await f.scan()).filter(
		(r) => r.code === "unverified-runtime",
	);
	assert.equal(findings.length, 4);
	for (const resource of [
		"art.svg",
		"background.webp",
		"shared.js",
		"data.bin",
	])
		assert.ok(findings.some((r) => r.message.includes(resource)));
	assert.ok(findings.every((r) => !r.message.includes("source.example.test")));
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
	await execute("git", ["init", "--quiet"], {
		cwd: f.root,
		env: localGitEnvironment(),
	});
	await execute(
		"git",
		["add", "components-ui/example/.next", "components-ui/example/out"],
		{ cwd: f.root, env: localGitEnvironment() },
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

test("isolates fixture Git operations and tracked scans from an inherited repository", async (t) => {
	const f = await fixture(t);
	const parent = await mkdtemp(join(tmpdir(), "compliance-parent-"));
	t.after(() => rm(parent, { recursive: true, force: true }));
	const parentGit = join(parent, "parent.git");
	const parentTree = join(parent, "parent-worktree");
	await mkdir(parentTree);
	await writeFile(join(parentTree, "parent-marker.txt"), "Synthetic parent\n");
	const execute = promisify(execFile);
	await execute("git", ["init", "--bare", "--quiet", parentGit], {
		env: localGitEnvironment(),
	});
	await execute(
		"git",
		[
			"--git-dir",
			parentGit,
			"--work-tree",
			parentTree,
			"add",
			"parent-marker.txt",
		],
		{ env: localGitEnvironment() },
	);
	const configBefore = await readFile(join(parentGit, "config"));
	const indexBefore = await readFile(join(parentGit, "index"));
	await f.put(
		"components-ui/example/.next/.reference/page.html",
		"Synthetic tracked capture\n",
	);
	const moduleUrl = new URL("./check-compliance.mjs", import.meta.url).href;
	const program = `
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { localGitEnvironment, scanCompliance } from ${JSON.stringify(moduleUrl)};
const execute = promisify(execFile);
const root = process.argv[1];
await execute("git", ["init", "--quiet"], { cwd: root, env: localGitEnvironment() });
await execute("git", ["add", "components-ui/example/.next"], { cwd: root, env: localGitEnvironment() });
process.stdout.write(JSON.stringify({
  findings: await scanCompliance(root),
  pathPreserved: localGitEnvironment().PATH === process.env.PATH,
  marker: localGitEnvironment().COMPLIANCE_TEST_MARKER
}));
`;
	const child = await execute(
		process.execPath,
		["--input-type=module", "--eval", program, f.root],
		{
			env: {
				...process.env,
				GIT_DIR: parentGit,
				GIT_COMMON_DIR: parentGit,
				GIT_WORK_TREE: parentTree,
				GIT_INDEX_FILE: join(parentGit, "index"),
				GIT_OBJECT_DIRECTORY: join(parentGit, "objects"),
				GIT_ALTERNATE_OBJECT_DIRECTORIES: join(parentGit, "objects"),
				GIT_PREFIX: "inherited/prefix/",
				GIT_CONFIG_COUNT: "1",
				GIT_CONFIG_KEY_0: "core.bare",
				GIT_CONFIG_VALUE_0: "false",
				COMPLIANCE_TEST_MARKER: "synthetic-marker",
			},
		},
	);
	assert.deepEqual(await readFile(join(parentGit, "config")), configBefore);
	assert.deepEqual(await readFile(join(parentGit, "index")), indexBefore);
	const result = JSON.parse(child.stdout);
	assert.equal(result.pathPreserved, true);
	assert.equal(result.marker, "synthetic-marker");
	assert.ok(
		has(
			result.findings,
			"tracked-capture",
			"components-ui/example/.next/.reference/page.html",
		),
	);
	assert.ok(
		has(
			result.findings,
			"generated-artifact",
			"components-ui/example/.next/.reference/page.html",
		),
	);
	const { stdout } = await execute("git", ["ls-files", "-z"], {
		cwd: f.root,
		env: localGitEnvironment(),
	});
	assert.equal(stdout, "components-ui/example/.next/.reference/page.html\0");
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

test("rejects standalone media even when original ownership and exact provenance are recorded", async (t) => {
	const f = await fixture(t);
	for (const extension of ["png", "woff2", "svg", "mp4", "mp3", "zip"]) {
		const path = `components-ui/example/original.${extension}`;
		await recordAsset(f, path, "synthetic original fixture");
		assert.ok(has(await f.scan(), "standalone-media", path));
	}
	await recordAsset(f, "icon.svg", "synthetic root icon");
	assert.ok(has(await f.scan(), "standalone-media", "icon.svg"));
});

test("rejects media signatures under unrelated file extensions without a provenance bypass", async (t) => {
	const f = await fixture(t);
	await f.put(
		"components-ui/example/drawing.txt",
		'<svg xmlns="http://www.w3.org/2000/svg"><rect width="3"/></svg>',
	);
	await mkdir(join(f.root, "components-ui/example"), { recursive: true });
	await writeFile(
		join(f.root, "components-ui/example/frame.dat"),
		Buffer.from("89504e470d0a1a0a", "hex"),
	);
	for (const name of ["drawing.txt", "frame.dat"])
		assert.ok(
			has(await f.scan(), "standalone-media", `components-ui/example/${name}`),
		);
});

test("rejects tracked media missing from the working tree until its deletion is staged", async (t) => {
	const f = await fixture(t);
	const path = "components-ui/example/recording.mp4";
	await f.put(path, "synthetic recording fixture");
	const execute = promisify(execFile);
	await execute("git", ["init", "--quiet"], {
		cwd: f.root,
		env: localGitEnvironment(),
	});
	await execute("git", ["add", path], {
		cwd: f.root,
		env: localGitEnvironment(),
	});
	await rm(join(f.root, path));
	assert.ok(has(await f.scan(), "standalone-media-index", path));
	await execute("git", ["rm", "--cached", path], {
		cwd: f.root,
		env: localGitEnvironment(),
	});
	assert.ok(!has(await f.scan(), "standalone-media-index", path));
});
