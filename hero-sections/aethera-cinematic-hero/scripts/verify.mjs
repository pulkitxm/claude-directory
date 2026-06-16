/**
 * Headless verification for the Aethera cinematic hero.
 *
 * Boots `vite preview` against the production build, then drives headless
 * Chromium through every requirement in prompt.md: fonts, colors, layout,
 * entrance animations, video positioning, and the custom fade-in/fade-out
 * manual loop (including the ended -> 100ms -> rewind -> replay path).
 *
 * Usage: node scripts/verify.mjs
 */
import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

const PORT = 4317;
const URL = `http://localhost:${PORT}/`;

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
	{
		stdio: "ignore",
		detached: false,
	},
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

	console.log("— Document & fonts —");
	check("title mentions Aethera", (await page.title()).includes("Aethera"));
	const fontsLoaded = await page.evaluate(async () => {
		await document.fonts.ready;
		return {
			instrument: document.fonts.check('40px "Instrument Serif"'),
			instrumentItalic: document.fonts.check('italic 40px "Instrument Serif"'),
			inter: document.fonts.check('16px "Inter"'),
		};
	});
	check("Instrument Serif loaded", fontsLoaded.instrument);
	check("Instrument Serif italic loaded", fontsLoaded.instrumentItalic);
	check("Inter loaded", fontsLoaded.inter);

	console.log("\n— Navigation bar —");
	const logo = page.locator("header a", { hasText: "Aethera" }).first();
	const logoStyle = await logo.evaluate((el) => {
		const cs = getComputedStyle(el);
		return {
			fontFamily: cs.fontFamily,
			fontSize: cs.fontSize,
			color: cs.color,
		};
	});
	check(
		"logo uses Instrument Serif",
		logoStyle.fontFamily.includes("Instrument Serif"),
		logoStyle.fontFamily.split(",")[0],
	);
	check(
		"logo is text-3xl (30px)",
		logoStyle.fontSize === "30px",
		logoStyle.fontSize,
	);
	check(
		"logo color #000000",
		logoStyle.color === "rgb(0, 0, 0)",
		logoStyle.color,
	);
	check(
		"logo has superscript ®",
		(await logo.locator("sup").textContent())?.trim() === "®",
	);

	const menuLabels = await page.locator("header nav ul a").allTextContents();
	check(
		"menu items Home/Studio/About/Journal/Reach Us",
		JSON.stringify(menuLabels) ===
			JSON.stringify(["Home", "Studio", "About", "Journal", "Reach Us"]),
		menuLabels.join(", "),
	);
	const homeColor = await page
		.locator("header nav a", { hasText: "Home" })
		.evaluate((el) => getComputedStyle(el).color);
	const studioColor = await page
		.locator("header nav a", { hasText: "Studio" })
		.evaluate((el) => getComputedStyle(el).color);
	check("Home is #000000", homeColor === "rgb(0, 0, 0)", homeColor);
	check(
		"other items are #6F6F6F",
		studioColor === "rgb(111, 111, 111)",
		studioColor,
	);

	const navCta = page.locator("header button", { hasText: "Begin Journey" });
	const navCtaStyle = await navCta.evaluate((el) => {
		const cs = getComputedStyle(el);
		return {
			bg: cs.backgroundColor,
			color: cs.color,
			radius: cs.borderRadius,
			padding: `${cs.paddingLeft} ${cs.paddingTop}`,
			fontSize: cs.fontSize,
		};
	});
	check(
		"nav CTA black bg / white text",
		navCtaStyle.bg === "rgb(0, 0, 0)" &&
			navCtaStyle.color === "rgb(255, 255, 255)",
	);
	check(
		"nav CTA rounded-full + px-6 py-2.5 + text-sm",
		parseFloat(navCtaStyle.radius) > 1000 &&
			navCtaStyle.padding === "24px 10px" &&
			navCtaStyle.fontSize === "14px",
		`radius=${navCtaStyle.radius} pad=${navCtaStyle.padding} fs=${navCtaStyle.fontSize}`,
	);

	console.log("\n— Hero section —");
	const h1 = page.locator("h1");
	check(
		"headline text",
		(await h1.textContent())?.replace(/\s+/g, " ").trim() ===
			"Beyond silence, we build the eternal.",
	);
	const h1Style = await h1.evaluate((el) => {
		const cs = getComputedStyle(el);
		return {
			fontFamily: cs.fontFamily,
			fontSize: parseFloat(cs.fontSize),
			lineHeight: parseFloat(cs.lineHeight),
			letterSpacing: cs.letterSpacing,
			color: cs.color,
			animationName: cs.animationName,
			animationDuration: cs.animationDuration,
		};
	});
	check(
		"headline Instrument Serif",
		h1Style.fontFamily.includes("Instrument Serif"),
	);
	check(
		"headline md:text-8xl at 1440px (96px)",
		h1Style.fontSize === 96,
		`${h1Style.fontSize}px`,
	);
	check(
		"headline line-height 0.95",
		Math.abs(h1Style.lineHeight / h1Style.fontSize - 0.95) < 0.005,
		`${h1Style.lineHeight}px`,
	);
	check(
		"headline letter-spacing -2.46px",
		h1Style.letterSpacing === "-2.46px",
		h1Style.letterSpacing,
	);
	check("headline color #000000", h1Style.color === "rgb(0, 0, 0)");
	check(
		"headline animate-fade-rise (0.8s)",
		h1Style.animationName === "fade-rise" &&
			h1Style.animationDuration === "0.8s",
	);

	const emStyles = await page.locator("h1 em").evaluateAll((els) =>
		els.map((el) => ({
			text: el.textContent.trim(),
			color: getComputedStyle(el).color,
			style: getComputedStyle(el).fontStyle,
		})),
	);
	check(
		'emphasis "silence," + "the eternal." italic #6F6F6F',
		emStyles.length === 2 &&
			emStyles[0].text === "silence," &&
			emStyles[1].text === "the eternal." &&
			emStyles.every(
				(s) => s.color === "rgb(111, 111, 111)" && s.style === "italic",
			),
		JSON.stringify(emStyles),
	);

	const desc = page.locator("section p");
	const descStyle = await desc.evaluate((el) => {
		const cs = getComputedStyle(el);
		return {
			color: cs.color,
			fontSize: cs.fontSize,
			animationName: cs.animationName,
			animationDelay: cs.animationDelay,
			marginTop: cs.marginTop,
		};
	});
	check(
		"description #6F6F6F, text-lg @ desktop, mt-8",
		descStyle.color === "rgb(111, 111, 111)" &&
			descStyle.fontSize === "18px" &&
			descStyle.marginTop === "32px",
	);
	check(
		"description fade-rise-delay 0.2s",
		descStyle.animationName === "fade-rise" &&
			descStyle.animationDelay === "0.2s",
	);

	const heroCta = page.locator("section button", { hasText: "Begin Journey" });
	const heroCtaStyle = await heroCta.evaluate((el) => {
		const cs = getComputedStyle(el);
		return {
			bg: cs.backgroundColor,
			color: cs.color,
			radius: cs.borderRadius,
			pad: `${cs.paddingLeft}/${cs.paddingTop}`,
			fontSize: cs.fontSize,
			marginTop: cs.marginTop,
			animationName: cs.animationName,
			animationDelay: cs.animationDelay,
		};
	});
	check(
		"hero CTA black/white rounded-full px-14 py-5 text-base mt-12",
		heroCtaStyle.bg === "rgb(0, 0, 0)" &&
			heroCtaStyle.color === "rgb(255, 255, 255)" &&
			parseFloat(heroCtaStyle.radius) > 1000 &&
			heroCtaStyle.pad === "56px/20px" &&
			heroCtaStyle.fontSize === "16px" &&
			heroCtaStyle.marginTop === "48px",
		JSON.stringify(heroCtaStyle),
	);
	check(
		"hero CTA fade-rise-delay-2 0.4s",
		heroCtaStyle.animationName === "fade-rise" &&
			heroCtaStyle.animationDelay === "0.4s",
	);

	const sectionPad = await page.locator("section").evaluate((el) => {
		const cs = getComputedStyle(el);
		return { top: cs.paddingTop, bottom: cs.paddingBottom };
	});
	check(
		"hero paddingTop calc(8rem - 75px) = 53px",
		sectionPad.top === "53px",
		sectionPad.top,
	);
	check("hero pb-40 (160px)", sectionPad.bottom === "160px", sectionPad.bottom);

	// Hover scale 1.03 on hero CTA (Tailwind v4 scale-* uses the CSS `scale` property)
	await heroCta.hover();
	await page.waitForTimeout(400);
	const hoverScale = await heroCta.evaluate((el) => getComputedStyle(el).scale);
	check(
		"hero CTA hover scale 1.03",
		Math.abs(parseFloat(hoverScale) - 1.03) < 0.001,
		`scale=${hoverScale}`,
	);

	console.log("\n— Layout structure —");
	const container = await page.locator("#root > div").evaluate((el) => {
		const cs = getComputedStyle(el);
		return {
			position: cs.position,
			overflow: cs.overflow,
			minHeight: cs.minHeight,
			bg: cs.backgroundColor,
		};
	});
	check(
		"container relative/overflow-hidden/min-h-screen/white",
		container.position === "relative" &&
			container.overflow === "hidden" &&
			parseFloat(container.minHeight) >= 900 &&
			container.bg === "rgb(255, 255, 255)",
		JSON.stringify(container),
	);
	const zLayers = await page.evaluate(() => ({
		videoLayer: getComputedStyle(document.querySelector("video").parentElement)
			.zIndex,
		header: getComputedStyle(document.querySelector("header")).zIndex,
		hero: getComputedStyle(document.querySelector("section")).zIndex,
	}));
	check(
		"z-index layering video=0, nav=10, hero=10",
		zLayers.videoLayer === "0" &&
			zLayers.header === "10" &&
			zLayers.hero === "10",
		JSON.stringify(zLayers),
	);

	const overlay = await page.evaluate(() => {
		const el = document.querySelector("video").nextElementSibling;
		const cs = getComputedStyle(el);
		return { inset: cs.inset, backgroundImage: cs.backgroundImage };
	});
	check(
		"gradient overlay inset-0 white→transparent→white",
		overlay.inset === "0px" &&
			overlay.backgroundImage.includes("linear-gradient") &&
			overlay.backgroundImage.includes("rgb(255, 255, 255)"),
		overlay.backgroundImage.slice(0, 80),
	);

	console.log("\n— Video background & manual fade loop —");
	const video = page.locator("video");
	const videoBox = await video.evaluate((el) => {
		const cs = getComputedStyle(el);
		return {
			position: cs.position,
			top: cs.top,
			bottom: cs.bottom,
			left: cs.left,
			right: cs.right,
			objectFit: cs.objectFit,
			muted: el.muted,
			hasLoopAttr: el.hasAttribute("loop"),
			playsInline: el.playsInline,
		};
	});
	check(
		"video top:300px with inset auto 0 0 0",
		videoBox.top === "300px" &&
			videoBox.bottom === "0px" &&
			videoBox.left === "0px" &&
			videoBox.right === "0px",
		`top=${videoBox.top} bottom=${videoBox.bottom}`,
	);
	check(
		"video object-cover, muted, playsInline, no native loop",
		videoBox.objectFit === "cover" &&
			videoBox.muted &&
			videoBox.playsInline &&
			!videoBox.hasLoopAttr,
	);

	// Wait for playback to begin, then confirm the rAF fade-in reaches 1.
	await page.waitForFunction(
		() => {
			const v = document.querySelector("video");
			return (
				v &&
				v.currentTime > 0.05 &&
				Number.isFinite(v.duration) &&
				v.duration > 0
			);
		},
		{ timeout: 30000 },
	);
	const duration = await video.evaluate((el) => el.duration);
	check(
		"video streaming & playing",
		duration > 1,
		`duration=${duration.toFixed(2)}s`,
	);

	await page.waitForFunction(
		() => {
			const v = document.querySelector("video");
			return v.currentTime > 0.6 && parseFloat(v.style.opacity) === 1;
		},
		{ timeout: 15000 },
	);
	check("fade-in completes to opacity 1 after 0.5s", true);

	// Seek into the fade-out window and confirm opacity drops below 1.
	await video.evaluate((el) => {
		el.currentTime = el.duration - 0.25;
	});
	await page.waitForFunction(
		() => {
			const v = document.querySelector("video");
			const o = parseFloat(v.style.opacity);
			return o < 0.8;
		},
		{ timeout: 5000 },
	);
	check("fade-out engages in final 0.5s window", true);

	// Let it end naturally: opacity snaps to 0, then ~100ms later it rewinds and replays.
	await page.waitForFunction(() => document.querySelector("video").ended, {
		timeout: 5000,
	});
	const opacityAtEnd = await video.evaluate((el) => el.style.opacity);
	check(
		"opacity is 0 at ended",
		parseFloat(opacityAtEnd) === 0,
		`opacity=${opacityAtEnd}`,
	);

	await page.waitForFunction(
		() => {
			const v = document.querySelector("video");
			return !v.ended && !v.paused && v.currentTime < 2;
		},
		{ timeout: 5000 },
	);
	check("manual loop restarts playback after ~100ms", true);
	await page.waitForFunction(
		() => {
			const v = document.querySelector("video");
			return v.currentTime > 0.6 && parseFloat(v.style.opacity) === 1;
		},
		{ timeout: 15000 },
	);
	check("second pass fades back in to 1", true);

	console.log("\n— Dark mode —");
	mkdirSync("screenshots", { recursive: true });
	const toggle = page.locator("[data-theme-toggle]");
	check("theme toggle present in navbar", (await toggle.count()) === 1);

	const isDark = () =>
		page.evaluate(() => document.documentElement.classList.contains("dark"));
	const containerBg = () =>
		page
			.locator("#root > div")
			.evaluate((el) => getComputedStyle(el).backgroundColor);
	const logoColor = () =>
		page
			.locator("header a", { hasText: "Aethera" })
			.first()
			.evaluate((el) => getComputedStyle(el).color);

	check("starts in light mode", (await isDark()) === false);
	check(
		"light container bg #ffffff",
		(await containerBg()) === "rgb(255, 255, 255)",
		await containerBg(),
	);

	await page.screenshot({ path: "screenshots/desktop-1440.png", fullPage: false });

	// Toggle -> dark, wait out the 0.5s palette transition, then assert.
	await toggle.click();
	await page.waitForTimeout(650);
	check("toggle adds .dark to <html>", (await isDark()) === true);
	check(
		"dark container bg #0a0a0b",
		(await containerBg()) === "rgb(10, 10, 11)",
		await containerBg(),
	);
	check(
		"dark logo ink #f5f5f4",
		(await logoColor()) === "rgb(245, 245, 244)",
		await logoColor(),
	);
	const storedDark = await page.evaluate(() =>
		localStorage.getItem("aethera-theme"),
	);
	check("preference persisted as 'dark'", storedDark === "dark", storedDark);
	await page.screenshot({ path: "screenshots/dark-1440.png", fullPage: false });

	// Toggle back -> light, preference flips.
	await toggle.click();
	await page.waitForTimeout(650);
	check("toggle removes .dark from <html>", (await isDark()) === false);
	check(
		"light container bg restored",
		(await containerBg()) === "rgb(255, 255, 255)",
		await containerBg(),
	);
	const storedLight = await page.evaluate(() =>
		localStorage.getItem("aethera-theme"),
	);
	check("preference persisted as 'light'", storedLight === "light", storedLight);

	console.log("\n— Responsive & console health —");

	await page.setViewportSize({ width: 390, height: 844 });
	await page.waitForTimeout(300);
	const mobileH1 = await h1.evaluate((el) => getComputedStyle(el).fontSize);
	check("headline text-5xl on mobile (48px)", mobileH1 === "48px", mobileH1);
	const menuHidden = await page
		.locator("header nav ul")
		.evaluate((el) => getComputedStyle(el).display);
	check(
		"menu collapses on mobile",
		menuHidden === "none",
		`display=${menuHidden}`,
	);
	const noHorizScroll = await page.evaluate(
		() => document.documentElement.scrollWidth <= window.innerWidth,
	);
	check("no horizontal overflow at 390px", noHorizScroll);
	await page.screenshot({
		path: "screenshots/mobile-390.png",
		fullPage: false,
	});

	check(
		"no console/page errors",
		consoleErrors.length === 0,
		consoleErrors.join(" | ") || "clean",
	);

	await browser.close();
} finally {
	server.kill("SIGTERM");
}

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed === 0 ? 0 : 1);
