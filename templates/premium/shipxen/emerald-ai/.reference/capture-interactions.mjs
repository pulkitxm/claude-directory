import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const URL = process.argv[2];
const OUT = process.argv[3];
fs.mkdirSync(path.join(OUT, "states"), { recursive: true });
const browser = await chromium.launch({ args: ["--ignore-certificate-errors"] });
const page = await browser.newPage({
	viewport: { width: 1440, height: 900 },
	ignoreHTTPSErrors: true,
});
await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(2500);

const interactions = [];

async function snapHover(name, selector) {
	const el = page.locator(selector).first();
	if ((await el.count()) === 0) return;
	await el.scrollIntoViewIfNeeded().catch(() => {});
	await page.waitForTimeout(200);
	const box = await el.boundingBox().catch(() => null);
	if (!box) return;
	await page.mouse.move(1, 1);
	await page.waitForTimeout(150);
	const rest = path.join(OUT, "states", `${name}-rest.png`);
	await el.screenshot({ path: rest }).catch(() => {});
	await el.hover().catch(() => {});
	await page.waitForTimeout(350);
	const hover = path.join(OUT, "states", `${name}-hover.png`);
	await el.screenshot({ path: hover }).catch(() => {});
	const cls = await el.getAttribute("class").catch(() => "");
	interactions.push({ name, type: "hover", selector, rest, hover, classAtRest: cls });
	await page.mouse.move(1, 1);
	await page.waitForTimeout(150);
}

// Header behavior on scroll
const headerRestClass = await page
	.locator("header, nav")
	.first()
	.getAttribute("class")
	.catch(() => "");
await page.evaluate(() => window.scrollTo(0, 600));
await page.waitForTimeout(500);
const headerScrollClass = await page
	.locator("header, nav")
	.first()
	.getAttribute("class")
	.catch(() => "");
interactions.push({
	name: "header-scroll",
	type: "scroll",
	delta: { headerRestClass, headerScrollClass, changed: headerRestClass !== headerScrollClass },
});
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(400);

await snapHover("nav-link", "header a, nav a");
await snapHover("cta-primary", "a:has-text('Buy Now')");
await snapHover("cta-learn", "button:has-text('Learn More')");
await snapHover("cta-get-shipixen", "a:has-text('Get Shipixen')");
await snapHover("trynow", "a:has-text('Try now for free')");
await snapHover("feature-card", ".grid h3");
await snapHover("testimonial-card", "[data-sentry-component] a:has-text('After using')");

fs.writeFileSync(
	path.join(OUT, "states", "interactions.json"),
	JSON.stringify(interactions, null, 2),
);
console.log("captured", interactions.length, "interactions");
await browser.close();
