# PELMATECH LANDING PAGE — PROJECT PROMPT

BUILD A SINGLE-PAGE REACT + TANSTACK START + TYPESCRIPT + TAILWIND V4 APP (SHADCN-UI BASE) THAT EXACTLY RECREATES THE PELMATECH LANDING PAGE DESCRIBED BELOW. USE MOTION/REACT (FRAMER-MOTION) AND LUCIDE-REACT. IMPLEMENT THE PAGE INSIDE `SRC/ROUTES/INDEX.TSX` WITH HELPER COMPONENTS IN `SRC/COMPONENTS/`. USE THE EXACT PIXEL VALUES, FONTS, COLORS, AND ANIMATION TIMINGS LISTED. DO NOT INVENT EXTRA DESIGN TOKENS.

---

## PROJECT NAME

```
projectname/  (Pelmatech — Your Personal Health Companion)
```

---

## FILE / FOLDER STRUCTURE

```
src/
  assets/
    blur-doctor.png        (PORTRAIT OF A DOCTOR, SOFT BACKGROUND BLUR — USED IN TEAM CAROUSEL)
    happy-doctor.png       (SMILING DOCTOR PORTRAIT — USED IN TEAM CAROUSEL)
    young-doctor.png       (YOUNG DOCTOR PORTRAIT — USED IN TEAM CAROUSEL)
    doctor-computer.png    (HERO FULL-BLEED PHOTO OF A DOCTOR AT A COMPUTER)
    clock-lamp.png         (STILL LIFE: CLOCK + LAMP — BENEFITS CARD 01 "UNAVAILABLE")
    pills.png              (STILL LIFE: PILLS — BENEFITS CARD 02 "UNETHICAL")
    waitlist.png           (STILL LIFE: WAITING ROOM — BENEFITS CARD 03 "WAITLIST")
    logo.svg               (WHITE PELMATECH WORDMARK+ICON, USED ON DARK HERO)
    logo-dark.svg          (BLACK PELMATECH WORDMARK+ICON, SWAPPED IN ONCE USER SCROLLS PAST HERO)
  components/
    Header.tsx
    AnimatedHeading.tsx    (EXPORTS AnimatedHeading, AnimatedText, MaskedImage)
    TeamCarousel.tsx
    ui/                    (DEFAULT SHADCN PRIMITIVES, UNTOUCHED)
  routes/
    __root.tsx             (ROOT SHELL, HEAD, RESPONSIVE-ZOOM SCRIPT, QUERYCLIENTPROVIDER, OUTLET)
    index.tsx              (HERO + TEAMSECTION + BENEFITSSECTION)
  styles.css               (TAILWIND V4 ENTRY + DESIGN TOKENS)
```

ALL IMAGES ABOVE ARE REFERENCED BY `import x from "@/assets/<file>"`. A ZIP WITH EVERY ASSET IS SHIPPED ALONGSIDE THIS PROMPT.

---

## GLOBAL SETUP

- TAILWIND V4 VIA `@import "tailwindcss" source(none);` AND `@source "../src";` IN `SRC/STYLES.CSS`. ALSO `@import "tw-animate-css";`.
- GOOGLE FONTS ARE LOADED IN `__ROOT.TSX` `head()` VIA A `<link rel="stylesheet">` TO:
  `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Inter+Tight:wght@400;500;600&display=swap`
- PAGE FONT STACK DEFAULTS TO `"Helvetica Neue", Helvetica, Arial, sans-serif` (SET ON BODY VIA THE `--font-sans` TOKEN).
- HEADINGS (H1..H4) USE THE SAME `--font-display` STACK WITH `letter-spacing: -0.025em`.
- A SECOND FONT STACK NAMED `"TT Hoves"` IS USED IN THE TEAMSECTION AND TEAMCAROUSEL VIA INLINE STYLE:
  `fontFamily: '"TT Hoves", "Helvetica Neue", Helvetica, Arial, sans-serif'`
- BACKGROUND OF `<body>`: `var(--background)`.
- `html { scroll-behavior: smooth; }`
- ALL BORDERS INHERIT `var(--color-border)` VIA `* { border-color: var(--color-border); }`.
- `-webkit-font-smoothing: antialiased` ON BODY.

DESIGN TOKENS (IN `:root`, DEFINED IN OKLCH):

```
  --background:        oklch(0.97 0.005 100);   / NEAR-WHITE, VERY SLIGHT WARM /
  --foreground:        oklch(0.18 0.01 100);    / NEAR-BLACK /
  --muted:             oklch(0.93 0.005 100);
  --muted-foreground:  oklch(0.45 0.01 100);
  --surface:           oklch(0.94 0.005 100);   / BENEFITS SECTION BACKGROUND /
  --accent:            oklch(0.55 0.12 155);
  --accent-foreground: oklch(0.98 0 0);
  --border:            oklch(0.88 0.005 100);
  --header-bg:         oklch(0.25 0.01 100 / 0.85);  / TRANSLUCENT PILL BG OF NAV /
```

`@theme inline` MAPS EACH `--color-*` TOKEN TO ITS VAR SO TAILWIND UTILITIES LIKE `bg-surface`, `text-muted-foreground` WORK.

---

## RESPONSIVE ZOOM (CRITICAL)

THE WHOLE DOCUMENT IS UNIFORMLY DOWNSCALED BELOW 1728PX USING CSS `zoom`. FROM 1728PX–1980PX (AND ABOVE) ZOOM IS 1 — LEAVE THE LAYOUT AT ITS NATIVE PIXEL SIZES.

IMPLEMENTATION IN `SRC/ROUTES/__ROOT.TSX`:

- INLINE `<script>` INJECTED IN SHELLCOMPONENT HEAD:

```js
    (function(){
      function u(){
        var w = document.documentElement.clientWidth;
        var z = w < 1728 ? w / 1728 : 1;
        document.documentElement.style.zoom = String(z);
      }
      u();
      window.addEventListener('resize', u);
    })();
```

- THE SAME LOGIC IS DUPLICATED INSIDE A `useEffect` IN ROOTCOMPONENT SO IT RE-APPLIES AFTER HYDRATION.

BECAUSE OF THIS ZOOM, ALL PIXEL VALUES BELOW ARE WRITTEN AT THE 1728PX REFERENCE WIDTH.

---

## LAYER / DOM HIERARCHY (TOP-LEVEL)

```html
<html>
  <head> head() meta, stylesheets, fonts, zoom script </head>
  <body>
    <div class="bg-background text-foreground">
      <Header />                    (fixed, z-50)
      <main>
        <Hero />                    (section, h-screen, dark photo)
        <TeamSection>               (section, white bg)
          <TeamCarousel intro={...} />
        </TeamSection>
        <BenefitsSection />         (section, bg-surface, 3-card grid)
      </main>
    </div>
  </body>
</html>
```

---

## 1) HEADER (`SRC/COMPONENTS/HEADER.TSX`)

- `<header>` FIXED, `top:24px` (`top-6`), `left:0`, `right:0`, `z-50`, HORIZONTAL PADDING 32PX (`px-8`), `flex items-center justify-between`.
- LEFT: `<img>` OF THE LOGO.
  - INITIAL SRC: `src/assets/logo.svg` (WHITE VERSION).
  - WHEN `window.scrollY > window.innerHeight - 80` THE SRC SWAPS TO `src/assets/logo-dark.svg` (BLACK VERSION).
  - `className="h-8 w-auto transition-opacity"`
  - DETECTION VIA A `scroll` LISTENER ATTACHED ON MOUNT (`passive: true`), REMOVED ON UNMOUNT.
- RIGHT: `<nav>` PILL CONTAINING NAV LINKS AND MENU BUTTON.
  - CLASSNAME: `flex items-center gap-1`, BACKGROUND: `var(--header-bg)` WITH `backdrop-blur-md`, `text-white`, `rounded-full`, `pl-2 pr-2 py-2`.
  - ITEMS ARRAY: `["Home", "Artists", "Releases", "Contact"]`. EACH IS AN `<a href="#">` WITH `px-5 py-2 text-sm rounded-full`.
    - THE FIRST ONE ("HOME") IS HIGHLIGHTED: `bg-white/10 font-medium`.
    - THE REST: `opacity-80 hover:opacity-100`, TRANSITION.
  - TRAILING BUTTON: `ml-2 flex items-center gap-2 px-4 py-2 text-sm rounded-full hover:bg-white/10`
    - CONTAINS `<Menu className="w-4 h-4" />` FROM LUCIDE-REACT AND THE LABEL "MENU".

---

## 2) HERO SECTION (`Hero` IN `SRC/ROUTES/INDEX.TSX`)

- `<section>` RELATIVE, `h-screen`, `min-h-[780px]`, `w-full`, `overflow-hidden`.
- BACKGROUND IMAGE: `<img src={doctor-computer.png} alt="Doctor working at computer" />` ABSOLUTE INSET-0 `w-full h-full object-cover`.
- TWO STACKED DARK OVERLAYS (THE SLIGHT DARKENING FILTER THE USER REQUESTED):
  1. `absolute inset-0 bg-black/25`
  2. `absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent`
- CONTENT WRAPPER: `absolute inset-0`, `flex flex-col`, `justify-end`, `pb-16`, `px-8 md:px-12`.

  BOTTOM CONTENT ROW: `flex items-end justify-between gap-8`.

  LEFT COLUMN (`max-w-3xl`):
    HEADLINE (`AnimatedHeading` AS H1, CLASSNAME `"text-white font-medium leading-[1.05]"`):

```jsx
      <span style={{ fontSize: "72.73px", lineHeight: 1.05, display: "block" }}>
        Your Personal<br />Health Companion
      </span>
```

    DESCRIPTION WRAPPER: `mt-8 w-max`, THEN `AnimatedText "text-white/85 max-w-xl leading-relaxed"`:

```jsx
      <span style={{ fontSize: "20.99px", lineHeight: "28.21px", display: "block", width: "608px" }}>
        Meet your personal online health companion — a comprehensive platform offering tools for tracking your fitness goals, monitoring your nutrition, and scheduling your workouts.
      </span>
```

  RIGHT COLUMN (`flex items-center gap-6 shrink-0 pb-1`):
    - PRIMARY CTA BUTTON:
      CLASSNAME: `"bg-white text-foreground rounded-full pl-6 pr-2 py-2 flex items-center gap-3 font-medium text-sm hover:bg-white/90 transition"`
      LABEL: "TRY FOR FREE"
      TRAILING CIRCULAR ICON BADGE:

```jsx
        <span className="w-9 h-9 rounded-full bg-foreground text-white flex items-center justify-center">
          <ArrowUpRight className="w-4 h-4" />
        </span>  (lucide-react ArrowUpRight)
```

    - SECONDARY LINK `<a href="#">` CLASSNAME `"text-white flex items-center gap-1 text-sm font-medium"`:
      "SCHEDULE DEMO " + `<ArrowUpRight className="w-4 h-4" />`.

- HERO FOOTER STRIP (UNDER THE HEADLINE ROW, `mt-12 pt-5`):
  CLASSNAME: `"border-t border-white/20 flex items-center justify-between tracking-[0.2em] text-white/70 uppercase"`
  INLINE STYLE `{ fontSize: "12px" }`
  THREE FLEX CHILDREN:
    1. "ENTERPRISE MANAGEMENT APPLICATIONS"
    2. ```jsx
       <span className="flex items-center gap-6">
         <span><span className="text-white">01</span> / 04</span>
         <span>Next</span>
       </span>
       ```
    3. "SCROLL TO EXPLORE"

---

## 3) TEAM SECTION (`TeamSection` IN `SRC/ROUTES/INDEX.TSX` + TEAMCAROUSEL)

- `<section>` `py-32`, `px-8 md:px-12`, FONTFAMILY TT HOVES STACK.
- HEADING BLOCK IS LEFT-PADDED BY EXACTLY `paddingLeft: "335.26px"` SO IT ALIGNS WITH THE LEFT EDGE OF THE FIRST DOCTOR CARD IN THE CAROUSEL BELOW.
- EYEBROW ROW (`mb-16`): `flex gap-24`, `tracking-[0.2em] uppercase`, COLOR `text-muted-foreground`, STYLE `{ fontSize: "11.26px", fontFamily: TT Hoves }`
    CHILDREN: `<span>Pelmatech</span><span>Our Team</span>`
- `AnimatedHeading "font-medium leading-[1.05]"`:

```jsx
    <span style={{ fontSize: "58.55px", lineHeight: 1.05, display: "block", fontFamily: TT Hoves }}>
      Get to Know the People<br />that Get It All Done
    </span>
```

- `mt-20` WRAPPER HOLDS `<TeamCarousel intro={...}>`:
  INTRO PROP = `AnimatedText "text-muted-foreground leading-relaxed"` CONTAINING:

```jsx
    <span style={{ fontSize: "16.89px", lineHeight: 1.5, display: "block", width: "270px", fontFamily: TT Hoves }}>
      On our platform, our devoted team works ceaselessly to enhance our online presence and ensure the best possible customer experience.
    </span>
```

### TEAMCAROUSEL (`SRC/COMPONENTS/TEAMCAROUSEL.TSX`)

- TEAM DATA (5 ENTRIES, ROLE UPPERCASE TRACKED):

```
    { img: blur-doctor.png,  role: "SURGEON GENERAL", name: "Dr. Helga Brooks"  }
    { img: happy-doctor.png, role: "PEDIATRICIAN",   name: "Dr. Kwame Mbeki"   }
    { img: young-doctor.png, role: "THERAPIST",      name: "Dr. Matteo Dubois" }
    { img: happy-doctor.png, role: "NEUROLOGIST",    name: "Dr. Hana Sato"     }
    { img: blur-doctor.png,  role: "CARDIOLOGIST",   name: "Dr. Aria Vance"    }
```

- CONSTANTS:

```
    INTRO_WIDTH = 324  (THE LEFT INTRO TEXT COLUMN; ~270px TEXT + ~54px RIGHT GAP; THIS ALSO FORCES THE FIRST CARD TO START AT x=335.26 TO MATCH THE HEADING)
    GAP = 11.26 (PIXEL GAP BETWEEN INTRO AND CARDS AND BETWEEN CARDS)
    visible = 3.25  (3 FULL CARDS + A SLIVER OF THE 4TH VISIBLE TO THE RIGHT)
    maxIndex = Math.max(0, Math.ceil(team.length - visible))
```

- OUTER WRAPPER: `relative`; `onMouseEnter`/`Leave` TOGGLE `hovered`.
- INNER ROW: `flex`, STYLE `{ gap: 11.26px }`.
- INTRO COLUMN: `shrink-0`, WIDTH 324PX, RENDERS THE `intro` NODE.
- VIEWPORT: `relative overflow-hidden flex-1 min-w-0`.
- TRACK: `<motion.div>` CLASSNAME `"flex"` WITH

```
    style.gap = 11.26
    style.width = `calc(${team.length} * ((100% - ${(visible-1)*GAP}px) / ${visible}) + ${(team.length-1)*GAP}px)`
    animate.x  = `calc(${-index} * (100% + ${GAP}px) / ${team.length})`
    transition { duration: 0.7, ease: [0.22,1,0.36,1] }
```

- EACH CARD: `shrink-0`, WIDTH = `calc((100% - ${(team.length-1)*GAP}px) / ${team.length})`, FONTFAMILY TT HOVES.
  - IMAGE WRAPPER: `aspect-[3/4] overflow-hidden bg-muted`; INSIDE `<MaskedImage src={m.img} alt={m.name} className="w-full h-full" delay={i*0.08} />`.
  - CAPTION `pt-6`:
    - `<p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">{role}</p>`
    - `<p className="text-xl mt-2 font-medium">{name}</p>`

- HOVER CONTROL (THE CENTRAL CIRCULAR ARROW PUCK), WRAPPED IN `<AnimatePresence>`:
  WHEN `hovered` TRUE, RENDER `<motion.div>` `absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10`, WITH
    `initial { opacity: 0, scale: 0.85 }`, `animate { opacity: 1, scale: 1 }`, `exit { opacity: 0, scale: 0.85 }`, `transition { duration: 0.25 }`.
  INSIDE IT: A CIRCULAR PILL `<div>`
    CLASSNAME `"flex items-center justify-center gap-4 rounded-full cursor-pointer"`
    STYLE `{ width: 126, height: 126, background: "rgba(72, 72, 72, 0.16)", backdropFilter: "blur(84px)", WebkitBackdropFilter: "blur(84px)" }`
  CONTAINING TWO `<button>`S WITH CLASSNAME `"flex items-center justify-center text-white disabled:opacity-30 transition cursor-pointer"`:
    - PREV: ARROWLEFT (`w-7 h-7`), DISABLED WHEN `index===0`, ONCLICK: `setIndex(i=>Math.max(0,i-1))`
    - NEXT: ARROWRIGHT (`w-7 h-7`), DISABLED WHEN `index>=maxIndex`, ONCLICK: `setIndex(i=>Math.min(maxIndex,i+1))`

---

## 4) BENEFITS SECTION (`BenefitsSection` IN `SRC/ROUTES/INDEX.TSX`)

- `<section>` `py-32 px-8 md:px-12 bg-surface`.
- TOP INTRO GRID (`mb-24`): `grid grid-cols-12 gap-12`.
  - LEFT COL (`col-span-12 md:col-span-7`): `AnimatedHeading "text-5xl md:text-6xl font-medium leading-[1.05]"`:
      `Explore the Benefits of<br />Our Platform`
  - RIGHT COL (`col-span-12 md:col-span-4 md:col-start-9 md:pt-4`): `AnimatedText "text-base text-muted-foreground leading-relaxed"`:
      `By choosing an online platform over an offline one, artists can reach a global audience more easily, connect with fans worldwide, and shape the future of music in a dynamic way.`

- 3-CARD GRID (`relative grid grid-cols-1 md:grid-cols-3`) WITH CUSTOM BORDERS:
  - TWO INTERIOR VERTICAL LINES (BETWEEN CARDS ONLY) DRAWN VIA THE WRAPPER'S BACKGROUNDIMAGE:

```
      backgroundImage:
        "linear-gradient(to right, rgba(255,255,255,0.45) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.45) 1px, transparent 1px)"
      backgroundSize: "1px 100%, 1px 100%"
      backgroundPosition: "33.3333% 0, 66.6666% 0"
      backgroundRepeat: "no-repeat"
```

  - TWO HORIZONTAL LINES (TOP + BOTTOM OF THE ROW) IMPLEMENTED AS `<span aria-hidden>`:

```
      pointer-events-none absolute left-0 right-0 top-0 (or bottom-0) h-px
      style background: "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.45) 15%, rgba(255,255,255,0.45) 85%, transparent 100%)"
```

    THE FADE-OUT NEAR THE EDGES IS INTENTIONAL — THE LINES MUST VANISH TOWARD THE SECTION'S LEFT/RIGHT EDGES.

  ITEMS ARRAY (IN ORDER):

```
    01 "Unavailable"  desc "We understand that there may be times when a doctor is not available to assist you." img clock-lamp.png
    02 "Unethical"    desc "When a doctor lacks integrity, they may prescribe medications for promotional purposes instead of the patient's actual needs, leading to serious consequences for health." img pills.png
    03 "Waitlist"     desc "Patients may experience long waiting times, sometimes for hours, before receiving assistance from the doctor." img waitlist.png
```

  EACH CARD: `p-10 flex flex-col gap-8`.
    - CARD 01 AND 03 LAYOUT: CONTENT ON TOP, IMAGE ON BOTTOM (IMAGE IS IN `<div className="mt-auto">`).
    - CARD 02 IS REVERSED: IMAGE ON TOP, CONTENT IN `<div className="mt-auto">`.

  CARD CONTENT BLOCK:

```jsx
    <div className="flex items-start gap-3 mb-4">
      <span className="text-xs text-muted-foreground mt-2">(01)</span>
      <AnimatedHeading as="h3" className="text-3xl font-medium" delay={i*0.1}>{title}</AnimatedHeading>
    </div>
    <AnimatedText className="text-sm text-muted-foreground leading-relaxed max-w-sm" delay={0.2 + i*0.1}>{desc}</AnimatedText>
```

  CARD IMAGE: `<div className="aspect-square overflow-hidden"><MaskedImage src={img} alt={title} className="w-full h-full" delay={i*0.12} /></div>`

---

## ANIMATION PRIMITIVES (`SRC/COMPONENTS/ANIMATEDHEADING.TSX`)

ALL ANIMATIONS USE MOTION/REACT.

`AnimatedHeading({ children, className, as: As="h2", delay=0 })`

```
  const MotionTag = motion(As)
  initial: { opacity: 0, y: 30, filter: "blur(12px)" }
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" }
  viewport: { once: true, margin: "-80px" }
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }
```

`AnimatedText({ children, className, delay=0.15 })`

```
  motion.p
  initial: { opacity: 0, y: 20 }
  whileInView: { opacity: 1, y: 0 }
  viewport: { once: true, margin: "-80px" }
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }
```

`MaskedImage({ src, alt, className, delay=0 })`

```
  motion.div wrapping <img className="w-full h-full object-cover" />
  initial: { clipPath: "inset(100% 0 0 0)" }       / FULLY CLIPPED FROM THE TOP /
  whileInView: { clipPath: "inset(0% 0 0 0)" }     / REVEAL DOWNWARD, UNMASKING FROM BOTTOM TO TOP /
  viewport: { once: true, margin: "-80px" }
  transition: { duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }
```

THESE THREE COMPONENTS ARE USED EVERYWHERE — EVERY HEADLINE, PARAGRAPH, AND IMAGE ON THE PAGE ENTERS WITH THESE EXACT ANIMATIONS.

---

## INTERACTIONS RECAP

- HERO CTAS HOVER: WHITE BUTTON DARKENS TO `white/90`; SECONDARY LINK NO HOVER STYLE.
- NAV LINKS HOVER: OPACITY 80% → 100%; FIRST LINK PERMANENTLY `bg-white/10`. MENU BUTTON HOVER `bg-white/10`.
- LOGO SWAP OCCURS WHEN `scrollY > innerHeight - 80` (I.E. ONCE YOU SCROLL PAST THE DARK HERO, THE LOGO TURNS BLACK).
- TEAMCAROUSEL: HOVERING THE CAROUSEL AREA SHOWS THE CENTRAL 126PX CIRCULAR BLURRED PUCK WITH TWO ARROWS; CURSOR BECOMES POINTER OVER THE PUCK AND EACH BUTTON; CLICKING ARROWS SLIDES THE TRACK HORIZONTALLY WITH CUBIC EASE `(0.22, 1, 0.36, 1)` OVER 0.7S. `visible=3.25` KEEPS THE NEXT CARD PEEKING ON THE RIGHT.
- BENEFITSSECTION BORDERS USE `rgba(255,255,255,0.45)`. VERTICALS ONLY SPAN BETWEEN CARDS; HORIZONTALS FADE TO TRANSPARENT AT THE SECTION EDGES.
- `prefers-reduced-motion` IS NOT SPECIALLY HANDLED; FRAMER-MOTION RESPECTS USER OS SETTINGS BY DEFAULT.

---

## PACKAGES

- `@tanstack/react-router`, `@tanstack/react-start`, `@tanstack/react-query`
- `motion` (USED AS `motion/react`)
- `lucide-react` (ICONS USED: Menu, ArrowUpRight, ArrowLeft, ArrowRight)
- `tailwindcss` V4, `tw-animate-css`
- ALL SHADCN-UI PRIMITIVES UNDER `src/components/ui/` STAY AT DEFAULTS; ONLY BUTTON HAS THE STANDARD CVA VARIANTS.

---

## ICONS USED (LUCIDE-REACT)

- `Menu`          → NAV "MENU" BUTTON
- `ArrowUpRight`  → HERO "TRY FOR FREE" BADGE AND "SCHEDULE DEMO" LINK
- `ArrowLeft`     → CAROUSEL PREVIOUS
- `ArrowRight`    → CAROUSEL NEXT

---

## ASSETS BUNDLE

ALL ASSETS REFERENCED ABOVE ARE PROVIDED IN `pelmatech-assets.zip`:

```
  blur-doctor.png, happy-doctor.png, young-doctor.png,
  doctor-computer.png, clock-lamp.png, pills.png, waitlist.png,
  logo.svg (white), logo-dark.svg (black).
```

DROP THEM INTO `src/assets/` AND IMPORT WITH `@/assets/<filename>`.

FOR EVERY ASSETS USE THIS URL: `qclay.design/lovable/pelmatech/`

I'VE PUTTED EVERYTHING THERE
