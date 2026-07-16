import playwright from "/Volumes/Sandisk SSD/codingAndFun/samaan/fable/scripts/record-demos/node_modules/playwright/index.js";

const { chromium } = playwright;
const base = process.env.VERIFY_URL || "http://127.0.0.1:4183/templates/premium/shadcnblocks/sonic/";
const routes = [
	"index.html",
	"about.html",
	"blog.html",
	"contact.html",
	"pricing.html",
	"privacy-policy.html",
	"product.html",
	"specifications.html",
	"terms-of-service.html",
	"blog/dolby-atmos-and-beyond.html",
	"blog/eco-friendly-audio-solutions.html",
	"blog/right-speaker-for-you.html",
	"blog/the-evolution-of-speakers.html",
	"blog/why-size-and-shape-matter.html",
	"blog/wireless-speakers.html",
];
const widths = [390, 768, 1280];
const failures = [];
const browser = await chromium.launch();

for (const width of widths) {
	for (const route of routes) {
		const page = await browser.newPage({ viewport: { width, height: 900 } });
		const errors = [];
		const badResponses = [];
		page.on("console", (message) => {
			if (message.type() === "error") errors.push(message.text());
		});
		page.on("pageerror", (error) => errors.push(error.message));
		page.on("response", (response) => {
			if (response.status() >= 400) badResponses.push(`${response.status()} ${response.url()}`);
		});
		await page.goto(new URL(route, base).href, { waitUntil: "networkidle", timeout: 60000 });
		await page.evaluate(async () => {
			for (const image of document.images) {
				image.loading = "eager";
				if (!image.complete) image.src = image.src;
			}
			for (let y = 0; y < document.body.scrollHeight; y += Math.max(500, window.innerHeight * 0.8)) {
				window.scrollTo(0, y);
				await new Promise((resolve) => setTimeout(resolve, 80));
			}
			window.scrollTo(0, 0);
			await Promise.all(Array.from(document.images).map((image) => image.decode().catch(() => null)));
		});
		await page.waitForTimeout(300);
		const state = await page.evaluate(() => ({
			main: Boolean(document.querySelector("main")),
			content: document.body.innerText.trim().length,
			brokenImages: Array.from(document.images).filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.src),
			overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
		}));
		if (!state.main || state.content < 80) failures.push(`${width} ${route}: content missing`);
		if (state.brokenImages.length) failures.push(`${width} ${route}: broken images ${state.brokenImages.join(", ")}`);
		if (state.overflow) failures.push(`${width} ${route}: horizontal overflow`);
		if (errors.length) failures.push(`${width} ${route}: console ${errors.join(" | ")}`);
		if (badResponses.length) failures.push(`${width} ${route}: responses ${badResponses.join(" | ")}`);
		await page.close();
	}
}

const interactionPage = await browser.newPage({ viewport: { width: 390, height: 900 } });
await interactionPage.goto(new URL("index.html", base).href, { waitUntil: "networkidle" });
const menu = interactionPage.getByText("Open main menu").locator("..");
await menu.click();
if ((await menu.getAttribute("aria-expanded")) !== "true") failures.push("mobile menu did not open");
await interactionPage.keyboard.press("Escape");
if ((await menu.getAttribute("aria-expanded")) !== "false") failures.push("mobile menu did not close");
const theme = interactionPage.locator('[data-theme-toggle="true"]:visible').first();
await theme.click();
if (!(await interactionPage.locator("html").evaluate((element) => element.classList.contains("dark")))) failures.push("theme did not switch");
await interactionPage.close();

const productPage = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await productPage.goto(new URL("product.html", base).href, { waitUntil: "networkidle" });
const accordion = productPage.locator('button[data-slot="accordion-trigger"]').nth(1);
if (await accordion.count()) {
	await accordion.click();
	if ((await accordion.getAttribute("aria-expanded")) !== "true") failures.push("accordion did not open");
}
await productPage.close();

const contactPage = await browser.newPage({ viewport: { width: 768, height: 900 } });
await contactPage.goto(new URL("contact.html", base).href, { waitUntil: "networkidle" });
const checkbox = contactPage.locator('button[role="checkbox"]').first();
if (await checkbox.count()) {
	await checkbox.click();
	if ((await checkbox.getAttribute("aria-checked")) !== "true") failures.push("contact checkbox did not change");
}
await contactPage.close();

await browser.close();

if (failures.length) {
	console.error(failures.join("\n"));
	process.exit(1);
}

console.log(`Verified ${routes.length} Sonic routes at ${widths.length} widths`);
