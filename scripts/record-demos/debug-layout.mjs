import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto("http://localhost:7891/index.html");
await page.waitForTimeout(2000);

// Check key elements
const elements = [
	".app-layout",
	".sidebar",
	".sidebar-scroll",
	".sidebar-bottom",
	".main-area",
	".chat-main",
	".chat-content-wrapper",
	".chat-welcome",
	".chat-welcome-title",
];

for (const sel of elements) {
	const el = page.locator(sel).first();
	const box = await el.boundingBox().catch(() => null);
	const visible = await el.isVisible().catch(() => false);
	const count = await page.locator(sel).count();
	console.log(
		`${sel}: count=${count} visible=${visible} box=${JSON.stringify(box)}`,
	);
}

// Check if biome reformatted and broke the HTML
const title = await page.title();
console.log("Title:", title);

await browser.close();
