import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const output = new URL("./local/", import.meta.url);
fs.mkdirSync(output, { recursive: true });

const browser = await chromium.launch({ headless: true });
const results = [];

for (const width of [390, 768, 1280]) {
	const page = await browser.newPage({ viewport: { width, height: 900 } });
	const badResponses = [];
	const errors = [];
	page.on("response", (response) => {
		if (response.status() >= 400) {
			badResponses.push(`${response.status()} ${response.url()}`);
		}
	});
	page.on("pageerror", (error) => errors.push(String(error)));
	page.on("console", (message) => {
		if (message.type() === "error") errors.push(message.text());
	});
	const response = await page.goto(
		"http://127.0.0.1:4200/ui-design/botanical-organic-serif/",
		{ waitUntil: "networkidle" },
	);
	await page.evaluate(() => {
		for (const image of document.images) image.loading = "eager";
	});
	await page.waitForFunction(() =>
		Array.from(document.images).every((image) => image.complete),
	);
	for (const selector of [
		"#rituals",
		"#atelier",
		"#garden",
		"#pricing",
		"#journal",
		"footer",
	]) {
		await page.locator(selector).scrollIntoViewIfNeeded();
		await page.waitForTimeout(250);
	}
	await page.evaluate(() => {
		document.documentElement.style.scrollBehavior = "auto";
		window.scrollTo(0, 0);
	});
	await page.waitForTimeout(300);
	const state = await page.evaluate(() => {
		const images = Array.from(document.images);
		return {
			images: images.length,
			brokenImages: images.filter((image) => image.naturalWidth === 0).map((image) => image.src),
			overflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
			sections: ["top", "rituals", "atelier", "garden", "pricing", "journal"].filter(
				(id) => document.getElementById(id),
			),
			fonts: {
				playfair: document.fonts.check('600 16px "Playfair Display"'),
				sourceSans: document.fonts.check('400 16px "Source Sans 3"'),
			},
		};
	});
	if (width === 390) {
		await page.getByRole("button", { name: "Open menu" }).click();
		await page.waitForTimeout(300);
		state.mobileMenuOpen = await page.getByRole("navigation", { name: "Mobile" }).isVisible();
		await page.getByRole("button", { name: "Close menu" }).click();
	}
	await page.getByRole("button", { name: /Can I pause/ }).click();
	state.faqOpen =
		(await page.getByRole("button", { name: /Can I pause/ }).getAttribute("aria-expanded")) === "true";
	await page.getByPlaceholder("you@home.com").fill("garden@example.com");
	await page.getByRole("button", { name: /Subscribe/ }).click();
	state.newsletterConfirmed = await page.getByText(/You're on the list/).isVisible();
	await page.evaluate(() => {
		document.documentElement.style.scrollBehavior = "auto";
		window.scrollTo(0, 0);
	});
	await page.waitForTimeout(300);
	await page.screenshot({
		path: fileURLToPath(new URL(`${width}.png`, output)),
	});
	results.push({
		width,
		status: response?.status(),
		badResponses,
		errors,
		...state,
	});
	await page.close();
}

await browser.close();
fs.writeFileSync(new URL("verification.json", output), `${JSON.stringify(results, null, 2)}\n`);
console.log(JSON.stringify(results, null, 2));
