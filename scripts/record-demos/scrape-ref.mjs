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
// Remote HTTPS traffic in this sandbox is re-terminated by an egress proxy whose
// TLS stack mishandles the default Chromium build's TLS 1.3 ClientHello (GREASE),
// producing ERR_SSL_PROTOCOL_ERROR. The older prebuilt Chromium at
// /opt/pw-browsers/chromium-1194 still honors --ssl-version-max=tls1.2 (removed in
// newer Chrome for Testing builds) and negotiates TLS 1.2 fine through the proxy.
// Only remote targets need this — localhost captures (dev servers, vision-loop
// re-scrapes) bypass the proxy entirely. (An alternative PW_PROXY-based relay was
// tried upstream but a plain --proxy-server flag doesn't fix the underlying TLS 1.3
// handshake failure by itself — this TLS-1.2 pin is the version verified working
// end-to-end against a live remote reference site.)
const isLocal = /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(:|\/|$)/i.test(
	URL,
);
const legacyChromePath = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
// The default Playwright-managed Chromium build isn't always downloadable in this
// sandbox (its CDN fetch can itself be blocked/flaky), so fall back to the older
// prebuilt Chromium whenever the managed executable isn't actually on disk —
// needed for both local dev-server captures and remote reference captures.
let defaultExecutableMissing = false;
try {
	const def = chromium.executablePath?.();
	defaultExecutableMissing = !def || !fs.existsSync(def);
} catch {
	defaultExecutableMissing = true;
}
// For remote URLs: prefer legacy Chromium (supports --ssl-version-max=tls1.2) over
// the default managed build, which dropped that flag and fails TLS negotiation through
// the egress proxy. For local URLs: use default unless it's missing.
const legacyExists = fs.existsSync(legacyChromePath);
const useLegacyChrome =
	(defaultExecutableMissing || (!isLocal && legacyExists)) && legacyExists;
const launchOpts = { args: ["--ignore-certificate-errors"] };
if (useLegacyChrome) {
	launchOpts.executablePath = legacyChromePath;
}
if (!isLocal) {
	launchOpts.args.push("--ssl-version-max=tls1.2");
	const proxyUrl = process.env.PW_PROXY || process.env.HTTPS_PROXY;
	if (proxyUrl) {
		launchOpts.args.push(`--proxy-server=${proxyUrl}`);
	}
}
const browser = await chromium.launch(
	isLocal && !useLegacyChrome ? {} : launchOpts,
);
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

// Scroll through the full page first so any IntersectionObserver / scroll-triggered
// reveal animations (fade-in, slide-up sections, etc.) have already fired before the
// full-page screenshot is taken. Without this, sections below the fold can render
// blank (opacity:0 / translated off-screen) in the captured screenshot.
await page.evaluate(async () => {
	const distance = 400;
	const delay = 120;
	const scrollHeight = () => document.body.scrollHeight;
	let total = 0;
	while (total < scrollHeight()) {
		window.scrollBy(0, distance);
		total += distance;
		await new Promise((r) => setTimeout(r, delay));
	}
	window.scrollTo(0, 0);
	await new Promise((r) => setTimeout(r, 400));
});

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
