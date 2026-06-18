/* Headless CLI verification for the Bloom (NestedSquares) studio.
 *
 * Boots `vite preview` (or reuses a running server) and drives a headless
 * Chromium through the studio, asserting: the canonical 25-ring bloom renders,
 * every ring carries the violet gradient border-image, the loop actually
 * animates (transform changes over a frame gap), the instrument dials retune
 * the live component (ring count changes), palettes swap the gradient, fonts
 * and the grain texture load, and nothing errors. CLI only — no GUI.
 *
 * Usage: node scripts/verify.mjs [baseURL]   (default http://localhost:4173)
 */
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
import { chromium } from "playwright";

const BASE_URL = process.argv[2] ?? "http://localhost:4173";

let failures = 0;
const check = (name, ok, detail = "") => {
	console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
	if (!ok) failures += 1;
};

let server = null;
async function ensureServer() {
	try {
		const res = await fetch(BASE_URL);
		if (res.ok) return;
	} catch {
		/* not up — start one */
	}
	server = spawn(
		"npm",
		["run", "preview", "--", "--port", "4173", "--strictPort"],
		{ stdio: "ignore", env: process.env },
	);
	for (let i = 0; i < 60; i++) {
		try {
			const res = await fetch(BASE_URL);
			if (res.ok) return;
		} catch {
			/* keep waiting */
		}
		await sleep(500);
	}
	throw new Error("preview server never came up");
}
function stopServer() {
	if (server) {
		server.kill("SIGTERM");
		server = null;
	}
}

try {
	await ensureServer();

	const browser = await chromium.launch();
	const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

	const consoleErrors = [];
	page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
	page.on("pageerror", (e) => consoleErrors.push(String(e)));
	const failedRequests = [];
	page.on("requestfailed", (r) =>
		failedRequests.push(`${r.url()} (${r.failure()?.errorText})`),
	);
	const notFound = [];
	page.on("response", (r) => {
		if (r.status() >= 400) notFound.push(`${r.url()} -> ${r.status()}`);
	});

	await page.goto(BASE_URL, { waitUntil: "networkidle" });
	await page.waitForTimeout(1000);

	// ── Page meta + layout shell ───────────────────────────────────────────
	check("page title", (await page.title()).startsWith("Bloom"), await page.title());
	check("studio root present", (await page.locator("main.studio-root").count()) === 1);
	check("masthead headline 'Bloom'", (await page.locator("h1").innerText()).trim() === "Bloom");

	// No horizontal scroll at desktop width.
	const scroll = await page.evaluate(() => ({
		sw: document.documentElement.scrollWidth,
		cw: document.documentElement.clientWidth,
	}));
	check("no horizontal scroll", scroll.sw <= scroll.cw + 1, `${scroll.sw} vs ${scroll.cw}`);

	// ── Canonical bloom: 25 rings by default ───────────────────────────────
	const ringSel = ".specimen-plate .border-transparent";
	const ringCount = await page.locator(ringSel).count();
	check("25 rings by default (prompt count)", ringCount === 25, `${ringCount}`);

	// Every ring carries a gradient border-image.
	const gradInfo = await page.evaluate((sel) => {
		const els = [...document.querySelectorAll(sel)];
		const withGrad = els.filter((el) =>
			(getComputedStyle(el).borderImageSource || "").includes("linear-gradient"),
		);
		const first = getComputedStyle(els[0]).borderImageSource;
		return { total: els.length, withGrad: withGrad.length, first };
	}, ringSel);
	check("all rings have gradient border-image", gradInfo.withGrad === gradInfo.total, `${gradInfo.withGrad}/${gradInfo.total}`);
	check("default culture is violet", /147,\s*51,\s*234/.test(gradInfo.first), gradInfo.first.slice(0, 60));

	// Padding follows (index+1)*10 — outer ring should be far larger than inner.
	const paddings = await page.evaluate((sel) => {
		const els = [...document.querySelectorAll(sel)];
		return [
			parseFloat(getComputedStyle(els[0]).padding),
			parseFloat(getComputedStyle(els[els.length - 1]).padding),
		];
	}, ringSel);
	check("padding steps 10px → 250px", Math.round(paddings[0]) === 10 && Math.round(paddings[1]) === 250, `${paddings[0]} / ${paddings[1]}`);

	// ── Motion: transform changes over a frame gap (looping) ───────────────
	const tAt = () =>
		page.evaluate((sel) => getComputedStyle(document.querySelector(sel)).transform, ringSel);
	const t1 = await tAt();
	await page.waitForTimeout(450);
	const t2 = await tAt();
	check("bloom animates (transform changes)", t1 !== t2, `${t1.slice(0, 28)} -> ${t2.slice(0, 28)}`);

	// ── Dials retune the live component (ring count) ───────────────────────
	await page.evaluate(() => {
		const dial = [...document.querySelectorAll("input.dial")][0]; // Rings
		const setter = Object.getOwnPropertyDescriptor(
			window.HTMLInputElement.prototype,
			"value",
		).set;
		setter.call(dial, "12");
		dial.dispatchEvent(new Event("input", { bubbles: true }));
		dial.dispatchEvent(new Event("change", { bubbles: true }));
	});
	await page.waitForTimeout(250);
	const afterCount = await page.locator(ringSel).count();
	check("ring dial retunes count (25 → 12)", afterCount === 12, `${afterCount}`);

	// ── Palette swatch swaps the gradient culture ──────────────────────────
	await page.locator(".swatch").nth(1).click(); // Ember Culture
	await page.waitForTimeout(250);
	const emberGrad = await page.evaluate(
		(sel) => getComputedStyle(document.querySelector(sel)).borderImageSource,
		ringSel,
	);
	check("palette swatch swaps culture (ember red)", /244,\s*63,\s*94/.test(emberGrad), emberGrad.slice(0, 60));

	// ── Reset restores the canonical specimen ──────────────────────────────
	await page.getByRole("button", { name: "Reset" }).click();
	await page.waitForTimeout(250);
	const resetCount = await page.locator(ringSel).count();
	const resetGrad = await page.evaluate(
		(sel) => getComputedStyle(document.querySelector(sel)).borderImageSource,
		ringSel,
	);
	check("reset restores 25 rings + violet", resetCount === 25 && /147,\s*51,\s*234/.test(resetGrad), `${resetCount} rings`);

	// ── Fonts + grain texture loaded (vendored, no remote) ─────────────────
	const fontsOk = await page.evaluate(async () => {
		await document.fonts.ready;
		return document.fonts.check("16px 'Fraunces'") && document.fonts.check("16px 'JetBrains Mono'");
	});
	check("vendored fonts loaded (Fraunces + JetBrains Mono)", fontsOk);

	// ── Errors / missing assets ────────────────────────────────────────────
	check("no failed requests", failedRequests.length === 0, failedRequests.join(" | ").slice(0, 200));
	check("no 4xx/5xx responses", notFound.length === 0, notFound.join(" | ").slice(0, 200));
	check("no console/page errors", consoleErrors.length === 0, consoleErrors.join(" | ").slice(0, 200));

	await browser.close();
	console.log(failures === 0 ? "\nALL CHECKS PASSED" : `\n${failures} CHECK(S) FAILED`);
} finally {
	stopServer();
}

process.exit(failures === 0 ? 0 : 1);
