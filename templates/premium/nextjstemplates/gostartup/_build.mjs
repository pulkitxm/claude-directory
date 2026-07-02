// Dev-time generator: assembles each page's HTML from shared header/footer
// partials + a per-page content fragment. Output is plain static HTML —
// no build step is needed to run/ship the site, this script is only used
// while authoring so every page shares identical chrome.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = __dirname;

const header = fs.readFileSync(path.join(root, "_partials/header.html"), "utf8");
const footer = fs.readFileSync(path.join(root, "_partials/footer.html"), "utf8");
const themeInit = fs.readFileSync(
	path.join(root, "_partials/theme-init.html"),
	"utf8",
);

const pages = JSON.parse(
	fs.readFileSync(path.join(root, "_pages.json"), "utf8"),
);

function activeFlags(active) {
	const keys = [
		"FEATURES",
		"ABOUT",
		"PORTFOLIO",
		"PRICING",
		"BLOG",
		"DOCS",
		"SUPPORT",
		"SIGNIN",
		"SIGNUP",
		"404",
	];
	let h = header;
	for (const k of keys) {
		h = h.replaceAll(`{{ACTIVE_${k}}}`, k === active ? "is-active" : "");
	}
	return h;
}

for (const page of pages) {
	const contentPath = path.join(root, "_content", page.content);
	if (!fs.existsSync(contentPath)) {
		console.warn("MISSING content fragment:", page.content);
		continue;
	}
	const content = fs.readFileSync(contentPath, "utf8");
	const html = `<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>${page.title}</title>
	<meta name="description" content="${page.description}" />
	<link rel="icon" href="assets/images/logo/logo-light.svg" />
	<link rel="stylesheet" href="assets/css/fonts.css" />
	<link rel="stylesheet" href="assets/css/tokens.css" />
	<link rel="stylesheet" href="assets/css/base.css" />
	<link rel="stylesheet" href="assets/css/${page.css}" />
${themeInit}</head>
<body>
${activeFlags(page.active)}
${content}
${footer}
</body>
</html>
`;
	fs.writeFileSync(path.join(root, page.file), html);
	console.log("wrote", page.file);
}
