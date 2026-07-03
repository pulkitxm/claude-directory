import { chromium } from "playwright";

const browser = await chromium.launch({
	executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

// Theme toggle
await page.goto("http://localhost:8811/index.html", {
	waitUntil: "networkidle",
});
let bodyClass = await page.evaluate(() => document.body.className);
console.log("theme before:", bodyClass);
await page.click("[data-theme-toggle]");
await page.waitForTimeout(300);
bodyClass = await page.evaluate(() => document.body.className);
console.log("theme after click:", bodyClass);
const stored = await page.evaluate(() => localStorage.getItem("nextColorMode"));
console.log("localStorage nextColorMode:", stored);
// reload to verify persistence
await page.reload({ waitUntil: "networkidle" });
bodyClass = await page.evaluate(() => document.body.className);
console.log("theme after reload:", bodyClass);

// Mobile menu drawer
await page.setViewportSize({ width: 480, height: 900 });
await page.waitForTimeout(200);
await page.click("[data-drawer-open]");
await page.waitForTimeout(400);
let drawerClass = await page.evaluate(
	() => document.querySelector(".my-drawer").className,
);
console.log("drawer after open:", drawerClass);
await page.click("[data-drawer-close]");
await page.waitForTimeout(400);
drawerClass = await page.evaluate(
	() => document.querySelector(".my-drawer").className,
);
console.log("drawer after close:", drawerClass);
await page.setViewportSize({ width: 1440, height: 900 });

// FAQ accordion on pricing
await page.goto("http://localhost:8811/pricing.html", {
	waitUntil: "networkidle",
});
let panelHeight = await page.evaluate(
	() => document.querySelector("[data-accordion-panel]").style.height,
);
console.log("faq panel height before:", panelHeight || "(unset)");
await page.click("[data-accordion-trigger]");
await page.waitForTimeout(400);
panelHeight = await page.evaluate(
	() => document.querySelector("[data-accordion-panel]").offsetHeight,
);
console.log("faq panel height after click:", panelHeight);

// Hover state on a button
await page.goto("http://localhost:8811/index.html", {
	waitUntil: "networkidle",
});
const btn = await page.$(".hero-actions .btn");
const before = await btn.evaluate((el) => getComputedStyle(el).transform);
await btn.hover();
await page.waitForTimeout(400);
const after = await btn.evaluate((el) => getComputedStyle(el).transform);
console.log("btn transform before hover:", before, "| after hover:", after);

await browser.close();
