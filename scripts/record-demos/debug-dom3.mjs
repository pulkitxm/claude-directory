import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto("http://localhost:7891/index.html");
await page.waitForTimeout(1000);

// Check app-wrapper children
const info = await page.evaluate(() => {
	const wrapper = document.querySelector(".app-wrapper");
	return {
		wrapperChildren: Array.from(wrapper.children).map((c) => ({
			cls: c.className,
			tag: c.tagName,
			childClasses: Array.from(c.children).map(
				(cc) => cc.className + "|" + cc.tagName,
			),
		})),
		// Look for where sidebar-scroll's list items end up
		sidebarScrollChildren: Array.from(
			document.querySelector(".sidebar-scroll")?.children || [],
		).map((c) => c.className + "|" + c.tagName),
	};
});
console.log(JSON.stringify(info, null, 2));

await browser.close();
