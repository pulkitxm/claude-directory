#!/usr/bin/env node
/**
 * Headless verification for the SickUI waitlist page.
 *
 * Boots the Vite dev server, drives a headless Chromium (WebGL forced on via
 * SwiftShader so the shader compiles in CI), and asserts:
 *   - the root mounts and the nav wordmark renders
 *   - the verbatim component's MeshGradient mounts a non-empty <canvas> with a
 *     live WebGL context (the @paper-design/shaders-react backdrop)
 *   - the launch headline ("We are launching SickUI soon!") renders in the
 *     vendored Onest font
 *   - the five vendored social-proof avatars load (naturalWidth > 0)
 *   - the waitlist form rejects an invalid email (inline error appears)
 *   - the waitlist form accepts a valid email and swaps to the success state
 *   - the capability strip renders its three items
 *   - the page is a single viewport (the demo recorder holds on it live)
 *   - no uncaught page errors or console errors fire along the way
 *
 * Exits non-zero on any failure so it can gate CI / pre-commit.
 */
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const PORT = process.env.PORT || 5331;
const URL = `http://localhost:${PORT}/`;

function startDev() {
	const dev = spawn("npm", ["run", "dev", "--", "--port", String(PORT), "--strictPort"], {
		stdio: ["ignore", "pipe", "pipe"],
		env: { ...process.env },
	});
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
		args: [
			"--use-gl=angle",
			"--use-angle=swiftshader",
			"--enable-unsafe-swiftshader",
			"--ignore-gpu-blocklist",
		],
	});
	const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
	const page = await ctx.newPage();

	const pageErrors = [];
	const consoleErrors = [];
	page.on("pageerror", (e) => pageErrors.push(String(e)));
	page.on("console", (m) => {
		if (m.type() === "error") consoleErrors.push(m.text());
	});

	await page.goto(URL, { waitUntil: "networkidle", timeout: 30000 });
	await sleep(1400);

	// Nav wordmark renders
	const brand = (await page.locator("header a").first().textContent())?.trim() ?? "";
	if (/SickUI/i.test(brand)) ok(`nav wordmark renders ("${brand}")`);
	else bad(`nav wordmark missing (got "${brand}")`);

	// Hero headline renders with the vendored font
	const h1 = (await page.locator("main h1").first().textContent())?.replace(/\s+/g, " ").trim() ?? "";
	if (/We are launching SickUI soon!/i.test(h1)) ok(`launch headline renders ("${h1}")`);
	else bad(`launch headline missing (got "${h1}")`);

	const heroFont = await page.evaluate(() => {
		const h = document.querySelector("main h1");
		return h ? getComputedStyle(h).fontFamily : "";
	});
	if (/onest/i.test(heroFont)) ok(`headline uses vendored Onest font ("${heroFont}")`);
	else bad(`headline font unexpected ("${heroFont}")`);

	// MeshGradient canvas present + non-empty
	const box = await page.evaluate(() => {
		const c = document.querySelector("canvas");
		if (!c) return null;
		const r = c.getBoundingClientRect();
		return { w: Math.round(r.width), h: Math.round(r.height) };
	});
	if (box && box.w > 600 && box.h > 400) ok(`MeshGradient canvas mounts ${box.w}x${box.h}`);
	else bad(`no live canvas (${JSON.stringify(box)})`);

	// Real WebGL context
	const hasGL = await page.evaluate(() => {
		const c = document.querySelector("canvas");
		if (!c) return false;
		const gl = c.getContext("webgl2") || c.getContext("webgl") || c.getContext("experimental-webgl");
		return !!gl;
	});
	if (hasGL) ok("WebGL context is live");
	else bad("no WebGL context on canvas");

	// Vendored avatars loaded
	const avatarInfo = await page.evaluate(() => {
		const imgs = Array.from(document.querySelectorAll("main img"));
		return { count: imgs.length, loaded: imgs.filter((i) => i.naturalWidth > 0).length };
	});
	if (avatarInfo.count >= 5 && avatarInfo.loaded === avatarInfo.count)
		ok(`all ${avatarInfo.count} vendored avatars loaded`);
	else bad(`avatars not all loaded (${avatarInfo.loaded}/${avatarInfo.count})`);

	// Invalid email -> inline error
	await page.fill("#waitlist-email", "not-an-email");
	await page.getByRole("button", { name: /Join waitlist/i }).click();
	await sleep(300);
	const errText = (await page.locator("#waitlist-error").textContent())?.trim() ?? "";
	if (/valid email/i.test(errText)) ok(`invalid email rejected ("${errText}")`);
	else bad(`invalid email not rejected (got "${errText}")`);

	// Valid email -> success state
	await page.fill("#waitlist-email", "builder@sickui.dev");
	await page.getByRole("button", { name: /Join waitlist/i }).click();
	await page.getByText(/You're on the list/i).waitFor({ timeout: 4000 });
	const success = await page.getByText(/You're on the list/i).isVisible();
	if (success) ok("valid email reaches the success state");
	else bad("success state never appeared");

	// Capability strip renders its items
	const caps = await page.locator("main ul li").count();
	if (caps >= 3) ok(`capability strip renders ${caps} items`);
	else bad(`capability strip sparse (${caps} items)`);

	// Page is a single viewport (so the recorder takes the live static path)
	const layout = await page.evaluate(() => ({
		sh: document.body.scrollHeight,
		ih: window.innerHeight,
	}));
	if (layout.sh <= layout.ih * 1.15)
		ok(`page fits one viewport (${layout.sh}px ≤ ${layout.ih}px)`);
	else bad(`page overflows the viewport (${layout.sh}px vs ${layout.ih}px)`);

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
