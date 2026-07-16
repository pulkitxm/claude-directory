import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "../../../../scripts/record-demos/node_modules/playwright/index.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));
const routes = [];

function collect(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const location = path.join(directory, entry.name);
    if (entry.isDirectory()) collect(location);
    if (entry.name === "index.html") {
      routes.push(path.relative(root, path.dirname(location)).split(path.sep).join("/"));
    }
  }
}

collect(root);

const browser = await chromium.launch({ headless: true });
const failures = [];

const widths = process.env.VIEWPORT ? [Number(process.env.VIEWPORT)] : [390, 768, 1280];

for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  for (const route of routes) {
    const errors = [];
    page.removeAllListeners();
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(`console: ${message.text()}`);
    });
    page.on("pageerror", (error) => errors.push(`page: ${error.message}`));
    page.on("requestfailed", (request) => {
      errors.push(`request: ${request.url()} ${request.failure()?.errorText}`);
    });
    const suffix = route ? `${route}/` : "";
    const response = await page.goto(
      `http://127.0.0.1:4173/templates/premium/themefisher/optimize-nextjs/${suffix}`,
      { waitUntil: "networkidle", timeout: 30000 },
    );
    await page.evaluate(async () => {
      for (let position = 0; position < document.body.scrollHeight; position += 700) {
        scrollTo(0, position);
        await new Promise((resolve) => setTimeout(resolve, 20));
      }
      scrollTo(0, 0);
    });
    const state = await page.evaluate(() => ({
      brokenImages: [...document.images]
        .filter((image) => !image.complete || image.naturalWidth === 0)
        .map((image) => image.src),
      overflow: document.documentElement.scrollWidth > innerWidth + 2,
      textLength: (document.body.innerText || "").trim().length,
      visibleSections: [...document.querySelectorAll("main section")].filter((section) => {
        const style = getComputedStyle(section);
        return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) > 0;
      }).length,
    }));
    if (
      response?.status() !== 200 ||
      state.textLength < 80 ||
      state.visibleSections === 0 ||
      state.brokenImages.length > 0 ||
      state.overflow ||
      errors.length > 0
    ) {
      failures.push({ errors, route, state, status: response?.status(), width });
    }
  }
  await page.close();
}

await browser.close();

const report = { checks: routes.length * widths.length, failures, routes: routes.length, widths };
fs.writeFileSync(
  path.join(root, ".audit", `pages-verification-${widths.join("-")}.json`),
  JSON.stringify(report, null, 2),
);
console.log(`Verified ${report.checks} route and viewport combinations with ${failures.length} failures`);
if (failures.length > 0) process.exit(1);
