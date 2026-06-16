// Headless verification: load the page, assert no console/page errors, confirm
// every section + key interactions render, fonts load, then capture screenshots
// at desktop (the 1280x800 recorder size) and mobile widths.
//
// Dev-only tool — not part of the app bundle. Run against a live dev server:
//   npm run dev -- --port 5210
//   CHROME_PATH=/path/to/chrome URL=http://localhost:5210/ \
//     node --experimental-vm-modules scripts/verify.mjs
// Requires `playwright` resolvable on disk and a Chromium/Chrome binary
// (set CHROME_PATH, or omit to use Playwright's bundled browser).
import { chromium } from "playwright";
import { mkdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const TARGET = process.env.URL || "http://localhost:5210/";
const OUT = join(dirname(fileURLToPath(import.meta.url)), ".verify");
mkdirSync(OUT, { recursive: true });

const errors = [];
const EXEC = process.env.CHROME_PATH || undefined;
const browser = await chromium.launch({ executablePath: EXEC });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await ctx.newPage();
page.on("console", (m) => {
  if (m.type() === "error") errors.push(`console.error: ${m.text()}`);
});
page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));

await page.goto(TARGET, { waitUntil: "networkidle", timeout: 30000 });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(800);

const checks = [];
const must = async (name, fn) => {
  try {
    const ok = await fn();
    checks.push([name, !!ok]);
  } catch (e) {
    checks.push([name, false, String(e)]);
  }
};

await must("nav brand 'Aperture' present", async () =>
  (await page.locator("header >> text=Aperture").count()) > 0,
);
await must("hero headline present", async () =>
  (await page.locator("h1", { hasText: "Ship software" }).count()) > 0,
);
await must("section #features", async () =>
  await page.locator("#features").isVisible(),
);
await must("section #workflow", async () =>
  (await page.locator("#workflow").count()) > 0,
);
await must("section #pricing", async () =>
  (await page.locator("#pricing").count()) > 0,
);
await must("featured pricing badge 'Most loved'", async () =>
  (await page.locator("text=Most loved").count()) > 0,
);
await must("section #testimonials", async () =>
  (await page.locator("#testimonials").count()) > 0,
);
await must("FAQ accordion buttons", async () =>
  (await page.locator("#faq button[aria-expanded]").count()) >= 5,
);
await must("footer copyright", async () =>
  (await page.locator("footer >> text=Aperture Labs").count()) > 0,
);

// fonts actually loaded (not falling back to system)
await must("Space Grotesk loaded", async () =>
  await page.evaluate(() => document.fonts.check('600 24px "Space Grotesk"')),
);
await must("Inter loaded", async () =>
  await page.evaluate(() => document.fonts.check('400 16px "Inter"')),
);
await must("JetBrains Mono loaded", async () =>
  await page.evaluate(() => document.fonts.check('400 12px "JetBrains Mono"')),
);

// background token applied (deep slate, not pure black/white)
await must("body background is deep slate #0a0a0f", async () => {
  const bg = await page.evaluate(
    () => getComputedStyle(document.body).backgroundColor,
  );
  return bg === "rgb(10, 10, 15)";
});

// FAQ interaction: first row open by default, clicking second toggles aria
await must("FAQ first row expanded by default", async () => {
  const first = page.locator("#faq button[aria-expanded]").first();
  return (await first.getAttribute("aria-expanded")) === "true";
});
await must("FAQ click toggles a closed row open", async () => {
  const rows = page.locator("#faq button[aria-expanded]");
  const second = rows.nth(1);
  await second.click();
  await page.waitForTimeout(450);
  return (await second.getAttribute("aria-expanded")) === "true";
});

// CTA email input + submit micro-interaction
await must("CTA subscribe flips to 'Subscribed'", async () => {
  await page.fill("#cta-email", "night@owl.dev");
  await page.click('button:has-text("Notify me")');
  await page.waitForTimeout(300);
  return (await page.locator('button:has-text("Subscribed")').count()) > 0;
});

// page is tall enough to be a real scrollable landing page
await must("page scrolls (multi-section landing)", async () => {
  const h = await page.evaluate(() => document.body.scrollHeight);
  return h > 3500;
});

// mobile menu opens
await ctx.close();
const mctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
const mpage = await mctx.newPage();
await mpage.goto(TARGET, { waitUntil: "networkidle" });
await mpage.evaluate(() => document.fonts.ready);
await mpage.waitForTimeout(400);
await must("mobile hamburger opens menu", async () => {
  await mpage.click('button[aria-label="Open menu"]');
  await mpage.waitForTimeout(350);
  return await mpage.locator('a:has-text("Pricing")').last().isVisible();
});

// Screenshots for human inspection
await ctx.close().catch(() => {});
const sctx = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 2,
});
const spage = await sctx.newPage();
await spage.goto(TARGET, { waitUntil: "networkidle" });
await spage.evaluate(() => document.fonts.ready);
await spage.waitForTimeout(900);
await spage.screenshot({ path: `${OUT}/hero.png` });
await spage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await spage.waitForTimeout(1200);
await spage.screenshot({ path: `${OUT}/full.png`, fullPage: true });

const mss = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
});
const mssp = await mss.newPage();
await mssp.goto(TARGET, { waitUntil: "networkidle" });
await mssp.evaluate(() => document.fonts.ready);
await mssp.waitForTimeout(900);
await mssp.screenshot({ path: `${OUT}/mobile.png`, fullPage: true });

await browser.close();

// Report
let pass = 0;
console.log("\n=== CHECKS ===");
for (const [name, ok, extra] of checks) {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${extra ? "  — " + extra : ""}`);
  if (ok) pass++;
}
console.log(`\n${pass}/${checks.length} checks passed`);
if (errors.length) {
  console.log("\n=== PAGE/CONSOLE ERRORS ===");
  errors.forEach((e) => console.log("  " + e));
} else {
  console.log("No console.error or pageerror captured.");
}
process.exit(pass === checks.length && errors.length === 0 ? 0 : 1);
