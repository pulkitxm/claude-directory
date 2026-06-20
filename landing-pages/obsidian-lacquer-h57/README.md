# Obsidian Lacquer — Automotive Detailing Studio

A multi-section landing page for Obsidian Lacquer, a fictional high-end automotive detailing and paint-protection studio. The named design language is "Obsidian Lacquer" — a dark, cinematic, showroom-floor aesthetic: wet-look black paint under a single raking light, a scalpel of vermilion red for energy, and pristine editorial type (Playfair Display italic wordmark, Bricolage Grotesque / Inter Tight).

Sections include a fixed backdrop-blur navbar, a full-viewport hero with a Ken-Burns/parallax background, an asymmetric 12-column services grid, a hover-reveal process section, testimonials, a snap-scroll before/after gallery driven by arrow buttons, a pricing section with a monthly/yearly toggle, and a final CTA. Vanilla HTML/CSS/JS with IntersectionObserver scroll reveals, hover image scaling, a data-driven price swap, a custom dark scrollbar, and `prefers-reduced-motion` support. Self-contained and offline-runnable.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
