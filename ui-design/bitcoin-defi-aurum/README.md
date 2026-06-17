# AURUM — Bitcoin DeFi Design System

A premium, single-page DeFi landing experience that fully expresses the
**"Bitcoin DeFi"** aesthetic: a deep cosmic void lit by Bitcoin Fire (orange) and
Digital Gold. **Not generic dark mode** — light emanates from the interactive
elements themselves, shadows are colored (never black), 1px borders define
boundaries, and the void breathes with grid patterns, radial energy fields, and
film grain.

Generated with Claude Fable 5 for the [claude-directory](../../README.md).

## What it demonstrates

- **Centralized design tokens** — the entire "True Void / Bitcoin Fire" palette,
  the three typefaces (Space Grotesk / Inter / JetBrains Mono), the colored glow
  shadows (`glow`, `gold`, `tier`, `node` …) and every motion primitive live in
  one Tailwind config (`tailwind.config.js`) plus a small set of helper classes in
  `src/index.css` (`.bg-grid-pattern`, `.text-gradient`, `.holographic-gradient`).
  No hard-coded one-offs.
- **`cva` component kit, shadcn-style** — `Button` (pill-shaped, gradient fill +
  orange glow, with outline / ghost / gold / link variants), `Card` (the "block":
  solid / glass / highlight / flat), and the bottom-border `Input` "data terminal"
  all compose those tokens. Plus `Badge` (pulsing live dot), `IconTile`
  (holographic node), `SectionHeading`, `Reveal`, `Container` and the `Logo` mark.
- **The full landing arc** — a sticky glass `Navbar`; a hero with a **spinning
  orbital orb** (counter-rotating CSS rings + a glowing Bitcoin core) ringed by
  **floating glass stat cards**; a seamless **stats ticker**; a count-up metrics
  band; a **features grid** with large rotated **icon watermarks** that reveal on
  hover; a **"How It Works" blockchain timeline** (orange→transparent ledger line,
  numbered pinging nodes, **corner-accent** cards); **asymmetric pricing** (the
  popular tier is `scale-105` + elevated, others `opacity-80`); glass
  **testimonials**; a CTA with a working newsletter form; and a 4-column footer.
- **The bold factor** — gradient text on the final words of every headline,
  spinning orbitals, pulsing `animate-ping` "live network" badges, background icon
  watermarks, the blockchain timeline, corner border accents, glass morphism over
  visible grid patterns, and **colored shadows everywhere** (no pure black).
- **Precise, accessible motion** — 200–300ms interactions, hover lift + glow on
  cards, scale on buttons, scroll-reveals and count-ups via `IntersectionObserver`,
  and an 8s ambient orb float. Fully respects `prefers-reduced-motion` (CSS kills
  the ambient/orbital motion; the JS observers snap to their final state).

## Stack

React 18, TypeScript, Vite 5, Tailwind CSS v3, class-variance-authority,
clsx + tailwind-merge, lucide-react.

All three fonts (**Space Grotesk**, **Inter**, **JetBrains Mono**) are self-hosted
via `@fontsource`, and both background textures (an isometric-cube grid and a
fractal-noise grain) are vendored locally as SVGs (Vite inlines them as data URIs).
The project runs **fully offline** — no font CDN, no remote texture, no hotlinked
assets.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
```

## Verify

The build runs a strict TypeScript pass (`noUnusedLocals` / `noUnusedParameters`)
before bundling. During development this project was additionally verified with a
headless Chromium (Playwright) script asserting the design-system contract: zero
runtime/console/network errors, every section and content block, the spinning
orbital rings + pulsing live badges, the `#030304` void background, the gradient
primary CTA, the loaded Space Grotesk heading font, a working newsletter form, and
no horizontal overflow at a 390px mobile viewport.
