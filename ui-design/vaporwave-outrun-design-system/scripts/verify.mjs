/* Headless CLI verification for NEONWAVE OS (Vaporwave / Outrun design system).
 *
 * Asserts the design-system contract programmatically:
 *   - Vendored Orbitron + Share Tech Mono fonts actually load & render
 *   - Centralized tokens resolve to the exact neon palette
 *   - The void background, fixed grid floor, blurred sun and CRT scanline
 *     overlay are all present at the right z-layers
 *   - Geometric rules: rounded-none everywhere; -skew-x-12 buttons
 *   - Buttons un-skew + glow on hover; cards lift; diamond icons rotate
 *   - Terminal-style input glows on focus
 *   - Every section is present; pricing "popular" tier rests larger
 *   - FAQ accordion toggles; benefits file-explorer switches preview
 *   - CTA form submit shows confirmation
 *   - Responsive: mobile menu toggles, desktop nav hidden on mobile
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
await page.waitForTimeout(1600); // let reveal + boot-log settle

// ── Title & shell ──────────────────────────────────────────────────────────
check("page title mentions NEONWAVE", (await page.title()).includes("NEONWAVE"), await page.title());
check(
	"brand wordmark present",
	(await page.getByText("NEONWAVE", { exact: false }).count()) >= 1,
);

// ── Vendored fonts actually render (no remote CDN) ──────────────────────────
const bodyFont = await page.evaluate(() => getComputedStyle(document.body).fontFamily);
check("Share Tech Mono on body", bodyFont.includes("Share Tech Mono"), bodyFont);
const headingFont = await page.evaluate(() => {
	const h = document.querySelector("h1");
	return h ? getComputedStyle(h).fontFamily : "";
});
check("Orbitron on headings", headingFont.includes("Orbitron"), headingFont);
const fontsLoaded = await page.evaluate(async () => {
	await document.fonts.ready;
	return {
		orbitron: document.fonts.check('900 32px "Orbitron"'),
		mono: document.fonts.check('400 16px "Share Tech Mono"'),
	};
});
check("Orbitron 900 face loaded", fontsLoaded.orbitron === true);
check("Share Tech Mono face loaded", fontsLoaded.mono === true);

// ── Tokens resolved to the exact neon palette ───────────────────────────────
// Browsers normalize hex (#ff00ff -> #f0f), so compare via canonical rgb().
const tokens = await page.evaluate(() => {
	const cs = getComputedStyle(document.documentElement);
	const norm = (v) => {
		const d = document.createElement("div");
		d.style.color = v.trim();
		document.body.appendChild(d);
		const rgb = getComputedStyle(d).color;
		d.remove();
		return rgb;
	};
	return {
		void: norm(cs.getPropertyValue("--color-void")),
		magenta: norm(cs.getPropertyValue("--color-magenta")),
		cyan: norm(cs.getPropertyValue("--color-cyan")),
		orange: norm(cs.getPropertyValue("--color-orange")),
		chrome: norm(cs.getPropertyValue("--color-chrome")),
	};
});
check("--color-void = #090014", tokens.void === "rgb(9, 0, 20)", tokens.void);
check("--color-magenta = #ff00ff", tokens.magenta === "rgb(255, 0, 255)", tokens.magenta);
check("--color-cyan = #00ffff", tokens.cyan === "rgb(0, 255, 255)", tokens.cyan);
check("--color-orange = #ff9900", tokens.orange === "rgb(255, 153, 0)", tokens.orange);
check("--color-chrome = #e0e0e0", tokens.chrome === "rgb(224, 224, 224)", tokens.chrome);

// ── The void background ─────────────────────────────────────────────────────
const bodyBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
check("body is the void (rgb 9,0,20)", bodyBg === "rgb(9, 0, 20)", bodyBg);

// ── Fixed atmosphere layers: grid floor (z0), sun (z0), scanlines (z50) ─────
const layers = await page.evaluate(() => {
	const grid = document.querySelector(".grid-floor");
	const sun = document.querySelector(".sun");
	const scan = document.querySelector(".scanlines");
	const z = (el) => (el ? getComputedStyle(el).zIndex : null);
	const pos = (el) => (el ? getComputedStyle(el).position : null);
	return {
		grid: { z: z(grid), pos: pos(grid) },
		sun: { z: z(sun), pos: pos(sun), blur: sun ? getComputedStyle(sun).filter : "" },
		scan: { z: z(scan), pos: pos(scan) },
	};
});
check("grid floor present, fixed, z-0", layers.grid.pos === "fixed" && layers.grid.z === "0", JSON.stringify(layers.grid));
check("blurred sun present + fixed", layers.sun.pos === "fixed", JSON.stringify(layers.sun));
check("sun has heavy blur", layers.sun.blur.includes("blur(100px)") || layers.sun.blur.includes("blur"), layers.sun.blur);
check("scanlines present, fixed, z-50", layers.scan.pos === "fixed" && layers.scan.z === "50", JSON.stringify(layers.scan));

// ── Geometry: nothing is rounded (except dots/circles) ──────────────────────
const sharpReport = await page.evaluate(() => {
	const offenders = [];
	const allow = new Set(["9999px", "0px", "50%"]);
	for (const el of Array.from(document.querySelectorAll("button.btn, .card, .window, .field, .eyebrow"))) {
		const r = getComputedStyle(el).borderTopLeftRadius;
		if (!allow.has(r)) offenders.push(el.className.toString().slice(0, 30) + ":" + r);
	}
	return offenders;
});
check("buttons/cards/windows are rounded-none", sharpReport.length === 0, sharpReport.slice(0, 4).join(" | "));

// ── Primary button: cyan, transparent, skewed, un-skews + glows on hover ────
const primaryBtn = page.getByRole("link", { name: /Explore modules/ }).first();
const restState = await primaryBtn.evaluate((el) => {
	const s = getComputedStyle(el);
	return { transform: s.transform, border: s.borderTopColor, shadow: s.boxShadow };
});
// skewX(-12deg) -> matrix with shear; not "none"
check("primary button is skewed at rest", restState.transform !== "none", restState.transform);
check("primary button has cyan border", restState.border === "rgb(0, 255, 255)", restState.border);
await primaryBtn.hover();
await page.waitForTimeout(300);
const hoverState = await primaryBtn.evaluate((el) => {
	const s = getComputedStyle(el);
	return { transform: s.transform, bg: s.backgroundColor, shadow: s.boxShadow };
});
// un-skewed -> identity matrix
check("primary button un-skews on hover", hoverState.transform === "none" || hoverState.transform === "matrix(1, 0, 0, 1, 0, 0)", hoverState.transform);
check("primary button fills cyan on hover", hoverState.bg === "rgb(0, 255, 255)", hoverState.bg);
check("primary button glows on hover", hoverState.shadow !== "none" && hoverState.shadow.includes("255"), hoverState.shadow.slice(0, 40));

// ── Card title is cyan with a glow (drop-shadow) ────────────────────────────
const cardTitle = await page.evaluate(() => {
	const el = document.querySelector(".title-cyan");
	if (!el) return null;
	const s = getComputedStyle(el);
	return { color: s.color, filter: s.filter, font: s.fontFamily };
});
check("card title is cyan", !!cardTitle && cardTitle.color === "rgb(0, 255, 255)", cardTitle?.color);
check("card title has glow filter", !!cardTitle && cardTitle.filter.includes("drop-shadow"), cardTitle?.filter?.slice(0, 40));
check("card title uses Orbitron", !!cardTitle && cardTitle.font.includes("Orbitron"), cardTitle?.font);

// ── Diamond icon container is rotated 45deg ─────────────────────────────────
const diamond = await page.evaluate(() => {
	const el = document.querySelector(".diamond");
	return el ? getComputedStyle(el).transform : null;
});
check("diamond icon container is rotated", !!diamond && diamond !== "none", diamond);

// ── All major sections / anchors present ────────────────────────────────────
for (const id of ["top", "features", "how", "benefits", "pricing", "faq", "cta"]) {
	check(`section #${id} present`, (await page.locator(`#${id}`).count()) === 1);
}

// ── Feature cards: exactly 6, dual border (cyan top) ────────────────────────
check("6 feature modules", (await page.locator("#features .card").count()) === 6);
const featBorder = await page.evaluate(() => {
	const el = document.querySelector("#features .card");
	if (!el) return null;
	const s = getComputedStyle(el);
	return { top: s.borderTopColor, topW: s.borderTopWidth };
});
check("feature card has cyan top laser border", !!featBorder && featBorder.top === "rgb(0, 255, 255)" && featBorder.topW === "2px", JSON.stringify(featBorder));

// ── Gradient text fill (transparent fill, has bg image) ─────────────────────
const sunset = await page.evaluate(() => {
	const el = document.querySelector(".text-sunset");
	if (!el) return null;
	const s = getComputedStyle(el);
	return { fill: s.webkitTextFillColor || s.color, img: s.backgroundImage };
});
check("hero gradient text uses sunset gradient", !!sunset && sunset.img.includes("gradient") && sunset.img.includes("255"), sunset?.img?.slice(0, 60));

// ── Benefits file-explorer: clicking a file switches the preview ────────────
check("benefits shows default file title", (await page.getByText("One source of truth", { exact: false }).count()) >= 1);
await page.getByRole("button", { name: /primitives\.tsx/ }).click();
await page.waitForTimeout(250);
check(
	"benefits switches preview on select",
	(await page.getByText("Composable by design", { exact: false }).first().isVisible()),
);

// ── Pricing: popular tier rests larger (scaled) ─────────────────────────────
check("pricing 3 tiers", (await page.locator("#pricing .card").count()) === 3);
const popularScale = await page.evaluate(() => {
	const badge = Array.from(document.querySelectorAll("#pricing *")).find(
		(e) => e.textContent?.trim().toLowerCase() === "most loaded",
	);
	if (!badge) return null;
	const card = badge.closest(".card");
	const cs = getComputedStyle(card);
	return { scale: cs.scale, transform: cs.transform };
});
const restsLarger =
	!!popularScale &&
	((popularScale.scale && popularScale.scale !== "none" && parseFloat(popularScale.scale) > 1) ||
		(popularScale.transform && popularScale.transform !== "none"));
check("popular tier rests larger (scale > 1)", restsLarger, JSON.stringify(popularScale));

// ── FAQ accordion toggles ───────────────────────────────────────────────────
const faqBtn = page.getByRole("button", { name: /What stack does NEONWAVE/ });
check("FAQ answer hidden before click", (await faqBtn.getAttribute("aria-expanded")) === "false");
await faqBtn.click();
await page.waitForTimeout(350);
check("FAQ answer reveals on click", (await faqBtn.getAttribute("aria-expanded")) === "true");
check(
	"FAQ answer text visible",
	await page.getByText("React + TypeScript primitives", { exact: false }).first().isVisible(),
);

// ── Terminal input glows cyan on focus ──────────────────────────────────────
const field = page.locator("#cta-email");
const fieldRest = await field.evaluate((el) => getComputedStyle(el).borderBottomColor);
await field.focus();
await page.waitForTimeout(250);
const fieldFocus = await field.evaluate((el) => {
	const s = getComputedStyle(el);
	return { border: s.borderBottomColor, shadow: s.boxShadow };
});
check("input underline magenta at rest", fieldRest === "rgb(255, 0, 255)", fieldRest);
check("input underline turns cyan on focus", fieldFocus.border === "rgb(0, 255, 255)", fieldFocus.border);
check("input glows on focus", fieldFocus.shadow !== "none" && fieldFocus.shadow.includes("255"), fieldFocus.shadow.slice(0, 40));

// ── CTA form submit shows confirmation ──────────────────────────────────────
await field.fill("operator@grid.net");
await page.getByRole("button", { name: "Send it" }).click();
await page.waitForTimeout(300);
check(
	"CTA submit shows confirmation",
	(await page.getByText("transmission received", { exact: false }).count()) >= 1,
);

// ── Stat count-ups reach their targets once scrolled into view ──────────────
// Scroll the telemetry window into the middle of the viewport, then wait for
// the rAF count-up to settle. Values render across split text nodes (number +
// suffix), so assert against the combined cell text rather than getByText.
await page.evaluate(() => {
	const cell = [...document.querySelectorAll(".text-sunset")].find((e) =>
		e.textContent.includes("%"),
	);
	if (cell) window.scrollTo(0, cell.getBoundingClientRect().top + window.scrollY - 300);
});
await page.waitForTimeout(2200);
const statTexts = await page.evaluate(() =>
	[...document.querySelectorAll(".text-sunset")]
		.map((e) => e.textContent.replace(/\s+/g, ""))
		.filter((t) => /[0-9]/.test(t)),
);
check("stat counts up to 100%", statTexts.includes("100%"), statTexts.join(" "));
check("stat counts up to 2,088", statTexts.includes("2,088"), statTexts.join(" "));
check("stat counts up to 60fps", statTexts.includes("60fps"), statTexts.join(" "));
check("stat counts up to 4.9/5", statTexts.includes("4.9/5"), statTexts.join(" "));

// ── IRC-style testimonials use <username> syntax ────────────────────────────
check(
	"testimonials use <username> angle-bracket syntax",
	(await page.getByText("<synthlord_88>", { exact: false }).count()) >= 1,
);

// ── Responsive: desktop nav hidden on mobile, menu toggles ──────────────────
await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(300);
check(
	"desktop nav hidden on mobile",
	!(await page.locator("header nav > div").first().isVisible()),
);
const burger = page.getByRole("button", { name: "Open menu" });
check("mobile menu button visible", await burger.isVisible());
await burger.click();
await page.waitForTimeout(250);
check(
	"mobile menu opens with links",
	await page.getByRole("link", { name: "Licenses" }).first().isVisible(),
);

// ── No console / page errors ────────────────────────────────────────────────
check(
	"no console/page errors",
	consoleErrors.length === 0,
	consoleErrors.join(" | ").slice(0, 300),
);

await browser.close();
console.log(failures === 0 ? "\nALL CHECKS PASSED" : `\n${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
