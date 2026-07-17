import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto("http://localhost:7891/index.html");
await page.waitForTimeout(1000);

// Get what the browser actually parsed
const domInfo = await page.evaluate(() => {
	const aside = document.querySelector("aside.sidebar");
	return {
		asideChildren: Array.from(aside.children).map(
			(c) => c.className + "|" + c.tagName,
		),
		asideParent: aside.parentElement?.className,
		bodyChildren: Array.from(document.body.children).map((c) => ({
			tag: c.tagName,
			cls: c.className,
			childCount: c.children.length,
		})),
		appLayoutChildren: Array.from(
			document.querySelector(".app-layout")?.children || [],
		).map((c) => c.className + "|" + c.tagName),
	};
});
console.log("DOM info:", JSON.stringify(domInfo, null, 2));

await browser.close();
