import { readFile, readdir, stat, writeFile } from "node:fs/promises";
import { dirname, extname, relative, resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";

const versionParameter = "v";
const versionedSourceExtensions = new Set([
	".css",
	".html",
	".js",
	".json",
	".mjs",
]);
const safeRuntimeAssetExtensions = new Set([
	".aac",
	".apng",
	".avif",
	".bmp",
	".css",
	".eot",
	".gif",
	".ico",
	".jpeg",
	".jpg",
	".js",
	".json",
	".m4a",
	".mjs",
	".mov",
	".mp3",
	".mp4",
	".ogg",
	".ogv",
	".otf",
	".png",
	".svg",
	".ttf",
	".wasm",
	".wav",
	".webm",
	".webp",
	".woff",
	".woff2",
]);

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

async function findSiteHosts(root) {
	const hosts = new Set();
	const cname = await readFile(resolve(root, "CNAME"), "utf8").catch(() => "");
	for (const value of [cname.trim(), process.env.PAGES_SITE_ORIGIN]) {
		if (!value) continue;
		try {
			const url = new URL(value.includes("://") ? value : `https://${value}`);
			hosts.add(url.host.toLowerCase());
		} catch {}
	}
	return hosts;
}

function localPathname(value, siteHosts) {
	if (
		/^(?:data|blob|mailto|tel|javascript):/i.test(value) ||
		value.startsWith("#")
	)
		return null;
	if (/^(?:https?:)?\/\//i.test(value)) {
		let url;
		try {
			url = new URL(value.startsWith("//") ? `https:${value}` : value);
		} catch {
			return null;
		}
		return siteHosts.has(url.host.toLowerCase()) ? url.pathname : null;
	}
	if (/^[a-z][a-z\d+.-]*:/i.test(value)) return null;
	return value.split(/[?#]/, 1)[0];
}

function isSafeRuntimeAsset(value, siteHosts) {
	const pathname = localPathname(value, siteHosts);
	return Boolean(
		pathname && safeRuntimeAssetExtensions.has(extname(pathname).toLowerCase()),
	);
}

function htmlDocumentUrl(root, sourceFile) {
	const pathname = relative(root, sourceFile)
		.split(sep)
		.map((segment) => encodeURIComponent(segment))
		.join("/");
	return new URL(pathname, "https://pages.local/");
}

function htmlBaseUrl(root, sourceFile, content) {
	const documentUrl = htmlDocumentUrl(root, sourceFile);
	for (const match of content.matchAll(/<base\b[^>]*>/gi)) {
		const href = readAttribute(match[0], "href");
		if (!href) continue;
		try {
			return new URL(href.value, documentUrl);
		} catch {}
	}
	return documentUrl;
}

async function localAssetPath(root, sourceFile, value, siteHosts, baseUrl) {
	if (value.startsWith("#")) return null;
	let pathname;
	let fromRoot = false;
	if (baseUrl) {
		let url;
		try {
			url = new URL(value, baseUrl);
		} catch {
			return null;
		}
		if (url.protocol !== "http:" && url.protocol !== "https:") return null;
		if (
			url.host.toLowerCase() !== "pages.local" &&
			!siteHosts.has(url.host.toLowerCase())
		)
			return null;
		pathname = url.pathname;
		fromRoot = true;
	} else {
		pathname = localPathname(value, siteHosts);
		if (!pathname) return null;
		fromRoot = pathname.startsWith("/");
	}
	let decoded;
	try {
		decoded = decodeURIComponent(pathname);
	} catch {
		return null;
	}
	const asset = fromRoot
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

async function versionValue(
	root,
	sourceFile,
	value,
	version,
	siteHosts,
	baseUrl,
) {
	if (!(await localAssetPath(root, sourceFile, value, siteHosts, baseUrl)))
		return value;
	return withVersion(value, version);
}

async function versionSafeRuntimeValue(
	root,
	sourceFile,
	value,
	version,
	siteHosts,
	baseUrl,
) {
	if (!isSafeRuntimeAsset(value, siteHosts)) return value;
	return versionValue(root, sourceFile, value, version, siteHosts, baseUrl);
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
		const transformed = await replaceValue(value);
		const replacement =
			typeof transformed === "string" ? transformed : transformed.content;
		output += content.slice(cursor, start) + replacement;
		cursor = start + value.length;
		references +=
			typeof transformed === "string"
				? Number(replacement !== value)
				: transformed.references;
	}
	return { content: output + content.slice(cursor), references };
}

async function versionSrcset(
	root,
	sourceFile,
	value,
	version,
	siteHosts,
	baseUrl,
) {
	const pieces = value.split(/(,\s*)/);
	let references = 0;
	for (let index = 0; index < pieces.length; index += 2) {
		const candidate = pieces[index];
		const match = candidate.match(/^(\s*)(\S+)([\s\S]*)$/);
		if (!match) continue;
		const replacement = await versionValue(
			root,
			sourceFile,
			match[2],
			version,
			siteHosts,
			baseUrl,
		);
		if (replacement !== match[2]) references += 1;
		pieces[index] = `${match[1]}${replacement}${match[3]}`;
	}
	return { content: pieces.join(""), references };
}

async function versionTagAttribute(
	root,
	sourceFile,
	tag,
	name,
	version,
	siteHosts,
	baseUrl,
	mode = "asset",
) {
	const attribute = readAttribute(tag, name);
	if (!attribute) return { content: tag, references: 0 };
	const transformed =
		mode === "srcset"
			? await versionSrcset(
					root,
					sourceFile,
					attribute.value,
					version,
					siteHosts,
					baseUrl,
				)
			: {
					content: await (mode === "safe"
						? versionSafeRuntimeValue
						: versionValue)(
						root,
						sourceFile,
						attribute.value,
						version,
						siteHosts,
						baseUrl,
					),
					references: 0,
				};
	if (mode !== "srcset")
		transformed.references = Number(transformed.content !== attribute.value);
	return {
		content: `${tag.slice(0, attribute.start)}${transformed.content}${tag.slice(attribute.start + attribute.value.length)}`,
		references: transformed.references,
	};
}

function versionsLink(tag, siteHosts) {
	const rel = readAttribute(tag, "rel");
	if (!rel) return false;
	const tokens = rel.value.toLowerCase().split(/\s+/);
	if (
		tokens.some((token) =>
			[
				"apple-touch-icon",
				"apple-touch-startup-image",
				"icon",
				"manifest",
				"mask-icon",
				"modulepreload",
				"stylesheet",
			].includes(token),
		)
	)
		return true;
	if (tokens.includes("preload"))
		return readAttribute(tag, "as")?.value.toLowerCase() !== "document";
	if (!tokens.includes("prefetch")) return false;
	const href = readAttribute(tag, "href");
	return Boolean(href && isSafeRuntimeAsset(href.value, siteHosts));
}

async function versionHtml(root, sourceFile, content, version, siteHosts) {
	const baseUrl = htmlBaseUrl(root, sourceFile, content);
	return replaceMatches(
		content,
		/<(?:audio|embed|feImage|image|img|input|link|meta|object|script|source|track|use|video)\b[^>]*>/gi,
		0,
		async (tag) => {
			const name = tag.match(/^<\s*([^\s/>]+)/)?.[1].toLowerCase();
			let output = tag;
			let references = 0;
			const apply = async (attribute, mode = "asset") => {
				const transformed = await versionTagAttribute(
					root,
					sourceFile,
					output,
					attribute,
					version,
					siteHosts,
					baseUrl,
					mode,
				);
				output = transformed.content;
				references += transformed.references;
			};
			if (name === "link" && versionsLink(output, siteHosts))
				await apply("href");
			else if (name === "script") await apply("src");
			else if (
				["audio", "img", "input", "source", "track", "video"].includes(name)
			)
				await apply("src");
			else if (name === "embed") await apply("src", "safe");
			else if (name === "object") await apply("data", "safe");
			if (name === "video") await apply("poster");
			if (["img", "source"].includes(name)) await apply("srcset", "srcset");
			if (name === "link") await apply("imagesrcset", "srcset");
			if (["feimage", "image", "use"].includes(name)) {
				await apply("href");
				await apply("xlink:href");
			}
			if (name === "meta") {
				const key =
					readAttribute(output, "property")?.value ??
					readAttribute(output, "name")?.value ??
					readAttribute(output, "itemprop")?.value ??
					"";
				if (
					["image", "msapplication-tileimage"].includes(key.toLowerCase()) ||
					/(?:^|:)image(?::|$)/i.test(key)
				)
					await apply("content");
			}
			return { content: output, references };
		},
	);
}

async function versionCss(root, sourceFile, content, version, siteHosts) {
	const urls = await replaceMatches(
		content,
		/url\(\s*(?:"([^"]*)"|'([^']*)'|([^'"\s)][^)]*?))\s*\)/gi,
		[1, 2, 3],
		(value) => versionValue(root, sourceFile, value, version, siteHosts),
	);
	const imports = await replaceMatches(
		urls.content,
		/@import\s+(?:"([^"]*)"|'([^']*)')/gi,
		[1, 2],
		(value) => versionValue(root, sourceFile, value, version, siteHosts),
	);
	return {
		content: imports.content,
		references: urls.references + imports.references,
	};
}

async function versionJavaScript(
	root,
	sourceFile,
	content,
	version,
	siteHosts,
) {
	const staticImports = await replaceMatches(
		content,
		/\b(?:import|export)\s+(?:[^"']*?\sfrom\s*)?(?:"([^"]*)"|'([^']*)')/g,
		[1, 2],
		(value) => versionValue(root, sourceFile, value, version, siteHosts),
	);
	const dynamicImports = await replaceMatches(
		staticImports.content,
		/\bimport\s*\(\s*(?:"([^"]*)"|'([^']*)')\s*\)/g,
		[1, 2],
		(value) => versionValue(root, sourceFile, value, version, siteHosts),
	);
	const runtimeAssets = await replaceMatches(
		dynamicImports.content,
		/(?:"([^"\\\n]+)"(?!\s*:)|'([^'\\\n]+)'(?!\s*:)|`([^`\\$\n]+)`)/g,
		[1, 2, 3],
		(value) =>
			versionSafeRuntimeValue(root, sourceFile, value, version, siteHosts),
	);
	return {
		content: runtimeAssets.content,
		references:
			staticImports.references +
			dynamicImports.references +
			runtimeAssets.references,
	};
}

async function versionJson(root, sourceFile, content, version, siteHosts) {
	return replaceMatches(
		content,
		/("(?:\\.|[^"\\])*")(?=\s*(?:[,}\]]|$))/g,
		1,
		async (literal) => {
			let value;
			try {
				value = JSON.parse(literal);
			} catch {
				return literal;
			}
			if (typeof value !== "string") return literal;
			const replacement = await versionSafeRuntimeValue(
				root,
				sourceFile,
				value,
				version,
				siteHosts,
			);
			return replacement === value ? literal : JSON.stringify(replacement);
		},
	);
}

export async function versionPagesAssets(directory, version) {
	if (!version) throw new Error("A pages asset version is required");
	const root = resolve(directory);
	const siteHosts = await findSiteHosts(root);
	const normalizedVersion = String(version).slice(0, 12);
	const result = { files: 0, references: 0 };
	for (const sourceFile of await findSourceFiles(root)) {
		const original = await readFile(sourceFile, "utf8");
		const extension = extname(sourceFile).toLowerCase();
		const transformed =
			extension === ".html"
				? await versionHtml(
						root,
						sourceFile,
						original,
						normalizedVersion,
						siteHosts,
					)
				: extension === ".css"
					? await versionCss(
							root,
							sourceFile,
							original,
							normalizedVersion,
							siteHosts,
						)
					: extension === ".json"
						? await versionJson(
								root,
								sourceFile,
								original,
								normalizedVersion,
								siteHosts,
							)
						: await versionJavaScript(
								root,
								sourceFile,
								original,
								normalizedVersion,
								siteHosts,
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