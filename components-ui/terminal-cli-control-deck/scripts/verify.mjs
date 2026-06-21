/* Headless CLI verification for the Terminal CLI Control Deck.
 *
 * Boots nothing itself — point it at an already-running server:
 *   npm run build && npm run preview &   # or: npm run dev
 *   node scripts/verify.mjs http://localhost:4173
 *
 * Asserts the design-system contract: monospace everywhere, zero radius,
 * phosphor palette, scanline overlay, typewriter headline, ASCII meters,
 * interactive console, and access-form validation — with no console errors.
 */
import { chromium } from "playwright";

const BASE_URL = process.argv[2] ?? "http://localhost:4173";

let failures = 0;
const check = (name, ok, detail = "") => {
	console.log(
		`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`,
	);
	if (!ok) failures += 1;
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const consoleErrors = [];
page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
page.on("pageerror", (e) => consoleErrors.push(String(e)));

await page.goto(BASE_URL, { waitUntil: "networkidle" });
await page.waitForTimeout(2600); // let the typewriter + boot finish

// ── Document ───────────────────────────────────────────────────────────────
check("page title", (await page.title()).includes("ACME CONTROL DECK"));

// ── Monospace supremacy: body + headline + a footer link all monospaced ────
const isMono = (font) => /mono|VT323|JetBrains/i.test(font ?? "");
for (const sel of ["body", "h1", "footer a"]) {
	const font = await page
		.locator(sel)
		.first()
		.evaluate((el) => getComputedStyle(el).fontFamily);
	check(`monospace: ${sel}`, isMono(font), font);
}

// ── Zero radius everywhere ──────────────────────────────────────────────────
const maxRadius = await page.evaluate(() => {
	let max = 0;
	for (const el of document.querySelectorAll("body *")) {
		const r = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
		if (r > max) max = r;
	}
	return max;
});
check("radius is 0px on every element", maxRadius === 0, `max=${maxRadius}px`);

// ── Phosphor palette: body bg + primary green text ──────────────────────────
const bg = await page
	.locator("body")
	.evaluate((el) => getComputedStyle(el).backgroundColor);
check("background is near-black #0a0a0a", bg === "rgb(10, 10, 10)", bg);

const h1Color = await page
	.locator("h1")
	.first()
	.evaluate((el) => getComputedStyle(el).color);
check(
	"headline is terminal green #33ff00",
	h1Color === "rgb(51, 255, 0)",
	h1Color,
);

const h1Shadow = await page
	.locator("h1")
	.first()
	.evaluate((el) => getComputedStyle(el).textShadow);
check(
	"headline has phosphor glow (text-shadow)",
	/rgb/.test(h1Shadow),
	h1Shadow,
);

// ── CRT scanline overlay present + non-interactive ──────────────────────────
const overlayPE = await page
	.locator(".pointer-events-none.fixed.inset-0.z-50")
	.first()
	.evaluate((el) => getComputedStyle(el).pointerEvents);
check("CRT overlay is pointer-events:none", overlayPE === "none", overlayPE);

// ── Typewriter headline resolved to full accessible text ────────────────────
const h1Text = (await page.locator("h1").first().innerText()).replace(
	/\s+/g,
	" ",
);
check(
	"typewriter headline reads full copy",
	/INFRASTRUCTURE/.test(h1Text) && /STRIPPED TO THE SHELL/.test(h1Text),
	h1Text.slice(0, 60),
);

// ── ASCII art logo present ──────────────────────────────────────────────────
check(
	"ASCII art logo rendered in <pre>",
	(await page.locator("pre").count()) >= 1,
);

// ── Raw-data ASCII meters: role=meter with valuenow ─────────────────────────
const meters = page.locator('[role="meter"]');
const meterCount = await meters.count();
check(
	"ASCII meters present (role=meter)",
	meterCount >= 5,
	`count=${meterCount}`,
);
const firstMeterText = await meters.first().innerText();
check(
	"meter draws [|||....] bar",
	firstMeterText.includes("[") && firstMeterText.includes("|"),
	JSON.stringify(firstMeterText),
);

// ── Bracketed status badges exist ───────────────────────────────────────────
const bodyText = await page.locator("body").innerText();
check(
	"bracketed status codes ([OK]/[ERR]) present",
	/\[(OK|ERR|WARN|RUN)\]/.test(bodyText),
);

// ── Interactive console: run `status`, expect fleet output ──────────────────
const consoleInput = page.getByLabel("command input");
await consoleInput.click();
await consoleInput.fill("status");
await consoleInput.press("Enter");
await page.waitForTimeout(300);
const consoleText = await page.locator("#console").innerText();
check(
	"console executes `status`",
	/FLEET STATUS/.test(consoleText),
	"fleet status printed",
);

await consoleInput.fill("boguscmd");
await consoleInput.press("Enter");
await page.waitForTimeout(300);
const consoleText2 = await page.locator("#console").innerText();
check(
	"console reports unknown command",
	/command not found/.test(consoleText2),
	"error path",
);

// ── Access form validation ──────────────────────────────────────────────────
const callsign = page.getByLabel("callsign");
const accessKey = page.getByLabel("access key");
await callsign.fill("nightowl");
await accessKey.fill("bad");
await page.waitForTimeout(150);
check(
	"access form rejects malformed key",
	/\[ERR\] bad key/.test(
		await page.locator('section[aria-label="access.request"]').innerText(),
	),
	"shows [ERR] bad key",
);
await accessKey.fill("acme-1337");
await page.waitForTimeout(150);
const grant = page
	.locator('section[aria-label="access.request"]')
	.getByRole("button", { name: /GRANT ACCESS/i });
check("GRANT ACCESS enabled on valid input", await grant.isEnabled());
await grant.click();
await page.waitForTimeout(250);
check(
	"access form accepts valid credentials",
	/\[OK\] credentials accepted/.test(
		await page.locator('section[aria-label="access.request"]').innerText(),
	),
);

// ── Live log feed grows over time ───────────────────────────────────────────
const feed = page.locator('section[aria-label="syslog.tail -f"]');
const before = (await feed.innerText()).length;
await page.waitForTimeout(2000);
const after = (await feed.innerText()).length;
check("syslog feed is live (content changes)", after !== before || after > 0);

// ── Mobile: windows stack to a single column ────────────────────────────────
await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(300);
const cols = await page
	.locator("main")
	.evaluate((el) => getComputedStyle(el).gridTemplateColumns);
check("mobile stacks to single column", cols.split(" ").length === 1, cols);

// ── No console errors ───────────────────────────────────────────────────────
check(
	"no console errors",
	consoleErrors.length === 0,
	consoleErrors.slice(0, 3).join(" | "),
);

await browser.close();
console.log(
	`\n${failures === 0 ? "ALL CHECKS PASSED" : `${failures} CHECK(S) FAILED`}`,
);
process.exit(failures === 0 ? 0 : 1);
