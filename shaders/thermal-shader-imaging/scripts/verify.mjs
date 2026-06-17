/**
 * Headless verification for the THERMA thermal imaging bay.
 *
 * Builds the app (if needed), serves the production bundle with `vite preview`,
 * and drives Playwright's bundled Chromium against it with software WebGL
 * (SwiftShader) so it runs on a GPU-less CI box. Rather than fight
 * `preserveDrawingBuffer`, we take real element screenshots and decode the PNGs
 * ourselves (no deps) to inspect actual painted pixels.
 *
 * Asserts:
 *   1. All five live <canvas> viewports mount with a WebGL2 context.
 *   2. The hero canvas paints a non-black field…
 *   3. …in saturated thermal-palette colors (not grayscale).
 *   4. The procedural heat wave animates (frame N differs from frame N+1).
 *   5. The telemetry clock advances (the bay is live).
 *   6. A pointer drag pumps heat without breaking rendering.
 *   7. The shadcn / Tailwind / TypeScript integration story renders.
 *   8. No unexpected console / page errors.
 *
 * Usage: node scripts/verify.mjs   (builds for you if dist/ is missing)
 */
import { chromium } from "playwright";
import { spawn, execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { inflateSync } from "node:zlib";
import net from "node:net";

const PORT = Number(process.env.VERIFY_PORT) || 47411;
const BASE = `http://127.0.0.1:${PORT}/`;

const pass = [];
const fail = [];
const check = (name, ok, detail = "") => {
  (ok ? pass : fail).push(name + (detail ? ` — ${detail}` : ""));
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? "  (" + detail + ")" : ""}`);
};

/** Decode an 8-bit truecolor(+alpha) PNG into flat RGBA-ish pixel stats. */
function decodePng(buf) {
  let pos = 8; // skip signature
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
  const out = new Uint8Array(width * height * channels);
  const prev = new Uint8Array(stride);
  const cur = new Uint8Array(stride);
  let p = 0;
  for (let y = 0; y < height; y++) {
    const filter = raw[p++];
    for (let x = 0; x < stride; x++) {
      const rb = raw[p++];
      const a = x >= channels ? cur[x - channels] : 0;
      const b = prev[x];
      const c = x >= channels ? prev[x - channels] : 0;
      let v;
      switch (filter) {
        case 1: v = rb + a; break;
        case 2: v = rb + b; break;
        case 3: v = rb + ((a + b) >> 1); break;
        case 4: {
          const pp = a + b - c;
          const pa = Math.abs(pp - a), pb = Math.abs(pp - b), pc = Math.abs(pp - c);
          v = rb + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c);
          break;
        }
        default: v = rb;
      }
      cur[x] = v & 0xff;
    }
    out.set(cur.subarray(0, stride), y * stride);
    prev.set(cur);
  }
  return { width, height, channels, pixels: out };
}

function frameStats(img) {
  const { pixels: d, channels: ch } = img;
  let lit = 0, maxL = 0, sat = 0, n = 0, rS = 0, gS = 0, bS = 0;
  for (let i = 0; i < d.length; i += ch) {
    const r = d[i], g = d[i + 1], b = d[i + 2];
    const l = r + g + b;
    const s = Math.max(r, g, b) - Math.min(r, g, b);
    if (l > 24) lit++;
    if (s > 45) sat++;
    if (l > maxL) maxL = l;
    rS += r; gS += g; bS += b;
    n++;
  }
  return {
    litFraction: lit / n,
    satFraction: sat / n,
    maxL,
    avg: { r: Math.round(rS / n), g: Math.round(gS / n), b: Math.round(bS / n) },
  };
}

/** Mean absolute per-channel difference between two same-size frames. */
function meanDiff(a, b) {
  const n = Math.min(a.pixels.length, b.pixels.length);
  let sum = 0;
  for (let i = 0; i < n; i++) sum += Math.abs(a.pixels[i] - b.pixels[i]);
  return sum / n;
}

function waitForPort(port, timeoutMs = 30000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const tick = () => {
      const s = net.connect(port, "127.0.0.1");
      s.on("connect", () => { s.destroy(); resolve(); });
      s.on("error", () => {
        s.destroy();
        if (Date.now() - start > timeoutMs) reject(new Error("port timeout"));
        else setTimeout(tick, 300);
      });
    };
    tick();
  });
}

if (!existsSync("dist/index.html")) {
  console.log("• dist/ missing — building…");
  execSync("npm run build", { stdio: "inherit" });
}

console.log("• starting preview server…");
const server = spawn(
  "npx",
  ["vite", "preview", "--port", String(PORT), "--strictPort", "--host", "127.0.0.1"],
  { stdio: "ignore" },
);

// SwiftShader noise we expect on a GPU-less box; everything else is an app bug.
const IGNORABLE = /SwiftShader|software WebGL|GroupMarkerNotSet|Automatic fallback|GPU stall|deprecated/i;

// Prefer an explicit CHROME_PATH or a provisioned browser (handy on locked-down
// CI where Playwright can't download its version-matched build); otherwise let
// Playwright resolve its own bundled Chromium.
function resolveChrome() {
  if (process.env.CHROME_PATH && existsSync(process.env.CHROME_PATH)) return process.env.CHROME_PATH;
  for (const p of ["/opt/pw-browsers/chromium"]) {
    if (existsSync(p)) return p;
  }
  return undefined;
}

let browser;
try {
  await waitForPort(PORT);
  const executablePath = resolveChrome();
  if (executablePath) console.log(`• using Chromium at ${executablePath}`);
  browser = await chromium.launch({
    executablePath,
    args: [
      "--no-sandbox",
      "--use-gl=angle",
      "--use-angle=swiftshader",
      "--enable-unsafe-swiftshader",
      "--ignore-gpu-blocklist",
    ],
  });
  const ctx = await browser.newContext({ viewport: { width: 1320, height: 900 } });
  const page = await ctx.newPage();

  const errors = [];
  page.on("console", (m) => {
    if (m.type() === "error" && !IGNORABLE.test(m.text())) errors.push(m.text());
  });
  page.on("pageerror", (e) => { if (!IGNORABLE.test(String(e))) errors.push(String(e)); });

  await page.goto(BASE, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(2000); // let textures load + a few frames render

  // 1. All five viewports mount with WebGL2.
  const gl = await page.evaluate(() => {
    const cs = [...document.querySelectorAll("canvas")];
    return {
      count: cs.length,
      webgl2: cs.filter((c) => !!c.getContext("webgl2")).length,
      sized: cs.filter((c) => c.width > 0 && c.height > 0).length,
    };
  });
  check("five live viewports present", gl.count >= 5, `${gl.count} canvases`);
  check("every viewport has a WebGL2 context", gl.webgl2 >= 5, `${gl.webgl2}/${gl.count}`);
  check("viewports have backing pixels", gl.sized >= 5, `${gl.sized}/${gl.count}`);

  const heroCanvas = page.locator("canvas").first();

  // 2/3. Hero paints a non-black, saturated thermal field.
  const shot1 = decodePng(await heroCanvas.screenshot());
  if (!shot1) throw new Error("could not decode hero screenshot");
  const s1 = frameStats(shot1);
  check("hero paints a non-black field", s1.litFraction > 0.05 && s1.maxL > 80,
    `lit=${(s1.litFraction * 100).toFixed(1)}% maxL=${s1.maxL}`);
  check("field reads in saturated thermal color", s1.satFraction > 0.02,
    `sat=${(s1.satFraction * 100).toFixed(1)}% avg=rgb(${s1.avg.r},${s1.avg.g},${s1.avg.b})`);

  // 4. Procedural heat wave animates between frames.
  await page.waitForTimeout(850);
  const shot2 = decodePng(await heroCanvas.screenshot());
  const diff = shot2 ? meanDiff(shot1, shot2) : 0;
  check("procedural heat wave animates", diff > 1.2, `meanDiff=${diff.toFixed(2)}`);

  // 5. Telemetry clock advances.
  const t1 = await page.locator("text=/\\d+\\.\\d+s/").first().textContent().catch(() => null);
  await page.waitForTimeout(700);
  const t2 = await page.locator("text=/\\d+\\.\\d+s/").first().textContent().catch(() => null);
  check("telemetry clock renders + advances", !!t1 && !!t2 && t1 !== t2, `${t1} -> ${t2}`);

  // 6. Pointer drag pumps heat without breaking rendering.
  const box = await heroCanvas.boundingBox();
  await page.mouse.move(box.x + box.width * 0.3, box.y + box.height * 0.6);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.7, box.y + box.height * 0.3, { steps: 16 });
  await page.waitForTimeout(250);
  await page.mouse.up();
  const shot3 = decodePng(await heroCanvas.screenshot());
  const s3 = shot3 ? frameStats(shot3) : { litFraction: 0 };
  check("pointer drag keeps the field rendering", s3.litFraction > 0.04,
    `lit=${(s3.litFraction * 100).toFixed(1)}%`);

  // 7. Integration story renders.
  for (const [name, sel] of [
    ["two-up '×' usage present", "text=/^×$/"],
    ["integration section present", "text=Wire it into a shadcn project"],
    ["components/ui rationale present", "text=/Why a components\\/ui folder/i"],
    ["thermal LUT / palette present", "text=/thermal LUT/i"],
    ["props reference present", "text=/^Props$/"],
    ["how-to-use section present", "text=/How to use the bay/i"],
  ]) {
    const n = await page.locator(sel).count();
    check(name, n > 0);
  }

  // 8. No unexpected console / page errors.
  check("no console or page errors", errors.length === 0, errors.slice(0, 3).join(" | "));
} catch (err) {
  console.error("VERIFY ERROR:", err);
  fail.push("harness: " + err.message);
} finally {
  if (browser) await browser.close().catch(() => {});
  server.kill("SIGTERM");
}

console.log(`\n${pass.length} passed, ${fail.length} failed`);
if (fail.length) {
  console.log("FAILURES:\n - " + fail.join("\n - "));
  process.exit(1);
}
console.log("ALL CHECKS PASSED ✓");
