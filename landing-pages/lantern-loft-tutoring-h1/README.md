# Lantern & Loft — Home Tutoring Studio Landing Page (Vanilla HTML + CSS + JS)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A full, multi-section landing page for Lantern & Loft, a boutique one-on-one home-tutoring and mentorship studio. The page uses the "Warm Paper Studio" aesthetic — a cozy, editorial, stationery-like design built on a cream paper base with soft rounded cards (radii up to 40px), hand-friendly typography, and a warm accent palette of deep indigo, amber, sage, and terracotta. The mood feels like a well-lit reading nook, never a generic edtech dashboard. The hero is an asymmetric two-column layout with an offset card cluster and a skewed amber glow, followed by a sage marquee strip, an approach section with animated stat counters and tilted cards, a "why choose us" split, a subjects grid, stacked program feature rows, an offset process masonry, a pricing grid, a CTA banner, and a dark footer. Motion is vanilla JS: IntersectionObserver reveals with directional and staggered variants, count-up stats, hover-pausing marquee, spinning glyphs, card lifts and de-tilts, and floating hero doodles — respecting `prefers-reduced-motion`. Typography pairs Fraunces (display serif) with Plus Jakarta Sans (body), self-hosted as WOFF2. Generated with Claude Fable 5.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.

---

Part of the [Landing pages](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
