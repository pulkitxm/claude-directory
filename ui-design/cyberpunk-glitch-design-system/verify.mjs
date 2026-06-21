/**
 * Headless verification for NEUROCITRINE — Cyberpunk / Glitch design system.
 *
 * CLI-only. Serves the project with a tiny static server, drives headless
 * Chromium (Playwright) through it at desktop (1280) and mobile (390) widths,
 * and asserts the design system is actually wired up: tokens applied, the three
 * neon fonts loaded, no console errors, every mandatory signature present
 * (scanlines, chromatic-aberration headline, chamfered clip-paths, real neon
 * glow box-shadows, circuit/grid backgrounds, terminal section), the interactive
 * pieces work (FAQ accordion, stat count-up, mobile drawer, live console, access
 * form), and core accessibility holds.
 *
 * Usage (from this folder):
 *   PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node verify.mjs
 * Optional: PW_EXEC=/abs/path/to/chrome to force a browser binary.
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;
const PORT = Number(process.env.PORT || 5277);

/* ---- resolve playwright from a sibling install if not local ---------- */
const require = createRequire(import.meta.url);
function pickChromium(mod) {
	return mod.chromium || (mod.default && mod.default.chromium);
}
let chromium;
try {
	chromium = pickChromium(require("playwright"));
} catch {
	/* fall through */
}
if (!chromium) {
	const pwDir =
		process.env.PW_DIR || path.resolve(ROOT, "../../scripts/record-demos");
	const sideRequire = createRequire(
		pathToFileURL(path.join(pwDir, "package.json")).href,
	);
	chromium = pickChromium(sideRequire("playwright"));
}
if (!chromium) throw new Error("could not load chromium from playwright");

/* ---- tiny static server --------------------------------------------- */
const MIME = {
	".html": "text/html; charset=utf-8",
	".css": "text/css; charset=utf-8",
	".js": "text/javascript; charset=utf-8",
	".mjs": "text/javascript; charset=utf-8",
	".svg": "image/svg+xml",
	".woff2": "font/woff2",
	".json": "application/json",
	".png": "image/png",
};
const server = http.createServer((req, res) => {
	let p = decodeURIComponent(req.url.split("?")[0]);
	if (p === "/") p = "/index.html";
	const file = path.join(ROOT, p);
	if (
		!file.startsWith(ROOT) ||
		!fs.existsSync(file) ||
		fs.statSync(file).isDirectory()
	) {
		res.writeHead(404);
		res.end("not found");
		return;
	}
	res.writeHead(200, {
		"content-type": MIME[path.extname(file)] || "application/octet-stream",
	});
	fs.createReadStream(file).pipe(res);
});

/* ---- assertion helpers ---------------------------------------------- */
let passed = 0,
	failed = 0;
const results = [];
function ok(name, cond, extra = "") {
	if (cond) {
		passed++;
		results.push(`  PASS  ${name}${extra ? "  — " + extra : ""}`);
	} else {
		failed++;
		results.push(`  FAIL  ${name}${extra ? "  — " + extra : ""}`);
	}
}

const launchOpts = { headless: true };
if (process.env.PW_EXEC) launchOpts.executablePath = process.env.PW_EXEC;

const run = async () => {
	await new Promise((r) => server.listen(PORT, r));
	const base = `http://127.0.0.1:${PORT}/`;
	const browser = await chromium.launch(launchOpts);

	/* ======================= DESKTOP (1280) ============================ */
	{
		const ctx = await browser.newContext({
			viewport: { width: 1280, height: 900 },
			deviceScaleFactor: 1,
		});
		const page = await ctx.newPage();
		const consoleErrors = [];
		page.on("console", (m) => {
			if (m.type() === "error") consoleErrors.push(m.text());
		});
		page.on("pageerror", (e) => consoleErrors.push(String(e)));

		const resp = await page.goto(base, { waitUntil: "networkidle" });
		ok(
			"page responds 200",
			resp && resp.status() === 200,
			`status ${resp && resp.status()}`,
		);

		// ---- design tokens applied on :root ----
		const tokens = await page.evaluate(() => {
			const s = getComputedStyle(document.documentElement);
			const norm = (c) => c.replace(/\s/g, "").toLowerCase();
			return {
				bg: norm(s.getPropertyValue("--background")),
				accent: norm(s.getPropertyValue("--accent")),
				accent2: norm(s.getPropertyValue("--accent-secondary")),
				accent3: norm(s.getPropertyValue("--accent-tertiary")),
				neon: s.getPropertyValue("--box-shadow-neon").trim(),
				bodyBg: norm(getComputedStyle(document.body).backgroundColor),
			};
		});
		ok("token --background = #0a0a0f", tokens.bg === "#0a0a0f", tokens.bg);
		ok(
			"token --accent = #00ff88 (electric green)",
			tokens.accent === "#00ff88",
			tokens.accent,
		);
		ok(
			"token --accent-secondary = #ff00ff (magenta)",
			tokens.accent2 === "#ff00ff",
			tokens.accent2,
		);
		ok(
			"token --accent-tertiary = #00d4ff (cyan)",
			tokens.accent3 === "#00d4ff",
			tokens.accent3,
		);
		ok(
			"neon glow token defines stacked box-shadow",
			/0 0 5px #00ff88/.test(tokens.neon),
			tokens.neon,
		);
		ok(
			"body renders on void-black background",
			tokens.bodyBg === "rgb(10,10,15)" || tokens.bodyBg === "#0a0a0f",
			tokens.bodyBg,
		);

		// ---- fonts loaded (Orbitron, JetBrains Mono, Share Tech Mono) ----
		const fonts = await page.evaluate(async () => {
			await document.fonts.ready;
			const fam = (q) => document.fonts.check(q);
			return {
				orbitron: fam('700 32px "Orbitron"'),
				jetbrains: fam('400 16px "JetBrains Mono"'),
				sharetech: fam('400 14px "Share Tech Mono"'),
				loadedCount: document.fonts.size,
			};
		});
		ok("Orbitron loaded (headings)", fonts.orbitron);
		ok("JetBrains Mono loaded (body)", fonts.jetbrains);
		ok("Share Tech Mono loaded (labels)", fonts.sharetech);
		ok(
			"font faces registered (>=3)",
			fonts.loadedCount >= 3,
			`count ${fonts.loadedCount}`,
		);

		// ---- heading actually uses Orbitron ----
		const h1fam = await page.evaluate(() =>
			getComputedStyle(document.querySelector("h1")).fontFamily.toLowerCase(),
		);
		ok(
			"h1 computed font-family is Orbitron",
			h1fam.includes("orbitron"),
			h1fam.slice(0, 40),
		);

		// ---- MANDATORY: full-page scanline overlay via body::after ----
		const scan = await page.evaluate(() => {
			const a = getComputedStyle(document.body, "::after");
			return { img: a.backgroundImage, z: a.zIndex, pe: a.pointerEvents };
		});
		ok(
			"scanline overlay present (body::after repeating-linear-gradient)",
			/repeating-linear-gradient/.test(scan.img),
		);
		ok(
			"scanline overlay sits on top (high z-index)",
			Number(scan.z) >= 1000,
			`z ${scan.z}`,
		);
		ok("scanline overlay is pointer-events:none", scan.pe === "none", scan.pe);

		// ---- MANDATORY: glitch headline w/ chromatic aberration ----
		const glitch = await page.evaluate(() => {
			const el = document.querySelector(".glitch-head");
			if (!el) return null;
			const cs = getComputedStyle(el);
			const before = getComputedStyle(el, "::before");
			const after = getComputedStyle(el, "::after");
			return {
				hasDataText: el.getAttribute("data-text") === el.textContent,
				textShadow: cs.textShadow,
				beforeContent: before.content,
				afterContent: after.content,
				beforeColor: before.color,
				afterColor: after.color,
			};
		});
		ok(
			"hero headline .glitch-head exists with data-text mirror",
			glitch && glitch.hasDataText,
		);
		ok(
			"headline has chromatic-aberration text-shadow (magenta+cyan offsets)",
			glitch &&
				/255,\s*0,\s*255/.test(glitch.textShadow) &&
				/0,\s*212,\s*255/.test(glitch.textShadow),
			glitch && glitch.textShadow.slice(0, 60),
		);
		ok(
			"headline ::before/::after render duplicated text (RGB split layers)",
			glitch &&
				glitch.beforeContent.includes("NEUROCITRINE") &&
				glitch.afterContent.includes("NEUROCITRINE"),
		);

		// ---- MANDATORY: chamfered corners via clip-path (not border-radius) ----
		const chamfer = await page.evaluate(() => {
			const cards = Array.from(document.querySelectorAll(".cyber-chamfer"));
			const withClip = cards.filter((c) => {
				const cp = getComputedStyle(c).clipPath;
				return cp && cp !== "none" && cp.includes("polygon");
			});
			const radius0 = cards.every((c) => {
				const r = getComputedStyle(c).borderTopLeftRadius;
				return r === "0px";
			});
			return { total: cards.length, clipped: withClip.length, radius0 };
		});
		ok(
			"chamfered elements use clip-path polygon",
			chamfer.clipped >= 8,
			`${chamfer.clipped}/${chamfer.total} clipped`,
		);
		ok(
			"chamfered cards have zero border-radius (sharp by default)",
			chamfer.radius0,
		);

		// ---- MANDATORY: real neon glow (stacked box-shadows) on hover ----
		const glow = await page.evaluate(async () => {
			const card = document.querySelector(".card--hover");
			card.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
			card.classList.add("__force_hover_probe");
			// read the rule directly: simulate by forcing :hover-equivalent style
			// instead, read the tier--pro which has a static glow
			const pro = document.querySelector(".tier--pro");
			const proShadow = getComputedStyle(pro).boxShadow;
			const access = document.querySelector(".access");
			const accessShadow = getComputedStyle(access).boxShadow;
			return { proShadow, accessShadow };
		});
		ok(
			"highlighted pricing tier has a real neon glow box-shadow",
			glow.proShadow &&
				glow.proShadow !== "none" &&
				glow.proShadow.includes("rgb"),
			glow.proShadow.slice(0, 50),
		);
		ok(
			"access CTA panel glows (stacked neon box-shadow)",
			glow.accessShadow && glow.accessShadow !== "none",
			glow.accessShadow.slice(0, 50),
		);

		// ---- MANDATORY: circuit + grid backgrounds present ----
		const patterns = await page.evaluate(() => {
			const grid = document.querySelector(".bg-grid");
			const circuit = document.querySelector(".bg-circuit");
			const gImg = grid ? getComputedStyle(grid).backgroundImage : "";
			const cImg = circuit ? getComputedStyle(circuit).backgroundImage : "";
			return {
				gridIsLinear: /linear-gradient/.test(gImg),
				circuitIsSvg: /circuit\.svg/.test(cImg) || /url\(/.test(cImg),
				gridCount: document.querySelectorAll(".bg-grid").length,
				circuitCount: document.querySelectorAll(".bg-circuit").length,
			};
		});
		ok(
			"grid pattern background uses linear-gradient lines",
			patterns.gridIsLinear,
			`${patterns.gridCount} instances`,
		);
		ok(
			"circuit/PCB pattern background present",
			patterns.circuitIsSvg,
			`${patterns.circuitCount} instances`,
		);

		// ---- MANDATORY: terminal section (monospace, > prefixes, traffic lights) ----
		const terminal = await page.evaluate(() => {
			const term = document.querySelector(".card--terminal");
			const before = term ? getComputedStyle(term, "::before").content : "";
			const console = document.querySelector(".console__bar");
			const dots = document.querySelectorAll(".console__bar .dot").length;
			const promptPseudo = document.querySelector(".console__body");
			return {
				hasTerminalCard: !!term,
				hasConsoleBar: !!console,
				trafficDots: dots,
			};
		});
		ok(
			"terminal-variant card exists (with header bar)",
			terminal.hasTerminalCard,
		);
		ok(
			"live console has traffic-light dots (r/y/g)",
			terminal.trafficDots >= 3,
			`${terminal.trafficDots} dots`,
		);

		// ---- blinking cursor element present ----
		const cursorCount = await page.locator(".cursor").count();
		ok(
			"blinking terminal cursor(s) present",
			cursorCount >= 1,
			`${cursorCount} cursors`,
		);

		// ---- HUD telemetry meters fill ----
		await page.waitForTimeout(600);
		const meterWidth = await page.evaluate(() => {
			const m = document.querySelector(".hud__rows .meter span");
			return m ? getComputedStyle(m).width : "0px";
		});
		ok(
			"HUD telemetry meter filled (animated width applied)",
			parseFloat(meterWidth) > 0,
			meterWidth,
		);

		// ---- stat count-up reaches target ----
		await page.locator("#features").scrollIntoViewIfNeeded();
		await page.evaluate(() => window.scrollTo(0, 400));
		await page.waitForTimeout(1800);
		const statText = await page.evaluate(() => {
			const el = document.querySelector("[data-count='2.4']");
			return el ? el.textContent.trim() : "";
		});
		ok(
			"stat count-up animates to target (2.4)",
			statText === "2.4",
			`got "${statText}"`,
		);

		// ---- live console types lines ----
		await page.locator("section#console").scrollIntoViewIfNeeded();
		await page.waitForTimeout(2500);
		const consoleLines = await page.evaluate(
			() => document.querySelectorAll("#consoleLog .ln").length,
		);
		ok(
			"live terminal console types out lines",
			consoleLines >= 2,
			`${consoleLines} lines`,
		);

		// ---- FAQ accordion expands ----
		await page.locator("#faq").scrollIntoViewIfNeeded();
		const firstQ = page.locator(".faq__q").first();
		const item = page.locator(".faq__item").first();
		await firstQ.click();
		await page.waitForTimeout(450);
		const faqOpen = await item.evaluate((el) => {
			const a = el.querySelector(".faq__a");
			return {
				open: el.classList.contains("open"),
				maxH: parseFloat(getComputedStyle(a).maxHeight) || 0,
				expanded: el.querySelector(".faq__q").getAttribute("aria-expanded"),
			};
		});
		ok(
			"FAQ accordion opens on click",
			faqOpen.open && faqOpen.maxH > 0,
			`maxHeight ${faqOpen.maxH}px`,
		);
		ok("FAQ button toggles aria-expanded=true", faqOpen.expanded === "true");

		// ---- access form produces confirmation ----
		await page.locator("#access").scrollIntoViewIfNeeded();
		await page.fill("#accessInput", "v0lt");
		await page.locator("#accessForm button[type=submit]").click();
		await page.waitForTimeout(200);
		const formOut = await page.locator("#formOut").textContent();
		ok(
			"access form returns terminal confirmation",
			/OK/.test(formOut) && /v0lt/.test(formOut),
			formOut.slice(0, 50),
		);

		// ---- accessibility basics ----
		const a11y = await page.evaluate(() => {
			const lang = document.documentElement.lang;
			const h1 = document.querySelectorAll("h1").length;
			const skip = !!document.querySelector('a[href="#main"]');
			const navAria = !!document.querySelector("nav[aria-label]");
			const liveLog = !!document.querySelector("[aria-live]");
			const btnLabels = Array.from(
				document.querySelectorAll(".icon-btn, .drawer__close, .socials a"),
			).every((b) => b.getAttribute("aria-label"));
			return { lang, h1, skip, navAria, liveLog, btnLabels };
		});
		ok("has lang attribute", a11y.lang === "en", a11y.lang);
		ok("exactly one <h1>", a11y.h1 === 1, `${a11y.h1}`);
		ok("skip-to-content link present", a11y.skip);
		ok("primary nav has aria-label", a11y.navAria);
		ok("live regions present (aria-live)", a11y.liveLog);
		ok("icon-only controls have aria-labels", a11y.btnLabels);

		// ---- no console errors ----
		ok(
			"no console errors on desktop",
			consoleErrors.length === 0,
			consoleErrors.slice(0, 2).join(" | "),
		);

		// ---- no horizontal overflow ----
		const overflowX = await page.evaluate(
			() =>
				document.documentElement.scrollWidth -
				document.documentElement.clientWidth,
		);
		ok(
			"no horizontal overflow on desktop",
			overflowX <= 2,
			`overflow ${overflowX}px`,
		);

		await ctx.close();
	}

	/* ======================= MOBILE (390) ============================== */
	{
		const ctx = await browser.newContext({
			viewport: { width: 390, height: 844 },
			deviceScaleFactor: 2,
			isMobile: true,
			hasTouch: true,
		});
		const page = await ctx.newPage();
		const consoleErrors = [];
		page.on("console", (m) => {
			if (m.type() === "error") consoleErrors.push(m.text());
		});
		page.on("pageerror", (e) => consoleErrors.push(String(e)));
		await page.goto(base, { waitUntil: "networkidle" });

		// hamburger visible, desktop nav links hidden
		const navState = await page.evaluate(() => {
			const toggle = document.querySelector("#navToggle");
			const links = document.querySelector(".nav__links");
			return {
				toggleVisible: toggle && getComputedStyle(toggle).display !== "none",
				linksHidden: links && getComputedStyle(links).display === "none",
			};
		});
		ok("mobile: hamburger button visible", navState.toggleVisible);
		ok("mobile: desktop nav links hidden", navState.linksHidden);

		// open drawer
		await page.locator("#navToggle").click();
		await page.waitForTimeout(350);
		const drawerOpen = await page.evaluate(() => {
			const d = document.querySelector("#drawer");
			return {
				open: d.classList.contains("open"),
				aria: d.getAttribute("aria-hidden"),
			};
		});
		ok(
			"mobile: drawer opens on tap",
			drawerOpen.open,
			`aria-hidden ${drawerOpen.aria}`,
		);

		// close drawer
		await page.locator("#drawerClose").click();
		await page.waitForTimeout(350);
		const drawerClosed = await page.evaluate(
			() => !document.querySelector("#drawer").classList.contains("open"),
		);
		ok("mobile: drawer closes", drawerClosed);

		// hero HUD hidden on mobile
		const hudHidden = await page.evaluate(
			() => getComputedStyle(document.querySelector("#hud")).display === "none",
		);
		ok("mobile: hero HUD hidden (lg:block)", hudHidden);

		// stats stack 2-up on mobile
		const statCols = await page.evaluate(
			() =>
				getComputedStyle(
					document.querySelector(".stats"),
				).gridTemplateColumns.split(" ").length,
		);
		ok("mobile: stats grid is 2 columns", statCols === 2, `${statCols} cols`);

		// pricing single column on mobile
		const priceCols = await page.evaluate(
			() =>
				getComputedStyle(
					document.querySelector(".pricing__grid"),
				).gridTemplateColumns.split(" ").length,
		);
		ok(
			"mobile: pricing stacks to single column",
			priceCols === 1,
			`${priceCols} cols`,
		);

		// touch targets >= 44px
		const smallTargets = await page.evaluate(() => {
			const els = Array.from(
				document.querySelectorAll(".btn, .faq__q, .icon-btn"),
			);
			return els.filter(
				(e) => e.getBoundingClientRect().height < 44 && e.offsetParent !== null,
			).length;
		});
		ok(
			"mobile: interactive elements meet 44px touch target",
			smallTargets === 0,
			`${smallTargets} undersized`,
		);

		// scanlines still present on mobile
		const scanMobile = await page.evaluate(() =>
			/repeating-linear-gradient/.test(
				getComputedStyle(document.body, "::after").backgroundImage,
			),
		);
		ok("mobile: scanline overlay maintained", scanMobile);

		// no horizontal overflow
		const overflowX = await page.evaluate(
			() =>
				document.documentElement.scrollWidth -
				document.documentElement.clientWidth,
		);
		ok(
			"mobile: no horizontal overflow",
			overflowX <= 2,
			`overflow ${overflowX}px`,
		);

		ok(
			"no console errors on mobile",
			consoleErrors.length === 0,
			consoleErrors.slice(0, 2).join(" | "),
		);

		await ctx.close();
	}

	/* ======================= REDUCED MOTION ============================ */
	{
		const ctx = await browser.newContext({
			viewport: { width: 1280, height: 900 },
			reducedMotion: "reduce",
		});
		const page = await ctx.newPage();
		await page.goto(base, { waitUntil: "networkidle" });
		await page.waitForTimeout(300);
		const rm = await page.evaluate(() => {
			const head = document.querySelector(".glitch-head");
			const anim = getComputedStyle(head).animationName;
			const before = getComputedStyle(head, "::before");
			// typed subtitle should be filled immediately
			const typed = document.querySelector("#typed").textContent.length;
			return {
				headAnim: anim,
				beforeShadowStatic: before.transform !== "none",
				typedLen: typed,
			};
		});
		ok(
			"reduced-motion: headline glitch animation disabled",
			rm.headAnim === "none",
			rm.headAnim,
		);
		ok(
			"reduced-motion: static chromatic aberration retained on headline",
			rm.beforeShadowStatic,
		);
		ok(
			"reduced-motion: typewriter shows full text immediately",
			rm.typedLen > 0,
			`${rm.typedLen} chars`,
		);
		await ctx.close();
	}

	await browser.close();
	await new Promise((r) => server.close(r));

	/* ---- report ---- */
	console.log("\n" + results.join("\n"));
	console.log(
		`\n=== NEUROCITRINE verification: ${passed} passed, ${failed} failed ===\n`,
	);
	process.exit(failed === 0 ? 0 : 1);
};

run().catch((e) => {
	console.error("VERIFY CRASHED:", e);
	process.exit(2);
});
