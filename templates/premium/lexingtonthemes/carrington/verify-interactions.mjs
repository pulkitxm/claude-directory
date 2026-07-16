import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "../../../../scripts/record-demos/node_modules/playwright/index.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));
const origin =
	process.argv[2] ??
	"http://127.0.0.1:4352/templates/premium/lexingtonthemes/carrington";
const browser = await chromium.launch();
const results = [];

async function check(interaction, route, viewport, action) {
	const page = await browser.newPage({ viewport });
	await page.goto(`${origin}${route}`, { waitUntil: "load" });
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
	const button = page.locator("#menuButton");
	const menu = page.locator("#mobile-menu");
	await button.click();
	const opened = await menu.evaluate((element) => element.classList.contains("open"));
	await button.click();
	const closed = !(await menu.evaluate((element) => element.classList.contains("open")));
	return opened && closed;
});

await check("search and keyboard", "/", { width: 1280, height: 800 }, async (page) => {
	await page.locator("#searchButton").click();
	const modal = page.locator("#searchModal");
	const opened = await modal.evaluate((element) => element.classList.contains("open"));
	await page.locator("#searchInput").fill("corporate");
	const count = await page.locator("#searchResults a").count();
	await page.keyboard.press("Escape");
	const closed = !(await modal.evaluate((element) => element.classList.contains("open")));
	return opened && count > 0 && closed;
});

await check("mega menu", "/", { width: 1280, height: 800 }, async (page) => {
	await page.locator("#exploreBtn").hover();
	return await page.locator("#mega-desktop").evaluate((element) => element.classList.contains("visible"));
});

await check("consultation fields", "/free-consultation.html", { width: 390, height: 800 }, async (page) => {
	await page.locator("#fc-first-name").fill("Demo");
	await page.locator("#fc-last-name").fill("Client");
	await page.locator("#fc-email").fill("demo@example.com");
	await page.locator("#fc-practice-area").selectOption({ index: 1 });
	await page.locator("#fc-description").fill("A consultation request for responsive form verification.");
	return (
		(await page.locator("#fc-first-name").inputValue()) === "Demo" &&
		(await page.locator("#fc-practice-area").inputValue()) !== ""
	);
});

await check("relative navigation", "/cases/acme-acquires-beta.html", { width: 1280, height: 800 }, async (page) => {
	const href = await page.locator('a[href="../contact.html"]').first().getAttribute("href");
	return href === "../contact.html";
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
