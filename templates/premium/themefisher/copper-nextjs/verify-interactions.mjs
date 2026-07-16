import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "../../../../scripts/record-demos/node_modules/playwright/index.mjs";
const root = path.dirname(fileURLToPath(import.meta.url));
const origin = process.argv[2] ?? "http://127.0.0.1:4322/templates/premium/themefisher/copper-nextjs";
const browser = await chromium.launch();
const results = [];
async function check(interaction, route, viewport, action) {
  const page = await browser.newPage({ viewport });
  await page.goto(`${origin}${route}`, { waitUntil: "domcontentloaded" });
  let passed = false;
  try { passed = await action(page); } catch { passed = false; }
  results.push({ interaction, passed });
  await page.close();
}
await check("mobile navigation", "/", { width: 390, height: 800 }, async page => {
  await page.locator("#navToggler").click();
  return await page.locator("#navbar").evaluate(element => element.classList.contains("nav-open"));
});
await check("task tab", "/", { width: 1280, height: 800 }, async page => {
  const tab = page.locator(".tab-btn").nth(1);
  await tab.click();
  return await tab.evaluate(element => element.classList.contains("active"));
});
await check("FAQ accordion", "/faq.html", { width: 1280, height: 800 }, async page => {
  const item = page.locator(".accordion").first();
  await item.locator(".accordion-header").click();
  return await item.evaluate(element => element.classList.contains("active"));
});
await check("form local submission", "/contact.html", { width: 1280, height: 800 }, async page => {
  const url = page.url();
  await page.locator("form").first().evaluate(element => element.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })));
  await page.waitForTimeout(100);
  return page.url() === url;
});
await browser.close();
const summary = { tested: results.length, passed: results.filter(result => result.passed).length };
fs.mkdirSync(path.join(root, ".audit"), { recursive: true });
fs.writeFileSync(path.join(root, ".audit/interaction-verification.json"), `${JSON.stringify({ summary, results }, null, 2)}\n`);
console.log(`Verified ${summary.passed} of ${summary.tested} interactions`);
if (summary.passed !== summary.tested) process.exitCode = 1;
