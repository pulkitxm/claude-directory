import fs from "node:fs";
import path from "node:path";
import { chromium } from "../../../../scripts/record-demos/node_modules/playwright/index.mjs";

const root = process.env.STREAMLINE_URL ?? "http://127.0.0.1:4173/templates/premium/shadcnblocks/streamline";
const output = new URL("./.audit/verification/", import.meta.url);
const routes = [
	"index",
	"about",
	"contact",
	"customer-stories",
	"faq",
	"get-started",
	"login",
	"pricing",
	"privacy",
	"signup",
	"terms",
	"404",
];
const viewports = [
	["mobile", 390, 844],
	["tablet", 768, 1024],
	["desktop", 1280, 900],
];
const minimumWords = {
	index: 250,
	about: 150,
	contact: 40,
	"customer-stories": 8,
	faq: 75,
	"get-started": 8,
	login: 15,
	pricing: 150,
	privacy: 2300,
	signup: 15,
	terms: 1550,
	404: 8,
};

fs.mkdirSync(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const results = [];

for (const route of routes) {
	for (const [name, width, height] of viewports) {
		const page = await browser.newPage({ viewport: { width, height } });
		const errors = [];
		page.on("console", (message) => {
			if (message.type() === "error") errors.push(`console: ${message.text()}`);
		});
		page.on("pageerror", (error) => errors.push(`page: ${error.message}`));
		page.on("requestfailed", (request) =>
			errors.push(`request: ${request.url()} ${request.failure()?.errorText ?? "failed"}`),
		);
		const response = await page.goto(`${root}/${route}.html`, {
			waitUntil: "networkidle",
		});
		await page.waitForTimeout(500);
		const metrics = await page.evaluate(() => {
			const main = document.querySelector("main");
			const visibleText = Array.from(document.querySelectorAll("main h1, main h2, main p"))
				.filter((element) => {
					const style = getComputedStyle(element);
					const box = element.getBoundingClientRect();
					return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) > 0 && box.width > 0 && box.height > 0;
				})
				.map((element) => element.textContent.trim())
				.filter(Boolean);
			return {
				documentWidth: document.documentElement.scrollWidth,
				viewportWidth: document.documentElement.clientWidth,
				mainHeight: Math.round(main?.getBoundingClientRect().height ?? 0),
				visibleText: visibleText.length,
				mainTextWords: (main?.innerText ?? "").trim().split(/\s+/).filter(Boolean).length,
			};
		});
		await page.screenshot({
			path: path.join(output.pathname, `${route}-${name}.png`),
			fullPage: true,
		});
		results.push({
			route,
			viewport: name,
			status: response?.status(),
			...metrics,
			errors,
		});
		await page.close();
	}
}

const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto(`${root}/index.html`, { waitUntil: "networkidle" });
await page.locator("#product-dd > button").click();
const dropdown = await page.locator("#product-dd").evaluate((element) => element.classList.contains("open"));
await page.locator(".theme-toggle").click();
const dark = await page.locator("html").evaluate((element) => element.classList.contains("dark"));
await page.reload({ waitUntil: "networkidle" });
const persistedDark = await page.locator("html").evaluate((element) => element.classList.contains("dark"));
await page.locator("#announce-x").click();
const announcement = await page.locator("#announce").evaluate((element) => element.classList.contains("hidden"));
	const testimonialBefore = await page.locator(".testi-track").evaluate((element) => getComputedStyle(element).transform);
	await page.locator(".testi-carousel [data-next]").click();
	await page.waitForTimeout(500);
	const testimonialAfter = await page.locator(".testi-track").evaluate((element) => getComputedStyle(element).transform);
	await page.locator(".feat-tab").nth(1).click();
	const activeTab = await page.locator(".feat-tab.active").count();
const featureAsset = await page.locator(".feat-preview img").getAttribute("src");
await page.locator(".acc-trigger").first().click();
const accordion = await page.locator(".acc-item").first().evaluate((element) => element.classList.contains("open"));
await page.setViewportSize({ width: 390, height: 844 });
await page.locator("#menu-toggle").click();
const mobileSheet = await page.locator("#mobile-sheet").evaluate((element) => element.classList.contains("open"));
	results.push({ interactions: { dropdown, dark, persistedDark, announcement, testimonialMoved: testimonialBefore !== testimonialAfter, activeTab, featureAsset: featureAsset?.endsWith("/2.webp"), accordion, mobileSheet } });

await browser.close();
fs.writeFileSync(new URL("results.json", output), `${JSON.stringify(results, null, 2)}\n`);

const failures = results.filter((result) =>
	result.route &&
	(result.status !== 200 || result.documentWidth > result.viewportWidth + 1 || result.mainHeight < 100 || result.visibleText < 1 || result.mainTextWords < minimumWords[result.route] || result.errors.length > 0),
);
const interaction = results.at(-1).interactions;
const interactionFailures = Object.entries(interaction).filter(([, value]) => !value);

if (failures.length || interactionFailures.length) {
	console.error(JSON.stringify({ failures, interactionFailures }, null, 2));
	process.exit(1);
}

console.log(`Verified ${routes.length} routes across ${viewports.length} breakpoints and shared interactions.`);
