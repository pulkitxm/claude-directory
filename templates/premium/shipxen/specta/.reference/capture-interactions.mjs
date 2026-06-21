import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const URL = process.argv[2] || "https://shipixen.com/demo/landing-page-templates/template/specta";
const OUT = process.argv[3] || "./home/states";
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, ignoreHTTPSErrors: true });
await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(2500);

const interactions = [];

async function snapClasses() {
  return await page.evaluate(() => ({
    htmlClass: document.documentElement.className,
    bodyBg: getComputedStyle(document.body).backgroundColor,
  }));
}

// 1. Theme toggle (dark -> light)
const before = await snapClasses();
await page.screenshot({ path: path.join(OUT, "theme-dark.png"), fullPage: false });
const toggle = await page.$('[aria-label="Toggle Dark Mode"]');
if (toggle) {
  await toggle.click({ force: true }).catch(()=>{});
  await page.waitForTimeout(800);
  const after = await snapClasses();
  await page.screenshot({ path: path.join(OUT, "theme-light.png"), fullPage: false });
  interactions.push({
    name: "theme-toggle",
    trigger: '[aria-label="Toggle Dark Mode"]',
    delta: { htmlClass: `${before.htmlClass} -> ${after.htmlClass}`, bodyBg: `${before.bodyBg} -> ${after.bodyBg}` },
    screenshots: ["theme-dark.png", "theme-light.png"],
  });
  // toggle back
  await toggle.click();
  await page.waitForTimeout(500);
}

// 2. Mobile menu (resize narrow)
await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(500);
const menuBtn = await page.$('[aria-label="Toggle Menu"]');
if (menuBtn) {
  await page.screenshot({ path: path.join(OUT, "mobile-closed.png") });
  const mb = await page.evaluate(() => document.body.innerText.length);
  await menuBtn.click({ force: true }).catch(()=>{});
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUT, "mobile-open.png") });
  const ma = await page.evaluate(() => document.body.innerText.length);
  interactions.push({
    name: "mobile-menu",
    trigger: '[aria-label="Toggle Menu"]',
    delta: { innerTextLen: `${mb} -> ${ma}` },
    screenshots: ["mobile-closed.png", "mobile-open.png"],
  });
}
await page.setViewportSize({ width: 1440, height: 900 });
await page.waitForTimeout(400);

// 3. Button hover (primary CTA)
const cta = await page.$('a:has-text("Start free today"), button:has-text("Start free today")');
if (cta) {
  await cta.scrollIntoViewIfNeeded();
  await cta.screenshot({ path: path.join(OUT, "cta-rest.png") }).catch(()=>{});
  await cta.hover().catch(()=>{});
  await page.waitForTimeout(400);
  await cta.screenshot({ path: path.join(OUT, "cta-hover.png") }).catch(()=>{});
  interactions.push({ name: "cta-hover", trigger: 'Start free today', screenshots: ["cta-rest.png", "cta-hover.png"] });
}

fs.writeFileSync(path.join(OUT, "interactions.json"), JSON.stringify(interactions, null, 2));
console.log("interactions captured:", interactions.map(i=>i.name).join(", "));
await browser.close();
