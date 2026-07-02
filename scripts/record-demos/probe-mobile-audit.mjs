import fs from "node:fs";
import { chromium } from "playwright";
const legacy = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const launchOpts = { args: ["--ignore-certificate-errors", "--ssl-version-max=tls1.2"], executablePath: fs.existsSync(legacy) ? legacy : undefined };
const proxyUrl = process.env.PW_PROXY || process.env.HTTPS_PROXY;
if (proxyUrl) launchOpts.args.push(`--proxy-server=${proxyUrl}`);
const browser = await chromium.launch(launchOpts);
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto("https://agenforce-marketing-template.vercel.app/", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(2000);
const btns = await page.evaluate(() => {
  return [...document.querySelectorAll("button, [role='button'], svg")].slice(0, 40).map((el) => {
    const r = el.getBoundingClientRect();
    return { tag: el.tagName, cls: (el.className?.baseVal ?? el.className)?.toString?.().slice(0, 90), aria: el.getAttribute?.("aria-label"), x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), vis: r.width > 0 && r.height > 0 };
  }).filter((b) => b.vis && b.y < 200);
});
console.log(JSON.stringify(btns, null, 1));
// try clicking the top-right element
const SP = "/tmp/claude-0/-home-user-claude-directory/34ec75ae-94cc-5afe-9528-696ece355c03/scratchpad";
await page.screenshot({ path: SP + "/ref-mobile-header-before.png" });
const cand = await page.evaluateHandle(() => {
  const els = [...document.querySelectorAll("button, [role='button'], svg, div")].filter((el) => {
    const r = el.getBoundingClientRect();
    return r.width > 10 && r.width < 60 && r.height > 10 && r.height < 60 && r.y < 100 && r.x > 280;
  });
  return els[0] || null;
});
if (cand && (await cand.evaluate((e) => !!e))) {
  const info = await cand.evaluate((e) => ({ tag: e.tagName, cls: (e.className?.baseVal ?? e.className)?.toString?.().slice(0, 90) }));
  console.log("clicking:", JSON.stringify(info));
  await cand.asElement().click({ timeout: 3000 }).catch((e) => console.log("click failed:", e.message));
  await page.waitForTimeout(900);
  await page.screenshot({ path: SP + "/ref-mobile-header-after.png", fullPage: false });
  console.log("clicked and captured");
}
await browser.close();
