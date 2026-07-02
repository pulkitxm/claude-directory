import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

// Usage: node scrape-ref.mjs <url> [outDir]   (or URL=... OUT=... node scrape-ref.mjs)
const URL = process.argv[2] || process.env.URL;
const OUT = process.argv[3] || process.env.OUT || "/tmp/scrape-ref";
if (!URL) {
	console.error("usage: node scrape-ref.mjs <url> [outDir]");
	process.exit(2);
}
fs.mkdirSync(OUT, { recursive: true });

console.log("Launching chromium...");
// Optional local proxy relay for sandboxed environments where headless Chromium
// can't complete a TLS handshake through the org's TLS-terminating egress proxy
// (works fine for tools like curl/node-fetch, but Chromium's TLS stack chokes on
// the re-terminated connection). Set PW_PROXY=host:port to route through a local
// relay; unset (the default) launches with no proxy, unchanged from before.
const launchOpts = process.env.PW_PROXY
	? {
			...(process.env.PW_CHROME_PATH ? { executablePath: process.env.PW_CHROME_PATH } : {}),
			args: [
				`--proxy-server=${process.env.PW_PROXY}`,
				"--ignore-certificate-errors",
				"--ssl-version-max=tls1.2",
			],
		}
	: process.env.PW_CHROME_PATH
		? { executablePath: process.env.PW_CHROME_PATH }
		: {};
const browser = await chromium.launch(launchOpts);
console.log("Chromium launched. Opening page...");
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
console.log("Page opened. Navigating to:", URL);
await page.goto(URL, {
	waitUntil: process.env.WAIT_UNTIL || "networkidle",
	timeout: 60000,
});
console.log("Navigation complete. Waiting 3s...");
await page.waitForTimeout(3000);
console.log("Wait complete.");

let target = page;
console.log("Using main frame directly");
console.log("url:", target.url());

await page.screenshot({
	path: path.join(OUT, "screenshot.png"),
	fullPage: true,
});

const html = await target.content();
fs.writeFileSync(path.join(OUT, "page.html"), html);

const data = await target.evaluate(() => {
	const out = { fonts: new Set(), imgs: [], links: [], colors: {}, nodes: [] };
	const walk = (el, depth) => {
		if (depth > 6) return;
		const cs = getComputedStyle(el);
		out.fonts.add(cs.fontFamily);
		const r = el.getBoundingClientRect();
		if (r.width > 0 && r.height > 0 && depth < 5) {
			out.nodes.push({
				tag: el.tagName,
				cls: el.className?.toString?.().slice(0, 80),
				text:
					el.childNodes.length &&
					[...el.childNodes].some((n) => n.nodeType === 3)
						? el.textContent.trim().slice(0, 60)
						: "",
				color: cs.color,
				bg: cs.backgroundColor,
				font: cs.fontFamily.split(",")[0],
				fs: cs.fontSize,
				fw: cs.fontWeight,
				ls: cs.letterSpacing,
				lh: cs.lineHeight,
				border: cs.border,
				radius: cs.borderRadius,
				pad: cs.padding,
				w: Math.round(r.width),
				h: Math.round(r.height),
			});
		}
		for (const c of el.children) walk(c, depth + 1);
	};
	walk(document.body, 0);
	for (const i of document.querySelectorAll("img")) out.imgs.push(i.src);
	for (const a of document.querySelectorAll("a"))
		out.links.push({ t: a.textContent.trim().slice(0, 40), h: a.href });
	return {
		fonts: [...out.fonts],
		imgs: out.imgs,
		links: out.links,
		nodes: out.nodes,
	};
});
fs.writeFileSync(path.join(OUT, "outline.json"), JSON.stringify(data, null, 2));
console.log("fonts:", data.fonts);
console.log("nodes:", data.nodes.length, "imgs:", data.imgs.length);

// Source CSS (the :hover / @keyframes / @media rules getComputedStyle can't see)
// + linked CSS/JS URLs so the cloner can fetch and read the originals.
const sources = await target.evaluate(() => {
	const css = [];
	for (const sheet of document.styleSheets) {
		try {
			for (const rule of sheet.cssRules) css.push(rule.cssText);
		} catch {
			// cross-origin sheet — rules unreadable here; href captured below for fetching
		}
	}
	const abs = (u) => {
		try {
			return new URL(u, location.href).href;
		} catch {
			return u;
		}
	};
	return {
		css: css.join("\n"),
		styles: [...document.querySelectorAll('link[rel~="stylesheet"][href]')].map(
			(l) => abs(l.getAttribute("href")),
		),
		scripts: [...document.querySelectorAll("script[src]")].map((s) =>
			abs(s.getAttribute("src")),
		),
	};
});
fs.writeFileSync(path.join(OUT, "source.css"), sources.css);
fs.writeFileSync(
	path.join(OUT, "sources.json"),
	JSON.stringify({ styles: sources.styles, scripts: sources.scripts }, null, 2),
);
console.log(
	"css bytes:",
	sources.css.length,
	"linked css:",
	sources.styles.length,
	"scripts:",
	sources.scripts.length,
);

// Interaction states: rest vs :hover element screenshots for cards/buttons/links,
// so the vision-judge can verify hover effects (which the full-page shot misses).
// Modals/dropdowns are template-specific — the cloner opens those by reading source JS.
try {
	const statesDir = path.join(OUT, "states");
	fs.mkdirSync(statesDir, { recursive: true });
	const loc = target.locator(
		'button, a, [role="button"], [class*="card" i], [class*="btn" i]',
	);
	const n = Math.min(await loc.count(), 10);
	const index = [];
	for (let i = 0; i < n; i++) {
		const el = loc.nth(i);
		try {
			if (!(await el.isVisible())) continue;
			const label = (await el.innerText().catch(() => "")).trim().slice(0, 40);
			await el.screenshot({ path: path.join(statesDir, `el-${i}-rest.png`) });
			await el.hover({ timeout: 2000 });
			await page.waitForTimeout(400); // let the transition settle
			await el.screenshot({ path: path.join(statesDir, `el-${i}-hover.png`) });
			index.push({ i, label });
		} catch {}
	}
	fs.writeFileSync(
		path.join(statesDir, "index.json"),
		JSON.stringify(index, null, 2),
	);
	console.log("hover states captured:", index.length);
} catch (e) {
	console.log("states capture skipped:", e.message);
}

await browser.close();
