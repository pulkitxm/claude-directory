# SENTRA — ENTERPRISE ADMIN / SECURITY SAAS LANDING PAGE

> BUILD A SINGLE-PAGE, SELF-CONTAINED ENTERPRISE ADMIN LANDING PAGE, REPRODUCED SAME-TO-SAME (PIXEL-FAITHFUL) FROM THE REFERENCE SUPERDESIGN DRAFT AT `HTTP://P.SUPERDESIGN.DEV/DRAFT/BDEA8930-43FD-4DFC-8042-3328CCFDC017`. SHIP IT AS PLAIN STATIC HTML + CSS + A SMALL AMOUNT OF VANILLA JS, RUNNABLE OFFLINE WITH ALL FONTS VENDORED LOCALLY. NO BUILD STEP REQUIRED. TAB TITLE: "SENTRA — ENTERPRISE ADMIN PLATFORM".

---

## SUMMARY

A CLEAN, AUTHORITATIVE ENTERPRISE ADMIN LANDING PAGE USING A STRICT GRID LAYOUT, TECHNICAL TYPOGRAPHY (SATOSHI), AND A PROFESSIONAL COLOR SCHEME OF SLATE AND PRIMARY BLUE. FEATURES INCLUDE A DASHBOARD UI PREVIEW, AUDIT LOG TABLES, AND SECURITY POLICY MANAGEMENT COMPONENTS, ALL ENHANCED BY SUBTLE FADEINUP ANIMATIONS AND GLASS-MORPHISM EFFECTS.

## STYLE

THE STYLE IS 'CORPORATE PROFESSIONAL' WITH A FOCUS ON LEGIBILITY AND SCALE. IT USES THE SATOSHI FONT FAMILY (WEIGHTS 400-900) FOR A NEUTRAL BUT MODERN FEEL. THE PALETTE RELIES ON SLATE 950 (#020617) FOR DARK BACKGROUNDS AND BLUE 600 (#2563EB) FOR ACTIONS. MICRO-INTERACTIONS INCLUDE 0.8S EASE-OUT FADES, 12PX BACKDROP BLURS FOR NAV PANELS, AND SCALE TRANSITIONS ON FEATURE CARDS. BORDERS ARE SUBTLE (#E2E8F0) AND LAYOUT FOLLOWS A 40PX GRID SYSTEM.

### SPEC

CREATE A DESIGN WITH A PROFESSIONAL ENTERPRISE AESTHETIC.

- **TYPOGRAPHY**: USE 'SATOSHI' SANS-SERIF. HEADERS SHOULD BE BOLD/EXTRABOLD WITH TIGHT TRACKING (-0.02EM). BODY TEXT IN SLATE 500/600 WITH 1.625 LINE-HEIGHT.
- **COLORS**: PRIMARY: #2563EB, DEEP SLATE: #151E2E, BACKGROUND: #FFFFFF, MUTED BG: #F8FAFC. ACCENTS: SUCCESS (#16A34A), WARNING (#D97706), ERROR (#DC2626).
- **BORDERS & RADIUS**: BORDER-RADIUS 12PX FOR CARDS, 8PX FOR BUTTONS. BORDERS SHOULD BE 1PX SOLID #E2E8F0.
- **EFFECTS**: NAVIGATION USES A 'GLASS-PANEL' EFFECT: BACKGROUND RGBA(255, 255, 255, 0.7) WITH 12PX BACKDROP-FILTER BLUR. HERO BACKGROUND USES A 40PX X 40PX GRAY GRID LINE PATTERN.
- **ANIMATIONS**: IMPLEMENT 'FADEINUP' (0.8S DURATION, 20PX OFFSET) FOR SECTION REVEALS. USE CUBIC-BEZIER(0.4, 0, 0.2, 1) FOR ALL HOVER TRANSITIONS.

## LAYOUT & STRUCTURE

THE LAYOUT FOLLOWS A PREDICTABLE, TOP-DOWN ENTERPRISE NARRATIVE: NAVIGATION -> HERO WITH PRODUCT VISUAL -> SOCIAL PROOF -> CORE MODULES -> QUANTIFIABLE IMPACT (STATS) -> SECURITY PROOF -> FAQ -> CTA -> DETAILED FOOTER.

### NAVIGATION

FIXED HEADER AT TOP, 64PX HEIGHT. LEFT-ALIGNED LOGO WITH A #020617 SQUARE ICON. CENTER-ALIGNED NAV LINKS (PLATFORM, SOLUTIONS, SECURITY) IN TEXT-SM FONT-MEDIUM SLATE 600. RIGHT-ALIGNED 'BOOK DEMO' BUTTON IN SLATE 900 BACKGROUND WITH WHITE TEXT.

### HERO SECTION

CENTERED LAYOUT WITH 128PX TOP PADDING. A PILL-SHAPED BADGE AT THE TOP (#EFF6FF) WITH A PULSING GREEN STATUS DOT. TITLE IN 72PX BOLD TEXT-SLATE-900. TWO PRIMARY CTAS: A BLUE PRIMARY BUTTON WITH RIGHT-ARROW ICON AND A WHITE OUTLINE BUTTON WITH PLAY-CIRCLE ICON. BACKGROUND FEATURES A FAINT 40PX GRID OVERLAY.

### DASHBOARD PREVIEW

A MAX-WIDTH 1152PX CONTAINER SHOWING A SIMULATED BROWSER WINDOW. INCLUDE A BROWSER TOP-BAR WITH THREE DOTS AND A URL BAR. THE INTERNAL UI CONSISTS OF A 256PX SIDEBAR (SLATE 50), A HEADER WITH SYSTEM STATUS INDICATORS, A 3-COLUMN STATS ROW (E.G., ACTIVE USERS, API REQUESTS), AND A DETAILED DATA TABLE. TABLE ROWS MUST SHOW HOVER STATES WITH LIGHT BLUE BACKGROUND (#EFF6FF).

### MODULE GRID

3-COLUMN GRID LAYOUT FOR CORE FEATURES. EACH CARD HAS A 12PX RADIUS, LIGHT GRAY BORDER, AND A SUBTLE ICON IN A TINTED SQUARE BOX (E.G., BLUE FOR USERS, EMERALD FOR SECURITY). ON HOVER, CARDS TRANSITION TO WHITE BACKGROUND WITH A SOFT SHADOW (SHADOW-XL SHADOW-SLATE-200/50).

### STATS SECTION

FULL-WIDTH SECTION WITH BACKGROUND #020617. FEATURES A DECORATIVE BACKGROUND OF CONCENTRIC WHITE CIRCLES WITH 10% OPACITY. DISPLAY FOUR MAJOR KPIS WITH A COUNT-UP ANIMATION SCRIPT. NUMBERS IN #60A5FA (PRIMARY 400), LABELS IN UPPERCASE SLATE 400.

### SECURITY UI SECTION

SPLIT 2-COLUMN LAYOUT. LEFT: CHECKLIST OF CERTIFICATIONS (SOC2, GDPR) WITH BLUE CHECK-CIRCLE ICONS. RIGHT: A 'POLICY TOGGLE' CARD SHOWING ACTIVE/INACTIVE SWITCHES FOR SECURITY PROTOCOLS LIKE MFA, IP WHITELISTING, AND KEY ROTATION. INCLUDE AN OVERLAPPING 'THREAT BLOCKED' ALERT CARD IN SLATE 800 FOR DEPTH.

### ENTERPRISE FOOTER

6-COLUMN STRUCTURE. LEFT-MOST 2 COLUMNS FOR LOGO, LOCATION, AND SOCIAL ICONS. REMAINING 4 COLUMNS FOR PRODUCT, RESOURCES, COMPANY, AND LEGAL LINK LISTS. BOTTOM BAR INCLUDES COPYRIGHT AND A 'SYSTEM STATUS' INDICATOR WITH A GREEN PULSING DOT.

## SPECIAL COMPONENTS

### KPI COUNT-UP

ANIMATED NUMBERS THAT COUNT FROM ZERO TO THE TARGET VALUE WHEN ENTERING THE VIEWPORT.

USE AN INTERSECTIONOBSERVER TO TRIGGER A 2000MS ANIMATION. USE AN EASE-OUT QUARTIC FUNCTION: 1 - MATH.POW(1 - PROGRESS, 4). FORMAT INTEGERS WITHOUT DECIMALS AND PERCENTAGES TO 2 DECIMAL PLACES.

### AUDIT LOG TABLE

HIGH-DENSITY INFORMATION TABLE WITH STATUS BADGES.

A TABLE COMPONENT WITH STICKY HEADER. ROWS FEATURE A 0.2S TRANSITION-COLOR BACKGROUND ON HOVER. USE STATUS BADGES: SUCCESS (GREEN-100/800), WARNING (YELLOW-100/800), FAILED (RED-100/800). TIME COLUMNS MUST BE RIGHT-ALIGNED AND TEXT-SLATE-400.

### GLASS-MORPHISM TOGGLE

OPERATIONAL SWITCH USED FOR SECURITY POLICY SIMULATIONS.

A 40PX WIDTH PILL-SHAPED TOGGLE. TRACK COLOR #2563EB FOR 'ON'. THE THUMB IS A WHITE CIRCLE WITH SHADOW-SM, POSITIONED 4PX FROM THE EDGE. INCLUDE A 'JUST-IN-TIME' HOVER EFFECT THAT SLIGHTLY GLOWS THE TRACK.

## SPECIAL NOTES

MUST: MAINTAIN A STRICT VERTICAL RHYTHM WITH 128PX SPACING BETWEEN MAJOR SECTIONS. MUST: USE ONLY GRAYSCALE AND PRIMARY BLUE FOR MAIN UI, RESERVING COLORS LIKE GREEN/RED STRICTLY FOR STATUS INDICATORS. MUST NOT: USE ROUNDED CORNERS LARGER THAN 12PX FOR STRUCTURAL ELEMENTS. MUST NOT: USE HEAVY GRADIENTS; KEEP ALL SURFACES FLAT OR SLIGHTLY GLASS-MORPHIC.

---

# IMPLEMENTATION NOTES (ENRICHED — FOR FAITHFUL REPRODUCTION)

> THE FOLLOWING SECTION RECORDS THE EXACT TOKENS, COPY, AND CORE CODE USED IN THE BUILD SO OPUS REPRODUCES THE SAME OUTPUT. THE REFERENCE DRAFT WAS NOT NETWORK-REACHABLE AT BUILD TIME (HOST BLOCKED BY EGRESS ALLOWLIST), SO THE BUILD IS DRIVEN ENTIRELY BY THE DETAILED SPEC ABOVE PLUS THESE NOTES.

## BRAND & COPY

- BRAND NAME: **SENTRA**. LOGO = A 28PX `#020617` ROUNDED-6PX SQUARE WITH A WHITE LUCIDE `shield-check` GLYPH INSIDE, FOLLOWED BY THE WORDMARK "Sentra" IN 18PX/700.
- HERO BADGE: "● SOC 2 Type II Certified — Live status" (GREEN PULSING DOT).
- HERO H1 (72PX/800, TRACKING -0.02EM, LINE-HEIGHT 1.05): **"The control plane for enterprise operations."** — THE WORD "control plane" IS KEPT IN SLATE-900; NO COLOR ON HEADLINE.
- HERO SUBTITLE (19PX, SLATE-500, MAX-WIDTH 620PX, LINE-HEIGHT 1.625): "Provision access, audit every action, and enforce security policy across your entire org — from one authoritative admin console."
- PRIMARY CTA: "Start free trial" + lucide `arrow-right`. SECONDARY CTA: "Watch demo" + lucide `play-circle`.
- SOCIAL PROOF EYEBROW: "TRUSTED BY SECURITY-FIRST TEAMS AT" followed by a row of 5 grayscale wordmark logos (ACME, NORTHWIND, GLOBEX, INITECH, UMBRELLA) rendered as plain 600 slate-400 text.

## DESIGN TOKENS (CSS CUSTOM PROPERTIES)

```css
:root{
  --primary:#2563eb; --primary-400:#60a5fa; --primary-50:#eff6ff;
  --slate-950:#020617; --slate-900:#0f172a; --slate-800:#1e293b;
  --slate-600:#475569; --slate-500:#64748b; --slate-400:#94a3b8;
  --slate-200:#e2e8f0; --slate-100:#f1f5f9; --slate-50:#f8fafc;
  --bg:#ffffff; --muted:#f8fafc; --border:#e2e8f0; --deep:#151e2e;
  --success:#16a34a; --warning:#d97706; --error:#dc2626;
  --radius-card:12px; --radius-btn:8px; --ease:cubic-bezier(.4,0,.2,1);
  --section-gap:128px;
}
*{box-sizing:border-box} body{font-family:'Satoshi',system-ui,sans-serif;color:var(--slate-900);background:var(--bg)}
.container{max-width:1152px;margin:0 auto;padding:0 24px}
h1,h2,h3{letter-spacing:-0.02em;font-weight:800;line-height:1.1}
```

- FONTS VENDORED LOCALLY AT `assets/fonts/satoshi-{400,500,700,900}.woff2` (FROM FONTSHARE). WEIGHT 600 IS MAPPED TO THE 700 FILE AND 800 TO THE 900 FILE VIA `@font-face` SO THE FULL 400–900 RANGE RENDERS WITHOUT ADDITIONAL DOWNLOADS.
- ICONS: USE INLINE SVG REPLICAS OF LUCIDE GLYPHS (NO CDN). KEEP STROKE-WIDTH 2, ROUND CAPS.

## NAV (FIXED, GLASS)

```css
.nav{position:fixed;top:0;left:0;right:0;height:64px;z-index:50;
  background:rgba(255,255,255,.7);backdrop-filter:blur(12px);
  border-bottom:1px solid var(--border)}
.nav-links a{font-size:14px;font-weight:500;color:var(--slate-600);transition:color .2s var(--ease)}
.nav-links a:hover{color:var(--slate-900)}
.btn-demo{background:var(--slate-900);color:#fff;font-size:14px;font-weight:600;
  padding:9px 16px;border-radius:var(--radius-btn);transition:transform .2s var(--ease),background .2s var(--ease)}
.btn-demo:hover{background:#000;transform:translateY(-1px)}
```

## HERO GRID BACKGROUND

```css
.hero{position:relative;padding-top:128px;text-align:center;overflow:hidden}
.hero::before{content:'';position:absolute;inset:0;z-index:-1;
  background-image:linear-gradient(#0000000a 1px,transparent 1px),
                   linear-gradient(90deg,#0000000a 1px,transparent 1px);
  background-size:40px 40px;
  -webkit-mask-image:radial-gradient(ellipse 70% 60% at 50% 35%,#000 30%,transparent 75%);
          mask-image:radial-gradient(ellipse 70% 60% at 50% 35%,#000 30%,transparent 75%);}
```

- PULSING DOT: `.dot{width:8px;height:8px;border-radius:50%;background:var(--success)}` with `@keyframes pulse{0%,100%{box-shadow:0 0 0 0 #16a34a66}50%{box-shadow:0 0 0 5px #16a34a00}}` applied `2s var(--ease) infinite`.

## DASHBOARD PREVIEW (SIMULATED BROWSER)

- OUTER: 1152px max-width card, 12px radius, `box-shadow:0 30px 60px -20px #1e293b40`, 1px border.
- TOP BAR: 44px, slate-50, three 12px dots (`#ef4444 / #eab308 / #22c55e`), a pill URL bar reading `app.sentra.io/admin`.
- BODY: CSS grid `256px 1fr`. SIDEBAR slate-50 with nav items (Overview active = blue-50 bg + blue text, Users, Access, Audit Log, Policies, Settings) each with an inline icon.
- MAIN: header row "System Operational" with green dot + a search field; a 3-col stat grid (Active Users 12,438 ↑ / API Requests 2.4M ↑ / Open Incidents 3 ↓); then the AUDIT LOG TABLE.

## AUDIT LOG TABLE

```html
<table class="audit">
 <thead><tr><th>Event</th><th>Actor</th><th>Resource</th><th>Status</th><th class="r">Time</th></tr></thead>
 <tbody><!-- rows: user.login / policy.update / key.rotate / access.revoke / login.failed --></tbody>
</table>
```

```css
.audit thead th{position:sticky;top:0;background:var(--slate-50);
  font-size:11px;letter-spacing:.05em;text-transform:uppercase;color:var(--slate-500);text-align:left;padding:10px 16px}
.audit tbody tr{transition:background-color .2s var(--ease)}
.audit tbody tr:hover{background:var(--primary-50)}
.audit td{padding:12px 16px;font-size:13px;border-top:1px solid var(--slate-100)}
.audit .r{text-align:right;color:var(--slate-400)}
.badge{font-size:11px;font-weight:600;padding:3px 8px;border-radius:9999px}
.badge.s{background:#dcfce7;color:#166534}
.badge.w{background:#fef9c3;color:#854d0e}
.badge.f{background:#fee2e2;color:#991b1b}
```

## MODULE GRID (3-COLUMN FEATURE CARDS)

- SIX CARDS: Identity & Access (blue `users`), Security Policy (emerald `shield`), Audit & Compliance (violet `file-clock`), Provisioning (amber `boxes`), API & Webhooks (sky `webhook`), Analytics (rose `bar-chart`).
- ICON BOX: 44px, 10px radius, tinted bg (e.g. `#eff6ff`) + matching icon color.

```css
.card{border:1px solid var(--border);border-radius:var(--radius-card);padding:28px;background:var(--muted);
  transition:background .25s var(--ease),box-shadow .25s var(--ease),transform .25s var(--ease)}
.card:hover{background:#fff;box-shadow:0 20px 40px -12px #e2e8f080;transform:translateY(-3px)}
```

## STATS SECTION (DARK)

- FULL-BLEED `#020617`. DECORATIVE CONCENTRIC RINGS via radial repeating gradient at 10% white opacity.
- FOUR KPIS: 99.99 (% — "Uptime SLA", 2 decimals), 4200000000 ("API calls / month", integer w/ thousands), 180 ("Countries covered"), 24 ("hr Incident response"). NUMBERS `#60a5fa` 800 ~52px; LABELS uppercase slate-400 12px tracking .08em.

```css
.stats{background:var(--slate-950);position:relative;overflow:hidden;color:#fff}
.stats::before{content:'';position:absolute;left:50%;top:50%;width:1200px;height:1200px;transform:translate(-50%,-50%);
  background:repeating-radial-gradient(circle,#ffffff1a 0 1px,transparent 1px 80px);opacity:.5;pointer-events:none}
```

## KPI COUNT-UP (CORE JS)

```js
function animateCount(el){
  const target=parseFloat(el.dataset.target), dec=parseInt(el.dataset.dec||0), dur=2000, start=performance.now();
  (function step(now){
    const p=Math.min((now-start)/dur,1), eased=1-Math.pow(1-p,4), v=target*eased;
    el.textContent = (dec? v.toFixed(dec) : Math.floor(v)).toLocaleString(undefined,{minimumFractionDigits:dec,maximumFractionDigits:dec});
    if(p<1) requestAnimationFrame(step);
  })(start);
}
new IntersectionObserver((es,o)=>es.forEach(e=>{if(e.isIntersecting){animateCount(e.target);o.unobserve(e.target);}}),{threshold:.4})
  .observe... // observe every [data-target]
```

## SECURITY SECTION (SPLIT + TOGGLES)

- LEFT: H2 "Security you can prove, not just promise." + checklist (SOC 2 Type II, GDPR, ISO 27001, HIPAA, CCPA) each with blue `check-circle`.
- RIGHT: white "Active Policies" card with three GLASS-MORPHISM TOGGLES (MFA enforcement = ON, IP allow-listing = ON, Automatic key rotation = OFF). An OVERLAPPING absolutely-positioned slate-800 "Threat blocked" alert card (bottom-right, +24px offset) with a red shield icon and subtext "Suspicious login from 203.0.113.x".

```css
.toggle{width:40px;height:22px;border-radius:9999px;background:var(--slate-200);position:relative;cursor:pointer;
  transition:background .25s var(--ease),box-shadow .25s var(--ease)}
.toggle.on{background:var(--primary)}
.toggle:hover{box-shadow:0 0 0 4px #2563eb22}
.toggle .thumb{position:absolute;top:3px;left:3px;width:16px;height:16px;border-radius:50%;background:#fff;
  box-shadow:0 1px 2px #0003;transition:transform .25s var(--ease)}
.toggle.on .thumb{transform:translateX(18px)}
```
TOGGLES ARE CLICKABLE (JS TOGGLES `.on`).

## FAQ + CTA + FOOTER

- FAQ: accordion of 5 items (chevron rotates 180° on open, panel height animates). Questions cover SSO/SAML, pricing, data residency, onboarding, SLA.
- CTA BAND: slate-950 panel, centered, "Bring order to enterprise operations." + blue button "Book a demo" + ghost "Talk to sales".
- FOOTER: 6-col grid (2 brand + Product / Resources / Company / Legal). Bottom bar: "© 2026 Sentra, Inc." left; right = green pulsing dot + "All systems operational".

## ANIMATIONS / REVEALS

```css
.reveal{opacity:0;transform:translateY(20px)}
.reveal.in{opacity:1;transform:none;transition:opacity .8s ease-out,transform .8s ease-out}
```
An IntersectionObserver (threshold .15) adds `.in`. Stagger via inline `transition-delay` increments of 80ms on grid children.

## VERIFICATION

- SELF-CONTAINED STATIC FILES: `index.html`, `style.css`, `app.js`, `assets/fonts/*`. SERVE WITH ANY STATIC SERVER; NO BUILD.
- HEADLESS-CHROMIUM CHECK: NO CONSOLE ERRORS, KPI NUMBERS REACH FINAL VALUES, TOGGLES FLIP, TABLE ROWS HIGHLIGHT ON HOVER, NAV STAYS GLASSY/FIXED.
