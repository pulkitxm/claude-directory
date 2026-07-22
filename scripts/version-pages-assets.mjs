import { readFile, readdir, stat, writeFile } from "node:fs/promises";
import { dirname, extname, resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";

const versionParameter = "v";
const versionedSourceExtensions = new Set([".css", ".html", ".js", ".mjs"]);

async function findSourceFiles(directory) {
	const files = [];
	for (const entry of await readdir(directory, { withFileTypes: true })) {
		const path = resolve(directory, entry.name);
		if (entry.isDirectory()) files.push(...(await findSourceFiles(path)));
		else if (
			entry.isFile() &&
			versionedSourceExtensions.has(extname(entry.name).toLowerCase())
		)
			files.push(path);
	}
	return files;
}

function readAttribute(tag, name) {
	const match = tag.match(
		new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"),
	);
	if (!match) return null;
	const value = match[1] ?? match[2] ?? match[3];
	return { value, start: match.index + match[0].indexOf(value) };
}

async function localAssetPath(root, sourceFile, value) {
	if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(value)) return null;
	const pathname = value.split(/[?#]/, 1)[0];
	if (!pathname) return null;
	let decoded;
	try {
		decoded = decodeURIComponent(pathname);
	} catch {
		return null;
	}
	const asset = decoded.startsWith("/")
		? resolve(root, decoded.replace(/^\/+/, ""))
		: resolve(dirname(sourceFile), decoded);
	if (asset !== root && !asset.startsWith(`${root}${sep}`)) return null;
	const info = await stat(asset).catch(() => null);
	return info?.isFile() ? asset : null;
}

function withVersion(value, version) {
	const hashIndex = value.indexOf("#");
	const fragment = hashIndex === -1 ? "" : value.slice(hashIndex);
	const withoutFragment = hashIndex === -1 ? value : value.slice(0, hashIndex);
	const queryIndex = withoutFragment.indexOf("?");
	const pathname =
		queryIndex === -1 ? withoutFragment : withoutFragment.slice(0, queryIndex);
	const parameters = new URLSearchParams(
		queryIndex === -1 ? "" : withoutFragment.slice(queryIndex + 1),
	);
	parameters.set(versionParameter, version);
	return `${pathname}?${parameters}${fragment}`;
}

async function versionValue(root, sourceFile, value, version) {
	if (!(await localAssetPath(root, sourceFile, value))) return value;
	return withVersion(value, version);
}

async function replaceMatches(content, pattern, valueIndexes, replaceValue) {
	const matches = [...content.matchAll(pattern)];
	const indexes = Array.isArray(valueIndexes) ? valueIndexes : [valueIndexes];
	let output = "";
	let cursor = 0;
	let references = 0;
	for (const match of matches) {
		const value = indexes.map((index) => match[index]).find(Boolean);
		if (!value) continue;
		const start = match.index + match[0].indexOf(value);
		const replacement = await replaceValue(value);
		output += content.slice(cursor, start) + replacement;
		cursor = start + value.length;
		if (replacement !== value) references += 1;
	}
	return { content: output + content.slice(cursor), references };
}

async function versionHtml(root, sourceFile, content, version) {
	return replaceMatches(
		content,
		/<(?:link|script)\b[^>]*>/gi,
		0,
		async (tag) => {
			const link = /^<link\b/i.test(tag);
			if (link) {
				const rel = readAttribute(tag, "rel");
				if (!rel?.value.split(/\s+/).includes("stylesheet")) return tag;
			}
			const attribute = readAttribute(tag, link ? "href" : "src");
			if (!attribute) return tag;
			const value = await versionValue(
				root,
				sourceFile,
				attribute.value,
				version,
			);
			return `${tag.slice(0, attribute.start)}${value}${tag.slice(attribute.start + attribute.value.length)}`;
		},
	);
}

async function versionCss(root, sourceFile, content, version) {
	const urls = await replaceMatches(
		content,
		/url\(\s*(?:"([^"]*)"|'([^']*)'|([^'"\s)][^)]*?))\s*\)/gi,
		[1, 2, 3],
		(value) => versionValue(root, sourceFile, value, version),
	);
	const imports = await replaceMatches(
		urls.content,
		/@import\s+(?:"([^"]*)"|'([^']*)')/gi,
		[1, 2],
		(value) => versionValue(root, sourceFile, value, version),
	);
	return {
		content: imports.content,
		references: urls.references + imports.references,
	};
}

async function versionJavaScript(root, sourceFile, content, version) {
	const staticImports = await replaceMatches(
		content,
		/\b(?:import|export)\s+(?:[^"']*?\sfrom\s*)?(?:"([^"]*)"|'([^']*)')/g,
		[1, 2],
		(value) => versionValue(root, sourceFile, value, version),
	);
	const dynamicImports = await replaceMatches(
		staticImports.content,
		/\bimport\s*\(\s*(?:"([^"]*)"|'([^']*)')\s*\)/g,
		[1, 2],
		(value) => versionValue(root, sourceFile, value, version),
	);
	return {
		content: dynamicImports.content,
		references: staticImports.references + dynamicImports.references,
	};
}

export async function versionPagesAssets(directory, version) {
	if (!version) throw new Error("A pages asset version is required");
	const root = resolve(directory);
	const normalizedVersion = String(version).slice(0, 12);
	const result = { files: 0, references: 0 };
	for (const sourceFile of await findSourceFiles(root)) {
		const original = await readFile(sourceFile, "utf8");
		const extension = extname(sourceFile).toLowerCase();
		const transformed =
			extension === ".html"
				? await versionHtml(root, sourceFile, original, normalizedVersion)
				: extension === ".css"
					? await versionCss(root, sourceFile, original, normalizedVersion)
					: await versionJavaScript(
							root,
							sourceFile,
							original,
							normalizedVersion,
						);
		if (transformed.content !== original) {
			await writeFile(sourceFile, transformed.content);
			result.files += 1;
		}
		result.references += transformed.references;
	}
	return result;
}

if (
	process.argv[1] &&
	import.meta.url === pathToFileURL(process.argv[1]).href
) {
	const directory = process.argv[2];
	const version = process.argv[3] ?? process.env.PAGES_ASSET_VERSION;
	if (!directory || !version)
		throw new Error("Usage: version-pages-assets.mjs <directory> <version>");
	const result = await versionPagesAssets(directory, version);
	process.stdout.write(`${JSON.stringify(result)}\n`);
}
