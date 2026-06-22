import { chromium } from "playwright";
const b = await chromium.launch({ ignoreHTTPSErrors: true });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, ignoreHTTPSErrors: true });
await p.goto(process.argv[2], { waitUntil: "networkidle" });
// scroll to bottom to trigger lazy, then back
await p.evaluate(async () => { for(let y=0;y<document.body.scrollHeight;y+=600){window.scrollTo(0,y); await new Promise(r=>setTimeout(r,80));} window.scrollTo(0,0); });
await p.waitForTimeout(1200);
await p.screenshot({ path: process.argv[3], fullPage: true });
await b.close();
