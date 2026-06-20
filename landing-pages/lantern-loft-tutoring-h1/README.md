# Lantern & Loft

A full, multi-section landing page for Lantern & Loft, a boutique one-on-one home-tutoring and mentorship studio. The named aesthetic is **Warm Paper Studio**: a cozy, editorial, stationery-like world built on cream paper with soft rounded cards (radii up to 40px), hand-friendly typography, and a warm, optimistic accent palette of indigo, amber, sage, and terracotta. The mood is a well-lit reading nook, never a corporate edtech dashboard.

Sections span a floating pill navbar, an asymmetric two-column hero with an offset card cluster and a skewed amber glow, a sage marquee strip, an approach section with animated stat counters and tilted cards, a "why choose us" split, a subjects grid, stacked program feature rows, an offset process masonry, a pricing grid, a CTA banner, and a dark footer. Motion is vanilla JS: IntersectionObserver reveals with directional and staggered variants, count-up stats, the hover-pausing marquee, spinning glyphs, card lifts and de-tilts, and floating hero doodles — respecting `prefers-reduced-motion`.

Typography pairs Fraunces (display serif) with Plus Jakarta Sans (body), self-hosted as WOFF2. All imagery and SVG glyphs vendored locally.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
