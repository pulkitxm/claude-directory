import fs from "node:fs";
import path from "node:path";
import playwright from "../../../../../scripts/record-demos/node_modules/playwright/index.js";

const { chromium } = playwright;

const [url, out] = process.argv.slice(2);
fs.mkdirSync(path.join(out, "responsive"), { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1000);
for (const [name, width, height] of [["mobile", 390, 844], ["tablet", 768, 1024], ["desktop", 1280, 900]]) {
	await page.setViewportSize({ width, height });
	await page.waitForTimeout(300);
	await page.screenshot({ path: path.join(out, "responsive", `${name}.png`), fullPage: true });
}
const interactions = [];
await page.setViewportSize({ width: 390, height: 844 });
const menu = page.locator('button[aria-controls*="nav" i], button[aria-label*="menu" i], button:has-text("Menu")').first();
if (await menu.isVisible().catch(() => false)) {
	await page.screenshot({ path: path.join(out, "mobile-menu-before.png") });
	await menu.click();
	await page.waitForTimeout(300);
	await page.screenshot({ path: path.join(out, "mobile-menu-after.png") });
	interactions.push({ name: "mobile-menu", trigger: await menu.evaluate((element) => element.outerHTML.slice(0, 300)), delta: "navigation visibility changed", before: "mobile-menu-before.png", after: "mobile-menu-after.png" });
}
await page.setViewportSize({ width: 1280, height: 900 });
for (const [name, selector] of [["resources", 'button:has-text("Resources")'], ["play", 'button[aria-label*="play" i], button:has(svg use[href*="play"]), a[href="#0"]:has(svg)'], ["faq", 'button:has-text("What"), button:has-text("How"), button:has-text("Can")']]) {
	const trigger = page.locator(selector).first();
	if (!(await trigger.isVisible().catch(() => false))) continue;
	await trigger.scrollIntoViewIfNeeded();
	await page.waitForTimeout(200);
	await page.screenshot({ path: path.join(out, `${name}-before.png`) });
	await trigger.click();
	await page.waitForTimeout(350);
	await page.screenshot({ path: path.join(out, `${name}-after.png`) });
	interactions.push({ name, trigger: await trigger.evaluate((element) => element.outerHTML.slice(0, 300)), delta: "visible DOM state changed", before: `${name}-before.png`, after: `${name}-after.png` });
}
for (const theme of ["light", "dark"]) {
	await page.evaluate((value) => {
		localStorage.setItem("dark-mode", value === "dark" ? "true" : "false");
		document.documentElement.classList.toggle("dark", value === "dark");
	}, theme);
	await page.waitForTimeout(250);
	await page.screenshot({ path: path.join(out, `theme-${theme}.png`), fullPage: true });
}
fs.writeFileSync(path.join(out, "interactions.json"), JSON.stringify(interactions, null, 2));
await browser.close();
