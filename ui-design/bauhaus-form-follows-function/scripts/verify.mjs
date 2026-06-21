#!/usr/bin/env node
/**
 * Headless verification for the WERKBUND Bauhaus landing page.
 *
 * Boots `vite preview` against the production build on a strict port, drives a
 * headless Chromium through the page, and asserts:
 *   - the page loads with no console errors / page errors
 *   - the brand + every major section is present
 *   - the Outfit webfont actually resolved (not a fallback)
 *   - the FAQ accordion toggles open/closed
 *   - the mobile nav opens at a narrow viewport
 *   - all vendored images load (naturalWidth > 0)
 *
 * Exits non-zero on the first failed assertion. CLI-only; no GUI.
 */
import { spawn, spawnSync } from "node:child_process";
import { chromium } from "playwright";
import { setTimeout as sleep } from "node:timers/promises";

const PORT = Number(process.env.VERIFY_PORT || 5311);
const URL = `http://localhost:${PORT}/`;

const checks = [];
function check(name, ok, detail = "") {
	checks.push({ name, ok: !!ok, detail });
	console.log(
		`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`,
	);
}

// Build first so preview serves real output.
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
	// Wait for the server to answer.
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
	const page = await browser.newPage({
		viewport: { width: 1280, height: 800 },
	});

	const consoleErrors = [];
	page.on("console", (m) => {
		if (m.type() === "error") consoleErrors.push(m.text());
	});
	const pageErrors = [];
	page.on("pageerror", (e) => pageErrors.push(String(e)));

	await page.goto(URL, { waitUntil: "networkidle" });
	await page.waitForSelector('[data-ready="true"]', { timeout: 5000 });

	check("no page errors", pageErrors.length === 0, pageErrors.join(" | "));
	check(
		"no console errors",
		consoleErrors.length === 0,
		consoleErrors.join(" | "),
	);

	// Brand present (twice: nav + footer).
	const brandCount = await page.locator("text=Werkbund").count();
	check("brand 'Werkbund' present", brandCount >= 2, `count=${brandCount}`);

	// Hero headline.
	check(
		"hero headline 'Function'",
		(await page.locator("h1", { hasText: "Function" }).count()) > 0,
	);

	// Each major section id renders.
	for (const id of ["top", "features", "process", "pricing", "journal"]) {
		check(`section #${id}`, (await page.locator(`#${id}`).count()) > 0);
	}

	// Section headings (sanity that organisms mounted).
	for (const heading of [
		"Built from",
		"Four moves to a poster",
		"Pick a workbench",
		"Builders on the grid",
		"Notes from the press",
		"Stop decorating.",
	]) {
		check(
			`heading: ${heading}`,
			(await page.getByText(heading, { exact: false }).count()) > 0,
		);
	}

	// Webfont actually loaded (Outfit), not a system fallback.
	const fontOk = await page.evaluate(() =>
		document.fonts.check('700 16px "Outfit"'),
	);
	check("Outfit webfont resolved", fontOk);

	// All vendored images decoded.
	const imgStats = await page.evaluate(() => {
		const imgs = Array.from(document.images);
		return {
			total: imgs.length,
			broken: imgs.filter((i) => i.complete && i.naturalWidth === 0).length,
			localOnly: imgs.every((i) => new URL(i.src).host === location.host),
		};
	});
	check("images present", imgStats.total >= 7, `total=${imgStats.total}`);
	check("no broken images", imgStats.broken === 0, `broken=${imgStats.broken}`);
	check("images served locally", imgStats.localOnly);

	// FAQ accordion interaction: first item starts open; clicking item 2 opens it.
	const faqBtns = page.locator("button[aria-expanded]");
	const secondFaq = faqBtns.filter({ hasText: "Why only three colours?" });
	const beforeText = await secondFaq.getAttribute("aria-expanded");
	await secondFaq.click();
	await sleep(350);
	const afterText = await secondFaq.getAttribute("aria-expanded");
	check(
		"FAQ accordion toggles",
		beforeText === "false" && afterText === "true",
		`${beforeText} -> ${afterText}`,
	);

	// Mobile nav: at narrow width the hamburger reveals nav links.
	await page.setViewportSize({ width: 390, height: 844 });
	const hamburger = page.getByRole("button", { name: /open menu/i });
	check("mobile hamburger present", (await hamburger.count()) > 0);
	await hamburger.first().click();
	await sleep(250);
	const mobileLink = page
		.locator("nav a", { hasText: "Process" })
		.filter({ has: page.locator("svg") });
	check("mobile menu reveals links", (await mobileLink.count()) > 0);

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
