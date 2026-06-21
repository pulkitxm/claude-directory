/**
 * Headless E2E verification for the "Interactive 3D" Spline component integration.
 * Serves the production build via `vite preview`; Chromium drives the page and
 * asserts the component renders, degrades gracefully when the remote Spline
 * scene is unreachable, and that the docs + playground behave as specified.
 *
 * Run: npm run build && node scripts/verify.mjs
 *
 * NOTE on console errors: the demo points <SplineScene /> at a remote scene on
 * prod.spline.design. In a sandboxed / offline environment that host is blocked,
 * so the browser logs a network/cert resource error for that exact URL. Those
 * specific errors are expected (and the UI handles them by showing the animated
 * fallback); any OTHER console error fails the run.
 */
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { chromium } from "playwright";

const PORT = await new Promise((resolve, reject) => {
	const probe = createServer();
	probe.once("error", reject);
	probe.listen(0, () => {
		const { port } = probe.address();
		probe.close(() => resolve(port));
	});
});
const URL = `http://localhost:${PORT}/`;

let failures = 0;
const pass = (msg) => console.log(`  ✓ ${msg}`);
const fail = (msg) => {
	failures += 1;
	console.error(`  ✗ ${msg}`);
};
const check = (cond, msg) => (cond ? pass(msg) : fail(msg));

const waitForServer = async (url, timeoutMs = 20000) => {
	const deadline = Date.now() + timeoutMs;
	while (Date.now() < deadline) {
		try {
			if ((await fetch(url)).ok) return;
		} catch {
			/* not up yet */
		}
		await new Promise((r) => setTimeout(r, 250));
	}
	throw new Error(`Preview server did not start at ${url}`);
};

const server = spawn(
	"./node_modules/.bin/vite",
	["preview", "--port", String(PORT), "--strictPort"],
	{ stdio: "ignore" },
);
server.on("exit", (code) => {
	if (code !== null && code !== 0) {
		console.error(`Preview server exited with code ${code} (port in use?)`);
		process.exit(1);
	}
});

// Network/console errors that are expected because the remote scene host is
// blocked in this environment. Anything matching is ignored; everything else
// is a real failure.
const EXPECTED_ERROR =
	/prod\.spline\.design|ERR_CERT_AUTHORITY_INVALID|Failed to load resource|Failed to fetch/i;

try {
	await waitForServer(URL);
	console.log(`Preview server up at ${URL}\n`);

	const browser = await chromium.launch();
	const page = await browser.newPage({
		viewport: { width: 1280, height: 900 },
		deviceScaleFactor: 2,
	});
	page.setDefaultTimeout(10000);

	const consoleErrors = [];
	page.on("console", (msg) => {
		if (msg.type() === "error") consoleErrors.push(msg.text());
	});
	page.on("pageerror", (err) => consoleErrors.push(String(err)));

	const failedRequests = [];
	page.on("requestfailed", (req) =>
		failedRequests.push(`${req.url()} (${req.failure()?.errorText})`),
	);
	page.on("response", (res) => {
		if (res.status() >= 400)
			failedRequests.push(`${res.url()} -> ${res.status()}`);
	});

	await page.goto(URL, { waitUntil: "load" });

	console.log("Section 1 — Hero (SplineSceneBasic)");
	check(
		(
			await page.getByRole("heading", { level: 1 }).first().textContent()
		)?.includes("Interactive 3D"),
		"hero headline renders",
	);
	// The exact demo Card: black bg, h-[500px], overflow-hidden.
	const heroCard = page.locator("div.h-\\[500px\\]").first();
	check((await heroCard.count()) === 1, "hero Card (h-[500px]) present");
	check(
		await page
			.getByText("Bring your UI to life with beautiful 3D scenes")
			.first()
			.isVisible(),
		"hero body copy renders",
	);

	console.log("\nSection 2 — Spotlight");
	check(
		(await page.locator("svg.animate-spotlight").count()) >= 1,
		"Spotlight SVG (animate-spotlight) mounted",
	);
	// Spotlight animates from opacity-0 -> 1 via the registered keyframe.
	await page.waitForTimeout(3200);
	const spotOpacity = await page
		.locator("svg.animate-spotlight")
		.first()
		.evaluate((el) => Number(getComputedStyle(el).opacity));
	check(
		spotOpacity > 0.5,
		`spotlight keyframe ran (opacity ${spotOpacity.toFixed(2)} > 0.5)`,
	);

	console.log("\nSection 3 — Graceful 3D fallback (scene host blocked)");
	// Scene is unreachable here, so the OrbitalFallback canvas must take over and
	// the Suspense loader must NOT be stuck on screen.
	const fb = page.locator('canvas[data-testid="orbital-fallback"]');
	check((await fb.count()) >= 1, "OrbitalFallback canvas rendered");
	check(
		(await page.locator("span.loader").count()) === 0,
		"Suspense loader is not stuck (no .loader left on screen)",
	);
	const painted = await fb.first().evaluate((c) => {
		const ctx = c.getContext("2d");
		const d = ctx.getImageData(0, 0, c.width, c.height).data;
		for (let i = 3; i < d.length; i += 4) if (d[i] > 0) return true;
		return false;
	});
	check(painted, "fallback canvas is actively painting pixels");

	console.log("\nSection 4 — Integration docs");
	check(
		await page.getByText("Where the files go").isVisible(),
		"default-paths / structure section present",
	);
	check(
		await page.getByText("Why a dedicated").first().isVisible(),
		"‘why components/ui’ explainer present",
	);
	// File tree highlights the three component files under components/ui.
	for (const f of ["splite.tsx", "card.tsx", "spotlight.tsx"]) {
		check(
			(await page.getByText(f, { exact: true }).count()) >= 1,
			`file tree lists ${f}`,
		);
	}
	check(
		await page.getByText("npx shadcn@latest init").first().isVisible(),
		"shadcn setup command shown",
	);
	check(
		(await page.getByText("@splinetool/react-spline").count()) >= 1,
		"dependency list shows @splinetool/react-spline",
	);

	console.log("\nSection 5 — Props playground");
	const playground = page.locator("#playground");
	await playground.scrollIntoViewIfNeeded();
	const titleInput = playground.getByRole("textbox").first();
	// The preview's headline is the <h1> inside the playground (the section title
	// is an <h2>), so target the h1 specifically.
	const previewHeading = playground.locator("h1").first();
	await titleInput.fill("Hello Fable");
	await page.waitForTimeout(200);
	check(
		(await previewHeading.textContent())?.includes("Hello Fable"),
		"editing the title prop updates the live preview",
	);
	// Toggle the spotlight off -> the playground's spotlight SVG disappears.
	const spotBefore = await playground.locator("svg.animate-spotlight").count();
	await playground.getByRole("switch").click();
	await page.waitForTimeout(150);
	const spotAfter = await playground.locator("svg.animate-spotlight").count();
	check(
		spotBefore >= 1 && spotAfter === 0,
		`spotlight toggle removes the Spotlight (${spotBefore} -> ${spotAfter})`,
	);

	console.log("\nSection 6 — Asset health (vendored fonts)");
	const brokenFonts = failedRequests.filter((u) => /\.woff2/.test(u));
	check(
		brokenFonts.length === 0,
		`vendored fonts loaded (${brokenFonts.length} failures)`,
	);
	if (brokenFonts.length) brokenFonts.forEach((u) => console.error(`    ${u}`));

	console.log("\nSection 7 — Console health");
	const unexpected = consoleErrors.filter((e) => !EXPECTED_ERROR.test(e));
	check(
		unexpected.length === 0,
		`no unexpected console errors (${unexpected.length}); ${consoleErrors.length - unexpected.length} expected scene-host errors ignored`,
	);
	if (unexpected.length) unexpected.forEach((e) => console.error(`    ${e}`));

	await browser.close();
} finally {
	server.kill("SIGTERM");
}

console.log(
	failures === 0 ? "\nALL CHECKS PASSED" : `\n${failures} CHECK(S) FAILED`,
);
process.exit(failures === 0 ? 0 : 1);
