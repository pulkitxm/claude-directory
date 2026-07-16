import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const url =
	process.env.AUDIT_URL ??
	"http://127.0.0.1:4210/landing-pages/mindloop-mono-landing/";
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
	await page.locator("video").first().waitFor({ state: "visible" });
	const videos = page.locator("video");
	const playback = [];
	for (let index = 0; index < (await videos.count()); index += 1) {
		const video = videos.nth(index);
		await video.scrollIntoViewIfNeeded();
		await page.waitForTimeout(index === 3 ? 3500 : 900);
		await video.evaluate((element) => element.play().catch(() => undefined));
		await page.waitForTimeout(800);
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

	await page.locator("#hero-email").fill("reader@example.com");
	await page.getByRole("button", { name: "SUBSCRIBE" }).click();
	await page.getByText("SUBSCRIBED", { exact: true }).waitFor();
	const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
	for (let top = 0; top < pageHeight; top += Math.round(size.height * 0.65)) {
		await page.evaluate((position) => window.scrollTo(0, position), top);
		await page.waitForTimeout(120);
	}
	const layout = await page.evaluate(() => ({
		documentWidth: document.documentElement.scrollWidth,
		viewportWidth: document.documentElement.clientWidth,
		text: document.body.innerText,
	}));

	if (badResponses.length) failures.push(`${size.name}: ${badResponses.join(", ")}`);
	if (runtimeErrors.length) failures.push(`${size.name}: ${runtimeErrors.join(", ")}`);
	if (layout.documentWidth > layout.viewportWidth + 1) {
		failures.push(
			`${size.name}: horizontal overflow ${layout.documentWidth}/${layout.viewportWidth}`,
		);
	}
	if (!layout.text.includes("Get Inspired with Us")) {
		failures.push(`${size.name}: hero content missing`);
	}
	if (!layout.text.includes("Start Your Journey")) {
		failures.push(`${size.name}: final call to action missing`);
	}
	if (playback.length !== 4) {
		failures.push(`${size.name}: expected 4 videos, found ${playback.length}`);
	}
	playback.forEach(({ first, second }, index) => {
		if (first.readyState < 2 || first.width === 0 || first.height === 0) {
			failures.push(`${size.name}: video ${index + 1} did not decode`);
		}
		if (second <= first.currentTime) {
			failures.push(`${size.name}: video ${index + 1} did not advance`);
		}
	});

	await page.locator("header").evaluate((header) => {
		header.style.position = "absolute";
		header.style.top = "0";
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
