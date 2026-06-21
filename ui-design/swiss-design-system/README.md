# SCHRIFT — Swiss International Typographic Style Design System (HTML + CSS + Vanilla JS)

A full-page living documentation showcase for **SCHRIFT**, a strict implementation of the **International Typographic Style (Swiss Style)** — black, white, and a single Swiss Red (`#FF3000`), with the grid as law and typography as the interface. The page reads as a museum-style exhibition of its own DNA: a Bauhaus hero composition, a principles ticker, color-token swatches, a mathematical type-scale specimen, animated system metrics, a 2×2 component gallery on CSS texture backgrounds, a four-step integration method, color-inverting feature cards, testimonials, an accordion FAQ, and a CTA. No framework, no build step, fully offline. Generated with Claude Fable 5.

## What it demonstrates

- **Strict token system** — every color, size, space, and motion duration is a CSS custom
  property in `:root`. No magic numbers downstream.
- **The four signature textures** — `.swiss-grid-pattern` (24px grid), `.swiss-dots`
  (16px matrix), `.swiss-diagonal` (45° lines), and a global fractal-noise paper grain
  (`assets/noise.svg`).
- **Bold, mechanical interactions** — color inversions, rotating plus icons (0°→90°),
  vertical nav slides, scale-on-hover stats, and a count-up — all 150–200ms, never a fade.
- **Asymmetric grids** — 7:5 hero, 4:8 sticky section splits, 2×2 and 3-up galleries.
- **Accessibility** — 21:1 contrast, visible red focus rings, ≥44px targets, semantic
  landmarks/headings, and full `prefers-reduced-motion` support.
- **Responsive** — bold character from 320px to 4K; borders never thin, type stays uppercase.

## Stack

- Plain HTML + CSS + vanilla JavaScript — **no build step, no framework, runs offline**
- **Inter** typeface (weights 400/500/600/700/900) vendored locally in `assets/fonts/`
- Lucide icons inlined as an SVG sprite (no remote icon dependency)

## Run

It is a static site — open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 5199
# then open http://localhost:5199/
```

## Verify (CLI only)

```bash
node verify.mjs   # headless Chromium checks (desktop 1280 + mobile 390): tokens,
                  # fonts loaded, FAQ toggle, stat count-up, mobile drawer, a11y, console
```

## Files

| File | Role |
|------|------|
| `index.html` | Structure + content + inline icon sprite |
| `assets/styles.css` | The design system: tokens, patterns, every component |
| `assets/app.js` | Menu, FAQ, toggles, scroll reveal, count-up, CTA form |
| `assets/noise.svg` | Fractal-noise paper-grain texture |
| `assets/fonts/*.woff2` | Inter, vendored locally |
| `verify.mjs` | Headless verification script |

---

Part of the [UI design](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
