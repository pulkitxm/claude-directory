import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const url =
	process.env.AUDIT_URL ??
	"http://127.0.0.1:4216/landing-pages/neuralyn-dark-landing/";
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
		if (response.status() >= 400) badResponses.push(`${response.status()} ${response.url()}`);
	});
	page.on("pageerror", (error) => runtimeErrors.push(error.message));
	page.on("console", (message) => {
		if (message.type() === "error") runtimeErrors.push(message.text());
	});

	await page.goto(url, { waitUntil: "networkidle" });
	await page.getByRole("heading", { name: /Your Insights/ }).waitFor();
	await page.evaluate(() => document.fonts.ready);
	await page.waitForTimeout(900);
	const video = page.locator("video");
	await video.evaluate((element) => element.play());
	const firstTime = await video.evaluate((element) => element.currentTime);
	await page.waitForTimeout(700);
	const state = await page.evaluate(() => ({
		documentWidth: document.documentElement.scrollWidth,
		viewportWidth: document.documentElement.clientWidth,
		fonts: [
			document.fonts.check('16px "Inter"'),
			document.fonts.check('italic 16px "Instrument Serif"'),
		],
		images: [...document.images].map((image) => ({
			src: image.currentSrc,
			complete: image.complete,
			width: image.naturalWidth,
			height: image.naturalHeight,
		})),
		video: (() => {
			const element = document.querySelector("video");
			return element
				? {
						readyState: element.readyState,
						width: element.videoWidth,
						height: element.videoHeight,
						currentTime: element.currentTime,
					}
				: null;
		})(),
	}));

	if (state.documentWidth > state.viewportWidth + 1) {
		failures.push(`${size.name}: horizontal overflow`);
	}
	if (state.fonts.some((loaded) => !loaded)) failures.push(`${size.name}: local font missing`);
	if (state.images.some((image) => !image.complete || !image.width || !image.height)) {
		failures.push(`${size.name}: image did not decode`);
	}
	if (!state.video || state.video.readyState < 3 || !state.video.width || !state.video.height) {
		failures.push(`${size.name}: video did not decode`);
	} else if (state.video.currentTime <= firstTime) {
		failures.push(`${size.name}: video did not advance`);
	}
	if (badResponses.length) failures.push(`${size.name}: ${badResponses.join(", ")}`);
	if (runtimeErrors.length) failures.push(`${size.name}: ${runtimeErrors.join(", ")}`);

	await page.screenshot({
		path: new URL(`${size.name}-hero.png`, output).pathname,
		fullPage: false,
	});
	await page.getByTestId("testimonial").scrollIntoViewIfNeeded();
	await page.waitForTimeout(600);
	if (size.name === "desktop") {
		await page.screenshot({
			path: new URL("desktop-testimonial.png", output).pathname,
			fullPage: false,
		});
	}
	await page.close();
}

await browser.close();

if (failures.length) {
	console.error(failures.join("\n"));
	process.exit(1);
}

console.log("Nested Pages verification passed at 390, 768, and 1280 pixels.");
