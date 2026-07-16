import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { chromium } from "../../../scripts/record-demos/node_modules/playwright/index.mjs";

const output = new URL("./local/", import.meta.url);
fs.mkdirSync(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const results = [];

for (const width of [390, 768, 1280]) {
	const page = await browser.newPage({ viewport: { width, height: 900 } });
	const badResponses = [];
	const errors = [];
	page.on("response", (response) => {
		if (response.status() >= 400 && !response.url().endsWith("favicon.ico")) {
			badResponses.push(`${response.status()} ${response.url()}`);
		}
	});
	page.on("pageerror", (error) => errors.push(String(error)));
	page.on("console", (message) => {
		if (message.type() === "error") errors.push(message.text());
	});
	const response = await page.goto(
		"http://127.0.0.1:4202/portfolios/crimson-press-kit-h25/",
		{ waitUntil: "networkidle" },
	);
	await page.waitForFunction(() =>
		Array.from(document.images).every((image) => image.complete),
	);
	for (const selector of ["#contents", "#intro", "#works", "#method", "#contact"]) {
		await page.locator(selector).scrollIntoViewIfNeeded();
		await page.waitForTimeout(200);
	}
	const state = await page.evaluate(() => {
		const images = Array.from(document.images);
		return {
			images: images.length,
			brokenImages: images.filter((image) => image.naturalWidth === 0).map((image) => image.src),
			overflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
			sections: ["cover", "contents", "intro", "works", "method", "contact"].filter((id) =>
				document.getElementById(id),
			),
			fabVisible: document.getElementById("fab")?.classList.contains("show") ?? false,
		};
	});
	await page.locator("#query-form input[name=name]").fill("Morgan Reed");
	await page.locator("#query-form input[name=email]").fill("morgan@example.com");
	await page.locator("#query-form button[type=submit]").click();
	state.formConfirmed = (await page.locator("#q-note").textContent())?.startsWith("Sent,") ?? false;
	await page.evaluate(() => {
		document.documentElement.style.setProperty("scroll-behavior", "auto", "important");
		document.body.style.setProperty("scroll-behavior", "auto", "important");
		window.scrollTo(0, 0);
	});
	await page.waitForFunction(() => window.scrollY < 2);
	await page.waitForTimeout(250);
	await page.screenshot({ path: fileURLToPath(new URL(`${width}.png`, output)) });
	results.push({
		width,
		status: response?.status(),
		badResponses,
		errors,
		...state,
	});
	await page.close();
}

await browser.close();
fs.writeFileSync(new URL("verification.json", output), `${JSON.stringify(results, null, 2)}\n`);
console.log(JSON.stringify(results, null, 2));
