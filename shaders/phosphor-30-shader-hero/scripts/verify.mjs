/**
 * Headless verification for the phosphor-30 shader hero.
 *
 * Boots the Vite preview build, drives a headless Chromium through it and
 * asserts:
 *   1. the page mounts with no console errors / page errors,
 *   2. a WebGL2 canvas exists and its context is live (not lost),
 *   3. the shader program is actually drawing — the framebuffer contains
 *      non-black phosphor pixels (proves compile + link + draw succeeded),
 *   4. the HUD chrome (headline + live FPS readout) rendered.
 *
 * Usage: node scripts/verify.mjs
 * Requires Playwright + Chromium. We reuse the copy installed by the repo's
 * scripts/record-demos when present, else fall back to a local install.
 */
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(__dirname, "..");
const recorderDir = path.resolve(projectDir, "../../scripts/record-demos");
const PORT = 4319;
const URL = `http://localhost:${PORT}/`;

function loadPlaywright() {
  for (const base of [projectDir, recorderDir]) {
    try {
      const req = createRequire(path.join(base, "package.json"));
      return req("playwright");
    } catch {
      /* try next */
    }
  }
  throw new Error(
    "Playwright not found. Run `npm install` in scripts/record-demos first.",
  );
}

function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const poll = async () => {
      try {
        const res = await fetch(url);
        if (res.ok) return resolve();
      } catch {
        /* not up yet */
      }
      if (Date.now() - start > timeoutMs) return reject(new Error("server timeout"));
      setTimeout(poll, 300);
    };
    poll();
  });
}

let failed = false;
const check = (name, ok, detail = "") => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failed = true;
};

const server = spawn(
  "npm",
  ["run", "preview", "--", "--port", String(PORT), "--strictPort"],
  { cwd: projectDir, stdio: ["ignore", "pipe", "pipe"] },
);
let serverLog = "";
server.stdout.on("data", (d) => (serverLog += d));
server.stderr.on("data", (d) => (serverLog += d));

const cleanup = () => {
  try {
    server.kill("SIGTERM");
  } catch {
    /* noop */
  }
};

try {
  const { chromium } = loadPlaywright();
  await waitForServer(URL);

  const browser = await chromium.launch({
    args: ["--use-gl=angle", "--use-angle=swiftshader", "--ignore-gpu-blocklist"],
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  const consoleErrors = [];
  page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(m.text());
  });
  const pageErrors = [];
  page.on("pageerror", (e) => pageErrors.push(e.message));

  await page.goto(URL, { waitUntil: "networkidle" });
  // Let the shader run for a moment so the field accumulates brightness.
  await page.waitForTimeout(2500);

  // 1. canvas + live WebGL2 context
  const gl = await page.evaluate(() => {
    const c = document.querySelector("canvas");
    if (!c) return { present: false };
    const ctx = c.getContext("webgl2");
    return {
      present: true,
      hasContext: !!ctx,
      lost: ctx ? ctx.isContextLost() : true,
      w: c.width,
      h: c.height,
    };
  });
  check("canvas present", gl.present);
  check("webgl2 context live", gl.hasContext && !gl.lost, `${gl.w}x${gl.h}`);

  // 2. shader is actually drawing. Re-acquiring the canvas context to
  //    readPixels is unreliable (the swapped buffer reads empty), so instead
  //    we screenshot the composited canvas and analyse the PNG's luminance by
  //    drawing it back into an off-screen 2D canvas in-page.
  const canvasEl = page.locator("canvas");
  const shot = await canvasEl.screenshot();
  const dataUrl = `data:image/png;base64,${shot.toString("base64")}`;
  const lit = await page.evaluate(async (url) => {
    const img = new Image();
    await new Promise((res, rej) => {
      img.onload = res;
      img.onerror = rej;
      img.src = url;
    });
    const cv = document.createElement("canvas");
    cv.width = img.naturalWidth;
    cv.height = img.naturalHeight;
    const ctx = cv.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const { data } = ctx.getImageData(0, 0, cv.width, cv.height);
    let maxLum = 0;
    let lit = 0;
    let total = 0;
    // Sample on a coarse stride for speed.
    for (let i = 0; i < data.length; i += 4 * 97) {
      const lum = data[i] + data[i + 1] + data[i + 2];
      maxLum = Math.max(maxLum, lum);
      if (lum > 24) lit++;
      total++;
    }
    return { maxLum, litPct: (100 * lit) / total };
  }, dataUrl);
  check(
    "shader draws phosphor pixels",
    lit.maxLum > 60 && lit.litPct > 1,
    `maxLum=${lit.maxLum} litArea=${lit.litPct.toFixed(1)}%`,
  );

  // 3. HUD chrome
  const headline = (await page.locator("h1").innerText()).replace(/\s+/g, " ").trim();
  check("headline rendered", /FIELD OF\s+LIGHT/i.test(headline), JSON.stringify(headline));

  const fpsText = await page.getByText(/FPS/).first().innerText();
  check("live FPS readout present", /\bFPS\b/.test(fpsText), JSON.stringify(fpsText.trim()));

  // 4. no runtime errors
  check("no page errors", pageErrors.length === 0, pageErrors.join(" | "));
  check("no console errors", consoleErrors.length === 0, consoleErrors.join(" | "));

  await browser.close();
} catch (err) {
  console.error("VERIFY ERROR:", err?.message ?? err);
  console.error("--- server log (tail) ---\n" + serverLog.split("\n").slice(-15).join("\n"));
  failed = true;
} finally {
  cleanup();
}

console.log(failed ? "\nVERIFY: FAILED" : "\nVERIFY: OK");
process.exit(failed ? 1 : 0);
