import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto("http://localhost:7891/index.html");
await page.waitForTimeout(2000);

// Check computed styles
const sidebarStyles = await page.evaluate(() => {
	const sidebar = document.querySelector(".sidebar");
	const cs = window.getComputedStyle(sidebar);
	return {
		width: cs.width,
		height: cs.height,
		display: cs.display,
		flexDirection: cs.flexDirection,
		overflow: cs.overflow,
		position: cs.position,
		children: Array.from(sidebar.children).map((c) => ({
			className: c.className,
			height: window.getComputedStyle(c).height,
			flex: window.getComputedStyle(c).flex,
			minHeight: window.getComputedStyle(c).minHeight,
			overflow: window.getComputedStyle(c).overflowY,
		})),
	};
});
console.log("Sidebar:", JSON.stringify(sidebarStyles, null, 2));

// Also check main area
const mainStyles = await page.evaluate(() => {
	const main = document.querySelector(".main-area");
	if (!main) return "not found";
	const cs = window.getComputedStyle(main);
	return {
		width: cs.width,
		height: cs.height,
		flex: cs.flex,
		display: cs.display,
		parent: main.parentElement?.className,
		siblings: Array.from(main.parentElement?.children || []).map(
			(c) => c.className,
		),
	};
});
console.log("Main area:", JSON.stringify(mainStyles, null, 2));

await browser.close();
