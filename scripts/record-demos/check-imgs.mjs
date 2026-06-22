import { chromium } from "playwright";
const browser = await chromium.launch({ ignoreHTTPSErrors: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, ignoreHTTPSErrors: true });
await page.goto(process.argv[2], { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
const data = await page.evaluate(() => {
  return [...document.querySelectorAll('img')].map(img => ({
    src: img.getAttribute('src')||'',
    nat: img.naturalWidth + 'x' + img.naturalHeight,
    box: Math.round(img.getBoundingClientRect().width)+'x'+Math.round(img.getBoundingClientRect().height),
    complete: img.complete
  })).filter(i => i.src.includes('book') || i.src.includes('path-and') || i.src.includes('responsibility') || i.src.includes('yes-but') || i.src.includes('preordained'));
});
console.log(JSON.stringify(data, null, 1));
await browser.close();
