import fs from "node:fs";
import { chromium } from "playwright";
const [url, outDir, slug] = [process.argv[2], process.argv[3], process.argv[4]];
fs.mkdirSync(outDir+"/states", { recursive: true });
const browser = await chromium.launch({ ignoreHTTPSErrors: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, ignoreHTTPSErrors: true });
await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(2000);
const interactions = [];
async function snap(name){ await page.screenshot({ path: `${outDir}/states/${name}.png` }); }

// Account dropdown
try {
  const acct = page.locator('button:has-text("Account")').first();
  if (await acct.count()) {
    await acct.click(); await page.waitForTimeout(500);
    await snap("account-open");
    const menuHTML = await page.evaluate(()=>{ const m=document.querySelector('[role="menu"]'); return m? m.outerHTML : null; });
    interactions.push({name:"account-dropdown", trigger:'button:has-text("Account")', menuHTML});
    await page.keyboard.press("Escape"); await page.waitForTimeout(300);
  }
} catch(e){ interactions.push({name:"account-dropdown", error:String(e)}); }

// Sidebar collapse (course/article only)
try {
  const collapse = page.locator('nav[aria-label="Course"] button').first();
  if (await collapse.count()) {
    const before = await page.evaluate(()=>document.querySelector('.group')?.getAttribute('data-sidebar-collapsed'));
    await collapse.click(); await page.waitForTimeout(500);
    await snap("sidebar-collapsed");
    const after = await page.evaluate(()=>document.querySelector('.group')?.getAttribute('data-sidebar-collapsed'));
    interactions.push({name:"sidebar-collapse", trigger:'nav[aria-label="Course"] button', before, after});
    await collapse.click(); await page.waitForTimeout(300);
  }
} catch(e){ interactions.push({name:"sidebar-collapse", error:String(e)}); }

// Video play button
try {
  const playBtn = page.locator('button[aria-label*="Play" i], button:has(svg) >> nth=0');
  const vid = page.locator('video, [data-video], button:has-text("Play")');
  if (await page.locator('video').count()) {
    interactions.push({name:"video-present", count: await page.locator('video').count()});
  }
} catch(e){}

fs.writeFileSync(`${outDir}/states/interactions.json`, JSON.stringify(interactions, null, 2));
console.log("interactions:", interactions.map(i=>i.name).join(", "));
await browser.close();
