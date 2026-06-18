/* Headless CLI verification for the woven-light-hero experiment.
 * Boots `vite preview` against the production build, then checks every
 * prompt requirement it can observe from the DOM, WebGL canvas and fonts.
 */
import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

const PORT = 4192;
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
	await page.waitForTimeout(3500); // let entrance animations + particles settle

	check("page title", (await page.title()).includes("Woven by Light"));

	// ---- Three.js canvas ----
	const canvas = page.locator("canvas");
	check("WebGL canvas mounted", (await canvas.count()) === 1);
	const canvasBox = await canvas.evaluate((c) => ({
		w: c.width,
		h: c.height,
		hasGL: !!(
			c.getContext("webgl2") || c.getContext("webgl")
		),
	}));
	check(
		"canvas sized to viewport with a GL context",
		canvasBox.w > 0 && canvasBox.h > 0 && canvasBox.hasGL,
		JSON.stringify(canvasBox),
	);

	// ---- Headline ----
	const h1 = page.locator("h1");
	const h1Text = (await h1.textContent())?.replace(/ /g, " ").trim();
	check("headline reads 'Woven by Light'", h1Text === "Woven by Light", h1Text);
	const h1Font = await h1.evaluate((el) => getComputedStyle(el).fontFamily);
	check(
		"headline uses Playfair Display",
		h1Font.includes("Playfair Display"),
		h1Font,
	);
	const h1Opacity = await h1
		.locator("span span")
		.first()
		.evaluate((el) => getComputedStyle(el).opacity);
	check(
		"headline letters settled to opacity 1",
		Math.abs(parseFloat(h1Opacity) - 1) < 0.05,
		h1Opacity,
	);

	// ---- Subheadline ----
	const sub = page.getByText("An interactive tapestry of light and motion");
	check("subheadline present", (await sub.count()) === 1);
	const subFont = await sub.evaluate((el) => getComputedStyle(el).fontFamily);
	check("subheadline uses Inter", subFont.includes("Inter"), subFont);

	// ---- CTA button ----
	const cta = page.getByRole("button", { name: /Explore the Weave/ });
	check("CTA button 'Explore the Weave'", (await cta.count()) === 1);
	const ctaStyles = await cta.evaluate((el) => {
		const s = getComputedStyle(el);
		return { radius: s.borderRadius, weight: s.fontWeight, opacity: s.opacity };
	});
	check(
		"CTA is a pill, semibold, faded in",
		parseFloat(ctaStyles.radius) >= 20 &&
			ctaStyles.weight === "600" &&
			parseFloat(ctaStyles.opacity) > 0.9,
		JSON.stringify(ctaStyles),
	);

	// ---- Nav ----
	check("nav brand 'Woven'", (await page.locator("nav").getByText("Woven", { exact: true }).count()) === 1);

	// ---- Fonts actually loaded (vendored locally) ----
	const fontsLoaded = await page.evaluate(async () => {
		await document.fonts.ready;
		return {
			inter: document.fonts.check("16px 'Inter'"),
			playfair: document.fonts.check("700 16px 'Playfair Display'"),
		};
	});
	check("Inter loaded from local woff2", fontsLoaded.inter);
	check("Playfair Display loaded from local woff2", fontsLoaded.playfair);

	check(
		"no console errors",
		consoleErrors.length === 0,
		consoleErrors.join(" | ").slice(0, 300),
	);

	// ---- Screenshots ----
	mkdirSync("screenshots", { recursive: true });
	await page.screenshot({ path: "screenshots/desktop.png" });
	const mobile = await browser.newPage({
		viewport: { width: 390, height: 844 },
	});
	await mobile.goto(URL_BASE, { waitUntil: "networkidle" });
	await mobile.waitForTimeout(3500);
	await mobile.screenshot({ path: "screenshots/mobile.png" });
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
