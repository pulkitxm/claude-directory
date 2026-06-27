import fs from "node:fs";
import { chromium } from "playwright";

const URL = process.argv[2];
const OUT = process.argv[3];
const FRAME = process.argv[4] === "frame"; // if true, page is inside preview iframe (use direct url instead)
fs.mkdirSync(OUT + "/responsive", { recursive: true });
fs.mkdirSync(OUT + "/states", { recursive: true });

const browser = await chromium.launch();

async function shoot(width, height, theme, file) {
	const ctx = await browser.newContext({
		viewport: { width, height },
		colorScheme: theme,
	});
	const page = await ctx.newPage();
	await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
	await page.waitForTimeout(1500);
	// force theme class for sites using class strategy
	await page.evaluate((t) => {
		const el = document.documentElement;
		if (t === "dark") {
			el.classList.add("dark");
			el.classList.remove("light");
			el.setAttribute("data-theme", "dark");
		} else {
			el.classList.add("light");
			el.classList.remove("dark");
			el.setAttribute("data-theme", "light");
		}
	}, theme);
	await page.waitForTimeout(800);
	await page.screenshot({ path: file, fullPage: false });
	await ctx.close();
}

// responsive (default/light)
await shoot(390, 844, "light", OUT + "/responsive/mobile.png");
await shoot(768, 1024, "light", OUT + "/responsive/tablet.png");
await shoot(1280, 900, "light", OUT + "/responsive/desktop.png");
// themes (desktop)
await shoot(1280, 900, "light", OUT + "/states/theme-light.png");
await shoot(1280, 900, "dark", OUT + "/states/theme-dark.png");

await browser.close();
console.log("captured", OUT);
