import { mkdir } from "node:fs/promises";
import { chromium } from "../../../scripts/record-demos/node_modules/playwright/index.mjs";

const url =
	process.env.AUDIT_URL ??
	"http://127.0.0.1:4212/landing-pages/valmax-photography-landing/";
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
	await page.waitForTimeout(4200);
	await page
		.getByText("Crafting digital experiences that captivate and inspire.", {
			exact: false,
		})
		.waitFor();

	if (size.width < 768) {
		await page.getByRole("button", { name: "Menu" }).click();
		await page.getByRole("link", { name: "Projects" }).waitFor();
		await page.getByRole("link", { name: "Projects" }).click();
		if (
			await page.getByRole("link", { name: "Projects" }).isVisible().catch(() => false)
		) {
			failures.push(`${size.name}: mobile menu did not close`);
		}
	} else {
		await page.getByPlaceholder("Your email").fill("studio@example.com");
		await page.getByRole("button", { name: "Subscribe" }).click();
	}

	const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
	for (let top = 0; top < pageHeight; top += Math.round(size.height * 0.65)) {
		await page.evaluate((position) => window.scrollTo(0, position), top);
		await page.waitForTimeout(110);
	}
	await page.waitForTimeout(1600);
	const state = await page.evaluate(() => ({
		documentWidth: document.documentElement.scrollWidth,
		viewportWidth: document.documentElement.clientWidth,
		text: document.body.innerText,
		images: [...document.images].map((image) => ({
			src: image.currentSrc,
			complete: image.complete,
			width: image.naturalWidth,
			height: image.naturalHeight,
		})),
		fontLoaded: document.fonts.check('16px "Poppins"'),
	}));

	if (badResponses.length) failures.push(`${size.name}: ${badResponses.join(", ")}`);
	if (runtimeErrors.length) failures.push(`${size.name}: ${runtimeErrors.join(", ")}`);
	if (state.documentWidth > state.viewportWidth + 1) {
		failures.push(
			`${size.name}: horizontal overflow ${state.documentWidth}/${state.viewportWidth}`,
		);
	}
	if (!state.text.includes("Crafting digital experiences")) {
		failures.push(`${size.name}: hero content missing`);
	}
	if (!state.text.toLowerCase().includes("modern maintenance")) {
		failures.push(`${size.name}: final call to action missing`);
	}
	if (state.images.length < 20) {
		failures.push(`${size.name}: expected at least 20 images, found ${state.images.length}`);
	}
	for (const image of state.images) {
		if (!image.complete || image.width === 0 || image.height === 0) {
			failures.push(`${size.name}: image did not decode ${image.src}`);
		}
	}
	if (!state.fontLoaded) failures.push(`${size.name}: local Poppins font did not load`);

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
