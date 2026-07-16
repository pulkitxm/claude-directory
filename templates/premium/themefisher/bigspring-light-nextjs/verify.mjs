import fs from "node:fs";
import path from "node:path";
import { chromium } from "../../../../scripts/record-demos/node_modules/playwright/index.mjs";

const root = process.env.BIGSPRING_URL ?? "http://127.0.0.1:4174/templates/premium/themefisher/bigspring-light-nextjs";
const output = new URL("./.audit/verification/", import.meta.url);
const routes = [
	["index.html", 250],
	["blogs.html", 80],
	["blogs-blog-1.html", 250],
	["blogs-blog-2.html", 250],
	["blogs-blog-3.html", 250],
	["pricing.html", 80],
	["contact.html", 45],
	["faq.html", 120],
	["blogs/index.html", 80],
	["blogs/blog-1/index.html", 250],
	["blogs/blog-2/index.html", 250],
	["blogs/blog-3/index.html", 250],
	["pricing/index.html", 80],
	["contact/index.html", 45],
	["faq/index.html", 120],
];
const viewports = [
	["mobile", 390, 844],
	["tablet", 768, 1024],
	["desktop", 1280, 900],
];

fs.mkdirSync(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const results = [];

for (const [route, minimumWords] of routes) {
	for (const [viewport, width, height] of viewports) {
		const page = await browser.newPage({ viewport: { width, height } });
		const errors = [];
		page.on("console", (message) => {
			if (message.type() === "error") errors.push(message.text());
		});
		page.on("pageerror", (error) => errors.push(error.message));
		page.on("requestfailed", (request) => errors.push(`${request.url()} ${request.failure()?.errorText ?? "failed"}`));
		const response = await page.goto(`${root}/${route}`, { waitUntil: "networkidle" });
		await page.waitForTimeout(300);
		const metrics = await page.evaluate(() => ({
			documentWidth: document.documentElement.scrollWidth,
			viewportWidth: document.documentElement.clientWidth,
			words: document.body.innerText.trim().split(/\s+/).filter(Boolean).length,
			height: document.body.getBoundingClientRect().height,
			externalBase: Boolean(document.querySelector("base[href]")),
		}));
		const slug = route.replaceAll("/", "-").replace(".html", "");
		await page.screenshot({ path: path.join(output.pathname, `${slug}-${viewport}.png`), fullPage: true });
		results.push({ route, viewport, status: response?.status(), minimumWords, errors, ...metrics });
		await page.close();
	}
}

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto(`${root}/index.html`, { waitUntil: "networkidle" });
await mobile.locator(".nav-toggle").click();
const mobileMenu = await mobile.locator(".navbar-nav").evaluate((element) => element.classList.contains("open"));
const localStyles = await mobile.locator('link[rel="stylesheet"]').evaluateAll((elements) => elements.every((element) => new URL(element.href).origin === location.origin));
results.push({ interactions: { mobileMenu, localStyles } });
await browser.close();

fs.writeFileSync(new URL("results.json", output), `${JSON.stringify(results, null, 2)}\n`);
const failures = results.filter((result) => result.route && (result.status !== 200 || result.documentWidth > result.viewportWidth + 1 || result.words < result.minimumWords || result.height < 300 || result.externalBase || result.errors.length));
const interactionFailures = Object.entries(results.at(-1).interactions).filter(([, value]) => !value);

if (failures.length || interactionFailures.length) {
	console.error(JSON.stringify({ failures, interactionFailures }, null, 2));
	process.exit(1);
}

console.log(`Verified ${routes.length} routes across ${viewports.length} breakpoints and shared interactions.`);
