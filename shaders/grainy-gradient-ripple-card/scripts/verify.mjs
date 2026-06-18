/**
 * Headless verification for the Chroma Foundry gradient-shader card.
 *
 * Boots the Vite dev server, drives a headless Chromium through the app, and
 * asserts that:
 *   1. the page renders and the R3F <canvas> is present + sized,
 *   2. the WebGL canvas paints the multi-stop gradient (many distinct colours,
 *      not a blank/solid frame),
 *   3. clicking the plate casts a ripple (telemetry "ripples live" rises and a
 *      DOM ripple marker appears),
 *   4. the field faders mutate the live shader uniforms,
 *   5. the console chrome (palette stops, presets, telemetry) is present.
 *
 * CLI-only: no GUI, no manual steps. Run with `npm run verify`.
 *
 * Playwright is resolved from the repo's demo-recorder install so this script
 * needs no extra dependency in the project itself.
 */
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import net from "node:net";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT = path.resolve(__dirname, "..");

// Resolve Playwright from the demo-recorder install. In a git worktree the
// recorder's node_modules live in the *main* checkout, so try a few candidate
// roots (worktree recorder, this project, then walk up to any sibling
// scripts/record-demos) before giving up.
function resolvePlaywright() {
  const candidates = [
    path.resolve(PROJECT, "../../scripts/record-demos/package.json"),
    path.join(PROJECT, "package.json"),
  ];
  // If we're inside a git worktree (.claude/worktrees/<name>/...), the recorder
  // with node_modules lives in the main checkout — splice it back in.
  const marker = `${path.sep}.claude${path.sep}worktrees${path.sep}`;
  const idx = PROJECT.indexOf(marker);
  if (idx !== -1) {
    const mainRoot = PROJECT.slice(0, idx);
    candidates.push(
      path.join(mainRoot, "scripts/record-demos/package.json"),
    );
  }
  // Walk up from the project looking for a scripts/record-demos with playwright.
  let dir = PROJECT;
  for (let i = 0; i < 8; i++) {
    candidates.push(path.join(dir, "scripts/record-demos/package.json"));
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  for (const base of candidates) {
    try {
      const req = createRequire(base);
      const pw = req("playwright");
      return pw;
    } catch {
      /* try next */
    }
  }
  throw new Error(
    "Could not resolve 'playwright'. Run `npm install` in scripts/record-demos first.",
  );
}
const { chromium } = resolvePlaywright();

const PORT = Number(process.env.VERIFY_PORT || 5311);
const URL = `http://localhost:${PORT}/`;

function waitForPort(port, timeoutMs) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const attempt = () => {
      const sock = net.connect(port, "127.0.0.1");
      sock.on("connect", () => {
        sock.destroy();
        resolve();
      });
      sock.on("error", () => {
        sock.destroy();
        if (Date.now() - start > timeoutMs)
          reject(new Error("dev server never came up"));
        else setTimeout(attempt, 300);
      });
    };
    attempt();
  });
}

const results = [];
const ok = (m) => {
  results.push(["PASS", m]);
  console.log("  ✓", m);
};
const fail = (m) => {
  results.push(["FAIL", m]);
  console.log("  ✗", m);
};

let dev;
async function main() {
  console.log("=== starting dev server ===");
  dev = spawn(
    "npm",
    ["run", "dev", "--", "--port", String(PORT), "--strictPort"],
    { cwd: PROJECT, stdio: "ignore" },
  );
  await waitForPort(PORT, 60000);
  await new Promise((r) => setTimeout(r, 1200));
  console.log("dev server up on", URL);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  const pageErrors = [];
  page.on("pageerror", (e) => pageErrors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") pageErrors.push(m.text());
  });

  console.log("\n=== loading app ===");
  await page.goto(URL, { waitUntil: "load", timeout: 60000 });
  await page.waitForSelector("canvas", { timeout: 20000 });
  // Let the shader warm up and several auto-ripples fire.
  await page.waitForTimeout(3500);

  // 1. canvas present + sized
  const canvasBox = await page.$eval("canvas", (c) => {
    const r = c.getBoundingClientRect();
    return { w: Math.round(r.width), h: Math.round(r.height) };
  });
  if (canvasBox.w > 200 && canvasBox.h > 150)
    ok(`R3F canvas present and sized (${canvasBox.w}x${canvasBox.h})`);
  else fail(`canvas missing or too small (${canvasBox.w}x${canvasBox.h})`);

  // 2. WebGL paints a multi-colour gradient
  const colorStats = await page.evaluate(() => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return null;
    const gl =
      canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) return { noGl: true };
    const w = canvas.width;
    const h = canvas.height;
    const px = new Uint8Array(w * h * 4);
    gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, px);
    // Sample a coarse grid and bucket colours.
    const buckets = new Set();
    let nonBlack = 0;
    let sampled = 0;
    const step = 17;
    for (let y = 0; y < h; y += step) {
      for (let x = 0; x < w; x += step) {
        const i = (y * w + x) * 4;
        const r = px[i],
          g = px[i + 1],
          b = px[i + 2];
        sampled++;
        if (r + g + b > 24) nonBlack++;
        buckets.add(`${r >> 5}-${g >> 5}-${b >> 5}`);
      }
    }
    return {
      distinctColors: buckets.size,
      nonBlackRatio: nonBlack / Math.max(1, sampled),
      sampled,
    };
  });

  if (!colorStats || colorStats.noGl) {
    fail("WebGL context unavailable on the canvas");
  } else {
    if (colorStats.distinctColors >= 8)
      ok(
        `gradient renders ${colorStats.distinctColors} distinct colour buckets`,
      );
    else
      fail(
        `too few distinct colours (${colorStats.distinctColors}) — gradient may be blank`,
      );
    if (colorStats.nonBlackRatio > 0.6)
      ok(
        `frame is filled (${(colorStats.nonBlackRatio * 100).toFixed(0)}% non-black samples)`,
      );
    else
      fail(
        `frame mostly empty (${(colorStats.nonBlackRatio * 100).toFixed(0)}% non-black)`,
      );
  }

  // 3. clicking the plate casts a ripple
  const readLive = async () => {
    // "ripples live" telemetry value, e.g. "1 / 10" -> 1
    const txt = await page
      .locator("dt", { hasText: "ripples live" })
      .locator("xpath=following-sibling::dd[1]")
      .first()
      .textContent();
    return parseInt((txt || "0").split("/")[0].trim(), 10) || 0;
  };

  const card = page.locator('[aria-label="Gradient specimen — click to cast a ripple"]');
  await card.waitFor({ timeout: 10000 });
  const beforeMarks = await page.locator(".animate-ping-ring").count();
  const box = await card.boundingBox();
  // Click three spots on the plate.
  for (const [fx, fy] of [
    [0.5, 0.5],
    [0.3, 0.4],
    [0.7, 0.6],
  ]) {
    await page.mouse.click(box.x + box.width * fx, box.y + box.height * fy);
    await page.waitForTimeout(120);
  }
  await page.waitForTimeout(150);
  const afterMarks = await page.locator(".animate-ping-ring").count();
  const liveAfter = await readLive();

  if (afterMarks > beforeMarks)
    ok(`click casts ripple markers (${beforeMarks} -> ${afterMarks})`);
  else fail(`no ripple markers appeared after click (${afterMarks})`);
  if (liveAfter >= 1)
    ok(`telemetry reports ${liveAfter} live ripple(s) off the shader`);
  else fail("telemetry never registered a live ripple");

  // 4. faders mutate the live uniform
  const firstFader = page.locator('input[type="range"]').first();
  await firstFader.waitFor({ timeout: 5000 });
  // Ensure the per-frame uniform read seam is live before sampling.
  await page.waitForFunction(
    () => typeof window.__chromaUniform === "function",
    { timeout: 5000 },
  );
  const uniformBefore = await page.evaluate(() => window.__chromaUniform());
  // Drive the Grain fader (noiseIntensity) to a high value deterministically.
  await firstFader.fill("2.8");
  await firstFader.dispatchEvent("input");
  await page.waitForTimeout(250);
  const uniformAfter = await page.evaluate(() => window.__chromaUniform());
  if (
    typeof uniformBefore === "number" &&
    typeof uniformAfter === "number" &&
    Math.abs(uniformAfter - uniformBefore) > 0.01
  )
    ok(
      `fader mutates live shader uniform (noiseIntensity ${uniformBefore.toFixed(2)} -> ${uniformAfter.toFixed(2)})`,
    );
  else
    fail(
      `uniform did not change via fader (before=${uniformBefore}, after=${uniformAfter})`,
    );

  // 5. console chrome present
  const paletteChips = await page.getByText(/multiColorGradient/).count();
  const presetBtns = await page.getByRole("button", { pressed: false }).count();
  const hasPresets = (await page.getByText("Foundry").count()) > 0;
  if (paletteChips > 0) ok("palette reference strip present");
  else fail("palette strip missing");
  if (hasPresets && presetBtns >= 1) ok("patch preset bank present");
  else fail("preset bank missing");

  // page errors
  const realErrors = pageErrors.filter(
    (e) => !/Download the React DevTools/i.test(e),
  );
  if (realErrors.length === 0) ok("no runtime/page errors");
  else fail(`runtime errors: ${realErrors.slice(0, 3).join(" | ")}`);

  await browser.close();

  const failed = results.filter((r) => r[0] === "FAIL");
  console.log(
    `\n=== ${results.length - failed.length}/${results.length} checks passed ===`,
  );
  if (failed.length) {
    console.log("FAILURES:");
    failed.forEach((f) => console.log("  -", f[1]));
    process.exitCode = 1;
  }
}

main()
  .catch((e) => {
    console.error("VERIFY ERROR:", e);
    process.exitCode = 1;
  })
  .finally(() => {
    if (dev) {
      try {
        process.kill(-dev.pid);
      } catch {
        dev.kill("SIGKILL");
      }
    }
  });
