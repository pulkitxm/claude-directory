import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "../../../../scripts/record-demos/node_modules/playwright/index.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));
const origin =
	process.argv[2] ??
	"http://127.0.0.1:4349/templates/premium/lexingtonthemes/carbon";
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
	const toggle = page.locator("[data-mobile-nav-toggle]");
	const panel = page.locator("[data-mobile-nav-panel]");
	await toggle.click();
	const opened = !(await panel.evaluate((element) => element.classList.contains("hidden")));
	await toggle.click();
	const closed = await panel.evaluate((element) => element.classList.contains("hidden"));
	return opened && closed;
});

await check("search and keyboard", "/", { width: 1280, height: 800 }, async (page) => {
	await page.waitForLoadState("load");
	await page.locator("#searchButton").click();
	const modal = page.locator("#searchModal");
	const opened = !(await modal.evaluate((element) => element.classList.contains("hidden")));
	await page.locator("#searchInput").fill("Pico");
	const resultCount = await page.locator("#searchResults a").count();
	await page.keyboard.press("Escape");
	const closed = await modal.evaluate((element) => element.classList.contains("hidden"));
	return opened && resultCount > 0 && closed;
});

await check("pricing disclosure", "/pricing.html", { width: 390, height: 800 }, async (page) => {
	const item = page.locator("details").first();
	await item.locator("summary").click();
	return await item.evaluate((element) => element.open);
});

await check("sign in fields", "/signin.html", { width: 390, height: 800 }, async (page) => {
	await page.locator("#email").fill("demo@example.com");
	await page.locator("#password").fill("example-password");
	return (
		(await page.locator("#email").inputValue()) === "demo@example.com" &&
		(await page.locator("#password").inputValue()) === "example-password"
	);
});

await check("submission fields", "/submit.html", { width: 1280, height: 800 }, async (page) => {
	await page.locator("#site-url").fill("https://example.com");
	await page.locator("#site-name").fill("Example Designer");
	await page.locator("#site-email").fill("demo@example.com");
	await page.locator("#site-description").fill("A carefully designed product website.");
	await page.locator('#submission-form button[type="submit"]').click();
	return await page.locator("#submission-status").isVisible();
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
