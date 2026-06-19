# REAL MAGIC — HORIZONTAL TICKER-TAPE SCROLL

## ORIGINAL PROMPT (VERBATIM)

CREATE A HORIZONTAL SCROLL ANIMATION USING GSAP SCROLLTRIGGER.

LAYOUT: INSTEAD OF FULL-SCREEN SLIDES, I WANT A CONTINUOUS HORIZONTAL TEXT FLOW — IMAGINE A SINGLE, VERY LONG SENTENCE. STRUCTURE: USE A SINGLE FLEX CONTAINER SO ITEMS FLOW NATURALLY NEXT TO EACH OTHER WITH VARIABLE GAPS.

CONTENT: THE SENTENCE IS 'IN EVERY BOTTLE, DISCOVER THE UNDENIABLE REAL MAGIC OF SHARING PURE REFRESHMENT THAT BRINGS US TOGETHER'.

INTEGRATION: EMBED THE VISUAL ELEMENTS (SVG CURVES, ICONS) INLINE WITH THE TEXT, ACTING LIKE PUNCTUATION OR CONJUNCTIONS, RATHER THAN SEPARATING THEM INTO THEIR OWN DISTINCT SECTIONS.

VIBE: IT SHOULD FEEL LIKE READING A REALLY LONG TICKER TAPE, NOT FLIPPING THROUGH A SLIDE DECK.

---

## NOTE ON THIS REPRODUCTION

THE REQUEST CAME WITH A LIVE SUPERDESIGN PREVIEW LINK
(`COMPONENT-A4E5F1B5-…PREVIEW.SUPERDESIGN.DEV`). THAT HOST IS BLOCKED BY THE
BUILD ENVIRONMENT'S NETWORK EGRESS ALLOWLIST (`X-DENY-REASON: HOST_NOT_ALLOWED`,
HTTP 403 FOR CURL, WEBFETCH, NODE FETCH, AND HEADLESS CHROMIUM ALIKE), SO THE
ORIGINAL COULD NOT BE OPENED, SCRAPED, OR FFPROBE'D. THE BUILD BELOW IS A
FAITHFUL IMPLEMENTATION OF THE PROMPT ABOVE. THE FOLLOWING IMPLEMENTATION SPEC
CAPTURES EVERY LOAD-BEARING DETAIL SO THIS `PROMPT.MD` REPRODUCES THE SAME
OUTPUT WHEN HANDED TO OPUS.

---

## IMPLEMENTATION SPEC (SAME-TO-SAME REPRODUCTION)

### STACK & FILES

- Plain static site, **no build step**. Files: `index.html`,
  `assets/css/style.css`, `assets/js/ticker.js`.
- **GSAP 3.12.5 + ScrollTrigger**, both **vendored locally** under
  `assets/js/gsap.min.js` and `assets/js/ScrollTrigger.min.js` (no CDN).
- Fonts vendored locally as woff2 under `assets/fonts/`: **Anton** (heavy
  condensed grotesque, used for the running uppercase words) and **Instrument
  Serif** regular + italic (used for the faint connective words and the script
  accent words). `@font-face` with `font-display: swap`.
- Color system (Coca-Cola "Real Magic"): stage + page background `--red:#f40009`,
  deeper `--red-deep:#c2070d`, ink `--cream:#fff7ef`. The whole stage is full
  flat red; contrast comes only from the cream type.

### THE SINGLE FLEX LINE (CORE STRUCTURE)

One `<div class="line" id="line">` is the **only** scrolling element. Every
word, accent word and inline glyph is a **direct child** so they share one
continuous baseline:

```css
.line {
  display: flex;
  flex-wrap: nowrap;      /* never wraps — it is one infinite line */
  align-items: baseline;
  white-space: nowrap;
  will-change: transform;
  padding: 0 14vw;        /* runway so first/last items breathe at edges */
  column-gap: clamp(20px, 3vw, 64px);  /* base gap; per-item margins vary it */
}
```

Word sizing: `--line-h: clamp(96px, 20vw, 280px)`; base `.word` uses Anton at
`var(--line-h)`, `line-height:.86`, uppercase, `letter-spacing:-.01em`.

**Variable gaps** are produced by per-item margins on top of `column-gap` — this
is what makes the line feel hand-set rather than uniformly spaced. Key rules:

- `.w-faint` (the connective words `the / of / that / us`, and the leading
  `In`): Instrument Serif **italic, lowercase**, `~0.62×` line height, color
  `rgba(255,247,239,.42)`, **negative** horizontal margin
  `0 calc(var(--line-h) * -0.06)` so they hug the surrounding nouns.
- `.accent--script` (`Real`, `Refreshment`): Instrument Serif **italic**,
  `1.08×`, normal case, extra side air `clamp(8px,1.5vw,28px)`.
- `.accent--huge` (`Magic`, `Together`): `1.18×`, **outline only** via
  `-webkit-text-stroke: 2px var(--cream); color: transparent;` and a wider
  right margin `clamp(24px,4vw,80px)` — the hollow words are the rhythm breaks.

### THE SENTENCE (EXACT ORDER)

`In · every · [bottle glyph] · bottle, · [bubbles glyph] · discover · the ·
undeniable · Real · Magic · [ribbon glyph] · of · sharing · [drop glyph] ·
pure · Refreshment · [cheers glyph] · that · brings · us · Together · [heart
glyph] · ·` (trailing middle-dot as an end-stop). The readable sentence is
exactly: **"In every bottle, discover the undeniable Real Magic of sharing pure
Refreshment that brings us Together"**.

### INLINE SVG GLYPHS (PUNCTUATION / CONJUNCTIONS)

All glyphs are inline `<span class="glyph">` wrapping an inline SVG that draws
in `currentColor` (cream) and is sized in `em` so it scales with the type. They
flow **inside** the line — never their own section. Each has its own variable
margin. The set:

- **bottle** (contour Coca-Cola bottle outline, `height:1.5em`) after `every`.
- **bubbles** (5 rising carbonation circles, `1.7em`, nudged up `-0.18em`) after
  `bottle,` — reads like an ellipsis.
- **ribbon** (the signature dynamic swoosh, a cubic/smooth `C…S…` path with
  `stroke-width:6`, `1.4em`) after `Magic`.
- **drop** (teardrop splash, `1.5em`) after `sharing`.
- **cheers** (two bottles rotated ∓16° with a contact spark, `1.8em`) after
  `Refreshment`.
- **heart** (filled heart full-stop, `1.3em`) after `Together`.

### GSAP SCROLLTRIGGER (CORE ANIMATION)

`gsap.registerPlugin(ScrollTrigger)`. The stage (`.stage`, `height:100vh;
overflow:hidden; display:flex; align-items:center`) is **pinned**; vertical
scroll distance maps 1:1-ish to the line's horizontal travel:

```js
const travel = Math.max(0, line.scrollWidth - window.innerWidth);
gsap.to(line, {
  x: -travel,
  ease: "none",
  scrollTrigger: {
    trigger: stage,
    start: "top top",
    end: () => "+=" + travel * 1.15,   // 1.15× makes the read feel a touch longer
    pin: true,
    scrub: 0.6,                         // smoothed scrub (true for reduced-motion)
    anticipatePin: 1,
    invalidateRefresh: true,
    onUpdate: (self) => { progressFill.style.width = (self.progress*100)+"%"; },
  },
});
```

- A subtle **depth parallax**: each `.accent` word also tweens `xPercent ±6`
  (alternating sign) on a second `scrub:1` ScrollTrigger over the same range.
- Boot waits for `document.fonts.ready` (so `scrollWidth` is measured with the
  real fonts) with a 1200ms safety-net fallback; `resize` rebuilds the tween via
  `requestAnimationFrame` + `ScrollTrigger.refresh()`.

### IDLE, SCROLL-INDEPENDENT GLYPH MOTION (NEVER FROZEN)

Looping GSAP tweens, all `repeat:-1, yoyo:true`, independent of scroll:

- bubbles: each circle `y:14→-10`, `opacity:0→.9`, `2.2 + i*0.35s`,
  `sine.inOut`, staggered `delay:i*0.4`.
- ribbon: `strokeDasharray = getTotalLength()`, animate `strokeDashoffset
  len→0`, `2.4s power2.inOut`, `repeatDelay:1.1` — the swoosh self-draws.
- cheers spark: `scale .6→1.15`, `opacity .2→1`, `.9s power1.inOut`.
- heart: `scale 1→1.12`, `.6s`, `repeatDelay:.7` — a heartbeat.
- drop: `y 0→6`, `1.8s sine.inOut` bob.

Respect `prefers-reduced-motion`: skip idle loops and use `scrub:true`.

### CHROME, PROGRESS & OUTRO

- Fixed `.chrome` header: brand mark (white disc + red swoosh SVG) + italic
  serif wordmark `real magic` on the left; right side `EST. 1886 · SCROLL TO
  READ` in letter-spaced uppercase serif.
- Fixed bottom progress bar (`.progress` 4px track, `.progress__fill` cream)
  driven by `self.progress`.
- `.caption` pinned bottom-left: big Anton `01` + italic serif "a single
  sentence, read sideways".
- Fixed `.grain` (feTurbulence SVG noise, `opacity:.06`, `mix-blend:overlay`)
  and `.vignette` (radial darkening) overlays.
- After the pin releases, a quiet `.outro` section (≥100vh, red→deep-red radial)
  with kicker "the end of the line", giant Anton "Open happiness." and serif sub
  "In every bottle, the same undeniable Real Magic."
