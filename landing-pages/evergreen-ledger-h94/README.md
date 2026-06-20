# Evergreen Ledger

A full, multi-section, responsive landing page for a fictional venture & growth capital firm named Meridian Grove — "empowering change. defining the future." The named design language is **Evergreen Ledger**: a quiet, institutional-editorial aesthetic like a private-bank prospectus printed on warm bone paper, anchored by deep pine/teal ink and lit by a single luminous citron-lime accent.

Sections run from a floating blurred nav through a full-viewport pine hero with an overlapping 3-up stat-card grid, a sticky "deck of cards" services stack, tilted ethos cards (desktop only, to avoid mobile overflow), an image band, an insights article grid, a final CTA, and a footer with a newsletter form. Motion is hand-written vanilla JS: IntersectionObserver scroll reveals with directional and staggered variants, the sticky service stack, hover image scaling, and a header that compacts past 50px — all respecting `prefers-reduced-motion`.

Typography pairs Inter with Space Mono for mono labels. Hand-written CSS with custom properties for the palette; fonts and photography vendored locally.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
