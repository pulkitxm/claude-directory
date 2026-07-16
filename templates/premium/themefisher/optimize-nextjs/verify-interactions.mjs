import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "../../../../scripts/record-demos/node_modules/playwright/index.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));
const base = "http://127.0.0.1:4173/templates/premium/themefisher/optimize-nextjs";
const browser = await chromium.launch({ headless: true });
const results = [];

async function check(name, action) {
  try {
    await action();
    results.push({ interaction: name, passed: true });
  } catch (error) {
    results.push({ error: error.message, interaction: name, passed: false });
  }
}

const mobile = await browser.newPage({ viewport: { width: 390, height: 900 } });
mobile.setDefaultTimeout(5000);
await mobile.goto(`${base}/`, { waitUntil: "networkidle" });
await check("Mobile navigation opens and closes", async () => {
  const toggle = mobile.locator('label[for="nav-toggle"]');
  await toggle.click();
  if (!(await mobile.locator("#nav-menu").isVisible())) throw new Error("menu did not open");
  await toggle.evaluate((element) => element.click());
  if (await mobile.locator("#nav-menu").isVisible()) throw new Error("menu did not close");
});

const desktop = await browser.newPage({ viewport: { width: 1280, height: 900 } });
desktop.setDefaultTimeout(5000);
await desktop.goto(`${base}/`, { waitUntil: "networkidle" });
await check("Desktop page dropdown opens on hover", async () => {
  await desktop.locator(".nav-dropdown").hover();
  if (!(await desktop.locator(".nav-dropdown-list").isVisible())) throw new Error("dropdown stayed hidden");
});
await check("Testimonial slider advances and returns", async () => {
  const wrapper = desktop.locator(".swiper-wrapper").first();
  const initial = await wrapper.evaluate((element) => element.style.transform);
  await desktop.locator(".swiper-button-next").first().click();
  const advanced = await wrapper.evaluate((element) => element.style.transform);
  if (advanced === initial) throw new Error("slider did not advance");
  await desktop.locator(".swiper-button-prev").first().click();
  const returned = await wrapper.evaluate((element) => element.style.transform);
  if (returned === advanced) throw new Error("slider did not return");
});

await desktop.goto(`${base}/pricing/`, { waitUntil: "networkidle" });
await check("Yearly pricing toggle updates values", async () => {
  const price = desktop.locator(".data-count").first();
  const monthly = await price.textContent();
  await desktop.locator('label[for="pricing-switch"]').click();
  const yearly = await price.textContent();
  if (monthly === yearly) throw new Error("price did not change");
});
await check("Pricing FAQ expands and collapses", async () => {
  const header = desktop.locator(".accordion-header").first();
  const accordion = desktop.locator(".accordion").first();
  await header.click();
  if (!(await accordion.evaluate((element) => element.classList.contains("active")))) throw new Error("FAQ did not expand");
  await header.click();
  if (await accordion.evaluate((element) => element.classList.contains("active"))) throw new Error("FAQ did not collapse");
});

await desktop.goto(`${base}/blog/`, { waitUntil: "networkidle" });
await check("Blog search opens, filters, and closes", async () => {
  await desktop.locator("[data-search-trigger]").click();
  const modal = desktop.locator("#searchModal");
  if (!(await modal.isVisible())) throw new Error("search did not open");
  await desktop.locator("#searchInput").fill("employee engagement");
  if ((await desktop.locator(".search-wrapper-body a").count()) === 0) throw new Error("search returned no match");
  await desktop.keyboard.press("Escape");
  if (await modal.isVisible()) throw new Error("search did not close");
});

await desktop.goto(`${base}/contact/`, { waitUntil: "networkidle" });
await check("Contact form submission stays local", async () => {
  const before = desktop.url();
  await desktop.locator("form").first().evaluate((form) => form.dispatchEvent(new Event("submit", { cancelable: true })));
  if (desktop.url() !== before) throw new Error("form navigated away");
});

await browser.close();

const report = {
  results,
  summary: { passed: results.filter((result) => result.passed).length, total: results.length },
};
fs.writeFileSync(path.join(root, ".audit", "interaction-verification.json"), JSON.stringify(report, null, 2));
console.log(`Verified ${report.summary.passed} of ${report.summary.total} interactions`);
if (report.summary.passed !== report.summary.total) process.exit(1);
