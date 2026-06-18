/**
 * CLI verification for the NOVATRIX Gradient Mesh studio.
 * Run: node scripts/verify.mjs   (expects `vite preview` on http://localhost:4173)
 *
 * Drives a headless Chromium (swiftshader GPU fallback) and asserts:
 *  - no uncaught page errors / GLSL compile or link errors
 *  - the GradientMesh ogl <canvas> mounts inside the live plate and paints
 *    non-black, colourful pixels (the shader actually runs)
 *  - the telemetry HUD ticks (fps + time advance) and PAUSE freezes its clock
 *  - swapping a palette visibly changes the rendered field
 *  - the docs dock tabs switch (install / props / usage / components-ui)
 *  - single non-scrolling viewport, fonts vendored (no googleapis/gstatic)
 *  - mobile viewport renders without errors or horizontal scroll
 */
import { chromium } from "playwright";

const BASE_URL = process.env.VERIFY_URL ?? "http://localhost:4173";
let failures = 0;

function check(name, condition, detail = "") {
  const ok = Boolean(condition);
  if (!ok) failures += 1;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${ok || !detail ? "" : ` — ${detail}`}`);
  return ok;
}

const browser = await chromium.launch({
  args: [
    "--use-gl=angle",
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
    "--ignore-gpu-blocklist",
  ],
});

const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const pageErrors = [];
const consoleErrors = [];
page.on("pageerror", (e) => pageErrors.push(e.message));
page.on("console", (m) => {
  if (m.type() === "error") consoleErrors.push(m.text());
});

await page.goto(BASE_URL, { waitUntil: "networkidle" });
await page.waitForTimeout(1600); // warm up rAF + let the HUD tick

check("No uncaught page errors", pageErrors.length === 0, pageErrors.join("; "));
check(
  "No GLSL compile/link errors",
  !consoleErrors.some((e) => /shader|program|compil|link|webgl/i.test(e)),
  consoleErrors.join("; "),
);

// ── The shader canvas mounts inside the live plate ──────────────────────────
const plateCanvas = page.locator("section[data-plate] canvas");
check("GradientMesh canvas present in plate", (await plateCanvas.count()) >= 1);
check(
  "Plate canvas drawing buffer is sized",
  await plateCanvas.first().evaluate((el) => el.width > 0 && el.height > 0),
);

// ── Canvas actually paints colour (screenshot + decode in-page) ────────────
// GL uses preserveDrawingBuffer:false, so readPixels won't work after a frame.
// We screenshot the composited page and measure luminance/peak channel.
async function sampleScreen(clip) {
  const shot = await page.screenshot({ clip });
  const b64 = shot.toString("base64");
  return page.evaluate(async (dataUrl) => {
    const img = new Image();
    await new Promise((res, rej) => {
      img.onload = res;
      img.onerror = rej;
      img.src = dataUrl;
    });
    const c = document.createElement("canvas");
    c.width = img.width;
    c.height = img.height;
    const ctx = c.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const d = ctx.getImageData(0, 0, c.width, c.height).data;
    let lum = 0;
    let maxChan = 0;
    let r = 0;
    let g = 0;
    let b = 0;
    const n = d.length / 4;
    for (let i = 0; i < d.length; i += 4) {
      lum += d[i] + d[i + 1] + d[i + 2];
      maxChan = Math.max(maxChan, d[i], d[i + 1], d[i + 2]);
      r += d[i];
      g += d[i + 1];
      b += d[i + 2];
    }
    // chroma = spread across channels → proves it isn't grayscale
    const chroma = Math.max(r, g, b) / n - Math.min(r, g, b) / n;
    return { lum, maxChan, chroma };
  }, `data:image/png;base64,${b64}`);
}

const plateBox = await plateCanvas.first().boundingBox();
const region = {
  x: Math.round(plateBox.x + 24),
  y: Math.round(plateBox.y + 24),
  width: 120,
  height: 120,
};
const paint = await sampleScreen(region);
check(
  "Shader paints non-black pixels",
  paint.lum > 0 && paint.maxChan > 30,
  JSON.stringify(paint),
);
check("Shader paints colour (non-grayscale)", paint.chroma > 4, JSON.stringify(paint));

// ── Telemetry HUD ticks ─────────────────────────────────────────────────────
const timeText = () =>
  page.evaluate(() => {
    const dts = [...document.querySelectorAll("dt")];
    const dt = dts.find((n) => n.textContent.trim() === "time");
    return dt ? dt.nextElementSibling.textContent.trim() : "";
  });
const fpsText = () =>
  page.evaluate(() => {
    const dts = [...document.querySelectorAll("dt")];
    const dt = dts.find((n) => n.textContent.trim() === "fps");
    return dt ? dt.nextElementSibling.textContent.trim() : "";
  });
check("Telemetry FPS readout present", (await fpsText()) !== "");
const t1 = await timeText();
await page.waitForTimeout(700);
const t2 = await timeText();
check("Telemetry clock advances", t1 !== "" && t1 !== t2, `${t1} -> ${t2}`);

// ── Pause freezes the telemetry clock ───────────────────────────────────────
await page.getByRole("button", { name: /pause animation/i }).click();
await page.waitForTimeout(300);
const p1 = await timeText();
await page.waitForTimeout(700);
const p2 = await timeText();
check("Pause freezes the clock", p1 === p2, `${p1} -> ${p2}`);
await page.getByRole("button", { name: /resume animation/i }).click();

// ── Palette swap changes the render ─────────────────────────────────────────
// Pause first for a fair before/after, sample a quiet shader patch, swap palette.
await page.getByRole("button", { name: /pause animation/i }).click();
await page.waitForTimeout(250);
const before = await sampleScreen(region);
// Click a palette that isn't the active one (Ember is high-contrast warm).
await page.getByRole("button", { name: /palette ember/i }).click();
await page.waitForTimeout(400);
const after = await sampleScreen(region);
check(
  "Palette swap changes the field",
  Math.abs(before.lum - after.lum) > 1000 || Math.abs(before.chroma - after.chroma) > 2,
  `lum ${before.lum}->${after.lum}, chroma ${before.chroma.toFixed(1)}->${after.chroma.toFixed(1)}`,
);
await page.getByRole("button", { name: /resume animation/i }).click();

// ── Docs dock tabs switch ───────────────────────────────────────────────────
const tablist = page.getByRole("tablist", { name: /integration documentation/i });
check("Docs dock tablist present", (await tablist.count()) === 1);
await page.getByRole("tab", { name: /props api/i }).click();
await page.waitForTimeout(150);
check(
  "Props tab reveals the colors prop row",
  (await page.locator("td", { hasText: /^colors$/ }).count()) >= 1,
);
await page.getByRole("tab", { name: /components\/ui/i }).click();
await page.waitForTimeout(150);
check(
  "components/ui tab explains the path",
  await page.evaluate(() => /components\/ui/.test(document.body.innerText)),
);
await page.getByRole("tab", { name: /install/i }).click();
await page.waitForTimeout(150);
check(
  "Install tab shows the ogl dependency",
  await page.evaluate(() => /npm install ogl/.test(document.body.innerText)),
);

// ── Reset restores defaults (speed back to 1.00) ────────────────────────────
await page.getByRole("button", { name: /reset to defaults/i }).click();
await page.waitForTimeout(150);
check(
  "Reset restores Speed default",
  await page.evaluate(() => /1\.00/.test(document.body.innerText)),
);

// ── Single non-scrolling viewport ───────────────────────────────────────────
check(
  "Page does not scroll (single viewport)",
  await page.evaluate(() => document.body.scrollHeight <= window.innerHeight + 2),
);

// ── Fonts vendored (no remote font requests) ────────────────────────────────
const remoteFontReqs = [];
page.on("request", (r) => {
  if (/fonts\.(googleapis|gstatic)\.com/.test(r.url())) remoteFontReqs.push(r.url());
});
await page.reload({ waitUntil: "networkidle" });
check("No remote font requests (fonts vendored)", remoteFontReqs.length === 0, remoteFontReqs.join("; "));

// ── Mobile viewport sanity ──────────────────────────────────────────────────
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
const mobileErrors = [];
mobile.on("pageerror", (e) => mobileErrors.push(e.message));
await mobile.goto(BASE_URL, { waitUntil: "networkidle" });
await mobile.waitForTimeout(900);
check("Mobile: no page errors", mobileErrors.length === 0, mobileErrors.join("; "));
check(
  "Mobile: shader canvas present",
  (await mobile.locator("section[data-plate] canvas").count()) >= 1,
);
check(
  "Mobile: no horizontal scroll",
  await mobile.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
);

await browser.close();

console.log(`\n${failures === 0 ? "ALL CHECKS PASSED" : `${failures} CHECK(S) FAILED`}`);
process.exit(failures === 0 ? 0 : 1);
