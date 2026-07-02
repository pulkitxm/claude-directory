import { chromium } from "playwright";
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto("http://127.0.0.1:8123/index.html", { waitUntil: "networkidle" });
await page.waitForTimeout(800);
const SP = "/tmp/claude-0/-home-user-claude-directory/34ec75ae-94cc-5afe-9528-696ece355c03/scratchpad";
await page.click("#menuBtn");
await page.waitForTimeout(600);
await page.screenshot({ path: SP + "/clone-menu-fixed.png" });
// sticky check
await page.setViewportSize({ width: 1440, height: 900 });
await page.click("#closeMenuBtn");
await page.evaluate(() => window.scrollTo(0, 900));
await page.waitForTimeout(400);
const nav = await page.evaluate(() => {
  const el = document.querySelector(".navbar-wrapper");
  const r = el.getBoundingClientRect();
  return { pos: getComputedStyle(el).position, top: Math.round(r.top) };
});
console.log("navbar after scroll 900:", JSON.stringify(nav));
await browser.close();
