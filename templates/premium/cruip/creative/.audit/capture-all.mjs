import fs from "node:fs";
import path from "node:path";
import playwright from "../../../../../scripts/record-demos/node_modules/playwright/index.js";

const { chromium } = playwright;
const pages = ["index", "inspiration", "blog", "blog-post", "contact", "privacy", "signin", "signup", "reset-password"];
const targets = [
	["reference", "https://preview.cruip.com/creative/"],
	["final", "http://127.0.0.1:4173/templates/premium/cruip/creative/"]
];
const browser = await chromium.launch({ args: ["--ignore-certificate-errors"] });
for (const [kind, base] of targets) {
	for (const name of pages) {
		const out = path.join(import.meta.dirname, kind, name, "responsive");
		fs.mkdirSync(out, { recursive: true });
		const page = await browser.newPage();
		await page.goto(`${base}${name}.html`, { waitUntil: "networkidle", timeout: 60000 });
		await page.waitForTimeout(1200);
		for (const [label, width, height] of [["mobile", 390, 844], ["tablet", 768, 1024], ["desktop", 1280, 900]]) {
			await page.setViewportSize({ width, height });
			await page.evaluate(async () => {
				for (let y = 0; y < document.body.scrollHeight; y += 500) {
					window.scrollTo(0, y);
					await new Promise((resolve) => setTimeout(resolve, 50));
				}
				window.scrollTo(0, 0);
			});
			await page.waitForTimeout(300);
			await page.screenshot({ path: path.join(out, `${label}.png`), fullPage: true });
		}
		await page.setViewportSize({ width: 390, height: 844 });
		const menu = page.locator("button").first();
		const states = [];
		if (await menu.isVisible().catch(() => false)) {
			await page.screenshot({ path: path.join(out, "menu-before.png") });
			await menu.click();
			await page.waitForTimeout(250);
			await page.screenshot({ path: path.join(out, "menu-after.png") });
			states.push({ name: "mobile-menu", before: "menu-before.png", after: "menu-after.png" });
		}
		fs.writeFileSync(path.join(out, "interactions.json"), JSON.stringify(states, null, 2));
		await page.close();
	}
}
await browser.close();
