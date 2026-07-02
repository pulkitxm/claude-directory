/**
 * Build script: transform reference page.html files into standalone HTML clones.
 */
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Compute relative path from output file to assets/
function relPath(fromFile, toAsset = "") {
	const fromDir = dirname(fromFile);
	// fromDir is like '', 'forms', 'customers', 'system'
	const depth = fromDir ? 1 : 0;
	const prefix = depth > 0 ? "../" : "./";
	return prefix + toAsset;
}

// Map of source nav hrefs → output file hrefs (relative to each page's dir)
function fixLinks(html, fromFile) {
	const fromDir = dirname(fromFile);
	const up = fromDir ? "../" : "";
	const linkMap = {
		'href="/"': `href="${up}index.html"`,
		"href='/'": `href='${up}index.html'`,
		'href="/pricing"': `href="${up}pricing.html"`,
		'href="/pricing/"': `href="${up}pricing.html"`,
		'href="/forms/sign-in"': `href="${up}forms/sign-in.html"`,
		'href="/forms/sign-in/"': `href="${up}forms/sign-in.html"`,
		'href="/customers/home"': `href="${up}customers/home.html"`,
		'href="/customers/home/"': `href="${up}customers/home.html"`,
		'href="/customers/1"': `href="${up}customers/1.html"`,
		'href="/customers/2"': `href="${up}customers/2.html"`,
		'href="/customers/3"': `href="${up}customers/3.html"`,
		'href="/customers/4"': `href="${up}customers/4.html"`,
		'href="/customers/5"': `href="${up}customers/5.html"`,
		'href="/customers/6"': `href="${up}customers/6.html"`,
		'href="/system/overview"': `href="${up}system/overview.html"`,
		'href="/system/overview/"': `href="${up}system/overview.html"`,
		'href="/system/buttons"': `href="${up}system/buttons.html"`,
		'href="/system/buttons/"': `href="${up}system/buttons.html"`,
		'href="/system/links"': `href="${up}system/links.html"`,
		'href="/system/links/"': `href="${up}system/links.html"`,
		'href="/system/colors"': `href="${up}system/colors.html"`,
		'href="/system/colors/"': `href="${up}system/colors.html"`,
		'href="/system/typography"': `href="${up}system/typography.html"`,
		'href="/system/typography/"': `href="${up}system/typography.html"`,
	};
	for (const [from, to] of Object.entries(linkMap)) {
		html = html.replaceAll(from, to);
	}
	return html;
}

function transformPage(refHtml, outputFile) {
	const assetsPrefix = relPath(outputFile);
	let html = refHtml;

	// Fix CSS link
	html = html.replaceAll(
		'href="/_astro/BaseLayout.DtQvmPf_.css"',
		`href="${assetsPrefix}assets/main.css"`,
	);

	// Fix Keen Slider CSS — keep CDN
	// Already absolute CDN href, leave as is

	// Remove Fuse.js module script tag (not needed)
	html = html.replaceAll(
		/<script type="module" src="\/_astro\/Fuse[^"]*"><\/script>/g,
		"",
	);

	// Fix image paths from /_astro/ to assets/img/
	html = html.replaceAll(
		/src="\/_astro\/([^"]+\.(svg|webp|png|jpg|jpeg))"/g,
		`src="${assetsPrefix}assets/img/$1"`,
	);

	// Fix team images
	html = html.replaceAll(
		/src="\/src\/images\/team\/([^"]+)"/g,
		`src="${assetsPrefix}assets/team/$1"`,
	);

	// Fix nav links
	html = fixLinks(html, outputFile);

	return html;
}

const pages = [
	{ ref: ".reference/home/page.html", out: "index.html" },
	{ ref: ".reference/pricing/page.html", out: "pricing.html" },
	{ ref: ".reference/forms-sign-in/page.html", out: "forms/sign-in.html" },
	{ ref: ".reference/customers-home/page.html", out: "customers/home.html" },
	{ ref: ".reference/customers-1/page.html", out: "customers/1.html" },
	{ ref: ".reference/customers-2/page.html", out: "customers/2.html" },
	{ ref: ".reference/customers-3/page.html", out: "customers/3.html" },
	{ ref: ".reference/customers-4/page.html", out: "customers/4.html" },
	{ ref: ".reference/customers-5/page.html", out: "customers/5.html" },
	{ ref: ".reference/customers-6/page.html", out: "customers/6.html" },
	{ ref: ".reference/system-overview/page.html", out: "system/overview.html" },
	{ ref: ".reference/system-buttons/page.html", out: "system/buttons.html" },
	{ ref: ".reference/system-links/page.html", out: "system/links.html" },
	{ ref: ".reference/system-colors/page.html", out: "system/colors.html" },
	{
		ref: ".reference/system-typography/page.html",
		out: "system/typography.html",
	},
];

for (const { ref, out } of pages) {
	const refPath = join(__dirname, ref);
	const outPath = join(__dirname, out);

	let refHtml;
	try {
		refHtml = readFileSync(refPath, "utf8");
	} catch (e) {
		console.error(`MISSING: ${ref}`);
		continue;
	}

	const outHtml = transformPage(refHtml, out);
	mkdirSync(dirname(outPath), { recursive: true });
	writeFileSync(outPath, outHtml, "utf8");
	console.log(`✓ ${out}`);
}

console.log("\nDone!");
