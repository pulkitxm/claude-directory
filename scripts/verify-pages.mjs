import { readFile, readdir, stat } from "node:fs/promises";
import { resolve, join, dirname, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { hasMediaSignature, mediaExtension } from "./media-policy.mjs";

const rootFiles = new Set([
	"index.html",
	"404.html",
	".nojekyll",
	"LICENSE",
	"THIRD_PARTY_NOTICES.txt",
]);
const capturedParts =
	/^(?:\.reference|\.audit|\.refs?|references?|captures?|screenshots?|scraped|scrapes)$/i;

function cssReferences(text) {
	return [
		...text.matchAll(
			/url\(\s*(?:"((?:\\.|[^"\\])*)"|'((?:\\.|[^'\\])*)'|([^)]*))\s*\)|@import\s+["']([^"']+)["']/gi,
		),
	].map((match) => ({
		url: (match[1] ?? match[2] ?? match[3] ?? match[4]).trim(),
		runtime: true,
	}));
}

function htmlReferences(text) {
	const references = [];
	const markup = text.replace(
		/(<script\b[^>]*>)[\s\S]*?(<\/script\s*>)/gi,
		"$1$2",
	);
	for (const match of markup.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style\s*>/gi))
		references.push(...cssReferences(match[1]));
	for (const match of markup
		.replace(/<style\b[^>]*>[\s\S]*?<\/style\s*>/gi, "")
		.matchAll(/<[a-z][^>]*>/gi)) {
		const tag = match[0];
		const navigation = /^<(?:a|base|form)\b/i.test(tag);
		for (const attr of tag.matchAll(
			/(?:\s)(src|href|xlink:href|poster|action|srcset|style)\s*=\s*(?:"([^"]*)"|'([^']*)')/gi,
		)) {
			const name = attr[1].toLowerCase();
			const value = (attr[2] ?? attr[3]).replace(/&amp;/g, "&");
			if (name === "style") references.push(...cssReferences(value));
			else if (name === "srcset") {
				if (/^\s*data:/i.test(value)) continue;
				for (const part of value.split(","))
					references.push({ url: part.trim().split(/\s+/)[0], runtime: true });
			} else references.push({ url: value, runtime: !navigation });
		}
	}
	return references;
}

export async function verifyPublication(directory, projects, options = {}) {
	const root = resolve(directory);
	const cleared = projects
		.filter((project) => project.status === "cleared")
		.map((project) => project.path);
	const expected = options.expected ?? cleared;
	const remote = new Set(
		(options.remote_dependencies ?? []).map((entry) => entry.url),
	);
	const errors = [];
	let checked = 0;
	for (const name of rootFiles)
		if (!(await stat(join(root, name)).catch(() => null))?.isFile())
			errors.push(`Missing publication metadata: ${name}`);
	for (const project of expected) {
		if (!cleared.includes(project))
			errors.push(`Requested unapproved project: ${project}`);
		else if (
			!(
				await stat(join(root, project, "index.html")).catch(() => null)
			)?.isFile()
		)
			errors.push(`Missing cleared preview: ${project}`);
	}
	async function walk(directory) {
		for (const entry of await readdir(directory, { withFileTypes: true })) {
			const file = join(directory, entry.name);
			const path = relative(root, file).replaceAll("\\", "/");
			const inProject = cleared.some((project) =>
				path.startsWith(`${project}/`),
			);
			if (entry.isSymbolicLink()) {
				errors.push(`Symlink in output: ${path}`);
				continue;
			}
			if (entry.isDirectory()) {
				if (
					!cleared.some(
						(project) =>
							project.startsWith(`${path}/`) ||
							path === project ||
							path.startsWith(`${project}/`),
					)
				)
					errors.push(`Unapproved output directory: ${path}`);
				if (path.split("/").some((part) => capturedParts.test(part)))
					errors.push(`Capture in output: ${path}`);
				await walk(file);
				continue;
			}
			if (mediaExtension.test(path) || hasMediaSignature(await readFile(file)))
				errors.push(`Standalone media in output: ${path}`);
			if (!inProject && !rootFiles.has(path))
				errors.push(`Unapproved output file: ${path}`);
			if (
				/\.(?:md|tsx?|log|zip|tar|gz|map)$/i.test(path) ||
				path.split("/").some((part) => capturedParts.test(part))
			)
				errors.push(`Source/archive/capture in output: ${path}`);
			if (
				/^(?:reference|source-capture|captured-source|scraped)(?:[.-].*)?\.(?:html?|css|[cm]?js|json|png|jpe?g|webp|svg)$/i.test(
					entry.name,
				)
			)
				errors.push(`Reference artifact in output: ${path}`);
			if (!/\.(?:html?|css|svg)$/i.test(path)) continue;
			const text = await readFile(file, "utf8");
			const references = /\.css$/i.test(path)
				? cssReferences(text)
				: htmlReferences(text);
			for (const { url, runtime } of references) {
				if (!url || /^(?:data:|blob:|mailto:|tel:|javascript:|#)/i.test(url))
					continue;
				if (/^(?:https?:)?\/\//i.test(url)) {
					const normalized = url.startsWith("//") ? `https:${url}` : url;
					if (runtime && !remote.has(normalized))
						errors.push(`Unverified remote output reference: ${path}: ${url}`);
					continue;
				}
				if (/^[a-z][a-z\d+.-]*:/i.test(url)) {
					errors.push(`Unsupported reference protocol: ${path}: ${url}`);
					continue;
				}
				let clean;
				try {
					clean = decodeURIComponent(url.split(/[?#]/)[0]);
				} catch {
					errors.push(`Invalid URL encoding: ${path}: ${url}`);
					continue;
				}
				if (!clean || clean.startsWith("#")) continue;
				const target = clean.startsWith("/")
					? resolve(root, `.${clean}`)
					: resolve(dirname(file), clean);
				if (target !== root && !target.startsWith(`${root}${sep}`)) {
					errors.push(`Escaping reference: ${path}: ${url}`);
					continue;
				}
				const info = await stat(target).catch(() => null);
				if (
					!info ||
					(info.isDirectory() &&
						!(
							await stat(join(target, "index.html")).catch(() => null)
						)?.isFile())
				)
					errors.push(`Broken reference: ${path}: ${url}`);
				checked++;
			}
		}
	}
	await walk(root);
	return { errors, checked };
}

if (
	process.argv[1] &&
	resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
	const directory = resolve(process.argv[2] ?? "_site");
	const projects = JSON.parse(
		await readFile(
			new URL("../compliance/projects.json", import.meta.url),
			"utf8",
		),
	);
	const provenance = JSON.parse(
		await readFile(
			new URL("../ASSET_PROVENANCE.json", import.meta.url),
			"utf8",
		),
	);
	const expected = process.argv.slice(3);
	const result = await verifyPublication(directory, projects, {
		remote_dependencies: provenance.remote_dependencies,
		...(expected.length ? { expected } : {}),
	});
	if (result.errors.length) {
		process.stderr.write(`${result.errors.join("\n")}\n`);
		process.exitCode = 1;
	} else
		process.stdout.write(
			`Verified publication allowlist and ${result.checked} local asset/link references\n`,
		);
}
