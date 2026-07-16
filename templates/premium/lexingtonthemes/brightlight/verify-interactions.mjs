import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "../../../../scripts/record-demos/node_modules/playwright/index.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));
const origin =
	process.argv[2] ??
	"http://127.0.0.1:4347/templates/premium/lexingtonthemes/brightlight";
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
	await page.locator("#hamburger-btn").click();
	const nav = page.locator("#mobile-nav");
	const opened = await nav.evaluate((element) => element.classList.contains("open"));
	await page.locator("#mobile-nav-close").click();
	const closed = await nav.evaluate((element) => !element.classList.contains("open"));
	return opened && closed;
});

await check("annual pricing", "/", { width: 1280, height: 800 }, async (page) => {
	const amount = page.locator(".pricing-amount").first();
	const before = await amount.textContent();
	await page.locator("#annual-btn").click();
	const after = await amount.textContent();
	return before !== after && (await page.locator("#annual-btn").getAttribute("aria-pressed")) === "true";
});

await check("SDK switcher", "/", { width: 1280, height: 800 }, async (page) => {
	const target = page.locator('.sdk-icon[data-lang="python"]');
	await target.click();
	return await page.locator("#code-python").isVisible();
});

await check("sign in fields", "/sign-in.html", { width: 390, height: 800 }, async (page) => {
	await page.locator('input[type="email"]').fill("demo@example.com");
	await page.locator('input[type="password"]').fill("example-password");
	return (
		(await page.locator('input[type="email"]').inputValue()) === "demo@example.com" &&
		(await page.locator('input[type="password"]').inputValue()) === "example-password"
	);
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
