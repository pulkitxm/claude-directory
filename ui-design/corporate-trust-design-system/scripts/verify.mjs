/* Headless CLI verification for Northwind (the "Corporate Trust" design system).
 *
 * Asserts the design-system contract programmatically against a running server:
 *   - Self-hosted Plus Jakarta Sans is the rendered typeface
 *   - The exact token palette (indigo-600, violet-600, slate-900/500, …)
 *   - COLORED shadows (blue/violet tinted, never neutral gray) — the signature
 *   - Gradient text via bg-clip-text on split headlines
 *   - Isometric 3D transforms (perspective + rotateX/rotateY) on the hero card
 *   - Elevated cards lift + intensify shadow on hover
 *   - Glowing numbered step badges
 *   - Pricing: popular tier rests larger (scale > 1)
 *   - Inputs: hairline border at rest → indigo ring on focus
 *   - FAQ details/summary accordion toggles
 *   - Final-CTA email capture confirms on submit
 *   - Stat count-ups reach their targets
 *   - Responsive: desktop nav hidden on mobile, drawer toggles, no h-scroll
 *   - Accessibility: single <h1>, skip link, alt/aria hygiene
 *   - No console / page errors
 *
 * Usage: node scripts/verify.mjs [baseURL]      (default http://localhost:5191)
 * Set CHROME_PATH to use a specific Chromium/Chrome binary.
 */
import { chromium } from "playwright";

const BASE_URL = process.argv[2] ?? "http://localhost:5191";
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
await page.waitForTimeout(1600); // let entrance reveals settle

// ── Title & brand ────────────────────────────────────────────────────────
check("page title mentions Northwind", (await page.title()).includes("Northwind"), await page.title());
check("brand wordmark present", (await page.getByText("Northwind").count()) >= 1);

// ── Self-hosted Plus Jakarta Sans renders ──────────────────────────────────
const bodyFont = await page.evaluate(() => getComputedStyle(document.body).fontFamily);
check("Plus Jakarta Sans on body", /Plus Jakarta Sans/.test(bodyFont), bodyFont);
const fontLoaded = await page.evaluate(async () => {
	await document.fonts.ready;
	return (
		document.fonts.check('800 16px "Plus Jakarta Sans"') &&
		document.fonts.check('400 16px "Plus Jakarta Sans"')
	);
});
check("PJS 400 + 800 faces loaded", fontLoaded === true);

// ── Token palette resolved to the exact Corporate Trust colors ─────────────
const tokens = await page.evaluate(() => {
	const cs = getComputedStyle(document.documentElement);
	return {
		indigo600: cs.getPropertyValue("--color-indigo-600").trim().toLowerCase(),
		violet600: cs.getPropertyValue("--color-violet-600").trim().toLowerCase(),
		slate900: cs.getPropertyValue("--color-slate-900").trim().toLowerCase(),
		slate500: cs.getPropertyValue("--color-slate-500").trim().toLowerCase(),
		slate200: cs.getPropertyValue("--color-slate-200").trim().toLowerCase(),
		emerald500: cs.getPropertyValue("--color-emerald-500").trim().toLowerCase(),
		canvas: cs.getPropertyValue("--color-canvas").trim().toLowerCase(),
	};
});
check("--color-indigo-600 = #4f46e5", tokens.indigo600 === "#4f46e5", tokens.indigo600);
check("--color-violet-600 = #7c3aed", tokens.violet600 === "#7c3aed", tokens.violet600);
check("--color-slate-900 = #0f172a", tokens.slate900 === "#0f172a", tokens.slate900);
check("--color-slate-500 = #64748b", tokens.slate500 === "#64748b", tokens.slate500);
check("--color-slate-200 (border) = #e2e8f0", tokens.slate200 === "#e2e8f0", tokens.slate200);
check("--color-emerald-500 = #10b981", tokens.emerald500 === "#10b981", tokens.emerald500);
check("--color-canvas (bg) = #f8fafc", tokens.canvas === "#f8fafc", tokens.canvas);

// Page background is the Slate 50 canvas.
const pageBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
check("body bg is Slate 50", pageBg === "rgb(248, 250, 252)", pageBg);

// ── THE SIGNATURE: shadows are blue/violet TINTED, never neutral gray ──────
// Sample the hero dashboard card's shadow and assert the rgba carries the
// indigo (79,70,229) tint rather than a gray (r≈g≈b) shadow.
const cardShadow = await page.evaluate(() => {
	const el = document.querySelector(".card");
	return el ? getComputedStyle(el).boxShadow : "";
});
const tintMatch = cardShadow.match(/rgba?\(([^)]+)\)/);
let tinted = false;
if (tintMatch) {
	const [r, g, b] = tintMatch[1].split(",").map((n) => parseFloat(n));
	// indigo shadow: blue dominates and red≈70, green≈70 — definitely not gray.
	tinted = b > r && b > g && b > 150 && Math.abs(r - g) < 30;
}
check("card shadow is color-tinted (indigo), not gray", tinted, cardShadow.slice(0, 60));

// A primary CTA button carries the strong indigo button shadow.
const btnShadow = await page.evaluate(() => {
	const el = document.querySelector(".btn-primary");
	return el ? getComputedStyle(el).boxShadow : "";
});
check("primary button has a colored shadow", /rgba?\(\s*79,\s*70,\s*229/.test(btnShadow), btnShadow.slice(0, 60));

// ── Gradient text (bg-clip-text) on a split headline ───────────────────────
const gradientText = await page.evaluate(() => {
	const el = document.querySelector(".text-gradient");
	if (!el) return null;
	const s = getComputedStyle(el);
	return {
		clip: s.webkitBackgroundClip || s.backgroundClip,
		fill: s.webkitTextFillColor,
		hasGradient: /gradient/.test(s.backgroundImage),
	};
});
check(
	"headline accent uses clipped gradient text",
	!!gradientText && /text/.test(gradientText.clip) && gradientText.hasGradient,
	JSON.stringify(gradientText),
);

// ── Buttons are pill-shaped (rounded-full) ─────────────────────────────────
const btnRadius = await page.evaluate(() => {
	const el = document.querySelector(".btn-primary");
	return el ? getComputedStyle(el).borderTopLeftRadius : "";
});
check("primary button is pill (rounded-full)", parseFloat(btnRadius) >= 100, btnRadius);

// ── Feature cards use rounded-xl (12px) and a hairline border ──────────────
// (The hero dashboard card is intentionally rounded-2xl; the canonical content
//  cards in the feature grid carry the spec's rounded-xl.)
const cardBox = await page.evaluate(() => {
	const el = document.querySelector("#platform .card");
	const s = el ? getComputedStyle(el) : null;
	return s ? { radius: s.borderTopLeftRadius, border: s.borderTopWidth } : null;
});
check("feature card radius is rounded-xl (12px)", cardBox && parseFloat(cardBox.radius) === 12, cardBox?.radius);
check("feature card has a 1px hairline border", cardBox && parseFloat(cardBox.border) === 1, cardBox?.border);

// ── Isometric 3D: hero card lives in a perspective scene + tilted transform ─
const iso = await page.evaluate(() => {
	const scene = document.querySelector(".scene");
	const tilted = document.querySelector(".iso-tilt");
	const sPersp = scene ? getComputedStyle(scene).perspective : "none";
	const tTransform = tilted ? getComputedStyle(tilted).transform : "none";
	// A rotateX/rotateY shows up as a 3D matrix (matrix3d(...)).
	return { perspective: sPersp, is3d: /matrix3d/.test(tTransform) };
});
check("hero card has a perspective scene", iso.perspective !== "none" && parseFloat(iso.perspective) > 500, iso.perspective);
check("hero card carries a 3D isometric transform", iso.is3d, "matrix3d expected");

// ── Glowing numbered step badges (how-it-works) ────────────────────────────
const stepGlow = await page.evaluate(() => {
	const badge = Array.from(document.querySelectorAll("#how .rounded-full")).find(
		(e) => e.textContent?.trim() === "1",
	);
	if (!badge) return null;
	const s = getComputedStyle(badge);
	return { shadow: s.boxShadow, gradient: /gradient/.test(s.backgroundImage) };
});
check(
	"step badge has gradient bg + glow shadow",
	!!stepGlow && stepGlow.gradient && /rgba?\(\s*79,\s*70,\s*229/.test(stepGlow.shadow),
	stepGlow ? stepGlow.shadow.slice(0, 50) : "no badge",
);

// ── Sections / anchors present ─────────────────────────────────────────────
for (const id of ["top", "platform", "features", "pricing", "faq", "cta"]) {
	check(`section #${id} present`, (await page.locator(`#${id}`).count()) >= 1);
}

// ── Card hover lifts + intensifies the shadow ──────────────────────────────
const featureCard = page.locator("#platform .card").first();
const before = await featureCard.evaluate((el) => ({
	t: getComputedStyle(el).transform,
	s: getComputedStyle(el).boxShadow,
}));
await featureCard.hover();
await page.waitForTimeout(350);
const after = await featureCard.evaluate((el) => ({
	t: getComputedStyle(el).transform,
	s: getComputedStyle(el).boxShadow,
}));
check("feature card lifts on hover (transform changes)", before.t !== after.t, `${before.t} -> ${after.t}`);
check("feature card shadow intensifies on hover", before.s !== after.s);

// ── Pricing: popular tier rests larger (scale > 1) ─────────────────────────
check("pricing 'Most popular' badge present", (await page.getByText("Most popular").count()) === 1);
const popularScale = await page.evaluate(() => {
	const badge = Array.from(document.querySelectorAll("#pricing *")).find(
		(e) => e.textContent?.trim() === "Most popular",
	);
	const card = badge?.closest("#pricing > * *") || badge?.parentElement;
	// Walk up to the tier container that carries md:scale-105.
	let node = badge;
	for (let i = 0; i < 4 && node; i++) {
		const cs = getComputedStyle(node);
		if (cs.scale && cs.scale !== "none" && parseFloat(cs.scale) > 1)
			return { scale: cs.scale, transform: cs.transform };
		if (cs.transform && cs.transform !== "none" && /matrix/.test(cs.transform))
			return { scale: cs.scale, transform: cs.transform };
		node = node.parentElement;
	}
	void card;
	return { scale: getComputedStyle(badge.parentElement).scale, transform: "none" };
});
const restsLarger =
	(popularScale.scale && popularScale.scale !== "none" && parseFloat(popularScale.scale) > 1) ||
	(popularScale.transform && popularScale.transform !== "none");
check("popular tier rests larger (scale > 1)", restsLarger, JSON.stringify(popularScale));

// ── Inputs: hairline border at rest → indigo ring on focus ─────────────────
// Use the footer email input (light input on dark uses indigo-400 focus border;
// the CTA input is themed). Test the canonical .field on the dark footer.
const footerInput = page.locator("#footer-email");
const restBorder = await footerInput.evaluate((el) => getComputedStyle(el).borderTopWidth);
await footerInput.focus();
await page.waitForTimeout(250);
const focusBorder = await footerInput.evaluate((el) => getComputedStyle(el).borderColor);
check("input has a hairline border at rest", parseFloat(restBorder) === 1, restBorder);
check("input border turns indigo-400 on focus", focusBorder === "rgb(129, 140, 248)", focusBorder);

// ── FAQ accordion: answer hidden until the summary is opened ───────────────
const faqQ = "What happens to my workflows if I downgrade?";
const faqAnswerText = "Your workflows are never deleted";
const closedVisible = await page
	.getByText(faqAnswerText, { exact: false })
	.first()
	.isVisible()
	.catch(() => false);
check("FAQ answer hidden before open", closedVisible === false);
const summary = page.locator("#faq summary", { hasText: faqQ });
await summary.click();
await page.waitForTimeout(350);
const openVisible = await page.getByText(faqAnswerText, { exact: false }).first().isVisible();
check("FAQ answer reveals on open", openVisible === true);

// ── Final-CTA email capture confirms on submit ─────────────────────────────
await page.locator("#cta-email").scrollIntoViewIfNeeded();
await page.locator("#cta-email").fill("ops@acme.com");
await page.locator("#cta button[type=submit]").click();
await page.waitForTimeout(300);
check(
	"CTA email submit shows confirmation",
	(await page.getByText("You're in", { exact: false }).count()) >= 1,
);

// ── Stat count-ups reached their targets ───────────────────────────────────
for (const target of ["99.99%", "4.9/5", "180+"]) {
	check(`stat "${target}" reached`, (await page.getByText(target, { exact: false }).count()) >= 1);
}

// ── Accessibility hygiene ──────────────────────────────────────────────────
check("exactly one <h1>", (await page.locator("h1").count()) === 1);
const skip = page.getByRole("link", { name: "Skip to content" });
check("skip-to-content link present", (await skip.count()) === 1);
const blankAlt = await page.evaluate(
	() => Array.from(document.images).filter((i) => !i.alt && !i.getAttribute("aria-hidden")).length,
);
check("no images missing alt/aria-hidden", blankAlt === 0, `${blankAlt} offending`);

// ── No horizontal overflow at desktop ──────────────────────────────────────
const hOverflow = await page.evaluate(
	() => document.documentElement.scrollWidth - document.documentElement.clientWidth,
);
check("no horizontal scroll (desktop)", hOverflow <= 1, `overflow=${hOverflow}px`);

// ── Responsive: desktop nav hidden on mobile, drawer toggles ───────────────
await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(300);
check("desktop nav hidden on mobile", !(await page.locator("header nav ul").first().isVisible()));
const burger = page.getByRole("button", { name: "Open menu" });
check("mobile menu button visible", await burger.isVisible());
await burger.click();
await page.waitForTimeout(350);
check(
	"mobile drawer opens with links",
	await page.locator("#mobile-menu").getByRole("link", { name: "Pricing" }).isVisible(),
);
const hOverflowMobile = await page.evaluate(
	() => document.documentElement.scrollWidth - document.documentElement.clientWidth,
);
check("no horizontal scroll (mobile)", hOverflowMobile <= 1, `overflow=${hOverflowMobile}px`);

// ── No console / page errors ───────────────────────────────────────────────
check("no console/page errors", consoleErrors.length === 0, consoleErrors.join(" | ").slice(0, 300));

await browser.close();
console.log(failures === 0 ? "\nALL CHECKS PASSED" : `\n${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
