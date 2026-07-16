import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "../../../../scripts/record-demos/node_modules/playwright/index.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));
const origin = process.argv[2] ?? "http://127.0.0.1:4173/templates/premium/themefisher/atemp-nextjs";
const browser = await chromium.launch();
const results = [];

async function check(interaction, route, viewport, action) {
  const page = await browser.newPage({ viewport });
  await page.goto(`${origin}${route}`, { waitUntil: "domcontentloaded" });
  let passed = false;
  try {
    passed = await action(page);
  } catch {
    passed = false;
  }
  results.push({ interaction, passed });
  await page.close();
}

await check("mobile navigation toggle", "/", { width: 390, height: 800 }, async (page) => {
  await page.locator('label[for="nav-toggle"]').last().click();
  return await page.locator("#nav-toggle").isChecked() && await page.locator("#nav-menu").isVisible();
});

await check("announcement close", "/", { width: 1280, height: 800 }, async (page) => {
  await page.click("#close-header-learn-more");
  return await page.locator("#close-header-parent").isHidden();
});

await check("pricing yearly tab", "/pricing.html", { width: 1280, height: 800 }, async (page) => {
  await page.locator(".c-tab-nav-item").nth(1).click();
  return (await page.locator("body").innerText()).includes("$250");
});

await check("FAQ accordion", "/pricing.html", { width: 1280, height: 800 }, async (page) => {
  const header = page.locator(".accordion-header").first();
  await header.click();
  return await header.evaluate((element) => element.closest(".accordion")?.classList.contains("active") ?? false);
});

await check("video modal", "/", { width: 1280, height: 800 }, async (page) => {
  await page.getByRole("button", { name: "Play Video" }).click();
  return await page.locator(".modal").isVisible();
});

await check("form local submission", "/contact.html", { width: 1280, height: 800 }, async (page) => {
  await page.fill("#name", "Taylor Morgan");
  await page.fill("#phone", "+1 555 0100");
  await page.fill("#email", "taylor@example.com");
  await page.fill("#your-message", "Please share more details.");
  const url = page.url();
  await page.locator('button[type="submit"]').first().click();
  await page.waitForTimeout(100);
  return page.url() === url;
});

await browser.close();
const summary = { tested: results.length, passed: results.filter((result) => result.passed).length };
fs.mkdirSync(path.join(root, ".audit"), { recursive: true });
fs.writeFileSync(path.join(root, ".audit/interaction-verification.json"), `${JSON.stringify({ summary, results }, null, 2)}\n`);
console.log(`Verified ${summary.passed} of ${summary.tested} interactions`);
if (summary.passed !== summary.tested) process.exitCode = 1;
