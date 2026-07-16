import { mkdir } from "node:fs/promises";
import { chromium } from "../../../scripts/record-demos/node_modules/playwright/index.mjs";

const url =
	process.env.AUDIT_URL ??
	"http://127.0.0.1:4217/templates/heavyweight-brutalist-store/";
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
	await page.getByRole("heading", { name: /Heavy Duty Gear/ }).waitFor();
	await page.evaluate(() => document.fonts.ready);
	await page.waitForTimeout(400);
	await page.screenshot({
		path: new URL(`${size.name}-hero.png`, output).pathname,
		fullPage: false,
	});

	const initialCount = await page.locator("#count").textContent();
	await page.locator("[data-add]").first().click();
	if (initialCount === (await page.locator("#count").textContent())) {
		failures.push(`${size.name}: cart count did not update`);
	}

	const reveals = page.locator(".reveal");
	for (let index = 0; index < (await reveals.count()); index += 1) {
		await reveals.nth(index).scrollIntoViewIfNeeded();
		await page.waitForTimeout(35);
	}
	await page.waitForTimeout(300);
	const state = await page.evaluate(() => ({
		documentWidth: document.documentElement.scrollWidth,
		viewportWidth: document.documentElement.clientWidth,
		fonts: [
			document.fonts.check('16px "Anton"'),
			document.fonts.check('16px "Space Grotesk"'),
		],
		images: [...document.images].map((image) => ({
			src: image.currentSrc,
			complete: image.complete,
			width: image.naturalWidth,
			height: image.naturalHeight,
		})),
		reveals: [...document.querySelectorAll(".reveal")].every((element) =>
			element.classList.contains("in"),
		),
	}));

	if (state.documentWidth > state.viewportWidth + 1) failures.push(`${size.name}: overflow`);
	if (state.fonts.some((loaded) => !loaded)) failures.push(`${size.name}: local font missing`);
	if (state.images.some((image) => !image.complete || !image.width || !image.height)) {
		failures.push(`${size.name}: image did not decode`);
	}
	if (!state.reveals) failures.push(`${size.name}: scroll reveal content stayed hidden`);
	if (badResponses.length) failures.push(`${size.name}: ${badResponses.join(", ")}`);
	if (runtimeErrors.length) failures.push(`${size.name}: ${runtimeErrors.join(", ")}`);

	if (size.name === "desktop") {
		await page.locator("#inventory").scrollIntoViewIfNeeded();
		await page.screenshot({
			path: new URL("desktop-inventory.png", output).pathname,
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
