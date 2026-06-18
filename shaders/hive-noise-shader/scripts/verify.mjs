// Headless verification for the HIVE shader lab.
//
// Boots the dev-server URL, asserts there are no console/page errors, confirms
// the WebGL2 shader <canvas> mounts and actually paints non-black light,
// checks the lab UI (top bar, hero, spec HUD, docs sections), exercises a
// copy-to-clipboard button, scrolls the docs into view, and captures both a
// desktop and a mobile screenshot.
//
//   URL=http://localhost:5314/ \
//   NODE_PATH=../../scripts/record-demos/node_modules \
//   CHROME_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome \
//     node scripts/verify.mjs
import { existsSync, mkdirSync } from "fs";
import { inflateSync } from "zlib";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { createRequire } from "module";

// Playwright is a dev-only dependency for this check, deliberately kept out of
// the project's package.json so `npm install` never triggers a browser
// download (the shared demo recorder under scripts/record-demos brings its
// own). Resolve it from the project if present, else from any reachable
// record-demos install by walking up the tree; PLAYWRIGHT_PKG can override.
const require = createRequire(import.meta.url);
function resolveChromium() {
  try {
    return require("playwright").chromium;
  } catch {
    /* fall through to shared copies */
  }
  const candidates = [];
  if (process.env.PLAYWRIGHT_PKG) candidates.push(process.env.PLAYWRIGHT_PKG);
  let dir = dirname(fileURLToPath(import.meta.url));
  for (let i = 0; i < 8; i++) {
    candidates.push(
      join(dir, "scripts", "record-demos", "node_modules", "playwright"),
    );
    dir = dirname(dir);
  }
  for (const c of candidates) {
    if (existsSync(join(c, "package.json"))) return require(c).chromium;
  }
  throw new Error(
    "playwright not found — run `npm install` in scripts/record-demos first",
  );
}
const chromium = resolveChromium();

/** Decode a 24/32-bit PNG just enough to scan pixels (no deps). */
function pngStats(buf) {
  let pos = 8;
  let width = 0,
    height = 0,
    bitDepth = 0,
    colorType = 0;
  const idat = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString("ascii", pos + 4, pos + 8);
    const data = buf.subarray(pos + 8, pos + 8 + len);
    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
    } else if (type === "IDAT") {
      idat.push(data);
    } else if (type === "IEND") break;
    pos += 12 + len;
  }
  const channels = colorType === 6 ? 4 : colorType === 2 ? 3 : 0;
  if (channels === 0 || bitDepth !== 8) return null;
  const raw = inflateSync(Buffer.concat(idat));
  const stride = width * channels;
  const prev = new Uint8Array(stride);
  const cur = new Uint8Array(stride);
  let maxLum = 0,
    lit = 0,
    total = 0,
    rSum = 0,
    gSum = 0,
    bSum = 0;
  let p = 0;
  for (let y = 0; y < height; y++) {
    const filter = raw[p++];
    for (let x = 0; x < stride; x++) {
      const rawByte = raw[p++];
      const a = x >= channels ? cur[x - channels] : 0;
      const b = prev[x];
      const c = x >= channels ? prev[x - channels] : 0;
      let v;
      switch (filter) {
        case 0:
          v = rawByte;
          break;
        case 1:
          v = rawByte + a;
          break;
        case 2:
          v = rawByte + b;
          break;
        case 3:
          v = rawByte + ((a + b) >> 1);
          break;
        case 4: {
          const pp = a + b - c;
          const pa = Math.abs(pp - a),
            pb = Math.abs(pp - b),
            pc = Math.abs(pp - c);
          v = rawByte + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c);
          break;
        }
        default:
          v = rawByte;
      }
      cur[x] = v & 0xff;
    }
    for (let x = 0; x < width; x++) {
      const r = cur[x * channels];
      const g = cur[x * channels + 1];
      const bl = cur[x * channels + 2];
      const lum = 0.2126 * r + 0.7152 * g + 0.0722 * bl;
      if (lum > maxLum) maxLum = lum;
      if (lum > 8) lit++;
      rSum += r;
      gSum += g;
      bSum += bl;
      total++;
    }
    prev.set(cur);
  }
  return {
    width,
    height,
    maxLum,
    litFraction: lit / total,
    avg: { r: rSum / total, g: gSum / total, b: bSum / total },
  };
}

const URL = process.env.URL || "http://localhost:5314/";
const here = dirname(fileURLToPath(import.meta.url));
const shotDir = join(here, "..", ".verify");
mkdirSync(shotDir, { recursive: true });

const fail = (msg) => {
  console.error("FAIL:", msg);
  process.exitCode = 1;
};
const ok = (msg) => console.log("  ok —", msg);

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || undefined,
  args: [
    "--use-gl=angle",
    "--use-angle=swiftshader",
    "--enable-webgl",
    "--ignore-gpu-blocklist",
  ],
});

const errors = [];
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
ctx.grantPermissions(["clipboard-read", "clipboard-write"]).catch(() => {});
const page = await ctx.newPage();
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
page.on("pageerror", (e) => errors.push(String(e)));

console.log("Verifying", URL);
await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });

// 1) The shader canvas exists and has a real backing buffer.
await page.waitForSelector("canvas", { timeout: 15000 });
const canvasInfo = await page.evaluate(() => {
  const c = document.querySelector("canvas");
  if (!c) return null;
  const gl = c.getContext("webgl2");
  return { w: c.width, h: c.height, hasGL: !!gl };
});
if (!canvasInfo) fail("no <canvas> found");
else if (!canvasInfo.hasGL) fail("canvas has no webgl2 context");
else if (canvasInfo.w < 2 || canvasInfo.h < 2)
  fail(`canvas buffer too small: ${canvasInfo.w}x${canvasInfo.h}`);
else ok(`canvas mounted ${canvasInfo.w}x${canvasInfo.h}, webgl2 ✓`);

// Let a few frames paint.
await page.waitForTimeout(1200);

// 2) The canvas actually paints non-black light.
const shot = await page.locator("canvas").screenshot();
const stats = pngStats(shot);
if (!stats) fail("could not decode canvas screenshot");
else {
  console.log(
    `  canvas stats: maxLum=${stats.maxLum.toFixed(1)} lit=${(
      stats.litFraction * 100
    ).toFixed(1)}% avg=(${stats.avg.r.toFixed(0)},${stats.avg.g.toFixed(
      0,
    )},${stats.avg.b.toFixed(0)})`,
  );
  if (stats.maxLum < 30) fail("canvas looks black — shader not painting");
  else if (stats.litFraction < 0.02) fail("canvas barely lit");
  else ok("shader paints non-black light");
  // Sanity: the palette is warm -> magenta, so red should dominate blue.
  if (stats.avg.r <= stats.avg.b)
    console.log("  note: expected a warmer (red>blue) average for this palette");
  else ok("warm cosine palette present (red > blue)");
}

// 3) Key lab UI is present.
const checks = [
  ["HIVE", 'text="HIVE"'],
  ["hero headline", 'h1:has-text("noise field")'],
  ["docs section", "#docs"],
  ["anatomy section", "#anatomy"],
  ["why /components/ui heading", 'h2:has-text("/components/ui")'],
];
for (const [label, sel] of checks) {
  const n = await page.locator(sel).count();
  if (n < 1) fail(`missing UI: ${label} (${sel})`);
  else ok(`UI present: ${label}`);
}

// 4) Exercise a copy button (interaction smoke test).
const copyBtn = page.locator('button[aria-label="Copy code"]').first();
if ((await copyBtn.count()) > 0) {
  await copyBtn.scrollIntoViewIfNeeded();
  await copyBtn.click();
  await page.waitForTimeout(200);
  const becameCopied =
    (await page.locator('button:has-text("Copied")').count()) > 0;
  if (becameCopied) ok("copy button toggles to Copied");
  else console.log("  note: copy button did not show 'Copied' (clipboard env)");
} else {
  fail("no copy button found in docs");
}

// 5) Desktop + mobile screenshots.
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(300);
await page.screenshot({ path: join(shotDir, "desktop.png"), fullPage: false });
ok("captured desktop screenshot");

await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(600);
await page.screenshot({ path: join(shotDir, "mobile.png"), fullPage: false });
ok("captured mobile screenshot");

// 6) No runtime errors.
if (errors.length) {
  console.error("  console/page errors:");
  for (const e of errors.slice(0, 10)) console.error("   -", e);
  fail(`${errors.length} runtime error(s)`);
} else {
  ok("no console/page errors");
}

await browser.close();
console.log(process.exitCode ? "\nVERIFY: FAILED" : "\nVERIFY: PASSED");
