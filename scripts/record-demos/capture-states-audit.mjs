// Capture responsive + theme + interaction states for a page (original or clone).
// Usage: node capture-states.mjs <url> <outDir>
// Writes: states/responsive/w{390,768,1280}.png, states/theme-light.png, states/theme-dark.png,
//         states/interactions.json + per-interaction before/after screenshots.
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const URL = process.argv[2];
const OUT = process.argv[3];
if (!URL || !OUT) {
  console.error("usage: node capture-states.mjs <url> <outDir>");
  process.exit(2);
}
const S = path.join(OUT, "states");
const R = path.join(S, "responsive");
fs.mkdirSync(R, { recursive: true });

const isLocal = /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(:|\/|$)/i.test(URL);
const legacyChromePath = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
let defaultMissing = false;
try {
  const def = chromium.executablePath?.();
  defaultMissing = !def || !fs.existsSync(def);
} catch {
  defaultMissing = true;
}
const legacyExists = fs.existsSync(legacyChromePath);
const useLegacy = (defaultMissing || (!isLocal && legacyExists)) && legacyExists;
const launchOpts = { args: ["--ignore-certificate-errors"] };
if (useLegacy) launchOpts.executablePath = legacyChromePath;
if (!isLocal) {
  launchOpts.args.push("--ssl-version-max=tls1.2");
  const proxyUrl = process.env.PW_PROXY || process.env.HTTPS_PROXY;
  if (proxyUrl) launchOpts.args.push(`--proxy-server=${proxyUrl}`);
}
const browser = await chromium.launch(isLocal && !useLegacy ? {} : launchOpts);
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 }).catch(async () => {
  await page.goto(URL, { waitUntil: "load", timeout: 60000 });
});
await page.waitForTimeout(2000);

async function scrollPass() {
  // trigger IntersectionObserver reveals / lazy loads
  await page.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y <= h; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(800);
}
await scrollPass();

const interactions = [];
const domState = () =>
  page.evaluate(() => ({
    htmlClass: document.documentElement.className,
    bodyBg: getComputedStyle(document.body).backgroundColor,
    visCount: [...document.querySelectorAll("*")].filter((e) => {
      const r = e.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    }).length,
  }));

// ---- theme toggle (footer sun/moon button) ----
try {
  const before = await domState();
  await page.screenshot({ path: path.join(S, "theme-light.png"), fullPage: true });
  // candidates: explicit id, aria-label mentioning theme/dark, footer button with svg
  const sel = [
    "#themeToggle",
    'button[aria-label*="theme" i]',
    'button[aria-label*="dark" i]',
    'button[aria-label*="mode" i]',
    "footer button:has(svg)",
  ];
  let clicked = false;
  for (const s of sel) {
    const el = page.locator(s).first();
    if ((await el.count()) && (await el.isVisible().catch(() => false))) {
      await el.scrollIntoViewIfNeeded();
      await el.click({ timeout: 3000 });
      clicked = true;
      break;
    }
  }
  if (clicked) {
    await page.waitForTimeout(800);
    const after = await domState();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(S, "theme-dark.png"), fullPage: true });
    interactions.push({
      name: "theme-toggle",
      trigger: "footer theme button",
      delta: `htmlClass '${before.htmlClass}' -> '${after.htmlClass}', bodyBg ${before.bodyBg} -> ${after.bodyBg}`,
      shots: ["theme-light.png", "theme-dark.png"],
    });
    // toggle back
    for (const s of sel) {
      const el = page.locator(s).first();
      if ((await el.count()) && (await el.isVisible().catch(() => false))) {
        await el.scrollIntoViewIfNeeded();
        await el.click({ timeout: 3000 }).catch(() => {});
        break;
      }
    }
    await page.waitForTimeout(500);
  } else {
    interactions.push({ name: "theme-toggle", error: "no toggle found" });
  }
} catch (e) {
  interactions.push({ name: "theme-toggle", error: e.message });
}

// ---- FAQ accordion ----
try {
  const q = page
    .locator(
      'text=/Is there a free trial available|What is Agenforce AI/i',
    )
    .first();
  if (await q.count()) {
    await q.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(S, "faq-before.png") });
    const b1 = await domState();
    await q.click({ timeout: 3000 });
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(S, "faq-after.png") });
    const a1 = await domState();
    interactions.push({
      name: "faq-accordion",
      trigger: "click FAQ question",
      delta: `visible el count ${b1.visCount} -> ${a1.visCount}`,
      shots: ["faq-before.png", "faq-after.png"],
    });
    await q.click({ timeout: 3000 }).catch(() => {});
    await page.waitForTimeout(400);
  } else {
    interactions.push({ name: "faq-accordion", error: "no FAQ question found" });
  }
} catch (e) {
  interactions.push({ name: "faq-accordion", error: e.message });
}

// ---- sticky/scroll header behavior ----
try {
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(S, "header-top.png"), clip: { x: 0, y: 0, width: 1440, height: 120 } });
  await page.evaluate(() => window.scrollTo(0, 900));
  await page.waitForTimeout(700);
  const headerInfo = await page.evaluate(() => {
    const cands = document.querySelectorAll("header, nav, [class*='navbar']");
    for (const el of cands) {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      if (r.top <= 5 && r.height > 20 && r.height < 200 && (cs.position === "fixed" || cs.position === "sticky"))
        return { sticky: true, pos: cs.position, bg: cs.backgroundColor, shadow: cs.boxShadow, h: r.height, cls: el.className?.toString?.().slice(0, 100) };
    }
    return { sticky: false };
  });
  await page.screenshot({ path: path.join(S, "header-scrolled.png"), clip: { x: 0, y: 0, width: 1440, height: 120 } });
  interactions.push({ name: "sticky-header", delta: JSON.stringify(headerInfo), shots: ["header-top.png", "header-scrolled.png"] });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
} catch (e) {
  interactions.push({ name: "sticky-header", error: e.message });
}

// ---- responsive captures (with scroll pass each) ----
for (const w of [390, 768, 1280]) {
  try {
    await page.setViewportSize({ width: w, height: 900 });
    await page.waitForTimeout(600);
    await scrollPass();
    await page.screenshot({ path: path.join(R, `w${w}.png`), fullPage: true });
  } catch (e) {
    interactions.push({ name: `responsive-${w}`, error: e.message });
  }
}

// ---- mobile hamburger menu at 390px ----
try {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(S, "mobile-menu-before.png") });
  const ham = page
    .locator(
      'button[aria-label*="menu" i], button[aria-label*="navigation" i], [class*="menu-btn" i], [class*="hamburger" i], header button:has(svg), nav button:has(svg)',
    )
    .first();
  if ((await ham.count()) && (await ham.isVisible().catch(() => false))) {
    await ham.click({ timeout: 3000 });
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(S, "mobile-menu-after.png") });
    const links = await page.evaluate(() =>
      [...document.querySelectorAll("a")]
        .filter((a) => {
          const r = a.getBoundingClientRect();
          return r.width > 0 && r.height > 0 && r.left >= 0 && r.top >= 0;
        })
        .map((a) => a.textContent.trim())
        .filter(Boolean)
        .slice(0, 15),
    );
    interactions.push({
      name: "mobile-menu",
      trigger: "hamburger button",
      delta: `drawer links visible: ${JSON.stringify(links)}`,
      shots: ["mobile-menu-before.png", "mobile-menu-after.png"],
    });
  } else {
    interactions.push({ name: "mobile-menu", error: "no hamburger found at 390px" });
  }
} catch (e) {
  interactions.push({ name: "mobile-menu", error: e.message });
}

fs.writeFileSync(path.join(S, "interactions.json"), JSON.stringify(interactions, null, 2));
console.log("captured:", interactions.map((i) => `${i.name}${i.error ? "(ERR:" + i.error.slice(0, 60) + ")" : ""}`).join(", "));
await browser.close();
