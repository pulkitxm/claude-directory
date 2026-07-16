import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "../../../../scripts/record-demos/node_modules/playwright/index.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));
const origin =
	process.argv[2] ??
	"http://127.0.0.1:4334/templates/premium/lexingtonthemes/astromaxsp";
const browser = await chromium.launch();
const results = [];

async function check(interaction, route, viewport, action) {
	const page = await browser.newPage({ viewport });
	await page.goto(`${origin}${route}`, { waitUntil: "networkidle" });
	let passed = false;
	try {
		passed = await action(page);
	} catch {
		passed = false;
	}
	results.push({ interaction, passed });
	await page.close();
}

await check("mobile menu", "/", { width: 390, height: 800 }, async (page) => {
	await page.locator("#menu-toggle").evaluate((element) => element.click());
	return await page
		.locator("#mobile-menu")
		.evaluate((element) => element.classList.contains("open"));
});
await check(
	"carousel next",
	"/",
	{ width: 1280, height: 800 },
	async (page) => {
		const slide = page.locator("#keen-slider .keen-slider__slide").first();
		const before = await slide.evaluate((element) => element.style.transform);
		await page
			.locator("#keen-slider-next")
			.evaluate((element) => element.click());
		await page.waitForTimeout(500);
		const after = await slide.evaluate((element) => element.style.transform);
		return before !== after;
	},
);
await check(
	"search overlay",
	"/",
	{ width: 1280, height: 800 },
	async (page) => {
		await page.locator("#searchButton").evaluate((element) => element.click());
		return await page
			.locator("#searchModal")
			.evaluate((element) => element.classList.contains("open"));
	},
);
await check(
	"search results",
	"/",
	{ width: 1280, height: 800 },
	async (page) => {
		await page.locator("#searchButton").evaluate((element) => element.click());
		await page.locator("#searchInput").fill("Work");
		return (
			(await page.locator("#searchResults .search-result-item").count()) > 0
		);
	},
);

await browser.close();
const summary = {
	tested: results.length,
	passed: results.filter((result) => result.passed).length,
};
fs.mkdirSync(path.join(root, ".audit"), { recursive: true });
fs.writeFileSync(
	path.join(root, ".audit/interaction-verification.json"),
	`${JSON.stringify({ summary, results }, null, "\t")}\n`,
);
console.log(`Verified ${summary.passed} of ${summary.tested} interactions`);
if (summary.passed !== summary.tested) process.exitCode = 1;
