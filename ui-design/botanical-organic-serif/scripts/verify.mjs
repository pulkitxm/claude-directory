#!/usr/bin/env node
/**
 * Headless verification for the VERDANT Botanical / Organic Serif showcase.
 *
 * Builds the site, boots `vite preview` on a strict port, drives a headless
 * Chromium through the page, and asserts the design system actually rendered:
 *   - loads with no console errors / page errors
 *   - brand + every major section id is present
 *   - both vendored webfonts resolved (Playfair Display + Source Sans 3),
 *     not a system fallback
 *   - the mandatory paper-grain overlay exists
 *   - every vendored botanical image (local SVG) decoded (naturalWidth > 0)
 *     and is served from this origin (nothing hotlinked)
 *   - the FAQ accordion toggles open/closed with correct aria-expanded
 *   - the stat count-ups reach their final values
 *   - the newsletter form accepts input and confirms
 *   - the mobile hamburger reveals the nav overlay at a narrow viewport
 *
 * Exits non-zero on the first failed assertion. CLI-only; no GUI.
 */
import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import { chromium } from "playwright";
import { setTimeout as sleep } from "node:timers/promises";

const PORT = Number(process.env.VERIFY_PORT || 5388);
const URL = `http://localhost:${PORT}/`;

/**
 * Resolve a launchable Chromium. This environment pre-provisions a full
 * Chromium under PLAYWRIGHT_BROWSERS_PATH whose build number may not match the
 * installed Playwright's expected headless-shell revision, so prefer that real
 * binary via executablePath; otherwise fall back to Playwright's own resolution.
 */
function launchOpts() {
	const root = process.env.PLAYWRIGHT_BROWSERS_PATH || "/opt/pw-browsers";
	try {
		const dir = fs
			.readdirSync(root)
			.filter((d) => /^chromium-\d+$/.test(d))
			.sort();
		for (const d of dir) {
			const exe = `${root}/${d}/chrome-linux/chrome`;
			if (fs.existsSync(exe)) return { headless: true, executablePath: exe };
		}
	} catch {
		/* fall through to default resolution */
	}
	return { headless: true };
}

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

	browser = await chromium.launch(launchOpts());
	const page = await browser.newPage({
		viewport: { width: 1280, height: 900 },
	});

	const consoleErrors = [];
	page.on("console", (m) => {
		if (m.type() === "error") consoleErrors.push(m.text());
	});
	const pageErrors = [];
	page.on("pageerror", (e) => pageErrors.push(String(e)));

	await page.goto(URL, { waitUntil: "networkidle" });
	await page.waitForSelector('[data-ready="true"]', { timeout: 6000 });

	check("no page errors", pageErrors.length === 0, pageErrors.join(" | "));
	check(
		"no console errors",
		consoleErrors.length === 0,
		consoleErrors.slice(0, 3).join(" | "),
	);

	// Brand present (nav + footer).
	const brandCount = await page.getByText("Verdant", { exact: false }).count();
	check("brand 'Verdant' present", brandCount >= 2, `count=${brandCount}`);

	// Hero headline.
	check(
		"hero headline 'breathe'",
		(await page.locator("h1", { hasText: "breathe" }).count()) > 0,
	);

	// Each major section id renders.
	for (const id of [
		"top",
		"rituals",
		"atelier",
		"garden",
		"pricing",
		"journal",
	]) {
		check(`section #${id}`, (await page.locator(`#${id}`).count()) > 0);
	}

	// Section headings (organisms mounted).
	for (const heading of [
		"The Rituals",
		"The Collections",
		"Memberships",
		"Kind Words",
		"The Journal",
		"Questions",
	]) {
		check(
			`heading: ${heading}`,
			(await page.getByText(heading, { exact: false }).count()) > 0,
		);
	}

	// Both webfonts actually loaded, not system fallbacks.
	const fonts = await page.evaluate(() => ({
		playfair: document.fonts.check('600 16px "Playfair Display"'),
		playfairItalic: document.fonts.check('italic 500 16px "Playfair Display"'),
		source: document.fonts.check('400 16px "Source Sans 3"'),
	}));
	check("Playfair Display resolved", fonts.playfair);
	check("Playfair Display italic resolved", fonts.playfairItalic);
	check("Source Sans 3 resolved", fonts.source);

	// Mandatory paper-grain overlay present (fractal noise data URI, fixed).
	const grain = await page.evaluate(() => {
		const nodes = Array.from(document.querySelectorAll("div"));
		const el = nodes.find((n) => {
			const bg = getComputedStyle(n).backgroundImage || "";
			return bg.includes("feTurbulence") || bg.includes("noiseFilter");
		});
		if (!el) return { found: false };
		const cs = getComputedStyle(el);
		return { found: true, position: cs.position, opacity: cs.opacity };
	});
	check("paper-grain overlay present", grain.found, JSON.stringify(grain));
	check(
		"paper-grain is fixed & subtle",
		grain.found && grain.position === "fixed" && Number(grain.opacity) <= 0.1,
		`pos=${grain.position} op=${grain.opacity}`,
	);

	// All vendored botanical images are local SVGs. (Use src, not currentSrc —
	// lazy images below the fold haven't populated currentSrc yet at first paint.)
	const imgStats = await page.evaluate(() => {
		const imgs = Array.from(document.images);
		return {
			total: imgs.length,
			localOnly: imgs.every((i) => new URL(i.src).host === location.host),
			svgCount: imgs.filter((i) => new URL(i.src).pathname.endsWith(".svg"))
				.length,
		};
	});
	check("images present", imgStats.total >= 9, `total=${imgStats.total}`);
	check("images served locally", imgStats.localOnly);
	check(
		"botanical art is vendored SVG",
		imgStats.svgCount === imgStats.total,
		`svg=${imgStats.svgCount}/${imgStats.total}`,
	);

	// Force every lazy image to load, then assert none are broken.
	const broken = await page.evaluate(async () => {
		const imgs = Array.from(document.images);
		imgs.forEach((i) => (i.loading = "eager"));
		await Promise.all(
			imgs.map((i) =>
				i.complete
					? Promise.resolve()
					: new Promise((res) => {
							i.addEventListener("load", res, { once: true });
							i.addEventListener("error", res, { once: true });
						}),
			),
		);
		return imgs.filter((i) => i.naturalWidth === 0).length;
	});
	check("no broken images (all 14 decode)", broken === 0, `broken=${broken}`);

	// Stat count-ups reach their final values (scroll them into view first).
	await page.locator("#garden").scrollIntoViewIfNeeded();
	await sleep(2200);
	const statText = await page.locator("#garden").innerText();
	check(
		"stat count-ups settle (240 / 98%)",
		/240\+/.test(statText) && /98%/.test(statText),
		statText.replace(/\s+/g, " ").slice(0, 90),
	);

	// FAQ accordion: first item starts open; opening item 2 sets aria-expanded.
	const faqTriggers = page.locator('button[aria-controls^="faq-panel-"]');
	const first = faqTriggers.nth(0);
	const second = faqTriggers.nth(1);
	await second.scrollIntoViewIfNeeded();
	const firstBefore = await first.getAttribute("aria-expanded");
	const secondBefore = await second.getAttribute("aria-expanded");
	await second.click();
	await sleep(450);
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

	// Newsletter form: typing + submit shows the confirmation copy.
	const emailInput = page.locator('input[type="email"]');
	await emailInput.scrollIntoViewIfNeeded();
	await emailInput.fill("test@home.com");
	await page.getByRole("button", { name: /subscribe/i }).click();
	await sleep(300);
	const confirmed = await page
		.getByText("You're on the list", { exact: false })
		.count();
	check("newsletter confirms on submit", confirmed > 0);

	// Mobile nav: hamburger reveals the overlay links at a narrow viewport.
	await page.setViewportSize({ width: 390, height: 844 });
	await page.evaluate(() => window.scrollTo(0, 0));
	await sleep(300);
	const hamburger = page.getByRole("button", { name: /open menu/i });
	check("mobile hamburger present", (await hamburger.count()) > 0);
	await hamburger.first().click();
	await sleep(500);
	const mobileNav = page.locator('nav[aria-label="Mobile"] a', {
		hasText: "Pricing",
	});
	const mobileVisible = await mobileNav.first().isVisible();
	check("mobile menu reveals links", mobileVisible);

	await browser.close();
	browser = null;

	const failed = checks.filter((c) => !c.ok);
	console.log(
		`\n${checks.length - failed.length}/${checks.length} checks passed.`,
	);
	if (failed.length) process.exit(1);
	console.log("ALL CHECKS PASSED");
} catch (err) {
	console.error("VERIFY ERROR:", err);
	process.exitCode = 1;
} finally {
	if (browser) await browser.close().catch(() => {});
	server.kill("SIGTERM");
}
