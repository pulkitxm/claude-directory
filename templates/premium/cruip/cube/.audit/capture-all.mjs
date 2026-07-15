import fs from "node:fs";
import path from "node:path";
import playwright from "../../../../../scripts/record-demos/node_modules/playwright/index.js";

const { chromium } = playwright;
const pages = [
	["home", ""],
	["signin", "signin.html"],
	["signup", "signup.html"],
	["reset-password", "reset-password.html"],
];
const targets = [
	["reference", "https://preview.cruip.com/cube/"],
	["clone", "http://127.0.0.1:4186/"],
];
const browser = await chromium.launch({ args: ["--ignore-certificate-errors"] });

async function settle(page) {
	await page.evaluate(async () => {
		for (let y = 0; y < document.documentElement.scrollHeight; y += 500) {
			window.scrollTo(0, y);
			await new Promise((resolve) => setTimeout(resolve, 80));
		}
		window.scrollTo(0, 0);
		document.querySelectorAll("[data-aos]").forEach((element) => element.classList.add("aos-animate"));
	});
	await page.waitForTimeout(600);
}

for (const [kind, base] of targets) {
	for (const [slug, route] of pages) {
		const stateRoot = path.join(import.meta.dirname, kind, slug, "states");
		const responsive = path.join(stateRoot, "responsive");
		fs.mkdirSync(responsive, { recursive: true });
		const page = await browser.newPage();
		await page.goto(`${base}${route}`, { waitUntil: "networkidle", timeout: 60000 });
		for (const [label, width, height] of [
			["mobile", 390, 844],
			["tablet", 768, 1024],
			["desktop", 1280, 900],
		]) {
			await page.setViewportSize({ width, height });
			await settle(page);
			await page.screenshot({ path: path.join(responsive, `${label}.png`), fullPage: true });
		}
		await page.setViewportSize({ width: 1280, height: 900 });
		await settle(page);
		await page.screenshot({ path: path.join(stateRoot, "theme-dark.png"), fullPage: true });
		const interactions = [];
		if (slug === "home") {
			for (const [name, selector, mode] of [
				["feature-tab", "button:has-text('Freelancers')", "click"],
				["pricing-toggle", "input[type='checkbox']", "click"],
				["carousel-next", ".carousel-next", "click"],
			]) {
				await page.goto(`${base}${route}`, { waitUntil: "networkidle", timeout: 60000 });
				await page.setViewportSize({ width: 1280, height: 900 });
				const trigger = page.locator(selector).first();
				await trigger.scrollIntoViewIfNeeded();
				await page.waitForTimeout(350);
				await page.screenshot({ path: path.join(stateRoot, `${name}-before.png`) });
				const before = await trigger.evaluate((element) => ({
					className: element.className,
					checked: element.checked ?? null,
					bodyText: document.body.innerText,
				}));
				if (mode === "click") await trigger.evaluate((element) => element.click());
				await page.waitForTimeout(450);
				const after = await trigger.evaluate((element) => ({
					className: element.className,
					checked: element.checked ?? null,
					bodyText: document.body.innerText,
				}));
				await page.screenshot({ path: path.join(stateRoot, `${name}-after.png`) });
				interactions.push({ name, selector, changed: JSON.stringify(before) !== JSON.stringify(after) });
			}
			await page.goto(`${base}${route}`, { waitUntil: "networkidle", timeout: 60000 });
			await page.setViewportSize({ width: 1280, height: 900 });
			const reveal = page.locator("[data-aos]").first();
			const beforeOpacity = await reveal.evaluate((element) => getComputedStyle(element).opacity);
			await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
			await page.waitForTimeout(700);
			const revealedCount = await page.locator("[data-aos].aos-animate").count();
			interactions.push({ name: "scroll-reveal", selector: "[data-aos]", beforeOpacity, revealedCount });
		}
		fs.writeFileSync(path.join(stateRoot, "interactions.json"), JSON.stringify(interactions, null, 2));
		await page.close();
	}
}

await browser.close();
