import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "../../../../scripts/record-demos/node_modules/playwright/index.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));
const origin =
	process.argv[2] ??
	"http://127.0.0.1:4348/templates/premium/lexingtonthemes/buio";
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
	await page.locator("#menu-toggle").click();
	const menu = page.locator("#mobile-menu");
	const opened = await menu.evaluate((element) => element.classList.contains("open"));
	await page.locator("#menu-toggle").click();
	const closed = await menu.evaluate((element) => !element.classList.contains("open"));
	return opened && closed;
});

await check("search modal", "/pricing.html", { width: 1280, height: 800 }, async (page) => {
	await page.locator("#searchBtn").click();
	const modal = page.locator("#searchModal");
	const opened = await modal.evaluate((element) => element.classList.contains("open"));
	await page.keyboard.press("Escape");
	const closed = await modal.evaluate((element) => !element.classList.contains("open"));
	return opened && closed;
});

await check("annual pricing", "/pricing.html", { width: 1280, height: 800 }, async (page) => {
	const price = page.locator(".pricing-price").nth(1);
	const before = await price.textContent();
	await page.locator("#billingToggle").click();
	const after = await price.textContent();
	return before !== after && (await page.locator("#billingToggle").evaluate((element) => element.classList.contains("annual")));
});

await check("integration filter", "/integrations.html", { width: 1280, height: 800 }, async (page) => {
	const before = await page.locator(".integration-card:visible").count();
	await page.locator('button[onclick*="payment"]').click();
	const after = await page.locator(".integration-card:visible").count();
	return after > 0 && after < before;
});

await check("sign in fields", "/sign-in.html", { width: 390, height: 800 }, async (page) => {
	await page.locator('input[type="email"]').fill("demo@example.com");
	await page.locator('input[type="password"]').fill("example-password");
	return (
		(await page.locator('input[type="email"]').inputValue()) === "demo@example.com" &&
		(await page.locator('input[type="password"]').inputValue()) === "example-password"
	);
});

await check("scroll animation", "/", { width: 1280, height: 800 }, async (page) => {
	return (await page.locator("[data-aos].aos-init").count()) > 0;
});

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
