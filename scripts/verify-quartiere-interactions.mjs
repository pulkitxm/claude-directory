import { chromium } from "./record-demos/node_modules/playwright/index.mjs";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";

const base =
	"http://localhost:4197/templates/premium/lexingtonthemes/quartiere/";
const browser = await chromium.launch({ headless: true });
const results = await Promise.all(
	[390, 768, 1280].map(async (width) => {
		const page = await browser.newPage({ viewport: { width, height: 900 } });
		await page.goto(`${base}index.html`, { waitUntil: "load" });
		await page.locator("#menubutton").evaluate((button) => button.click());
		await page.waitForTimeout(600);
		const menuOpen = await page.evaluate(() => ({
			expanded: document
				.querySelector("#menubutton")
				?.getAttribute("aria-expanded"),
			state: document.querySelector("#megamenu")?.getAttribute("data-state"),
			visibility: getComputedStyle(document.querySelector("#megamenu"))
				.visibility,
		}));
		await page.locator("#menubutton").evaluate((button) => button.click());
		const menuClosed = await page.evaluate(() => ({
			expanded: document
				.querySelector("#menubutton")
				?.getAttribute("aria-expanded"),
			state: document.querySelector("#megamenu")?.getAttribute("data-state"),
		}));
		await page.goto(`${base}for-sale.html`, { waitUntil: "load" });
		await page.locator("#searchButton").evaluate((button) => button.click());
		await page.locator("#searchInput").fill("villa");
		await page.waitForTimeout(200);
		const searchOpen = await page.evaluate(() => ({
			display: getComputedStyle(document.querySelector("#searchModal")).display,
			results: document.querySelector("#searchResults")?.textContent?.trim()
				.length,
		}));
		await page.locator("#closeSearch").evaluate((button) => button.click());
		const searchClosed = await page.evaluate(
			() => getComputedStyle(document.querySelector("#searchModal")).display,
		);
		await page.close();
		return { width, menuOpen, menuClosed, searchOpen, searchClosed };
	}),
);
await browser.close();
const failed = results.filter(
	(result) =>
		result.menuOpen.expanded !== "true" ||
		result.menuOpen.state !== "open" ||
		result.menuOpen.visibility === "hidden" ||
		result.menuClosed.expanded !== "false" ||
		result.menuClosed.state !== "closed" ||
		result.searchOpen.display === "none" ||
		!result.searchOpen.results ||
		result.searchClosed !== "none",
);
await writeFile(
	join(
		process.cwd(),
		"templates/premium/lexingtonthemes/quartiere/.audit/interactions-verification.json",
	),
	`${JSON.stringify(results, null, 2)}\n`,
);
console.log(JSON.stringify({ checked: results.length * 4, failed }, null, 2));
process.exitCode = failed.length ? 1 : 0;
