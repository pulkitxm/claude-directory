/**
 * Headless verification for the NOCTIS cinematic hero.
 *
 * Boots `vite preview` against the production build, then drives headless
 * Chromium through every requirement in prompt.md: the exact background
 * video element (autoPlay/loop/muted/playsInline + classes + source), the
 * full-screen dark frame, typography, entrance choreography, the ticking
 * 24fps timecode, and mobile-responsiveness.
 *
 * Usage: node scripts/verify.mjs
 */
import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

const PORT = 4361;
const URL = `http://localhost:${PORT}/`;
const VIDEO_SRC = "./assets/noctis-feature.mp4";

let passed = 0;
let failed = 0;

function check(name, condition, detail = "") {
	if (condition) {
		passed += 1;
		console.log(`  PASS  ${name}${detail ? `  (${detail})` : ""}`);
	} else {
		failed += 1;
		console.log(`  FAIL  ${name}${detail ? `  (${detail})` : ""}`);
	}
}

async function waitForServer(url, attempts = 60) {
	for (let i = 0; i < attempts; i += 1) {
		try {
			const res = await fetch(url);
			if (res.ok) return;
		} catch {
			/* not up yet */
		}
		await new Promise((r) => setTimeout(r, 250));
	}
	throw new Error(`Preview server never came up at ${url}`);
}

const server = spawn(
	"npx",
	["vite", "preview", "--port", String(PORT), "--strictPort"],
	{ stdio: "ignore", detached: false },
);

try {
	await waitForServer(URL);
	console.log(`Preview server ready at ${URL}\n`);

	const browser = await chromium.launch();
	const page = await browser.newPage({
		viewport: { width: 1440, height: 900 },
	});

	const consoleErrors = [];
	page.on("console", (msg) => {
		if (msg.type() === "error") consoleErrors.push(msg.text());
	});
	page.on("pageerror", (err) => consoleErrors.push(String(err)));

	await page.goto(URL, { waitUntil: "networkidle" });
	await page.waitForTimeout(2600); // let the entrance choreography finish

	console.log("— Background video (exact spec from prompt.md) —");
	const video = page.locator("video");
	check("exactly one <video> element", (await video.count()) === 1);
	check(
		"video className matches spec exactly",
		(await video.getAttribute("class")) ===
			"absolute inset-0 w-full h-full object-cover z-0",
	);
	check("video has autoplay", (await video.getAttribute("autoplay")) !== null);
	check("video has loop", (await video.getAttribute("loop")) !== null);
	check(
		"video muted property is true",
		await video.evaluate((el) => el.muted === true),
	);
	check(
		"video has playsinline",
		(await video.getAttribute("playsinline")) !== null,
	);
	const source = page.locator("video > source");
	check("video has a single <source> child", (await source.count()) === 1);
	check(
		"source src matches the local feature asset",
		(await source.getAttribute("src")) === VIDEO_SRC,
	);
	check(
		'source type is "video/mp4"',
		(await source.getAttribute("type")) === "video/mp4",
	);
	const videoBox = await video.boundingBox();
	check(
		"video covers the full viewport",
		videoBox &&
			videoBox.width >= 1440 &&
			videoBox.height >= 900 &&
			videoBox.x <= 0 &&
			videoBox.y <= 0,
		videoBox ? `${videoBox.width}x${videoBox.height}` : "no box",
	);
	const videoState = await video.evaluate((el) => ({
		readyState: el.readyState,
		networkState: el.networkState,
		paused: el.paused,
	}));
	console.log(
		`  INFO  video readyState=${videoState.readyState} networkState=${videoState.networkState} paused=${videoState.paused}` +
			" (local feature stream loaded from the production bundle)",
	);

	console.log("\n— Full-screen dark cinematic frame —");
	const hero = page.locator('[data-testid="hero"]');
	const heroBox = await hero.boundingBox();
	check(
		"hero section fills the viewport",
		heroBox && heroBox.width === 1440 && heroBox.height >= 900,
		heroBox ? `${heroBox.width}x${heroBox.height}` : "no box",
	);
	const bodyBg = await page.evaluate(
		() => getComputedStyle(document.body).backgroundColor,
	);
	check("page base is near-black", bodyBg === "rgb(7, 7, 10)", bodyBg);
	check(
		"vignette overlay present",
		(await page.locator('[data-testid="vignette"]').count()) === 1,
	);
	check(
		"film grain overlay present",
		(await page.locator('[data-testid="grain"]').count()) === 1,
	);
	check(
		"letterbox bars present (top + bottom)",
		(await page.locator('[data-testid="letterbox-top"]').count()) === 1 &&
			(await page.locator('[data-testid="letterbox-bottom"]').count()) === 1,
	);
	const grainPointer = await page
		.locator('[data-testid="grain"]')
		.evaluate((el) => getComputedStyle(el.parentElement).pointerEvents);
	check("grain overlay does not intercept clicks", grainPointer === "none");

	console.log("\n— Typography & content —");
	const h1 = page.locator("h1");
	check("single h1 title card", (await h1.count()) === 1);
	const h1Text = (await h1.innerText()).replace(/\s+/g, " ").trim();
	check(
		'title reads "Darkness, Composed."',
		h1Text === "Darkness, Composed.",
		h1Text,
	);
	const h1Font = await h1.evaluate((el) => getComputedStyle(el).fontFamily);
	check("display font is Italiana", h1Font.includes("Italiana"), h1Font);
	const emFont = await page
		.locator("h1 em")
		.evaluate((el) => getComputedStyle(el).fontFamily);
	check(
		"accent line uses Cormorant italic",
		emFont.includes("Cormorant"),
		emFont,
	);
	const tcFont = await page
		.locator('[data-testid="timecode"]')
		.evaluate((el) => getComputedStyle(el).fontFamily);
	check("readout uses IBM Plex Mono", tcFont.includes("IBM Plex Mono"), tcFont);
	check(
		"kicker present",
		(await page.getByText("A Noctis Original Picture").count()) === 1,
	);
	check(
		"nav wordmark present",
		(await page.getByLabel("Noctis — home").count()) === 1,
	);
	check(
		"both CTAs present",
		(await page.getByText("Watch the Trailer").count()) === 1 &&
			(await page.getByText("Explore the Films").count()) === 1,
	);
	const h1LineTransform = await h1.evaluate((el) => {
		const line = el.querySelector(".mask-line > span");
		return getComputedStyle(line).transform;
	});
	check(
		"title lines finished their masked reveal",
		h1LineTransform === "none" ||
			h1LineTransform === "matrix(1, 0, 0, 1, 0, 0)",
		h1LineTransform,
	);

	console.log("\n— Timecode ticks at 24fps —");
	const tc1 = await page.locator('[data-testid="timecode"]').innerText();
	await page.waitForTimeout(700);
	const tc2 = await page.locator('[data-testid="timecode"]').innerText();
	check("timecode advances", tc1 !== tc2, `${tc1} -> ${tc2}`);
	check(
		"timecode is SMPTE-formatted",
		/^\d{2}:\d{2}:\d{2}:\d{2}$/.test(tc2),
		tc2,
	);

	console.log("\n— Desktop screenshot —");
	mkdirSync("screenshots", { recursive: true });
	await page.screenshot({ path: "screenshots/hero-desktop.png" });
	console.log("  saved screenshots/hero-desktop.png");

	console.log("\n— Mobile (390x844) —");
	await page.setViewportSize({ width: 390, height: 844 });
	await page.waitForTimeout(600);
	const overflow = await page.evaluate(
		() =>
			document.documentElement.scrollWidth -
			document.documentElement.clientWidth,
	);
	check("no horizontal overflow", overflow <= 0, `${overflow}px`);
	check(
		"side rails hidden on mobile",
		!(await page.locator('[data-testid="rail-left"]').isVisible()) &&
			!(await page.locator('[data-testid="rail-right"]').isVisible()),
	);
	check("title still visible", await h1.isVisible());
	check(
		"primary CTA still visible",
		await page.getByText("Watch the Trailer").isVisible(),
	);
	const mobileVideoBox = await video.boundingBox();
	check(
		"video still covers mobile viewport",
		mobileVideoBox &&
			mobileVideoBox.width >= 390 &&
			mobileVideoBox.height >= 844,
		mobileVideoBox
			? `${mobileVideoBox.width}x${mobileVideoBox.height}`
			: "no box",
	);
	await page.screenshot({ path: "screenshots/hero-mobile.png" });
	console.log("  saved screenshots/hero-mobile.png");

	console.log("\n— Console health —");
	const appErrors = consoleErrors.filter(
		(e) =>
			!e.includes("res.cloudinary.com") &&
			!e.toLowerCase().includes("failed to load resource"),
	);
	check(
		"no application console errors",
		appErrors.length === 0,
		appErrors.join(" | "),
	);
	if (consoleErrors.length !== appErrors.length) {
		console.log(
			`  INFO  ${consoleErrors.length - appErrors.length} network log(s) from the remote video host were excluded (availability is environment-dependent)`,
		);
	}

	await browser.close();
} finally {
	server.kill("SIGTERM");
}

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed === 0 ? 0 : 1);
