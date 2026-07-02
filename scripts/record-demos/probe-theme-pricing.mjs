import fs from "node:fs";
import { chromium } from "playwright";
const legacy = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const launchOpts = { args: ["--ignore-certificate-errors", "--ssl-version-max=tls1.2"], executablePath: fs.existsSync(legacy) ? legacy : undefined };
const proxyUrl = process.env.PW_PROXY || process.env.HTTPS_PROXY;
if (proxyUrl) launchOpts.args.push(`--proxy-server=${proxyUrl}`);
const browser = await chromium.launch(launchOpts);
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("https://agenforce-marketing-template.vercel.app/pricing", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(2000);
const SP = "/tmp/claude-0/-home-user-claude-directory/34ec75ae-94cc-5afe-9528-696ece355c03/scratchpad";
// navbar info at top and after scroll
const navInfo = await page.evaluate(() => {
  const out = [];
  for (const el of document.querySelectorAll("body *")) {
    const cs = getComputedStyle(el);
    if ((cs.position === "fixed" || cs.position === "sticky") && el.getBoundingClientRect().width > 800) {
      out.push({ tag: el.tagName, cls: el.className?.toString?.().slice(0, 200), pos: cs.position, top: cs.top, z: cs.zIndex, h: Math.round(el.getBoundingClientRect().height) });
    }
  }
  return out;
});
console.log("fixed/sticky wide elements:", JSON.stringify(navInfo, null, 1));
// find nav container class (element containing the 'Features' nav link at top)
const navCls = await page.evaluate(() => {
  const a = [...document.querySelectorAll("a")].find((x) => x.textContent.trim() === "Features" && x.getBoundingClientRect().y < 100);
  if (!a) return null;
  const chain = [];
  let el = a;
  for (let i = 0; i < 5 && el; i++) { chain.push({ tag: el.tagName, cls: el.className?.toString?.().slice(0, 220) }); el = el.parentElement; }
  return chain;
});
console.log("nav ancestor chain:", JSON.stringify(navCls, null, 1));
// theme toggle
const t = page.locator("button:has(svg.lucide-sun)").first();
console.log("toggle count:", await t.count());
await t.scrollIntoViewIfNeeded();
await page.waitForTimeout(400);
const before = await page.evaluate(() => ({ cls: document.documentElement.className, bg: getComputedStyle(document.body).backgroundColor, ls: JSON.stringify(localStorage) }));
await t.click();
await page.waitForTimeout(900);
const after = await page.evaluate(() => ({ cls: document.documentElement.className, bg: getComputedStyle(document.body).backgroundColor, ls: JSON.stringify(localStorage) }));
console.log("before:", JSON.stringify(before));
console.log("after:", JSON.stringify(after));
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(500);
await page.screenshot({ path: SP + "/reference/pricing/states/theme-dark.png", fullPage: true });
console.log("dark screenshot saved");
await browser.close();
