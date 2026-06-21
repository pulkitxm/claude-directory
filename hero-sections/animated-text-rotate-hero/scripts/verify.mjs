// Headless verification of the integrated hero. Boots nothing itself — expects
// a dev/preview server already running at VERIFY_URL (default :5188).
import { chromium } from "playwright";

const URL = process.env.VERIFY_URL || "http://localhost:5188/";
const titles = ["amazing", "new", "wonderful", "beautiful", "smart"];

const fail = (msg) => {
	console.error("FAIL:", msg);
	process.exitCode = 1;
};
const ok = (msg) => console.log("PASS:", msg);

const browser = await chromium.launch(
	process.env.CHROME_BIN ? { executablePath: process.env.CHROME_BIN } : {},
);
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

// Track external network requests — the project must run fully offline.
const external = [];
page.on("request", (req) => {
	const u = req.url();
	if (!u.startsWith(URL) && !u.startsWith("data:") && !u.startsWith("blob:")) {
		external.push(u);
	}
});

const consoleErrors = [];
page.on("console", (m) => {
	if (m.type() === "error") consoleErrors.push(m.text());
});
page.on("pageerror", (e) => consoleErrors.push(String(e)));

await page.goto(URL, { waitUntil: "networkidle" });

// 1) Headline static span present.
const headline = await page.locator("h1").first().innerText();
if (headline.includes("This is something")) ok("headline renders");
else fail(`headline missing, got: ${JSON.stringify(headline)}`);

// 2) All five rotating words exist in the DOM.
for (const t of titles) {
	const n = await page.locator(`h1 span:has-text("${t}")`).count();
	if (n >= 1) ok(`rotating word present: ${t}`);
	else fail(`rotating word missing: ${t}`);
}

// 3) The visible (opacity ~1) rotating word changes over ~2.5s (animation runs).
const visibleWord = async () => {
	const spans = page.locator("h1 .absolute");
	const count = await spans.count();
	for (let i = 0; i < count; i++) {
		const op = await spans
			.nth(i)
			.evaluate((el) => parseFloat(getComputedStyle(el).opacity));
		if (op > 0.6) return (await spans.nth(i).innerText()).trim();
	}
	return null;
};
const first = await visibleWord();
await page.waitForTimeout(2600);
const second = await visibleWord();
if (first && second && first !== second)
	ok(`word rotated: "${first}" -> "${second}"`);
else fail(`word did not rotate (first=${first}, second=${second})`);

// 4) The four CTA buttons from the component + nav CTAs are present.
const btnLabels = ["Read our launch article", "Jump on a call", "Sign up here"];
for (const label of btnLabels) {
	const n = await page
		.getByRole("button", { name: new RegExp(label, "i") })
		.count();
	if (n >= 1) ok(`button present: ${label}`);
	else fail(`button missing: ${label}`);
}

// 5) Local fonts actually applied (Space Grotesk on the headline).
const family = await page
	.locator("h1")
	.first()
	.evaluate((el) => getComputedStyle(el).fontFamily);
if (/Space Grotesk/i.test(family)) ok(`display font applied: ${family}`);
else fail(`display font not applied: ${family}`);

// 6) Theme toggle flips the `.dark` class on <html> (both directions).
const isDark = () =>
	page.evaluate(() => document.documentElement.classList.contains("dark"));
const toggle = page.getByRole("button", { name: /switch to .* mode/i });
const before = await isDark();
await toggle.click();
await page.waitForTimeout(150);
const afterOne = await isDark();
await toggle.click();
await page.waitForTimeout(150);
const afterTwo = await isDark();
if (afterOne === !before && afterTwo === before)
	ok(`theme toggle flips both ways (start dark=${before})`);
else
	fail(
		`theme toggle broken (start=${before}, click1=${afterOne}, click2=${afterTwo})`,
	);

// 7) Ticker marquee present.
const tickN = await page.locator(".animate-ticker").count();
if (tickN >= 1) ok("trade ticker present");
else fail("trade ticker missing");

// 8) No external requests, no console errors.
if (external.length === 0) ok("no external network requests (offline-safe)");
else fail(`external requests detected:\n  ${external.join("\n  ")}`);

if (consoleErrors.length === 0) ok("no console/page errors");
else fail(`console errors:\n  ${consoleErrors.join("\n  ")}`);

await browser.close();
console.log(
	process.exitCode
		? "\n=== VERIFICATION FAILED ==="
		: "\n=== ALL CHECKS PASSED ===",
);
