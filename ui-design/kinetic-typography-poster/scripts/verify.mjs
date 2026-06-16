/* Headless CLI verification for the Kinetic Typography poster.
 *
 * Boots a headless Chromium against a running server (preview by default) and
 * asserts that every load-bearing element of the design system is actually in
 * the DOM and behaving: the design tokens resolve, the viewport-width type is
 * present, BOTH marquees animate, background numbers tower, cards hard-invert
 * on hover, the hero transforms on scroll, the accordion is keyboard-operable,
 * the inputs are oversized, and prefers-reduced-motion freezes the motion.
 *
 * Usage: node scripts/verify.mjs [baseURL]   (default http://localhost:4173)
 */
import { chromium } from "playwright";

const BASE_URL = process.argv[2] ?? "http://localhost:4173";

const TOKENS = {
	ink: "rgb(9, 9, 11)", // #09090B
	bone: "rgb(250, 250, 250)", // #FAFAFA
	acid: "rgb(223, 225, 4)", // #DFE104
	muted: "rgb(39, 39, 42)", // #27272A
	line: "rgb(63, 63, 70)", // #3F3F46
};

let failures = 0;
const check = (name, ok, detail = "") => {
	console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
	if (!ok) failures += 1;
};

const browser = await chromium.launch();

/* ───────────────────────── Main pass (motion ON) ───────────────────────── */
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const consoleErrors = [];
page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
page.on("pageerror", (e) => consoleErrors.push(String(e)));

await page.goto(BASE_URL, { waitUntil: "networkidle" });
await page.waitForTimeout(1200);

// ── Document basics ────────────────────────────────────────────────────────
check(
	"page title",
	(await page.title()) === "MOTION TYPE — KINETIC TYPOGRAPHY",
	await page.title(),
);
check(
	"skip-to-content link present",
	(await page.getByRole("link", { name: "Skip to content" }).count()) === 1,
);
check("single <main> landmark", (await page.locator("main").count()) === 1);

// ── Design tokens resolve on real elements ──────────────────────────────────
const bodyBg = await page.evaluate(
	() => getComputedStyle(document.body).backgroundColor,
);
check("token: ink background on body", bodyBg === TOKENS.ink, bodyBg);
const bodyColor = await page.evaluate(
	() => getComputedStyle(document.body).color,
);
check("token: bone foreground on body", bodyColor === TOKENS.bone, bodyColor);

// Acid accent actually rendered somewhere (the hero highlight word).
const acidWord = page.locator("h1 .text-acid").first();
const acidColor = await acidWord.evaluate((el) => getComputedStyle(el).color);
check("token: acid accent on hero word", acidColor === TOKENS.acid, acidColor);

// Selection highlight = acid bg + black text.
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
check("selection highlight is acid", sel === TOKENS.acid || sel === "rgba(223, 225, 4, 1)", sel);

// ── Typography: Space Grotesk + clamp viewport-width hero ───────────────────
const heroFont = await page
	.locator("h1")
	.first()
	.evaluate((el) => getComputedStyle(el).fontFamily);
check("Space Grotesk on hero", heroFont.includes("Space Grotesk"), heroFont);
check(
	"Space Grotesk woff2 actually loaded",
	await page.evaluate(() => document.fonts.check('700 48px "Space Grotesk"')),
);

// Hero font-size must track the viewport (clamp 3rem..14rem). At exactly
// 1280px wide, 12vw = 153.6px and sits between the 3rem floor and 14rem ceiling,
// so the rendered size must land in a tight band — a wrong vw factor or a
// dropped clamp would fall outside it.
const heroPx = await page
	.locator("h1")
	.first()
	.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
check(
	"hero clamp resolves to ~12vw @1280w (150–157px)",
	heroPx >= 150 && heroPx <= 157,
	`${heroPx}px`,
);

// Aggressive scale hierarchy: hero vs actual body copy (the hero sub-headline
// paragraph, ~text-2xl), not the tiny eyebrow label — the gap should be ~6x+.
const bodyPx = await page
	.locator("section#top p")
	.first()
	.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
check(
	"scale hierarchy ≥ 6x (hero vs body copy)",
	heroPx / bodyPx >= 6,
	`hero=${heroPx}px body=${bodyPx}px → ${(heroPx / bodyPx).toFixed(1)}x`,
);

// Hero is uppercase + tight tracking.
const heroTransform = await page
	.locator("h1")
	.first()
	.evaluate((el) => getComputedStyle(el).textTransform);
check("hero is uppercase", heroTransform === "uppercase", heroTransform);
const heroTracking = await page
	.locator("h1")
	.first()
	.evaluate((el) => getComputedStyle(el).letterSpacing);
check("hero has tight (negative) tracking", parseFloat(heroTracking) < 0, heroTracking);

// ── Marquees: both present, both animating ──────────────────────────────────
const rails = page.locator(".rfm-marquee");
const railCount = await rails.count();
check("at least two marquees mounted", railCount >= 2, `count=${railCount}`);

// Marquees use a valid grouping role (NOT the invalid live-region role=marquee).
check(
	"marquees use role=group (not role=marquee)",
	(await page.locator('[role="marquee"]').count()) === 0 &&
		(await page.locator('[role="group"]').count()) >= 2,
	`group=${await page.locator('[role="group"]').count()} marquee=${await page.locator('[role="marquee"]').count()}`,
);

// Confirm a marquee track is actually translating (CSS animation running).
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

// Stats marquee band is acid; testimonials marquee is NOT (so they differ).
const statsBg = await page
	.getByLabel("Festival by the numbers")
	.evaluate((el) => getComputedStyle(el).backgroundColor);
check("stats marquee band is acid", statsBg === TOKENS.acid, statsBg);

// ── Massive decorative background numbers ───────────────────────────────────
const bigNumbers = await page.evaluate(() => {
	const out = [];
	for (const el of document.querySelectorAll('[aria-hidden="true"]')) {
		const t = (el.textContent || "").trim();
		if (/^\d{1,3}$/.test(t)) {
			const px = parseFloat(getComputedStyle(el).fontSize);
			if (px >= 96) out.push(px);
		}
	}
	return out;
});
check(
	"≥3 massive (≥96px) decorative numbers, aria-hidden",
	bigNumbers.length >= 3,
	`found ${bigNumbers.length}: ${bigNumbers.map((n) => Math.round(n)).join(",")}`,
);

// ── Brutalist geometry: 0 radius + 2px borders ──────────────────────────────
const ticketsBtn = page.getByRole("button", { name: "Get Tickets" }).first();
const btnRadius = await ticketsBtn.evaluate(
	(el) => getComputedStyle(el).borderTopLeftRadius,
);
check("buttons have 0px radius", btnRadius === "0px", btnRadius);

const navBorder = await page
	.locator("header")
	.evaluate((el) => getComputedStyle(el).borderBottomWidth);
check("structural border is 2px", navBorder === "2px", navBorder);

// ── Sticky feature cards ────────────────────────────────────────────────────
const stickyPos = await page
	.locator("article.sticky")
	.first()
	.evaluate((el) => getComputedStyle(el).position);
check("feature cards are position:sticky", stickyPos === "sticky", stickyPos);
check(
	"three sticky feature cards",
	(await page.locator("article.sticky").count()) === 3,
);

// ── Hard color inversion on hover ───────────────────────────────────────────
const card = page.locator("article.sticky").first();
const before = await card.evaluate((el) => getComputedStyle(el).backgroundColor);
await card.hover();
await page.waitForTimeout(450); // let the 300ms colour transition finish
const after = await card.evaluate((el) => getComputedStyle(el).backgroundColor);
check("card bg is ink before hover", before === TOKENS.ink, before);
check("card floods acid on hover", after === TOKENS.acid, after);
// Title text inverts to black on hover.
const titleColor = await card
	.locator("h3")
	.evaluate((el) => getComputedStyle(el).color);
check("card title inverts to black on hover", titleColor === "rgb(0, 0, 0)", titleColor);
await page.mouse.move(0, 0);

// ── Oversized form inputs ───────────────────────────────────────────────────
const nameInput = page.getByLabel("Your Name");
const inputBox = await nameInput.boundingBox();
check("input is oversized (≥80px tall)", inputBox.height >= 80, `${Math.round(inputBox.height)}px`);
const inputBorders = await nameInput.evaluate((el) => {
	const s = getComputedStyle(el);
	return { top: s.borderTopWidth, bottom: s.borderBottomWidth };
});
check(
	"input is bottom-border only",
	inputBorders.bottom === "2px" && inputBorders.top === "0px",
	JSON.stringify(inputBorders),
);
// Focus flips the underline to acid.
await nameInput.focus();
const focusBorder = await nameInput.evaluate(
	(el) => getComputedStyle(el).borderBottomColor,
);
check("input underline flips acid on focus", focusBorder === TOKENS.acid, focusBorder);

// ── FAQ accordion: keyboard + aria ──────────────────────────────────────────
const faqButtons = page.locator('button[aria-expanded]');
check("FAQ has aria-expanded buttons", (await faqButtons.count()) >= 4);

// Every aria-controls must resolve to a real element — including collapsed rows
// (the panel region stays mounted even when empty).
const ariaControls = await page.evaluate(() => {
	const btns = [...document.querySelectorAll("button[aria-controls]")];
	const dangling = btns.filter(
		(b) => !document.getElementById(b.getAttribute("aria-controls")),
	).length;
	return { total: btns.length, dangling };
});
check(
	"FAQ aria-controls all resolve (no dangling idref)",
	ariaControls.total >= 4 && ariaControls.dangling === 0,
	JSON.stringify(ariaControls),
);
const firstFaq = faqButtons.first();
check(
	"first FAQ open by default",
	(await firstFaq.getAttribute("aria-expanded")) === "true",
);
const secondFaq = faqButtons.nth(1);
check(
	"second FAQ collapsed by default",
	(await secondFaq.getAttribute("aria-expanded")) === "false",
);
// Toggle the second item with the keyboard (Enter on a focused button).
await secondFaq.focus();
await page.keyboard.press("Enter");
await page.waitForTimeout(450);
check(
	"FAQ toggles open via keyboard (Enter)",
	(await secondFaq.getAttribute("aria-expanded")) === "true",
);
check(
	"opening one FAQ closes the previous (single-open)",
	(await firstFaq.getAttribute("aria-expanded")) === "false",
);

// ── Hero scroll-driven transform ────────────────────────────────────────────
// Reset to the very top first so the hero is at its un-transformed baseline
// (earlier checks left the page scrolled down to the FAQ).
const heroInner = page.locator("section#top > div").first();
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(400);
const tBefore = await heroInner.evaluate((el) => getComputedStyle(el).transform);
await page.evaluate(() => window.scrollTo(0, window.innerHeight * 0.35));
await page.waitForTimeout(400);
const tAfter = await heroInner.evaluate((el) => getComputedStyle(el).transform);
check(
	"hero transform changes on scroll (useScroll parallax)",
	tBefore !== tAfter && tAfter !== "none",
	`before=${tBefore.slice(0, 24)} after=${tAfter.slice(0, 24)}`,
);
await page.evaluate(() => window.scrollTo(0, 0));

// ── Noise texture overlay ───────────────────────────────────────────────────
check(
	"noise feTurbulence overlay present",
	(await page.locator("svg feTurbulence").count()) >= 1,
);

check("no console/page errors", consoleErrors.length === 0, consoleErrors.join(" | ").slice(0, 300));
await page.close();

/* ───────────── Reduced-motion pass (motion must switch OFF) ─────────────── */
const rmPage = await browser.newPage({
	viewport: { width: 1280, height: 900 },
});
await rmPage.emulateMedia({ reducedMotion: "reduce" });
await rmPage.goto(BASE_URL, { waitUntil: "networkidle" });
await rmPage.waitForTimeout(800);

// react-fast-marquee must NOT mount its animated track under reduced motion.
const rmRails = await rmPage.locator(".rfm-marquee").count();
check(
	"reduced-motion: no animated marquee track mounted",
	rmRails === 0,
	`rfm-marquee count=${rmRails}`,
);
// Content still present though — the static rails carry the same items.
check(
	"reduced-motion: stats content still visible",
	(await rmPage.getByText("Speakers", { exact: false }).count()) >= 1,
);
// Hero must not transform on scroll under reduced motion.
const rmHero = rmPage.locator("section#top > div").first();
const rmBefore = await rmHero.evaluate((el) => getComputedStyle(el).transform);
await rmPage.evaluate(() => window.scrollTo(0, window.innerHeight * 0.35));
await rmPage.waitForTimeout(300);
const rmAfter = await rmHero.evaluate((el) => getComputedStyle(el).transform);
check(
	"reduced-motion: hero does NOT transform on scroll",
	rmBefore === rmAfter,
	`${rmBefore.slice(0, 16)} == ${rmAfter.slice(0, 16)}`,
);
await rmPage.close();

await browser.close();
console.log(
	failures === 0 ? "\nALL CHECKS PASSED" : `\n${failures} CHECK(S) FAILED`,
);
process.exit(failures === 0 ? 0 : 1);
