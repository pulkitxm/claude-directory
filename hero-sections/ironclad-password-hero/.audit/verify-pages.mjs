import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";

const target =
	process.env.VERIFY_URL ??
	"http://localhost:4204/hero-sections/ironclad-password-hero/";
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
	page.on("pageerror", (error) => errors.push(error.message));
	page.on("response", (response) => {
		if (response.status() >= 400) {
			badResponses.push({ status: response.status(), url: response.url() });
		}
	});
	await page.goto(target, { waitUntil: "networkidle" });
	await page.waitForTimeout(1800);
	const details = await page.evaluate(async () => {
		const video = document.querySelector("video");
		const heading = document.querySelector("h1");
		return {
			bodyWidth: document.body.scrollWidth,
			viewportWidth: document.documentElement.clientWidth,
			fontLoaded: document.fonts.check('16px "Helvetica Now Display Bold"'),
			headingVisible: Boolean(
				heading &&
					getComputedStyle(heading).opacity === "1" &&
					heading.getBoundingClientRect().height > 0,
			),
			video: video
				? {
						currentSrc: video.currentSrc,
						naturalHeight: video.videoHeight,
						naturalWidth: video.videoWidth,
						readyState: video.readyState,
					}
				: null,
		};
	});
	let menu = null;
	await page.screenshot({
		fullPage: true,
		path: `.audit/screenshots/${size.name}.png`,
	});
	if (size.width < 768) {
		await page.getByRole("button", { name: "Open menu" }).click();
		await page.waitForTimeout(500);
		menu = {
			closeVisible: await page
				.getByRole("button", { name: "Close menu" })
				.first()
				.isVisible(),
			links: await page.locator("aside nav a").count(),
		};
		await page.screenshot({
			fullPage: true,
			path: `.audit/screenshots/${size.name}-menu.png`,
		});
	}
	results.push({ badResponses, details, errors, menu, size });
	await page.close();
}

await browser.close();
await writeFile(".audit/verification.json", `${JSON.stringify(results, null, 2)}\n`);

const failed = results.some(
	(result) =>
		result.badResponses.length > 0 ||
		result.errors.length > 0 ||
		result.details.bodyWidth > result.details.viewportWidth ||
		!result.details.fontLoaded ||
		!result.details.headingVisible ||
		!result.details.video ||
		result.details.video.readyState < 3 ||
		result.details.video.naturalWidth !== 1920 ||
		result.details.video.naturalHeight !== 1080 ||
		(result.menu && (!result.menu.closeVisible || result.menu.links !== 5)),
);

if (failed) {
	process.exitCode = 1;
}
