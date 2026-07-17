import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto("http://localhost:7891/index.html");
await page.waitForTimeout(1000);

// Get the rendered source
const html = await page.content();
// Find the sidebar closing
const asideIdx = html.indexOf("</aside>");
const sidebarBottomIdx = html.indexOf("sidebar-bottom");
const mainAreaIdx = html.indexOf('class="main-area"');

console.log("aside close index:", asideIdx);
console.log("sidebar-bottom index:", sidebarBottomIdx);
console.log("main-area index:", mainAreaIdx);
console.log("\nHTML around aside close:");
console.log(html.substring(asideIdx - 200, asideIdx + 50));

await browser.close();
