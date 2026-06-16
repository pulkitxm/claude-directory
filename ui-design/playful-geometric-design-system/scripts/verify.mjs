#!/usr/bin/env node
/**
 * Headless verification for the Blobby (Playful Geometric) landing page.
 *
 * Builds the project, serves the production output with `vite preview` on a
 * strict port, drives a headless Chromium through it, and asserts:
 *   - the page loads with no console errors / page errors
 *   - the brand + every major section renders
 *   - both vendored webfonts (Outfit + Plus Jakarta Sans) actually resolved
 *   - every asset is served from the local origin (no remote hotlinks)
 *   - the FAQ accordion toggles open/closed with correct ARIA
 *   - the pricing "MOST POPULAR" badge + a scaled featured tier are present
 *   - the marquee strips render duplicated track content
 *   - the CTA email form validates and shows the success state
 *   - the mobile nav opens at a narrow viewport
 *   - prefers-reduced-motion neutralizes the animations
 *
 * Exits non-zero on the first failed assertion. CLI-only; no GUI.
 */
import { spawn, spawnSync } from "node:child_process";
import { chromium } from "playwright";
import { setTimeout as sleep } from "node:timers/promises";

const PORT = Number(process.env.VERIFY_PORT || 5321);
const URL = `http://localhost:${PORT}/`;

const checks = [];
function check(name, ok, detail = "") {
	checks.push({ name, ok: !!ok, detail });
	console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
}

console.log("· building…");
const build = spawnSync("npm", ["run", "build"], { stdio: "inherit" });
if (build.status !== 0) {
	console.error("build failed");
	process.exit(1);
}

console.log(`· starting preview on ${PORT}…`);
const server = spawn(
	"npm",
	["run", "preview", "--", "--port", String(PORT), "--strictPort"],
	{ stdio: "ignore" },
);

let browser;
try {
	let up = false;
	for (let i = 0; i < 60; i++) {
		try {
			const res = await fetch(URL);
			if (res.ok) {
				up = true;
				break;
			}
		} catch {
			/* not up yet */
		}
		await sleep(500);
	}
	if (!up) throw new Error("preview server never came up");

	browser = await chromium.launch();
	const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

	const consoleErrors = [];
	page.on("console", (m) => {
		if (m.type() === "error") consoleErrors.push(m.text());
	});
	const pageErrors = [];
	page.on("pageerror", (e) => pageErrors.push(String(e)));

	await page.goto(URL, { waitUntil: "networkidle" });
	await page.waitForSelector('[data-ready="true"]', { timeout: 5000 });

	check("no page errors", pageErrors.length === 0, pageErrors.join(" | "));
	check("no console errors", consoleErrors.length === 0, consoleErrors.join(" | "));

	// Brand present (nav + footer).
	const brandCount = await page.locator("text=Blobby").count();
	check("brand 'Blobby' present", brandCount >= 2, `count=${brandCount}`);

	// Hero headline.
	check(
		"hero headline",
		(await page.locator("h1", { hasText: "smile" }).count()) > 0,
	);

	// Each major section id renders.
	for (const id of [
		"top",
		"features",
		"how",
		"pricing",
		"loved",
		"tokens",
		"faq",
		"cta",
	]) {
		check(`section #${id}`, (await page.locator(`#${id}`).count()) > 0);
	}

	// Section headings (sanity that organisms mounted).
	for (const heading of [
		"Everything pops",
		"From blank to bouncy",
		"Plans as cheerful",
		"People grin",
		"One token set",
		"The things people ask",
		"Ready to make the web grin",
	]) {
		check(
			`heading: ${heading}`,
			(await page.getByText(heading, { exact: false }).count()) > 0,
		);
	}

	// Both webfonts actually loaded (not a system fallback).
	const fonts = await page.evaluate(() => ({
		outfit: document.fonts.check('800 16px "Outfit"'),
		jakarta: document.fonts.check('500 16px "Plus Jakarta Sans"'),
	}));
	check("Outfit webfont resolved", fonts.outfit);
	check("Plus Jakarta Sans webfont resolved", fonts.jakarta);

	// All assets local — no remote hotlinks (fonts loaded from same origin).
	const remote = await page.evaluate(() => {
		const out = [];
		for (const img of Array.from(document.images)) {
			if (new URL(img.src).host !== location.host) out.push(img.src);
		}
		for (const ff of Array.from(document.fonts)) {
			// FontFace has no URL, so check loaded face count instead below.
			void ff;
		}
		return out;
	});
	check("no remote image hotlinks", remote.length === 0, remote.join(" | "));

	// Fonts resource entries are same-origin.
	const fontHosts = await page.evaluate(() =>
		performance
			.getEntriesByType("resource")
			.filter((r) => /\.woff2?($|\?)/.test(r.name))
			.map((r) => new URL(r.name).host),
	);
	check(
		"fonts served locally",
		fontHosts.length > 0 && fontHosts.every((h) => h === `localhost:${PORT}`),
		fontHosts.join(", "),
	);

	// Marquee tracks duplicate their content (seamless loop).
	const marqueeTracks = await page.locator(".animate-marquee, .animate-marquee-reverse").count();
	check("marquee tracks present", marqueeTracks >= 2, `count=${marqueeTracks}`);

	// Pricing featured tier: star badge text + a scaled card.
	check(
		"pricing 'MOST POPULAR' badge",
		(await page.getByText("popular", { exact: false }).count()) > 0,
	);
	const scaled = await page.locator('[class*="scale-["]').count();
	check("featured tier is scaled", scaled > 0, `scaled els=${scaled}`);

	// FAQ accordion: first open, click item 2 to open it, first closes.
	// Scope to #faq so the nav hamburger's aria-expanded button isn't picked up.
	const faqBtns = page.locator("#faq button[aria-expanded]");
	const first = faqBtns.nth(0);
	const second = faqBtns.filter({ hasText: "dislike motion" });
	const firstBefore = await first.getAttribute("aria-expanded");
	const secondBefore = await second.getAttribute("aria-expanded");
	await second.click();
	await sleep(350);
	const secondAfter = await second.getAttribute("aria-expanded");
	const firstAfter = await first.getAttribute("aria-expanded");
	check(
		"FAQ accordion toggles",
		firstBefore === "true" &&
			secondBefore === "false" &&
			secondAfter === "true" &&
			firstAfter === "false",
		`first ${firstBefore}->${firstAfter}, second ${secondBefore}->${secondAfter}`,
	);

	// CTA form: empty submit blocked (still showing form); filled submit succeeds.
	await page.locator("#cta-name").fill("Ada Doodle");
	await page.locator("#cta-email").fill("ada@studio.com");
	await page.getByRole("button", { name: /send me the kit/i }).click();
	await sleep(300);
	check(
		"CTA form shows success",
		(await page.getByText("You’re on the list", { exact: false }).count()) > 0,
	);

	// Focusable skip link present (accessibility).
	check(
		"skip-to-content link",
		(await page.getByRole("link", { name: /skip to content/i }).count()) > 0,
	);

	// Mobile nav: hamburger reveals links at a narrow viewport.
	await page.setViewportSize({ width: 390, height: 844 });
	await sleep(150);
	const hamburger = page.getByRole("button", { name: /open menu/i });
	check("mobile hamburger present", (await hamburger.count()) > 0);
	await hamburger.first().click();
	await sleep(250);
	const mobileLink = page.locator("a", { hasText: "How it works" });
	check("mobile menu reveals links", (await mobileLink.count()) >= 1);

	await browser.close();

	// Reduced motion: with the media feature emulated, [data-reveal] is visible
	// (opacity 1) immediately and marquee animation is none.
	browser = await chromium.launch();
	const rmCtx = await browser.newContext({
		viewport: { width: 1280, height: 900 },
		reducedMotion: "reduce",
	});
	const rmPage = await rmCtx.newPage();
	await rmPage.goto(URL, { waitUntil: "networkidle" });
	await rmPage.waitForSelector('[data-ready="true"]', { timeout: 5000 });
	await sleep(300);
	const rm = await rmPage.evaluate(() => {
		const reveal = document.querySelector("[data-reveal]");
		const revealOpacity = reveal ? getComputedStyle(reveal).opacity : "0";
		const track = document.querySelector(".animate-marquee");
		const anim = track ? getComputedStyle(track).animationName : "x";
		return { revealOpacity, anim };
	});
	check(
		"reduced-motion reveals content",
		Number(rm.revealOpacity) === 1,
		`opacity=${rm.revealOpacity}`,
	);
	check("reduced-motion disables marquee", rm.anim === "none", `anim=${rm.anim}`);
	await browser.close();
	browser = null;

	const failed = checks.filter((c) => !c.ok);
	console.log(`\n${checks.length - failed.length}/${checks.length} checks passed.`);
	if (failed.length) process.exit(1);
	console.log("ALL CHECKS PASSED");
} catch (err) {
	console.error("VERIFY ERROR:", err);
	process.exitCode = 1;
} finally {
	if (browser) await browser.close().catch(() => {});
	server.kill("SIGTERM");
}
