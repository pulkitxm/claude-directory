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
const reference = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const clone = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const results = [];

async function capture(page, url) {
  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
  return page.evaluate(() => ({
    headings: [...document.querySelectorAll("main h1, main h2, main h3")].map((heading) => heading.textContent.trim()),
    images: document.querySelectorAll("main img").length,
    sections: document.querySelectorAll("main section").length,
    text: (document.querySelector("main")?.innerText || "").replaceAll(/\s+/g, " ").trim(),
  }));
}

for (const route of routes) {
  const suffix = route ? `${route}/` : "";
  const live = await capture(reference, `https://optimize-nextjs.vercel.app/${suffix}`);
  const local = await capture(
    clone,
    `http://127.0.0.1:4173/templates/premium/themefisher/optimize-nextjs/${suffix}`,
  );
  results.push({
    headings: JSON.stringify(live.headings) === JSON.stringify(local.headings),
    images: live.images === local.images,
    route: `/${route}`,
    sections: live.sections === local.sections,
    text: live.text === local.text,
  });
}

await browser.close();

const report = {
  results,
  summary: {
    passed: results.filter((result) => result.headings && result.images && result.sections && result.text).length,
    total: results.length,
  },
};
fs.writeFileSync(path.join(root, ".audit", "parity-verification.json"), JSON.stringify(report, null, 2));
console.log(`Verified parity for ${report.summary.passed} of ${report.summary.total} routes`);
if (report.summary.passed !== report.summary.total) process.exit(1);
