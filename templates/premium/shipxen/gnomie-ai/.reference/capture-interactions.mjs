import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const URL = process.argv[2] || "https://shipixen.com/demo/landing-page-templates/template/gnomie-ai";
const OUT = process.argv[3] || path.resolve("home/states");
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, ignoreHTTPSErrors: true });
await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(2500);

const interactions = [];
const shot = async (name) => { await page.screenshot({ path: path.join(OUT, name) }); };
const snap = async () => page.evaluate(() => document.body.innerHTML.length);

async function record(label, trigger, fn) {
  try {
    const before = await snap();
    await fn();
    await page.waitForTimeout(600);
    const after = await snap();
    interactions.push({ label, trigger, before, after, delta: after - before });
    console.log("OK:", label, before, "->", after);
  } catch (e) {
    interactions.push({ label, trigger, error: e.message });
    console.log("ERR:", label, e.message);
  }
}

// 1. Theme toggle (dark mode)
await record("theme-toggle-dark", '[aria-label="Toggle Dark Mode"]', async () => {
  const btn = page.locator('[aria-label="Toggle Dark Mode"]').first();
  await btn.click();
  await page.waitForTimeout(500);
  await shot("theme-dark.png");
  const cls = await page.evaluate(() => document.documentElement.className);
  interactions.push({ note: "html class after dark toggle", cls });
});
// revert to light
await page.locator('[aria-label="Toggle Dark Mode"]').first().click().catch(()=>{});
await page.waitForTimeout(400);

// 2. Pricing toggle Monthly/Annually
await record("pricing-annually", 'Annually toggle', async () => {
  await page.getByText("Annually", { exact: true }).first().scrollIntoViewIfNeeded();
  await shot("pricing-monthly.png");
  await page.getByText("Annually", { exact: true }).first().click();
  await page.waitForTimeout(500);
  await shot("pricing-annually.png");
});

// 3. FAQ accordion open
await record("faq-open", 'first FAQ trigger', async () => {
  const faq = page.locator('[aria-expanded]').first();
  await faq.scrollIntoViewIfNeeded();
  await shot("faq-closed.png");
  await faq.click();
  await page.waitForTimeout(500);
  await shot("faq-open.png");
});

// 4. Carousel next
await record("carousel-next", 'Next slide button', async () => {
  const next = page.getByRole("button", { name: /Next slide/i }).first();
  await next.scrollIntoViewIfNeeded();
  await shot("carousel-before.png");
  await next.click();
  await page.waitForTimeout(700);
  await shot("carousel-after.png");
});

// 5. Mobile menu (resize)
await record("mobile-menu", 'Toggle Menu', async () => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  await shot("mobile-closed.png");
  const menu = page.locator('[aria-label="Toggle Menu"]').first();
  await menu.click();
  await page.waitForTimeout(500);
  await shot("mobile-open.png");
});

fs.writeFileSync(path.join(OUT, "interactions.json"), JSON.stringify(interactions, null, 2));
console.log("done");
await browser.close();
