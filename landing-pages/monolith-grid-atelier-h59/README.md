# Monolith — Spatial Design Studio

A multi-section landing page for Monolith, a fictional high-end interior-architecture studio. The named design language is "Grid Monument" — a Swiss-modernist, architect's-drawing aesthetic ruled by a visible structural grid: bone-white paper, near-black ink, and a single warm taupe/sandstone accent, everything flat and hairline-divided.

Sections include a `mix-blend-mode: difference` fixed header with a full-screen overlay menu, a full-viewport hero with a structural grid overlay and `mix-blend-difference` headline, an ethos/stats modular grid with a rotating SVG text seal, a 3-column grid of 3D flip cards, a foundation feature panel, a contact form with an animated submit state, and footer. Vanilla HTML/CSS/JS with IntersectionObserver scroll reveals, 800ms 3D card flips, a 12s seal spin, hover inversions, and `prefers-reduced-motion` support. Self-contained and offline-runnable.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
