import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";

const target =
	process.env.VERIFY_URL ??
	"http://localhost:4207/landing-pages/axion-studio-landing/";
const sizes = [
	{ name: "mobile", width: 390, height: 844 },
	{ name: "tablet", width: 768, height: 1024 },
	{ name: "desktop", width: 1280, height: 900 },
];
const browser = await chromium.launch();
const results = [];
const imagesAreValid = (images) => {
	const sources = [...new Set(images.map((image) => image.src))];
	return (
		sources.length === 2 &&
		sources.every((source) =>
			images.some(
				(image) =>
					image.src === source &&
					image.complete &&
					image.width === 1280 &&
					image.height === 956,
			),
		)
	);
};

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
	let menu = null;
	if (size.width < 768) {
		await page.getByRole("button", { name: "Open menu" }).click();
		await page.waitForTimeout(600);
		menu = {
			closeVisible: await page
				.getByRole("button", { name: "Close menu" })
				.isVisible(),
			links: await page.locator("div.fixed nav a").count(),
		};
		await page.screenshot({
			path: `.audit/screenshots/${size.name}-menu.png`,
		});
		await page.getByRole("button", { name: "Close menu" }).click();
	}
	await page.evaluate(async () => {
		for (let position = 0; position <= document.body.scrollHeight; position += 500) {
			window.scrollTo(0, position);
			await new Promise((resolve) => setTimeout(resolve, 80));
		}
	});
	await page.waitForTimeout(1200);
	const details = await page.evaluate(() => ({
		bodyWidth: document.body.scrollWidth,
		headingVisible: Boolean(
			document.querySelector("h1")?.getBoundingClientRect().height,
		),
		images: [...document.images].map((image) => ({
				complete: image.complete,
				height: image.naturalHeight,
				src: image.currentSrc,
				width: image.naturalWidth,
			})),
		videos: [...document.querySelectorAll("video")].map((video) => ({
			currentSrc: video.currentSrc,
			currentTime: video.currentTime,
			height: video.videoHeight,
			readyState: video.readyState,
			width: video.videoWidth,
		})),
		viewportWidth: document.documentElement.clientWidth,
	}));
	await page.screenshot({
		fullPage: true,
		path: `.audit/screenshots/${size.name}.png`,
	});
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
		!result.details.headingVisible ||
		!imagesAreValid(result.details.images) ||
		result.details.videos.length !== 2 ||
		result.details.videos.some(
			(video) =>
				video.readyState < 3 ||
				video.currentTime <= 0 ||
				video.width !== 1440 ||
				video.height !== 1440,
		) ||
		(result.menu && (!result.menu.closeVisible || result.menu.links !== 4)),
);

process.exit(failed ? 1 : 0);
