# BUILD PROMPT — KUBRIC™ HERO LANDING (TANSTACK START + REACT 19 + VITE 7 + TAILWIND V4)

## GOAL

CREATE A SINGLE-PAGE DARK HERO LANDING CALLED "KUBRIC™". IT IS A FULL-VIEWPORT HERO (MIN 1024PX WIDE, DESKTOP ONLY) WITH A LOOPING BACKGROUND VIDEO, A PROGRESSIVE BLUR OVERLAY AT THE BOTTOM, AN ANIMATED SVG LOGO, A GLASS NAV PILL WITH 4 LINKS (ONE HAS A CIRCULAR NUMERIC BADGE "3"), A WHITE "BOOK A CALL" BUTTON, A 3-LINE ITALIC-ACCENT HEADLINE THAT REVEALS CHARACTER-BY-CHARACTER, A VERTICAL RIGHT-SIDE SECTION NAV WITH AN ACTIVE UNDERLINE, A BOTTOM ROW CONTAINING A LABEL "01 — OUR GOAL", A DESCRIPTION PARAGRAPH, A PRIMARY "DISCUSS THE PROJECT" BUTTON, AN ANIMATED "SCROLL DOWN" PILL, AND A WHITE HORIZONTAL "ABOUT US" CARD WITH AN IMAGE AND ARROW. EVERYTHING ANIMATES IN ON FIRST LOAD AFTER THE BACKGROUND VIDEO IS READY.

## STACK / FILES

- TANSTACK START V1 FILE-BASED ROUTING. ROUTES IN SRC/ROUTES/. ROOT AT SRC/ROUTES/__ROOT.TSX. HOME AT SRC/ROUTES/INDEX.TSX.
- TAILWIND V4 VIA `@import "tailwindcss"` IN SRC/STYLES.CSS (NO TAILWIND.CONFIG.JS).
- ALL KUBRIC STYLES ARE PLAIN CSS APPENDED IN SRC/STYLES.CSS (NOT TAILWIND UTILITIES).
- LOAD GOOGLE FONT "INTER TIGHT" (WEIGHTS 300/400/500/700/800, ITALIC 400/700) VIA <LINK> IN THE ROUTE HEAD — NEVER VIA CSS @IMPORT.
- NO BACKEND, NO DATABASE, NO AUTH. NO SHADCN COMPONENTS USED BY THE PAGE.

## GLOBAL CSS VARIABLES (APPEND AFTER THE SHADCN BLOCK IN SRC/STYLES.CSS)

```css
:root {
  --bg: #1e1e1e;
  --text: #ffffff;
  --text-muted: rgba(255,255,255,0.749);
  --dark-text: #22282b;
  --page-pad: clamp(24px, 3.4vw, 50px);
  --btn-radius: 10px;
  --card-radius: 4px;
}
html { min-width: 1024px; }
body {
  font-family: "Inter Tight", sans-serif;
  background: var(--bg);
  color: var(--text);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
,::before,*::after { box-sizing: border-box; margin: 0; padding: 0; }
a { color: inherit; text-decoration: none; }
img { display: block; max-width: 100%; }
button { font-family: inherit; border: none; background: none; cursor: pointer; }
```

## LAYER HIERARCHY (EXACT JSX TREE OF THE HOME PAGE)

```
div.hero
├── div.hero__bg
│   └── video.hero__video  (autoPlay muted loop playsInline preload="auto")
│       └── source src="https://qclay.design/lovable/kubric/body.mp4" type="video/mp4"
├── div.hero__overlay
├── div.hero__gradient-top      (empty, display:none placeholder)
├── div.hero__gradient-bottom   (empty, display:none placeholder)
├── div.hero__blur
│   ├── div.hero__blur-layer    (× 8 — each layer gets a heavier blur + mask)
│   └── ::after (gradient darkening overlay)
├── header.header
│   ├── a.logo  href="#" aria-label="Kubric"
│   │   └── svg.logo__icon viewBox="0 0 122 30"
│   │       ├── circle.logo__circle cx=14.3 cy=14.9 r=7 stroke=#fff strokeWidth=3 fill=none
│   │       ├── path.logo__arc-1a  (outer arc top, see SVG below)
│   │       ├── path.logo__arc-1b  (outer arc bottom)
│   │       ├── path.logo__arc-2a  (far arc top)
│   │       ├── path.logo__arc-2b  (far arc bottom)
│   │       └── g.logo__text-group
│   │           ├── text x=46 y=22 font="Inter Tight" size=22 weight=700 fill=#fff letterSpacing=-0.5 → "Kubric"
│   │           └── text.logo__tm x=113 y=10 → "™"
│   ├── nav.nav-pill  aria-label="Primary"
│   │   ├── a.nav-pill__link href="#features" → "Features"
│   │   ├── a.nav-pilllink href="#team"     → "Team" + span.nav-pillbadge "3"
│   │   ├── a.nav-pill__link href="#roadmap"  → "Roadmap"
│   │   └── a.nav-pill__link href="#contact"  → "Contact"
│   └── button.btn.btn--header
│       ├── "Book a call"
│       └── svg.btn__arrow viewBox="0 0 8 8" (path d="M1 7L7 1M7 1H2M7 1V6")
├── h1.hero__heading
│   ├── span.heroline > span.heroline-inner → "Making your business"
│   ├── span.heroline > span.heroline-inner → "outstanding — is a"
│   └── span.heroline > span.heroline-inner > em → "Science"
├── nav.side-nav  aria-label="Sections"
│   ├── a.side-navlink.side-navlink--active href="#home"
│   │   ├── span.side-nav__link-text "Home"
│   │   └── span.side-nav__line
│   ├── a.side-navlink href="#services"  → span.side-navlink-text "Our Services"
│   ├── a.side-navlink href="#about"     → span.side-navlink-text "About Us"
│   ├── a.side-navlink href="#reviews"   → span.side-navlink-text "Reviews"
│   └── a.side-navlink href="#contact"   → span.side-navlink-text "Contact Us"
├── div.hero__blur-bar
└── div.hero__bottom (CSS grid, 1fr auto / 3 rows)
    ├── div.hero__label (row 1) → "01 — Our goal"
    ├── p.hero__desc (row 2) → 3 lines:
    │     "We enable the world's most engaged investors and"
    │     "family offices to access professionally managed"
    │     "investment strategies."
    ├── div.hero__actions (row 3)
    │   ├── button.btn.btn--footer
    │   │   ├── "Discuss the project"
    │   │   └── svg.btn__arrow (same 8×8 arrow path as header)
    │   └── button.scroll-down#scrollDown
    │       ├── span.scroll-down__text "Scroll down"
    │       └── span.scroll-down__circle
    │           └── svg viewBox="0 0 7.222 8.667" (path d="M3.611 1V7.667M3.611 7.667L1 5M3.611 7.667L6.222 5")
    └── a.about-card href="#about"
        ├── div.about-card__image > img src="https://qclay.design/lovable/kubric/card-image.png" alt="Pink tulip closeup"
        └── div.about-card__content
            ├── div
            │   ├── h3.about-card__title "About us"
            │   └── p.about-card__text "Me're driven by user-centered design that drives productivity and increases revenue."
            └── svg.about-card__arrow viewBox="0 0 77 13" (path d="M1 6.5H75M75 6.5L70 1.5M75 6.5L70 11.5")
```

## ICON / SVG SOURCES (PASTE VERBATIM — COORDINATES AND PATHLENGTH ARE EXACT)

LOGO SVG (INSIDE A.LOGO):

```html
<svg class="logo__icon" viewBox="0 0 122 30" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle class="logo__circle" cx="14.3" cy="14.9" r="7" fill="none" stroke="#fff" stroke-width="3"/>
  <path class="logo__arc-1a" pathLength="100" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none"
        d="M28.4955 14.6513C28.4346 12.2923 27.7563 9.99047 26.5284 7.9753C25.3005 5.96012 23.5657 4.30202 21.4972 3.1663C19.4287 2.03059 17.0985 1.45693 14.7392 1.50252C12.3798 1.54811 10.0736 2.21137 8.05047 3.42615"/>
  <path class="logo__arc-1b" pathLength="100" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none"
        d="M28.4955 14.6513C28.5564 17.0104 27.998 19.3442 26.8757 21.4201C25.7535 23.496 24.1067 25.2414 22.0996 26.4824C20.0924 27.7234 17.795 28.4166 15.4365 28.4929C13.0779 28.5692 10.7405 28.026 8.65735 26.9173"/>
  <path class="logo__arc-2a" pathLength="100" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none"
        d="M37.4997 14.9144C37.4824 12.1783 36.634 9.51197 35.0671 7.26888C33.5001 5.02578 31.2885 3.31178 28.7254 2.35403"/>
  <path class="logo__arc-2b" pathLength="100" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none"
        d="M37.4997 14.9144C37.5171 17.6506 36.7026 20.3274 35.1642 22.5902C33.6258 24.853 31.4361 26.5949 28.8853 27.5851"/>
  <g class="logo__text-group">
    <text x="46" y="22" font-family="Inter Tight" font-size="22" font-weight="700" fill="#fff" letter-spacing="-0.5">Kubric</text>
    <text class="logo__tm" x="113" y="10">™</text>
  </g>
</svg>
```

ARROW ICON (USED IN BOTH BUTTONS) VIEWBOX="0 0 8 8":

```html
<path d="M1 7L7 1M7 1H2M7 1V6" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
```

SCROLL-DOWN CHEVRON ICON VIEWBOX="0 0 7.222 8.667":

```html
<path d="M3.611 1V7.667M3.611 7.667L1 5M3.611 7.667L6.222 5" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
```

ABOUT-CARD LONG ARROW VIEWBOX="0 0 77 13":

```html
<path d="M1 6.5H75M75 6.5L70 1.5M75 6.5L70 11.5" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
```

## FULL CSS (APPEND TO SRC/STYLES.CSS VERBATIM — EXACT SOURCE OF TRUTH)

```css
/ ============ HERO ============ /
.hero { position: relative; width: 100%; height: 100vh; min-height: 700px; overflow: hidden; background: var(--bg); }
.hero__bg { position: absolute; inset: 0; z-index: 0; overflow: hidden; }
.hero__video { position: absolute; top: 50%; left: 50%; width: 60%; height: 90%; object-fit: cover; transform: translate(-50%,-50%) scale(1.9); }
.hero__overlay { position: absolute; inset: 0; z-index: 1; background: rgba(8,8,8,0.25); pointer-events: none; }
.herogradient-top,.herogradient-bottom { display: none; }

/ ===== PROGRESSIVE BLUR ===== /
.hero__blur { position: absolute; left:0; right:0; bottom:0; height: 26%; z-index:3; pointer-events:none; }
.hero__blur-layer { position: absolute; inset: 0; }
.hero__blur-layer:nth-child(1){ backdrop-filter: blur(0.6px); mask-image: linear-gradient(to bottom, transparent 0%, black 12%); }
.hero__blur-layer:nth-child(2){ backdrop-filter: blur(1px);   mask-image: linear-gradient(to bottom, transparent 12%, black 25%); }
.hero__blur-layer:nth-child(3){ backdrop-filter: blur(1.5px); mask-image: linear-gradient(to bottom, transparent 25%, black 37%); }
.hero__blur-layer:nth-child(4){ backdrop-filter: blur(2px);   mask-image: linear-gradient(to bottom, transparent 37%, black 50%); }
.hero__blur-layer:nth-child(5){ backdrop-filter: blur(3px);   mask-image: linear-gradient(to bottom, transparent 50%, black 62%); }
.hero__blur-layer:nth-child(6){ backdrop-filter: blur(4px);   mask-image: linear-gradient(to bottom, transparent 62%, black 75%); }
.hero__blur-layer:nth-child(7){ backdrop-filter: blur(6px);   mask-image: linear-gradient(to bottom, transparent 75%, black 87%); }
.hero__blur-layer:nth-child(8){ backdrop-filter: blur(8px);   mask-image: linear-gradient(to bottom, transparent 87%, black 100%); }
.hero__blur::after { content:""; position:absolute; inset:0; pointer-events:none;
  background: linear-gradient(to bottom, transparent 0%, rgba(20,20,20,0.35) 40%, rgba(20,20,20,0.65) 70%, rgba(20,20,20,0.85) 100%); }

.hero__blur-bar { position: absolute; left:0; right:0; bottom:0;
  height: calc(60px + clamp(20px,3vh,36px) + 24px); z-index:4; pointer-events:none;
  background: linear-gradient(0.8deg, rgba(255,255,255,0.06) -51%, transparent 109%), rgba(255,255,255,0.01);
  mask-image: linear-gradient(to bottom, transparent 0%, black 30%); }

/ ===== HEADER ===== /
.header { position: absolute; top:0; left:0; right:0; z-index:10; display:flex; align-items:center; justify-content: space-between; padding: 20px var(--page-pad); }

/ ===== LOGO ===== /
.logo { display:flex; align-items:center; }
.logo__icon { display:block; width: clamp(80px,7.6vw,110px); height: clamp(22px,2.08vw,30px); overflow:visible; }
body:not(.is-ready) .logo__circle,
body:not(.is-ready) .logoarc-1a, body:not(.is-ready) .logoarc-1b,
body:not(.is-ready) .logoarc-2a, body:not(.is-ready) .logoarc-2b,
body:not(.is-ready) .logo__text-group { opacity:0; animation-play-state: paused !important; }
.logo__circle { transform-origin: 14.3px 14.9px; transform: scale(0); opacity:0;
  animation: logoCircleGrow 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.1s forwards; }
@keyframes logoCircleGrow { to { transform: scale(1); opacity:1; } }
.logoarc-1a,.logoarc-1b { stroke-dasharray:100; stroke-dashoffset:100; opacity:0; transform: translateX(-14px);
  animation: logoArcDraw1 0.65s cubic-bezier(0.16,1,0.3,1) 0.55s forwards; }
.logoarc-2a,.logoarc-2b { stroke-dasharray:100; stroke-dashoffset:100; opacity:0; transform: translateX(-14px);
  animation: logoArcDraw2 0.5s  cubic-bezier(0.16,1,0.3,1) 1.25s forwards; }
@keyframes logoArcDraw1 { to { stroke-dashoffset:0; opacity:1; transform: translateX(0);} }
@keyframes logoArcDraw2 { to { stroke-dashoffset:0; opacity:1; transform: translateX(0);} }
.logo__text-group { opacity:0; filter: blur(10px); transform: translateX(28px);
  animation: logoTextReveal 1.9s cubic-bezier(0.16,1,0.3,1) 1.25s forwards; }
@keyframes logoTextReveal { to { opacity:1; filter: blur(0); transform: translateX(0);} }
.logo__tm { font-family:"Inter Tight",sans-serif; font-size:20px; fill:#fff; }

/ ===== NAV PILL ===== /
.nav-pill {
  display:inline-flex; align-items:center; gap: clamp(16px,2.3vw,33px);
  padding: clamp(8px,0.76vw,11px) clamp(13px,1.39vw,20px);
  justify-content:center;
  border-radius: 1090.909px;
  border: 1.091px solid rgba(255,255,255,0.1);
  background: linear-gradient(12deg, rgba(255,255,255,0.06) -43.16%, rgba(255,255,255,0) 103.95%), rgba(255,255,255,0.01);
  backdrop-filter: blur(7px);
  box-shadow: 0 4px 24px rgba(0,0,0,0.18);
  transform-origin: center; transform: scaleX(0); opacity:0;
  animation: navPillReveal 0.6s cubic-bezier(0.16,1,0.3,1) 0.2s forwards;
}
body:not(.is-ready) .nav-pill { animation-play-state: paused !important; }
@keyframes navPillReveal { to { transform: scaleX(1); opacity:1; } }
.nav-pill__link { font-size: clamp(12px,1.06vw,15.27px); font-weight:500; color: var(--text-muted);
  transition: color 0.2s ease; display:inline-flex; align-items:center; gap: clamp(6px,0.56vw,8px);
  opacity:0; transform: translateY(14px); animation: navLinkReveal 0.65s cubic-bezier(0.16,1,0.3,1) forwards; }
body:not(.is-ready) .nav-pill__link { animation-play-state: paused !important; }
.nav-pill__link:hover { color:#fff; }
.nav-pill__link:nth-child(1){animation-delay:0.75s;}
.nav-pill__link:nth-child(2){animation-delay:0.83s;}
.nav-pill__link:nth-child(3){animation-delay:0.91s;}
.nav-pill__link:nth-child(4){animation-delay:0.99s;}
@keyframes navLinkReveal { to { opacity:1; transform: translateY(0); } }
.nav-pill__badge { width: clamp(14px,1.25vw,18px); height: clamp(14px,1.25vw,18px); border-radius:50%;
  background: rgba(255,255,255,0.08); display:inline-flex; align-items:center; justify-content:center;
  color: var(--text-muted); font-size: clamp(12px,1.05vw,15px); font-weight:500; line-height:1; }

/ ===== BUTTONS ===== /
/ NOTE: global reset sets button{background:none} — .btn--header and .btn--footer MUST set background:#fff explicitly /
.btn { display:inline-flex; align-items:center; gap: clamp(7px,0.7vw,10px);
  padding: clamp(8px,0.76vw,11px) clamp(18px,2.01vw,29px); border-radius: var(--btn-radius);
  background:#fff; color:#000; font-size: clamp(13px,1.11vw,16px); font-weight:500; font-family:inherit;
  cursor:pointer; }
.btn__arrow { width:8px; height:8px; }
.btn--header { background:#fff; color:#000; opacity:0; transform: scale(0); animation: buttonBounce 0.9s cubic-bezier(0.16,1,0.3,1) 0.5s forwards; }
.btn--footer { background:#fff; color:var(--dark-text); opacity:0; transform: scale(0); animation: buttonBounce 0.9s cubic-bezier(0.16,1,0.3,1) 0.7s forwards; }
body:not(.is-ready) .btn--header, body:not(.is-ready) .btn--footer { animation-play-state: paused !important; }
@keyframes buttonBounce { 0%{transform:scale(0);opacity:0;} 60%{transform:scale(1.1);opacity:1;} 100%{transform:scale(1);opacity:1;} }
@keyframes buttonBounce_2 { 0%{transform:scale(0);opacity:0;} 60%{transform:scale(1);opacity:1;} 100%{transform:scale(1);opacity:1;} }

/ ===== HERO HEADING ===== /
.hero__heading { position:absolute; left: var(--page-pad); top: 24%; width: clamp(440px,57vw,900px); z-index:5;
  font-size: clamp(44px,4.5vw,74px); line-height:1.11; font-weight:500; letter-spacing:-0.02em; }
body:not(.is-ready) .heroheading, body:not(.is-ready) .herolabel, body:not(.is-ready) .hero__desc { opacity:0; }
body.is-ready .heroheading, body.is-ready .herolabel, body.is-ready .hero__desc { opacity:1; }
.hero__line { display:block; overflow:hidden; line-height:1.15; }
.hero__line-inner { display:inline-block; white-space:nowrap; }
.hero__heading em { font-style: italic; font-weight: 700; }
.hero__heading strong { font-weight: 700; }
.hero__science { font-style: italic; font-weight: 700; }
.hero__char { display:inline-block; transform: translateY(110%); opacity:0;
  animation: charReveal 0.65s cubic-bezier(0.16,1,0.3,1) forwards; }
body:not(.is-ready) .hero__char { animation-play-state: paused !important; }
@keyframes charReveal { to { transform: translateY(0); opacity:1; } }

/ ===== SIDE NAV ===== /
.side-nav { position:absolute; right: var(--page-pad); top:55%; transform: translateY(-50%); z-index:5;
  display:flex; flex-direction:column; gap: clamp(10px,1.1vw,16px); align-items:flex-end; }
.side-nav__link { font-size: clamp(13px,1.1vw,16px); font-weight:500; color:#fff;
  display:inline-flex; align-items:center; gap: clamp(7px,0.7vw,10px); transition: color 0.2s ease; }
.side-nav__link--active { color:#ececec; }
.side-nav__link-text { display:inline-block; opacity:0; transform: translateY(14px);
  animation: navTextReveal 0.6s cubic-bezier(0.16,1,0.3,1) forwards; }
body:not(.is-ready) .side-navlink-text, body:not(.is-ready) .side-navline { animation-play-state: paused !important; opacity:0; }
.side-navlink:nth-child(1) .side-navlink-text { animation-delay:0.5s; }
.side-navlink:nth-child(2) .side-navlink-text { animation-delay:0.7s; }
.side-navlink:nth-child(3) .side-navlink-text { animation-delay:0.9s; }
.side-navlink:nth-child(4) .side-navlink-text { animation-delay:1.1s; }
.side-navlink:nth-child(5) .side-navlink-text { animation-delay:1.3s; }
.side-nav__line { display:inline-block; width:13.5px; height:1px; background:#fff; opacity:0;
  animation: navTextReveal 0.6s cubic-bezier(0.16,1,0.3,1) 0.5s forwards; }
@keyframes navTextReveal { to { opacity:1; transform: translateY(0); } }

/ ===== HERO BOTTOM ===== /
.hero__bottom { position:absolute; left:var(--page-pad); right:var(--page-pad); bottom:0; z-index:5;
  display:grid; grid-template-columns: 1fr auto; grid-template-rows: auto auto auto;
  gap: clamp(6px,0.7vw,10px) clamp(20px,2.8vw,40px);
  padding-bottom: clamp(20px,3vh,36px); align-items: end; }
.hero__label { grid-column:1; grid-row:1; font-size: clamp(14px,1.25vw,18px); font-weight:500; }
.hero__desc { grid-column:1; grid-row:2; max-width: clamp(300px,32vw,462px);
  color: rgba(255,255,255,0.5); font-size: clamp(13px,1.1vw,18px); line-height:1.4; }
.hero__actions { grid-column:1; grid-row:3; display:flex; align-items:center; gap: clamp(14px,1.67vw,24px); }

.about-card { grid-column:2; grid-row: 1 / span 3; align-self:end;
  display:flex; width: clamp(260px,25.7vw,370px); background:#fff;
  border-radius: var(--card-radius); overflow:hidden; transform: scale(0); opacity:0;
  animation: buttonBounce_2 0.9s cubic-bezier(0.16,1,0.3,1) 1.2s forwards;
  transition: transform 0.25s ease, box-shadow 0.25s ease; }
body:not(.is-ready) .about-card { animation-play-state: paused !important; }
.about-card:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,0,0,0.2); }
.about-card__image { width: clamp(130px,15vw,191px); flex-shrink:0; padding: clamp(4px,0.49vw,7px); }
.about-card__image img { width:100%; height:100%; object-fit:cover; border-radius: var(--card-radius); }
.about-card__content { flex:1; padding: clamp(12px,1.32vw,19px) clamp(10px,1.1vw,16px) clamp(10px,1.1vw,16px) clamp(5px,0.56vw,8px);
  display:flex; flex-direction:column; justify-content:space-between; }
.about-card__title { font-size: clamp(11px,0.97vw,14px); font-weight:700; color:#000; margin-bottom: clamp(4px,0.42vw,6px); }
.about-card__text  { font-size: clamp(10px,0.83vw,12px); font-weight:400; color: rgba(0,0,0,0.6); line-height:1.4; margin-bottom: clamp(8px,0.97vw,14px); }
.about-card__arrow { width: clamp(50px,5.35vw,77px); height: clamp(9px,0.9vw,13px); align-self:flex-end;
  color: rgba(0,0,0,0.2); transition: color 0.2s ease; }
.about-card:hover .about-card__arrow { color: rgba(0,0,0,0.6); }

/ ===== SCROLL DOWN ===== /
.scroll-down { display:inline-flex; align-items:center; gap:8px; cursor:pointer;
  opacity:0; transform: scale(0); animation: buttonBounce 0.9s cubic-bezier(0.16,1,0.3,1) 1.4s forwards; background:none; }
body:not(.is-ready) .scroll-down { animation-play-state: paused !important; }
.scroll-down__text { font-family:"Inter Tight",sans-serif; font-size: clamp(14px,1.25vw,18px); font-weight:700; letter-spacing:-0.18px;
  background: linear-gradient(90deg, #fff -7.5%, rgba(255,255,255,0) -7.49%, #fff 48.59%, #fff 48.61%, rgba(255,255,255,0) 107%);
  -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.scroll-down__circle { width: clamp(20px,1.8vw,26px); height: clamp(20px,1.76vw,25.3px); border-radius:50%;
  border: 1px solid rgba(255,255,255,0.3); display:inline-flex; align-items:center; justify-content:center;
  overflow:hidden; color:#fff; transition: border-color 0.2s ease; flex-shrink:0; }
.scroll-down:hover .scroll-down__circle { border-color:#fff; }
.scroll-down__circle svg { width:7.222px; height:8.667px; animation: arrowScroll 2.5s cubic-bezier(0.4,0,0.7,1) infinite; }
@keyframes arrowScroll {
  0%   { transform: translateY(0);   opacity:1; }
  38%  { transform: translateY(9px); opacity:0; }
  39%  { transform: translateY(-9px); opacity:0; }
  60%  { transform: translateY(0);   opacity:1; }
  100% { transform: translateY(0);   opacity:1; }
}

/ ===== RESPONSIVE (desktop only) ===== /
@media (max-width: 1360px) { .hero__heading { top: 21%; } }
@media (max-width: 1200px) {
  .header { padding-top: clamp(14px,1.4vw,18px); padding-bottom: clamp(14px,1.4vw,18px); }
  .side-nav { top: 52%; }
  .hero__heading { top: 20%; }
}
@media (max-width: 1100px) {
  .hero__heading { top: 18%; }
  .hero__blur { height: 30%; }
}
```

## ANIMATION TIMELINE (IN SECONDS, STARTS AFTER BODY GAINS CLASS "IS-READY")

- 0.10S LOGO CIRCLE: SCALE(0→1) OPACITY(0→1), 0.4S, EASING CUBIC-BEZIER(0.34,1.56,0.64,1) (SPRINGY).
- 0.20S NAV-PILL: SCALEX(0→1) OPACITY(0→1), 0.6S, EASE CUBIC-BEZIER(0.16,1,0.3,1).
- 0.30S HEADLINE LINES: EACH CHARACTER IS WRAPPED IN SPAN.HERO__CHAR AND SLIDES UP FROM TRANSLATEY(110%) OPACITY 0→1, WITH DELAY = LINEDELAY + CHARINDEX*0.038S; LINE GAP BETWEEN HEADLINE LINES = 0.85S; FOR THE LABEL AND DESCRIPTION LINE GAP = 0.65S, BASE DELAY 0.30S.
- 0.50S HEADER "BOOK A CALL" BUTTON: BOUNCE-IN (SCALE 0→1.1→1), 0.9S. WHITE BACKGROUND (#FFF), BLACK TEXT (#000). NO HOVER EFFECT.
- 0.55S OUTER LOGO ARCS (1A/1B): STROKE-DASHOFFSET 100→0 + TRANSLATEX(-14→0), 0.65S.
- 0.75S/0.83S/0.91S/0.99S NAV-PILL LINKS CASCADE IN: TRANSLATEY(14→0) OPACITY(0→1), 0.65S EACH.
- 0.70S FOOTER "DISCUSS THE PROJECT" BUTTON: BOUNCE-IN (SCALE 0→1→1), 0.9S. WHITE BACKGROUND (#FFF), DARK TEXT (VAR(--DARK-TEXT) = #22282B). NO HOVER EFFECT.
- 1.20S ABOUT-CARD: SCALE(0→1) OPACITY(0→1), 0.9S.
- 1.25S FAR LOGO ARCS (2A/2B): STROKE-DASHOFFSET 100→0 + TRANSLATEX(-14→0), 0.5S.
- 1.25S LOGO "KUBRIC™" TEXT-GROUP: OPACITY 0→1 + FILTER BLUR(10PX→0) + TRANSLATEX(28→0), 1.9S.
- 1.40S SCROLL-DOWN PILL: BOUNCE-IN (SCALE 0→1.1→1), 0.9S.
- 0.50S + 0.2S/LINK SIDE-NAV LINKS CASCADE IN; THE SMALL WHITE LINE UNDER THE ACTIVE LINK REVEALS AT 0.50S; THE SCROLL-DOWN CHEVRON LOOPS EVERY 2.5S (DOWN THEN WARPS BACK UP — OPACITY DIPS 38→39%).

## JS BEHAVIOR (SRC/ROUTES/INDEX.TSX)

- USEREF ON .HERO AND .HERO__VIDEO.
- ON MOUNT: DEFINE CHAR_STEP=0.038. FUNCTION ANIMATELINES(SELECTOR, BASEDELAY, LINEGAP) WALKS EVERY TEXT NODE INSIDE EACH MATCHED .HEROLINE-INNER, SPLITS EACH CHARACTER INTO <SPAN CLASS="HEROCHAR"> WITH ANIMATIONDELAY = LINEDELAY + CHARCOUNT*CHAR_STEP, PRESERVES SPACES AS PLAIN TEXT NODES (NOT WRAPPED IN SPAN).
- STARTANIMATIONS(): ADDS CLASS "IS-READY" TO BODY, THEN ANIMATELINES(".HEROHEADING .HEROLINE-INNER", 0.3, 0.85), (".HEROLABEL .HEROLINE-INNER", 0.3, 0.65), (".HERODESC .HEROLINE-INNER", 0.3, 0.65). IDEMPOTENT VIA A "STARTED" FLAG.
- VIDEO: AUTOPLAY+MUTED+LOOP+PLAYSINLINE+PRELOAD="AUTO". USE <SOURCE> CHILD ELEMENT, NOT SRC ON <VIDEO> DIRECTLY. CALL VIDEO.PLAY().CATCH(()=>{}) EXPLICITLY ON MOUNT. ON "TIMEUPDATE", IF CURRENTTIME >= 10S, REWIND TO 0 AND PLAY. CALL STARTANIMATIONS WHEN READYSTATE>=4 OR ON CANPLAYTHROUGH (ONCE). HARD FALLBACK: SETTIMEOUT(STARTANIMATIONS, 5000).
- ALL A[HREF^="#"] DO SMOOTH SCROLL TO TARGET VIA WINDOW.SCROLLTO({TOP, BEHAVIOR:"SMOOTH"}).
- #SCROLLDOWN BUTTON SCROLLS BY WINDOW.INNERHEIGHT.
- .SIDE-NAVLINK CLICK TOGGLES .SIDE-NAVLINK--ACTIVE AND DYNAMICALLY APPENDS/REMOVES <SPAN CLASS="SIDE-NAV__LINE"> SO THE WHITE UNDERLINE MARKER FOLLOWS THE ACTIVE ITEM.
- CLEANUP ALL LISTENERS AND REMOVE "IS-READY" ON UNMOUNT.

## METADATA (ROUTE HEAD FOR "/")

- TITLE: "Kubric™"
- DESCRIPTION: "Kubric™ — science-driven design that drives productivity and increases revenue."
- OG:TITLE: "Kubric™"
- OG:DESCRIPTION: "Science-driven design that drives productivity and increases revenue."
- FONTS: PRECONNECT TO FONTS.GOOGLEAPIS.COM AND FONTS.GSTATIC.COM (CROSSORIGIN ANONYMOUS), THEN LOAD INTER TIGHT FROM https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,300;0,400;0,500;0,700;0,800;1,400;1,700&display=swap

## ASSETS (EXTERNAL CDN — DO NOT BUNDLE)

- VIDEO: https://qclay.design/lovable/kubric/body.mp4
- CARD IMAGE: https://qclay.design/lovable/kubric/card-image.png  ALT="PINK TULIP CLOSEUP"

## COLOR / TYPOGRAPHY SUMMARY

- BACKGROUND #1E1E1E. PRIMARY TEXT #FFF. MUTED TEXT RGBA(255,255,255,0.749). DARK TEXT #22282B (FOOTER BUTTON LABEL).
- FONT FAMILY EVERYWHERE: "INTER TIGHT". HEADLINE WEIGHT 500 WITH ITALIC-BOLD (EM → 700 ITALIC) ACCENT ON "SCIENCE". BUTTONS WEIGHT 500. LOGO "KUBRIC" WEIGHT 700, ™ WEIGHT DEFAULT 400 AT SIZE 20.
- HEADLINE LETTER-SPACING -0.02EM, FONT-SIZE CLAMP(44PX,4.5VW,74PX), LINE-HEIGHT 1.11.
- ABOUT-CARD: WHITE BG, 4PX RADIUS, DARK TEXT. TITLE 700 BLACK, BODY RGBA(0,0,0,0.6).
- NAV-PILL: GLASS — 1.091PX BORDER RGBA(255,255,255,0.1), GRADIENT LINEAR-GRADIENT(12DEG, RGBA(255,255,255,0.06) -43.16%, RGBA(255,255,255,0) 103.95%) OVER RGBA(255,255,255,0.01), BACKDROP-FILTER BLUR(7PX), BOX-SHADOW 0 4PX 24PX RGBA(0,0,0,0.18), BORDER-RADIUS 1090.909PX (FULL PILL).
- BADGE "3": 18×18 CIRCLE RGBA(255,255,255,0.08), TEXT RGBA(255,255,255,0.749), FONT-SIZE UP TO 15PX WEIGHT 500.
- BUTTONS (.BTN--HEADER AND .BTN--FOOTER): SOLID WHITE BACKGROUND (#FFF), NO TRANSPARENCY, NO GLASSMORPHISM. BTN--HEADER TEXT COLOR #000. BTN--FOOTER TEXT COLOR #22282B (VAR(--DARK-TEXT)). NO HOVER ANIMATION ON BUTTONS.

## RULES TO PRESERVE WHEN BUILDING

1. NEVER HAND-WRITE -WEBKIT-BACKDROP-FILTER — LIGHTNING CSS WILL COLLAPSE IT AND BREAK CHROME. USE ONLY STANDARD BACKDROP-FILTER.
2. LOAD INTER TIGHT VIA <LINK> ONLY — NEVER @IMPORT A URL INSIDE SRC/STYLES.CSS.
3. DO NOT INTRODUCE SHADCN VARIANTS FOR NAV/BUTTONS/CARD — THEY ARE PLAIN CSS CLASSES.
4. KEEP MIN-WIDTH: 1024PX ON HTML (DESKTOP-ONLY DESIGN).
5. BODY MUST NOT HAVE CLASS "IS-READY" ON INITIAL RENDER; THE JS ADDS IT AFTER VIDEO READYSTATE>=4 (OR AFTER 5S FALLBACK). ALL KEYFRAME-DRIVEN ELEMENTS HAVE ANIMATION-PLAY-STATE: PAUSED WHILE BODY:NOT(.IS-READY).
6. KEEP THE 8 .HERO__BLUR-LAYER DIVS — THE PROGRESSIVE BLUR IS ACHIEVED BY STACKING 8 BACKDROP-FILTER LAYERS WITH STEPPED BLUR RADII AND STEPPED LINEAR-GRADIENT MASKS (SEE CSS).
7. THE HEADLINE CHARACTERS ANIMATION MUST BE GENERATED AT RUNTIME BY WALKING TEXT NODES AND WRAPPING EACH CHAR IN <SPAN CLASS="HERO__CHAR"> WITH A CALCULATED ANIMATIONDELAY; DO NOT PRE-SPLIT IN JSX.
8. THE ABOUT-CARD IMAGE SRC AND THE VIDEO SRC ARE REMOTE CDN URLS (QCLAY.DESIGN) — KEEP THEM AS-IS.
9. BUTTONS MUST BE WHITE: THE GLOBAL RESET SETS BUTTON{BACKGROUND:NONE}. THIS DOES NOT APPLY TO .BTN — CLASS SELECTOR BEATS TAG SELECTOR. BUT TO BE SAFE, .BTN--HEADER AND .BTN--FOOTER BOTH EXPLICITLY SET BACKGROUND:#FFF. DO NOT MAKE BUTTONS TRANSPARENT, GLASS, OR ANY OTHER STYLE. THEY ARE SOLID WHITE RECTANGLES WITH ROUNDED CORNERS.
10. NO HOVER ANIMATION ON BUTTONS. .BTN HAS NO :HOVER RULE. BUTTONS DO NOT MOVE, LIFT, OR GLOW ON HOVER.

END OF PROMPT.
