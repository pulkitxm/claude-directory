/* Headless CLI verification for the LOUDHOUSE Neo-brutalism showcase.
 *
 * Boots a headless Chromium against a running server (Vite preview by default)
 * and asserts every load-bearing signature of the design system is actually in
 * the DOM and behaving:
 *   - the design tokens resolve on real elements (cream bg, black ink),
 *   - structure is enforced with thick (4px+) black borders,
 *   - shadows are HARD (offset, ZERO blur),
 *   - display type is Space Grotesk, uppercase, tight-tracked, with stroke text,
 *   - sticker rotations are applied to real containers,
 *   - buttons CLICK DOWN (translate onto their shadow on :active),
 *   - cards LIFT on hover (translate up + shadow grows),
 *   - the marquees animate,
 *   - the input floods YELLOW on focus (not a soft ring),
 *   - the FAQ accordion is single-open + keyboard operable with sound ARIA,
 *   - the stat counters count up,
 *   - core color combos pass WCAG AA contrast,
 *   - the noise feTurbulence overlay is present,
 *   - and prefers-reduced-motion switches the motion OFF.
 *
 * Usage: node scripts/verify.mjs [baseURL]   (default http://localhost:4173)
 */
import { chromium } from "playwright";

const BASE_URL = process.argv[2] ?? "http://localhost:4173";

const TOKENS = {
	bg: "rgb(255, 253, 245)", // #FFFDF5 cream
	ink: "rgb(0, 0, 0)", // #000000
	accent: "rgb(255, 107, 107)", // #FF6B6B
	secondary: "rgb(255, 217, 61)", // #FFD93D
	muted: "rgb(196, 181, 253)", // #C4B5FD
	white: "rgb(255, 255, 255)", // #FFFFFF
};

let failures = 0;
const check = (name, ok, detail = "") => {
	console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
	if (!ok) failures += 1;
};

/* ---- WCAG relative-luminance contrast helper (sRGB) --------------------- */
function srgbToLin(c) {
	c /= 255;
	return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}
function lum([r, g, b]) {
	return 0.2126 * srgbToLin(r) + 0.7152 * srgbToLin(g) + 0.0722 * srgbToLin(b);
}
function parseRGB(str) {
	const m = str.match(/(\d+(?:\.\d+)?)/g);
	return m ? m.slice(0, 3).map(Number) : [0, 0, 0];
}
function contrastRatio(a, b) {
	const la = lum(parseRGB(a));
	const lb = lum(parseRGB(b));
	const hi = Math.max(la, lb);
	const lo = Math.min(la, lb);
	return (hi + 0.05) / (lo + 0.05);
}
/* A HARD shadow has a 0 blur. We look at the LAST shadow layer in the computed
   value (Tailwind v4 prepends transparent ring/inset placeholder layers, then
   the real one), and confirm its blur (3rd length) is 0 and its color is
   opaque ink/white. */
function lastShadowLayer(boxShadow) {
	if (!boxShadow || boxShadow === "none") return null;
	// Split on commas that separate layers (colors use rgb(...) with commas, so
	// split on "), " boundaries or fall back to the whole string).
	const layers = boxShadow.split(/,(?![^(]*\))/).map((s) => s.trim());
	return layers[layers.length - 1] || null;
}
function shadowBlurIsZero(boxShadow) {
	const layer = lastShadowLayer(boxShadow);
	if (!layer) return false;
	const lengths = layer.match(/-?\d+(?:\.\d+)?px/g) || [];
	if (lengths.length < 3) return false;
	const blur = parseFloat(lengths[2]);
	// must also have a real offset (not a 0 0 transparent placeholder)
	const offset = Math.abs(parseFloat(lengths[0])) + Math.abs(parseFloat(lengths[1]));
	return blur === 0 && offset > 0;
}
/* True when the shadow is effectively absent — every layer is transparent
   and/or zero-offset (Tailwind v4 renders `shadow-none` this way, not as the
   literal string "none"). */
function shadowIsEffectivelyNone(boxShadow) {
	if (!boxShadow || boxShadow === "none") return true;
	const layers = boxShadow.split(/,(?![^(]*\))/).map((s) => s.trim());
	return layers.every((layer) => {
		const transparent = /rgba?\([^)]*,\s*0\)/.test(layer);
		const lengths = layer.match(/-?\d+(?:\.\d+)?px/g) || [];
		const offset =
			lengths.length >= 2
				? Math.abs(parseFloat(lengths[0])) + Math.abs(parseFloat(lengths[1]))
				: 0;
		return transparent || offset === 0;
	});
}

const browser = await chromium.launch();

/* ───────────────────────── Main pass (motion ON) ───────────────────────── */
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const consoleErrors = [];
page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
page.on("pageerror", (e) => consoleErrors.push(String(e)));

await page.goto(BASE_URL, { waitUntil: "networkidle" });
await page.waitForTimeout(1000);

// ── Document basics ─────────────────────────────────────────────────────────
check(
	"page title",
	(await page.title()) === "LOUDHOUSE — NEO-BRUTALISM DESIGN SYSTEM",
	await page.title(),
);
check(
	"skip-to-content link present",
	(await page.getByRole("link", { name: "Skip to content" }).count()) === 1,
);
check("single <main> landmark", (await page.locator("main").count()) === 1);
check("single <header> nav landmark", (await page.locator("header").count()) === 1);

// ── Tokens resolve on real elements ──────────────────────────────────────────
const bodyBg = await page.evaluate(
	() => getComputedStyle(document.body).backgroundColor,
);
check("token: cream canvas on body", bodyBg === TOKENS.bg, bodyBg);
const bodyColor = await page.evaluate(() => getComputedStyle(document.body).color);
check("token: ink foreground on body", bodyColor === TOKENS.ink, bodyColor);

// All four highlighter + structural colors actually painted somewhere.
const paintedColors = await page.evaluate(() => {
	const set = new Set();
	for (const el of document.querySelectorAll("*")) {
		set.add(getComputedStyle(el).backgroundColor);
	}
	return [...set];
});
for (const [name, rgb] of Object.entries(TOKENS)) {
	check(`token painted: ${name}`, paintedColors.includes(rgb), rgb);
}

// Selection highlight = accent bg.
const sel = await page.evaluate(() => {
	const probe = document.createElement("span");
	probe.textContent = "x";
	document.body.appendChild(probe);
	const r = document.createRange();
	r.selectNodeContents(probe);
	const s = window.getSelection();
	s.removeAllRanges();
	s.addRange(r);
	const out = getComputedStyle(probe, "::selection").backgroundColor;
	s.removeAllRanges();
	probe.remove();
	return out;
});
check(
	"selection highlight is accent red",
	sel === TOKENS.accent || sel === "rgba(255, 107, 107, 1)",
	sel,
);

// ── Typography: Space Grotesk, uppercase, tight tracking, stroke text ────────
const heroH1 = page.locator("h1").first();
const heroFont = await heroH1.evaluate((el) => getComputedStyle(el).fontFamily);
check("Space Grotesk on hero", heroFont.includes("Space Grotesk"), heroFont);
check(
	"Space Grotesk woff2 actually loaded",
	await page.evaluate(() => document.fonts.check('700 48px "Space Grotesk"')),
);
const heroTransform = await heroH1.evaluate(
	(el) => getComputedStyle(el).textTransform,
);
check("hero is uppercase", heroTransform === "uppercase", heroTransform);
const heroTracking = await heroH1.evaluate(
	(el) => getComputedStyle(el).letterSpacing,
);
check("hero has tight (negative) tracking", parseFloat(heroTracking) < 0, heroTracking);
const heroWeight = await heroH1.evaluate((el) => getComputedStyle(el).fontWeight);
check("hero is heavy (>=700)", parseInt(heroWeight, 10) >= 700, heroWeight);

// Hollow text-stroke display text exists (transparent fill + webkit stroke).
const strokeCount = await page.evaluate(() => {
	let n = 0;
	for (const el of document.querySelectorAll(".neo-text-stroke, .neo-text-stroke-white")) {
		const cs = getComputedStyle(el);
		const stroke = cs.webkitTextStrokeWidth || cs.getPropertyValue("-webkit-text-stroke-width");
		if (parseFloat(stroke) > 0) n += 1;
	}
	return n;
});
check("hollow text-stroke display type present", strokeCount >= 2, `count=${strokeCount}`);

// ── Structure: thick black borders are mandatory ────────────────────────────
const borderStats = await page.evaluate(() => {
	let thick = 0;
	let opaqueNonBlack = 0;
	for (const el of document.querySelectorAll("*")) {
		const cs = getComputedStyle(el);
		const w = parseFloat(cs.borderTopWidth);
		if (w >= 4) {
			thick += 1;
			const c = cs.borderTopColor;
			// A fully-transparent border is a legitimate layout placeholder (the
			// nav link reserves space, then snaps a black border in on hover).
			// Only opaque, non-black thick borders would break the system.
			const isTransparent = /rgba?\([^)]*,\s*0\)/.test(c);
			if (c !== "rgb(0, 0, 0)" && !isTransparent) opaqueNonBlack += 1;
		}
	}
	return { thick, opaqueNonBlack };
});
check(
	"many elements carry a >=4px border",
	borderStats.thick >= 40,
	`thick=${borderStats.thick}`,
);
check(
	"thick borders are solid black (transparent placeholders allowed)",
	borderStats.opaqueNonBlack === 0,
	`opaque non-black thick borders=${borderStats.opaqueNonBlack}`,
);

// ── Shadows are HARD (zero blur) ─────────────────────────────────────────────
const shadowAudit = await page.evaluate(() => {
	const out = { withShadow: 0, hard: 0, soft: 0 };
	for (const el of document.querySelectorAll("*")) {
		const bs = getComputedStyle(el).boxShadow;
		if (!bs || bs === "none") continue;
		out.withShadow += 1;
		const lengths = bs.match(/-?\d+(?:\.\d+)?px/g) || [];
		const blur = lengths.length >= 3 ? parseFloat(lengths[2]) : NaN;
		if (blur === 0) out.hard += 1;
		else if (blur > 0) out.soft += 1;
	}
	return out;
});
check("many hard offset shadows present", shadowAudit.hard >= 20, JSON.stringify(shadowAudit));
check("zero soft (blurred) box-shadows", shadowAudit.soft === 0, `soft=${shadowAudit.soft}`);

// Spot-check a primary button's resting shadow is hard.
const primaryBtn = page.getByRole("button", { name: "Explore Components" }).first();
const btnShadow = await primaryBtn.evaluate((el) => getComputedStyle(el).boxShadow);
check("primary button shadow is hard (0 blur)", shadowBlurIsZero(btnShadow), btnShadow);

// ── Geometry: sharp corners by default ───────────────────────────────────────
const btnRadius = await primaryBtn.evaluate(
	(el) => getComputedStyle(el).borderTopLeftRadius,
);
check("buttons have 0px radius", btnRadius === "0px", btnRadius);
// Pill badges are the only rounded thing.
const pillRadius = await page
	.locator(".rounded-full")
	.first()
	.evaluate((el) => getComputedStyle(el).borderTopLeftRadius);
check("pill badge uses full radius", parseFloat(pillRadius) >= 100, pillRadius);

// ── Sticker rotations on real containers ─────────────────────────────────────
// Tailwind v4 uses the modern `rotate` CSS property (e.g. "2deg"), and may
// also fold rotation into a transform matrix. Count either form.
const rotated = await page.evaluate(() => {
	let n = 0;
	for (const el of document.querySelectorAll("*")) {
		const cs = getComputedStyle(el);
		// Modern rotate property
		const r = cs.rotate;
		if (r && r !== "none") {
			const deg = Math.abs(parseFloat(r));
			if (deg > 0.3 && deg < 40) {
				n += 1;
				continue;
			}
		}
		// Legacy transform matrix fallback
		const t = cs.transform;
		if (t && t !== "none" && t.startsWith("matrix")) {
			const m = t.match(/matrix\(([^)]+)\)/);
			if (m) {
				const [a, b] = m[1].split(",").map(parseFloat);
				const angle = Math.abs(Math.atan2(b, a) * (180 / Math.PI));
				if (angle > 0.3 && angle < 40) n += 1;
			}
		}
	}
	return n;
});
check("sticker rotations applied to >=5 elements", rotated >= 5, `count=${rotated}`);

// ── Buttons CLICK DOWN on :active ────────────────────────────────────────────
// Tailwind v4 sets the modern `translate` CSS property (e.g. "6px 6px"); idle
// is "none". Read translate (with a transform fallback) before/while pressed.
const motionOf = (el) => {
	const cs = getComputedStyle(el);
	return `${cs.translate}|${cs.transform}`;
};
const playBtn = page.getByRole("button", { name: "Primary" }).first();
await playBtn.scrollIntoViewIfNeeded();
const beforeT = await playBtn.evaluate(motionOf);
await page.mouse.move(0, 0);
const box = await playBtn.boundingBox();
await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
await page.mouse.down();
await page.waitForTimeout(120);
const activeT = await playBtn.evaluate(motionOf);
const activeShadow = await playBtn.evaluate((el) => getComputedStyle(el).boxShadow);
await page.mouse.up();
check(
	"button translates (clicks down) on :active",
	beforeT !== activeT && activeT !== "none|none",
	`before=${beforeT.slice(0, 24)} active=${activeT.slice(0, 24)}`,
);
check(
	"button shadow removed on :active",
	shadowIsEffectivelyNone(activeShadow),
	activeShadow.slice(0, 60),
);

// ── Cards LIFT on hover ──────────────────────────────────────────────────────
const liftCard = page.locator("#features article, #features .border-4").first();
// Grab a known lifting card via its text.
const featureCard = page
	.locator("#features")
	.locator("div.border-4")
	.filter({ hasText: "Hard Offset Shadows" })
	.first();
await featureCard.scrollIntoViewIfNeeded();
await page.waitForTimeout(200);
const cardBefore = await featureCard.evaluate((el) => ({
	t: `${getComputedStyle(el).translate}|${getComputedStyle(el).transform}`,
	s: getComputedStyle(el).boxShadow,
}));
await featureCard.hover();
await page.waitForTimeout(300);
const cardAfter = await featureCard.evaluate((el) => ({
	t: `${getComputedStyle(el).translate}|${getComputedStyle(el).transform}`,
	s: getComputedStyle(el).boxShadow,
}));
check(
	"card transform changes on hover (lift)",
	cardBefore.t !== cardAfter.t,
	`before=${cardBefore.t.slice(0, 20)} after=${cardAfter.t.slice(0, 20)}`,
);
check(
	"card shadow grows on hover (still hard)",
	cardBefore.s !== cardAfter.s && shadowBlurIsZero(cardAfter.s),
	cardAfter.s,
);
void liftCard;
await page.mouse.move(0, 0);

// ── Marquees animate ─────────────────────────────────────────────────────────
const rails = page.locator(".rfm-marquee");
const railCount = await rails.count();
check("at least two marquees mounted", railCount >= 2, `count=${railCount}`);
check(
	"marquees use role=group (not invalid role=marquee)",
	(await page.locator('[role="marquee"]').count()) === 0 &&
		(await page.locator('[role="group"]').count()) >= 2,
);
const moving = await rails.first().evaluate((el) => {
	const a = el.getAnimations ? el.getAnimations() : [];
	const animName = getComputedStyle(el).animationName;
	return { running: a.length > 0, animName };
});
check(
	"marquee track is animating",
	moving.running || (moving.animName && moving.animName !== "none"),
	JSON.stringify(moving),
);

// ── Inputs flood YELLOW on focus (no soft ring) ──────────────────────────────
const nameInput = page.getByLabel("Your Name").first();
await nameInput.scrollIntoViewIfNeeded();
const inputBox = await nameInput.boundingBox();
check("input is oversized (>=56px tall)", inputBox.height >= 56, `${Math.round(inputBox.height)}px`);
const inputBorder = await nameInput.evaluate((el) => getComputedStyle(el).borderTopWidth);
check("input has 4px border", inputBorder === "4px", inputBorder);
const bgBefore = await nameInput.evaluate((el) => getComputedStyle(el).backgroundColor);
await nameInput.focus();
await page.waitForTimeout(150);
const bgAfter = await nameInput.evaluate((el) => getComputedStyle(el).backgroundColor);
const focusShadow = await nameInput.evaluate((el) => getComputedStyle(el).boxShadow);
check("input is white before focus", bgBefore === TOKENS.white, bgBefore);
check("input floods YELLOW on focus", bgAfter === TOKENS.secondary, bgAfter);
check("focused input gains a hard shadow", shadowBlurIsZero(focusShadow), focusShadow);
await nameInput.blur();

// ── Stat counters count up ───────────────────────────────────────────────────
await page.evaluate(() => {
	const el = [...document.querySelectorAll("p")].find((p) =>
		/numbers are not subtle/i.test(p.textContent || ""),
	);
	el?.scrollIntoView({ block: "center" });
});
await page.waitForTimeout(1000);
const hundred = await page.getByText("100%", { exact: false }).count();
check("stat count-up reaches 100%", hundred >= 1, `matches=${hundred}`);

// ── FAQ accordion: single-open + keyboard + ARIA ─────────────────────────────
const faqButtons = page.locator('#faq button[aria-expanded]');
check("FAQ has aria-expanded buttons", (await faqButtons.count()) >= 5);
const ariaControls = await page.evaluate(() => {
	const btns = [...document.querySelectorAll("#faq button[aria-controls]")];
	const dangling = btns.filter(
		(b) => !document.getElementById(b.getAttribute("aria-controls")),
	).length;
	return { total: btns.length, dangling };
});
check(
	"FAQ aria-controls all resolve (no dangling idref)",
	ariaControls.total >= 5 && ariaControls.dangling === 0,
	JSON.stringify(ariaControls),
);
const firstFaq = faqButtons.first();
const secondFaq = faqButtons.nth(1);
await firstFaq.scrollIntoViewIfNeeded();
check("first FAQ open by default", (await firstFaq.getAttribute("aria-expanded")) === "true");
check("second FAQ collapsed by default", (await secondFaq.getAttribute("aria-expanded")) === "false");
await secondFaq.focus();
await page.keyboard.press("Enter");
await page.waitForTimeout(300);
check(
	"FAQ toggles open via keyboard (Enter)",
	(await secondFaq.getAttribute("aria-expanded")) === "true",
);
check(
	"opening one FAQ closes the previous (single-open)",
	(await firstFaq.getAttribute("aria-expanded")) === "false",
);

// ── Mobile nav: hamburger toggles a drawer ───────────────────────────────────
const mobilePage = await browser.newPage({ viewport: { width: 390, height: 800 } });
await mobilePage.goto(BASE_URL, { waitUntil: "networkidle" });
const burger = mobilePage.getByRole("button", { name: "Open menu" });
check("hamburger visible on mobile", await burger.isVisible());
await burger.click();
await mobilePage.waitForTimeout(200);
check(
	"mobile drawer opens (aria-expanded true)",
	(await mobilePage.locator('button[aria-controls="mobile-drawer"]').getAttribute("aria-expanded")) === "true",
);
check("mobile drawer content present", (await mobilePage.locator("#mobile-drawer").count()) === 1);
await mobilePage.close();

// ── Contrast: core combinations pass WCAG AA ─────────────────────────────────
const inkOnCream = contrastRatio(TOKENS.ink, TOKENS.bg);
check("contrast: ink on cream >= 4.5", inkOnCream >= 4.5, inkOnCream.toFixed(2));
const inkOnYellow = contrastRatio(TOKENS.ink, TOKENS.secondary);
check("contrast: ink on yellow >= 4.5", inkOnYellow >= 4.5, inkOnYellow.toFixed(2));
const inkOnViolet = contrastRatio(TOKENS.ink, TOKENS.muted);
check("contrast: ink on violet >= 4.5", inkOnViolet >= 4.5, inkOnViolet.toFixed(2));
const inkOnAccent = contrastRatio(TOKENS.ink, TOKENS.accent);
check("contrast: ink on accent red >= 4.5", inkOnAccent >= 4.5, inkOnAccent.toFixed(2));
const whiteOnInk = contrastRatio(TOKENS.white, TOKENS.ink);
check("contrast: white on ink >= 4.5", whiteOnInk >= 4.5, whiteOnInk.toFixed(2));

// ── Texture overlays present ─────────────────────────────────────────────────
check(
	"halftone/dots/grid texture utilities used",
	(await page.locator(".neo-halftone, .neo-dots, .neo-grid, .neo-grid-inverted").count()) >= 4,
);
check(
	"noise feTurbulence overlay present (in CSS, via .neo-noise)",
	(await page.locator(".neo-noise").count()) >= 4,
);

check("no console/page errors", consoleErrors.length === 0, consoleErrors.join(" | ").slice(0, 300));
await page.close();

/* ───────────── Reduced-motion pass (motion must switch OFF) ─────────────── */
const rmPage = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await rmPage.emulateMedia({ reducedMotion: "reduce" });
await rmPage.goto(BASE_URL, { waitUntil: "networkidle" });
await rmPage.waitForTimeout(600);

// react-fast-marquee animated track must NOT mount under reduced motion.
const rmRails = await rmPage.locator(".rfm-marquee").count();
check(
	"reduced-motion: no animated marquee track mounted",
	rmRails === 0,
	`rfm-marquee count=${rmRails}`,
);
// Content still present though — the static rails carry the same items.
check(
	"reduced-motion: marquee slogan still visible",
	(await rmPage.getByText("Hard Shadows Only", { exact: false }).count()) >= 1,
);
// Looping spin animation is neutralised.
const rmSpin = await rmPage.evaluate(() => {
	const el = document.querySelector(".animate-spin-slow");
	if (!el) return { found: false, running: false };
	const a = el.getAnimations ? el.getAnimations() : [];
	const playing = a.some((an) => an.playState === "running");
	return { found: true, running: playing };
});
check(
	"reduced-motion: spin loop is not running",
	rmSpin.found && rmSpin.running === false,
	JSON.stringify(rmSpin),
);
await rmPage.close();

await browser.close();
console.log(failures === 0 ? "\nALL CHECKS PASSED" : `\n${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
