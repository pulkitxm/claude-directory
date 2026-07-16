import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const url =
	process.env.AUDIT_URL ??
	"http://127.0.0.1:4213/hero-sections/bloom-liquid-glass-hero/";
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
	await page.getByRole("heading", { name: /Innovating the spirit/ }).waitFor();
	const menuButton = page.getByRole("button", { name: "Menu" });
	if (!(await menuButton.isVisible())) {
		failures.push(`${size.name}: menu control missing`);
	}
	await page.waitForTimeout(1200);
	const video = page.locator("video");
	await video.evaluate((element) => element.play());
	const firstTime = await video.evaluate((element) => element.currentTime);
	await page.waitForTimeout(800);
	const state = await page.evaluate(() => ({
		documentWidth: document.documentElement.scrollWidth,
		viewportWidth: document.documentElement.clientWidth,
		text: document.body.innerText,
		video: (() => {
			const element = document.querySelector("video");
			return element
				? {
						currentTime: element.currentTime,
						readyState: element.readyState,
						width: element.videoWidth,
						height: element.videoHeight,
					}
				: null;
		})(),
		images: [...document.images].map((image) => ({
			src: image.currentSrc,
			complete: image.complete,
			width: image.naturalWidth,
			height: image.naturalHeight,
		})),
		fonts: [
			document.fonts.check('16px "Poppins"'),
			document.fonts.check('16px "Source Serif 4"'),
		],
	}));

	if (badResponses.length) failures.push(`${size.name}: ${badResponses.join(", ")}`);
	if (runtimeErrors.length) failures.push(`${size.name}: ${runtimeErrors.join(", ")}`);
	if (state.documentWidth > state.viewportWidth + 1) {
		failures.push(
			`${size.name}: horizontal overflow ${state.documentWidth}/${state.viewportWidth}`,
		);
	}
	if (!state.text.toLowerCase().includes("visionary design")) {
		failures.push(`${size.name}: hero content missing`);
	}
	if (
		!state.video ||
		state.video.readyState < 3 ||
		state.video.width === 0 ||
		state.video.height === 0
	) {
		failures.push(`${size.name}: background video did not decode`);
	} else if (state.video.currentTime <= firstTime) {
		failures.push(`${size.name}: background video did not advance`);
	}
	if (state.images.length < 2) {
		failures.push(`${size.name}: expected at least 2 images, found ${state.images.length}`);
	}
	for (const image of state.images) {
		if (!image.complete || image.width === 0 || image.height === 0) {
			failures.push(`${size.name}: image did not decode ${image.src}`);
		}
	}
	if (state.fonts.some((loaded) => !loaded)) {
		failures.push(`${size.name}: local font did not load`);
	}

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
