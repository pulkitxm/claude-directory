> A SELF-CONTAINED, PIXEL-FAITHFUL REPRODUCTION OF THE **RELATIVE** TEMPLATE (A SHADCN/UI + NEXT.JS SAAS PRODUCTIVITY TEMPLATE SOLD ON SHADCNBLOCKS.COM), REBUILT AS PLAIN HTML + CSS + VANILLA JS WITH ALL ASSETS VENDORED LOCALLY AND NO BUILD STEP REQUIRED. EVERY PAGE, HOVER STATE, THEME TOGGLE, AND SCROLL/ENTRANCE BEHAVIOR IS RECREATED SAME-TO-SAME.
>
> REFERENCE: `https://www.shadcnblocks.com/template/relative`

## SUMMARY

RELATIVE IS A PREMIUM MULTI-PAGE SAAS PRODUCTIVITY-APP MARKETING TEMPLATE BUILT WITH NEXT.JS, SHADCN/UI, AND TAILWIND CSS. ITS LIVE DEMO IS HOSTED AT `https://relative-nextjs-template.vercel.app/`. THE DESIGN IS A CLEAN, MINIMAL, BLACK-ON-WHITE (WITH FULL DARK MODE) PRODUCT SITE FOR A FICTIONAL AI TASK-MANAGEMENT APP CALLED "RELATIVE". THE CLONE REPRODUCES ALL NINE PAGES AS SELF-CONTAINED HTML/CSS/JS WITH IDENTICAL LAYOUT, TYPOGRAPHY, COLOR, AND INTERACTIONS, DRIVEN ENTIRELY BY SHADCN/UI DESIGN TOKENS SO THE WHOLE SITE RECOLORS BETWEEN LIGHT AND DARK MODE.

## STYLE

### PALETTE (SHADCN/UI TOKENS — HSL TRIPLETS)
- LIGHT (`:root`):
  - `--background: 0 0% 100%` · `--foreground: 240 10% 4%`
  - `--muted: 0 0% 96%` · `--muted-foreground: 0 0% 49%` · `--muted-foreground-subtle: 240 5% 34%`
  - `--primary: 240 10% 4%` · `--primary-foreground: 0 0% 100%`
  - `--accent: 0 0% 96%` · `--accent-foreground: 0 0% 9%`
  - `--card: 0 0% 100%` · `--border: 0 0% 0% / .09` · `--ring: 240 10% 4%`
  - `--destructive: 0 84.2% 60.2%`
- DARK (`.dark`):
  - `--background: 240 10% 4%` · `--foreground: 0 0% 100%`
  - `--muted: 240 10% 10%` · `--muted-foreground: 240 5% 65%`
  - `--primary: 0 0% 100%` · `--primary-foreground: 240 10% 4%`
  - `--accent: 240 10% 10%` · `--accent-foreground: 0 0% 100%`
  - `--card: 240 10% 4%` · `--border: 0 0% 100% / .1`
- FOREGROUND HEADINGS RENDER AS `rgb(9,9,11)` (ZINC-950); BODY/MUTED COPY AS `rgb(125,125,125)`.

### FONTS
- SANS (BODY + HEADINGS): SYSTEM SANS STACK — `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", ...` (THE LIVE DEMO RENDERS WITH THE SYSTEM STACK; INTER IS DECLARED BUT NOT THE COMPUTED FACE).
- MONO: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`.

### RADII
- `--radius-sm: .25rem` · `--radius-md: .375rem` · `--radius-lg: .5rem` · `--radius-xl: .75rem`.

### MOTION
- SUBTLE FADE/SLIDE-UP ENTRANCE ON SCROLL (INTERSECTIONOBSERVER), SHORT EASE-OUT TRANSITIONS (~150–300MS) ON BUTTONS, CARDS, NAV LINKS, AND THEME TOGGLE. PRICING MONTHLY/YEARLY TOGGLE AND FAQ ACCORDION ANIMATE OPEN/CLOSED.

## LAYOUT & STRUCTURE

### SHARED CHROME
- TOP ANNOUNCEMENT BANNER ("Purchase this theme on shadcnblocks.com" + "Get Template", dismissible).
- STICKY HEADER: RELATIVE LOGO (cube SVG), CENTER NAV (Features ▾ DROPDOWN MEGA-MENU, About us, Pricing, FAQ, Contact), RIGHT: THEME TOGGLE (sun/moon), Login (outline) + Sign up (solid) BUTTONS; HAMBURGER + MOBILE MENU UNDER MD.
- FOOTER: LOGO + FOUR LINK COLUMNS (Product, Company, Legal, Social) + COPYRIGHT.

### PAGES
1. **HOME (`/`)** — HERO ("Say Goodbye to Task Overload") WITH DASHBOARD MOCKUP IMAGE; LOGO MARQUEE ("Used by the world's leading companies"); FEATURES "Smart productivity with AI" (3 cards); "Stay agile with adaptive workflows" (image + 3 feature rows); "Optimize every aspect of your day"; "Accelerate your planning journey" (4 numbered steps w/ images); TESTIMONIALS "What industry experts are saying" (6 cards); PRICING TEASER (3 plans); FAQ TEASER; FINAL CTA.
2. **ABOUT (`/about`)** — "Empowering Productivity with Purpose" HERO (2 images); STATS (500+/99.9%/20+/100+); LOGO STRIP; "Our Core Values" (3 cards); "The Minds Behind the Mission" TEAM (4 members); TESTIMONIALS; FOOTER.
3. **PRICING (`/pricing`)** — "Pricing for everyone" (3 plan cards); MONTHLY/YEARLY TOGGLE + DETAILED FEATURE COMPARISON TABLE (Core Tools / Productivity Insights / Workflow Automation); TESTIMONIALS; FAQ TEASER.
4. **FAQ (`/faq`)** — "Everything You Need to Know" ACCORDION (6 questions); TESTIMONIALS.
5. **CONTACT (`/contact`)** — "Get in Touch" FORM (Name/Email/Message/Terms checkbox/Submit) + EMAIL/PHONE/OFFICE INFO BLOCKS.
6. **LOGIN (`/login`)** — CENTERED CARD: "Welcome back", email/password, Remember me + Forgot password, Create an account, Sign up with Google.
7. **SIGN UP (`/signup`)** — CENTERED CARD: "Start your free trial", name/email/password, Create an account, Sign up with Google.
8. **TERMS OF SERVICE (`/terms-of-service`)** — CENTERED LEGAL DOCUMENT (Acceptance, User Accounts, Subscriptions, Use of Services, IP, Third-Party, Liability, Termination, Privacy, Changes).
9. **404 (`/dashboard` AND ANY UNKNOWN ROUTE)** — BIG "404 / Page not found" WITH Return home + Contact support BUTTONS.

### ASSETS (VENDORED LOCALLY UNDER `assets/`)
- HOMEPAGE: `hero.png`, `features-1.png`, `adaptive-1..3.png`, `optimize-1.png`, `accelerate-1..4.png`.
- LOGOS/PARTNERS: `zerostatic/notion/slack/github/figma/loom.svg`; SITE LOGO `logo.svg`.
- TESTIMONIAL AVATARS `1..6.png`; TEAM `1..4.png`; ABOUT `empowering.jpg`, `productivity.jpg`, `purpose.jpeg`.
- ALL REFERENCED BY RELATIVE LOCAL PATHS — NO REMOTE URLS AT RUNTIME.
