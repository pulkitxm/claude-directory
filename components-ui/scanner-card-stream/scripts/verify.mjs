/* Headless CLI verification for Scanner Card Stream.
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
await page.waitForTimeout(1500);

check("page title", (await page.title()) === "Scanner Card Stream", await page.title());

// Two canvases (three.js particle field + 2d scanner sparks)
check("two canvases present", (await page.locator("canvas").count()) === 2);

// Cards rendered: 5 images * repeat(6) = 30 wrappers
const wrappers = await page.locator(".card-wrapper").count();
check("30 card wrappers", wrappers === 30, String(wrappers));

// Card images load locally and have non-zero natural size
const imgOk = await page.evaluate(() => {
	const imgs = [...document.querySelectorAll(".card-normal img")];
	return (
		imgs.length > 0 &&
		imgs.every(
			(i) => i.getAttribute("src").startsWith("/assets/cards/") && i.naturalWidth > 0,
		)
	);
});
check("card images vendored & loaded", imgOk);

// Controls + speed gauge rendered (App enables both)
check("control buttons present", (await page.locator("main > div button").count()) >= 3);
check("speed gauge shows scan rate", (await page.getByText("scan rate").count()) === 1);

// Stream actually moves: translateX changes over time
const t1 = await page.locator(".card-wrapper").first().evaluate((el) => el.parentElement.style.transform);
await page.waitForTimeout(700);
const t2 = await page.locator(".card-wrapper").first().evaluate((el) => el.parentElement.style.transform);
check("card stream animates", t1 !== t2, `${t1} -> ${t2}`);

// Pause button stops the stream
await page.locator("main > div button").first().click();
await page.waitForTimeout(120);
const p1 = await page.locator(".card-wrapper").first().evaluate((el) => el.parentElement.style.transform);
await page.waitForTimeout(500);
const p2 = await page.locator(".card-wrapper").first().evaluate((el) => el.parentElement.style.transform);
check("pause halts the stream", p1 === p2, `${p1} == ${p2}`);

check("no console/page errors", consoleErrors.length === 0, consoleErrors.join(" | "));

await browser.close();
console.log(failures === 0 ? "\nALL CHECKS PASSED" : `\n${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
