import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "../../../../scripts/record-demos/node_modules/playwright/index.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));
const origin = process.argv[2] ?? "http://127.0.0.1:4173/templates/premium/themefisher/visionex-nextjs";
const routes = [];

function collect(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const location = path.join(directory, entry.name);
    if (entry.isDirectory()) collect(location);
    if (entry.isFile() && entry.name === "index.html") {
      const relative = path.relative(root, path.dirname(location));
      routes.push(relative ? `/${relative}` : "/");
    }
  }
}

collect(root);
const browser = await chromium.launch();
const results = [];

for (const route of [...new Set(routes)].sort()) {
  for (const width of [390, 768, 1280]) {
    const page = await browser.newPage({ viewport: { width, height: 800 } });
    const errors = [];
    const failedRequests = [];
    const badResponses = [];
    page.on("console", (message) => message.type() === "error" && !message.text().includes("favicon") && errors.push(message.text()));
    page.on("pageerror", (error) => errors.push(String(error)));
    page.on("requestfailed", (request) => failedRequests.push(`${request.url()} ${request.failure()?.errorText ?? "failed"}`));
    page.on("response", (response) => response.status() >= 400 && badResponses.push(`${response.status()} ${response.url()}`));
    const url = route === "/" ? `${origin}/` : `${origin}${route}/`;
    const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(150);
    const state = await page.evaluate(() => ({
      brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).length,
      overflow: Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
      textLength: document.body.innerText.trim().length
    }));
    results.push({ route, width, status: response?.status() ?? 0, ...state, errors, failedRequests, badResponses });
    await page.close();
  }
}

await browser.close();
const failures = results.filter((result) => result.status !== 200 || result.brokenImages || result.overflow || result.errors.length || result.failedRequests.length || result.badResponses.length || result.textLength < 100);
const report = { routes: new Set(routes).size, checks: results.length, widths: [390, 768, 1280], failures };
fs.mkdirSync(path.join(root, ".audit"), { recursive: true });
fs.writeFileSync(path.join(root, ".audit/pages-verification-390-768-1280.json"), `${JSON.stringify(report, null, 2)}\n`);
console.log(`Verified ${results.length} route and viewport combinations with ${failures.length} failures`);
if (failures.length) process.exitCode = 1;
