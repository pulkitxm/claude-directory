import { mkdir } from "node:fs/promises";
import { chromium } from "../../../scripts/record-demos/node_modules/playwright/index.mjs";

const base =
	process.argv[2] ??
	"http://127.0.0.1:4221/landing-pages/fernhollow-pet-wellness-h68/";
const widths = [390, 768, 1280];
const browser = await chromium.launch();

await mkdir(new URL("./screenshots/", import.meta.url), { recursive: true });

for (const width of widths) {
	const page = await browser.newPage({ viewport: { width, height: width === 390 ? 844 : 900 } });
	const errors = [];
	const failed = [];
	page.on("console", (message) => {
		if (message.type() === "error") errors.push(message.text());
	});
	page.on("pageerror", (error) => errors.push(String(error)));
	page.on("requestfailed", (request) => failed.push(request.url()));
	page.on("response", (response) => {
		if (response.status() >= 400) failed.push(`${response.status()} ${response.url()}`);
	});

	await page.goto(base, { waitUntil: "networkidle" });
	await page.waitForTimeout(700);
	if (!(await page.getByRole("heading", { name: /Where modern science/ }).isVisible())) throw new Error(`Missing hero at ${width}`);
	if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) throw new Error(`Overflow at ${width}`);

	const heroImages = await page.locator(".marquee img").evaluateAll((images) =>
		images.map((image) => ({
			src: image.getAttribute("src"),
			width: image.naturalWidth,
			loading: image.getAttribute("loading"),
		})),
	);
	if (heroImages.length !== 10 || heroImages.some((image) => image.width === 0 || image.loading !== "eager")) throw new Error(`Broken marquee images at ${width}`);

	if (width < 768) {
		const burger = page.getByRole("button", { name: "Open menu" });
		await burger.click();
		if ((await burger.getAttribute("aria-expanded")) !== "true") throw new Error(`Menu failed at ${width}`);
		await page.getByRole("button", { name: "Close menu" }).click();
		if ((await burger.getAttribute("aria-expanded")) !== "false") throw new Error(`Menu did not close at ${width}`);
	}

	await page.locator(".faq").scrollIntoViewIfNeeded();
	const secondAnswer = page.locator(".acc").nth(1).locator(".acc__a");
	await page.locator(".acc__q").nth(1).click();
	await page.waitForTimeout(350);
	if ((await secondAnswer.evaluate((element) => Number.parseFloat(getComputedStyle(element).maxHeight))) <= 0) throw new Error(`Accordion failed at ${width}`);

	await page.locator("#newsletter input").fill("hello@example.com");
	await page.locator("#newsletter").evaluate((form) => form.requestSubmit());
	if (!(await page.locator("#ctaSuccess").isVisible())) throw new Error(`Newsletter failed at ${width}`);

	await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
	await page.waitForTimeout(900);
	const images = await page.locator("img").evaluateAll((elements) =>
		elements.map((image) => ({ src: image.currentSrc || image.src, width: image.naturalWidth })),
	);
	if (images.some((image) => image.width === 0)) throw new Error(`Broken image at ${width}: ${images.filter((image) => image.width === 0).map((image) => image.src).join(" | ")}`);
	if (!(await page.evaluate(() => document.fonts.check("16px Fraunces") && document.fonts.check("16px 'Inter Tight'")))) throw new Error(`Fonts failed at ${width}`);
	if (errors.length) throw new Error(`Browser errors at ${width}: ${errors.join(" | ")}`);
	if (failed.length) throw new Error(`Request failures at ${width}: ${failed.join(" | ")}`);

	await page.goto(base, { waitUntil: "networkidle" });
	await page.waitForTimeout(700);
	await page.screenshot({
		path: new URL(`./screenshots/${width}.png`, import.meta.url).pathname,
		fullPage: false,
	});
	await page.close();
}

await browser.close();
console.log("Nested Pages verification passed at 390, 768, and 1280 pixels.");
