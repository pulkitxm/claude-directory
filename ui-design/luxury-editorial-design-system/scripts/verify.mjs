// Headless Chromium verification driven from the CLI.
// Uses the Playwright install in scripts/record-demos/node_modules.
// Run: start `npm run preview -- --port 4317 --strictPort`, then `node scripts/verify.mjs`.
import { chromium } from "../../../scripts/record-demos/node_modules/playwright/index.mjs";

const URL = process.env.VERIFY_URL || "http://localhost:4317";
let failures = 0;
const ok = (m) => console.log(`  PASS  ${m}`);
const bad = (m) => {
  failures++;
  console.log(`  FAIL  ${m}`);
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const consoleErrors = [];
const pageErrors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") consoleErrors.push(msg.text());
});
page.on("pageerror", (err) => pageErrors.push(err.message));

console.log(`\n→ Loading ${URL}`);
await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForTimeout(800);

/* ---- 1. Key sections render (assert by text + selector) ---------------- */
console.log("\n[1] Section presence");
const sections = [
  ["Hero headline", 'h1:has-text("made to be")'],
  ["Hero gold-italic word", 'h1 em:has-text("kept")'],
  ["Features heading", 'h2:has-text("Curated")'],
  ["Drop-cap intro", "p.dropcap"],
  ["Stats numbers", 'dd:has-text("1924")'],
  ["Testimonials heading", 'h2:has-text("considered")'],
  ["FAQ accordion", "#faq-trigger-commission"],
  ["Blog grid heading", 'h2:has-text("permanence")'],
  ["Footer CTA heading", 'h2:has-text("house letter")'],
  ["Footer email input", 'input[type="email"]'],
];
for (const [name, sel] of sections) {
  const count = await page.locator(sel).count();
  if (count > 0) ok(`${name} present (${sel})`);
  else bad(`${name} MISSING (${sel})`);
}

/* ---- 2. Bold-factor structural elements -------------------------------- */
console.log("\n[2] Bold-factor structural elements");
const grain = await page.locator(".paper-grain").count();
grain > 0 ? ok("Paper-grain overlay present") : bad("Paper-grain overlay missing");

const gridLines = await page.locator(".w-px.bg-foreground\\/\\[0\\.12\\]").count();
// fall back to counting any fixed vertical gridline divs
const gridFallback = await page.evaluate(() => {
  const lines = [...document.querySelectorAll("span")].filter((s) => {
    const cs = getComputedStyle(s);
    return cs.position === "absolute" && parseFloat(cs.width) <= 1.5 && parseFloat(cs.height) > 400;
  });
  return lines.length;
});
gridFallback >= 4
  ? ok(`Vertical gridlines present (${gridFallback} found)`)
  : bad(`Expected >=4 vertical gridlines, found ${gridFallback}`);

const vlabels = await page.evaluate(() => {
  return [...document.querySelectorAll("*")].filter(
    (el) => getComputedStyle(el).writingMode.startsWith("vertical")
  ).length;
});
vlabels > 0
  ? ok(`Vertical writing-mode labels present (${vlabels})`)
  : bad("No vertical writing-mode labels found");

/* ---- 3. Console / page errors ------------------------------------------ */
console.log("\n[3] Console & page errors");
consoleErrors.length === 0
  ? ok("No console errors")
  : bad(`Console errors: ${JSON.stringify(consoleErrors)}`);
pageErrors.length === 0
  ? ok("No page errors")
  : bad(`Page errors: ${JSON.stringify(pageErrors)}`);

/* ---- 4. FAQ accordion toggles (ARIA + visibility) ---------------------- */
console.log("\n[4] FAQ accordion");
const trigger = page.locator("#faq-trigger-materials");
await trigger.scrollIntoViewIfNeeded();
const initiallyExpanded = await trigger.getAttribute("aria-expanded");
ok(`materials trigger initial aria-expanded=${initiallyExpanded}`);

await trigger.click();
await page.waitForTimeout(500);
const afterOpen = await trigger.getAttribute("aria-expanded");
const panelVisible = await page.locator("#faq-panel-materials").isVisible();
afterOpen === "true" && panelVisible
  ? ok("After click: aria-expanded=true and panel visible")
  : bad(`After click: aria-expanded=${afterOpen}, panelVisible=${panelVisible}`);

// question text turns gold when open
const qColor = await page.evaluate(() => {
  const btn = document.querySelector("#faq-trigger-materials span");
  return getComputedStyle(btn).color;
});
// #D4AF37 -> rgb(212, 175, 55)
qColor.includes("212") && qColor.includes("175")
  ? ok(`Open question text is gold (${qColor})`)
  : bad(`Open question text not gold (${qColor})`);

await trigger.click();
await page.waitForTimeout(400);
const afterClose = await trigger.getAttribute("aria-expanded");
afterClose === "false"
  ? ok("After second click: aria-expanded=false (collapses)")
  : bad(`After second click: aria-expanded=${afterClose}`);

// aria-controls wiring
const controls = await trigger.getAttribute("aria-controls");
controls === "faq-panel-materials"
  ? ok(`aria-controls wired (${controls})`)
  : bad(`aria-controls=${controls}`);

/* ---- 5. Gold sliding button overlay ------------------------------------ */
console.log("\n[5] Gold sliding primary button");
const primaryBtn = page.locator("button:has-text('View the collection')").first();
await primaryBtn.scrollIntoViewIfNeeded();
const overlay = primaryBtn.locator("span[aria-hidden]");
const overlayCount = await overlay.count();
overlayCount > 0
  ? ok("Primary button has gold overlay span")
  : bad("Primary button missing overlay span");

const restTransform = await overlay.first().evaluate((el) => getComputedStyle(el).transform);
await primaryBtn.hover();
await page.waitForTimeout(700);
const hoverTransform = await overlay.first().evaluate((el) => getComputedStyle(el).transform);
restTransform !== hoverTransform
  ? ok(`Overlay transform changes on hover (rest="${restTransform}" → hover="${hoverTransform}")`)
  : bad(`Overlay transform did not change on hover (${restTransform})`);

const overlayBg = await overlay.first().evaluate((el) => getComputedStyle(el).backgroundColor);
overlayBg.includes("212") && overlayBg.includes("175")
  ? ok(`Overlay background is gold (${overlayBg})`)
  : bad(`Overlay background not gold (${overlayBg})`);

/* ---- 6. Grayscale → colour image behavior ------------------------------ */
console.log("\n[6] Grayscale image treatment");
const heroImg = page.locator("section#top img").first();
const baseFilter = await heroImg.evaluate((el) => getComputedStyle(el).filter);
baseFilter.includes("grayscale")
  ? ok(`Hero image grayscale by default (${baseFilter})`)
  : bad(`Hero image not grayscale by default (${baseFilter})`);

const hasGroupHover = await page.evaluate(() => {
  const img = document.querySelector("section#top img");
  return img ? img.className.includes("group-hover:grayscale-0") : false;
});
hasGroupHover
  ? ok("Hero image has group-hover:grayscale-0 reveal class")
  : bad("Hero image missing group-hover grayscale reveal class");

const grayscaleImgCount = await page.evaluate(
  () =>
    [...document.querySelectorAll("img")].filter((i) =>
      getComputedStyle(i).filter.includes("grayscale")
    ).length
);
grayscaleImgCount >= 5
  ? ok(`${grayscaleImgCount} images grayscale by default`)
  : bad(`Only ${grayscaleImgCount} grayscale images (expected >=5)`);

/* ---- 7. Design tokens: no pure black/white, 0 radius ------------------- */
console.log("\n[7] Design tokens");
const bodyBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
bodyBg === "rgb(249, 248, 246)"
  ? ok(`Body background warm alabaster (${bodyBg})`)
  : bad(`Body background not #F9F8F6 (${bodyBg})`);

const btnRadius = await primaryBtn.evaluate((el) => getComputedStyle(el).borderTopLeftRadius);
btnRadius === "0px"
  ? ok("Buttons have 0px border-radius")
  : bad(`Button radius=${btnRadius}`);

/* ---- Result ------------------------------------------------------------ */
await browser.close();
console.log(`\n${"=".repeat(54)}`);
if (failures === 0) {
  console.log("ALL CHECKS PASSED ✓");
  process.exit(0);
} else {
  console.log(`${failures} CHECK(S) FAILED ✗`);
  process.exit(1);
}
