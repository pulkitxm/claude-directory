import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "../../../../scripts/record-demos/node_modules/playwright/index.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));
const origin = process.argv[2] ?? "http://127.0.0.1:4173/templates/premium/themefisher/visionex-nextjs";
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
  await page.click('label[for="nav-toggle"]');
  return !(await page.locator("#nav-menu").evaluate((element) => element.classList.contains("hidden")));
});

await check("mobile pages dropdown", "/", { width: 390, height: 800 }, async (page) => {
  await page.click('label[for="nav-toggle"]');
  await page.click(".nav-dropdown > .nav-link");
  return !(await page.locator(".nav-dropdown-list").evaluate((element) => element.classList.contains("hidden")));
});

await check("writing workflow tab", "/", { width: 1280, height: 800 }, async (page) => {
  const button = page.getByRole("button", { name: "Describe Topic" });
  await button.click();
  return await button.evaluate((element) => element.classList.contains("bg-primary"));
});

await check("yearly pricing toggle", "/pricing/", { width: 1280, height: 800 }, async (page) => {
  await page.getByRole("button", { name: "Yearly" }).click();
  return (await page.locator("body").innerText()).includes("$199");
});

await check("FAQ accordion", "/faq/", { width: 1280, height: 800 }, async (page) => {
  const header = page.locator(".accordion-header").first();
  await header.click();
  return await header.evaluate((element) => element.closest(".accordion")?.classList.contains("active") ?? false);
});

await check("form local submission", "/contact-us/", { width: 1280, height: 800 }, async (page) => {
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
