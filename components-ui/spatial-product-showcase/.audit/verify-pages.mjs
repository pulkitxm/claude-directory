import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const base =
	process.argv[2] ??
	"http://127.0.0.1:4219/components-ui/spatial-product-showcase/";
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
	await page.waitForTimeout(1700);
	if ((await page.title()) !== "Spatial Product Showcase") throw new Error(`Bad title at ${width}`);
	if (!(await page.getByText("Spatial Anchor", { exact: true }).isVisible())) throw new Error(`Missing content at ${width}`);
	if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) throw new Error(`Overflow at ${width}`);

	const image = page.locator("main img").first();
	const imageState = await image.evaluate((element) => ({
		src: element.getAttribute("src"),
		width: element.naturalWidth,
	}));
	if (!imageState.src?.includes("./assets/left-earbud.png") || imageState.width === 0) throw new Error(`Broken left image at ${width}`);

	await page.getByRole("tab", { name: "Right" }).click();
	await page.getByText("Vocal Clarity", { exact: true }).waitFor();
	await page.waitForTimeout(600);
	const rightImage = await image.evaluate((element) => ({
		src: element.getAttribute("src"),
		width: element.naturalWidth,
	}));
	if (!rightImage.src?.includes("right-earbud.png") || rightImage.width === 0) throw new Error(`Broken right image at ${width}`);

	await page.getByRole("button", { name: "View Specs" }).click();
	const dialog = page.getByRole("dialog", { name: "Vocal Clarity specifications" });
	await dialog.waitFor();
	if (!(await dialog.getByText("Vocal Clarity Specs", { exact: true }).isVisible())) throw new Error(`Broken specs at ${width}`);
	await page.getByRole("button", { name: "Close specifications" }).click();
	await dialog.waitFor({ state: "hidden" });

	if (errors.length) throw new Error(`Browser errors at ${width}: ${errors.join(" | ")}`);
	if (failed.length) throw new Error(`Request failures at ${width}: ${failed.join(" | ")}`);
	await page.screenshot({
		path: new URL(`./screenshots/${width}.png`, import.meta.url).pathname,
		fullPage: true,
	});
	await page.close();
}

await browser.close();
console.log("Nested Pages verification passed at 390, 768, and 1280 pixels.");
