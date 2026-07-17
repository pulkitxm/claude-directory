import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
// work page project cards
await p.goto("http://localhost:8848/work.html", { waitUntil: "networkidle" });
for (let y = 0; y < 6000; y += 500) {
	await p.evaluate((_y) => window.scrollTo(0, _y), y);
	await p.waitForTimeout(40);
}
const workCards = await p.$$eval(
	'a[data-slot="card"] img[alt^="Project"]',
	(els) =>
		els.map((e) => ({
			alt: e.getAttribute("alt"),
			h: Math.round(e.getBoundingClientRect().height),
			loaded: e.complete && e.naturalWidth > 0,
		})),
);
console.log("WORK project imgs:", JSON.stringify(workCards));
// FAQ accordion on home
await p.goto("http://localhost:8848/index.html", { waitUntil: "networkidle" });
const faq = await p.$("[data-accordion-trigger]");
let before = 0,
	after = 0;
if (faq) {
	const item = await p.evaluateHandle(
		(t) => t.closest("[data-accordion-item]"),
		faq,
	);
	const content = await item.asElement().$("[data-accordion-content]");
	before = await content.evaluate((c) => c.getBoundingClientRect().height);
	await faq.click();
	await p.waitForTimeout(450);
	after = await content.evaluate((c) => c.getBoundingClientRect().height);
}
console.log("FAQ accordion height before/after click:", before, after);
// pricing tabs
await p.goto("http://localhost:8848/pricing.html", {
	waitUntil: "networkidle",
});
const trig = await p.$$("[data-tab-trigger]");
console.log("pricing tab triggers:", trig.length);
if (trig.length > 1) {
	const a0 = await trig[0].getAttribute("data-active");
	await trig[1].click();
	await p.waitForTimeout(200);
	const a1 = await trig[1].getAttribute("data-active");
	console.log("tab active switch:", a0, "->", a1);
}
// mobile nav
await p.setViewportSize({ width: 390, height: 800 });
await p.goto("http://localhost:8848/index.html", { waitUntil: "networkidle" });
const tog = await p.$("[data-nav-toggle]");
const menu = await p.$("[data-nav-menu]");
let mo = "n/a";
if (tog && menu) {
	await tog.click();
	await p.waitForTimeout(200);
	mo = await menu.getAttribute("data-open");
}
console.log("mobile nav toggle open state:", mo);
await b.close();
