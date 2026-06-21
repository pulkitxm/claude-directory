/**
 * Headless verification for SOFTFORM — Neumorphism (Soft UI) design system.
 *
 * CLI-only. Serves the project with a tiny static server, drives headless
 * Chromium (Playwright) through it at desktop (1280) and mobile (390) widths,
 * and asserts the design system is actually wired up: cool-grey tokens applied,
 * both display + body fonts loaded, the dual-RGBA shadow ladder produces real
 * box-shadows (raised vs inset vs inset-deep), NO borders anywhere, nested depth
 * present, every interactive control works (theme toggle, switch, segmented,
 * slider, signup validation, mobile menu), focus rings, touch targets, and no
 * console errors.
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
const PORT = Number(process.env.PORT || 5377);

// ---- resolve playwright from a sibling install if not local --------------
const require = createRequire(import.meta.url);
let chromium;
function pickChromium(mod) {
	return mod.chromium || (mod.default && mod.default.chromium);
}
try {
	chromium = pickChromium(require("playwright"));
} catch {
	/* not resolvable from this folder */
}
if (!chromium) {
	const pwDir = process.env.PW_DIR;
	if (!pwDir)
		throw new Error(
			"playwright not found; set PW_DIR to a folder with playwright installed",
		);
	const sideRequire = createRequire(
		pathToFileURL(path.join(pwDir, "package.json")).href,
	);
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
	if (
		!file.startsWith(ROOT) ||
		!fs.existsSync(file) ||
		fs.statSync(file).isDirectory()
	) {
		res.writeHead(404);
		return res.end("not found");
	}
	res.writeHead(200, {
		"Content-Type": MIME[path.extname(file)] || "application/octet-stream",
	});
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

// box-shadow string -> classify as inset / raised, and how many comma layers
function shadowInfo(bs) {
	const has = bs && bs !== "none";
	return {
		has,
		inset: /inset/.test(bs),
		// two comma-separated layers => dual opposing shadow (split on the layer comma, not rgba commas)
		layers: has ? bs.split(/,(?![^()]*\))/).length : 0,
	};
}

const launchOpts = { headless: true };
if (process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH) {
	launchOpts.executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
	launchOpts.args = [
		"--no-sandbox",
		"--disable-setuid-sandbox",
		"--disable-dev-shm-usage",
	];
}

await new Promise((r) => server.listen(PORT, r));
const BASE = `http://localhost:${PORT}/`;
console.log(`\nServing ${ROOT}\n  at ${BASE}\n`);

const browser = await chromium.launch(launchOpts);

try {
	// ====================================================== DESKTOP (1280) ===
	console.log("DESKTOP · 1280×800");
	const ctx = await browser.newContext({
		viewport: { width: 1280, height: 800 },
	});
	const page = await ctx.newPage();

	const consoleErrors = [];
	const isNoise = (t) => /favicon/i.test(t);
	page.on(
		"console",
		(m) =>
			m.type() === "error" &&
			!isNoise(m.text()) &&
			consoleErrors.push(m.text()),
	);
	page.on("pageerror", (e) => consoleErrors.push("pageerror: " + e.message));

	const resp = await page.goto(BASE, {
		waitUntil: "networkidle",
		timeout: 30000,
	});
	check(
		"page responds 200",
		resp && resp.status() === 200,
		resp && String(resp.status()),
	);

	// Title + landmarks
	check(
		"document title is SOFTFORM",
		(await page.title()).includes("SOFTFORM"),
	);
	check(
		"has <header>, <main>, <footer>",
		(await page.locator("header, main, footer").count()) >= 3,
	);

	// Tokens applied from :root
	const tokens = await page.evaluate(() => {
		const s = getComputedStyle(document.documentElement);
		return {
			bg: s.getPropertyValue("--bg").trim(),
			fg: s.getPropertyValue("--fg").trim(),
			accent: s.getPropertyValue("--accent").trim(),
			rCard: s.getPropertyValue("--r-card").trim(),
			rBase: s.getPropertyValue("--r-base").trim(),
			sd: s.getPropertyValue("--sd").trim(),
			sl: s.getPropertyValue("--sl").trim(),
		};
	});
	check(
		"--bg token is #e0e5ec",
		tokens.bg.toLowerCase() === "#e0e5ec",
		tokens.bg,
	);
	check(
		"--fg token is #3d4852",
		tokens.fg.toLowerCase() === "#3d4852",
		tokens.fg,
	);
	check(
		"--accent token is #6c63ff",
		tokens.accent.toLowerCase() === "#6c63ff",
		tokens.accent,
	);
	check("--r-card token is 32px", tokens.rCard === "32px", tokens.rCard);
	check("--r-base token is 16px", tokens.rBase === "16px", tokens.rBase);
	check(
		"dark-shadow RGB channels are 163,177,198",
		tokens.sd.replace(/\s/g, "") === "163,177,198",
		tokens.sd,
	);
	check(
		"light-shadow RGB channels are 255,255,255",
		tokens.sl.replace(/\s/g, "") === "255,255,255",
		tokens.sl,
	);

	// Page background actually paints the cool clay surface
	const bodyBg = await page.evaluate(
		() => getComputedStyle(document.body).backgroundColor,
	);
	check(
		"body background is rgb(224,229,236)",
		bodyBg === "rgb(224, 229, 236)",
		bodyBg,
	);

	// Both fonts loaded (FontFace API)
	const fontsLoaded = await page.evaluate(async () => {
		await document.fonts.ready;
		return {
			jakarta: document.fonts.check('800 48px "Plus Jakarta Sans"'),
			dm: document.fonts.check('400 16px "DM Sans"'),
		};
	});
	check("Plus Jakarta Sans (display) loaded", fontsLoaded.jakarta);
	check("DM Sans (body) loaded", fontsLoaded.dm);

	// Hero headline large + display font
	const h1 = page.locator("#hero-title");
	const h1size = await h1.evaluate((el) =>
		parseFloat(getComputedStyle(el).fontSize),
	);
	check(
		"hero headline ≥ 56px at desktop",
		h1size >= 56,
		`${Math.round(h1size)}px`,
	);
	const h1fam = await h1.evaluate((el) => getComputedStyle(el).fontFamily);
	check(
		"hero headline uses Plus Jakarta Sans",
		/Plus Jakarta Sans/.test(h1fam),
		h1fam,
	);

	// ---- THE PHYSICS: dual opposing RGBA shadows on raised/inset/inset-deep ---
	const raised = await page
		.locator(".feature-card.raised")
		.first()
		.evaluate((el) => getComputedStyle(el).boxShadow);
	const ri = shadowInfo(raised);
	check("extruded card has a box-shadow", ri.has);
	check("extruded shadow is NOT inset (raised)", ri.has && !ri.inset);
	check(
		"extruded shadow has dual (2) layers",
		ri.layers === 2,
		`${ri.layers} layers`,
	);
	check(
		"extruded shadow uses rgba alpha (not opaque hex)",
		/rgba?\([^)]*0\.\d/.test(raised),
		raised.slice(0, 60),
	);

	const wellShadow = await page
		.locator(".icon-well.inset-deep")
		.first()
		.evaluate((el) => getComputedStyle(el).boxShadow);
	const wi = shadowInfo(wellShadow);
	check("icon well is inset (drilled)", wi.has && wi.inset);
	check(
		"icon well inset has dual (2) layers",
		wi.layers === 2,
		`${wi.layers} layers`,
	);

	// inset-deep should be visibly deeper than plain inset (larger first offset)
	const insetOffsets = await page.evaluate(() => {
		const read = (sel) => {
			const el = document.querySelector(sel);
			if (!el) return null;
			const m = getComputedStyle(el).boxShadow.match(
				/inset\s+rgba?\([^)]*\)\s+(-?\d+(?:\.\d+)?)px/,
			);
			// fallback: grab first px offset anywhere in the string
			const any = getComputedStyle(el).boxShadow.match(/(-?\d+(?:\.\d+)?)px/);
			return m ? parseFloat(m[1]) : any ? Math.abs(parseFloat(any[1])) : null;
		};
		return {
			inset: read(".depth-chip.inset"),
			deep: read(".depth-chip.inset-deep"),
		};
	});
	check(
		"inset-deep is deeper than inset",
		insetOffsets.inset != null &&
			insetOffsets.deep != null &&
			Math.abs(insetOffsets.deep) > Math.abs(insetOffsets.inset),
		`inset=${insetOffsets.inset} deep=${insetOffsets.deep}`,
	);

	// ---- NO BORDERS anywhere (neumorphism defines edges with shadow only) ----
	const borderedCount = await page.evaluate(() => {
		let n = 0;
		for (const el of document.querySelectorAll("*")) {
			const s = getComputedStyle(el);
			const w =
				parseFloat(s.borderTopWidth) +
				parseFloat(s.borderRightWidth) +
				parseFloat(s.borderBottomWidth) +
				parseFloat(s.borderLeftWidth);
			if (w > 0 && s.borderTopStyle !== "none") n++;
		}
		return n;
	});
	check(
		"no visible borders anywhere (shadow-defined edges)",
		borderedCount === 0,
		`${borderedCount} bordered els`,
	);

	// Hyper-rounded corners on cards
	const cardRadius = await page
		.locator(".feature-card")
		.first()
		.evaluate((el) => getComputedStyle(el).borderTopLeftRadius);
	check("cards are 32px rounded", cardRadius === "32px", cardRadius);

	// Nested depth: a raised bump living inside an inset-deep well inside a raised card
	const nested = await page.evaluate(() => {
		const card = document.querySelector(".nested-card");
		const well = card && card.querySelector(".nested-well");
		const bump = well && well.querySelector(".nested-bump");
		if (!card || !well || !bump) return null;
		return {
			card: getComputedStyle(card).boxShadow,
			well: getComputedStyle(well).boxShadow,
			bump: getComputedStyle(bump).boxShadow,
		};
	});
	check(
		"nested depth: card raised",
		nested && !/inset/.test(nested.card) && nested.card !== "none",
	);
	check("nested depth: well inset", nested && /inset/.test(nested.well));
	check(
		"nested depth: bump raised again",
		nested && !/inset/.test(nested.bump) && nested.bump !== "none",
	);

	// Concentric-circle decorative art + floating animation present
	check(
		"hero has concentric rings",
		(await page.locator(".orbit-stack .ring").count()) >= 4,
	);
	const floatAnim = await page
		.locator(".orbit-stack.float")
		.first()
		.evaluate((el) => getComputedStyle(el).animationName);
	check(
		"decorative art uses float keyframes",
		floatAnim === "float",
		floatAnim,
	);

	// Hero stat count-ups
	await page.locator(".hero-stats").scrollIntoViewIfNeeded();
	await page.waitForTimeout(1400);
	const statText = await page
		.locator('.stat-num[data-count="4"]')
		.textContent();
	check("hero stat counts up to 4", statText.trim() === "4", statText);

	// ---- COMPONENT PLAYGROUND interactions ----
	// Switch toggles aria-checked + thumb travels
	const sw = page.locator("#demo-switch");
	await sw.scrollIntoViewIfNeeded();
	check(
		"switch starts checked",
		(await sw.getAttribute("aria-checked")) === "true",
	);
	await sw.click();
	check(
		"switch toggles to unchecked",
		(await sw.getAttribute("aria-checked")) === "false",
	);
	await sw.click();
	check(
		"switch toggles back to checked",
		(await sw.getAttribute("aria-checked")) === "true",
	);

	// Segmented control selection
	const segs = page.locator(".segmented .seg");
	check(
		"segmented default is 'Medium'",
		(await segs.nth(1).getAttribute("aria-pressed")) === "true",
	);
	await segs.nth(2).click();
	check(
		"segmented sets aria-pressed on click",
		(await segs.nth(2).getAttribute("aria-pressed")) === "true",
	);
	check(
		"segmented clears previous selection",
		(await segs.nth(1).getAttribute("aria-pressed")) === "false",
	);

	// Slider: keyboard increments aria-valuenow and moves fill width
	const thumb = page.locator("#slider-thumb");
	await thumb.scrollIntoViewIfNeeded();
	const before = Number(await thumb.getAttribute("aria-valuenow"));
	await thumb.focus();
	await page.keyboard.press("ArrowRight");
	await page.keyboard.press("ArrowRight");
	const after = Number(await thumb.getAttribute("aria-valuenow"));
	check(
		"slider responds to keyboard (value increases)",
		after > before,
		`${before} -> ${after}`,
	);
	const fillW = await page
		.locator("#slider-fill")
		.evaluate((el) => parseFloat(el.style.width));
	check(
		"slider fill width tracks value",
		Math.abs(fillW - after) < 0.5,
		`${fillW}% vs ${after}`,
	);

	// Input focus deepens the well + gains an accent ring (spec requirement)
	const fieldRest = await page
		.locator("#field-name")
		.evaluate((el) => getComputedStyle(el).boxShadow);
	await page.locator("#field-name").focus();
	const fieldFocus = await page
		.locator("#field-name")
		.evaluate((el) => getComputedStyle(el).boxShadow);
	check("input has inset shadow at rest", /inset/.test(fieldRest));
	check(
		"focused input gains accent ring",
		fieldFocus.includes("108, 99, 255"),
		fieldFocus.slice(0, 70),
	);
	check("focused input keeps an inset (deep) well", /inset/.test(fieldFocus));

	// Signup validation: reject invalid, accept valid
	await page.locator("#cta").scrollIntoViewIfNeeded();
	await page.locator("#signup-email").fill("not-an-email");
	await page.locator("#signup-form button[type=submit]").click();
	check(
		"signup rejects invalid email",
		(await page.locator("#signup-note").getAttribute("data-state")) === "error",
	);
	await page.locator("#signup-email").fill("studio@softform.io");
	await page.locator("#signup-form button[type=submit]").click();
	await page.waitForTimeout(150);
	check(
		"signup accepts valid email (ok state)",
		(await page.locator("#signup-note").getAttribute("data-state")) === "ok",
	);

	// Primary button is the only accent surface (sparing accent use)
	const primaryBg = await page
		.locator(".btn-primary")
		.first()
		.evaluate((el) => getComputedStyle(el).backgroundImage);
	check(
		"primary button uses accent gradient",
		/gradient/.test(primaryBg) && /108, 99, 255/.test(primaryBg),
		primaryBg.slice(0, 60),
	);

	// Disabled button is non-interactive
	const disabledBtn = page.locator("button.btn[disabled]").first();
	check("a disabled button exists", (await disabledBtn.count()) === 1);

	// ---- THEME TOGGLE flips tokens (soft dark mode) ----
	const themeBtn = page.locator("#theme-toggle");
	await themeBtn.click();
	await page.waitForTimeout(120);
	const darkBg = await page.evaluate(() =>
		getComputedStyle(document.documentElement).getPropertyValue("--bg").trim(),
	);
	check(
		"theme toggle switches to soft dark surface",
		darkBg.toLowerCase() === "#2c303a",
		darkBg,
	);
	check(
		"theme toggle aria-pressed=true",
		(await themeBtn.getAttribute("aria-pressed")) === "true",
	);
	// and back
	await themeBtn.click();
	await page.waitForTimeout(120);
	const lightBg = await page.evaluate(() =>
		getComputedStyle(document.documentElement).getPropertyValue("--bg").trim(),
	);
	check(
		"theme toggles back to light",
		lightBg.toLowerCase() === "#e0e5ec",
		lightBg,
	);

	// ---- ACCESSIBILITY ----
	check(
		"has skip link",
		(await page.locator("a.skip-link[href='#features']").count()) === 1,
	);
	const headings = await page.evaluate(() =>
		Array.from(document.querySelectorAll("h1,h2,h3")).map((h) =>
			Number(h.tagName[1]),
		),
	);
	check("exactly one <h1>", headings.filter((n) => n === 1).length === 1);
	// Every aria-labelledby target must resolve to a real element id.
	const danglingLabels = await page.evaluate(() =>
		Array.from(document.querySelectorAll("[aria-labelledby]"))
			.map((el) => el.getAttribute("aria-labelledby"))
			.filter((id) => !document.getElementById(id)),
	);
	check(
		"all aria-labelledby targets resolve",
		danglingLabels.length === 0,
		danglingLabels.join(", "),
	);
	// Keyboard focus shows a visible accent ring (:focus-visible). Drive it with
	// real Tab presses from a clean state so the browser's focus-visible heuristic
	// fires exactly as it does for a keyboard user. (Programmatic .focus() does NOT
	// trigger :focus-visible, by design.)
	await page.evaluate(() => {
		window.scrollTo(0, 0);
		document.activeElement.blur();
	});
	await page.keyboard.press("Tab"); // -> skip link (first focusable)
	const ringShadow = await page.evaluate(() => {
		const el = document.activeElement;
		return {
			tag: el.tagName,
			cls: el.className,
			fv: el.matches(":focus-visible"),
			shadow: getComputedStyle(el).boxShadow,
		};
	});
	check(
		"keyboard focus triggers :focus-visible",
		ringShadow.fv === true,
		`${ringShadow.tag}.${ringShadow.cls}`,
	);
	check(
		"keyboard focus ring uses accent colour",
		/108, 99, 255/.test(ringShadow.shadow),
		`${ringShadow.tag}.${ringShadow.cls}: ${ringShadow.shadow.slice(0, 60)}`,
	);

	check(
		"no console errors",
		consoleErrors.length === 0,
		consoleErrors.slice(0, 3).join(" | "),
	);

	await ctx.close();

	// ======================================================= MOBILE (390) ====
	console.log("\nMOBILE · 390×844");
	const mctx = await browser.newContext({
		viewport: { width: 390, height: 844 },
		isMobile: true,
		hasTouch: true,
	});
	const mpage = await mctx.newPage();
	const mErrors = [];
	mpage.on(
		"console",
		(m) =>
			m.type() === "error" &&
			!/favicon/i.test(m.text()) &&
			mErrors.push(m.text()),
	);
	mpage.on("pageerror", (e) => mErrors.push("pageerror: " + e.message));
	await mpage.goto(BASE, { waitUntil: "networkidle", timeout: 30000 });

	// Desktop nav hidden, burger visible
	const navDisplay = await mpage
		.locator(".nav")
		.evaluate((el) => getComputedStyle(el).display);
	check("desktop nav hidden on mobile", navDisplay === "none", navDisplay);
	const burger = mpage.locator("#burger");
	check("burger visible on mobile", await burger.isVisible());

	// Touch target ≥ 44px on the burger
	const burgerBox = await burger.evaluate((el) => {
		const r = el.getBoundingClientRect();
		return Math.min(r.width, r.height);
	});
	check(
		"burger touch target ≥ 44px",
		burgerBox >= 44,
		`${Math.round(burgerBox)}px`,
	);

	// Mobile menu opens
	check(
		"mobile menu hidden initially",
		await mpage.locator("#mobile-menu").evaluate((el) => el.hidden),
	);
	await burger.click();
	await mpage.waitForTimeout(200);
	check(
		"burger aria-expanded=true after tap",
		(await burger.getAttribute("aria-expanded")) === "true",
	);
	check(
		"mobile menu becomes visible",
		await mpage.locator("#mobile-menu").isVisible(),
	);
	const linkH = await mpage
		.locator("#mobile-menu a")
		.first()
		.evaluate((el) => el.getBoundingClientRect().height);
	check(
		"mobile menu link touch target ≥ 44px",
		linkH >= 44,
		`${Math.round(linkH)}px`,
	);

	// No horizontal overflow
	const overflow = await mpage.evaluate(
		() =>
			document.documentElement.scrollWidth -
			document.documentElement.clientWidth,
	);
	check("no horizontal overflow on mobile", overflow <= 1, `${overflow}px`);

	// Headline scales down but stays large + display font
	const mh1 = await mpage
		.locator("#hero-title")
		.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
	check("hero headline ≥ 36px on mobile", mh1 >= 36, `${Math.round(mh1)}px`);

	// Cards keep their soft 32px radius on mobile (no border thinning)
	const mCardRadius = await mpage
		.locator(".feature-card")
		.first()
		.evaluate((el) => getComputedStyle(el).borderTopLeftRadius);
	check(
		"cards stay 32px rounded on mobile",
		mCardRadius === "32px",
		mCardRadius,
	);

	// Shadows still dual-layer (depth maintained on mobile)
	const mShadow = shadowInfo(
		await mpage
			.locator(".feature-card")
			.first()
			.evaluate((el) => getComputedStyle(el).boxShadow),
	);
	check(
		"shadows keep dual layers on mobile",
		mShadow.layers === 2,
		`${mShadow.layers} layers`,
	);

	check(
		"no console errors on mobile",
		mErrors.length === 0,
		mErrors.slice(0, 3).join(" | "),
	);

	await mctx.close();
} finally {
	await browser.close();
	server.close();
}

// ---- summary --------------------------------------------------------------
console.log(`\n${"=".repeat(52)}`);
if (failures.length === 0) {
	console.log(`ALL CHECKS PASSED · ${pass} assertions`);
	process.exit(0);
} else {
	console.log(`${pass} passed, ${failures.length} FAILED:`);
	failures.forEach((f) => console.log("  · " + f));
	process.exit(1);
}
