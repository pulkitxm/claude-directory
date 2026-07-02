# POCKET — TAILWIND PLUS APP-MARKETING TEMPLATE — STUDY / CLONE

> A SELF-CONTAINED, PIXEL-FAITHFUL REPRODUCTION OF THE TAILWIND PLUS "POCKET" APP-MARKETING TEMPLATE, REBUILT AS PLAIN HTML + CSS + VANILLA JS WITH NO BUILD STEP. EVERY PAGE, SECTION, HOVER STATE, AND SCROLL/ENTRANCE BEHAVIOUR IS RECREATED FROM RECON ARTIFACTS. ALL ASSETS (INTER FONTS, PHONE-FRAME SVG, NEWS LOGO SVGS, QR CODE) ARE VENDORED LOCALLY SO THE CLONE RUNS OFFLINE. THIS IS A STUDY OF SOMEONE ELSE'S DESIGN, BUILT FOR LEARNING — ALL CREDIT FOR THE ORIGINAL GOES TO TAILWIND PLUS (TAILWIND LABS).

REFERENCE: `https://tailwindcss.com/plus/templates/pocket/preview`

## SUMMARY

POCKET IS A PREMIUM MOBILE-APP MARKETING TEMPLATE FROM TAILWIND PLUS, SHOWCASED WITH A TONGUE-IN-CHEEK STOCK-TRADING APP ("INVEST AT THE PERFECT TIME"). IT IS A DARK-ACCENTED, MODERN MARKETING LANDING PAGE BUILT AROUND AN IPHONE MOCKUP: AN INTER SANS DISPLAY, A CYAN ACCENT (`#00B7D7`), A NEUTRAL-GRAY SCALE, AND ALTERNATING WHITE / GRAY-50 / GRAY-900 SECTION BANDS. A REUSABLE `PhoneFrame` SVG WRAPS HAND-DRAWN IN-APP SCREENS (CHART DEMO, INVITE FORM, STOCKS LIST, BUY-SHARES) THAT SWAP BEHIND THE FEATURE TABS. THE LIVE TEMPLATE IS A NEXT.JS + HEADLESS-UI + FRAMER-MOTION APP SERVED FROM `pocket.tailwindui.com`; THIS CLONE PRESERVES ITS EXACT MARKUP/COPY/IMAGERY, SELF-HOSTS THE INTER VARIABLE FONT, VENDORS THE PHONE-FRAME / NEWS-LOGO / QR-CODE SVGS, AND REPLACES THE PROPRIETARY NEXT/HEADLESS-UI/FRAMER RUNTIME WITH A SMALL HAND-WRITTEN CSS (TAILWIND-EQUIVALENT TOKENS) PLUS A VANILLA-JS SHIM THAT REIMPLEMENTS THE SAME BEHAVIOURS (MOBILE NAV POPOVER, AUTO-ROTATING PRIMARY-FEATURE TABS WITH CROSS-FADING PHONE SCREENS, PRICING MONTHLY/ANNUALLY TOGGLE, ANIMATED REVIEW MARQUEE, HOVER/FOCUS STATES).

THE BUILD SPANS 3 PAGES — THE MARKETING **HOME** PAGE (HERO, LOGO CLOUD, PRIMARY FEATURES, SECONDARY FEATURES, CTA, REVIEWS, PRICING, FAQS, FOOTER), A CENTERED-CARD **LOGIN** PAGE, AND A CENTERED-CARD **REGISTER** PAGE.

## STYLE

### PALETTE (TAILWIND NEUTRAL + CYAN)
- WHITE `#ffffff` — PAGE / CARD BACKGROUND
- GRAY-50 `#fafafa` — BODY BACKGROUND, SECONDARY SURFACES
- GRAY-100 `#f5f5f5` — PRICING / SECTION SURFACE
- GRAY-200 `#e5e5e5` — HAIRLINE BORDERS, CARD BORDERS
- GRAY-300 `#d4d4d4` — INPUT BORDERS, TOGGLE BORDER
- GRAY-400 `#a1a1a1` — PLACEHOLDERS, MUTED ICONS, DARK-SECTION SUBTEXT
- GRAY-500 `#737373` — SECONDARY TEXT, AUTHOR HANDLES
- GRAY-600 `#525252` — BODY-ALT, NAV LINKS
- GRAY-700 `#404040` — BODY COPY
- GRAY-800 `#262626` — ACTIVE FEATURE-TAB CARD, DARK BUTTON HOVER
- GRAY-900 `#171717` — INK / HEADINGS, DARK PRIMARY-FEATURES + CTA BANDS, FEATURED PRICING CARD, FOOTER, SOLID DARK BUTTON
- CYAN-500 `#00b7d7` — PRIMARY ACCENT (LOGO MARK GRADIENT, "TRADE"/"BUY"/"INVITE" APP BUTTONS, AUTH SUBMIT, STAR ICONS, LINKS, POSITIVE %, CHART LINE)
- CYAN-600 `#0092b5` — ACCENT BUTTON HOVER/ACTIVE
- CYAN-900 `#104e64` — DEEP ACCENT TEXT

### TYPOGRAPHY
- ALL TEXT: **INTER VARIABLE** (`Inter`, 100–900) — SELF-HOSTED WOFF2 (FALLBACK `Inter Fallback`, system sans)
- HERO `<h1>` `text-5xl/6xl` (≈48–60PX) `font-medium` `tracking-tight` GRAY-900
- SECTION `<h2>` `text-3xl` (30PX) `font-medium` `tracking-tight`
- LEAD PARAGRAPHS `text-lg/text-xl` (18–20PX) GRAY-600/GRAY-700
- FEATURE / CARD TITLES `font-semibold` GRAY-900; BODY `text-sm/text-base`
- PRICING NUMBERS `text-7xl` (≈72PX) `font-medium tracking-tight`; META `text-sm`

### SPACING / SHAPE
- RADII: BUTTONS `rounded-lg` (DARK SOLID) / `rounded-full` (LOGIN PILL) / `rounded-lg` (CYAN APP BUTTONS); CARDS / SCREENSHOTS `rounded-2xl` / `rounded-3xl`; INPUTS / TOGGLE `rounded-lg`; AUTH CARD `rounded-2xl`
- LAYOUT: CENTERED `max-w-7xl` CONTAINER WITH `px-4 sm:px-6 lg:px-8`; HEADER IS A PLAIN TOP NAV (NOT STICKY); SECTIONS VERTICALLY RHYTHMIC WITH `py-20 sm:py-32`
- SOFT SHADOWS: AUTH CARD + REVIEW CARDS `shadow-xl`; FAINT CONCENTRIC-CIRCLE "BackgroundIllustration" SVG BEHIND HERO PHONE AND AUTH CARD
- ALTERNATING SECTION BANDS: WHITE HERO → GRAY-50 LOGO CLOUD → GRAY-900 PRIMARY FEATURES → WHITE SECONDARY FEATURES → GRAY-900 CTA → WHITE REVIEWS → GRAY-100 PRICING → GRAY-50 FAQS → GRAY-50 FOOTER

### ANIMATION / EASINGS / INTERACTION
- DEFAULT TRANSITION `.15S CUBIC-BEZIER(.4,0,.2,1)` ON COLORS / TRANSFORMS
- BUTTON HOVERS: DARK SOLID "DOWNLOAD" → GRAY-800; CYAN APP/AUTH BUTTONS → CYAN-600; NAV LINKS → GRAY-900 + `rounded-lg hover:bg-gray-100` PILL; "LOG IN" PILL → GRAY-100 BG
- **MOBILE NAV POPOVER** — BELOW `lg`, A HAMBURGER (`Toggle site navigation`) MORPHS BARS→X AND OPENS A WHITE `rounded-lg shadow-xl` PANEL (FEATURES / REVIEWS / PRICING / FAQS, HAIRLINE, LOG IN) WITH A DIMMED/BLURRED BACKDROP; OUTSIDE-CLICK / ESC CLOSES
- **PRIMARY FEATURES** (GRAY-900 BAND) — THREE FEATURE TABS ON THE RIGHT (INVITE FRIENDS FOR BETTER RETURNS / NOTIFICATIONS ON STOCK DIPS / INVEST WHAT YOU WANT); SELECTING A TAB GIVES IT A `bg-gray-800 rounded-2xl` HIGHLIGHT AND CROSS-FADES THE LEFT PHONE FRAME TO THAT FEATURE'S APP SCREEN (INVITE FORM / STOCKS LIST / BUY-SHARES); **AUTO-ROTATES** ON AN INTERVAL UNTIL THE USER INTERACTS; ON MOBILE (<MD) IT BECOMES A HORIZONTAL SNAP CAROUSEL WITH DOT INDICATORS
- **PRICING MONTHLY/ANNUALLY TOGGLE** — A `headlessui` RADIOGROUP PILL; ACTIVE OPTION GETS A SLIDING GRAY-900 TEXT-WHITE PILL; SWITCHES INVESTOR $7↔$70 AND VIP $199↔$1,990 (STARTER STAYS $0)
- **REVIEWS** — REVIEW CARDS APPEAR WITH A STAGGERED TRANSLATE-Y ENTRANCE THEN A SLOW CONTINUOUS VERTICAL MARQUEE ACROSS 3 COLUMNS (DESKTOP); EACH CARD = WHITE `rounded-2xl shadow`, TITLE, FIVE CYAN STAR ICONS, BODY, `@handle`
- HERO PHONE SHOWS THE `AppDemo` CHART SCREEN (CYAN LINE CHART, "752.56 USD / +12.21%", 1D/5D/1M/6M/1Y/5Y, TRADE BUTTON, OPEN/CLOSED/LOW STATS) WITH A FAINT CONCENTRIC-CIRCLE BACKGROUND AND CYAN-STROKE ARC

## LAYOUT & STRUCTURE

### SHARED CHROME
- **HEADER** — TOP BAR (NOT STICKY): LEFT = POCKET LOGO (CYAN SPLIT-CIRCLE MARK + "Pocket" WORDMARK) + DESKTOP NAV (FEATURES · REVIEWS · PRICING · FAQS ANCHOR LINKS); RIGHT = "LOG IN" PILL LINK + SOLID GRAY-900 "DOWNLOAD" BUTTON; BELOW `lg` THE NAV COLLAPSES TO THE "DOWNLOAD" BUTTON + HAMBURGER POPOVER.
- **FOOTER** (GRAY-50) — POCKET LOGO + TAGLINE "Invest at the perfect time.", INLINE NAV (FEATURES · REVIEWS · PRICING · FAQS), A "DOWNLOAD THE APP" QR-CODE CARD ("Scan the QR code to download the app from the App Store."), A NEWSLETTER SIGN-UP ("Join our newsletter" + EMAIL FIELD + "Join newsletter" CYAN ARROW BUTTON), HAIRLINE DIVIDER, COPYRIGHT "© Copyright 2026. All rights reserved." LEFT + APP-STORE / PLAY BADGES.

### PAGES
- **HOME (`index`)** — (1) **HERO** (white): `Invest at the perfect time.` headline, lead paragraph, "Download on the App Store" black badge + "Watch the video" outline button, plus the right-hand `PhoneFrame` AppDemo chart screen on a concentric-circle backdrop. (2) **LOGO CLOUD** (gray-50): "As featured in" + eight grayscale news logos (Forbes, TechCrunch, Wired, CNN, BBC, CBS, Fast Company, HuffPost). (3) **PRIMARY FEATURES** (gray-900): "Every feature you need to win. Try it for yourself." with a phone frame (left) + 3 auto-rotating feature tabs (right): Invite friends for better returns, Notifications on stock dips, Invest what you want — each swapping the phone's app screen; mobile = snap carousel. (4) **SECONDARY FEATURES** (white): "Now is the time to build your portfolio." with a 3×2 grid of icon cards (Invest any amount, Build a balanced portfolio, Trade in real-time, Profit from your network, Encrypted and anonymized, Portfolio tracking). (5) **CTA** (gray-900): "Get your first tips today" + "Download the app" black App-Store badge. (6) **REVIEWS** (white): "Everyone is changing their life with Pocket." + "Thousands of people have doubled their net-worth in the last 30 days." over an animated 3-column marquee of 14 review cards (title, 5 cyan stars, body, @handle). (7) **PRICING** (gray-100): "Flat pricing, no management fees." with a Monthly/Annually toggle and three plan cards — Starter $0, Investor $7/$70 (featured, dark), VIP $199/$1,990 — each with check-marked feature list + "Get started for free" / "Subscribe" button. (8) **FAQS** (gray-50): "Frequently asked questions" three-column grid of nine Q&A pairs, "reach out to us" mailto link in the subhead.
- **LOGIN (`login`)** — Centered layout on a concentric-circle backdrop: Pocket logo, "Sign in to account" heading, "Don't have an account? Sign up for a free trial." subtext, a white `rounded-2xl shadow-xl` card with Email address + Password fields and a full-width cyan "Sign in to account" button.
- **REGISTER (`register`)** — Centered layout: Pocket logo, "Sign up for an account" heading, "Already registered? Sign in to your account." subtext, white card with First name / Last name (two-up), Email address, Password fields, a "How did you hear about us?" select (AltaVista search …), and a full-width cyan "Get started today" button.
