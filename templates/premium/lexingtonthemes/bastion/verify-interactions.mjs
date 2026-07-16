import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "../../../../scripts/record-demos/node_modules/playwright/index.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));
const origin =
	process.argv[2] ??
	"http://127.0.0.1:4346/templates/premium/lexingtonthemes/bastion";
const browser = await chromium.launch();
const results = [];

async function check(interaction, route, viewport, action) {
	const page = await browser.newPage({ viewport });
	await page.route("**/*", (routeRequest) => {
		if (routeRequest.request().resourceType() === "media") {
			routeRequest.abort();
		} else {
			routeRequest.continue();
		}
	});
	await page.goto(`${origin}${route}`, { waitUntil: "domcontentloaded" });
	let passed = false;
	try {
		passed = await action(page);
	} catch {
		passed = false;
	}
	results.push({ interaction, passed });
	await page.close();
}

await check("mobile menu", "/", { width: 390, height: 800 }, async (page) => {
	await page.locator("#mobile-menu-toggle").click();
	const menu = page.locator("#mobile-menu");
	const opened =
		(await menu.getAttribute("aria-hidden")) === "false" &&
		(await menu.evaluate((element) => element.classList.contains("is-open")));
	await page.keyboard.press("Escape");
	const closed = (await menu.getAttribute("aria-hidden")) === "true";
	return opened && closed;
});
await check("search", "/", { width: 1280, height: 800 }, async (page) => {
	await page.locator("#search-toggle").click();
	await page.locator("#search-input").fill("project");
	const modal = page.locator("#search-modal");
	const opened = await modal.evaluate((element) =>
		element.classList.contains("is-open"),
	);
	const resultCount = await page.locator("#search-results a").count();
	await page.keyboard.press("Escape");
	const closed = await modal.evaluate(
		(element) => !element.classList.contains("is-open"),
	);
	return opened && resultCount > 0 && closed;
});
await check("scrolling navigation", "/", { width: 1280, height: 800 }, async (page) => {
	await page.evaluate(() => scrollTo(0, 200));
	await page.waitForTimeout(100);
	return await page
		.locator("#site-nav")
		.evaluate((element) => element.classList.contains("site-nav--scrolled"));
});
await check("testimonial carousel", "/", { width: 1280, height: 800 }, async (page) => {
	const slide = page.locator("#testimonials-slider .keen-slider__slide").first();
	await page.waitForTimeout(200);
	const before = await slide.evaluate((element) => element.style.transform);
	await page.locator("#testimonials-next").click();
	await page.waitForTimeout(600);
	const after = await slide.evaluate((element) => element.style.transform);
	return before !== after;
});
await check("career disclosure", "/careers.html", { width: 390, height: 800 }, async (page) => {
	const item = page.locator("details").first();
	await item.locator("summary").click();
	return await item.evaluate((element) => element.open);
});

await browser.close();
const media = fs.statSync(path.join(root, "assets/night.mp4"));
results.push({ interaction: "local hero media", passed: media.size > 1_000_000 });
const summary = {
	tested: results.length,
	passed: results.filter((result) => result.passed).length,
};
fs.mkdirSync(path.join(root, ".audit"), { recursive: true });
fs.writeFileSync(
	path.join(root, ".audit/interaction-verification.json"),
	`${JSON.stringify({ summary, results }, null, "\t")}\n`,
);
console.log(`Verified ${summary.passed} of ${summary.tested} interactions`);
if (summary.passed !== summary.tested) process.exitCode = 1;
