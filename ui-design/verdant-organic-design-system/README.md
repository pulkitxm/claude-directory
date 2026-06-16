# Verdant — Organic / Natural design system showcase

A full landing page that expresses the **Organic / Natural** design system —
wabi-sabi warmth over digital precision. Soft amorphous blob shapes, a global
paper-grain texture, an earth-drawn palette (moss, clay, sand, rice paper), the
Fraunces serif paired with rounded Nunito, colour-tinted soft shadows, and
gentle, tactile motion with no harsh snaps.

Built as a fictional small-batch botanical apothecary ("Verdant") so the
language has a real context to live in — a hero, a stats band, a feature grid,
a field-to-cup "ritual", a featured-blend spotlight, a benefits section, social
proof, pricing, a journal, an FAQ, and a closing CTA.

## Signature elements (the "bold factor")

- **Global paper grain** — a fixed, full-viewport noise layer (vendored
  `noise.png`) tiling at ~3.5% opacity with `mix-blend-mode: multiply` gives the
  whole interface an unbleached-paper quality; dark sections layer a second
  `overlay`-blend grain so the texture survives on moss/terracotta fills.
- **Amorphous blob backgrounds** — large, heavily-blurred colour washes drift
  slowly behind the hero, features, product, pricing and CTA. The `Blob`
  primitive splits the ambient **drift** (translate/scale on an outer element)
  from the **morph** (animated organic `border-radius` on the inner element) so
  both run together instead of one CSS `animation` overwriting the other.
- **Hand-drawn botanical illustrations** — every "photo" (the foraged-jar hero,
  the rotated product tin, the steaming cup, the three journal sprigs) is a
  bespoke SVG drawn in the palette, so the site is license-free and fully
  offline, and reads as genuinely handcrafted rather than stock.
- **Organic image masks & rotated frames** — the benefits illustration is
  clipped into a complex blob radius (`30% 70% 70% 30% / 30% 30% 70% 70%`); the
  product tin sits rotated `-2deg` in a thick paper frame that rights itself on
  hover.
- **Asymmetric card radii** — the six feature cards cycle through six different
  corner-radius patterns, mixing big organic curves (4–5rem) with the standard
  2rem so the grid never reads mechanically uniform.
- **Hand-drawn curved connector** — the four-step ritual is threaded by a dashed,
  curved SVG path rather than a straight rule.
- **Tactile micro-interactions** — buttons scale up and deepen their colour-tinted
  shadow on hover then press in (`active:scale-95`); feature/step cards lift;
  testimonial cards tilt the opposite way to their resting lean, as if picked off
  a table; stat numbers grow on group-hover.
- **Varied section backgrounds** — off-white → stone → sand → moss (dark) →
  stone → off-white → terracotta (dark) create a breathing, alternating rhythm.

## Architecture

Design tokens are centralized in `tailwind.config.js` (the full palette, the
Fraunces/Nunito families, a moderate 1.25 type scale, the colour-tinted
`shadow-soft`/`shadow-float` formulas, the `ease-organic` timing, and the drift /
morph / sway keyframes) and in `src/index.css` (the two `@font-face`
declarations, the grain overlays, and the `.blob-1…4` organic radii). Components
reference those token names rather than one-off hex values, so restyling the
system once propagates everywhere.

Reusable primitives live in `src/components`: `Button` (primary / outline /
ghost pills), `Eyebrow` (the shared kicker used above every section), `Blob`,
`Reveal` (gentle blur-up scroll entrances), `SectionHeading`, `Logo`, and the
`Botanical` SVG illustration set. All page copy and structured data live in
`src/lib/content.ts` so the sections stay declarative.

## Accessibility

- AAA/AA contrast from the spec: charcoal text on rice paper (14.5:1), moss
  (6.2:1) and dried-grass muted text (4.8:1) on the background.
- Soft, natural focus rings (a moss glow with an offset, never a hard outline)
  on every interactive element; 48px-high buttons clear the 44px touch target.
- The FAQ is a native `<details>`/`<summary>` accordion (free keyboard support);
  SVG illustrations carry `role="img"` + labels; nav uses landmarks and an
  `aria-expanded`/`aria-controls` mobile toggle.
- `prefers-reduced-motion` is honoured: it's read synchronously on first render
  (no flash of motion), `Reveal` and the hero fall back to static visible
  content, and a global CSS override zeroes ambient drift/morph/sway.

## Stack

React 18 · TypeScript · Vite · Tailwind CSS · Framer Motion · Lucide.
Fonts (Fraunces + Nunito variable TTFs) and the paper-grain `noise.png` are
**vendored locally** in `public/assets` — no CDN, fully runnable offline.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
```
