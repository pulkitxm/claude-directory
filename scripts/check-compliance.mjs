import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import { lstat, readFile, readdir } from "node:fs/promises";
import { extname, isAbsolute, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { scanInlineArtwork } from "./check-inline-artwork.mjs";
import { scanDependencyProvenance } from "./check-dependency-provenance.mjs";

const skippedDirectories = new Set([
	".git",
	"node_modules",
	"_site",
	"dist",
	".next",
	"out",
]);
const generatedDirectories = new Set([
	"node_modules",
	"_site",
	"dist",
	".next",
	"out",
]);
const execute = promisify(execFile);

export function localGitEnvironment() {
	return Object.fromEntries(
		Object.entries(process.env).filter(([name]) => !name.startsWith("GIT_")),
	);
}

const captureDirectory =
	/^(?:\.reference|\.audit|\.refs?|references?|captures?|screenshots?|scraped|scrapes)$/i;
const captureFile =
	/^(?:reference|source-capture|captured-source|scraped)(?:[.-].*)?\.(?:html?|css|[cm]?js|json|png|jpe?g|webp|svg)$/i;
const mediaExtension =
	/\.(?:avif|apng|bmp|gif|ico|jpe?g|png|svg|webp|tiff?|woff2?|ttf|otf|eot|mp4|m4v|mov|webm|ogv|mp3|m4a|wav|ogg|flac|aac|pdf|wasm|glb|gltf|obj|zip|tar|gz|tgz|7z)$/i;
const runtimeExtension =
	/\.(?:html?|css|[cm]?js|jsx|tsx?|svg|glsl|frag|vert)$/i;
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
const commercialDomain =
	/(?:^|\.)(?:lexingtonthemes\.com|cruip\.com|tailwindui\.com|tailwindplus\.com|tailwindcss\.com|aceternity\.com|aceternityui\.com|shadcnblocks\.com|shipxen\.com|tailgrids\.com|themefisher\.com|nextjstemplates\.com|magicui\.design)$|(?:^|\.)(?:[a-z0-9-]+-astro)\.pages\.dev$/i;
const suspiciousHash =
	/(?:^|[._-])(?:[a-f\d]{8,}|[A-Za-z\d_-]{8})[_-]Z[A-Za-z\d_-]+(?=\.)|\.[A-Za-z\d_-]{8}(?=[_.])|(?:^|[-_.])[a-f\d]{12,}(?=[-_.])/;
const rightsUncertain =
	/\b(?:unknown|unverified|uncertain|unclear|pending|tbd|todo|none|n\/a|unlicensed|not supplied|not recorded|without permission|not established|not verified|no permission|no license|no redistribution|not authorized|not permitted|not licensed|not granted|denied|forbidden|prohibited|disallowed|all rights reserved)\b/i;
const agentRequirements = [
	"Public accessibility is not redistribution permission",
	"Never automatically download and commit proprietary",
	"Never commit captured commercial",
	"Never reproduce paid templates pixel-for-pixel",
	"original or properly licensed assets",
	"Stop and flag uncertain rights for manual licensing review",
	"check-compliance.mjs",
];
const prohibitedInstructions = [
	/pixel[- ](?:perfect|faithful|matched)|same[- ]to[- ]same|identical (?:layout|design|copy)|exact (?:clone|copy|replica)/i,
	/(?:download|vendor|copy|extract|scrape|capture)\b.{0,60}\b(?:all assets|every asset|original assets|commercial (?:HTML|CSS|JavaScript|source)|proprietary assets)/i,
	/(?:reproduce|clone|replicate)\b.{0,45}\b(?:paid|premium|commercial)\b/i,
	/(?:AI[- ]generated|generated (?:code|implementations?))\b.{0,60}\b(?:automatically safe|copyright[- ]safe|free of third[- ]party rights|no copyright)/i,
];

function meaningful(value) {
	return (
		typeof value === "string" &&
		value.trim().length >= 3 &&
		!rightsUncertain.test(value)
	);
}

function permission(value) {
	return (
		value === true ||
		(meaningful(value) &&
			value.trim().length >= 8 &&
			/\b(?:permits?|allowed|granted|authorized|licensed|MIT|public domain|CC0|original|redistribution|redistribute)\b/i.test(
				value,
			))
	);
}

function safePath(value) {
	return (
		typeof value === "string" &&
		value.length > 0 &&
		!isAbsolute(value) &&
		!value.includes("\\") &&
		!value.split("/").some((part) => !part || part === "." || part === "..")
	);
}

function toolingPath(path) {
	return (
		/(?:^|\/)(?:scripts|tests|__tests__)\//.test(path) ||
		/(?:\.(?:test|spec)\.[cm]?[jt]sx?|\.d\.ts)$/.test(path) ||
		/(?:^|\/)[^/]*config\.[cm]?[jt]s$/.test(path)
	);
}

function runtimeUrls(text, path) {
	if (/\.[jt]sx$/i.test(path)) {
		text = text.replace(/<a\b(?:[^"'<>]|"[^"]*"|'[^']*')*>/gi, (tag) =>
			tag.replace(/\shref\s*=\s*(["'])(?:https?:)?\/\/[^"']*\1/gi, ' href=""'),
		);
	}
	if (/\.html?$/i.test(path)) {
		const fragments = [
			...text.matchAll(/<(script|style)\b[^>]*>([\s\S]*?)<\/\1\s*>/gi),
		].map((match) => match[2]);
		for (const match of text.matchAll(/<[^>]+>/g)) {
			const tag = match[0];
			for (const attribute of tag.matchAll(
				/\b(?:src|srcset|poster|style|data)\s*=\s*["']([^"']*)["']/gi,
			))
				fragments.push(attribute[1]);
			if (/^<(?:link|image|use)\b/i.test(tag)) {
				for (const attribute of tag.matchAll(
					/(?:^|\s)(?:xlink:)?href\s*=\s*["']([^"']*)["']/gi,
				))
					fragments.push(attribute[1]);
			}
		}
		text = fragments.join("\n");
	}
	const urls = new Set();
	for (const match of text.matchAll(/(?:https?:)?\/\/[^\s"'`<>\\)\]}]+/gi)) {
		const raw = match[0].replace(/&amp;/g, "&").replace(/[;,]+$/, "");
		if (
			/^(?:https?:)?\/\/(?:www\.)?w3\.org\/(?:2000\/svg|1999\/xhtml|1999\/xlink)$/.test(
				raw,
			)
		)
			continue;
		if (raw.startsWith("//") && !/^\/\/[\w.-]+\.[a-z]{2,}(?:[/:]|$)/i.test(raw))
			continue;
		urls.add(raw.startsWith("//") ? `https:${raw}` : raw);
	}
	return [...urls];
}

export async function scanCompliance(directory) {
	const root = resolve(directory);
	const findings = [];
	const files = new Map();
	const directories = new Set();
	const add = (code, path, message) => findings.push({ code, path, message });
	async function walk(current, prefix = "") {
		for (const item of await readdir(current, { withFileTypes: true })) {
			const path = prefix ? `${prefix}/${item.name}` : item.name;
			if (
				skippedDirectories.has(item.name) &&
				(item.isDirectory() || item.name === ".git")
			)
				continue;
			if (item.isSymbolicLink()) {
				add(
					"symlink",
					path,
					"Symlinks require review and cannot bypass the complete-file audit.",
				);
				continue;
			}
			if (item.isDirectory()) {
				directories.add(path);
				if (captureDirectory.test(item.name))
					add(
						"capture-directory",
						path,
						"Reference captures and scraped source directories cannot be distributed.",
					);
				if (path === "templates/premium")
					add(
						"premium-project",
						path,
						"Removed premium recreations cannot be restored without a new rights review and policy change.",
					);
				await walk(join(current, item.name), path);
			} else if (item.isFile()) {
				files.set(path, join(current, item.name));
				if (captureFile.test(item.name))
					add(
						"capture-file",
						path,
						"Captured source or reference artifacts require removal.",
					);
			}
		}
	}
	await walk(root);
	findings.push(...(await scanInlineArtwork(root, files)));
	try {
		await lstat(join(root, ".git"));
		try {
			const { stdout } = await execute("git", ["ls-files", "-z"], {
				cwd: root,
				env: localGitEnvironment(),
				maxBuffer: 32 * 1024 * 1024,
			});
			for (const path of stdout.split("\0").filter(Boolean)) {
				if (!(await lstat(join(root, path)).catch(() => null))) continue;
				const parts = path.split("/");
				if (parts.some((part) => generatedDirectories.has(part)))
					add(
						"generated-artifact",
						path,
						"Generated output and dependency trees cannot be committed or published as project source.",
					);
				if (
					parts.slice(0, -1).some((part) => captureDirectory.test(part)) &&
					!files.has(path)
				)
					add(
						"tracked-capture",
						path,
						"Tracked reference material cannot be hidden inside an excluded build or dependency tree.",
					);
			}
		} catch (error) {
			add(
				"git-index",
				".git",
				`Unable to inspect tracked paths: ${error.code ?? error.name}`,
			);
		}
	} catch {}
	async function json(path, fallback) {
		try {
			return JSON.parse(await readFile(join(root, path), "utf8"));
		} catch (error) {
			add(
				"manifest",
				path,
				`Missing or invalid JSON: ${error.code ?? error.name}`,
			);
			return fallback;
		}
	}
	const provenance = (await json("ASSET_PROVENANCE.json", {})) ?? {};
	const projects = await json("compliance/projects.json", []);
	findings.push(
		...(await scanDependencyProvenance(
			files,
			projects,
			await json("compliance/dependency-licenses.json", null),
		)),
	);
	if (!files.has("LICENSE"))
		add("license", "LICENSE", "The repository license is missing.");
	if (
		provenance.version !== 1 ||
		!Array.isArray(provenance.assets) ||
		!Array.isArray(provenance.remote_dependencies)
	)
		add(
			"manifest",
			"ASSET_PROVENANCE.json",
			"Expected version 1 with assets and remote_dependencies arrays.",
		);
	const assets = new Map();
	for (const entry of Array.isArray(provenance.assets)
		? provenance.assets
		: []) {
		if (
			!entry ||
			typeof entry !== "object" ||
			Array.isArray(entry) ||
			!safePath(entry.path)
		) {
			add(
				"asset-record",
				"ASSET_PROVENANCE.json",
				"Asset record has an unsafe or missing path.",
			);
			continue;
		}
		if (assets.has(entry.path))
			add("duplicate-record", entry.path, "Duplicate asset provenance record.");
		assets.set(entry.path, entry);
		if (
			!/^[a-f\d]{64}$/.test(entry.sha256 ?? "") ||
			!["original", "third-party"].includes(entry.kind) ||
			!meaningful(entry.origin) ||
			!meaningful(entry.license) ||
			!permission(entry.redistribution_permission)
		)
			add(
				"asset-rights",
				entry.path,
				"Asset requires SHA-256, origin, license, kind and verified redistribution permission.",
			);
		if (!files.has(entry.path))
			add(
				"stale-record",
				entry.path,
				"Recorded asset does not exist in the audited tree.",
			);
		if (
			suspiciousHash.test(entry.path.split("/").at(-1)) &&
			!meaningful(entry.manual_review)
		)
			add(
				"build-hash",
				entry.path,
				"Build-hash filenames need an explicit manual_review finding in provenance.",
			);
	}
	const dependencies = new Map();
	for (const entry of Array.isArray(provenance.remote_dependencies)
		? provenance.remote_dependencies
		: []) {
		let url;
		try {
			if (!entry || typeof entry !== "object" || Array.isArray(entry))
				throw new Error();
			url = new URL(entry.url);
			if (!["https:", "http:"].includes(url.protocol)) throw new Error();
		} catch {
			add(
				"dependency-record",
				"ASSET_PROVENANCE.json",
				"Remote dependency requires an absolute HTTP(S) URL.",
			);
			continue;
		}
		if (dependencies.has(entry.url))
			add(
				"duplicate-record",
				entry.url,
				"Duplicate remote dependency provenance record.",
			);
		dependencies.set(entry.url, entry);
		if (
			!meaningful(entry.origin) ||
			!meaningful(entry.license) ||
			!permission(entry.redistribution_permission)
		)
			add(
				"dependency-rights",
				entry.url,
				"Remote dependency requires origin, license and verified redistribution permission.",
			);
	}
	const cleared = new Set();
	if (!Array.isArray(projects))
		add(
			"project-registry",
			"compliance/projects.json",
			"Expected an array of reviewed projects.",
		);
	for (const project of Array.isArray(projects) ? projects : []) {
		if (
			!project ||
			typeof project !== "object" ||
			Array.isArray(project) ||
			!safePath(project.path) ||
			project.status !== "cleared" ||
			!meaningful(project.review)
		) {
			add(
				"project-registry",
				"compliance/projects.json",
				"Every published project needs a safe path, cleared status and manual review finding.",
			);
			continue;
		}
		if (cleared.has(project.path))
			add("project-registry", project.path, "Duplicate cleared project.");
		cleared.add(project.path);
		if (!directories.has(project.path))
			add(
				"stale-project",
				project.path,
				"Cleared project directory is missing.",
			);
	}
	for (const [path, absolute] of files) {
		const entry = assets.get(path);
		if (mediaExtension.test(path))
			add(
				"standalone-media",
				path,
				"Standalone media files are excluded from source distribution. Use reviewed code-generated visuals instead; a provenance entry does not override this policy.",
			);
		if (suspiciousHash.test(path.split("/").at(-1)) && !entry)
			add(
				"build-hash",
				path,
				"Build-hash filenames require a provenance record with explicit manual_review, including CSS and scripts.",
			);
		if (mediaExtension.test(path) && !entry)
			add(
				"unverified-asset",
				path,
				"Media, fonts, illustrations and downloadable artifacts require provenance.",
			);
		if (entry) {
			const actual = createHash("sha256")
				.update(await readFile(absolute))
				.digest("hex");
			if (actual !== entry.sha256)
				add("asset-hash", path, "SHA-256 does not match the reviewed asset.");
		}
		const category = path.split("/")[0];
		if (
			categories.has(category) &&
			(runtimeExtension.test(path) ||
				mediaExtension.test(path) ||
				path.endsWith("/package.json")) &&
			![...cleared].some((project) => path.startsWith(`${project}/`))
		)
			add(
				"unregistered-project",
				path,
				"Project content is outside the cleared project registry.",
			);
		if (path.startsWith(".claude/agents/") && extname(path) === ".md") {
			const text = await readFile(absolute, "utf8");
			for (const phrase of agentRequirements)
				if (!text.includes(phrase))
					add("agent-safeguard", path, `Missing required rule: ${phrase}`);
			for (const paragraph of text.split(/\n\s*\n/)) {
				for (const sentence of paragraph.split(
					/(?<=[.!?])\s+|[;\n]|\b(?:but|then|however)\b/,
				)) {
					const matches = prohibitedInstructions
						.map((pattern) => pattern.exec(sentence))
						.filter(Boolean);
					for (const match of matches) {
						const prefix = sentence.slice(0, match.index);
						if (
							/(?:never|do not|must not|cannot|prohibit)(?:\s+(?:automatically|ever|blindly))?$/i.test(
								prefix.trim(),
							)
						)
							continue;
						if (
							/(?:never|do not|must not)\s+(?:reproduce|copy|clone|replicate)\b[^,;]*$/i.test(
								prefix,
							)
						)
							continue;
						add(
							"agent-copying",
							path,
							"Positive instructions encourage copying protected material or claiming automatic rights clearance.",
						);
					}
				}
			}
		}
		if (
			!runtimeExtension.test(path) ||
			["scripts/check-compliance.mjs", "scripts/compliance.test.mjs"].includes(
				path,
			)
		)
			continue;
		const text = await readFile(absolute, "utf8");
		for (const url of runtimeUrls(text, path)) {
			if (!dependencies.has(url)) {
				let commercial = false;
				try {
					commercial = commercialDomain.test(new URL(url).hostname);
				} catch {}
				if (toolingPath(path) && !commercial) continue;
				if (/(?:\.(?:test|spec)\.[cm]?[jt]sx?)$/.test(path)) continue;
				add(
					commercial ? "commercial-runtime" : "unverified-runtime",
					path,
					`Runtime URL lacks an exact rights record: ${url}`,
				);
			}
		}
	}
	return findings;
}

if (
	process.argv[1] &&
	resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
	const root = resolve(process.argv[2] ?? join(import.meta.dirname, ".."));
	try {
		const findings = await scanCompliance(root);
		for (const finding of findings)
			process.stderr.write(
				`${finding.code}: ${finding.path}: ${finding.message}\n`,
			);
		if (findings.length) process.exitCode = 1;
		else
			process.stdout.write(
				"Compliance safeguards passed. Manual rights review remains required.\n",
			);
	} catch (error) {
		process.stderr.write(`Compliance scan failed: ${error.message}\n`);
		process.exitCode = 1;
	}
}
