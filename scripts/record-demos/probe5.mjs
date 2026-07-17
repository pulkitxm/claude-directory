import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:8848/index.html", { waitUntil: "networkidle" });
// find a visible FAQ trigger by question text
const trig = p.locator("[data-accordion-trigger]:visible").last();
await trig.scrollIntoViewIfNeeded();
await p.waitForTimeout(150);
const txt = (await trig.innerText()).slice(0, 50);
const item = p
	.locator("[data-accordion-item]", {
		has: p.locator("[data-accordion-trigger]"),
	})
	.filter({ hasText: txt.slice(0, 20) })
	.first();
const content = item.locator("[data-accordion-content]").first();
const before = await content
	.evaluate((c) => c.getBoundingClientRect().height)
	.catch(() => "?");
await trig.click();
await p.waitForTimeout(450);
const after = await content
	.evaluate((c) => c.getBoundingClientRect().height)
	.catch(() => "?");
console.log("FAQ trigger:", JSON.stringify(txt), "height", before, "->", after);
// pricing tabs (target visible)
await p.goto("http://localhost:8848/pricing.html", {
	waitUntil: "networkidle",
});
const t = p.locator("[data-tab-trigger]:visible");
const n = await t.count();
let res = "n/a";
if (n > 1) {
	const a0 = await t.nth(0).getAttribute("data-active");
	await t.nth(1).click();
	await p.waitForTimeout(200);
	res = a0 + "->" + (await t.nth(1).getAttribute("data-active"));
}
console.log("pricing visible tabs:", n, "switch:", res);
// mobile nav
await p.setViewportSize({ width: 390, height: 800 });
await p.goto("http://localhost:8848/index.html", { waitUntil: "networkidle" });
const tog = p.locator("[data-nav-toggle]:visible").first();
await tog.click();
await p.waitForTimeout(250);
console.log(
	"mobile nav open:",
	await p.locator("[data-nav-menu]").first().getAttribute("data-open"),
);
await b.close();
