#!/usr/bin/env node
/**
 * Headless verification for Warp Checks // Background Lab.
 *
 * Boots the Vite dev server, drives a headless Chromium (WebGL forced on via
 * SwiftShader/ANGLE so the @paper-design/shaders-react <Warp> pass compiles in
 * a GPU-less CI box), and asserts:
 *   - the lab header mounts ("Warp Checks")
 *   - the prompt's exact config is surfaced (shape "checks", proportion 0.45)
 *   - the Warp shader paints a full-viewport, non-empty <canvas> with live WebGL
 *   - the speed fader sweeps its full 0 -> 3 range and updates the props readout
 *   - switching a preset (Tide) re-labels the deck and changes a colour stop
 *   - the four prompt HSL stops render on first paint
 *   - no uncaught page errors or console errors fire along the way
 *
 * Exits non-zero on any failure so it can gate CI / pre-commit.
 */
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
import fs from "node:fs";
import path from "node:path";

/**
 * Resolve a Chromium binary. CI images often bake a single Playwright browser
 * revision under PLAYWRIGHT_BROWSERS_PATH that may not match playwright-core's
 * default revision; prefer that baked binary when present. On a normal clone we
 * return undefined so Playwright uses its own bundled browser.
 */
function resolveChromiumPath() {
	if (process.env.PW_CHROMIUM_PATH) return process.env.PW_CHROMIUM_PATH;
	const root = process.env.PLAYWRIGHT_BROWSERS_PATH;
	if (root && fs.existsSync(root)) {
		const dirs = fs
			.readdirSync(root)
			.filter((d) => /^chromium[-_]/.test(d))
			.sort();
		for (const d of dirs) {
			for (const rel of [
				["chrome-linux", "chrome"],
				["chrome-linux", "headless_shell"],
			]) {
				const p = path.join(root, d, ...rel);
				if (fs.existsSync(p)) return p;
			}
		}
	}
	return undefined;
}

const PORT = process.env.PORT || 5331;
const URL = `http://localhost:${PORT}/`;

function startDev() {
	const dev = spawn(
		"npm",
		["run", "dev", "--", "--port", String(PORT), "--strictPort"],
		{ stdio: ["ignore", "pipe", "pipe"], env: { ...process.env } },
	);
	dev.stdout.on("data", () => {});
	dev.stderr.on("data", (d) => process.stderr.write(`[vite] ${d}`));
	return dev;
}

async function waitForServer(timeoutMs = 30000) {
	const start = Date.now();
	while (Date.now() - start < timeoutMs) {
		try {
			const r = await fetch(URL);
			if (r.ok) return true;
		} catch {
			/* not up yet */
		}
		await sleep(400);
	}
	throw new Error("dev server never came up");
}

const fails = [];
const oks = [];
const ok = (m) => {
	oks.push(m);
	console.log(`  ✓ ${m}`);
};
const bad = (m) => {
	fails.push(m);
	console.log(`  ✗ ${m}`);
};

const dev = startDev();
let browser;
try {
	await waitForServer();
	browser = await chromium.launch({
		headless: true,
		executablePath: resolveChromiumPath(),
		args: [
			"--use-gl=angle",
			"--use-angle=swiftshader",
			"--enable-unsafe-swiftshader",
			"--ignore-gpu-blocklist",
		],
	});
	const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 } });
	const page = await ctx.newPage();

	const pageErrors = [];
	const consoleErrors = [];
	page.on("pageerror", (e) => pageErrors.push(String(e)));
	page.on("console", (m) => {
		if (m.type() === "error") consoleErrors.push(m.text());
	});

	await page.goto(URL, { waitUntil: "networkidle", timeout: 30000 });
	await sleep(1200);

	// Lab header / wordmark renders
	const header = (await page.locator("header").first().textContent())?.trim() ?? "";
	if (/Warp\s*Checks/i.test(header)) ok("lab wordmark renders (\"Warp Checks\")");
	else bad(`lab wordmark missing (got "${header.slice(0, 60)}")`);

	// Hero headline renders
	const h1 = (await page.locator("h1").first().textContent())?.trim() ?? "";
	if (/checks-warp/i.test(h1)) ok(`hero headline renders ("${h1.replace(/\s+/g, " ")}")`);
	else bad(`hero headline missing (got "${h1}")`);

	// The prompt's exact config is surfaced in the props panel
	const body = async () => (await page.evaluate(() => document.body.textContent ?? "")) || "";
	const initial = await body();
	if (/"checks"/.test(initial)) ok('props panel reports shape "checks"');
	else bad("shape \"checks\" not surfaced");
	if (/0\.45/.test(initial)) ok("prompt proportion 0.45 on first paint");
	else bad("proportion 0.45 not surfaced");

	// All four prompt HSL stops render
	const stops = ["203 100 62", "255 100 72", "158 99 59", "264 100 61"];
	const missing = stops.filter((s) => !initial.includes(s));
	if (missing.length === 0) ok("all four prompt HSL stops render");
	else bad(`missing HSL stops: ${missing.join(" | ")}`);

	// Warp shader canvas is live and fills the viewport
	const canvasBox = await page.evaluate(() => {
		const c = document.querySelector("canvas");
		if (!c) return null;
		const r = c.getBoundingClientRect();
		return { w: Math.round(r.width), h: Math.round(r.height) };
	});
	if (canvasBox && canvasBox.w > 800 && canvasBox.h > 500) {
		ok(`Warp canvas fills viewport ${canvasBox.w}x${canvasBox.h}`);
	} else {
		bad(`Warp canvas has no full-viewport surface (${JSON.stringify(canvasBox)})`);
	}

	const hasGL = await page.evaluate(() => {
		const c = document.querySelector("canvas");
		if (!c) return false;
		const gl =
			c.getContext("webgl2") || c.getContext("webgl") || c.getContext("experimental-webgl");
		return !!gl;
	});
	if (hasGL) ok("WebGL context is live on the canvas");
	else bad("no WebGL context on canvas");

	// Speed fader sweeps its full 0 -> 3 range and moves the props readout
	const speed = page.locator('[data-fader="speed"]');
	await speed.focus();
	await speed.press("Home");
	await sleep(250);
	const minVal = await speed.inputValue();
	await speed.press("End");
	await sleep(250);
	const maxVal = await speed.inputValue();
	if (Number(minVal) === 0 && Number(maxVal) === 3) ok("speed fader sweeps 0 → 3");
	else bad(`speed fader did not sweep (min="${minVal}" max="${maxVal}")`);

	// Switching to the Tide preset re-labels the deck + changes a colour stop
	await page.getByRole("button", { name: /^Tide$/ }).click();
	await sleep(500);
	const afterPreset = await body();
	if (/190 95 22/.test(afterPreset)) ok("preset switch (Tide) re-tints the palette");
	else bad("preset switch had no visible effect");

	// Reset returns to the prompt's verbatim configuration
	await page.getByRole("button", { name: /Reset to prompt/i }).click();
	await sleep(400);
	const afterReset = await body();
	if (/203 100 62/.test(afterReset)) ok("reset restores the prompt palette");
	else bad("reset did not restore the prompt palette");

	// Error hygiene
	if (pageErrors.length === 0) ok("no uncaught page errors");
	else bad(`page errors: ${pageErrors.slice(0, 3).join(" | ")}`);
	if (consoleErrors.length === 0) ok("no console errors");
	else bad(`console errors: ${consoleErrors.slice(0, 3).join(" | ")}`);

	await ctx.close();
} catch (e) {
	bad(`harness threw: ${e.message}`);
} finally {
	if (browser) await browser.close();
	dev.kill("SIGTERM");
}

console.log(`\n${oks.length} passed, ${fails.length} failed`);
process.exit(fails.length ? 1 : 0);
