import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "../../../../scripts/record-demos/node_modules/playwright/index.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));
const origin =
	process.argv[2] ??
	"http://127.0.0.1:4350/templates/premium/lexingtonthemes/carriera";
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
	await page.locator("#navToggle").click();
	const menu = page.locator("#mobileMenu");
	const opened = !(await menu.evaluate((element) => element.classList.contains("hidden")));
	await page.locator("[data-close-nav]").first().click();
	const closed = await menu.evaluate((element) => element.classList.contains("hidden"));
	return opened && closed;
});

await check("search and keyboard", "/", { width: 1280, height: 800 }, async (page) => {
	await page.waitForLoadState("load");
	await page.locator("#searchButton").click();
	const modal = page.locator("#searchModal");
	const opened = !(await modal.evaluate((element) => element.classList.contains("hidden")));
	await page.locator("#searchInput").fill("designer");
	const resultCount = await page.locator("#searchResults a").count();
	await page.keyboard.press("Escape");
	const closed = await modal.evaluate((element) => element.classList.contains("hidden"));
	return opened && resultCount > 0 && closed;
});

await check("theme switcher", "/", { width: 1280, height: 800 }, async (page) => {
	await page.locator("#theme-dot-dark").click();
	return (await page.locator("html").getAttribute("data-theme")) === "dark";
});

await check("pricing accordion", "/pricing.html", { width: 390, height: 800 }, async (page) => {
	const trigger = page.locator(".faq-trigger").first();
	await trigger.click();
	return (await trigger.getAttribute("aria-expanded")) === "true";
});

await check("sign in fields", "/sign-in.html", { width: 390, height: 800 }, async (page) => {
	await page.locator("#email").fill("demo@example.com");
	await page.locator("#password").fill("example-password");
	return (
		(await page.locator("#email").inputValue()) === "demo@example.com" &&
		(await page.locator("#password").inputValue()) === "example-password"
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
