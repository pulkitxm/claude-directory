import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const base =
	process.argv[2] ??
	"http://127.0.0.1:4220/hero-sections/convix-pr-agency-hero/";
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
	await page.waitForTimeout(1200);
	if (!(await page.getByRole("heading", { name: /Shaping Agencies/ }).isVisible())) throw new Error(`Missing hero at ${width}`);
	if (!(await page.getByText("Convix Software", { exact: true }).isVisible())) throw new Error(`Missing brand at ${width}`);
	if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) throw new Error(`Overflow at ${width}`);

	const media = await page.locator("video").evaluate((video) => ({
		src: video.getAttribute("src"),
		poster: video.getAttribute("poster"),
		readyState: video.readyState,
		currentTime: video.currentTime,
		width: video.videoWidth,
	}));
	if (!media.src?.includes("./assets/") || !media.poster?.includes("./assets/")) throw new Error(`Bad media paths at ${width}`);
	if (media.readyState < 2 || media.width === 0) throw new Error(`Video did not decode at ${width}`);
	await page.waitForTimeout(500);
	const advancedTime = await page.locator("video").evaluate((video) => video.currentTime);
	if (advancedTime <= media.currentTime) throw new Error(`Video did not advance at ${width}`);

	if (width < 768) {
		const toggle = page.getByRole("button", { name: "Toggle menu" });
		await toggle.click();
		if (!(await page.getByRole("link", { name: "Features" }).isVisible())) throw new Error(`Mobile menu failed at ${width}`);
		await page.getByRole("link", { name: "Features" }).click();
		if ((await toggle.getAttribute("aria-expanded")) !== "false") throw new Error(`Mobile menu did not close at ${width}`);
	}

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
