import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:8848/index.html", { waitUntil: "networkidle" });
const trig = p.locator("[data-accordion-trigger]").first();
await trig.scrollIntoViewIfNeeded();
await p.waitForTimeout(200);
const item = p.locator("[data-accordion-item]").first();
const content = item.locator("[data-accordion-content]");
const before = await content.evaluate((c) => c.getBoundingClientRect().height);
await trig.click();
await p.waitForTimeout(450);
const after = await content.evaluate((c) => c.getBoundingClientRect().height);
console.log("FAQ height before/after:", before, after);
// pricing tabs
await p.goto("http://localhost:8848/pricing.html", {
	waitUntil: "networkidle",
});
const t = p.locator("[data-tab-trigger]");
const n = await t.count();
console.log("pricing tab triggers:", n);
if (n > 1) {
	await t.nth(1).scrollIntoViewIfNeeded();
	const a0 = await t.nth(0).getAttribute("data-active");
	await t.nth(1).click();
	await p.waitForTimeout(200);
	const a1 = await t.nth(1).getAttribute("data-active");
	console.log("tab switch nth0/nth1:", a0, "->", a1);
}
// mobile nav
await p.setViewportSize({ width: 390, height: 800 });
await p.goto("http://localhost:8848/index.html", { waitUntil: "networkidle" });
const tog = p.locator("[data-nav-toggle]");
const menu = p.locator("[data-nav-menu]");
if (await tog.count()) {
	await tog.first().click();
	await p.waitForTimeout(250);
	console.log("mobile nav open:", await menu.first().getAttribute("data-open"));
} else console.log("no nav toggle");
await b.close();
