import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";

const target =
	process.env.VERIFY_URL ??
	"http://localhost:4205/shaders/glsl-hills-shader/";
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
		const canvas = document.querySelector("canvas");
		const sample = document.createElement("canvas");
		sample.width = 160;
		sample.height = 100;
		const context = sample.getContext("2d");
		if (canvas && context) {
			context.drawImage(canvas, 0, 0, sample.width, sample.height);
		}
		const pixels = context
			? context.getImageData(0, 0, sample.width, sample.height).data
			: [];
		let maximum = 0;
		let total = 0;
		for (let index = 0; index < pixels.length; index += 4) {
			const luminance =
				(pixels[index] + pixels[index + 1] + pixels[index + 2]) / 3;
			maximum = Math.max(maximum, luminance);
			total += luminance;
		}
		return {
			bodyWidth: document.body.scrollWidth,
			canvas: canvas
				? {
						height: canvas.height,
						maximum: Math.round(maximum),
						mean: Math.round(total / Math.max(1, pixels.length / 4)),
						webgl: Boolean(
							canvas.getContext("webgl2") || canvas.getContext("webgl"),
						),
						width: canvas.width,
					}
				: null,
			fonts: {
				fraunces: document.fonts.check('16px "Fraunces"'),
				inter: document.fonts.check('16px "Inter"'),
				mono: document.fonts.check('16px "JetBrains Mono"'),
			},
			headingVisible: Boolean(
				document.querySelector("h1")?.getBoundingClientRect().height,
			),
			viewportWidth: document.documentElement.clientWidth,
		};
	});
	let interactions = null;
	if (size.name === "desktop") {
		const hold = page.getByRole("button", { name: /hold drift/i });
		await hold.click();
		const resumeVisible = await page
			.getByRole("button", { name: /resume drift/i })
			.isVisible();
		await page.getByRole("button", { name: /apply abyssal preset/i }).click();
		interactions = { resumeVisible };
	}
	await page.screenshot({
		fullPage: true,
		path: `.audit/screenshots/${size.name}.png`,
	});
	results.push({ badResponses, details, errors, interactions, size });
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
		!result.details.canvas ||
		result.details.canvas.width < 1 ||
		result.details.canvas.height < 1 ||
		!result.details.canvas.webgl ||
		!Object.values(result.details.fonts).every(Boolean) ||
		(result.interactions && !result.interactions.resumeVisible),
);

if (failed) {
	process.exitCode = 1;
}
