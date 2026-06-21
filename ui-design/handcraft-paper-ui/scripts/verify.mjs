/* Headless CLI verification for Handcraft (Hand-Drawn design system showcase).
 *
 * Asserts the design-system contract programmatically:
 *   - The exact pencil/paper/marker token palette resolves
 *   - Self-hosted Kalam + Patrick Hand are the rendered fonts and actually load
 *   - Every shadow on the page is a HARD offset (zero blur radius) — never soft
 *   - Borders are wobbly (irregular elliptical border-radius), not standard
 *   - Paper-grain dot texture is on the body background
 *   - All major sections / anchors are present
 *   - Button hover fills red + lifts; active "presses flat" (no shadow)
 *   - Input focus turns the border blue with a ring
 *   - Pricing popular tier rests larger (scaled) on desktop
 *   - CTA email form shows a confirmation on submit
 *   - Stat count-ups reach their targets
 *   - Responsive: desktop nav hidden on mobile, hamburger toggles the sheet
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

const browser = await chromium.launch({
	executablePath: CHROME_PATH,
	args: ["--no-sandbox"],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

const consoleErrors = [];
page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
page.on("pageerror", (e) => consoleErrors.push(String(e)));

await page.goto(BASE_URL, { waitUntil: "networkidle" });
await page.waitForTimeout(1600); // let reveal animations settle

// ── Title & shell ──────────────────────────────────────────────────────────
check(
	"page title mentions Scribbly",
	(await page.title()).includes("Scribbly"),
	await page.title(),
);
check(
	"brand wordmark present",
	(await page.getByText("Scribbly").count()) >= 1,
);

// ── Token palette resolves to the exact pencil/paper/marker colors ─────────
const tokens = await page.evaluate(() => {
	const cs = getComputedStyle(document.documentElement);
	return {
		paper: cs.getPropertyValue("--color-paper").trim().toLowerCase(),
		ink: cs.getPropertyValue("--color-ink").trim().toLowerCase(),
		muted: cs.getPropertyValue("--color-muted").trim().toLowerCase(),
		accent: cs.getPropertyValue("--color-accent").trim().toLowerCase(),
		pen: cs.getPropertyValue("--color-pen").trim().toLowerCase(),
		postit: cs.getPropertyValue("--color-postit").trim().toLowerCase(),
	};
});
check("--color-paper = #fdfbf7", tokens.paper === "#fdfbf7", tokens.paper);
check("--color-ink = #2d2d2d", tokens.ink === "#2d2d2d", tokens.ink);
check("--color-muted = #e5e0d8", tokens.muted === "#e5e0d8", tokens.muted);
check("--color-accent = #ff4d4d", tokens.accent === "#ff4d4d", tokens.accent);
check("--color-pen = #2d5da1", tokens.pen === "#2d5da1", tokens.pen);
check("--color-postit = #fff9c4", tokens.postit === "#fff9c4", tokens.postit);

// ── Body uses soft pencil black on warm paper (never pure black) ───────────
const bodyColors = await page.evaluate(() => {
	const s = getComputedStyle(document.body);
	return { color: s.color, bg: s.backgroundColor, bgImage: s.backgroundImage };
});
check(
	"body text is soft pencil black rgb(45,45,45)",
	bodyColors.color === "rgb(45, 45, 45)",
	bodyColors.color,
);
check(
	"body bg is warm paper rgb(253,251,247)",
	bodyColors.bg === "rgb(253, 251, 247)",
	bodyColors.bg,
);
check(
	"paper-grain radial-gradient dots on body",
	bodyColors.bgImage.includes("radial-gradient"),
	bodyColors.bgImage.slice(0, 40),
);

// ── Self-hosted handwritten fonts render + actually load ───────────────────
const fonts = await page.evaluate(async () => {
	await document.fonts.ready;
	const h1 = document.querySelector("h1");
	const body = document.body;
	return {
		headingFamily: h1 ? getComputedStyle(h1).fontFamily : "",
		bodyFamily: getComputedStyle(body).fontFamily,
		kalam700: document.fonts.check('700 16px "Kalam"'),
		patrick: document.fonts.check('400 16px "Patrick Hand"'),
	};
});
check(
	"headings use Kalam",
	fonts.headingFamily.includes("Kalam"),
	fonts.headingFamily,
);
check(
	"body uses Patrick Hand",
	fonts.bodyFamily.includes("Patrick Hand"),
	fonts.bodyFamily,
);
check("Kalam 700 face loaded", fonts.kalam700 === true);
check("Patrick Hand 400 face loaded", fonts.patrick === true);

// ── THE CARDINAL RULE: every shadow is a HARD offset (zero blur) ───────────
// A box-shadow string looks like "rgb(...) Xpx Ypx [blur] [spread]". The third
// length is the blur radius and MUST be 0 for the cut-paper aesthetic.
const shadowReport = await page.evaluate(() => {
	const offenders = [];
	let hardShadowCount = 0;
	const lenRe = /(-?\d*\.?\d+)px/g;
	for (const el of Array.from(document.querySelectorAll("*"))) {
		const sh = getComputedStyle(el).boxShadow;
		if (!sh || sh === "none") continue;
		// Multiple shadows are comma-separated; check each.
		for (const part of sh.split(/,(?![^()]*\))/)) {
			const lens = (part.match(lenRe) || []).map((x) => parseFloat(x));
			// lens = [offsetX, offsetY, blur?, spread?]
			const blur = lens.length >= 3 ? lens[2] : 0;
			if (blur > 0.01) {
				offenders.push(
					`${el.tagName}.${(el.className || "").toString().slice(0, 30)} blur=${blur}`,
				);
			} else {
				hardShadowCount += 1;
			}
		}
	}
	return { offenders, hardShadowCount };
});
check(
	"zero soft/blurred shadows anywhere",
	shadowReport.offenders.length === 0,
	shadowReport.offenders.slice(0, 4).join(" | "),
);
check(
	"hard offset shadows are actually used",
	shadowReport.hardShadowCount >= 10,
	`count=${shadowReport.hardShadowCount}`,
);

// Text shadows are forbidden too.
const textShadows = await page.evaluate(() => {
	let n = 0;
	for (const el of Array.from(document.querySelectorAll("*"))) {
		const ts = getComputedStyle(el).textShadow;
		if (ts && ts !== "none") n++;
	}
	return n;
});
check("no text shadows", textShadows === 0, `count=${textShadows}`);

// ── Wobbly borders: primary button radius is irregular & elliptical ────────
const btnRadius = await page.evaluate(() => {
	const btn = Array.from(document.querySelectorAll("a, button")).find((e) =>
		(e.textContent || "").includes("Start scribbling"),
	);
	if (!btn) return null;
	const s = getComputedStyle(btn);
	return {
		tl: s.borderTopLeftRadius,
		tr: s.borderTopRightRadius,
		w: s.borderTopWidth,
	};
});
check("primary CTA exists", btnRadius !== null);
// Irregular = the horizontal/vertical radii differ AND the four corners aren't all equal.
check(
	"button border-radius is wobbly (irregular elliptical)",
	!!btnRadius && btnRadius.tl.includes(" ") && btnRadius.tl !== btnRadius.tr,
	btnRadius ? `tl="${btnRadius.tl}" tr="${btnRadius.tr}"` : "",
);
check(
	"button uses thick border-[3px]",
	!!btnRadius && btnRadius.w === "3px",
	btnRadius?.w,
);

// Cards use a 2px+ border too.
const cardBorder = await page.evaluate(() => {
	const card = document.querySelector(
		"#features article, #features .grid > div > div",
	);
	// fall back to any bordered card inside features
	const el =
		card || document.querySelector("#features [style*='border-radius']");
	return el ? getComputedStyle(el).borderTopWidth : "";
});
check(
	"feature cards have a thick border (>=2px)",
	parseFloat(cardBorder) >= 2,
	cardBorder,
);

// ── All major sections / anchors present ───────────────────────────────────
for (const id of [
	"top",
	"features",
	"how",
	"product",
	"pricing",
	"notes",
	"get-started",
]) {
	check(`section #${id} present`, (await page.locator(`#${id}`).count()) >= 1);
}

// ── Signature decorations exist (SVG scribbles) ────────────────────────────
const svgCount = await page.locator("svg").count();
check(
	"hand-drawn SVG decorations present",
	svgCount >= 12,
	`svg count=${svgCount}`,
);

// ── Button interaction: hover fills red + active presses flat ──────────────
const primary = page.locator("a", { hasText: "Start scribbling" }).first();
await primary.scrollIntoViewIfNeeded();
await primary.hover();
await page.waitForTimeout(150);
const hoverBg = await primary.evaluate(
	(el) => getComputedStyle(el).backgroundColor,
);
check("button hover fills accent red", hoverBg === "rgb(255, 77, 77)", hoverBg);

// ── Input focus: border turns blue + ring appears ──────────────────────────
const field = page.locator("#cta-email");
await field.scrollIntoViewIfNeeded();
const restBorder = await field.evaluate(
	(el) => getComputedStyle(el).borderTopColor,
);
await field.focus();
await page.waitForTimeout(200);
const focusState = await field.evaluate((el) => {
	const s = getComputedStyle(el);
	return { border: s.borderTopColor, shadow: s.boxShadow };
});
check("input border ink at rest", restBorder === "rgb(45, 45, 45)", restBorder);
check(
	"input focus border turns blue pen",
	focusState.border === "rgb(45, 93, 161)",
	focusState.border,
);
check(
	"input focus shows a ring",
	focusState.shadow !== "none",
	focusState.shadow.slice(0, 40),
);

// ── CTA form submit shows confirmation ─────────────────────────────────────
await field.fill("doodler@studio.com");
await page.getByRole("button", { name: /Start scribbling/ }).click();
await page.waitForTimeout(300);
check(
	"CTA submit shows confirmation",
	(await page.getByText("You're in!", { exact: false }).count()) >= 1,
);

// ── Pricing popular tier rests larger (scaled) on desktop ──────────────────
check(
	"pricing 'most loved' badge present",
	(await page.getByText("most loved").count()) >= 1,
);
const popularScale = await page.evaluate(() => {
	const badge = Array.from(document.querySelectorAll("#pricing *")).find(
		(e) => e.textContent?.trim() === "most loved",
	);
	if (!badge) return null;
	// the scaled wrapper is the outer positioned div of the popular column
	let el = badge.closest("#pricing > div > div");
	// climb to the column wrapper that carries md:scale-105
	const col = badge.closest("#pricing .grid > div");
	const cs = col ? getComputedStyle(col) : null;
	return cs ? { scale: cs.scale, transform: cs.transform } : null;
});
const restsLarger =
	!!popularScale &&
	((popularScale.scale &&
		popularScale.scale !== "none" &&
		parseFloat(popularScale.scale) > 1) ||
		(popularScale.transform &&
			popularScale.transform !== "none" &&
			popularScale.transform !== ""));
check(
	"popular pricing card rests larger (scale > 1)",
	restsLarger,
	JSON.stringify(popularScale),
);

// ── Stat count-ups reached targets ─────────────────────────────────────────
// Ensure the stats band has been on screen so its count-up fired, then assert.
// Values render across child spans (number + suffix), so check the band's
// combined textContent rather than a single text node.
await page.getByText("boards started").scrollIntoViewIfNeeded();
await page.waitForTimeout(1500);
const statText = await page.evaluate(() => {
	const lis = Array.from(document.querySelectorAll("li")).map((li) =>
		(li.textContent || "").replace(/\s+/g, " ").trim(),
	);
	return lis.join(" || ");
});
check(
	"stat 12k+ counted up",
	/12k\+\s*boards started/.test(statText),
	statText.slice(0, 60),
);
check("stat 98% counted up", /98%\s*felt more creative/.test(statText));

// ── Testimonials: speech bubbles present ───────────────────────────────────
check(
	"testimonial quotes present",
	(await page.locator("#notes blockquote").count()) === 3,
);

// ── Responsive: desktop nav hidden on mobile, hamburger toggles the sheet ──
await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(300);
check(
	"desktop nav links hidden on mobile",
	!(await page.locator("header nav ul").first().isVisible()),
);
const burger = page.getByRole("button", { name: "Open menu" });
check("mobile menu button visible", await burger.isVisible());
await burger.click();
await page.waitForTimeout(300);
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
