#!/usr/bin/env node
/**
 * Headless verification for the DOPAMINE maximalism design-system showcase.
 *
 * Boots a tiny static server for this folder, drives headless Chromium
 * (Playwright) through the page at desktop (1280) and mobile (390) widths and
 * asserts: structure, all five vendored fonts loaded, scroll-reveal, stat
 * count-up, FAQ accordion (aria + height), newsletter validation, mobile
 * drawer, focus ring, reduced-motion fallback, no horizontal overflow, and
 * zero console / page errors.
 *
 * Usage:  node verify.mjs            (uses Playwright's installed chromium)
 *
 * Requires Playwright to be available (the repo's scripts/record-demos installs
 * it). Run from this directory. Exits non-zero if any assertion fails.
 */
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// Resolve Playwright from the repo's recorder install if not local.
let chromium;
for (const base of [
	__dirname,
	path.resolve(__dirname, "../../scripts/record-demos"),
]) {
	try {
		({ chromium } = require(require.resolve("playwright", { paths: [base] })));
		break;
	} catch {}
}
if (!chromium) {
	console.error(
		"Playwright not found. Install it (e.g. in scripts/record-demos: npm install).",
	);
	process.exit(2);
}

const PORT = Number(process.env.PORT) || 5266;
const ROOT = __dirname;
const MIME = {
	".html": "text/html",
	".css": "text/css",
	".js": "text/javascript",
	".woff2": "font/woff2",
	".svg": "image/svg+xml",
	".mp4": "video/mp4",
};

const server = http.createServer((req, res) => {
	let p = decodeURIComponent(req.url.split("?")[0]);
	if (p === "/") p = "/index.html";
	const file = path.join(ROOT, p);
	if (!file.startsWith(ROOT) || !fs.existsSync(file)) {
		res.writeHead(404);
		return res.end("not found");
	}
	res.writeHead(200, {
		"content-type": MIME[path.extname(file)] || "application/octet-stream",
	});
	fs.createReadStream(file).pipe(res);
});

const results = [];
const check = (name, cond, detail = "") => {
	results.push({ name, ok: !!cond, detail });
	console.log(`${cond ? "PASS" : "FAIL"}  ${name}${detail ? "  — " + detail : ""}`);
};

await new Promise((r) => server.listen(PORT, "127.0.0.1", r));
const URL = `http://127.0.0.1:${PORT}/index.html`;

const browser = await chromium.launch({ headless: true });
try {
	const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
	const page = await ctx.newPage();
	const consoleErrs = [];
	const pageErrs = [];
	page.on("console", (m) => m.type() === "error" && consoleErrs.push(m.text()));
	page.on("pageerror", (e) => pageErrs.push(e.message));

	await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
	await page.evaluate(() => document.fonts.ready);
	await page.waitForTimeout(500);

	// structure
	const s = await page.evaluate(() => ({
		sections: document.querySelectorAll("section").length,
		cards: document.querySelectorAll(".card").length,
		swatches: document.querySelectorAll(".swatch").length,
		price: document.querySelectorAll(".price-card").length,
		faq: document.querySelectorAll(".faq-q").length,
		h1: document.querySelectorAll("h1").length,
	}));
	check("9 sections present", s.sections === 9, `got ${s.sections}`);
	check("6 feature cards", s.cards === 6, `got ${s.cards}`);
	check("5 accent swatches", s.swatches === 5, `got ${s.swatches}`);
	check("3 pricing tiers", s.price === 3, `got ${s.price}`);
	check("4 FAQ items", s.faq === 4, `got ${s.faq}`);
	check("exactly one <h1>", s.h1 === 1, `got ${s.h1}`);

	// fonts (heading + body + display families that are actually rendered)
	const fonts = await page.evaluate(() =>
		["Outfit", "DM Sans", "Bangers", "Bungee"].map((f) => ({
			f,
			ok: document.fonts.check(`16px "${f}"`),
		})),
	);
	fonts.forEach((x) => check(`font loaded: ${x.f}`, x.ok));

	// count-up
	await page.evaluate(() => document.getElementById("stats").scrollIntoView());
	await page.waitForTimeout(1800);
	const stats = await page.$$eval(".stat-num", (els) => els.map((e) => e.textContent));
	check(
		"stat count-up reaches targets",
		stats[0] === "5" && stats[1] === "100%" && stats[2] === "24+",
		stats.join(" / "),
	);

	// FAQ accordion
	await page.evaluate(() => document.getElementById("faq").scrollIntoView());
	await page.waitForTimeout(300);
	await page.$eval("#faq-q1", (el) => el.click());
	await page.waitForTimeout(500);
	const faqOpen = await page.evaluate(() => {
		const a = document.getElementById("faq-a1");
		return {
			expanded: document.getElementById("faq-q1").getAttribute("aria-expanded"),
			h: Math.round(a.getBoundingClientRect().height),
		};
	});
	check(
		"FAQ opens (aria-expanded + height)",
		faqOpen.expanded === "true" && faqOpen.h > 40,
		`expanded=${faqOpen.expanded} height=${faqOpen.h}`,
	);
	await page.$eval("#faq-q2", (el) => el.click());
	await page.waitForTimeout(250);
	const q1Closed = await page.$eval("#faq-q1", (el) =>
		el.getAttribute("aria-expanded"),
	);
	check("FAQ is single-open (q1 closes)", q1Closed === "false");

	// newsletter form validation
	await page.evaluate(() => document.getElementById("cta").scrollIntoView());
	await page.waitForTimeout(250);
	await page.fill("#cta-email", "nope");
	await page.$eval("#ctaForm button[type=submit]", (b) => b.click());
	await page.waitForTimeout(150);
	const bad = await page.$eval("#ctaMsg", (e) => e.textContent);
	await page.fill("#cta-email", "hi@spark.joy");
	await page.$eval("#ctaForm button[type=submit]", (b) => b.click());
	await page.waitForTimeout(150);
	const good = await page.$eval("#ctaMsg", (e) => e.textContent);
	check("form rejects invalid email", /again/i.test(bad), JSON.stringify(bad));
	check("form accepts valid email", /list/i.test(good), JSON.stringify(good));

	// focus ring on a button
	const focusCss = await page.evaluate(() => {
		const b = document.querySelector("#playground .btn-primary");
		b.focus();
		const cs = getComputedStyle(b);
		return { outline: cs.outlineStyle, shadow: cs.boxShadow };
	});
	check(
		"button focus shows dashed outline + ring",
		focusCss.outline === "dashed" && /rgb/.test(focusCss.shadow),
		`outline=${focusCss.outline}`,
	);

	// reveals on smooth scroll
	await page.addStyleTag({ content: "*{scroll-behavior:auto !important}" });
	await page.evaluate(async () => {
		const h = document.body.scrollHeight;
		for (let y = 0; y <= h; y += 120) {
			window.scrollTo(0, y);
			await new Promise((r) => setTimeout(r, 35));
		}
	});
	await page.waitForTimeout(500);
	const rev = await page.evaluate(() => ({
		total: document.querySelectorAll(".reveal").length,
		inview: document.querySelectorAll(".reveal.in").length,
	}));
	check(
		"all scroll-reveals fire",
		rev.inview === rev.total,
		`${rev.inview}/${rev.total}`,
	);

	// no horizontal overflow
	const ov = await page.evaluate(() => ({
		doc: document.documentElement.scrollWidth,
		win: window.innerWidth,
	}));
	check("no horizontal overflow", ov.doc <= ov.win, `${ov.doc} vs ${ov.win}`);

	// aria-hidden coverage
	const aria = await page.evaluate(() => ({
		deco: document.querySelectorAll(".deco, .deco-emoji").length,
		decoHidden: document.querySelectorAll(
			'.deco[aria-hidden="true"], .deco-emoji[aria-hidden="true"]',
		).length,
		pat: document.querySelectorAll('[class*="pattern-"]').length,
		patHidden: document.querySelectorAll('[class*="pattern-"][aria-hidden="true"]')
			.length,
	}));
	check(
		"decorations + patterns aria-hidden",
		aria.deco === aria.decoHidden && aria.pat === aria.patHidden,
		`deco ${aria.decoHidden}/${aria.deco}, patterns ${aria.patHidden}/${aria.pat}`,
	);

	check("no console errors", consoleErrs.length === 0, consoleErrs.slice(0, 3).join(" | "));
	check("no page errors", pageErrs.length === 0, pageErrs.slice(0, 3).join(" | "));

	// mobile drawer
	await page.setViewportSize({ width: 390, height: 844 });
	await page.waitForTimeout(300);
	await page.evaluate(() => window.scrollTo(0, 0));
	await page.$eval("#navToggle", (b) => b.click());
	await page.waitForTimeout(350);
	const drawer = await page.$eval("#drawer", (d) => d.getAttribute("data-open"));
	check("mobile drawer opens", drawer === "true");

	// reduced motion: content visible, continuous motion off
	const rctx = await browser.newContext({
		viewport: { width: 1280, height: 900 },
		reducedMotion: "reduce",
	});
	const rpage = await rctx.newPage();
	await rpage.goto(URL, { waitUntil: "networkidle" });
	await rpage.waitForTimeout(400);
	const rm = await rpage.evaluate(() => {
		const r = document.querySelector(".reveal");
		const deco = document.querySelector(".animate-float");
		return {
			opacity: getComputedStyle(r).opacity,
			dur: getComputedStyle(deco).animationDuration,
		};
	});
	check(
		"reduced-motion keeps content, kills motion",
		parseFloat(rm.opacity) === 1 && parseFloat(rm.dur) < 0.05,
		`opacity=${rm.opacity} animDur=${rm.dur}`,
	);
} finally {
	await browser.close();
	server.close();
}

const failed = results.filter((r) => !r.ok);
console.log(
	`\n${results.length - failed.length}/${results.length} checks passed.`,
);
if (failed.length) {
	console.error("FAILED:", failed.map((f) => f.name).join(", "));
	process.exit(1);
}
console.log("ALL CHECKS PASSED ✅");
