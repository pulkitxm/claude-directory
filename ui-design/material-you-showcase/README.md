# Lumi — Material You (Material Design 3) Showcase (React, Tailwind CSS v4, Roboto)

A complete, polished landing page that showcases an entire Material You (Material Design 3) design system for a fictional theming toolkit ("Lumi"): personal, adaptive and spirited with a tonal surface system, pill-shaped buttons, 24–48px architectural border radii, organic blurred background shapes, state-layer hover feedback, and Material's signature "emphasized decelerate" easing (`cubic-bezier(0.2, 0, 0, 1)`) throughout. Generated with Claude Fable 5.

## What it demonstrates

- **Centralized design tokens** — the full MD3 tonal palette (seed `#6750A4`), the
  Roboto typeface, the radius ladder (8 → 48px), the signature easing and the soft
  elevation shadows all live in one Tailwind v4 `@theme` block (`src/index.css`).
  Buttons, cards, chips, inputs and focus rings compose those tokens; no hard-coded
  one-offs.
- **Tonal surfaces, never white** — the page layers Background → Surface Container →
  Surface Container Low, and uses full-width **primary** (Benefits) and **tertiary**
  (Final CTA) color blocks sparingly for emphasis. `body` is `#FFFBFE`, not `#FFF`.
- **The full component kit** — pill buttons in five variants (filled / tonal /
  outlined / text / on-color) with `active:scale-95`, tonal cards with a
  `shadow-sm → shadow-md` hover progression, the distinctive **Material 3 filled
  text field** (rounded top, square bottom, 2px bottom border that turns primary on
  focus), assist **chips**, and a **FAB** (56×56, `rounded-2xl`, tertiary, breathing
  halo) that rises on scroll.
- **Every signature section** — a hero in a `rounded-[48px]` surface container,
  a benefits grid of glass-morphism cards, a How-It-Works trio with numbered badges
  whose **glow reveals on hover**, a recessed (`shadow-inner`) tonal-ramp
  visualization, a pricing row whose featured tier rests **lifted**
  (`md:-translate-y-4`) with a ring, a journal of blog cards with **image-zoom on
  hover** (procedurally drawn local cover art — no stock photos), an accordion FAQ
  with a rotating `+`, and an email-capture Final CTA.
- **Rich, accessible micro-interactions** — coordinated `group`/`group-hover`
  effects, layered `blur-3xl` organic shapes with radial-gradient washes, 200–300ms
  transitions on the signature curve, visible focus rings on every interactive
  element, `aria-hidden` decoration, a skip link, and a `prefers-reduced-motion`
  guard that neutralizes movement.

## Stack

React 18, TypeScript, Vite 6, Tailwind CSS v4. No runtime UI/animation libraries —
icons are inline SVG and motion is pure CSS, so the bundle stays lean.

The **Roboto** typeface is self-hosted (`public/fonts/*.woff2`) and all imagery is
generated locally as SVG, so the project runs **fully offline** — no font CDN, no
image host.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
```

## Verify

Headless CLI verification (`scripts/verify.mjs`, Playwright) asserts the
design-system contract the way a reviewer would eyeball it, deterministically: the
self-hosted Roboto font, the exact seed-derived tokens, the tinted (non-white)
surfaces, **all buttons are pills**, the filled-text-field geometry and focus
behaviour, the FAB shape, the lifted featured pricing tier, the How-It-Works glow,
the FAQ accordion, the CTA submit, the organic blur shapes, the responsive mobile
drawer, and that there are **no console errors**.

```bash
npm run build
npm run preview -- --port 4173 --strictPort &
npm run verify http://localhost:4173
# Use a specific browser binary if needed:
# CHROME_PATH=/path/to/chrome npm run verify http://localhost:4173
```

---

Part of the [UI design](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
