#!/usr/bin/env node
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
/**
 * Headless verification for the Paper Shaders Hero Lab.
 *
 * Boots the Vite dev server, drives a headless Chromium (WebGL/SwiftShader forced
 * on so the shaders compile in CI), and asserts:
 *   - the root mounts and the brand header renders
 *   - the verbatim hero headline renders with the vendored Instrument Serif face
 *   - both @paper-design/shaders-react canvases mount with live WebGL contexts
 *     (the two MeshGradient layers + the PulsingBorder ring = 3 canvases)
 *   - the verbatim hero copy is present ("Beautiful Shader Experiences")
 *   - switching to Lab view reveals the control deck, and a palette preset
 *     re-tints the live shader (canvas pixels change)
 *   - a geometry fader sweeps its readout (Base Speed 0.00 -> 2.00)
 *   - the wireframe toggle flips its aria-checked state
 *   - the docs dock switches to the Props API table
 *   - no uncaught page errors or console errors fire along the way
 *
 * Exits non-zero on any failure so it can gate CI / pre-commit.
 */
import { chromium } from "playwright";

const PORT = process.env.PORT || 5331;
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

/** Average colour of the first live shader canvas (the base MeshGradient). */
async function canvasSignature(page) {
	const png = await page.locator("canvas").first().screenshot();
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
				img.src = `data:image/png;base64,${data}`;
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
		viewport: { width: 1366, height: 860 },
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
	if (/Paper Shaders/i.test(h1)) ok(`header renders ("${h1}")`);
	else bad(`header missing (got "${h1}")`);

	// Verbatim hero copy present
	const heroCopy = await page.evaluate(() => document.body.innerText);
	if (/Beautiful\s+Shader/i.test(heroCopy) && /Experiences/i.test(heroCopy))
		ok("verbatim hero copy renders (Beautiful Shader Experiences)");
	else bad("verbatim hero copy missing");

	// Hero headline uses the vendored Instrument Serif face (.instrument span)
	const heroFont = await page.evaluate(() => {
		const el = document.querySelector(".instrument");
		return el ? getComputedStyle(el).fontFamily : "";
	});
	if (/instrument serif/i.test(heroFont))
		ok(`hero wordmark uses vendored Instrument Serif ("${heroFont}")`);
	else bad(`hero wordmark font unexpected ("${heroFont}")`);

	// Canvases: 2 MeshGradient + 1 PulsingBorder = 3, all with WebGL contexts
	const canvasInfo = await page.evaluate(() => {
		const cs = Array.from(document.querySelectorAll("canvas"));
		const gl = cs.filter((c) => {
			const g =
				c.getContext("webgl2") ||
				c.getContext("webgl") ||
				c.getContext("experimental-webgl");
			return !!g;
		});
		const big = cs.filter((c) => {
			const r = c.getBoundingClientRect();
			return r.width > 300 && r.height > 300;
		});
		return { total: cs.length, gl: gl.length, big: big.length };
	});
	if (canvasInfo.total >= 3)
		ok(`mounts ${canvasInfo.total} shader canvases (2 mesh + pulse ring)`);
	else bad(`expected >=3 canvases, got ${canvasInfo.total}`);
	if (canvasInfo.gl >= 3)
		ok(`all ${canvasInfo.gl} canvases have live WebGL contexts`);
	else bad(`only ${canvasInfo.gl} canvases have WebGL contexts`);
	if (canvasInfo.big >= 2)
		ok(`full-viewport mesh layers present (${canvasInfo.big} large canvases)`);
	else bad(`mesh layers not full-size (${canvasInfo.big} large canvases)`);

	// Enter Lab view to reveal the control deck
	await page.getByRole("button", { name: /^Lab$/ }).click();
	await sleep(700);
	const deckVisible = await page.evaluate(
		() => !!document.querySelector("#fader-distortion"),
	);
	if (deckVisible) ok("Lab view reveals the control deck");
	else bad("control deck did not mount in Lab view");

	// Preset re-tints the shader: compare average canvas colour before/after.
	const before = await canvasSignature(page);
	await page.getByRole("button", { name: /Abyssal/ }).click();
	await sleep(1300);
	const after = await canvasSignature(page);
	if (before && after) {
		const delta =
			Math.abs(before[0] - after[0]) +
			Math.abs(before[1] - after[1]) +
			Math.abs(before[2] - after[2]);
		if (delta > 10)
			ok(`preset re-tints shader (Δrgb=${delta}, ${before} → ${after})`);
		else
			bad(
				`preset did not change shader pixels (Δrgb=${delta}, ${before} → ${after})`,
			);
	} else {
		bad(`could not sample canvas (before=${before}, after=${after})`);
	}

	// Base Speed fader sweeps 0.00 -> 2.00 and updates the readout.
	const speed = page.locator("#fader-basespeed");
	await speed.focus();
	await speed.press("Home");
	await sleep(250);
	const minTxt = await page.evaluate(
		() =>
			document.querySelector("#fader-basespeed")?.closest(".group")
				?.textContent ?? "",
	);
	await speed.press("End");
	await sleep(250);
	const maxTxt = await page.evaluate(
		() =>
			document.querySelector("#fader-basespeed")?.closest(".group")
				?.textContent ?? "",
	);
	if (/0\.00/.test(minTxt) && /2\.00/.test(maxTxt))
		ok("base speed fader sweeps 0.00 → 2.00");
	else
		bad(
			`base speed fader did not sweep (min="${minTxt.trim()}" max="${maxTxt.trim()}")`,
		);

	// Wireframe toggle flips aria-checked
	const sw = page.getByRole("switch");
	const checkedBefore = await sw.getAttribute("aria-checked");
	await sw.click();
	await sleep(300);
	const checkedAfter = await sw.getAttribute("aria-checked");
	if (checkedBefore !== checkedAfter)
		ok(`wireframe toggle flips (${checkedBefore} → ${checkedAfter})`);
	else bad(`wireframe toggle did not flip (${checkedBefore})`);

	// Documentation dock switches to the Props API table.
	await page.getByRole("tab", { name: /Props API/ }).click();
	await sleep(300);
	const hasPropsRow = await page.evaluate(() =>
		Array.from(document.querySelectorAll("td")).some(
			(td) => td.textContent?.trim() === "config.swirl",
		),
	);
	if (hasPropsRow) ok("docs dock renders the Props API table");
	else bad("Props API table did not render");

	// Error hygiene
	if (pageErrors.length === 0) ok("no uncaught page errors");
	else bad(`page errors: ${pageErrors.slice(0, 3).join(" | ")}`);
	if (consoleErrors.length === 0) ok("no console errors");
	else bad(`console errors: ${consoleErrors.slice(0, 3).join(" | ")}`);

	await ctx.close();

	for (const width of [390, 768, 1280]) {
		const height = width === 390 ? 844 : width === 768 ? 1024 : 900;
		const responsiveCtx = await browser.newContext({
			viewport: { width, height },
		});
		const responsivePage = await responsiveCtx.newPage();
		const responsiveErrors = [];
		responsivePage.on("pageerror", (e) => responsiveErrors.push(String(e)));
		responsivePage.on("console", (m) => {
			if (m.type() === "error") responsiveErrors.push(m.text());
		});
		await responsivePage.goto(URL, {
			waitUntil: "networkidle",
			timeout: 30000,
		});
		await sleep(900);
		const geometry = await responsivePage.evaluate(() => {
			const labTitle = [...document.querySelectorAll("h1")].find(
				(element) => element.textContent?.trim() === "Paper Shaders",
			);
			const labHeader = labTitle?.closest("header")?.getBoundingClientRect();
			const heroLink = [...document.querySelectorAll("a")].find(
				(element) => element.textContent?.trim() === "Features",
			);
			const heroHeader = heroLink?.closest("header")?.getBoundingClientRect();
			const heroContent = [...document.querySelectorAll("main")]
				.find((element) => element.classList.contains("absolute"))
				?.getBoundingClientRect();
			const paletteTitle = [...document.querySelectorAll("h3")].find(
				(element) => element.textContent?.trim() === "Palette",
			);
			const controls = paletteTitle
				?.closest("section")
				?.getBoundingClientRect();
			const overlapWidth =
				labHeader && heroHeader
					? Math.max(
							0,
							Math.min(labHeader.right, heroHeader.right) -
								Math.max(labHeader.left, heroHeader.left),
						)
					: 0;
			const overlapHeight =
				labHeader && heroHeader
					? Math.max(
							0,
							Math.min(labHeader.bottom, heroHeader.bottom) -
								Math.max(labHeader.top, heroHeader.top),
						)
					: 0;
			return {
				innerWidth,
				overlapArea: overlapWidth * overlapHeight,
				controlsAfterHero: Boolean(
					heroContent &&
						controls &&
						controls.top >= innerHeight &&
						heroContent.bottom <= innerHeight,
				),
				overflow: document.documentElement.scrollWidth - innerWidth,
			};
		});
		if (
			geometry.innerWidth === width &&
			geometry.overlapArea === 0 &&
			geometry.overflow <= 1 &&
			(width >= 1024 || geometry.controlsAfterHero)
		) {
			ok(`${width}px keeps lab and hero chrome separated`);
		} else {
			bad(`${width}px responsive geometry failed: ${JSON.stringify(geometry)}`);
		}
		const viewButtons = responsivePage.locator("button[aria-pressed]");
		await viewButtons.nth(0).click();
		await sleep(200);
		const showcasePressed = await viewButtons
			.nth(0)
			.getAttribute("aria-pressed");
		await viewButtons.nth(1).click();
		await sleep(200);
		const labPressed = await viewButtons.nth(1).getAttribute("aria-pressed");
		if (showcasePressed === "true" && labPressed === "true") {
			ok(`${width}px view controls remain interactive`);
		} else {
			bad(`${width}px view controls did not switch`);
		}
		if (responsiveErrors.length === 0) {
			ok(`${width}px has no page or console errors`);
		} else {
			bad(`${width}px errors: ${responsiveErrors.slice(0, 3).join(" | ")}`);
		}
		await responsiveCtx.close();
	}
} catch (e) {
	bad(`harness threw: ${e.message}`);
} finally {
	if (browser) await browser.close();
	dev.kill("SIGTERM");
}

console.log(`\n${oks.length} passed, ${fails.length} failed`);
process.exit(fails.length ? 1 : 0);
