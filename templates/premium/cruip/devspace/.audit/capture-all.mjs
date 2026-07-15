import fs from "node:fs";
import path from "node:path";
import playwright from "../../../../../scripts/record-demos/node_modules/playwright/index.js";

const { chromium } = playwright;
const pages = ["index", "about", "projects", "resume", "subscribe", "post"];
const targets = [
	["reference", "https://preview.cruip.com/devspace/"],
	["clone", "http://127.0.0.1:4188/"],
];
const browser = await chromium.launch({ args: ["--ignore-certificate-errors"] });

for (const [kind, base] of targets) {
	for (const slug of pages) {
		const stateRoot = path.join(import.meta.dirname, kind, slug, "states");
		const responsive = path.join(stateRoot, "responsive");
		fs.mkdirSync(responsive, { recursive: true });
		const page = await browser.newPage();
		await page.goto(`${base}${slug}.html`, { waitUntil: "networkidle", timeout: 60000 });
		await page.evaluate(() => localStorage.setItem("dark-mode", "false"));
		await page.reload({ waitUntil: "networkidle" });
		for (const [label, width, height] of [
			["mobile", 390, 844],
			["tablet", 768, 1024],
			["desktop", 1280, 900],
		]) {
			await page.setViewportSize({ width, height });
			await page.waitForTimeout(350);
			await page.screenshot({ path: path.join(responsive, `${label}.png`), fullPage: true });
		}
		await page.setViewportSize({ width: 1280, height: 900 });
		await page.screenshot({ path: path.join(stateRoot, "theme-light.png"), fullPage: true });
		const before = await page.evaluate(() => ({ dark: document.documentElement.classList.contains("dark"), stored: localStorage.getItem("dark-mode") }));
		await page.locator("#light-switch").evaluate((element) => element.click());
		await page.waitForTimeout(250);
		const after = await page.evaluate(() => ({ dark: document.documentElement.classList.contains("dark"), stored: localStorage.getItem("dark-mode") }));
		await page.screenshot({ path: path.join(stateRoot, "theme-dark.png"), fullPage: true });
		await page.reload({ waitUntil: "networkidle" });
		const persisted = await page.evaluate(() => document.documentElement.classList.contains("dark"));
		const search = page.locator("#search");
		const focusChanged = await search.isVisible().then(async (visible) => {
			if (!visible) return false;
			const rest = await search.evaluate((element) => getComputedStyle(element).boxShadow);
			await search.focus();
			const focused = await search.evaluate((element) => getComputedStyle(element).boxShadow);
			return rest !== focused;
		});
		fs.writeFileSync(path.join(stateRoot, "interactions.json"), JSON.stringify([
			{ name: "theme-toggle", selector: "#light-switch", before, after, persisted },
			{ name: "search-focus", selector: "#search", changed: focusChanged },
		], null, 2));
		await page.close();
	}
}

await browser.close();
