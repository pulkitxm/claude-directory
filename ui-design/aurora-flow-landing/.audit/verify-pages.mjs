import { mkdir } from "node:fs/promises";
import { chromium } from "../../../scripts/record-demos/node_modules/playwright/index.mjs";

const url =
	process.env.AUDIT_URL ??
	"http://127.0.0.1:4211/ui-design/aurora-flow-landing/";
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
	await page.getByRole("heading", { name: /Slip into the current/ }).waitFor();
	await page.getByRole("button", { name: "Begin the session" }).click();
	await page.waitForTimeout(1200);
	const timerRunning = await page.getByText(/49:5\d/).count();
	await page.getByRole("button", { name: "Pause the session" }).click();

	if (size.width < 768) {
		await page.getByRole("button", { name: "Open menu" }).click();
		await page.getByRole("link", { name: "Soundscapes" }).last().waitFor();
		await page.getByRole("button", { name: "Close menu" }).click();
	}

	await page.mouse.move(Math.round(size.width * 0.6), Math.round(size.height * 0.4));
	await page.getByRole("button", { name: "Do I need to wear headphones?" }).click();
	await page.getByText("It helps, but it isn't required.", { exact: false }).waitFor();
	await page.getByLabel("Email address").fill("not-an-email");
	await page.getByRole("button", { name: "Get started" }).click();
	await page.getByText("THAT EMAIL DOESN'T LOOK RIGHT", { exact: false }).waitFor();
	await page.getByLabel("Email address").fill("focus@example.com");
	await page.getByRole("button", { name: "Get started" }).click();
	await page.getByRole("button", { name: "You're in" }).waitFor();
	if (size.name === "desktop") {
		for (const section of ["ritual", "soundscapes"]) {
			await page.locator(`#${section}`).scrollIntoViewIfNeeded();
			await page.waitForTimeout(900);
			await page.screenshot({
				path: new URL(`${section}-desktop.png`, output).pathname,
			});
		}
	}

	const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
	for (let top = 0; top < pageHeight; top += Math.round(size.height * 0.65)) {
		await page.evaluate((position) => window.scrollTo(0, position), top);
		await page.waitForTimeout(100);
	}
	const state = await page.evaluate(() => ({
		documentWidth: document.documentElement.scrollWidth,
		viewportWidth: document.documentElement.clientWidth,
		text: document.body.innerText,
		canvases: [...document.querySelectorAll("canvas")].map((canvas) => ({
			width: canvas.width,
			height: canvas.height,
		})),
		fonts: [
			document.fonts.check('16px "Inter"'),
			document.fonts.check('16px "Fraunces"'),
			document.fonts.check('16px "JetBrains Mono"'),
		],
	}));

	if (badResponses.length) failures.push(`${size.name}: ${badResponses.join(", ")}`);
	if (runtimeErrors.length) failures.push(`${size.name}: ${runtimeErrors.join(", ")}`);
	if (!timerRunning) failures.push(`${size.name}: session timer did not advance`);
	if (state.documentWidth > state.viewportWidth + 1) {
		failures.push(
			`${size.name}: horizontal overflow ${state.documentWidth}/${state.viewportWidth}`,
		);
	}
	if (!state.text.includes("Your next deep hour")) {
		failures.push(`${size.name}: final call to action missing`);
	}
	if (state.canvases.length !== 2) {
		failures.push(`${size.name}: expected 2 canvases, found ${state.canvases.length}`);
	}
	if (state.canvases.some((canvas) => canvas.width === 0 || canvas.height === 0)) {
		failures.push(`${size.name}: canvas did not initialize`);
	}
	if (state.fonts.some((loaded) => !loaded)) {
		failures.push(`${size.name}: local font did not load`);
	}

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
