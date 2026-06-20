# Meridian Grid Systems

A multi-section marketing landing page for Meridian®, a fictional intelligent-automation consultancy. The named aesthetic is "Warm Brutalist Grid" — a Swiss/editorial poster system on a warm paper-cream canvas, organised entirely by 1px hairline rules and hard rectangular panels with zero border radius and flat blocks of electric green and cobalt blue.

Sections run from a split sticky-feel navbar (with a live local clock) through a 50/50 hero, statement band, logo marquee, about grid, count-up stats strip, staggered process cards, a pricing table with a working monthly/annual toggle, a green contact section with a hard-offset-shadow form, and footer. Vanilla HTML/CSS/JS with an IntersectionObserver scroll-reveal, an infinite marquee loop, count-up stats, springy card entrances, and `prefers-reduced-motion` support. Self-contained and offline-runnable (Space Grotesk + Inter vendored locally).

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
