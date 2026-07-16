import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const url =
	process.env.AUDIT_URL ??
	"http://127.0.0.1:4214/shaders/radial-aperture-shader/";
const output = new URL("./screenshots/", import.meta.url);
const sizes = [
	{ name: "mobile", width: 390, height: 844 },
	{ name: "tablet", width: 768, height: 1024 },
	{ name: "desktop", width: 1280, height: 900 },
];
const browser = await chromium.launch({
	headless: true,
	args: [
		"--use-gl=angle",
		"--use-angle=swiftshader",
		"--enable-unsafe-swiftshader",
		"--ignore-gpu-blocklist",
	],
});
const failures = [];

await mkdir(output, { recursive: true });

for (const size of sizes) {
	const context = await browser.newContext({
		viewport: size,
		permissions: ["clipboard-read", "clipboard-write"],
	});
	const page = await context.newPage();
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
	await page.getByRole("heading", { name: "APERTURE", exact: true }).waitFor();
	await page.evaluate(() => document.fonts.ready);
	await page.waitForTimeout(1200);

	const initial = await page.evaluate(() => ({
		documentWidth: document.documentElement.scrollWidth,
		viewportWidth: document.documentElement.clientWidth,
		canvasCount: document.querySelectorAll("canvas").length,
		canvasSizes: [...document.querySelectorAll("canvas")].map((canvas) => ({
			width: canvas.width,
			height: canvas.height,
		})),
		fonts: [
			document.fonts.check('16px "Space Grotesk"'),
			document.fonts.check('16px "JetBrains Mono"'),
		],
		heroCopyColor: getComputedStyle(
			document.querySelector("h1 + p"),
		).color,
	}));

	if (initial.documentWidth > initial.viewportWidth + 1) {
		failures.push(
			`${size.name}: horizontal overflow ${initial.documentWidth}/${initial.viewportWidth}`,
		);
	}
	if (initial.canvasCount < 3) {
		failures.push(`${size.name}: expected at least 3 canvases`);
	}
	if (initial.canvasSizes.some((canvas) => canvas.width === 0 || canvas.height === 0)) {
		failures.push(`${size.name}: canvas backing store is empty`);
	}
	if (initial.fonts.some((loaded) => !loaded)) {
		failures.push(`${size.name}: local fonts did not load`);
	}
	if (initial.heroCopyColor === "rgb(6, 7, 11)") {
		failures.push(`${size.name}: hero copy has no visible contrast`);
	}

	await page.screenshot({
		path: new URL(`${size.name}-hero.png`, output).pathname,
		fullPage: false,
	});

	await page.locator("#deck").scrollIntoViewIfNeeded();
	await page.getByRole("button", { name: "IRIS", exact: true }).click();
	if ((await page.locator('input[type="range"]').first().inputValue()) !== "12") {
		failures.push(`${size.name}: preset did not update the blade control`);
	}
	await page.getByRole("button", { name: "Freeze", exact: true }).click();
	await page.getByRole("button", { name: "Resume", exact: true }).waitFor();
	await page.getByRole("button", { name: "Resume", exact: true }).click();
	await page
		.getByRole("button", { name: "Reset to original", exact: true })
		.click();
	await page.waitForFunction(
		() => document.querySelector('input[type="range"]')?.value === "9",
	);
	await page.waitForTimeout(200);
	if (size.name === "desktop") {
		await page.screenshot({
			path: new URL("desktop-deck.png", output).pathname,
			fullPage: false,
		});
	}

	await page.locator("#field").scrollIntoViewIfNeeded();
	await page.waitForTimeout(500);
	const specimens = await page.evaluate(() =>
		[...document.querySelectorAll('img[src*="assets/specimens"]')].map((image) => ({
			complete: image.complete,
			width: image.naturalWidth,
			height: image.naturalHeight,
		})),
	);
	if (
		specimens.length !== 6 ||
		specimens.some(
			(image) => !image.complete || image.width === 0 || image.height === 0,
		)
	) {
		failures.push(`${size.name}: specimen images did not all decode`);
	}
	if (size.name === "desktop") {
		await page.screenshot({
			path: new URL("desktop-field.png", output).pathname,
			fullPage: false,
		});
	}

	await page.locator("#dropin").scrollIntoViewIfNeeded();
	await page.getByRole("button", { name: "Open fullscreen", exact: true }).click();
	await page.getByRole("button", { name: "Close fullscreen", exact: true }).waitFor();
	if (size.name === "desktop") {
		await page.screenshot({
			path: new URL("desktop-fullscreen.png", output).pathname,
			fullPage: false,
		});
	}
	await page.getByRole("button", { name: "Close fullscreen", exact: true }).click();

	if (badResponses.length) failures.push(`${size.name}: ${badResponses.join(", ")}`);
	if (runtimeErrors.length) failures.push(`${size.name}: ${runtimeErrors.join(", ")}`);
	await context.close();
}

await browser.close();

if (failures.length) {
	console.error(failures.join("\n"));
	process.exit(1);
}

console.log("Nested Pages verification passed at 390, 768, and 1280 pixels.");
