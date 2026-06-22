import { chromium } from "playwright";
const b = await chromium.launch({ ignoreHTTPSErrors: true });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, ignoreHTTPSErrors: true });
const r = {};
// HOME: account dropdown + sidebar collapse
await p.goto("http://localhost:8753/index.html", { waitUntil: "networkidle" });
await p.waitForTimeout(600);
// account
await p.locator('button:has-text("Account")').first().click();
await p.waitForTimeout(300);
r.accountMenuVisible = await p.locator('[role="menu"] >> text=Sign out').isVisible().catch(()=>false);
await p.keyboard.press("Escape");
// sidebar collapse
const group = p.locator('.group').first();
const before = await group.getAttribute('data-sidebar-collapsed');
await p.locator('nav[aria-label="Course"] button').first().click();
await p.waitForTimeout(300);
const after = await group.getAttribute('data-sidebar-collapsed');
r.sidebarToggles = (before === null && after === "");
r.asideHiddenAfterCollapse = await p.locator('aside').first().isHidden().catch(()=>false);

// ARTICLE: TOC scroll-spy + video present
await p.goto("http://localhost:8753/landscape-of-choice.html", { waitUntil: "networkidle" });
await p.waitForTimeout(600);
r.videoPresent = await p.locator('#video').count() > 0;
await p.evaluate(()=>window.scrollTo(0, 1800));
await p.waitForTimeout(700);
r.tocHasCurrent = await p.evaluate(()=> !!document.querySelector('nav a[aria-current="location"]'));
console.log(JSON.stringify(r, null, 1));
await b.close();
