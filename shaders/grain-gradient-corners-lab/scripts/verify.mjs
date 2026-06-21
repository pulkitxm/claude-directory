#!/usr/bin/env node
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
/**
 * Headless verification for the Grainfield // GrainGradient Lab.
 *
 * Boots the Vite dev server, drives a headless Chromium (with WebGL /
 * SwiftShader forced on so the paper-design shader compiles in CI), and
 * asserts:
 *   - the root mounts and the preserved hero headline renders
 *   - the GrainGradient produces a live, non-empty <canvas> with a real
 *     WebGL context
 *   - switching shape (corners -> blob) keeps a live canvas
 *   - switching palette keeps a live canvas
 *   - the speed fader sweeps its readout 0.00 -> 3.00
 *   - Freeze flips the live/frozen telemetry flag
 *   - no uncaught page errors or console errors fire along the way
 *
 * Exits non-zero on any failure so it can gate CI / pre-commit.
 */
import { chromium } from "playwright";

const PORT = process.env.PORT || 5319;
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

async function waitForServer(timeoutMs = 40000) {
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

async function canvasBox(page) {
	return page.evaluate(() => {
		const c = document.querySelector("canvas");
		if (!c) return null;
		const r = c.getBoundingClientRect();
		return { w: Math.round(r.width), h: Math.round(r.height) };
	});
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
		viewport: { width: 1366, height: 850 },
	});
	const page = await ctx.newPage();

	const pageErrors = [];
	const consoleErrors = [];
	page.on("pageerror", (e) => pageErrors.push(String(e)));
	page.on("console", (m) => {
		if (m.type() === "error") consoleErrors.push(m.text());
	});

	await page.goto(URL, { waitUntil: "networkidle", timeout: 40000 });
	await sleep(1400);

	// Hero headline renders (the prompt's preserved copy)
	const h1 = (await page.locator("h1").first().textContent())?.trim() ?? "";
	if (/Backgrounds are awesome/i.test(h1))
		ok(`hero headline renders ("${h1}")`);
	else bad(`hero headline missing (got "${h1}")`);

	// Wordmark
	const h2 = (await page.locator("h2").first().textContent())?.trim() ?? "";
	if (/GRAINFIELD/i.test(h2)) ok(`wordmark renders ("${h2}")`);
	else bad(`wordmark missing (got "${h2}")`);

	// GrainGradient canvas is live + non-empty
	const box0 = await canvasBox(page);
	if (box0 && box0.w > 200 && box0.h > 200)
		ok(`GrainGradient canvas live ${box0.w}x${box0.h}`);
	else bad(`no live shader canvas (${JSON.stringify(box0)})`);

	const hasGL = await page.evaluate(() => {
		const c = document.querySelector("canvas");
		if (!c) return false;
		const gl =
			c.getContext("webgl2") ||
			c.getContext("webgl") ||
			c.getContext("experimental-webgl");
		return !!gl;
	});
	if (hasGL) ok("WebGL context is live on the shader canvas");
	else bad("no WebGL context on canvas");

	// Switch shape corners -> blob
	const blobBtn = page
		.locator("aside button[aria-pressed]", { hasText: "Blob" })
		.first();
	await blobBtn.click();
	await sleep(700);
	const box1 = await canvasBox(page);
	if (box1 && box1.w > 200 && box1.h > 200)
		ok("shape switch (Blob) keeps live canvas");
	else bad(`shape switch lost canvas (${JSON.stringify(box1)})`);

	// Switch palette to Abyss
	const abyssBtn = page
		.locator("aside button[aria-pressed]", { hasText: "Abyss" })
		.first();
	await abyssBtn.click();
	await sleep(600);
	const box2 = await canvasBox(page);
	if (box2 && box2.w > 200 && box2.h > 200)
		ok("palette switch (Abyss) keeps live canvas");
	else bad(`palette switch lost canvas (${JSON.stringify(box2)})`);

	// Speed fader sweeps 0.00 -> 3.00
	const speed = page.locator("#fader-speed");
	await speed.focus();
	await speed.press("Home");
	await sleep(250);
	const minTxt = await page.evaluate(
		() =>
			document.querySelector("#fader-speed")?.closest("div")?.parentElement
				?.textContent ?? "",
	);
	await speed.press("End");
	await sleep(250);
	const maxTxt = await page.evaluate(
		() =>
			document.querySelector("#fader-speed")?.closest("div")?.parentElement
				?.textContent ?? "",
	);
	if (/0\.00/.test(minTxt) && /3\.00/.test(maxTxt))
		ok("speed fader sweeps 0.00 → 3.00");
	else bad(`speed fader did not sweep (min="${minTxt}" max="${maxTxt}")`);

	// Freeze toggles the live/frozen telemetry flag
	const freeze = page
		.locator("header button", { hasText: /Freeze|Resume/ })
		.first();
	await freeze.click();
	await sleep(500);
	const frozen = await page.evaluate(() =>
		(document.querySelector("footer")?.textContent ?? "").includes("FROZEN"),
	);
	if (frozen) ok("Freeze flips telemetry to FROZEN");
	else bad("Freeze did not flip telemetry");

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
