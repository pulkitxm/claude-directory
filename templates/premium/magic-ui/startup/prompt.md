> A SELF-CONTAINED, PIXEL-FAITHFUL REPRODUCTION OF THE MAGIC UI STARTUP TEMPLATE, REBUILT AS PLAIN HTML + CSS + VANILLA JS WITH ALL ASSETS VENDORED LOCALLY AND NO BUILD STEP REQUIRED.
>
> REFERENCE: `https://startup-template-sage.vercel.app/`

## SUMMARY

THE MAGIC UI STARTUP TEMPLATE IS A FREE, DARK-THEMED SAAS LANDING-PAGE TEMPLATE BY MAGIC UI, ORIGINALLY BUILT WITH NEXT.JS, TAILWIND CSS, REACT, AND FRAMER MOTION. THE CLONE REPRODUCES EVERY REACHABLE PAGE AS SELF-CONTAINED HTML/CSS/VANILLA-JS WITH IDENTICAL LAYOUT, TYPOGRAPHY, COLOR, ENTRANCE ANIMATIONS, AND INTERACTIONS — A PURE-BLACK MARKETING PAGE WITH A GRADIENT-CLIPPED HERO HEADLINE, AN ANIMATED DASHBOARD HERO IMAGE WITH A COLOR-GLOW AND BOTTOM FADE, A "TRUSTED BY" LOGO MARQUEE, A PRICING SECTION WITH AN ANNUAL/MONTHLY TOGGLE AND FOUR TIERS, A CALL-TO-ACTION SECTION, AND A FOOTER. TWO MINIMAL AUTH PAGES (SIGN IN / SIGN UP) COMPLETE THE SITE.

## PAGES (CRAWLED)

- `/` (HOME) — `index.html` — THE FULL MARKETING LANDING PAGE.
- `/signin` — `signin.html` — "WELCOME BACK" AUTH CARD.
- `/signup` — `signup.html` — "WELCOME TO MAGIC UI" AUTH CARD.

NOTE: THE HEADER/FOOTER LINKS `FEATURES`, `PRICING`, `CAREERS`, `CONTACT US`, `TERMS`, `PRIVACY`, `EMAIL COLLECTION`, `FAQ` ALL RETURN 404 ON THE SOURCE (DEAD/PLACEHOLDER LINKS IN THE TEMPLATE ITSELF). THEY ARE REPRODUCED AS THE SAME NON-NAVIGATING / HASH LINKS — NO EXTRA PAGES EXIST TO CLONE.

## STYLE

### THEME

THE SITE RENDERS IN DARK MODE (`.dark` ON `<html>`). CSS CUSTOM PROPERTIES:

- `--background`: `oklch(0% 0 0)` (PURE BLACK) · `--foreground`: `oklch(98% 0 0)`
- `--card`: `oklch(15% 0 0)` · `--card-foreground`: `oklch(98% 0 0)`
- `--primary`: `oklch(98% 0 0)` (WHITE) · `--primary-foreground`: `oklch(26% 0 0)`
- `--secondary`: `oklch(35% 0 0)` · `--muted`: `oklch(35% 0 0)` · `--muted-foreground`: `oklch(70% 0 0)`
- `--border`: `oklch(35% 0 0)` · `--input`: `oklch(35% 0 0)` · `--ring`: `oklch(85% 0 0)`
- `--radius`: `0.625rem`
- HERO GLOW: `--color-one`: `oklch(83% .12 65)`, `--color-two`: `oklch(70% .08 240)`, `--color-three`: `oklch(55% .25 15)`

### FONTS

- PRIMARY: `Inter` (VARIABLE, WEIGHTS 100–900), VENDORED LOCALLY AS WOFF2 IN `assets/fonts/`.

### TYPE SCALE

- HERO H1: `text-5xl` → `sm:text-6xl` → `md:text-7xl` → `lg:text-8xl` (UP TO ~96PX), `font-medium` (500), `leading-none`, `tracking-tighter`, GRADIENT-CLIPPED (`bg-gradient-to-br dark:from-white dark:to-white/40`, `bg-clip-text text-transparent`).
- SECTION HEADINGS: `text-3xl`/`text-4xl` `font-bold tracking-tight`.
- BODY/SUBTEXT: `text-muted-foreground`, `text-base`/`text-lg`.
- BANNER PILL TEXT: `text-xs` WITH SHIMMER GRADIENT (`animate-shimmer`).

### RADII

- BUTTONS / INPUTS / CARDS: `--radius` (`0.625rem`) AND VARIANTS (`rounded-lg`, `rounded-xl`, `rounded-full` FOR PILL/AVATARS).

### ANIMATION & EASINGS

- ENTRANCE: `@keyframes fade-in` (`opacity 0→1`, `translateY(-10px)→0`) AND `@keyframes fade-up` (`translateY(20px)→0`), `1s ease forwards`, STAGGERED VIA `--animation-delay` (200ms HERO HEADING, 400ms IMAGE, ETC.); ELEMENTS START AT `opacity-0`.
- LOGO MARQUEE: `@keyframes marquee` (`translateX(0 → -100%)`), `infinite linear`, DURATION VIA `--duration`; DUPLICATED TRACK FOR SEAMLESS LOOP, PAUSE ON HOVER.
- HERO IMAGE: WRAPPED IN `[perspective:2000px]`, A BOTTOM `linear-gradient(to top, var(--background) 30%, transparent)` FADE OVERLAY, AND A BLURRED COLOR GLOW (`--color-one`) VIA `animate-image-glow`.
- BANNER PILL: `animate-shimmer` MOVING BACKGROUND-POSITION; ARROW NUDGES RIGHT ON HOVER.
- HEADER: STICKY; ACQUIRES A BLURRED/BORDERED BACKGROUND AFTER SCROLL.

## LAYOUT & STRUCTURE

### HOME (`index.html`)

1. **TOP ANNOUNCEMENT** — DISMISSIBLE TOP BAR (PRODUCT HUNT–STYLE) ABOVE THE HEADER.
2. **HEADER / NAV** — STICKY. LEFT: MAGIC UI LOGO + WORDMARK. RIGHT (DESKTOP): `Log in` (GHOST) + `Sign up` (WHITE PILL BUTTON). MOBILE: HAMBURGER OPENING A DRAWER WITH `Features`, `Pricing`, `Careers`, `Contact Us`.
3. **HERO** — CENTERED. BANNER PILL `✨ Introducing Magic UI Template` (SHIMMER + ARROW) → GRADIENT H1 `Magic UI is the new way to build landing pages.` → SUBTEXT `Beautifully designed, animated components and templates built with Tailwind CSS, React, and Framer Motion.` → `Get Started for free` PILL BUTTON → ANIMATED DASHBOARD HERO IMAGE (`hero-dark.png`) WITH PERSPECTIVE, GLOW, AND BOTTOM FADE.
4. **CLIENTS / TRUSTED BY** — LABEL `TRUSTED BY TEAMS FROM AROUND THE WORLD` + GRAYSCALE LOGO MARQUEE (GOOGLE, MICROSOFT, GITHUB, UBER, NOTION) WITH EDGE FADE MASKS.
5. **PRICING** — EYEBROW `Pricing`, HEADING `Simple pricing for everyone.`, SUBTEXT, ANNUAL/MONTHLY TOGGLE (`2 MONTHS FREE` BADGE), FOUR CARDS (BASIC $10, PREMIUM $20 — HIGHLIGHTED/BORDERED, ENTERPRISE $50, ULTIMATE $80) EACH WITH `Subscribe` BUTTON AND A CHECK-MARKED FEATURE LIST.
6. **CTA** — HEART/LOGO MARK, HEADING `Stop wasting time on design.`, SUBTEXT `Start your 7-day free trial. No credit card required.`, `Get Started` BUTTON.
7. **FOOTER** — LOGO + TAGLINE `UI Library for Design Engineers`, LINK COLUMNS (PRODUCT / COMMUNITY / LEGAL), COPYRIGHT `© 2025 Magic UI. All Rights Reserved.`, SOCIAL ICONS.

### SIGN IN (`signin.html`)

CENTERED ON BLACK. TOP-LEFT `← Back`. HEADING `Welcome back`, SUBTEXT `Login to your account`, EMAIL INPUT (`name@example.com`), WHITE `Sign In with Email` BUTTON, `OR CONTINUE WITH` DIVIDER, `Github` OUTLINE BUTTON, FOOTER LINK `Don't have an account? Sign Up`.

### SIGN UP (`signup.html`)

IDENTICAL LAYOUT TO SIGN IN. HEADING `Welcome to Magic UI`, SUBTEXT `Sign up for an account`, FOOTER LINK `Already have an account? Sign In`.
