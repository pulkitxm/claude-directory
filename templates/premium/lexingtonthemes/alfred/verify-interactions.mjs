import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "../../../../scripts/record-demos/node_modules/playwright/index.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));
const origin = process.argv[2] ?? "http://127.0.0.1:4332/templates/premium/lexingtonthemes/alfred";
const browser = await chromium.launch();
const results = [];

async function check(interaction, route, viewport, action) {
	const page = await browser.newPage({ viewport });
	await page.goto(`${origin}${route}`, { waitUntil: "domcontentloaded" });
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
	await page.locator("#navToggle").evaluate((element) => element.click());
	return await page
		.locator("#navMenu")
		.evaluate((element) => element.classList.contains("open"));
});
await check(
	"overview dropdown",
	"/",
	{ width: 1280, height: 800 },
	async (page) => {
		await page
			.locator('[data-menu-button="menu-overview"]')
			.evaluate((element) => element.click());
		return await page
			.locator("#menu-overview")
			.evaluate((element) => element.classList.contains("open"));
	},
);
await check(
	"injected mobile menu",
	"/pricing.html",
	{ width: 390, height: 800 },
	async (page) => {
		await page.locator("#navToggle").evaluate((element) => element.click());
		return await page
			.locator("#navMenu")
			.evaluate((element) => element.classList.contains("open"));
	},
);
await check(
	"demo form local submission",
	"/bookdemo.html",
	{ width: 1280, height: 800 },
	async (page) => {
		const url = page.url();
		await page.locator("form").first().evaluate((element) =>
			element.dispatchEvent(
				new Event("submit", { bubbles: true, cancelable: true }),
			),
		);
		await page.waitForTimeout(100);
		return page.url() === url;
	},
);
await check(
	"sign-in form local submission",
	"/signin.html",
	{ width: 1280, height: 800 },
	async (page) => {
		const url = page.url();
		await page.locator("form").first().evaluate((element) =>
			element.dispatchEvent(
				new Event("submit", { bubbles: true, cancelable: true }),
			),
		);
		await page.waitForTimeout(100);
		return page.url() === url;
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
	`${JSON.stringify({ summary, results }, null, 2)}\n`,
);
console.log(`Verified ${summary.passed} of ${summary.tested} interactions`);
if (summary.passed !== summary.tested) process.exitCode = 1;
