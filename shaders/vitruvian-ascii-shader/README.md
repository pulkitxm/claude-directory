# UIMIX — Vitruvian ASCII Shader Hero (React + HTML5 Canvas + Tailwind CSS v4)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A full-screen landing hero featuring a dependency-free HTML5 Canvas ASCII shader of Leonardo da Vinci's Vitruvian Man, integrated into a shadcn-style TypeScript + Vite project. The figure's arms and legs sweep between the two canonical poses — to the square (earthly) and to the circle (cosmic) — over a faint ghost of both, while the circle breathes and a soft scan-line shimmers up the body; everything is glyphs on black, sampled from signed-distance math onto a monospace grid. The hero chrome (UIMIX wordmark, EST. 2025, LAT/LONG readout, corner frame accents, PERFECT PROPORTIONS lockup with dithered rule, CTA buttons, and SYSTEM.ACTIVE footer) is kept verbatim from the original prompt, with the UnicornStudio embed replaced by a fully offline local ASCII renderer. Generated with Claude Fable 5.

## Why the backdrop was rebuilt (and what stayed verbatim)

The prompt's component paints its background by injecting a **UnicornStudio** embed —
its runtime from `cdn.jsdelivr.net` and a hosted scene (`whwOGlfJ5Rz2rHaEUgHl`) fetched
from `unicorn.studio`. Both hosts are unreachable in this offline / network-restricted
sandbox (and the scene can't be vendored — it's a dynamically-served, account-bound
resource). Hotlinking it would have shipped a permanently-black hero.

So, exactly as every other experiment in `shaders/` ports its shader to run **locally**,
the embed is replaced by `ascii-vitruvian.tsx` — a dependency-free canvas "shader" that
renders the same Vitruvian Man offline. This honours the component's own name
(`hero-ascii`) and its theme ("Da Vinci's vision of ideal form / VITRUVIAN"). **All of
the hero's markup, classes, copy, and the `<style jsx>` rules are kept unchanged**; only
the `[data-us-project]` embed div is swapped for `<AsciiVitruvian />`, and the prompt's
`<style jsx>` is rendered as a plain inline `<style>` so it builds under Vite. The
original, untouched component (UnicornStudio embed and all) is preserved in
[`prompt.md`](./prompt.md).

## Stack

- React 18 + TypeScript + Vite 5
- Tailwind CSS **v4** via `@tailwindcss/vite` (+ `tw-animate-css`), tokens in `@theme`
- shadcn-style `cn()` + `@/` alias + `components.json` (`components/ui` home)
- Plain HTML5 Canvas 2D — no WebGL, no Three.js, no shader/animation libraries
- Self-hosted JetBrains Mono (latin woff2, vendored locally — no runtime network)

## Project layout (the integration target)

```
src/
  components/ui/hero-ascii.tsx        ← the prompt's component (verbatim chrome)
  components/ui/ascii-vitruvian.tsx   ← offline ASCII Vitruvian shader (the backdrop)
  components/ui/demo.tsx              ← the prompt's demo, verbatim
  lib/utils.ts                        ← shadcn cn() helper
  fonts/                              ← vendored JetBrains Mono woff2 + @font-face
  index.css                           ← Tailwind v4 + tokens + base
  App.tsx                             ← renders the demo full-bleed
```

## Integrating the component (answering the prompt)

This repo already satisfies the three requirements, so no scaffolding was needed:

- **shadcn structure** — `components.json` + the `@/` alias resolve `@/components/ui/*`.
- **Tailwind** — Tailwind v4 is wired through the Vite plugin; `src/index.css` opens
  with `@import "tailwindcss"`.
- **TypeScript** — strict TS throughout; `npm run build` runs `tsc` first.

**Why `components/ui`?** shadcn treats `components/ui/` as the home for primitive,
copy-in components that you own and edit. Keeping the hero (and its ASCII backdrop)
there means the `@/components/ui/hero-ascii` import in `demo.tsx` resolves with zero
config and the component stays a reusable primitive you can drop into any shadcn app.

Answers to the prompt's integration questions:

- **Props/data** — none. `<Home />` self-renders (the original takes no props). The
  backdrop `<AsciiVitruvian />` accepts an optional `speed` and `className`.
- **State** — none / local only. The original used a `useEffect` purely to inject the
  third-party embed; with the embed gone, the component is a pure render and the
  animation state lives inside the canvas component's `requestAnimationFrame` loop
  (kept out of React so it never re-renders the tree).
- **Assets** — the prompt mentions Unsplash/lucide, but this hero uses **no `<img>` and
  no icons** (its marks are text and Unicode glyphs `∞ ◐`), so none were added. The only
  vendored asset is the self-hosted JetBrains Mono font. `prefers-reduced-motion` is
  honoured (the figure renders a single static frame).
- **Responsive** — the verbatim `hidden lg:block` / `lg:hidden` split is kept: the ASCII
  canvas shows ≥ `lg` and the CSS star-field backdrop shows below it; buttons stack on
  mobile; single non-scrolling viewport at every width; the canvas is DPR-aware (capped
  at 2×) and reflows via `ResizeObserver`.
- **Best placement** — a full-bleed landing hero behind UI chrome, which is exactly how
  `App.tsx` / `demo.tsx` mount it.

## Run

```bash
npm install
npm run dev
```

## Verify (CLI only)

```bash
npm run build
npm run preview &   # serves dist on :4173
npm run verify      # headless Playwright: canvas paints + animates, all hero chrome,
                    # single viewport, zero CDN/hosted-scene/remote-font requests,
                    # desktop + mobile (canvas hidden, star backdrop shown)
```

A recorded walkthrough lives in [`demo.mp4`](./demo.mp4).

---

Part of the [Shaders](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
