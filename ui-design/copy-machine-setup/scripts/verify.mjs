#!/usr/bin/env node
/**
 * Headless verification for the copy-machine-setup scaffold.
 *
 * Boots the Vite dev server, loads the page in Chromium, and asserts:
 *   - no page/runtime console errors and no failed asset requests (fonts, css, js)
 *   - the spec-pinned App.tsx mounts its empty <main> (the project is a scaffold
 *     awaiting the first component, exactly as the prompt requires)
 *   - the setup-status overlay renders its required confirmation content
 *     ("PROJECT SETUP COMPLETE", the file tree, the verbatim App.tsx code)
 *   - vendored fonts actually load (document.fonts)
 *
 * Run:  node scripts/verify.mjs            (auto-starts `npm run dev`)
 *       node scripts/verify.mjs <url>      (verify an already-running server)
 *
 * Uses the recorder's Playwright install so no extra deps are needed here.
 */
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(__dirname, "..");
const recorderDir = path.resolve(projectDir, "../../scripts/record-demos");
const require = createRequire(path.join(recorderDir, "package.json"));
const { chromium } = require("playwright");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const PORT = 5219;

let pass = 0;
let fail = 0;
function check(label, ok, detail = "") {
	const mark = ok ? "PASS" : "FAIL";
	console.log(`  [${mark}] ${label}${detail ? "  — " + detail : ""}`);
	ok ? pass++ : fail++;
}

async function waitForServer(url, tries = 80) {
	for (let i = 0; i < tries; i++) {
		try {
			const res = await fetch(url);
			if (res.ok) return true;
		} catch {}
		await sleep(500);
	}
	return false;
}

async function main() {
	const externalUrl = process.argv[2];
	const url = externalUrl || `http://localhost:${PORT}/`;
	let dev = null;

	if (!externalUrl) {
		console.log("→ starting vite dev server...");
		dev = spawn(
			"npm",
			["run", "dev", "--", "--port", String(PORT), "--strictPort"],
			{ cwd: projectDir, stdio: "ignore" },
		);
		const up = await waitForServer(url);
		if (!up) {
			console.error("dev server never came up");
			dev.kill("SIGKILL");
			process.exit(1);
		}
	}

	const consoleErrors = [];
	const failedRequests = [];

	const browser = await chromium.launch({ headless: true });
	const ctx = await browser.newContext({
		viewport: { width: 1280, height: 800 },
	});
	const page = await ctx.newPage();

	page.on("console", (m) => {
		if (m.type() === "error") consoleErrors.push(m.text());
	});
	page.on("pageerror", (e) => consoleErrors.push("pageerror: " + e.message));
	page.on("requestfailed", (r) =>
		failedRequests.push(`${r.url()} (${r.failure()?.errorText || "failed"})`),
	);
	page.on("response", (r) => {
		if (r.status() >= 400)
			failedRequests.push(`${r.url()} -> HTTP ${r.status()}`);
	});

	console.log(`→ loading ${url}`);
	await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
	try {
		await page.evaluate(() => document.fonts && document.fonts.ready);
	} catch {}
	await sleep(1500); // let count-ups / reveal cascade run

	console.log("\nAssertions:");

	// 1. App.tsx mounted its empty <main> with the exact spec'd classNames.
	const mainInfo = await page.evaluate(() => {
		const m = document.querySelector("#root main");
		if (!m) return null;
		return {
			cls: m.className,
			childCount: m.children.length,
			html: m.innerHTML.trim(),
		};
	});
	check("App.tsx <main> mounted inside #root", !!mainInfo);
	if (mainInfo) {
		check(
			"<main> has exact spec className",
			mainInfo.cls === "relative min-h-screen flex flex-col",
			`got "${mainInfo.cls}"`,
		);
		check(
			"<main> is empty (scaffold awaiting first component)",
			mainInfo.childCount === 0 && mainInfo.html === "",
			`children=${mainInfo.childCount}`,
		);
	}

	// 2. Setup overlay renders required confirmation content.
	const overlay = await page.evaluate(() => {
		const el = document.getElementById("setup-screen");
		if (!el) return null;
		const txt = el.innerText;
		return {
			present: true,
			hasComplete: /PROJECT SETUP COMPLETE/.test(txt),
			hasUtils: /utils\.ts/.test(txt),
			hasApp: /App\.tsx/.test(txt),
			hasMain: /main\.tsx/.test(txt),
			hasIndexCss: /index\.css/.test(txt),
			hasViteCfg: /vite\.config\.ts/.test(txt),
			hasTsCfg: /tsconfig\.json/.test(txt),
			hasCopyMachine: /copy machine/i.test(txt),
			hasExactCode: /className="relative min-h-screen flex flex-col"/.test(txt),
			hasComment: /Components will be stacked here/.test(txt),
			chips: Array.from(el.querySelectorAll(".chip")).map((c) => c.textContent),
		};
	});
	check("setup overlay present", !!overlay?.present);
	if (overlay) {
		check('shows "PROJECT SETUP COMPLETE"', overlay.hasComplete);
		check(
			"lists all 6 created files",
			overlay.hasUtils &&
				overlay.hasApp &&
				overlay.hasMain &&
				overlay.hasIndexCss &&
				overlay.hasViteCfg &&
				overlay.hasTsCfg,
		);
		check(
			"renders verbatim App.tsx code",
			overlay.hasExactCode && overlay.hasComment,
		);
		check('expresses the "copy machine" identity', overlay.hasCopyMachine);
		const stack = [
			"Vite + React",
			"TypeScript",
			"Tailwind CSS",
			"tailwind-merge",
			"clsx",
			"Framer Motion",
			"Lucide React",
		];
		const allChips = stack.every((s) => overlay.chips.includes(s));
		check("shows full mandated tech stack", allChips, overlay.chips.join(", "));
	}

	// 3. Vendored fonts loaded.
	const fonts = await page.evaluate(() => {
		const loaded = new Set();
		document.fonts.forEach((f) => {
			if (f.status === "loaded") loaded.add(f.family);
		});
		return Array.from(loaded);
	});
	check(
		"vendored fonts loaded",
		fonts.includes("Inter") && fonts.includes("JetBrains Mono"),
		fonts.join(", "),
	);

	// 4. No errors / no failed requests.
	check(
		"no console errors",
		consoleErrors.length === 0,
		consoleErrors.slice(0, 3).join(" | "),
	);
	check(
		"no failed/4xx requests",
		failedRequests.length === 0,
		failedRequests.slice(0, 3).join(" | "),
	);

	// Screenshot for the record.
	const shot = path.join(projectDir, "scripts", "verify-screenshot.png");
	await page.screenshot({ path: shot });
	console.log(`\n→ screenshot: ${shot}`);

	await ctx.close();
	await browser.close();
	if (dev) {
		dev.kill("SIGKILL");
	}

	console.log(`\nResult: ${pass} passed, ${fail} failed`);
	process.exit(fail === 0 ? 0 : 1);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
