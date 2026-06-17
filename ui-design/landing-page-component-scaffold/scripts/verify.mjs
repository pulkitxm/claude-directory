// Headless smoke test for the landing-page scaffold.
// Boots the Vite dev server, loads the page in Chromium, and asserts that:
//   1. The page responds and the #root element mounts.
//   2. App.tsx renders the <main class="relative min-h-screen flex flex-col"> shell.
//   3. No uncaught page errors / console errors occur during load.
// Run with: npm run verify
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
import { chromium } from "playwright";

const PORT = process.env.PORT ? Number(process.env.PORT) : 5188;
const URL = `http://localhost:${PORT}/`;

function startDevServer() {
  const proc = spawn(
    "npm",
    ["run", "dev", "--", "--port", String(PORT), "--strictPort"],
    { stdio: ["ignore", "pipe", "pipe"] }
  );
  proc.stdout.on("data", (d) => process.stdout.write(`[vite] ${d}`));
  proc.stderr.on("data", (d) => process.stderr.write(`[vite] ${d}`));
  return proc;
}

async function waitForServer(url, timeoutMs = 30000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch {
      // not up yet
    }
    await sleep(300);
  }
  throw new Error(`Dev server did not start within ${timeoutMs}ms`);
}

let server;
let browser;
const failures = [];

try {
  server = startDevServer();
  await waitForServer(URL);

  browser = await chromium.launch();
  const page = await browser.newPage();

  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  const pageErrors = [];
  page.on("pageerror", (err) => pageErrors.push(err.message));

  await page.goto(URL, { waitUntil: "networkidle" });

  // 1. #root mounted
  const rootExists = (await page.locator("#root").count()) === 1;
  if (!rootExists) failures.push("#root element not found");

  // 2. App shell rendered with the exact scaffold classes
  const main = page.locator("main.relative.min-h-screen.flex.flex-col");
  const mainCount = await main.count();
  if (mainCount !== 1) {
    failures.push(
      `expected exactly 1 <main> with scaffold classes, found ${mainCount}`
    );
  }

  // 3. Tailwind reset applied (utility CSS actually loaded): body margin is 0
  const bodyMargin = await page.evaluate(
    () => getComputedStyle(document.body).marginTop
  );
  if (bodyMargin !== "0px") {
    failures.push(`expected Tailwind base reset (body margin 0), got ${bodyMargin}`);
  }

  // 4. No runtime errors
  if (pageErrors.length) failures.push(`pageerror(s): ${pageErrors.join("; ")}`);
  if (consoleErrors.length)
    failures.push(`console error(s): ${consoleErrors.join("; ")}`);

  if (failures.length === 0) {
    console.log("\nVERIFY PASSED:");
    console.log("  - #root mounted");
    console.log("  - <main> scaffold rendered with relative min-h-screen flex flex-col");
    console.log("  - Tailwind base styles applied");
    console.log("  - no console / page errors");
  }
} catch (err) {
  failures.push(`harness error: ${err?.message ?? err}`);
} finally {
  if (browser) await browser.close();
  if (server) server.kill("SIGTERM");
}

if (failures.length) {
  console.error("\nVERIFY FAILED:");
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
process.exit(0);
