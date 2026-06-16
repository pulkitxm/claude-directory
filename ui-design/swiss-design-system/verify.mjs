/**
 * Headless verification for SCHRIFT — Swiss International design system.
 *
 * CLI-only. Serves the project with a tiny static server, drives headless
 * Chromium (Playwright) through it at desktop (1280) and mobile (390) widths,
 * and asserts the design system is actually wired up: tokens applied, Inter
 * loaded, no console errors, FAQ accordion + stat count-up + mobile drawer work,
 * patterns present, and core accessibility holds.
 *
 * Usage:
 *   PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/path/to/chrome \
 *   PW_DIR=/abs/path/to/scripts/record-demos \
 *   node verify.mjs
 *
 * PW_DIR points at any folder whose node_modules has `playwright` installed.
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;
const PORT = Number(process.env.PORT || 5311);

// ---- resolve playwright from a sibling install if not local --------------
const require = createRequire(import.meta.url);
let chromium;
function pickChromium(mod) {
	return mod.chromium || (mod.default && mod.default.chromium);
}
try {
	chromium = pickChromium(require("playwright"));
} catch {
	// not resolvable from this folder
}
if (!chromium) {
	const pwDir = process.env.PW_DIR;
	if (!pwDir) throw new Error("playwright not found; set PW_DIR to a folder with playwright installed");
	// require() against the sibling install handles CJS cleanly
	const sideRequire = createRequire(pathToFileURL(path.join(pwDir, "package.json")).href);
	chromium = pickChromium(sideRequire("playwright"));
}
if (!chromium) throw new Error("could not load chromium from playwright");

// ---- tiny static server ---------------------------------------------------
const MIME = {
	".html": "text/html; charset=utf-8",
	".css": "text/css; charset=utf-8",
	".js": "text/javascript; charset=utf-8",
	".svg": "image/svg+xml",
	".woff2": "font/woff2",
	".json": "application/json",
};
const server = http.createServer((req, res) => {
	let p = decodeURIComponent(req.url.split("?")[0]);
	if (p === "/") p = "/index.html";
	const file = path.join(ROOT, p);
	if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
		res.writeHead(404);
		return res.end("not found");
	}
	res.writeHead(200, { "Content-Type": MIME[path.extname(file)] || "application/octet-stream" });
	fs.createReadStream(file).pipe(res);
});

// ---- assertion helpers ----------------------------------------------------
let pass = 0;
const failures = [];
function check(name, cond, detail = "") {
	if (cond) {
		pass++;
		console.log(`  PASS  ${name}`);
	} else {
		failures.push(name + (detail ? ` — ${detail}` : ""));
		console.log(`  FAIL  ${name}${detail ? ` — ${detail}` : ""}`);
	}
}

const launchOpts = { headless: true };
if (process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH) {
	launchOpts.executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
	launchOpts.args = ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"];
}

await new Promise((r) => server.listen(PORT, r));
const BASE = `http://localhost:${PORT}/`;
console.log(`\nServing ${ROOT}\n  at ${BASE}\n`);

const browser = await chromium.launch(launchOpts);

try {
	// ====================================================== DESKTOP (1280) ===
	console.log("DESKTOP · 1280×800");
	const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
	const page = await ctx.newPage();

	const consoleErrors = [];
	const isNoise = (t) => /favicon/i.test(t); // browser-initiated favicon probe, not a page bug
	page.on("console", (m) => m.type() === "error" && !isNoise(m.text()) && consoleErrors.push(m.text()));
	page.on("pageerror", (e) => consoleErrors.push("pageerror: " + e.message));

	const resp = await page.goto(BASE, { waitUntil: "networkidle", timeout: 30000 });
	check("page responds 200", resp && resp.status() === 200, resp && String(resp.status()));

	// Title + landmarks
	check("document title is SCHRIFT", (await page.title()).includes("SCHRIFT"));
	check("has <header>, <main>, <footer>", (await page.locator("header, main, footer").count()) >= 3);

	// Tokens applied from :root
	const tokens = await page.evaluate(() => {
		const s = getComputedStyle(document.documentElement);
		return {
			accent: s.getPropertyValue("--accent").trim(),
			fg: s.getPropertyValue("--foreground").trim(),
			radius: s.getPropertyValue("--radius").trim(),
		};
	});
	check("--accent token is #ff3000", tokens.accent.toLowerCase() === "#ff3000", tokens.accent);
	check("--foreground token is #000000", tokens.fg.toLowerCase() === "#000000", tokens.fg);
	check("--radius token is 0px", tokens.radius === "0px", tokens.radius);

	// Headline actually huge (mathematical scale) + uppercase
	const h1 = page.locator("#hero-title");
	const h1size = await h1.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
	check("hero headline ≥ 80px at desktop", h1size >= 80, `${Math.round(h1size)}px`);
	const h1transform = await h1.evaluate((el) => getComputedStyle(el).textTransform);
	check("hero headline is uppercase", h1transform === "uppercase", h1transform);

	// Strict rectangular: no rounded corners on buttons
	const btnRadius = await page.locator(".btn").first().evaluate((el) => getComputedStyle(el).borderRadius);
	check("buttons have 0 border-radius", btnRadius === "0px", btnRadius);

	// Inter loaded (FontFace API)
	const interLoaded = await page.evaluate(async () => {
		await document.fonts.ready;
		return document.fonts.check('900 48px "Inter"') && document.fonts.check('400 16px "Inter"');
	});
	check("Inter font (400 + 900) loaded", interLoaded);

	// Patterns present
	check("grid pattern element present", (await page.locator(".swiss-grid-pattern").count()) >= 1);
	check("dot pattern element present", (await page.locator(".swiss-dots").count()) >= 1);
	check("diagonal pattern element present", (await page.locator(".swiss-diagonal").count()) >= 1);
	const noiseBg = await page.evaluate(() => {
		const b = getComputedStyle(document.body, "::before").backgroundImage;
		return b && b.includes("noise.svg");
	});
	check("global noise texture applied to body", noiseBg);

	// Section count / numbered structure
	check("≥ 6 numbered eyebrows", (await page.locator(".eyebrow__num").count()) >= 6);

	// Stat count-up runs (scroll into view, then read the number)
	await page.locator("#system").scrollIntoViewIfNeeded();
	await page.waitForTimeout(1600);
	const statText = await page.locator(".stat__num[data-count='21']").textContent();
	check("stat counts up to 21:1", statText.trim() === "21:1", statText);

	// FAQ accordion toggles open
	const faqBtn = page.locator(".faq__q").first();
	await faqBtn.scrollIntoViewIfNeeded();
	check("FAQ closed initially (aria-expanded=false)", (await faqBtn.getAttribute("aria-expanded")) === "false");
	await faqBtn.click();
	await page.waitForTimeout(300);
	check("FAQ opens (aria-expanded=true)", (await faqBtn.getAttribute("aria-expanded")) === "true");
	const faqOpen = await page.locator(".faq__item").first().evaluate((el) => el.classList.contains("is-open"));
	check("FAQ item gets .is-open (red inversion)", faqOpen);
	const answerH = await page.locator(".faq__a").first().evaluate((el) => el.getBoundingClientRect().height);
	check("FAQ answer panel expands (height > 0)", answerH > 0, `${Math.round(answerH)}px`);

	// Toggle group selection
	const choices = page.locator(".demo-choices .choice");
	await choices.nth(1).click();
	check("toggle group sets aria-pressed on click", (await choices.nth(1).getAttribute("aria-pressed")) === "true");
	check("toggle group clears previous selection", (await choices.nth(0).getAttribute("aria-pressed")) === "false");

	// CTA form validation + success
	await page.locator("#cta").scrollIntoViewIfNeeded();
	await page.locator("#cta-email").fill("not-an-email");
	await page.locator("#cta-form button[type=submit]").click();
	check("CTA rejects invalid email", (await page.locator("#cta-note").textContent()).includes("valid"));
	await page.locator("#cta-email").fill("studio@schrift.ch");
	await page.locator("#cta-form button[type=submit]").click();
	await page.waitForTimeout(200);
	const okState = await page.locator("#cta-note").getAttribute("data-state");
	check("CTA accepts valid email (success state)", okState === "ok", String(okState));

	// Accessibility: skip link, focus-visible ring color, alt/aria on icons
	check("has skip link to content", (await page.locator("a.sr-only[href='#system']").count()) === 1);
	const decorativeHidden = await page.locator(".hero__panel[aria-hidden='true']").count();
	check("decorative composition is aria-hidden", decorativeHidden === 1);
	const headings = await page.evaluate(() =>
		Array.from(document.querySelectorAll("h1,h2,h3")).map((h) => Number(h.tagName[1])),
	);
	check("exactly one <h1>", headings.filter((n) => n === 1).length === 1);
	check("no console errors", consoleErrors.length === 0, consoleErrors.slice(0, 3).join(" | "));

	await ctx.close();

	// ======================================================= MOBILE (390) ====
	console.log("\nMOBILE · 390×844");
	const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
	const mpage = await mctx.newPage();
	const mErrors = [];
	const isNoiseM = (t) => /favicon/i.test(t);
	mpage.on("console", (m) => m.type() === "error" && !isNoiseM(m.text()) && mErrors.push(m.text()));
	mpage.on("pageerror", (e) => mErrors.push("pageerror: " + e.message));
	await mpage.goto(BASE, { waitUntil: "networkidle", timeout: 30000 });

	// Desktop nav hidden, burger visible
	const navDisplay = await mpage.locator(".nav").evaluate((el) => getComputedStyle(el).display);
	check("desktop nav hidden on mobile", navDisplay === "none", navDisplay);
	const burger = mpage.locator("#burger");
	check("burger visible on mobile", await burger.isVisible());

	// Borders never thin out: a section-defining border is still 4px
	const heroBorder = await mpage.locator(".hero").evaluate((el) => getComputedStyle(el).borderBottomWidth);
	check("section borders stay 4px on mobile", heroBorder === "4px", heroBorder);

	// Drawer opens
	await burger.click();
	await mpage.waitForTimeout(300);
	check("body gets .menu-open after burger tap", await mpage.evaluate(() => document.body.classList.contains("menu-open")));
	const drawerVisible = await mpage.locator("#drawer").evaluate((el) => getComputedStyle(el).visibility);
	check("mobile drawer becomes visible", drawerVisible === "visible", drawerVisible);
	check("burger aria-expanded=true when open", (await burger.getAttribute("aria-expanded")) === "true");

	// Touch target size on drawer links (≥ 44px)
	const linkH = await mpage.locator("#drawer a").first().evaluate((el) => el.getBoundingClientRect().height);
	check("drawer link touch target ≥ 44px", linkH >= 44, `${Math.round(linkH)}px`);

	// No horizontal overflow
	const overflow = await mpage.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
	check("no horizontal overflow on mobile", overflow <= 1, `${overflow}px`);

	// Headline scales down but stays bold/uppercase
	const mh1 = await mpage.locator("#hero-title").evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
	check("hero headline still ≥ 48px on mobile", mh1 >= 48, `${Math.round(mh1)}px`);

	check("no console errors on mobile", mErrors.length === 0, mErrors.slice(0, 3).join(" | "));

	await mctx.close();
} finally {
	await browser.close();
	server.close();
}

// ---- summary --------------------------------------------------------------
console.log(`\n${"=".repeat(48)}`);
if (failures.length === 0) {
	console.log(`ALL CHECKS PASSED · ${pass} assertions`);
	process.exit(0);
} else {
	console.log(`${pass} passed, ${failures.length} FAILED:`);
	failures.forEach((f) => console.log("  · " + f));
	process.exit(1);
}
