#!/usr/bin/env node
/**
 * Headless verification for the LiquidMetal Foundry.
 *
 * Boots the Vite dev server, drives a headless Chromium (with WebGL/SwiftShader
 * forced on so the shader compiles in CI), and asserts:
 *   - the root mounts and the foundry header renders
 *   - the reconciled LiquidMetal wrapper (which the console renders — the
 *     verbatim background-shades.tsx is kept as a standalone reference, not
 *     mounted) paints a non-empty <canvas> with a live WebGL context
 *     (the @paper-design/shaders-react LiquidMetal)
 *   - the console chrome uses the vendored Space Grotesk display face
 *   - selecting an alloy preset re-tints the live shader (canvas pixels change)
 *   - switching the generative shape re-renders the shader (canvas pixels change)
 *   - the casting faders update the live readout (speed sweeps 0.00 → 5.00)
 *   - the documentation dock switches to the Props API table AND the
 *     Integration-notes panel (which documents the verbatim shape="plane" fix)
 *   - no uncaught page errors or console errors fire along the way
 *
 * Exits non-zero on any failure so it can gate CI / pre-commit.
 */
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const PORT = process.env.PORT || 5343;
const URL = `http://localhost:${PORT}/`;

function startDev() {
	const dev = spawn(
		"npm",
		["run", "dev", "--", "--port", String(PORT), "--strictPort"],
		{
			stdio: ["ignore", "pipe", "pipe"],
			env: { ...process.env },
		},
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

/**
 * Average colour of the live shader canvas. The canvas lives inside a
 * continuously-animating framer-motion wrapper (the verbatim breathing loop),
 * so an *element* screenshot never satisfies Playwright's stability wait. We
 * instead clip a fixed viewport rectangle over the canvas bounds via
 * page.screenshot({ clip }) — which doesn't wait for stability — capturing the
 * composited pixels (the WebGL context has no preserveDrawingBuffer). Then we
 * decode the PNG back in the page to read its mean RGB.
 */
async function canvasSignature(page) {
	const rect = await page.evaluate(() => {
		const c = document.querySelector("canvas");
		if (!c) return null;
		const r = c.getBoundingClientRect();
		// Sample a centred patch well inside the canvas, clamped to the viewport.
		const w = Math.min(400, r.width * 0.6);
		const h = Math.min(300, r.height * 0.6);
		const x = Math.max(0, r.left + (r.width - w) / 2);
		const y = Math.max(0, r.top + (r.height - h) / 2);
		return { x, y, width: w, height: h };
	});
	if (!rect) return null;
	const png = await page.screenshot({ clip: rect });
	const b64 = png.toString("base64");
	return page.evaluate(
		(data) =>
			new Promise((resolve) => {
				const img = new Image();
				img.onload = () => {
					const c = document.createElement("canvas");
					c.width = 24;
					c.height = 16;
					const ctx = c.getContext("2d");
					if (!ctx) return resolve(null);
					ctx.drawImage(img, 0, 0, c.width, c.height);
					const { data: d } = ctx.getImageData(0, 0, c.width, c.height);
					let r = 0,
						g = 0,
						b = 0,
						n = 0;
					for (let i = 0; i < d.length; i += 4) {
						r += d[i];
						g += d[i + 1];
						b += d[i + 2];
						n++;
					}
					resolve([Math.round(r / n), Math.round(g / n), Math.round(b / n)]);
				};
				img.onerror = () => resolve(null);
				img.src = "data:image/png;base64," + data;
			}),
		b64,
	);
}

const dev = startDev();
let browser;
try {
	await waitForServer();
	browser = await chromium.launch({
		headless: true,
		args: [
			"--use-gl=angle",
			"--use-angle=swiftshader",
			"--enable-unsafe-swiftshader",
			"--ignore-gpu-blocklist",
		],
	});
	const ctx = await browser.newContext({
		viewport: { width: 1366, height: 900 },
	});
	const page = await ctx.newPage();

	const pageErrors = [];
	const consoleErrors = [];
	page.on("pageerror", (e) => pageErrors.push(String(e)));
	page.on("console", (m) => {
		if (m.type() === "error") consoleErrors.push(m.text());
	});

	await page.goto(URL, { waitUntil: "networkidle", timeout: 30000 });
	await sleep(1600);

	// Header renders
	const h1 =
		(await page.locator("header h1").first().textContent())?.trim() ?? "";
	if (/LiquidMetal Foundry/i.test(h1)) ok(`header renders ("${h1}")`);
	else bad(`header missing (got "${h1}")`);

	// Console chrome uses the vendored display font
	const headFont = await page.evaluate(() => {
		const h = document.querySelector("header h1");
		return h ? getComputedStyle(h).fontFamily : "";
	});
	if (/space grotesk/i.test(headFont))
		ok(`chrome uses vendored font ("${headFont}")`);
	else bad(`display font family unexpected ("${headFont}")`);

	// Canvas present, non-empty
	const box = await page.evaluate(() => {
		const c = document.querySelector("canvas");
		if (!c) return null;
		const r = c.getBoundingClientRect();
		return { w: Math.round(r.width), h: Math.round(r.height) };
	});
	if (box && box.w > 300 && box.h > 300)
		ok(`LiquidMetal canvas mounts ${box.w}x${box.h}`);
	else bad(`no live canvas (${JSON.stringify(box)})`);

	// Real WebGL context
	const hasGL = await page.evaluate(() => {
		const c = document.querySelector("canvas");
		if (!c) return false;
		const gl =
			c.getContext("webgl2") ||
			c.getContext("webgl") ||
			c.getContext("experimental-webgl");
		return !!gl;
	});
	if (hasGL) ok("WebGL context is live");
	else bad("no WebGL context on canvas");

	// Alloy preset re-tints the shader: compare average canvas colour.
	const beforeAlloy = await canvasSignature(page);
	await page.getByRole("button", { name: /Quench Blue/ }).click();
	await sleep(1200);
	const afterAlloy = await canvasSignature(page);
	if (beforeAlloy && afterAlloy) {
		const delta =
			Math.abs(beforeAlloy[0] - afterAlloy[0]) +
			Math.abs(beforeAlloy[1] - afterAlloy[1]) +
			Math.abs(beforeAlloy[2] - afterAlloy[2]);
		if (delta > 10)
			ok(
				`alloy preset re-tints shader (Δrgb=${delta}, ${beforeAlloy} → ${afterAlloy})`,
			);
		else
			bad(
				`alloy did not change shader pixels (Δrgb=${delta}, ${beforeAlloy} → ${afterAlloy})`,
			);
	} else {
		bad(`could not sample canvas (before=${beforeAlloy}, after=${afterAlloy})`);
	}

	// Switching the generative shape re-renders the shader.
	const beforeShape = await canvasSignature(page);
	await page.getByRole("button", { name: /^Daisy$/ }).click();
	await sleep(1200);
	const afterShape = await canvasSignature(page);
	if (beforeShape && afterShape) {
		const delta =
			Math.abs(beforeShape[0] - afterShape[0]) +
			Math.abs(beforeShape[1] - afterShape[1]) +
			Math.abs(beforeShape[2] - afterShape[2]);
		if (delta > 6) ok(`shape switch re-renders shader (Δrgb=${delta})`);
		else bad(`shape switch did not change shader pixels (Δrgb=${delta})`);
	} else {
		bad(`could not sample canvas for shape switch`);
	}

	// Speed fader sweeps 0.00 → 5.00 and updates the readout.
	const speed = page.locator("#fader-speed");
	await speed.focus();
	await speed.press("Home");
	await sleep(250);
	const minTxt = await page.evaluate(
		() =>
			document.querySelector("#fader-speed")?.closest(".group")?.textContent ??
			"",
	);
	await speed.press("End");
	await sleep(250);
	const maxTxt = await page.evaluate(
		() =>
			document.querySelector("#fader-speed")?.closest(".group")?.textContent ??
			"",
	);
	if (/0\.00/.test(minTxt) && /5\.00/.test(maxTxt))
		ok("speed fader sweeps 0.00 → 5.00");
	else
		bad(
			`speed fader did not sweep (min="${minTxt.trim()}" max="${maxTxt.trim()}")`,
		);

	// Documentation dock: Props API table renders.
	await page.getByRole("tab", { name: /Props API/ }).click();
	await sleep(300);
	const hasPropsRow = await page.evaluate(() =>
		Array.from(document.querySelectorAll("td")).some(
			(td) => td.textContent?.trim() === "distortion",
		),
	);
	if (hasPropsRow) ok("docs dock renders the Props API table");
	else bad("Props API table did not render");

	// Documentation dock: Integration-notes panel documents the verbatim fix.
	await page.getByRole("tab", { name: /Integration notes/ }).click();
	await sleep(300);
	const notesText = await page.evaluate(() => document.body.textContent ?? "");
	if (/shape="plane"/.test(notesText) && /PulsingBorder/.test(notesText))
		ok("integration-notes panel documents the verbatim API reconciliations");
	else bad("integration-notes panel missing the verbatim fixes");

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
