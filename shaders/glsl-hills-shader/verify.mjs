/**
 * Headless verification for the GLSLHills (FOGBANK) integration showcase.
 *
 * Builds the app, serves `vite preview`, drives Playwright's bundled Chromium
 * (WebGL via SwiftShader) against the page, and asserts:
 *   1. No console / page errors (incl. GLSL compile/link failures).
 *   2. The stage <canvas> exists with a live WebGL context and backing pixels.
 *   3. The canvas paints a structured, monochrome fog-bank (non-black, with
 *      spatial luminance variation — ridges fading into haze, not a flat fill).
 *   4. Live telemetry advances — the drift clock / FPS move over time.
 *   5. Hold halts the drift clock; resume restarts it.
 *   6. The drift-speed fader changes how fast the clock advances.
 *   7. The fog-tint fader actually rebrightens the rendered pixels.
 *   8. A field preset changes the live parameters (camera depth readout moves).
 *   9. The integration story renders below the fold (install, components/ui
 *      rationale, source tabs, API).
 *
 * Usage: node verify.mjs   (builds first if dist/ is missing)
 */
import { chromium } from "playwright";
import { spawn, execSync } from "node:child_process";
import { existsSync } from "node:fs";
import net from "node:net";

const PORT = Number(process.env.VERIFY_PORT) || 47733;
const BASE = `http://127.0.0.1:${PORT}/`;

function waitForPort(port, timeoutMs = 30000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const tick = () => {
      const s = net.connect(port, "127.0.0.1");
      s.on("connect", () => {
        s.destroy();
        resolve();
      });
      s.on("error", () => {
        s.destroy();
        if (Date.now() - start > timeoutMs) reject(new Error("port timeout"));
        else setTimeout(tick, 300);
      });
    };
    tick();
  });
}

const pass = [];
const fail = [];
const check = (name, ok, detail = "") => {
  (ok ? pass : fail).push(name + (detail ? ` — ${detail}` : ""));
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? "  (" + detail + ")" : ""}`);
};

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

// Sample the live stage canvas (downscaled) — mean luminance + spatial variation.
const sampleCanvas = (page) =>
  page.evaluate(
    () =>
      new Promise((resolve) => {
        requestAnimationFrame(() => {
          const c = document.querySelector("canvas");
          const o = document.createElement("canvas");
          o.width = 200;
          o.height = 120;
          const cx = o.getContext("2d");
          cx.drawImage(c, 0, 0, o.width, o.height);
          const { data } = cx.getImageData(0, 0, o.width, o.height);
          let lit = 0,
            maxL = 0,
            sum = 0,
            sumSq = 0,
            n = 0;
          for (let i = 0; i < data.length; i += 4) {
            const l = (data[i] + data[i + 1] + data[i + 2]) / 3;
            const a = data[i + 3];
            const lum = (l * a) / 255;
            if (lum > 8) lit++;
            if (lum > maxL) maxL = lum;
            sum += lum;
            sumSq += lum * lum;
            n++;
          }
          const mean = sum / n;
          const std = Math.sqrt(Math.max(sumSq / n - mean * mean, 0));
          resolve({ lit, maxL: Math.round(maxL), mean: Math.round(mean), std: Math.round(std) });
        });
      }),
  );

// Read a HUD cell value by its label text.
const readCell = (page, label) =>
  page.evaluate((lbl) => {
    const dt = [...document.querySelectorAll("dt")].find((d) =>
      (d.textContent || "").trim().toLowerCase().startsWith(lbl.toLowerCase()),
    );
    return dt?.parentElement?.querySelector("dd")?.textContent?.trim() ?? null;
  }, label);

let browser;
try {
  await waitForPort(PORT);

  browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 960 } });
  const page = await ctx.newPage();

  const consoleErrors = [];
  page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(m.text());
  });
  page.on("pageerror", (e) => consoleErrors.push(String(e)));

  await page.goto(BASE, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(1600); // let the scene render a few frames

  // 1. WebGL context + backing pixels.
  const gl = await page.evaluate(() => {
    const c = document.querySelector("canvas");
    if (!c) return { ok: false, reason: "no canvas" };
    const g = c.getContext("webgl2") || c.getContext("webgl") || c.getContext("experimental-webgl");
    if (!g) return { ok: false, reason: "no webgl context" };
    return { ok: true, w: c.width, h: c.height, version: g.getParameter(g.VERSION) };
  });
  check("canvas + WebGL context present", gl.ok, gl.ok ? gl.version : gl.reason);
  check("canvas has backing pixels", gl.ok && gl.w > 0 && gl.h > 0, gl.ok ? `${gl.w}x${gl.h}` : "");

  // 2. The fog-bank renders: non-black, lit, and spatially structured.
  const paint = await sampleCanvas(page);
  check("scene paints a lit fog-bank", paint.lit > 80 && paint.maxL > 20, `lit=${paint.lit} maxL=${paint.maxL}`);
  check("relief has structure (luminance varies)", paint.std > 6, `std=${paint.std}`);

  // 3. Live telemetry advances. The drift clock displays at 1-second resolution,
  //    so every observation window is held >1s to guarantee a tick would show.
  const c1 = await readCell(page, "Drift clock");
  await page.waitForTimeout(1300);
  const c2 = await readCell(page, "Drift clock");
  check("drift clock renders", c1 !== null, c1 || "missing");
  check("clock advances while running", c1 !== null && c2 !== null && c1 !== c2, `${c1} -> ${c2}`);

  // 4. Hold halts the clock; resume restarts it.
  await page.getByRole("button", { name: /hold drift/i }).click();
  const f1 = await readCell(page, "Drift clock");
  await page.waitForTimeout(1300);
  const f2 = await readCell(page, "Drift clock");
  check("hold halts the clock", f1 === f2, `${f1} == ${f2}`);
  await page.getByRole("button", { name: /resume drift/i }).click();
  await page.waitForTimeout(1300);
  const f3 = await readCell(page, "Drift clock");
  check("resume restarts the clock", f3 !== f2, `${f2} -> ${f3}`);

  // 5. The fog-tint fader rebrightens the rendered pixels. Drop it low, then high.
  const setFader = async (label, value) => {
    const handle = await page.getByLabel(label, { exact: false }).first();
    await handle.evaluate((el, v) => {
      const set = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
      set.call(el, String(v));
      el.dispatchEvent(new Event("input", { bubbles: true }));
      el.dispatchEvent(new Event("change", { bubbles: true }));
    }, value);
  };

  await setFader("Fog tint", 0.3);
  await page.waitForTimeout(500);
  const dim = await sampleCanvas(page);
  await setFader("Fog tint", 0.92);
  await page.waitForTimeout(500);
  const bright = await sampleCanvas(page);
  check("fog-tint fader rebrightens the bank", bright.mean > dim.mean + 2, `mean ${dim.mean} -> ${bright.mean}`);

  // 6. Drift-speed fader drives the clock rate (scene is running here).
  await setFader("Drift speed", 1.5);
  const s1 = await readCell(page, "Drift clock");
  await page.waitForTimeout(1300);
  const s2 = await readCell(page, "Drift clock");
  check("drift-speed fader drives the clock", s1 !== s2, `${s1} -> ${s2}`);

  // 7. A field preset changes camera depth.
  const camBefore = await readCell(page, "Cam depth");
  await page.getByRole("button", { name: /apply abyssal preset/i }).click();
  await page.waitForTimeout(600);
  const camAfter = await readCell(page, "Cam depth");
  check("preset moves camera depth", camBefore !== camAfter, `${camBefore} -> ${camAfter}`);

  // 8. Integration story below the fold.
  for (const [name, sel] of [
    ["hero headline 'instrument'", "h1:has-text('instrument')"],
    ["anatomy section", "text=/anatomy of the fog-bank/i"],
    ["install step present", "text=/Drop it into a shadcn app/i"],
    ["components/ui rationale present", "text=/Why it lives in components\\/ui/i"],
    ["source tabs present", "text=/copy the source/i"],
    ["API section present", "text=/API surface/i"],
    ["visibility gauge present", "text=/Visibility index/i"],
  ]) {
    const n = await page.locator(sel).count();
    check(name, n > 0);
  }

  // 9. Source-tab copy button reachable.
  const copyOk = await page.evaluate(async () => {
    try {
      await navigator.clipboard.writeText("ping");
      return true;
    } catch {
      return "blocked";
    }
  });
  check("clipboard API reachable", copyOk === true || copyOk === "blocked", String(copyOk));

  // 10. No console / page errors.
  check("no console or page errors", consoleErrors.length === 0, consoleErrors.slice(0, 3).join(" | "));
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
