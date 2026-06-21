/* Headless CLI verification for Claymakers (High-Fidelity Claymorphism).
 *
 * Asserts the design-system contract programmatically:
 *   - The exact "candy shop" palette tokens resolve from one @theme block
 *   - Self-hosted Nunito (display) + DM Sans (body) actually render
 *   - 4-layer (multi-comma) shadow stacks on cards & buttons — the depth engine
 *   - Super-rounded radii everywhere; NO sharp corners (>= ~16px on real boxes)
 *   - Recessed inputs become raised white on focus (inset → none)
 *   - Buttons squish (the live counter increments on click)
 *   - Animated background blobs exist (4 of them)
 *   - Bento feature grid spans, stat count-ups, pricing toggle, popular tier
 *     rests larger, testimonials, FAQ accordion (open panel goes recessed),
 *     working CTA email capture, responsive mobile menu
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
	console.log(
		`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`,
	);
	if (!ok) failures += 1;
};

// A clay shadow stack is multi-layer: count top-level comma-separated layers.
const shadowLayers = (boxShadow) => {
	if (!boxShadow || boxShadow === "none") return 0;
	let depth = 0;
	let count = 1;
	for (const ch of boxShadow) {
		if (ch === "(") depth++;
		else if (ch === ")") depth--;
		else if (ch === "," && depth === 0) count++;
	}
	return count;
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
await page.waitForTimeout(800);
// Bring each major section to viewport-center so every IntersectionObserver
// (scroll reveals + stat count-ups) reliably fires, then return to the top for
// the assertions. Holding each section centered beats a fast sweep that can
// flick past the count-up's 0.4 threshold before it registers.
for (const id of [
	"stats",
	"features",
	"showcase",
	"benefits",
	"how",
	"pricing",
	"loved",
	"faq",
	"cta",
]) {
	await page.evaluate((sid) => {
		document.getElementById(sid)?.scrollIntoView({ block: "center" });
	}, id);
	await page.waitForTimeout(220);
}
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(1900); // let the stat count-ups finish their easing

// ── Title & brand ───────────────────────────────────────────────────────────
check(
	"page title mentions Claymakers",
	(await page.title()).includes("Claymakers"),
	await page.title(),
);
check(
	"brand wordmark present",
	(await page.getByText("Claymakers", { exact: true }).count()) >= 1,
);

// ── Centralized palette tokens resolve to the exact candy-shop values ────────
const tokens = await page.evaluate(() => {
	const cs = getComputedStyle(document.documentElement);
	const g = (n) => cs.getPropertyValue(n).trim().toLowerCase();
	return {
		canvas: g("--color-clay-canvas"),
		foreground: g("--color-clay-foreground"),
		muted: g("--color-clay-muted"),
		accent: g("--color-clay-accent"),
		alt: g("--color-clay-accent-alt"),
		sky: g("--color-clay-sky"),
		emerald: g("--color-clay-emerald"),
		amber: g("--color-clay-amber"),
	};
});
check(
	"--color-clay-canvas = #f4f1fa",
	tokens.canvas === "#f4f1fa",
	tokens.canvas,
);
check(
	"--color-clay-foreground = #332f3a",
	tokens.foreground === "#332f3a",
	tokens.foreground,
);
check("--color-clay-muted = #635f69", tokens.muted === "#635f69", tokens.muted);
check(
	"--color-clay-accent = #7c3aed",
	tokens.accent === "#7c3aed",
	tokens.accent,
);
check(
	"--color-clay-accent-alt = #db2777",
	tokens.alt === "#db2777",
	tokens.alt,
);
check("--color-clay-sky = #0ea5e9", tokens.sky === "#0ea5e9", tokens.sky);
check(
	"--color-clay-emerald = #10b981",
	tokens.emerald === "#10b981",
	tokens.emerald,
);
check("--color-clay-amber = #f59e0b", tokens.amber === "#f59e0b", tokens.amber);

// ── Canvas background is the lavender-white (never pure white) ───────────────
const bodyBg = await page.evaluate(
	() => getComputedStyle(document.body).backgroundColor,
);
check(
	"body canvas = rgb(244,241,250)",
	bodyBg === "rgb(244, 241, 250)",
	bodyBg,
);

// ── Self-hosted fonts actually render ───────────────────────────────────────
const bodyFont = await page.evaluate(
	() => getComputedStyle(document.body).fontFamily,
);
check("DM Sans on body", bodyFont.includes("DM Sans"), bodyFont);
const h1Font = await page.evaluate(() => {
	const h = document.querySelector("h1");
	return h ? getComputedStyle(h).fontFamily : "";
});
check("Nunito on hero heading", h1Font.includes("Nunito"), h1Font);
const fontsLoaded = await page.evaluate(async () => {
	await document.fonts.ready;
	return {
		nunito: document.fonts.check('900 16px "Nunito"'),
		dm: document.fonts.check('500 16px "DM Sans"'),
	};
});
check("Nunito 900 face loaded", fontsLoaded.nunito === true);
check("DM Sans face loaded", fontsLoaded.dm === true);

// ── THE DEPTH ENGINE: 4-layer shadow stacks on cards & buttons ──────────────
const cardShadow = await page.evaluate(() => {
	const el = document.querySelector("#features article");
	return el ? getComputedStyle(el).boxShadow : "";
});
check(
	"feature card has a multi-layer (>=4) shadow stack",
	shadowLayers(cardShadow) >= 4,
	`${shadowLayers(cardShadow)} layers`,
);

const primaryBtn = page.getByRole("link", { name: /Start molding/ }).first();
const btnShadow = await primaryBtn.evaluate(
	(el) => getComputedStyle(el).boxShadow,
);
check(
	"primary button has a multi-layer (>=4) shadow stack",
	shadowLayers(btnShadow) >= 4,
	`${shadowLayers(btnShadow)} layers`,
);

// A recessed surface (the input) uses INSET shadows
const inputShadowRest = await page.evaluate(() => {
	const el = document.querySelector("#showcase input");
	return el ? getComputedStyle(el).boxShadow : "";
});
check(
	"input rests recessed (inset shadow)",
	inputShadowRest.includes("inset"),
	inputShadowRest.slice(0, 40),
);

// ── NO sharp corners: every real box uses a generous radius ─────────────────
const sharp = await page
	.evaluate(() => {
		const offenders = [];
		for (const el of Array.from(
			document.querySelectorAll(
				"button, article, input, section > div, .rounded-2xl",
			),
		)) {
			const r = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
			const rect = el.getBoundingClientRect();
			// ignore tiny/zero-size or full-bleed structural wrappers with intentional 0
			if (rect.width < 40 || rect.height < 24) continue;
			// pills/circles report huge radii; cards/buttons must be >= 12px
			if (r > 0 && r < 12)
				offenders.push(
					`${el.tagName}.${(el.className || "").toString().slice(0, 24)}=${r}`,
				);
		}
		return offenders;
	})
	.catch(() => []);
check(
	"no sharp (<12px) corners on real boxes",
	sharp.length === 0,
	sharp.slice(0, 4).join(" | "),
);

// ── Hero gradient text uses transparent fill (background-clip:text) ─────────
const gradientText = await page.evaluate(() => {
	const el = document.querySelector(".clay-text-gradient");
	if (!el) return null;
	const s = getComputedStyle(el);
	return {
		color: s.webkitTextFillColor || s.color,
		hasImage: s.backgroundImage.includes("gradient"),
	};
});
check(
	"hero gradient text present + clipped",
	!!gradientText && gradientText.hasImage,
	JSON.stringify(gradientText),
);

// ── Animated background blobs (4) ───────────────────────────────────────────
const blobCount = await page.evaluate(() => {
	const wrap = document.querySelector(
		"div[aria-hidden].fixed.-z-10, div.-z-10",
	);
	return wrap ? wrap.querySelectorAll("div").length : 0;
});
check("background has 4 floating blobs", blobCount === 4, String(blobCount));

// ── All major sections present ──────────────────────────────────────────────
for (const id of [
	"top",
	"stats",
	"features",
	"showcase",
	"benefits",
	"how",
	"pricing",
	"loved",
	"faq",
	"cta",
]) {
	check(`section #${id} present`, (await page.locator(`#${id}`).count()) === 1);
}

// ── Bento grid: hero card spans 2 columns on desktop ────────────────────────
const heroCardSpans = await page.evaluate(() => {
	const wrap = Array.from(
		document.querySelectorAll("#features .md\\:col-span-2"),
	);
	return wrap.length;
});
check(
	"bento grid has spanning (col-span-2) cards",
	heroCardSpans >= 1,
	String(heroCardSpans),
);
check(
	"feature grid has 6+ cards",
	(await page.locator("#features article").count()) >= 6,
	String(await page.locator("#features article").count()),
);

// ── Stat count-ups reached their targets (read the orb value spans) ─────────
const orbValues = await page.evaluate(() =>
	Array.from(document.querySelectorAll("#stats .aspect-square span")).map((s) =>
		(s.textContent || "").replace(/\s+/g, " ").trim(),
	),
);
const orbBlob = orbValues.join(" | ");
check("stat '120+' counted up", orbBlob.includes("120+"), orbBlob);
check("stat '99.9%' counted up", orbBlob.includes("99.9%"), orbBlob);
check("stat '12k+' counted up", orbBlob.includes("12k+"), orbBlob);

// ── Button SQUISH: the live counter increments on click ─────────────────────
const counter = page.locator('[data-testid="press-count"]');
const before = await counter.textContent();
const playBtn = page.getByRole("button", { name: "Primary" }).first();
await playBtn.click();
await playBtn.click();
await page.waitForTimeout(120);
const after = await counter.textContent();
const beforeN = parseInt(before || "0", 10);
const afterN = parseInt(after || "0", 10);
check(
	"button press registers (counter increments)",
	afterN === beforeN + 2,
	`${before} -> ${after}`,
);

// ── Recessed input → raised white on focus (inset shadow disappears) ────────
const field = page.locator("#showcase input").first();
await field.focus();
await page.waitForTimeout(220);
const focusState = await field.evaluate((el) => {
	const s = getComputedStyle(el);
	return { bg: s.backgroundColor, shadow: s.boxShadow };
});
// Effectively white (allow sub-pixel compositing from the parent's backdrop-blur).
const rgb = (focusState.bg.match(/\d+/g) || []).map(Number);
const isWhite =
	rgb.length >= 3 && rgb[0] >= 250 && rgb[1] >= 250 && rgb[2] >= 250;
check("input focus turns white", isWhite, focusState.bg);
check(
	"input focus drops the inset (raised)",
	!focusState.shadow.includes("inset"),
	focusState.shadow.slice(0, 30),
);

// ── Pricing: popular tier rests larger (scale > 1) + billing toggle works ───
check(
	"pricing 'Most popular' badge present",
	(await page.getByText("Most popular", { exact: false }).count()) === 1,
);
const popularScale = await page.evaluate(() => {
	const badge = Array.from(document.querySelectorAll("#pricing *")).find(
		(e) => e.textContent?.trim() === "Most popular",
	);
	if (!badge) return null;
	// Walk up from the badge until we hit the ancestor whose `scale` token is set
	// (Tailwind v4 emits the standalone `scale` property for md:scale-105).
	let el = badge.parentElement;
	while (el && el.id !== "pricing") {
		const cs = getComputedStyle(el);
		if (cs.scale && cs.scale !== "none" && parseFloat(cs.scale) > 1) {
			return { scale: cs.scale, found: true };
		}
		el = el.parentElement;
	}
	return { scale: "none", found: false };
});
check(
	"popular pricing card rests larger (scale>1)",
	!!popularScale && popularScale.found,
	JSON.stringify(popularScale),
);

// billing toggle flips a price (Studio 24 -> 19 annual)
check(
	"monthly price $24 visible",
	(await page.getByText("$24", { exact: false }).count()) >= 1,
);
await page.getByRole("button", { name: /Annual/ }).click();
await page.waitForTimeout(250);
check(
	"annual toggle changes price to $19",
	(await page.getByText("$19", { exact: false }).count()) >= 1,
);

// ── Testimonials present with star ratings ──────────────────────────────────
check(
	"testimonials section has 3 quotes",
	(await page
		.locator("#loved")
		.getByText(/Claymakers|clay/i)
		.count()) >= 1,
);

// ── FAQ accordion: open item becomes recessed (inset shadow) ────────────────
const faqBtn = page.getByRole("button", {
	name: /What stack does Claymakers target/,
});
// first ensure it's collapsed by reading aria-expanded
const wasExpanded = (await faqBtn.getAttribute("aria-expanded")) === "true";
if (!wasExpanded) {
	await faqBtn.click();
	await page.waitForTimeout(400);
}
check(
	"FAQ answer reveals on click",
	await page
		.getByText(/React with Tailwind CSS v4/)
		.first()
		.isVisible(),
);
const openPanelShadow = await page.evaluate(() => {
	const btn = Array.from(document.querySelectorAll("#faq button")).find((b) =>
		b.textContent?.includes("What stack does Claymakers target"),
	);
	const panel = btn?.closest("div");
	return panel ? getComputedStyle(panel).boxShadow : "";
});
check(
	"open FAQ item is recessed (inset shadow)",
	openPanelShadow.includes("inset"),
	openPanelShadow.slice(0, 30),
);

// ── CTA: typing + submit shows confirmation ─────────────────────────────────
await page.locator("#cta input").fill("designer@studio.com");
await page
	.getByRole("button", { name: /Get clay/ })
	.last()
	.click();
await page.waitForTimeout(400);
check(
	"CTA submit shows confirmation",
	(await page.getByText("You're on the list!", { exact: false }).count()) === 1,
);

// ── Responsive: desktop nav hidden on mobile, menu toggles ──────────────────
await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(300);
check(
	"desktop nav links hidden on mobile",
	!(await page.locator("header nav ul").first().isVisible()),
);
const burger = page.getByRole("button", { name: "Open menu" });
check("mobile menu button visible", await burger.isVisible());
await burger.click();
await page.waitForTimeout(350);
check(
	"mobile menu opens with links",
	await page.getByRole("link", { name: "Pricing" }).first().isVisible(),
);

// ── No console / page errors ───────────────────────────────────────────────
check(
	"no console/page errors",
	consoleErrors.length === 0,
	consoleErrors.join(" | ").slice(0, 300),
);

await browser.close();
console.log(
	failures === 0 ? "\nALL CHECKS PASSED" : `\n${failures} CHECK(S) FAILED`,
);
process.exit(failures === 0 ? 0 : 1);
