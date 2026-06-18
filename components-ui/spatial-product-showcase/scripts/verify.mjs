/* Headless CLI verification for Spatial Product Showcase.
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
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const consoleErrors = [];
page.on(
	"console",
	(msg) => msg.type() === "error" && consoleErrors.push(msg.text()),
);
page.on("pageerror", (err) => consoleErrors.push(String(err)));
const failedRequests = [];
page.on("requestfailed", (req) =>
	failedRequests.push(`${req.url()} (${req.failure()?.errorText})`),
);

await page.goto(BASE_URL, { waitUntil: "networkidle" });
await page.waitForTimeout(1600); // let staggered reveal finish

// ── Title / shell ──────────────────────────────────────────────────────────
check(
	"page title",
	(await page.title()) === "Spatial Product Showcase",
	await page.title(),
);

const rootBg = await page
	.locator("body > #root > div")
	.first()
	.evaluate((el) => getComputedStyle(el).backgroundColor);
check("root is black", rootBg === "rgb(0, 0, 0)", rootBg);

// Brand header
check(
	"brand header present",
	(await page.getByText("Sonar", { exact: false }).count()) >= 1,
);

// ── Default (Left) state ─────────────────────────────────────────────────
check(
	"Left earbud eyebrow visible",
	await page.getByText("Left Earbud", { exact: true }).isVisible(),
);
check(
	"Left title 'Spatial Anchor'",
	await page.getByText("Spatial Anchor", { exact: true }).isVisible(),
);
check(
	"Left description present",
	(await page
		.getByText("binaural synchronization", { exact: false })
		.count()) === 1,
);
for (const f of ["Latency", "Sync Rate"]) {
	check(`Left feature "${f}"`, (await page.getByText(f, { exact: true }).count()) >= 1);
}
check(
	"Left battery 82%",
	(await page.getByText("82% Charge", { exact: true }).count()) === 1,
);

// Image vendored locally + actually loaded (naturalWidth > 0)
const img = page.locator("main img");
const imgInfo = await img.first().evaluate((el) => ({
	src: el.getAttribute("src"),
	natural: el.naturalWidth,
}));
check(
	"earbud image is a local asset",
	imgInfo.src.startsWith("/assets/") && imgInfo.src.endsWith(".png"),
	imgInfo.src,
);
check(
	"earbud image loaded (decoded)",
	imgInfo.natural > 0,
	`naturalWidth=${imgInfo.natural}`,
);

// Switcher exists with two tabs
const tabs = page.getByRole("tab");
check("switcher has 2 tabs", (await tabs.count()) === 2);
check(
	"Left tab selected by default",
	(await page.getByRole("tab", { name: "Left" }).getAttribute("aria-selected")) ===
		"true",
);

// Feature bar animated to a non-zero width
await page.waitForTimeout(800);
const barWidth = await page
	.locator("main .bg-blue-500")
	.last()
	.evaluate((el) => el.getBoundingClientRect().width);
check("Left feature bar filled", barWidth > 4, `width=${barWidth.toFixed(1)}px`);

// ── Switch to Right ──────────────────────────────────────────────────────
await page.getByRole("tab", { name: "Right" }).click();
await page.waitForTimeout(1200);
check(
	"Right title 'Vocal Clarity' visible",
	await page.getByText("Vocal Clarity", { exact: true }).isVisible(),
);
check(
	"Right eyebrow visible",
	await page.getByText("Right Earbud", { exact: true }).isVisible(),
);
for (const f of ["Bitrate", "Clarifier"]) {
	check(`Right feature "${f}"`, (await page.getByText(f, { exact: true }).count()) >= 1);
}
check(
	"Right battery 74%",
	(await page.getByText("74% Charge", { exact: true }).count()) === 1,
);
check(
	"Right tab now selected",
	(await page
		.getByRole("tab", { name: "Right" })
		.getAttribute("aria-selected")) === "true",
);
const rightImg = await page
	.locator("main img")
	.first()
	.evaluate((el) => ({ src: el.getAttribute("src"), natural: el.naturalWidth }));
check(
	"Right image swapped + loaded",
	rightImg.src.includes("right-earbud") && rightImg.natural > 0,
	rightImg.src,
);

// Switch back to Left
await page.getByRole("tab", { name: "Left" }).click();
await page.waitForTimeout(900);
check(
	"switch back to Left works",
	await page.getByText("Spatial Anchor", { exact: true }).isVisible(),
);

// ── Responsive (mobile) ───────────────────────────────────────────────────
await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(500);
check(
	"switcher visible on mobile",
	await page.getByRole("tab", { name: "Right" }).isVisible(),
);
check(
	"content visible on mobile",
	await page.getByText("Spatial Anchor", { exact: true }).isVisible(),
);

// ── Errors ────────────────────────────────────────────────────────────────
check(
	"no console/page errors",
	consoleErrors.length === 0,
	consoleErrors.join(" | ").slice(0, 300),
);
check(
	"no failed network requests",
	failedRequests.length === 0,
	failedRequests.join(" | ").slice(0, 300),
);

await browser.close();
console.log(
	failures === 0 ? "\nALL CHECKS PASSED" : `\n${failures} CHECK(S) FAILED`,
);
process.exit(failures === 0 ? 0 : 1);
