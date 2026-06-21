/* Headless CLI verification for Flatline (flat design system showcase).
 *
 * Asserts the design-system contract programmatically:
 *   - No box-shadows on ANY element (the cardinal rule)
 *   - Outfit (self-hosted) is the rendered font
 *   - Every section / color block is present
 *   - Button, card, input and focus-ring behaviours
 *   - Responsive: mobile menu toggles, nav links hidden on mobile
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
await page.waitForTimeout(1500); // let reveal animations settle

// ── Title & shell ──────────────────────────────────────────────────────────
check(
	"page title",
	(await page.title()).includes("Flatline"),
	await page.title(),
);
check(
	"brand wordmark present",
	(await page.getByText("Flatline", { exact: true }).count()) >= 1,
);

// ── THE CARDINAL RULE: no box-shadows anywhere ──────────────────────────────
const shadowReport = await page.evaluate(() => {
	const offenders = [];
	for (const el of Array.from(document.querySelectorAll("*"))) {
		const s = getComputedStyle(el);
		// focus rings are implemented via box-shadow only on :focus-visible, which
		// is never active during this static sweep — so any shadow here is a real
		// element shadow and a violation.
		if (s.boxShadow && s.boxShadow !== "none") {
			offenders.push(
				el.tagName + "." + (el.className || "").toString().slice(0, 40),
			);
		}
		if (s.textShadow && s.textShadow !== "none") {
			offenders.push("TEXT:" + el.tagName);
		}
	}
	return offenders;
});
check(
	"no box/text shadows on any element",
	shadowReport.length === 0,
	shadowReport.slice(0, 5).join(" | "),
);

// ── Self-hosted Outfit font is actually rendering ──────────────────────────
const bodyFont = await page.evaluate(
	() => getComputedStyle(document.body).fontFamily,
);
check("Outfit font on body", bodyFont.includes("Outfit"), bodyFont);
const fontLoaded = await page.evaluate(async () => {
	await document.fonts.ready;
	return document.fonts.check('700 16px "Outfit"');
});
check("Outfit 700 face loaded", fontLoaded === true);

// ── Tokens resolved to the exact palette ───────────────────────────────────
const tokens = await page.evaluate(() => {
	const cs = getComputedStyle(document.documentElement);
	return {
		brand: cs.getPropertyValue("--color-brand").trim(),
		grass: cs.getPropertyValue("--color-grass").trim(),
		sun: cs.getPropertyValue("--color-sun").trim(),
		ink: cs.getPropertyValue("--color-ink").trim(),
	};
});
check(
	"--color-brand = #3b82f6",
	tokens.brand.toLowerCase() === "#3b82f6",
	tokens.brand,
);
check(
	"--color-grass = #10b981",
	tokens.grass.toLowerCase() === "#10b981",
	tokens.grass,
);
check(
	"--color-sun = #f59e0b",
	tokens.sun.toLowerCase() === "#f59e0b",
	tokens.sun,
);
check(
	"--color-ink = #111827",
	tokens.ink.toLowerCase() === "#111827",
	tokens.ink,
);

// ── Hero is a vibrant blue color block ─────────────────────────────────────
const heroBg = await page.evaluate(() => {
	const el = document.querySelector("#top");
	return el ? getComputedStyle(el).backgroundColor : "";
});
check("hero is Blue 500 block", heroBg === "rgb(59, 130, 246)", heroBg);
for (const t of [
	"Design with",
	"zero artifice.",
	"Start building",
	"Explore the system",
]) {
	check(
		`hero text "${t}"`,
		(await page.getByText(t, { exact: false }).count()) >= 1,
	);
}

// ── All major sections / anchors present ───────────────────────────────────
for (const id of ["top", "features", "how", "pricing", "faq"]) {
	check(`section #${id} present`, (await page.locator(`#${id}`).count()) === 1);
}

// Color rotation: emerald benefits, dark how-it-works, amber CTA, dark footer
const sectionColors = await page.evaluate(() => {
	const grab = (sel) => {
		const el = document.querySelector(sel);
		return el ? getComputedStyle(el).backgroundColor : "";
	};
	return {
		benefits: grab("section:has(> .shell .eyebrow)"), // not reliable; checked below
		how: grab("#how"),
		footer: grab("footer"),
	};
});
check(
	"how-it-works is dark (Gray 900)",
	sectionColors.how === "rgb(17, 24, 39)",
	sectionColors.how,
);
check(
	"footer is dark (Gray 900)",
	sectionColors.footer === "rgb(17, 24, 39)",
	sectionColors.footer,
);

// Emerald + Amber blocks exist somewhere on the page
const blockColorsExist = await page.evaluate(() => {
	const wanted = { emerald: "rgb(16, 185, 129)", amber: "rgb(245, 158, 11)" };
	const found = { emerald: false, amber: false };
	for (const el of Array.from(document.querySelectorAll("section"))) {
		const bg = getComputedStyle(el).backgroundColor;
		if (bg === wanted.emerald) found.emerald = true;
		if (bg === wanted.amber) found.amber = true;
	}
	return found;
});
check("emerald benefits color block exists", blockColorsExist.emerald);
check("amber CTA color block exists", blockColorsExist.amber);

// ── Buttons: primary uses brand bg + rounded-md, no shadow ─────────────────
const primaryBtn = page.getByRole("link", { name: "Start building" }).first();
const btnStyle = await primaryBtn.evaluate((el) => {
	const s = getComputedStyle(el);
	return { radius: s.borderTopLeftRadius, shadow: s.boxShadow, h: s.height };
});
check(
	"hero CTA radius is rounded-md (6px)",
	btnStyle.radius === "6px",
	btnStyle.radius,
);
check("hero CTA has no shadow", btnStyle.shadow === "none", btnStyle.shadow);

// Outline button uses a thick (4px) border per the spec
const outlineBorder = await page.evaluate(() => {
	const el = Array.from(document.querySelectorAll("a,button")).find((e) =>
		e.className.includes("btn-outline"),
	);
	return el ? getComputedStyle(el).borderTopWidth : "";
});
check(
	"outline button uses thick border-4",
	outlineBorder === "4px",
	outlineBorder,
);

// ── Feature cards: tinted bg, rounded-lg, no shadow ────────────────────────
const featureCard = page.locator("#features article").first();
const cardStyle = await featureCard.evaluate((el) => {
	const s = getComputedStyle(el);
	return {
		radius: s.borderTopLeftRadius,
		shadow: s.boxShadow,
		bg: s.backgroundColor,
	};
});
check(
	"feature card radius rounded-lg (8px)",
	cardStyle.radius === "8px",
	cardStyle.radius,
);
check(
	"feature card has no shadow",
	cardStyle.shadow === "none",
	cardStyle.shadow,
);
check(
	"feature cards count = 6",
	(await page.locator("#features article").count()) === 6,
);

// ── Input field: gray block → hard blue border on focus, no glow ───────────
const field = page.locator("#cta-email");
const restBorder = await field.evaluate(
	(el) => getComputedStyle(el).borderColor,
);
await field.focus();
await page.waitForTimeout(250);
const focusState = await field.evaluate((el) => {
	const s = getComputedStyle(el);
	return {
		border: s.borderColor,
		width: s.borderTopWidth,
		bg: s.backgroundColor,
	};
});
check(
	"input border transparent at rest",
	restBorder.includes("rgba(0, 0, 0, 0)") || restBorder === "rgba(0, 0, 0, 0)",
	restBorder,
);
check(
	"input focus = solid blue 2px border",
	focusState.border === "rgb(59, 130, 246)" && focusState.width === "2px",
	`${focusState.border} ${focusState.width}`,
);
check(
	"input focus bg turns white",
	focusState.bg === "rgb(255, 255, 255)",
	focusState.bg,
);

// ── Focus ring is a solid high-contrast outline (box-shadow on focus only) ─
// The .field uses a hard border on focus; nav links get a solid box-shadow ring.
const navLink = page.locator("header nav a").first();
await navLink.focus();
await page.waitForTimeout(150);
const linkRing = await navLink.evaluate((el) => getComputedStyle(el).boxShadow);
check(
	"focus-visible adds a solid ring",
	linkRing !== "none",
	linkRing.slice(0, 40),
);

// ── Pricing: popular tier rests larger (scaled) ────────────────────────────
const popular = page.locator("#pricing").getByText("Most popular").first();
check("pricing popular badge present", (await popular.count()) === 1);
const scaleInfo = await page.evaluate(() => {
	// the popular card rests larger via lg:scale-105. Tailwind v4 emits the
	// standalone `scale` property (transform stays `none`).
	const badge = Array.from(document.querySelectorAll("#pricing *")).find(
		(e) => e.textContent?.trim() === "Most popular",
	);
	if (!badge) return null;
	const cs = getComputedStyle(badge.closest("div"));
	return { scale: cs.scale, transform: cs.transform };
});
const restsLarger =
	!!scaleInfo &&
	((scaleInfo.scale &&
		scaleInfo.scale !== "none" &&
		parseFloat(scaleInfo.scale) > 1) ||
		(scaleInfo.transform && scaleInfo.transform !== "none"));
check(
	"popular pricing card rests larger (scale > 1)",
	restsLarger,
	JSON.stringify(scaleInfo),
);

// ── FAQ: thick border-2 between items + accordion toggles ──────────────────
const faqItemBorder = await page.evaluate(() => {
	const btn = Array.from(document.querySelectorAll("#faq button")).find((b) =>
		b.textContent?.includes("Is this really shadow-free?"),
	);
	const item = btn?.closest("div");
	return item ? getComputedStyle(item).borderBottomWidth : "";
});
check(
	"FAQ items use thick border-2 (2px)",
	faqItemBorder === "2px",
	faqItemBorder,
);

const faqBtn = page.getByRole("button", { name: /What stack does it target/ });
check(
	"FAQ answer hidden before click",
	(await page
		.getByText("Flatline is built on React", { exact: false })
		.count()) === 0 ||
		!(await page
			.getByText("Flatline is built on React", { exact: false })
			.first()
			.isVisible()),
);
await faqBtn.click();
await page.waitForTimeout(400);
check(
	"FAQ answer reveals on click",
	await page
		.getByText("Flatline is built on React", { exact: false })
		.first()
		.isVisible(),
);

// ── CTA form: typing + submit shows confirmation ───────────────────────────
await page.locator("#cta-email").fill("designer@studio.com");
await page.getByRole("button", { name: "Get access" }).click();
await page.waitForTimeout(300);
check(
	"CTA submit shows confirmation",
	(await page
		.getByText("You're in. Watch your inbox.", { exact: false })
		.count()) === 1,
);

// ── Stat count-ups reached their targets ───────────────────────────────────
check(
	"stat 100% rendered",
	(await page.getByText("100%", { exact: false }).count()) >= 1,
);
check(
	"stat 4.9/5 rendered",
	(await page.getByText("4.9/5", { exact: false }).count()) >= 1,
);

// ── Responsive: desktop nav hidden on mobile, menu toggles ─────────────────
await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(300);
check(
	"desktop nav hidden on mobile",
	!(await page.locator("header nav").first().isVisible()),
);
const burger = page.getByRole("button", { name: "Open menu" });
check("mobile menu button visible", await burger.isVisible());
await burger.click();
await page.waitForTimeout(250);
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
