/* Headless CLI verification for SCHEMATIC (Industrial Skeuomorphism showcase).
 *
 * Asserts the design-system contract programmatically:
 *   - Neumorphic dual-shadows ARE present (the core visual signature)
 *   - Inter + JetBrains Mono are self-hosted and rendered
 *   - Every section is present and the CSS "device" mockup renders
 *   - Signature elements exist: LEDs, corner screws, vent slots, push-pins,
 *     the connector pipe, scanlines, the radar sweep
 *   - Button press inverts the shadow; input focus lights an accent glow
 *   - FAQ accordion + mobile drawer toggle with correct ARIA
 *   - Accessibility: skip link, single h1, labelled controls, alt text
 *   - Responsive: pipe hidden on mobile, hamburger appears, desktop links hide
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
await page.waitForTimeout(1500); // let staggered reveals settle

// ── Title & shell ──────────────────────────────────────────────────────────
check(
	"page title mentions SCHEMATIC",
	(await page.title()).includes("SCHEMATIC"),
	await page.title(),
);
check(
	"brand wordmark present",
	(await page.getByText("SCHEMATIC", { exact: true }).count()) >= 1,
);

// ── Sections all present ────────────────────────────────────────────────────
for (const id of [
	"top",
	"features",
	"how",
	"showcase",
	"pricing",
	"testimonials",
	"faq",
	"cta",
]) {
	check(`section #${id} present`, (await page.locator(`#${id}`).count()) >= 1);
}

// ── THE CORE SIGNATURE: neumorphic dual shadows present ─────────────────────
const shadowStats = await page.evaluate(() => {
	let dual = 0; // shadows containing both a dark + light component
	let inset = 0;
	let total = 0;
	for (const el of Array.from(document.querySelectorAll("*"))) {
		const s = getComputedStyle(el).boxShadow;
		if (!s || s === "none") continue;
		total++;
		if (s.includes("inset")) inset++;
		// rough heuristic: a neumorphic pair lists two rgb() shadows
		if ((s.match(/rgb/g) || []).length >= 2) dual++;
	}
	return { dual, inset, total };
});
check(
	"neumorphic dual-shadows present",
	shadowStats.dual >= 10,
	`${shadowStats.dual} dual-shadow elements`,
);
check(
	"inset (recessed/pressed) shadows present",
	shadowStats.inset >= 3,
	`${shadowStats.inset} inset elements`,
);

// ── Typography: self-hosted fonts loaded + applied ──────────────────────────
const fonts = await page.evaluate(async () => {
	await document.fonts.ready;
	const loaded = [...document.fonts].map((f) => `${f.family}:${f.weight}`);
	const bodyFont = getComputedStyle(document.body).fontFamily;
	const monoEl = document.querySelector(".stamp, [class*='font-mono']");
	const monoFont = monoEl ? getComputedStyle(monoEl).fontFamily : "";
	return { loaded, bodyFont, monoFont };
});
check(
	"Inter is loaded (self-hosted)",
	fonts.loaded.some((f) => f.startsWith("Inter")),
	fonts.loaded.length + " faces",
);
check(
	"JetBrains Mono is loaded",
	fonts.loaded.some((f) => f.includes("JetBrains")),
);
check("body renders in Inter", /Inter/.test(fonts.bodyFont), fonts.bodyFont);
check(
	"mono labels render in JetBrains Mono",
	/JetBrains Mono/.test(fonts.monoFont),
	fonts.monoFont,
);

// ── All vendored assets return 200 (offline-capable) ────────────────────────
const assets = [
	"/assets/noise.svg",
	"/assets/carbon-fibre.png",
	"/assets/blueprint-unit.svg",
	"/assets/avatar-op-01.svg",
	"/fonts/inter-700.woff2",
	"/fonts/jetbrains-mono-400.woff2",
	"/favicon.svg",
];
for (const a of assets) {
	const res = await page.request.get(BASE_URL + a);
	check(`asset ${a} -> 200`, res.status() === 200, String(res.status()));
}

// ── Signature manufacturing details ─────────────────────────────────────────
check(
	"corner screws applied (.screws)",
	(await page.locator(".screws").count()) >= 3,
	`${await page.locator(".screws").count()} panels`,
);
check(
	"vent slots present",
	(await page.evaluate(() => {
		// vent groups have aria-hidden + three 24px pill children
		return Array.from(document.querySelectorAll("[aria-hidden='true']")).filter(
			(n) =>
				n.querySelectorAll("span.h-6.w-1").length === 3 ||
				n.querySelectorAll(".h-6.w-1").length === 3,
		).length;
	})) >= 1,
);
check(
	"scanline overlay present (.scanlines)",
	(await page.locator(".scanlines").count()) >= 1,
);
check(
	"carbon-fibre texture used (.carbon)",
	(await page.locator(".carbon").count()) >= 1,
);
check(
	"blueprint grid used",
	(await page.locator(".blueprint-grid").count()) >= 1,
);
check(
	"radar sweep present (.animate-radar)",
	(await page.locator(".animate-radar").count()) >= 1,
);
check(
	"connector pipe present (desktop)",
	await page
		.locator("#how [aria-hidden='true'] .h-3.w-full")
		.first()
		.isVisible(),
);

// LEDs: glowing status dots — small, pill-rounded, accent/green bloom shadow.
// (rounded-full computes to a very large px radius, not the literal 9999px.)
const ledCount = await page.evaluate(
	() =>
		Array.from(document.querySelectorAll("span")).filter((el) => {
			const s = getComputedStyle(el);
			const radius = parseFloat(s.borderRadius) || 0;
			const w = parseFloat(s.width) || 0;
			return (
				/rgba?\(\s*(255,\s*71,\s*87|34,\s*197,\s*94)/.test(s.boxShadow) &&
				radius >= 9999 &&
				w <= 16
			);
		}).length,
);
check("glowing LED indicators present", ledCount >= 5, `${ledCount} LEDs`);

// ── The hero CSS "device" mockup ────────────────────────────────────────────
const device = page.locator('[role="img"][aria-label*="SX-1"]').first();
check("hero device mockup present", (await device.count()) === 1);
check(
	"device has telemetry screen text",
	(await page.getByText("TELEMETRY").count()) >= 1,
);
check(
	"device power LED label present",
	(await page.getByText("PWR", { exact: true }).count()) >= 1,
);

// ── Buttons: tactile press inverts shadow ───────────────────────────────────
const primary = page.getByRole("button", { name: /Provision a Unit/i }).first();
check("primary CTA button present", (await primary.count()) === 1);
{
	const before = await primary.evaluate((el) => getComputedStyle(el).boxShadow);
	await primary.dispatchEvent("pointerdown");
	await page.waitForTimeout(80);
	const during = await primary.evaluate((el) => getComputedStyle(el).boxShadow);
	await primary.dispatchEvent("pointerup");
	check(
		"button press inverts to inset shadow",
		during.includes("inset") && during !== before,
		"shadow changed on press",
	);
}

// ── Input: focus lights an accent glow ──────────────────────────────────────
const input = page.locator("#cta-email");
await input.scrollIntoViewIfNeeded();
const inputRest = await input.evaluate((el) => getComputedStyle(el).boxShadow);
await input.focus();
await page.waitForTimeout(120);
const inputFocus = await input.evaluate((el) => getComputedStyle(el).boxShadow);
check("input is recessed at rest", inputRest.includes("inset"));
check(
	"input focus adds accent glow",
	inputFocus.includes("255, 71, 87") && inputFocus !== inputRest,
);
check(
	"CTA email input is labelled",
	await page.evaluate(() => {
		const el = document.querySelector("#cta-email");
		if (!el) return false;
		const lbl = document.querySelector('label[for="cta-email"]');
		return !!lbl || !!el.getAttribute("aria-label");
	}),
);
await input.blur();

// ── CTA form submit flips to confirmation (replaces the input node) ─────────
await input.fill("engineer@plant.io");
await page.getByRole("button", { name: /^Deploy$/i }).click();
await page.waitForTimeout(200);
check(
	"CTA submit shows confirmation",
	(await page.getByText(/provisioning link sent/i).count()) >= 1,
);

// ── FAQ accordion ───────────────────────────────────────────────────────────
const faqBtns = page.locator("#faq button[aria-expanded]");
check("FAQ has accordion buttons", (await faqBtns.count()) >= 4);
const firstFaq = faqBtns.nth(0);
const wasOpen = (await firstFaq.getAttribute("aria-expanded")) === "true";
await firstFaq.click();
await page.waitForTimeout(350);
const nowOpen = (await firstFaq.getAttribute("aria-expanded")) === "true";
check("FAQ toggles aria-expanded", nowOpen !== wasOpen);

// ── Accessibility basics ────────────────────────────────────────────────────
check(
	"exactly one <h1>",
	(await page.locator("h1").count()) === 1,
	`${await page.locator("h1").count()} found`,
);
check(
	"skip link present",
	(await page.getByRole("link", { name: /skip to content/i }).count()) >= 1,
);
check(
	"all images have alt text",
	await page.evaluate(() =>
		Array.from(document.images).every((i) => i.alt && i.alt.trim().length > 0),
	),
);

// ── Responsive ──────────────────────────────────────────────────────────────
await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(400);
// The toggle's accessible name flips open<->close, so target it by aria-controls.
const hamburger = page.locator('button[aria-controls="mobile-drawer"]');
check("mobile hamburger appears", await hamburger.isVisible());
check(
	"desktop nav links hidden on mobile",
	await page.evaluate(() => {
		const ul = document.querySelector('nav[aria-label="Primary"] ul');
		return ul ? getComputedStyle(ul).display === "none" : true;
	}),
);
await hamburger.click();
await page.waitForTimeout(300);
check(
	"mobile drawer opens",
	(await page.locator("#mobile-drawer").count()) >= 1 &&
		(await hamburger.getAttribute("aria-expanded")) === "true",
);
check(
	"connector pipe hidden on mobile",
	await page.evaluate(() => {
		const pipe = document.querySelector(
			"#how [aria-hidden='true'] .h-3.w-full",
		);
		if (!pipe) return true;
		// the pipe's wrapper is `hidden md:block`
		const wrap = pipe.closest("[aria-hidden='true']");
		return wrap ? getComputedStyle(wrap).display === "none" : true;
	}),
);

// ── No runtime errors ───────────────────────────────────────────────────────
check(
	"no console/page errors",
	consoleErrors.length === 0,
	consoleErrors.slice(0, 3).join(" | "),
);

await browser.close();
console.log(
	`\n${failures === 0 ? "ALL CHECKS PASSED" : failures + " CHECK(S) FAILED"}`,
);
process.exit(failures === 0 ? 0 : 1);
