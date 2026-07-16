import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";

const target =
	process.env.VERIFY_URL ??
	"http://localhost:4208/shaders/animated-shader-hero/";
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
	const before = await page.locator("text=/\\d+\\.\\d+s/").first().textContent();
	await page.waitForTimeout(700);
	const after = await page.locator("text=/\\d+\\.\\d+s/").first().textContent();
	const canvas = page.locator("canvas").first();
	const bounds = await canvas.boundingBox();
	let pointerActive = false;
	if (bounds) {
		await page.mouse.move(bounds.x + bounds.width * 0.25, bounds.y + 180);
		await page.mouse.down();
		await page.mouse.move(bounds.x + bounds.width * 0.7, bounds.y + 360, {
			steps: 10,
		});
		await page.waitForTimeout(200);
		pointerActive =
			(await page.getByText(/disturbing the field/i).count()) > 0;
		await page.mouse.up();
	}
	const details = await page.evaluate(() => {
		const canvas = document.querySelector("canvas");
		return {
			bodyWidth: document.body.scrollWidth,
			canvas: canvas
				? {
						height: canvas.height,
						webgl2: Boolean(canvas.getContext("webgl2")),
						width: canvas.width,
					}
				: null,
			fonts: {
				body: document.fonts.check('16px "Inter"'),
				display: document.fonts.check('16px "Space Grotesk"'),
				mono: document.fonts.check('16px "JetBrains Mono"'),
			},
			headingVisible: Boolean(
				document.querySelector("h1")?.getBoundingClientRect().height,
			),
			viewportWidth: document.documentElement.clientWidth,
		};
	});
	await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
	await page.waitForTimeout(700);
	const sections = {
		howToUse: await page.getByText(/How to use the Hero component/i).isVisible(),
		integration: await page.getByText(/Tailwind, TypeScript, zero config/i).isVisible(),
	};
	await page.screenshot({
		fullPage: true,
		path: `.audit/screenshots/${size.name}.png`,
	});
	results.push({
		badResponses,
		details,
		errors,
		hudAdvanced: before !== after,
		pointerActive,
		sections,
		size,
	});
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
		!result.details.canvas.webgl2 ||
		result.details.canvas.width < 1 ||
		result.details.canvas.height < 1 ||
		!Object.values(result.details.fonts).every(Boolean) ||
		!result.hudAdvanced ||
		!result.pointerActive ||
		!Object.values(result.sections).every(Boolean),
);

process.exit(failed ? 1 : 0);
