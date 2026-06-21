/* Headless CLI verification for the shape-landing-hero experiment.
 *
 * Boots `vite preview` against the production build, then asserts every
 * requirement the prompt describes for the integrated `HeroGeometric`
 * component: the shadcn import path resolves, the demo props are applied,
 * the five animated geometric shapes render, the gradient headline + badge
 * are present, the layout is responsive, and nothing errors in the console.
 */
import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

const PORT = 4181;
const URL_BASE = `http://localhost:${PORT}/`;

let failures = 0;
function check(name, ok, detail = "") {
	const status = ok ? "PASS" : "FAIL";
	if (!ok) failures += 1;
	console.log(`[${status}] ${name}${detail ? ` — ${detail}` : ""}`);
}

const preview = spawn(
	"npx",
	["vite", "preview", "--port", String(PORT), "--strictPort"],
	{ stdio: "pipe" },
);

await new Promise((resolve, reject) => {
	const timer = setTimeout(
		() => reject(new Error("preview server timed out")),
		20000,
	);
	preview.stdout.on("data", (d) => {
		if (d.toString().includes("localhost")) {
			clearTimeout(timer);
			resolve();
		}
	});
	preview.on("exit", () => reject(new Error("preview server exited early")));
});

const browser = await chromium.launch();
try {
	const page = await browser.newPage({
		viewport: { width: 1440, height: 900 },
	});
	const consoleErrors = [];
	page.on("console", (msg) => {
		if (msg.type() === "error") consoleErrors.push(msg.text());
	});
	page.on("pageerror", (err) => consoleErrors.push(String(err)));

	await page.goto(URL_BASE, { waitUntil: "networkidle" });
	await page.waitForTimeout(2600); // let the 2.4s shape entrance settle

	check("page title", (await page.title()).includes("Kokonut UI"));

	// ---- The integrated HeroGeometric component (demo.tsx props) ----
	const hero = page.locator("#top");
	check("hero section present", (await hero.count()) === 1);

	const heroBg = await hero
		.locator("div.bg-\\[\\#030303\\]")
		.first()
		.evaluate((el) => getComputedStyle(el).backgroundColor)
		.catch(() => "");
	check(
		"hero canvas is #030303",
		heroBg === "rgb(3, 3, 3)",
		heroBg || "not found",
	);

	// Badge text from demo props
	check(
		'badge prop renders "Kokonut UI"',
		(await hero.getByText("Kokonut UI", { exact: true }).count()) >= 1,
	);
	// Rose-filled lucide Circle inside the badge
	check(
		"badge has rose-filled lucide Circle icon",
		(await hero.locator("svg.lucide-circle").count()) >= 1,
	);

	// Headline from demo props: title1 + title2 (two <span> lines split by a <br>)
	const h1 = hero.locator("h1");
	check("headline h1 present", (await h1.count()) === 1);
	const line1 = (await h1.locator("span").first().textContent())?.trim();
	const line2 = (await h1.locator("span").last().textContent())?.trim();
	check('title1 line = "Elevate Your"', line1 === "Elevate Your", line1);
	check('title2 line = "Digital Vision"', line2 === "Digital Vision", line2);

	// The second line is gradient text (bg-clip-text => transparent fill + gradient bg)
	const gradientSpan = h1.locator("span").last();
	const gradStyles = await gradientSpan.evaluate((el) => {
		const s = getComputedStyle(el);
		return {
			clip: s.webkitBackgroundClip || s.backgroundClip,
			color: s.color,
			bgImage: s.backgroundImage,
		};
	});
	check(
		"title2 uses gradient clip-text",
		gradStyles.clip === "text" &&
			gradStyles.color === "rgba(0, 0, 0, 0)" &&
			gradStyles.bgImage.startsWith("linear-gradient("),
		`${gradStyles.clip} / ${gradStyles.bgImage.slice(0, 48)}…`,
	);

	// Headline scales to 8xl (96px) at the lg/desktop viewport
	const h1Size = await h1
		.first()
		.evaluate((el) => getComputedStyle(el).fontSize);
	check("headline 96px (text-8xl) on desktop", h1Size === "96px", h1Size);

	// Subheadline copy baked into the component
	check(
		"component subheadline present",
		(await hero
			.getByText(/Crafting exceptional digital experiences/i)
			.count()) === 1,
	);

	// ---- Five animated ElegantShape elements ----
	// Each shape's inner div carries `rounded-full` + `backdrop-blur-[2px]`.
	const shapeCount = await hero
		.locator("div.rounded-full.backdrop-blur-\\[2px\\]")
		.count();
	check(
		"five animated geometric shapes rendered",
		shapeCount === 5,
		`${shapeCount}`,
	);

	// Shapes have settled (entrance opacity -> 1) after the wait.
	const firstShapeWrapperOpacity = await hero
		.locator("div.rounded-full.backdrop-blur-\\[2px\\]")
		.first()
		.evaluate((el) => {
			// climb to the animated motion wrapper that controls opacity
			let node = el;
			for (let i = 0; i < 3 && node.parentElement; i++)
				node = node.parentElement;
			return getComputedStyle(node).opacity;
		});
	check(
		"shape entrance animation settled (opacity ~1)",
		parseFloat(firstShapeWrapperOpacity) > 0.9,
		firstShapeWrapperOpacity,
	);

	// ---- Navbar + CTAs (showcase wrapper) ----
	const header = page.locator("header");
	check("fixed navbar present", (await header.count()) === 1);
	check(
		"brand label in navbar",
		(await header.getByText("Kokonut UI").count()) >= 1,
	);
	check(
		"hero CTA: Start building",
		(await page.getByRole("button", { name: /Start building/ }).count()) === 1,
	);
	check(
		"hero CTA: Watch the reel",
		(await page.getByRole("button", { name: /Watch the reel/ }).count()) === 1,
	);

	// ---- Interactive playground reflects props live ----
	const playground = page.locator("#playground");
	check("playground section present", (await playground.count()) === 1);
	const badgeInput = playground.locator("input").first();
	await badgeInput.fill("Fable 5");
	await page.waitForTimeout(400);
	check(
		"editing badge updates generated code",
		(await playground.getByText(/badge="Fable 5"/).count()) === 1,
	);
	// The live preview re-renders the component with the new badge.
	check(
		"live preview shows updated badge",
		(await playground.getByText("Fable 5", { exact: true }).count()) >= 1,
	);

	// ---- Other sections ----
	check(
		"features section present",
		(await page.locator("#features").count()) === 1,
	);
	check(
		"docs/install section present",
		(await page.locator("#docs").count()) === 1,
	);
	check(
		"install command lists framer-motion + lucide-react",
		(await page.getByText(/npm install framer-motion lucide-react/).count()) ===
			1,
	);

	// ---- Fonts loaded ----
	const fontsLoaded = await page.evaluate(async () => {
		await document.fonts.ready;
		return document.fonts.check("16px 'Inter'");
	});
	check("Inter font loaded", fontsLoaded);

	check(
		"no console errors",
		consoleErrors.length === 0,
		consoleErrors.join(" | ").slice(0, 300),
	);

	// ---- Responsive: mobile headline shrinks ----
	const mobile = await browser.newPage({
		viewport: { width: 390, height: 844 },
	});
	await mobile.goto(URL_BASE, { waitUntil: "networkidle" });
	await mobile.waitForTimeout(2600);
	const mobileH1Size = await mobile
		.locator("h1")
		.first()
		.evaluate((el) => getComputedStyle(el).fontSize);
	check(
		"headline shrinks to 36px (text-4xl) on mobile",
		mobileH1Size === "36px",
		mobileH1Size,
	);

	// ---- Screenshots (desktop + mobile) ----
	mkdirSync("screenshots", { recursive: true });
	await page.screenshot({ path: "screenshots/desktop.png", fullPage: false });
	await mobile.screenshot({ path: "screenshots/mobile.png", fullPage: false });
	console.log(
		"[INFO] screenshots saved to screenshots/desktop.png and screenshots/mobile.png",
	);
} finally {
	await browser.close();
	preview.kill();
}

console.log(
	failures === 0 ? "\nALL CHECKS PASSED" : `\n${failures} CHECK(S) FAILED`,
);
process.exit(failures === 0 ? 0 : 1);
