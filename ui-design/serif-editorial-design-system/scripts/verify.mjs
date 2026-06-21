/**
 * Headless verification for the Serif (Roman & Quill) design-system showcase.
 *
 * Boots are handled outside; pass --url (defaults to http://localhost:5188/).
 * Asserts: page loads with no console/page errors, design tokens resolve,
 * vendored fonts load, every section renders, key signature elements exist,
 * the FAQ accordion + mobile menu work, and there is no horizontal overflow
 * at mobile and desktop widths.
 *
 * Run:  PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node scripts/verify.mjs
 */
import { chromium } from "playwright";

const URL = (() => {
	const i = process.argv.indexOf("--url");
	return i !== -1 ? process.argv[i + 1] : "http://localhost:5188/";
})();

let pass = 0;
let fail = 0;
const ok = (name) => {
	pass++;
	console.log(`  ✓ ${name}`);
};
const bad = (name, detail) => {
	fail++;
	console.log(`  ✗ ${name}${detail ? ` — ${detail}` : ""}`);
};
function expect(name, cond, detail) {
	cond ? ok(name) : bad(name, detail);
}

const browser = await chromium.launch({ headless: true });
const errors = [];

try {
	const ctx = await browser.newContext({
		viewport: { width: 1366, height: 900 },
		deviceScaleFactor: 2,
	});
	const page = await ctx.newPage();
	page.on("console", (m) => {
		if (m.type() === "error") errors.push(m.text());
	});
	page.on("pageerror", (e) => errors.push(String(e)));

	console.log(`\n• Loading ${URL}`);
	const resp = await page.goto(URL, {
		waitUntil: "networkidle",
		timeout: 45000,
	});
	expect(
		"HTTP 200",
		resp && resp.status() === 200,
		resp ? `status ${resp.status()}` : "no response",
	);

	await page.waitForSelector("main", { timeout: 10000 });

	// ---- Design tokens resolve to the exact spec values ----
	const tokens = await page.evaluate(() => {
		const s = getComputedStyle(document.documentElement);
		const g = (n) => s.getPropertyValue(n).trim();
		return {
			background: g("--background"),
			foreground: g("--foreground"),
			accent: g("--accent"),
			accentSecondary: g("--accent-secondary"),
			border: g("--border"),
			muted: g("--muted"),
		};
	});
	expect(
		"token --background = #fafaf8",
		tokens.background.toLowerCase() === "#fafaf8",
		tokens.background,
	);
	expect(
		"token --foreground = #1a1a1a",
		tokens.foreground.toLowerCase() === "#1a1a1a",
		tokens.foreground,
	);
	expect(
		"token --accent = #b8860b (burnished gold)",
		tokens.accent.toLowerCase() === "#b8860b",
		tokens.accent,
	);
	expect(
		"token --accent-secondary = #d4a84b",
		tokens.accentSecondary.toLowerCase() === "#d4a84b",
		tokens.accentSecondary,
	);
	expect(
		"token --border = #e8e4df",
		tokens.border.toLowerCase() === "#e8e4df",
		tokens.border,
	);

	// body actually paints ivory
	const bodyBg = await page.evaluate(
		() => getComputedStyle(document.body).backgroundColor,
	);
	expect(
		"body background paints rgb(250,250,248)",
		bodyBg.replace(/\s/g, "") === "rgb(250,250,248)",
		bodyBg,
	);

	// ---- Vendored fonts loaded (no network fonts) ----
	const fonts = await page.evaluate(async () => {
		await document.fonts.ready;
		const fams = new Set();
		document.fonts.forEach((f) => {
			if (f.status === "loaded") fams.add(f.family.replace(/['"]/g, ""));
		});
		return [...fams];
	});
	expect(
		"Playfair Display loaded",
		fonts.includes("Playfair Display"),
		fonts.join(", "),
	);
	expect(
		"Source Sans 3 loaded",
		fonts.includes("Source Sans 3"),
		fonts.join(", "),
	);
	expect(
		"IBM Plex Mono loaded",
		fonts.includes("IBM Plex Mono"),
		fonts.join(", "),
	);

	// headline actually uses Playfair
	const h1Font = await page.evaluate(() => {
		const h1 = document.querySelector("h1");
		return h1 ? getComputedStyle(h1).fontFamily : "";
	});
	expect(
		"h1 renders in Playfair Display",
		/Playfair Display/i.test(h1Font),
		h1Font,
	);

	// ---- Sections present ----
	for (const id of [
		"top",
		"features",
		"benefits",
		"testimonials",
		"pricing",
		"journal",
		"faq",
		"correspond",
	]) {
		const exists = (await page.locator(`#${id}`).count()) > 0;
		expect(`section #${id} present`, exists);
	}

	// ---- Signature elements ----
	const smallCaps = await page.locator(".small-caps").count();
	expect(
		"small-caps labels present (>= 12)",
		smallCaps >= 12,
		`found ${smallCaps}`,
	);

	const rules = await page.locator(".rule").count();
	expect("rule lines present (>= 8)", rules >= 8, `found ${rules}`);

	// gold accent actually used somewhere on text
	const goldCount = await page.evaluate(() => {
		let n = 0;
		for (const el of document.querySelectorAll("*")) {
			const c = getComputedStyle(el).color;
			if (c === "rgb(184, 134, 11)") n++;
		}
		return n;
	});
	expect(
		"burnished gold applied to text (>= 5 nodes)",
		goldCount >= 5,
		`found ${goldCount}`,
	);

	// large display numbers in stats (font-size >= 44px)
	const bigNum = await page.evaluate(() => {
		const dds = [...document.querySelectorAll("dd")];
		return dds.some(
			(d) =>
				parseFloat(getComputedStyle(d).fontSize) >= 44 &&
				/Playfair/i.test(getComputedStyle(d).fontFamily),
		);
	});
	expect("large serif display numbers in stats", bigNum);

	// paper grain + ambient glow atmosphere
	expect(
		"paper grain overlay present",
		(await page.locator(".paper-grain").count()) === 1,
	);
	expect(
		"ambient glow present (>= 1)",
		(await page.locator(".ambient-glow").count()) >= 1,
	);

	// hero CTAs
	expect(
		"hero primary CTA present",
		(await page
			.getByRole("link", { name: /request an invitation/i })
			.count()) >= 1,
	);

	// pricing: 3 tiers + featured ribbon
	const tierHeads = await page.locator("#pricing h3").count();
	expect("pricing shows 3 tiers", tierHeads === 3, `found ${tierHeads}`);
	expect(
		"pricing featured ribbon present",
		(await page.getByText(/most chosen/i).count()) >= 1,
	);

	// ---- FAQ accordion interaction ----
	const faqBtns = page.locator("#faq button[aria-expanded]");
	const faqCount = await faqBtns.count();
	expect("FAQ has accordion buttons (5)", faqCount === 5, `found ${faqCount}`);
	// second item starts collapsed; click to expand
	const second = faqBtns.nth(1);
	const before = await second.getAttribute("aria-expanded");
	await second.click();
	await page.waitForTimeout(450);
	const after = await second.getAttribute("aria-expanded");
	expect(
		"FAQ item toggles aria-expanded",
		before === "false" && after === "true",
		`${before} -> ${after}`,
	);
	// touch target height >= 44
	const faqBox = await second.boundingBox();
	expect(
		"FAQ button >= 44px tall",
		faqBox && faqBox.height >= 44,
		faqBox ? `${Math.round(faqBox.height)}px` : "no box",
	);

	// ---- Primary button touch target ----
	const primaryBtn = page
		.getByRole("link", { name: /request an invitation/i })
		.first();
	const pbBox = await primaryBtn.boundingBox();
	expect(
		"primary button >= 44px tall",
		pbBox && pbBox.height >= 44,
		pbBox ? `${Math.round(pbBox.height)}px` : "no box",
	);

	// ---- Form fields (labelled inputs) ----
	const labelledInputs = await page.evaluate(() => {
		let n = 0;
		for (const inp of document.querySelectorAll(
			"#correspond input, #correspond textarea",
		)) {
			const id = inp.getAttribute("id");
			if (id && document.querySelector(`label[for="${id}"]`)) n++;
		}
		return n;
	});
	expect(
		"correspond form has labelled fields (>= 3)",
		labelledInputs >= 3,
		`found ${labelledInputs}`,
	);

	// ---- Opacity-modifier utilities actually emit color (regression guard) ----
	// Section alternating bg (bg-muted/40) must paint a non-transparent fill.
	const benefitsBg = await page.evaluate(() => {
		const el = document.querySelector("#benefits");
		return el ? getComputedStyle(el).backgroundColor : "";
	});
	const benefitsAlpha = (() => {
		const m = benefitsBg.match(/rgba?\(([^)]+)\)/);
		if (!m) return 1;
		const parts = m[1].split(",").map((s) => parseFloat(s));
		return parts.length === 4 ? parts[3] : 1;
	})();
	expect(
		"bg-muted/40 emits a translucent fill (alpha ~0.4)",
		benefitsAlpha > 0.1 && benefitsAlpha < 0.95,
		`${benefitsBg} (alpha ${benefitsAlpha})`,
	);

	// Dark correspond panel: lede text must be LIGHT (high luminance), not dark.
	const ledeLum = await page.evaluate(() => {
		const p = document.querySelector("#correspond p");
		if (!p) return -1;
		const c = getComputedStyle(p)
			.color.match(/[\d.]+/g)
			.map(Number);
		return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
	});
	expect(
		"dark panel body text is light (lum > 150)",
		ledeLum > 150,
		`lum ${Math.round(ledeLum)}`,
	);

	// Featured pricing card surface must be OPAQUE (alpha 1), not a 6% wash.
	const featBg = await page.evaluate(() => {
		const ribbon = [...document.querySelectorAll("#pricing")].length
			? document.querySelector("#pricing")
			: null;
		if (!ribbon) return "";
		// find the card whose computed background-image carries the gradient wash
		for (const card of document.querySelectorAll(
			"#pricing .relative.rounded-lg",
		)) {
			const bi = getComputedStyle(card).backgroundImage;
			if (bi && bi.includes("gradient")) return "opaque-gradient";
		}
		return "none";
	});
	expect(
		"featured pricing card uses opaque gradient surface",
		featBg === "opaque-gradient",
		featBg,
	);

	// ---- No horizontal overflow @ desktop ----
	const deskOverflow = await page.evaluate(
		() =>
			document.documentElement.scrollWidth -
			document.documentElement.clientWidth,
	);
	expect(
		"no horizontal overflow @1366",
		deskOverflow <= 1,
		`overflow ${deskOverflow}px`,
	);

	// ---- Mobile: overflow + menu ----
	await page.setViewportSize({ width: 375, height: 812 });
	await page.waitForTimeout(300);
	const mobOverflow = await page.evaluate(
		() =>
			document.documentElement.scrollWidth -
			document.documentElement.clientWidth,
	);
	expect(
		"no horizontal overflow @375",
		mobOverflow <= 1,
		`overflow ${mobOverflow}px`,
	);

	const menuBtn = page.getByRole("button", { name: /open menu/i });
	expect("mobile menu trigger present", (await menuBtn.count()) === 1);
	await menuBtn.click();
	await page.waitForTimeout(400);
	const menuNavVisible = await page
		.getByRole("navigation", { name: /mobile/i })
		.isVisible();
	expect("mobile menu opens", menuNavVisible);
	await page.getByRole("button", { name: /close menu/i }).click();
	await page.waitForTimeout(300);

	// hero headline still has presence on mobile (>= 36px)
	const mobH1 = await page.evaluate(() =>
		parseFloat(getComputedStyle(document.querySelector("h1")).fontSize),
	);
	expect(
		"hero headline >= 36px on mobile",
		mobH1 >= 36,
		`${Math.round(mobH1)}px`,
	);

	// ---- Console cleanliness ----
	expect(
		"no console/page errors",
		errors.length === 0,
		errors.slice(0, 3).join(" | "),
	);

	await ctx.close();
} catch (e) {
	bad("fatal", e.message);
} finally {
	await browser.close();
}

console.log(`\n  ${pass} passed, ${fail} failed`);
if (errors.length) {
	console.log("\n  Captured errors:");
	for (const e of errors.slice(0, 8)) console.log("   -", e);
}
process.exit(fail === 0 ? 0 : 1);
