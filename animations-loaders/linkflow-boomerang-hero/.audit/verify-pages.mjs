import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";

const target =
	process.env.VERIFY_URL ??
	"http://localhost:4206/animations-loaders/linkflow-boomerang-hero/";
const sizes = [
	{ name: "mobile", width: 390, height: 844 },
	{ name: "tablet", width: 768, height: 1024 },
	{ name: "desktop", width: 1280, height: 900 },
];
const browser = await chromium.launch();
const results = [];

await mkdir(".audit/screenshots", { recursive: true });

for (const size of sizes) {
	const page = await browser.newPage({ viewport: size });
	const errors = [];
	const badResponses = [];
	page.on("console", (message) => {
		if (message.type() === "error") errors.push(message.text());
	});
	page.on("pageerror", (error) => errors.push(error.message));
	page.on("response", (response) => {
		if (response.status() >= 400) {
			badResponses.push({ status: response.status(), url: response.url() });
		}
	});
	await page.goto(target, { waitUntil: "networkidle" });
	await page.waitForTimeout(1800);
	const details = await page.evaluate(() => {
		const video = document.querySelector("video");
		return {
			bodyWidth: document.body.scrollWidth,
			fontLoaded: document.fonts.check(
				'16px "Neue Haas Grotesk Text Pro"',
			),
			headingVisible: Boolean(
				document.querySelector("h1")?.getBoundingClientRect().height,
			),
			video: video
				? {
						currentSrc: video.currentSrc,
						currentTime: video.currentTime,
						naturalHeight: video.videoHeight,
						naturalWidth: video.videoWidth,
						readyState: video.readyState,
					}
				: null,
			viewportWidth: document.documentElement.clientWidth,
		};
	});
	await page.screenshot({
		fullPage: true,
		path: `.audit/screenshots/${size.name}.png`,
	});
	let menu = null;
	if (size.width < 1024) {
		await page.getByRole("button", { name: "Open menu" }).click();
		await page.waitForTimeout(500);
		menu = {
			closeVisible: await page
				.getByRole("button", { name: "Close menu" })
				.isVisible(),
			links: await page.locator("div.fixed a").count(),
		};
		await page.screenshot({
			fullPage: true,
			path: `.audit/screenshots/${size.name}-menu.png`,
		});
	}
	let boomerang = null;
	if (size.name === "desktop") {
		await page.waitForTimeout(7000);
		boomerang = await page.evaluate(() => {
			const canvas = document.querySelector("canvas");
			const video = document.querySelector("video");
			return {
				canvasHeight: canvas?.height ?? 0,
				canvasVisible: canvas ? getComputedStyle(canvas).display === "block" : false,
				canvasWidth: canvas?.width ?? 0,
				videoHidden: video ? getComputedStyle(video).display === "none" : false,
			};
		});
	}
	results.push({ badResponses, boomerang, details, errors, menu, size });
	await page.close();
}

await browser.close();
await writeFile(".audit/verification.json", `${JSON.stringify(results, null, 2)}\n`);

const failed = results.some(
	(result) =>
		result.badResponses.length > 0 ||
		result.errors.length > 0 ||
		result.details.bodyWidth > result.details.viewportWidth ||
		!result.details.headingVisible ||
		!result.details.fontLoaded ||
		!result.details.video ||
		result.details.video.readyState < 3 ||
		result.details.video.currentTime <= 0 ||
		result.details.video.naturalWidth !== 3828 ||
		result.details.video.naturalHeight !== 2164 ||
		(result.menu && (!result.menu.closeVisible || result.menu.links < 5)) ||
		(result.boomerang &&
			(!result.boomerang.canvasVisible ||
				!result.boomerang.videoHidden ||
				result.boomerang.canvasWidth < 1 ||
				result.boomerang.canvasHeight < 1)),
);

if (failed) {
	process.exitCode = 1;
}
