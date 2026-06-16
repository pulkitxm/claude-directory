# Blobby — Playful Geometric Design System

A full landing page that puts a complete **Playful Geometric** design system to
work. Built for a fictional no-code kit ("Blobby") for sticker-book brand sites,
the page follows the system's core idea — **"stable grid, wild decoration"**:
content lives in clean, readable areas while the world around it is alive with
shape and motion. It references the Memphis Group (80s) cleaned up for modern
screens — the energy without the chaos.

Anchored by a warm paper background (`#FFFDF5`) and softer-than-black slate
foreground (`#1E293B`), with four punchy pop colors used rotationally for a
"confetti" effect: violet `#8B5CF6`, hot pink `#F472B6`, amber `#FBBF24` and mint
`#34D399`. Chunky 2px borders, hard offset "pop" shadows (zero blur), varied
radii (mixing pills with sharp corners for leaf/blob shapes), and bouncy elastic
motion throughout.

## Sections

A pill-shaped sticker navbar (with a popping mobile sheet); a hero with a massive
yellow circle behind the copy, a dotted pattern behind a **blob-masked vector
illustration** (a friendly geometric mascot drawn in the system's own language),
floating confetti shapes and a squiggle-underlined headline; an inverted accent
keyword marquee plus a reverse logo marquee; a three-up **feature grid connected
by a dashed SVG line** with floating icon badges sitting half-out of each card's
top border; a four-step "how it works" with squiggle connectors (vertical rules
on mobile); a dark stats band with one big number per pop color; a **three-tier
pricing block whose middle tier scales up and wears a 15° yellow star
"MOST POPULAR" badge**; sticker testimonial cards; a live **token gallery** (the
system shown to itself — swatches, radii, type scale, and a working primitive
line-up); a high-contrast FAQ accordion with a rotating +/− icon; an accent CTA
block with the focus-shadowed email-capture form; and a footer with a squiggle
sign-off.

## Architecture

- `src/index.css` — the **token DNA**: the `@theme` palette, vendored
  `@font-face` for Outfit + Plus Jakarta Sans, the hard-shadow (`pop`) component
  utilities, dot-grid / diagonal-stripe / grid-line pattern utilities, the
  bouncy keyframes (pop-in, wiggle, marquee, float), and a thorough
  `prefers-reduced-motion` block that neutralizes every animation.
- `src/tokens.ts` — a TypeScript mirror of the tokens for the bits of UI that
  need values in JS (the swatch gallery, the SVG illustration, decorative shapes).
- `src/ui.tsx` — composable **primitives**: `Button` (the candy button + outline
  + ghost), `StickerCard`, `IconBadge`, `Field`/`Input`/`Textarea`, `Eyebrow`,
  `Squiggle`, `Marquee`, `Reveal` (pop-in on scroll) and `CheckRow`.
- `src/shapes.tsx` — purely ornamental geometric primitives (circle, square,
  triangle, pill, plus, ring, squiggle) that float behind content and hide on
  small screens.
- `src/illustration.tsx` — the hero's blob-masked vector scene.
- `src/data.ts` — all copy, kept apart from presentation.
- `src/App.tsx` — the **organisms** composed from the above (nav, hero, marquees,
  features, steps, stats, pricing, testimonials, token gallery, FAQ, CTA, footer).

Stack: React 18, TypeScript, Vite 6, Tailwind CSS v4 (`@tailwindcss/vite`),
`lucide-react` (chunky 2.5px round-cap icons, always enclosed in a shape). All
assets — both webfonts (woff2) plus the custom SVG illustration and favicon — are
vendored under `public/` and `src/`, so the project runs fully offline.

## Accessibility

Body text is slate-800 on warm white (AAA). Color is never the only signal —
shapes and text labels carry meaning. Focus states are high-contrast (thick
accent outline + hard shadow). A skip-to-content link leads the tab order, the
FAQ uses proper `aria-expanded`/`aria-controls`, and every bounce, wiggle, float
and marquee is wrapped in `prefers-reduced-motion`.

## Run

```bash
npm install
npm run dev       # dev server
npm run build     # type-check + production build
npm run preview   # serve the production build
npm run verify    # headless Playwright checks against the preview build
```

`npm run verify` builds the site, serves it, and asserts (33 checks): no
console/page errors, every section renders, both webfonts actually resolved, no
remote hotlinks (all assets local), the marquee tracks duplicate for a seamless
loop, the pricing "MOST POPULAR" badge + scaled featured tier are present, the
FAQ accordion toggles with correct ARIA, the CTA form validates and shows its
success state, the mobile nav opens, and `prefers-reduced-motion` reveals all
content while disabling the marquee.
