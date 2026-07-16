const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("/Volumes/Sandisk SSD/codingAndFun/samaan/fable/scripts/record-demos/node_modules/playwright");

const root = __dirname;
const pages = [];

function collect(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const pathname = path.join(directory, entry.name);
    if (entry.isDirectory() && entry.name !== ".audit") collect(pathname);
    if (entry.isFile() && entry.name.endsWith(".html")) {
      pages.push(path.relative(root, pathname).replaceAll(path.sep, "/"));
    }
  }
}

collect(root);

(async () => {
  const browser = await chromium.launch({ headless: true });
  const failures = [];
  for (const width of [390, 768, 1280]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    for (const route of pages) {
      const errors = [];
      const failed = [];
      const onConsole = (message) => {
        if (message.type() === "error") errors.push(message.text());
      };
      const onFailed = (request) => failed.push(`${request.url()} ${request.failure()?.errorText}`);
      page.on("console", onConsole);
      page.on("requestfailed", onFailed);
      const response = await page.goto(`http://127.0.0.1:4179/${route}`, { waitUntil: "domcontentloaded", timeout: 10000 });
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(100);
      const result = await page.evaluate(() => ({
        text: document.body.innerText.trim().length,
        visible: [...document.querySelectorAll("main, article, section")].filter((node) => {
          const box = node.getBoundingClientRect();
          const style = getComputedStyle(node);
          return box.width > 0 && box.height > 0 && style.display !== "none" && style.visibility !== "hidden";
        }).length,
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.src),
      }));
      page.off("console", onConsole);
      page.off("requestfailed", onFailed);
      if (!response?.ok() || result.text < 40 || result.visible === 0 || result.overflow > 2 || result.brokenImages.length || errors.length || failed.length) {
        failures.push({ route, width, status: response?.status(), ...result, errors, failed });
      }
    }
    console.error(`verified ${pages.length} pages at ${width}px`);
    await page.close();
  }
  await browser.close();
  console.log(JSON.stringify({ pages: pages.length, checks: pages.length * 3, failures }, null, 2));
  process.exitCode = failures.length ? 1 : 0;
})();
