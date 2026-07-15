import fs from "node:fs";
import path from "node:path";
import playwright from "../../../../../scripts/record-demos/node_modules/playwright/index.js";

const { chromium } = playwright;
const targets = [
	["reference", "https://preview.cruip.com/devfolio/"],
	["clone", "http://127.0.0.1:4187/index.html"],
];
const browser = await chromium.launch({ args: ["--ignore-certificate-errors"] });

for (const [kind, url] of targets) {
	const stateRoot = path.join(import.meta.dirname, kind, "home", "states");
	const responsive = path.join(stateRoot, "responsive");
	fs.mkdirSync(responsive, { recursive: true });
	const page = await browser.newPage();
	await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
	await page.evaluate(() => localStorage.setItem("dark-mode", "false"));
	await page.reload({ waitUntil: "networkidle" });
	for (const [label, width, height] of [
		["mobile", 390, 844],
		["tablet", 768, 1024],
		["desktop", 1280, 900],
	]) {
		await page.setViewportSize({ width, height });
		await page.waitForTimeout(500);
		await page.screenshot({ path: path.join(responsive, `${label}.png`), fullPage: true });
	}
	await page.setViewportSize({ width: 1280, height: 900 });
	await page.evaluate(() => {
		localStorage.setItem("dark-mode", "false");
		document.documentElement.classList.remove("dark");
	});
	await page.screenshot({ path: path.join(stateRoot, "theme-light.png"), fullPage: true });
	const themeBefore = await page.evaluate(() => ({
		dark: document.documentElement.classList.contains("dark"),
		stored: localStorage.getItem("dark-mode"),
	}));
	await page.locator("#light-switch").evaluate((element) => element.click());
	await page.waitForTimeout(250);
	const themeAfter = await page.evaluate(() => ({
		dark: document.documentElement.classList.contains("dark"),
		stored: localStorage.getItem("dark-mode"),
	}));
	await page.screenshot({ path: path.join(stateRoot, "theme-dark.png"), fullPage: true });
	await page.reload({ waitUntil: "networkidle" });
	const persisted = await page.evaluate(() => document.documentElement.classList.contains("dark"));
	const headerGroup = page.locator("header .group").first();
	await headerGroup.scrollIntoViewIfNeeded();
	const headerBefore = await headerGroup.locator("img").first().evaluate((element) => getComputedStyle(element).transform);
	await headerGroup.hover({ force: true });
	await page.waitForTimeout(180);
	const headerAfter = await headerGroup.locator("img").first().evaluate((element) => getComputedStyle(element).transform);
	const carousel = page.locator("[x-data='testimonialCarousel']");
	await carousel.scrollIntoViewIfNeeded();
	const carouselBefore = await carousel.locator("[data-state='active'] h3").innerText();
	await page.waitForTimeout(3600);
	const carouselAfter = await carousel.locator("[data-state='active'] h3").innerText();
	await carousel.hover();
	await page.waitForTimeout(700);
	const pausedBefore = await carousel.locator("[data-state='active'] h3").innerText();
	await page.waitForTimeout(3600);
	const pausedAfter = await carousel.locator("[data-state='active'] h3").innerText();
	const interactions = [
		{ name: "theme-toggle", selector: "#light-switch", before: themeBefore, after: themeAfter, persisted },
		{ name: "header-hover", selector: "header .group", changed: headerBefore !== headerAfter },
		{ name: "carousel-auto-advance", selector: "[x-data='testimonialCarousel']", changed: carouselBefore !== carouselAfter },
		{ name: "carousel-hover-pause", selector: "[x-data='testimonialCarousel']", stable: pausedBefore === pausedAfter },
	];
	fs.writeFileSync(path.join(stateRoot, "interactions.json"), JSON.stringify(interactions, null, 2));
	await page.close();
}

await browser.close();
