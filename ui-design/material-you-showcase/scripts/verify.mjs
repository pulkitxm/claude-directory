/* Headless CLI verification for Lumi — the Material You (MD3) showcase.
 *
 * Asserts the design-system contract programmatically, the way a reviewer
 * would eyeball it but deterministic:
 *   - Roboto (self-hosted) is the rendered font, weights actually load
 *   - The MD3 tonal tokens resolve to the exact seed-derived palette
 *   - NEVER pure white: body + cards use tinted surfaces
 *   - ALL buttons are pills (border-radius 9999px)
 *   - Filled text field: rounded TOP, square BOTTOM, 2px bottom border -> primary on focus
 *   - Organic blur shapes (blur-3xl) are present in hero/key sections
 *   - FAB is a 56x56 rounded-2xl(28px) tertiary surface
 *   - Pricing featured tier rests lifted (asymmetric elevation)
 *   - How-It-Works hover glow exists; FAQ accordion toggles with rotating +
 *   - CTA filled-field submit confirms inline
 *   - Responsive: desktop nav hidden on mobile, drawer toggles
 *   - No console / page errors
 *
 * Usage: node scripts/verify.mjs [baseURL]      (default http://localhost:4173)
 * Set CHROME_PATH to use a specific Chromium/Chrome binary.
 */
import { chromium } from "playwright";

const BASE_URL = process.argv[2] ?? "http://localhost:4173";
const CHROME_PATH = process.env.CHROME_PATH || undefined;

let failures = 0;
const check = (name, ok, detail = "") => {
	console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
	if (!ok) failures += 1;
};

const browser = await chromium.launch({
	executablePath: CHROME_PATH,
	args: ["--no-sandbox"],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

const consoleErrors = [];
page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
page.on("pageerror", (e) => consoleErrors.push(String(e)));

await page.goto(BASE_URL, { waitUntil: "networkidle" });
await page.waitForTimeout(1200); // let reveal animations settle

// ── Title & brand ───────────────────────────────────────────────────────────
check("page title mentions Material You", /Material You/i.test(await page.title()), await page.title());
check("Lumi wordmark present", (await page.getByText("Lumi", { exact: true }).count()) >= 1);

// ── Roboto (self-hosted) actually renders ───────────────────────────────────
const bodyFont = await page.evaluate(() => getComputedStyle(document.body).fontFamily);
check("Roboto font family on body", /Roboto/i.test(bodyFont), bodyFont);
const fontLoaded = await page.evaluate(async () => {
	await document.fonts.ready;
	return (
		document.fonts.check('500 16px "Roboto Flex MD"') &&
		document.fonts.check('700 16px "Roboto Flex MD"')
	);
});
check("Roboto 500 + 700 faces loaded", fontLoaded === true);

// ── MD3 tonal tokens resolve to the seed-derived palette ────────────────────
const tokens = await page.evaluate(() => {
	const cs = getComputedStyle(document.documentElement);
	const g = (n) => cs.getPropertyValue(n).trim().toLowerCase();
	return {
		bg: g("--color-md-bg"),
		primary: g("--color-md-primary"),
		tertiary: g("--color-md-tertiary"),
		container: g("--color-md-container"),
		containerLow: g("--color-md-container-low"),
		ease: g("--ease-md-standard"),
	};
});
check("--color-md-bg = #fffbfe (not pure white)", tokens.bg === "#fffbfe", tokens.bg);
check("--color-md-primary = #6750a4 (seed)", tokens.primary === "#6750a4", tokens.primary);
check("--color-md-tertiary = #7d5260", tokens.tertiary === "#7d5260", tokens.tertiary);
check("--color-md-container = #f3edf7", tokens.container === "#f3edf7", tokens.container);
check(
	"signature easing = cubic-bezier(0.2, 0, 0, 1)",
	// browsers serialize 0.2 as .2 — normalize the leading zero before comparing
	tokens.ease.replace(/\s/g, "").replace(/\b0\./g, ".") === "cubic-bezier(.2,0,0,1)",
	tokens.ease,
);

// ── NEVER pure white: body background is the tinted Surface ─────────────────
const bodyBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
check("body bg is tinted surface, not pure white", bodyBg === "rgb(255, 251, 254)", bodyBg);

// ── All sections / anchors present ──────────────────────────────────────────
for (const id of ["top", "benefits", "how", "product", "pricing", "journal", "faq", "cta"]) {
	check(`section #${id} present`, (await page.locator(`#${id}`).count()) === 1);
}

// ── Hero CTA is a PILL (radius 9999px) with no shadow at rest ────────────────
const heroCta = page.getByRole("link", { name: /Start theming/ }).first();
const heroBtn = await heroCta.evaluate((el) => {
	const s = getComputedStyle(el);
	return { radius: parseFloat(s.borderTopLeftRadius), shadow: s.boxShadow, h: parseFloat(s.height) };
});
check("hero CTA is pill (radius >= 22px)", heroBtn.radius >= 22, `${heroBtn.radius}px`);
check("hero CTA (lg) is >= 48px tall", heroBtn.h >= 47, `${heroBtn.h}px`);

// ── EVERY button is pill-shaped (radius 9999px ⇒ huge after clamping) ────────
const btnRadii = await page.evaluate(() => {
	const els = Array.from(document.querySelectorAll(".btn"));
	const bad = [];
	for (const el of els) {
		const r = parseFloat(getComputedStyle(el).borderTopLeftRadius);
		// pill clamps to ~half the height (>= 18px). Anything small is a violation.
		if (r < 18) bad.push(`${el.className.slice(0, 30)}:${r}`);
	}
	return { total: els.length, bad };
});
check(`all ${btnRadii.total} .btn elements are pills`, btnRadii.bad.length === 0, btnRadii.bad.slice(0, 4).join(" | "));

// ── Cards use a tonal container surface, large radius, soft shadow ──────────
const firstCard = page.locator("#how article").first();
const cardStyle = await firstCard.evaluate((el) => {
	const s = getComputedStyle(el);
	return { radius: parseFloat(s.borderTopLeftRadius), bg: s.backgroundColor, shadow: s.boxShadow };
});
check("how-it-works card radius >= 24px", cardStyle.radius >= 24, `${cardStyle.radius}px`);
check("how-it-works card is tonal container (#f3edf7)", cardStyle.bg === "rgb(243, 237, 247)", cardStyle.bg);
check("how-it-works card has a (soft) shadow at rest", cardStyle.shadow !== "none");

// ── Organic blur shapes (blur-3xl) present ──────────────────────────────────
const blurShapes = await page.evaluate(() => {
	return Array.from(document.querySelectorAll("*")).filter((el) => {
		const f = getComputedStyle(el).filter;
		return f && f.includes("blur(") && parseFloat(f.match(/blur\(([\d.]+)px\)/)?.[1] || "0") >= 40;
	}).length;
});
check("organic blur-3xl shapes present (>= 4)", blurShapes >= 4, `${blurShapes} found`);

// ── Benefits is a full-width PRIMARY color block ────────────────────────────
const benefitsBg = await page.evaluate(() => getComputedStyle(document.querySelector("#benefits")).backgroundColor);
check("Benefits is a primary (#6750a4) block", benefitsBg === "rgb(103, 80, 164)", benefitsBg);

// ── CTA is a full-width TERTIARY color block ────────────────────────────────
const ctaInner = await page.evaluate(() => {
	const el = document.querySelector("#cta > div");
	return el ? getComputedStyle(el).backgroundColor : "";
});
check("Final CTA is a tertiary (#7d5260) block", ctaInner === "rgb(125, 82, 96)", ctaInner);

// ── Filled text field: rounded TOP, SQUARE bottom, 2px bottom border ────────
const field = page.locator("#cta-email");
const fieldRest = await field.evaluate((el) => {
	const s = getComputedStyle(el);
	return {
		topL: parseFloat(s.borderTopLeftRadius),
		topR: parseFloat(s.borderTopRightRadius),
		botL: parseFloat(s.borderBottomLeftRadius),
		bw: parseFloat(s.borderBottomWidth),
		bc: s.borderBottomColor,
		h: parseFloat(s.height),
	};
});
check("input top corners rounded (>= 10px)", fieldRest.topL >= 10 && fieldRest.topR >= 10, `${fieldRest.topL}/${fieldRest.topR}`);
check("input bottom corners square (0px)", fieldRest.botL === 0, `${fieldRest.botL}px`);
check("input has 2px bottom border", fieldRest.bw === 2, `${fieldRest.bw}px`);
check("input is 56px tall (filled field)", fieldRest.h === 56, `${fieldRest.h}px`);
check("input bottom border = outline at rest", fieldRest.bc === "rgb(121, 116, 126)", fieldRest.bc);
await field.focus();
await page.waitForTimeout(250);
const fieldFocus = await field.evaluate((el) => getComputedStyle(el).borderBottomColor);
check("input bottom border -> primary on focus", fieldFocus === "rgb(103, 80, 164)", fieldFocus);

// ── FAB: appears on scroll, 56x56, rounded-2xl(28px), tertiary ──────────────
await page.evaluate(() => window.scrollTo(0, 1400));
await page.waitForTimeout(500);
const fab = page.getByRole("link", { name: "Seed a new theme" });
check("FAB visible after scroll", await fab.isVisible());
const fabStyle = await fab.evaluate((el) => {
	const s = getComputedStyle(el);
	return { w: parseFloat(s.width), h: parseFloat(s.height), r: parseFloat(s.borderTopLeftRadius), bg: s.backgroundColor };
});
check("FAB is 56x56", fabStyle.w === 56 && fabStyle.h === 56, `${fabStyle.w}x${fabStyle.h}`);
check("FAB radius is 28px (rounded-2xl)", fabStyle.r === 28, `${fabStyle.r}px`);
check("FAB is tertiary (#7d5260)", fabStyle.bg === "rgb(125, 82, 96)", fabStyle.bg);
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(300);

// ── Pricing: featured tier rests LIFTED (asymmetric elevation) ──────────────
// Tailwind v4 emits the standalone `translate` property (transform stays none),
// so read translateY from whichever the engine populated.
const lift = await page.evaluate(() => {
	const badge = Array.from(document.querySelectorAll("#pricing *")).find(
		(e) => e.textContent?.trim() === "Most popular",
	);
	const card = badge?.closest("article");
	if (!card) return null;
	const s = getComputedStyle(card);
	if (s.translate && s.translate !== "none") {
		const parts = s.translate.trim().split(/\s+/);
		return parseFloat(parts[1] ?? "0"); // y component
	}
	return new DOMMatrixReadOnly(s.transform).m42;
});
check("featured pricing tier is lifted (translateY < 0)", lift !== null && lift < -8, `${lift}px`);
const featuredBg = await page.evaluate(() => {
	const badge = Array.from(document.querySelectorAll("#pricing *")).find((e) => e.textContent?.trim() === "Most popular");
	return getComputedStyle(badge.closest("article")).backgroundColor;
});
check("featured tier filled with primary", featuredBg === "rgb(103, 80, 164)", featuredBg);

// ── How-It-Works hover glow halo exists (hidden until hover) ────────────────
const glowExists = await page.evaluate(() => {
	return Array.from(document.querySelectorAll("#how span")).some((el) => {
		const s = getComputedStyle(el);
		return s.filter.includes("blur(") && s.opacity === "0";
	});
});
check("how-it-works hidden glow halo present", glowExists);

// ── FAQ accordion toggles + the plus rotates 45° when open ──────────────────
// The panel collapses via grid-template-rows 0fr->1fr inside overflow-hidden, so
// assert on the panel's collapsed/expanded rows (text stays in the DOM either way).
const faqBtn = page.getByRole("button", { name: /Does it follow the real Material Design 3 spec/ });
const faqPanelRows = async () =>
	page.evaluate(() => {
		const p = Array.from(document.querySelectorAll("#faq p")).find((e) =>
			/tonal algorithm mirrors Material You/.test(e.textContent || ""),
		);
		return getComputedStyle(p.closest('[role="region"]')).gridTemplateRows;
	});
check("FAQ answer collapsed before click (rows 0px)", (await faqPanelRows()) === "0px");
check("FAQ button reports aria-expanded=false", (await faqBtn.getAttribute("aria-expanded")) === "false");
await faqBtn.click();
await page.waitForTimeout(450);
check("FAQ answer expands on click (rows > 0)", parseFloat(await faqPanelRows()) > 0);
check(
	"FAQ answer readable on click",
	await page.getByText(/tonal algorithm mirrors Material You/).first().isVisible(),
);
check("FAQ button reports aria-expanded=true", (await faqBtn.getAttribute("aria-expanded")) === "true");

// ── CTA form: typing + submit shows inline confirmation ─────────────────────
await page.locator("#cta-email").fill("designer@studio.com");
await page.getByRole("button", { name: /Get started/ }).click();
await page.waitForTimeout(300);
check(
	"CTA submit shows confirmation",
	(await page.getByText(/You're in\./, { exact: false }).count()) === 1,
);

// ── Decorative shapes are aria-hidden (a11y) ────────────────────────────────
const decorAria = await page.evaluate(() => {
	// every animated blob carries aria-hidden
	const blobs = Array.from(document.querySelectorAll('[class*="blob-"]'));
	return blobs.length > 0 && blobs.every((b) => b.getAttribute("aria-hidden") === "true");
});
check("decorative blur shapes are aria-hidden", decorAria);

// ── Skip link present for keyboard users ────────────────────────────────────
check("skip-to-content link present", (await page.getByRole("link", { name: "Skip to content" }).count()) === 1);

// ── Responsive: desktop nav hidden on mobile, drawer toggles ────────────────
await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(300);
check("desktop nav hidden on mobile", !(await page.locator('nav[aria-label="Primary"]').first().isVisible()));
const burger = page.getByRole("button", { name: "Open menu" });
check("mobile menu button visible", await burger.isVisible());
await burger.click();
await page.waitForTimeout(350);
check(
	"mobile drawer opens with links",
	await page.getByRole("link", { name: "Pricing" }).first().isVisible(),
);

// ── No console / page errors ────────────────────────────────────────────────
check("no console/page errors", consoleErrors.length === 0, consoleErrors.join(" | ").slice(0, 300));

await browser.close();
console.log(failures === 0 ? "\nALL CHECKS PASSED" : `\n${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
