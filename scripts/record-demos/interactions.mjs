import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const URL = process.argv[2];
const OUT = process.argv[3];
const isLocal = /^https?:\/\/(localhost|127\.0\.0\.1)/i.test(URL);
const proxyUrl = process.env.HTTPS_PROXY || process.env.https_proxy;
const fullChromiumPath = "/opt/pw-browsers/chromium-1223/chrome-linux64/chrome";
const launchOpts =
	proxyUrl && !isLocal
		? {
				proxy: { server: proxyUrl },
				args: ["--ssl-version-max=tls1.2"],
				executablePath: fs.existsSync(fullChromiumPath)
					? fullChromiumPath
					: undefined,
			}
		: {};

fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch(launchOpts);
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1500);

const interactions = [];

async function snap(name) {
	await page.screenshot({
		path: path.join(OUT, `${name}.png`),
		fullPage: false,
	});
}

// 1. Theme switcher dropdown (System/Light/Dark)
try {
	await snap("theme-before");
	const themeBtn = page.locator('button:has-text("System")').first();
	await themeBtn.click({ timeout: 3000 });
	await page.waitForTimeout(400);
	await snap("theme-after");
	const opts = await page
		.locator("text=/^(Light|Dark|System)$/")
		.allTextContents();
	interactions.push({
		name: "theme-switcher",
		trigger: 'button:has-text("System")',
		delta: `Clicking the footer theme button opens a popup menu with options: ${JSON.stringify(opts)}. Before/after screenshots: theme-before.png / theme-after.png`,
	});
	await page.keyboard.press("Escape");
	await page.waitForTimeout(300);
} catch (e) {
	interactions.push({ name: "theme-switcher", error: e.message });
}

// 2. Search box click -> opens search modal (Pagefind/Flexsearch)
try {
	await snap("search-before");
	const searchBtn = page
		.locator('input[placeholder*="Search" i], button:has-text("Search")')
		.first();
	await searchBtn.click({ timeout: 3000 });
	await page.waitForTimeout(500);
	await snap("search-after");
	interactions.push({
		name: "search-modal",
		trigger: 'input[placeholder*="Search"]',
		delta:
			"Clicking the search box opens a modal dialog centered on screen with a search input and 'No results' / hint text, dimming the background. Before/after: search-before.png / search-after.png",
	});
	await page.keyboard.press("Escape");
	await page.waitForTimeout(300);
} catch (e) {
	interactions.push({ name: "search-modal", error: e.message });
}

// 3. Sidebar folder toggle (Advanced)
try {
	await snap("folder-before");
	const folderBtn = page.locator('text="Advanced (A Folder)"').first();
	await folderBtn.click({ timeout: 3000 });
	await page.waitForTimeout(400);
	await snap("folder-after");
	interactions.push({
		name: "sidebar-folder-toggle",
		trigger: 'text="Advanced (A Folder)"',
		delta:
			"Clicking the folder nav item toggles the chevron rotation and collapses/expands the 'Satori' child link beneath it. Before/after: folder-before.png / folder-after.png",
	});
	await folderBtn.click({ timeout: 3000 });
	await page.waitForTimeout(300);
} catch (e) {
	interactions.push({ name: "sidebar-folder-toggle", error: e.message });
}

// 4. Mobile hamburger menu
try {
	await page.setViewportSize({ width: 480, height: 900 });
	await page.waitForTimeout(500);
	await snap("mobile-before");
	const hamburger = page
		.locator('button[aria-label*="menu" i], button:has(svg)')
		.last();
	await hamburger.click({ timeout: 3000 });
	await page.waitForTimeout(500);
	await snap("mobile-after");
	interactions.push({
		name: "mobile-menu-toggle",
		trigger: "hamburger button (aria-label menu)",
		delta:
			"On narrow viewports the sidebar/topnav collapse behind a hamburger icon; clicking it slides/reveals the mobile nav overlay. Before/after: mobile-before.png / mobile-after.png",
	});
	await page.setViewportSize({ width: 1440, height: 900 });
} catch (e) {
	interactions.push({ name: "mobile-menu-toggle", error: e.message });
}

// 5. Nav link hover / active state already covered by scrape-ref states/

fs.writeFileSync(
	path.join(OUT, "interactions.json"),
	JSON.stringify(interactions, null, 2),
);
console.log("interactions captured:", interactions.length);
await browser.close();
