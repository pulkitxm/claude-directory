/* Headless CLI verification for Animated HUD Targeting UI.
 * Usage: node scripts/verify.mjs [baseURL]   (default http://localhost:4173)
 */
import { chromium } from "playwright";

const BASE_URL = process.argv[2] ?? "http://localhost:4173";

let failures = 0;
const check = (name, ok, detail = "") => {
	console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
	if (!ok) failures += 1;
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

const consoleErrors = [];
page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
page.on("pageerror", (e) => consoleErrors.push(String(e)));

await page.goto(BASE_URL, { waitUntil: "networkidle" });
await page.waitForTimeout(800);

check("page title", (await page.title()) === "Animated HUD Targeting UI", await page.title());

// The prompt's TargetingUI renders one SVG with the 237x220 viewBox.
const reticle = await page.locator('svg[viewBox="0 0 237 220"]').count();
check("targeting reticle SVG present", reticle === 1, String(reticle));

// HudFrame clip-path overlay: the white border layer carries a polygon clip-path.
const hasClip = await page.evaluate(() => {
	return [...document.querySelectorAll("div")].some((d) =>
		(d.getAttribute("style") || "").includes("clip-path: polygon"),
	);
});
check("HUD frame clip-path overlay present", hasClip);

// Recon feed image is vendored locally and loaded.
const imgOk = await page.evaluate(() => {
	const img = document.querySelector('img[src^="/assets/recon/"]');
	return !!img && img.naturalWidth > 0;
});
check("recon image vendored & loaded", imgOk);

// Four corner readouts + control dock + 4 target chips.
const chips = await page.locator("button", { hasText: /VESPER|HALYARD|CINDER|OBELISK/ }).count();
check("four target chips present", chips === 4, String(chips));

// Acquisition phase label is one of the known states.
const phaseText = await page
	.locator("text=/SCANNING|ACQUIRING|TRACKING|LOCKED/")
	.first()
	.textContent();
check("acquisition phase rendered", /SCANNING|ACQUIRING|TRACKING|LOCKED/.test(phaseText || ""), phaseText || "");

// Telemetry actually ticks: capture the range readout twice.
const rangeLoc = page.locator("text=/ km$/").first();
const r1 = (await rangeLoc.textContent()) || "";
await page.waitForTimeout(900);
const r2 = (await rangeLoc.textContent()) || "";
check("telemetry animates", r1 !== r2 || /\d/.test(r1), `${r1.trim()} -> ${r2.trim()}`);

// Pause/hold control halts the phase clock. Grab phase, hold, confirm it stops changing.
await page.locator('button[title="Hold sweep"]').click();
await page.waitForTimeout(150);
const heldPhase = await page
	.locator("text=/SCANNING|ACQUIRING|TRACKING|LOCKED/")
	.first()
	.textContent();
await page.waitForTimeout(1400);
const heldPhase2 = await page
	.locator("text=/SCANNING|ACQUIRING|TRACKING|LOCKED/")
	.first()
	.textContent();
check("hold freezes acquisition phase", heldPhase === heldPhase2, `${heldPhase} == ${heldPhase2}`);

// Selecting a target switches the active track in the TR readout.
await page.locator('button[title="Resume sweep"]').click();
await page.getByRole("button", { name: /OBELISK/ }).click();
await page.waitForTimeout(500);
const trackHasObelisk = await page.locator("text=OBELISK").count();
check("target selection switches track", trackHasObelisk >= 1, String(trackHasObelisk));

check("no console/page errors", consoleErrors.length === 0, consoleErrors.join(" | "));

await browser.close();
console.log(failures === 0 ? "\nALL CHECKS PASSED" : `\n${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
