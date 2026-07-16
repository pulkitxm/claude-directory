import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { chromium } from "../node_modules/playwright/index.mjs";

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
		"http://127.0.0.1:4203/landing-pages/usd-halo-landing/",
		{ waitUntil: "networkidle" },
	);
	await page.waitForFunction(() =>
		Array.from(document.querySelectorAll("video")).every(
			(video) => video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA,
		),
	);
	await page.waitForTimeout(800);
	const state = await page.evaluate(() => {
		const videos = Array.from(document.querySelectorAll("video"));
		const resources = performance.getEntriesByType("resource").map((entry) => entry.name);
		return {
			videos: videos.map((video) => ({
				readyState: video.readyState,
				currentTime: video.currentTime,
				width: video.videoWidth,
				height: video.videoHeight,
			})),
			assets: resources.filter((url) => /\.(mp4|webp|woff2)$/.test(url)),
			overflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
			fonts: {
				regular: document.fonts.check('400 16px "TT Norms Pro"'),
				semibold: document.fonts.check('600 16px "TT Norms Pro"'),
			},
			sections: Array.from(document.querySelectorAll("section")).length,
		};
	});
	const marquee = page.locator(".marquee-track");
	const firstX = await marquee.evaluate((element) => element.getBoundingClientRect().x);
	await page.waitForTimeout(400);
	const nextX = await marquee.evaluate((element) => element.getBoundingClientRect().x);
	state.marqueeMoves = firstX !== nextX;
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
