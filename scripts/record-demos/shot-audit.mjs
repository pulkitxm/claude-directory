import { chromium } from "playwright";
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const SP = "/tmp/claude-0/-home-user-claude-directory/34ec75ae-94cc-5afe-9528-696ece355c03/scratchpad";
for (const [name, w] of [["login-1440", 1440], ["login-390", 390], ["signup-1440", 1440]]) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  await page.goto(`http://127.0.0.1:8123/${name.split("-")[0]}.html`, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${SP}/fix-${name}.png`, fullPage: true });
  await page.close();
}
await browser.close();
console.log("done");
