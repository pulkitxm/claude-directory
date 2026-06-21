// ─────────────────────────────────────────────────────────────────────────────
// Headless verification for the Bold Typography landing page.
//
// Boots the production build (dist/) on a static server, drives a headless
// Chromium through it, and asserts the design system is actually expressed:
// tokens applied, all sections present, fonts loaded, the inverted Final CTA
// flips its ground, the FAQ accordion toggles, no console errors, and no
// horizontal overflow at mobile + desktop widths.
//
// Run:  npm run build && node scripts/verify.mjs
// Playwright is borrowed from scripts/record-demos/node_modules.
// ─────────────────────────────────────────────────────────────────────────────
import { createServer } from "http";
import { readFile, stat } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");

// Borrow Playwright from the repo's recorder install. The project may live in a
// git worktree, so probe a few candidate locations for record-demos/node_modules.
const require = createRequire(import.meta.url);
const candidates = [
	path.resolve(ROOT, "../../scripts/record-demos/node_modules/playwright"),
	path.resolve(ROOT, "../../../scripts/record-demos/node_modules/playwright"),
	path.resolve(
		ROOT,
		"../../../../scripts/record-demos/node_modules/playwright",
	),
	"/home/user/claude-directory/scripts/record-demos/node_modules/playwright",
	"playwright",
];
let chromium;
for (const c of candidates) {
	try {
		({ chromium } = require(c));
		break;
	} catch {
		/* try next */
	}
}
if (!chromium) {
	console.error(
		"✗ Could not locate Playwright. Install it under scripts/record-demos.",
	);
	process.exit(1);
}

if (!existsSync(DIST)) {
	console.error("✗ dist/ not found — run `npm run build` first.");
	process.exit(1);
}

const MIME = {
	".html": "text/html",
	".js": "text/javascript",
	".css": "text/css",
	".woff2": "font/woff2",
	".svg": "image/svg+xml",
	".json": "application/json",
};

function serveDist(port) {
	const server = createServer(async (req, res) => {
		try {
			let urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
			if (urlPath === "/") urlPath = "/index.html";
			const filePath = path.join(DIST, urlPath);
			const info = await stat(filePath).catch(() => null);
			const target =
				info && info.isFile() ? filePath : path.join(DIST, "index.html");
			const body = await readFile(target);
			res.writeHead(200, {
				"content-type":
					MIME[path.extname(target)] || "application/octet-stream",
			});
			res.end(body);
		} catch (e) {
			res.writeHead(500);
			res.end(String(e));
		}
	});
	return new Promise((resolve) => server.listen(port, () => resolve(server)));
}

const checks = [];
const ok = (name) => checks.push({ name, pass: true });
const fail = (name, detail) => checks.push({ name, pass: false, detail });
function assert(cond, name, detail = "") {
	cond ? ok(name) : fail(name, detail);
}

const PORT = 4317;
const URL = `http://127.0.0.1:${PORT}/`;

const server = await serveDist(PORT);
const browser = await chromium.launch({ headless: true });

try {
	const page = await browser.newPage({
		viewport: { width: 1280, height: 800 },
	});
	const errors = [];
	page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
	page.on("pageerror", (e) => errors.push(String(e)));

	await page.goto(URL, { waitUntil: "networkidle", timeout: 30000 });
	await page.evaluate(() => document.fonts && document.fonts.ready);

	// 1. Core design tokens applied to <body>.
	const tokens = await page.evaluate(() => {
		const cs = getComputedStyle(document.body);
		const root = getComputedStyle(document.documentElement);
		return {
			bg: cs.backgroundColor,
			color: cs.color,
			accent: root.getPropertyValue("--accent").trim(),
			fontFamily: cs.fontFamily,
		};
	});
	assert(
		tokens.bg === "rgb(10, 10, 10)",
		"Background token #0A0A0A applied",
		tokens.bg,
	);
	assert(
		tokens.color === "rgb(250, 250, 250)",
		"Foreground token #FAFAFA applied",
		tokens.color,
	);
	assert(
		tokens.accent.toLowerCase() === "#ff3d00",
		"Accent token #FF3D00 present",
		tokens.accent,
	);
	assert(
		/inter tight/i.test(tokens.fontFamily),
		"Inter Tight is the body font",
		tokens.fontFamily,
	);

	// 2. All three vendored fonts actually loaded.
	const fontsLoaded = await page.evaluate(() => {
		const want = ["Inter Tight", "Playfair Display", "JetBrains Mono"];
		return want.map((f) => ({ f, ok: document.fonts.check(`16px "${f}"`) }));
	});
	for (const { f, ok: loaded } of fontsLoaded)
		assert(loaded, `Font loaded: ${f}`);

	// 3. Every section is present.
	const sectionIds = [
		"top",
		"manifesto",
		"features",
		"process",
		"pricing",
		"faq",
		"journal",
		"final-cta",
	];
	for (const id of sectionIds) {
		const found = await page.locator(`#${id}`).count();
		assert(found > 0, `Section #${id} rendered`);
	}

	// 4. Hero headline is genuinely huge (poster scale).
	const h1px = await page.evaluate(() =>
		parseFloat(getComputedStyle(document.querySelector("h1")).fontSize),
	);
	assert(h1px >= 80, `Hero headline >= 80px (got ${Math.round(h1px)}px)`);

	// 5. Sharp corners everywhere — no border-radius on cards/buttons/inputs.
	const maxRadius = await page.evaluate(() => {
		const els = document.querySelectorAll(
			"button, a, input, .container-bold div, h3",
		);
		let max = 0;
		els.forEach((el) => {
			const r = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
			if (r > max) max = r;
		});
		return max;
	});
	assert(maxRadius === 0, `Zero border-radius anywhere (max ${maxRadius}px)`);

	// 6. Grain overlay present.
	assert(
		(await page.locator(".grain-overlay").count()) > 0,
		"Grain overlay present",
	);

	// 7. A primary button exposes its 2px accent underline.
	const underline = await page.evaluate(() => {
		const span = document.querySelector("a.text-accent span[aria-hidden]");
		if (!span) return null;
		const cs = getComputedStyle(span);
		return { h: cs.height, bg: cs.backgroundColor };
	});
	assert(
		underline && parseFloat(underline.h) >= 2,
		"Primary button underline >= 2px",
		JSON.stringify(underline),
	);

	// 8. FAQ accordion toggles (collapse the default-open first item).
	const firstFaqBtn = page.locator("#faq button[aria-expanded]").first();
	const before = await firstFaqBtn.getAttribute("aria-expanded");
	await firstFaqBtn.click();
	await page.waitForTimeout(350);
	const after = await firstFaqBtn.getAttribute("aria-expanded");
	assert(
		before !== after,
		`FAQ accordion toggles (aria-expanded ${before} → ${after})`,
	);

	// 9. Inverted Final CTA flips its ground to warm white.
	const ctaBg = await page.evaluate(() => {
		const el = document.querySelector("#final-cta");
		return getComputedStyle(el).backgroundColor;
	});
	assert(
		ctaBg === "rgb(250, 250, 250)",
		"Final CTA inverted to #FAFAFA ground",
		ctaBg,
	);

	// 10. No horizontal overflow at desktop.
	const overflowDesktop = await page.evaluate(
		() =>
			document.documentElement.scrollWidth -
			document.documentElement.clientWidth,
	);
	assert(
		overflowDesktop <= 1,
		`No horizontal overflow @1280 (Δ ${overflowDesktop}px)`,
	);

	// 11. No horizontal overflow at mobile (375px).
	await page.setViewportSize({ width: 375, height: 800 });
	await page.waitForTimeout(300);
	const overflowMobile = await page.evaluate(
		() =>
			document.documentElement.scrollWidth -
			document.documentElement.clientWidth,
	);
	assert(
		overflowMobile <= 1,
		`No horizontal overflow @375 (Δ ${overflowMobile}px)`,
	);

	// 12. No runtime console / page errors.
	assert(
		errors.length === 0,
		"No console/page errors",
		errors.slice(0, 3).join(" | "),
	);

	await page.close();
} finally {
	await browser.close();
	server.close();
}

// ── Report ───────────────────────────────────────────────────────────────────
const passed = checks.filter((c) => c.pass).length;
console.log("\nBold Typography — verification\n" + "─".repeat(40));
for (const c of checks) {
	console.log(
		`${c.pass ? "✓" : "✗"} ${c.name}${c.detail && !c.pass ? `  → ${c.detail}` : ""}`,
	);
}
console.log("─".repeat(40));
console.log(`${passed}/${checks.length} checks passed\n`);
process.exit(passed === checks.length ? 0 : 1);
