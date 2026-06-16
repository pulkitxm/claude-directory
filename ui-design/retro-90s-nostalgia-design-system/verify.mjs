/**
 * Headless verification for WEBMASTER 95 — Retro / 90s Nostalgia design system.
 *
 * CLI-only. Serves the project with a tiny static server, drives headless
 * Chromium (Playwright) through it at desktop (1280) and mobile (390) widths,
 * and asserts the design system is actually wired up. Crucially it walks the
 * prompt's "Signature Visual Checklist" item by item and fails if any is missing.
 *
 * Usage:
 *   PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers \
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
const PORT = Number(process.env.PORT || 5321);

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
	if (!pwDir) throw new Error("playwright not found; set PW_DIR to a folder with playwright installed");
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
	".ttf": "font/ttf",
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

const launchOpts = { headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"] };
if (process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH) {
	launchOpts.executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
}

await new Promise((r) => server.listen(PORT, r));
const BASE = `http://localhost:${PORT}/`;
console.log(`\nServing ${ROOT}\n  at ${BASE}\n`);

const browser = await chromium.launch(launchOpts);

try {
	// ====================================================== DESKTOP (1280) ===
	console.log("DESKTOP · 1280×900");
	const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
	const page = await ctx.newPage();

	const consoleErrors = [];
	const isNoise = (t) => /favicon/i.test(t);
	page.on("console", (m) => m.type() === "error" && !isNoise(m.text()) && consoleErrors.push(m.text()));
	page.on("pageerror", (e) => consoleErrors.push("pageerror: " + e.message));

	const resp = await page.goto(BASE, { waitUntil: "networkidle", timeout: 30000 });
	check("page responds 200", resp && resp.status() === 200, resp && String(resp.status()));

	// Title + landmarks
	check("document title is WEBMASTER 95", (await page.title()).includes("WEBMASTER 95"));
	check("has <header>(taskbar role)/<nav>/<main>/<footer>", (await page.locator("nav, main, footer").count()) >= 3);
	const headings = await page.evaluate(() =>
		Array.from(document.querySelectorAll("h1,h2,h3")).map((h) => Number(h.tagName[1])),
	);
	check("exactly one <h1>", headings.filter((n) => n === 1).length === 1);

	// Tokens applied from :root
	const tokens = await page.evaluate(() => {
		const s = getComputedStyle(document.documentElement);
		return {
			background: s.getPropertyValue("--background").trim(),
			accent: s.getPropertyValue("--accent").trim(),
			titleBar: s.getPropertyValue("--title-bar").trim(),
			radius: s.getPropertyValue("--radius").trim(),
		};
	});
	check("--background token is #c0c0c0", tokens.background.toLowerCase() === "#c0c0c0", tokens.background);
	check("--accent token is #0000ff", tokens.accent.toLowerCase() === "#0000ff", tokens.accent);
	check("--title-bar token is #000080", tokens.titleBar.toLowerCase() === "#000080", tokens.titleBar);
	check("--radius token is 0px", tokens.radius === "0px", tokens.radius);

	// Fonts vendored + loaded
	const fontsLoaded = await page.evaluate(async () => {
		await document.fonts.ready;
		return {
			body: document.fonts.check('16px "MS Sans Serif"'),
			head: document.fonts.check('48px "Anton"'),
			mono: document.fonts.check('20px "VT323"'),
		};
	});
	check("MS Sans Serif body font loaded", fontsLoaded.body);
	check("Anton heading font loaded", fontsLoaded.head);
	check("VT323 monospace font loaded", fontsLoaded.mono);

	// ========================= SIGNATURE VISUAL CHECKLIST (15 items) =========
	console.log("\n  -- Signature Visual Checklist --");

	// 1. marquee with colorful text
	const marqueeCount = await page.locator(".marquee .marquee__track span").count();
	check("[1] marquee element with multiple colored spans", marqueeCount >= 6, `${marqueeCount} spans`);
	const marqueeAnimated = await page.locator(".marquee__track").first().evaluate((el) => {
		const a = getComputedStyle(el).animationName;
		return a && a !== "none";
	});
	check("[1] marquee track is animated (CSS marquee)", marqueeAnimated);

	// 2. rainbow animated text
	const rainbow = await page.locator(".text-rainbow").first().evaluate((el) => {
		const cs = getComputedStyle(el);
		return { name: cs.animationName, dur: cs.animationDuration };
	});
	check("[2] rainbow text uses rainbow keyframes", rainbow.name === "rainbow", rainbow.name);
	check("[2] rainbow cycle is ~4s linear", rainbow.dur === "4s", rainbow.dur);

	// 3. buttons have outset bevels with the 4-value border-color
	const btnEdges = await page.locator(".btn").first().evaluate((el) => {
		const cs = getComputedStyle(el);
		return {
			top: cs.borderTopColor,
			right: cs.borderRightColor,
			radius: cs.borderTopLeftRadius,
			shadow: cs.boxShadow,
		};
	});
	check("[3] button top/left edge is white", btnEdges.top === "rgb(255, 255, 255)", btnEdges.top);
	check("[3] button right/bottom edge is gray", btnEdges.right === "rgb(128, 128, 128)", btnEdges.right);
	check("[3] button has inset box-shadow bevel", /inset/.test(btnEdges.shadow));
	check("[3] button border-radius is 0", btnEdges.radius === "0px", btnEdges.radius);

	// 4. card with Windows 95 title bar gradient
	const barGradient = await page.locator(".window__bar").first().evaluate((el) => getComputedStyle(el).backgroundImage);
	check("[4] title bar has navy→blue linear-gradient", /linear-gradient/.test(barGradient) && /0, 0, 128/.test(barGradient), barGradient.slice(0, 60));

	// 5. tiled background pattern on body
	const bodyBg = await page.evaluate(() => getComputedStyle(document.body).backgroundImage);
	check("[5] tiled crosshatch background on body", (bodyBg.match(/linear-gradient/g) || []).length >= 4);

	// 6. hyperlinks blue + underlined, red on hover
	const link = page.locator("a.link").first();
	const linkStyle = await link.evaluate((el) => {
		const cs = getComputedStyle(el);
		return { color: cs.color, deco: cs.textDecorationLine };
	});
	check("[6] link is blue", linkStyle.color === "rgb(0, 0, 255)", linkStyle.color);
	check("[6] link is underlined", linkStyle.deco.includes("underline"), linkStyle.deco);
	await link.hover();
	const hoverColor = await link.evaluate((el) => getComputedStyle(el).color);
	check("[6] link turns red on hover", hoverColor === "rgb(255, 0, 0)", hoverColor);

	// 7. alternating row backgrounds
	const rowColors = await page.evaluate(() => {
		const rows = Array.from(document.querySelectorAll(".specimen__row")).slice(0, 2);
		return rows.map((r) => getComputedStyle(r).backgroundColor);
	});
	check("[7] alternating rows differ (odd vs even)", rowColors[0] !== rowColors[1], rowColors.join(" vs "));

	// 8. groove HR divider
	const hrCount = await page.locator("hr.hr-groove").count();
	const hrStyle = await page.locator("hr.hr-groove").first().evaluate((el) => {
		const cs = getComputedStyle(el);
		return { h: cs.height, bg: cs.backgroundImage };
	});
	check("[8] multiple groove HR dividers present", hrCount >= 4, `${hrCount} dividers`);
	check("[8] groove HR is 4px with gradient", hrStyle.h === "4px" && /linear-gradient/.test(hrStyle.bg), hrStyle.h);

	// 9. hit counter, green monospace, count-up
	await page.locator("#stats").scrollIntoViewIfNeeded();
	await page.waitForTimeout(2200);
	const counterDigit = await page.locator(".counter__digit").first().evaluate((el) => {
		const cs = getComputedStyle(el);
		return { color: cs.color, family: cs.fontFamily };
	});
	check("[9] hit counter digits are green", counterDigit.color === "rgb(0, 255, 0)", counterDigit.color);
	check("[9] hit counter digits are monospace (VT323)", /VT323/.test(counterDigit.family), counterDigit.family);
	const counterText = await page.locator("#hitCounter").evaluate((el) => el.textContent.replace(/\s/g, ""));
	check("[9] hit counter counted up to 1048576", counterText === "1048576", counterText);
	const stat100 = await page.locator('.statline__num[data-count="100"]').textContent();
	check("[9] stat band counts up (100%)", stat100.trim() === "100%", stat100);

	// 10. NEW!/HOT! badge with pulse animation
	const pulse = await page.locator(".pulse-glow").first().evaluate((el) => getComputedStyle(el).animationName);
	check("[10] NEW!/HOT! badge has pulse-glow animation", /pulse-glow/.test(pulse), pulse);
	check("[10] has a NEW! and a HOT! badge", (await page.getByText("NEW!", { exact: true }).count()) >= 1 && (await page.getByText("HOT!", { exact: true }).count()) >= 1);

	// 11. construction stripe background
	const stripe = await page.locator(".bg-construction").first().evaluate((el) => getComputedStyle(el).backgroundImage);
	check("[11] construction stripes (repeating 45deg yellow/black)", /repeating-linear-gradient/.test(stripe) && /255, 255, 0/.test(stripe));

	// 12. dotted focus outlines — must come from real keyboard focus, which is
	// how :focus-visible behaves (programmatic .focus() won't trigger it). Walk
	// the Tab order until the visible "Default" button is the active element.
	const defaultBtn = page.locator("button.btn", { hasText: "Default" }).first();
	await defaultBtn.scrollIntoViewIfNeeded();
	let onButton = false;
	for (let i = 0; i < 60 && !onButton; i++) {
		await page.keyboard.press("Tab");
		onButton = await page.evaluate(() => {
			const e = document.activeElement;
			return !!e && e.tagName === "BUTTON" && /\bbtn\b/.test(e.className) && e.textContent.trim() === "Default";
		});
	}
	const focusStyle = await page.evaluate(() => {
		const cs = getComputedStyle(document.activeElement);
		return { style: cs.outlineStyle, width: cs.outlineWidth };
	});
	check("[12] keyboard-focused button shows dotted 2px outline", onButton && focusStyle.style === "dotted" && focusStyle.width === "2px", `${focusStyle.style} ${focusStyle.width} reached=${onButton}`);

	// 13. active buttons show pressed state (inset + translate). Use a VISIBLE
	// button — a display:none element computes transform as 'none'.
	const pressed = await defaultBtn.evaluate((el) => {
		el.classList.add("is-pressed");
		const cs = getComputedStyle(el);
		const out = { transform: cs.transform, top: cs.borderTopColor };
		el.classList.remove("is-pressed");
		return out;
	});
	check("[13] pressed button translates (matrix not 'none')", pressed.transform !== "none" && pressed.transform.includes("1, 1"), pressed.transform);
	check("[13] pressed button edge flips to gray (inset)", pressed.top === "rgb(128, 128, 128)", pressed.top);

	// 14. icons have 2px stroke width
	const strokeW = await page.locator("svg symbol").first().evaluate((el) => el.getAttribute("stroke-width"));
	check("[14] icon symbols declare stroke-width=2", strokeW === "2", String(strokeW));
	const renderedStroke = await page.locator(".feature__icon svg use").first().evaluate((el) => {
		// the <use> inherits the symbol's stroke-width; read the resolved value
		const sym = document.querySelector("symbol");
		return sym ? getComputedStyle(sym).strokeWidth : "";
	});
	check("[14] icon stroke renders thick (2px)", renderedStroke === "2px" || renderedStroke === "2", renderedStroke);

	// 15. zero border-radius anywhere on rendered elements
	const radii = await page.evaluate(() => {
		const els = Array.from(document.querySelectorAll("*"));
		const offenders = [];
		for (const el of els) {
			const cs = getComputedStyle(el);
			for (const prop of ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius"]) {
				if (cs[prop] !== "0px") {
					offenders.push(el.className + ":" + prop + "=" + cs[prop]);
					break;
				}
			}
			if (offenders.length > 5) break;
		}
		return offenders;
	});
	check("[15] ZERO border-radius on every element", radii.length === 0, radii.slice(0, 4).join(" | "));

	// ----------------------------------------------------- interactivity ----
	console.log("\n  -- Interactivity --");

	// token copy
	const tokenBtns = await page.locator("#tokenGrid .token").count();
	check("token grid rendered (16 tokens)", tokenBtns === 16, `${tokenBtns}`);

	// color swatch mixer
	await page.locator("#squares").scrollIntoViewIfNeeded();
	const swatches = page.locator("#swatchGrid .swatch");
	check("12 color swatches rendered", (await swatches.count()) === 12);
	await swatches.nth(0).click();
	const preview = await page.locator("#mixerPreview").textContent();
	check("clicking a swatch updates the preview to its hex", preview.trim() === "#FF0000", preview);
	check("clicked swatch gets aria-pressed=true", (await swatches.nth(0).getAttribute("aria-pressed")) === "true");

	// tabs
	const tab2 = page.locator("#tab-2");
	await tab2.click();
	check("clicking a tab selects it (aria-selected)", (await tab2.getAttribute("aria-selected")) === "true");
	check("selected tab reveals its panel", !(await page.locator("#panel-2").isHidden()));
	check("other panels hidden", await page.locator("#panel-1").isHidden());

	// guestbook form: invalid then valid
	await page.locator("#guestbook").scrollIntoViewIfNeeded();
	await page.locator("#gbForm button[type=submit]").click();
	check("guestbook rejects empty submit", (await page.locator("#gbNote").getAttribute("data-state")) === "err");
	const beforeCount = await page.locator("#guestbookList .gb-entry").count();
	await page.locator("#gbName").fill("TestSurfer_77");
	await page.locator("#gbMsg").fill("radical bevels!!");
	await page.locator("#gbForm button[type=submit]").click();
	await page.waitForTimeout(150);
	const afterCount = await page.locator("#guestbookList .gb-entry").count();
	check("guestbook adds a new entry on valid submit", afterCount === beforeCount + 1, `${beforeCount}->${afterCount}`);
	check("new guestbook entry lands on top", (await page.locator("#guestbookList .gb-entry").first().textContent()).includes("TestSurfer_77"));

	// CTA form
	await page.locator("#cta").scrollIntoViewIfNeeded();
	await page.locator("#ctaEmail").fill("not-an-email");
	await page.locator("#ctaForm button[type=submit]").click();
	check("CTA rejects invalid email", (await page.locator("#ctaNote").getAttribute("data-state")) === "err");
	await page.locator("#ctaEmail").fill("surfer@geocities.com");
	await page.locator("#ctaForm button[type=submit]").click();
	await page.waitForTimeout(120);
	check("CTA accepts valid email", (await page.locator("#ctaNote").getAttribute("data-state")) === "ok");

	// start menu
	await page.locator("#startBtn").click();
	check("start button opens the start menu", !(await page.locator("#startMenu").isHidden()));
	check("start button aria-expanded=true", (await page.locator("#startBtn").getAttribute("aria-expanded")) === "true");
	await page.keyboard.press("Escape");
	check("Escape closes the start menu", await page.locator("#startMenu").isHidden());

	check("no console errors (desktop)", consoleErrors.length === 0, consoleErrors.slice(0, 3).join(" | "));

	await ctx.close();

	// ======================================================= MOBILE (390) ====
	console.log("\nMOBILE · 390×844");
	const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
	const mpage = await mctx.newPage();
	const mErrors = [];
	mpage.on("console", (m) => m.type() === "error" && !/favicon/i.test(m.text()) && mErrors.push(m.text()));
	mpage.on("pageerror", (e) => mErrors.push("pageerror: " + e.message));
	await mpage.goto(BASE, { waitUntil: "networkidle", timeout: 30000 });

	// desktop nav links hidden, burger visible
	const linksDisplay = await mpage.locator("#navlinks").evaluate((el) => getComputedStyle(el).display);
	check("nav links hidden on mobile (collapsed)", linksDisplay === "none", linksDisplay);
	check("burger visible on mobile", await mpage.locator("#burger").isVisible());

	// bevels survive on mobile (button still has inset shadow + white top edge)
	const mBtn = await mpage.locator(".btn").first().evaluate((el) => {
		const cs = getComputedStyle(el);
		return { shadow: cs.boxShadow, top: cs.borderTopColor };
	});
	check("bevels kept on mobile (inset shadow)", /inset/.test(mBtn.shadow));
	check("bevel edges kept on mobile (white top)", mBtn.top === "rgb(255, 255, 255)", mBtn.top);

	// marquee still scrolls on mobile
	const mMarquee = await mpage.locator(".marquee__track").first().evaluate((el) => getComputedStyle(el).animationName);
	check("marquee continues to scroll on mobile", mMarquee === "marquee", mMarquee);

	// burger opens nav
	await mpage.locator("#burger").click();
	check("body gets .nav-open after burger tap", await mpage.evaluate(() => document.body.classList.contains("nav-open")));
	check("nav links visible after tap", await mpage.locator("#navlinks").isVisible());

	// no horizontal overflow
	const overflow = await mpage.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
	check("no horizontal overflow on mobile", overflow <= 1, `${overflow}px`);

	// headline still big & uppercase
	const mh1 = await mpage.locator("h1").first().evaluate((el) => ({
		size: parseFloat(getComputedStyle(el).fontSize),
		tt: getComputedStyle(el).textTransform,
	}));
	check("hero headline still ≥ 40px on mobile", mh1.size >= 40, `${Math.round(mh1.size)}px`);
	check("hero headline uppercase on mobile", mh1.tt === "uppercase", mh1.tt);

	check("no console errors (mobile)", mErrors.length === 0, mErrors.slice(0, 3).join(" | "));

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
