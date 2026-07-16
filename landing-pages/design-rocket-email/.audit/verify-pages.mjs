import { chromium } from "../../../scripts/record-demos/node_modules/playwright/index.mjs";
import { mkdir } from "node:fs/promises";

const url =
	process.env.AUDIT_URL ??
	"http://127.0.0.1:4209/landing-pages/design-rocket-email/";
const output = new URL("./screenshots/", import.meta.url);
const sizes = [
	{ name: "mobile", width: 390, height: 844 },
	{ name: "tablet", width: 768, height: 1024 },
	{ name: "desktop", width: 1280, height: 900 },
];
const browser = await chromium.launch({ headless: true });
const failures = [];

await mkdir(output, { recursive: true });

for (const size of sizes) {
	const page = await browser.newPage({ viewport: size });
	const badResponses = [];
	const runtimeErrors = [];

	page.on("response", (response) => {
		if (response.status() >= 400) {
			badResponses.push(`${response.status()} ${response.url()}`);
		}
	});
	page.on("pageerror", (error) => runtimeErrors.push(error.message));
	page.on("console", (message) => {
		if (message.type() === "error") runtimeErrors.push(message.text());
	});

	await page.goto(url, { waitUntil: "networkidle" });
	const videos = page.locator("video");
	await videos.first().waitFor({ state: "visible" });
	const playback = [];
	for (let index = 0; index < (await videos.count()); index += 1) {
		const video = videos.nth(index);
		await video.scrollIntoViewIfNeeded();
		await video.evaluate((element) => element.play());
		await page.waitForTimeout(900);
		const first = await video.evaluate((element) => ({
			currentTime: element.currentTime,
			readyState: element.readyState,
			width: element.videoWidth,
			height: element.videoHeight,
		}));
		await page.waitForTimeout(500);
		const second = await video.evaluate((element) => element.currentTime);
		playback.push({ first, second });
	}
	const layout = await page.evaluate(() => ({
		documentWidth: document.documentElement.scrollWidth,
		viewportWidth: document.documentElement.clientWidth,
		mainText: document.body.innerText,
	}));

	if (badResponses.length) {
		failures.push(`${size.name}: ${badResponses.join(", ")}`);
	}
	if (runtimeErrors.length) {
		failures.push(`${size.name}: ${runtimeErrors.join(", ")}`);
	}
	if (layout.documentWidth > layout.viewportWidth + 1) {
		failures.push(
			`${size.name}: horizontal overflow ${layout.documentWidth}/${layout.viewportWidth}`,
		);
	}
	if (!layout.mainText.includes("Learn to lead AI")) {
		failures.push(`${size.name}: hero content missing`);
	}
	if (!layout.mainText.includes("Ready to lead AI")) {
		failures.push(`${size.name}: final section missing`);
	}
	if (playback.length !== 3) {
		failures.push(`${size.name}: expected 3 videos, found ${playback.length}`);
	}
	playback.forEach(({ first: video, second }, index) => {
		if (video.readyState < 3 || video.width === 0 || video.height === 0) {
			failures.push(`${size.name}: video ${index + 1} did not decode`);
		}
		if (second <= video.currentTime) {
			failures.push(`${size.name}: video ${index + 1} did not advance`);
		}
	});

	await page.screenshot({
		path: new URL(`${size.name}.png`, output).pathname,
		fullPage: true,
	});
	await page.close();
}

await browser.close();

if (failures.length) {
	console.error(failures.join("\n"));
	process.exit(1);
}

console.log("Nested Pages verification passed at 390, 768, and 1280 pixels.");
