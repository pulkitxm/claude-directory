# Astral Veil — Novela

A cosmic-nocturne SaaS landing page in the **Astral Veil** design language: a
near-black canvas where soft violet and cobalt nebula glows bleed through a veil
of frosted glass. Editorial Playfair Display serif headlines sit inside a calm
engineering grid, punctuated by glassmorphic cards, a twinkling CSS starfield,
drifting UI fragments, an infinite trust marquee, and a floating constellation of
integration capsules.

Fully self-contained and offline: a single static `index.html` + `styles.css` +
vanilla `main.js`. Fonts (Playfair Display + Inter) and the portrait image are
vendored locally under `assets/`; every icon is inline SVG. No runtime CDN.

## Run

Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 5199
# then visit http://localhost:5199
```

## Highlights

- Layered hero: starfield + masked grid + dual radial glows, staggered entrance.
- Glass entry cards with brightening 1px gradient borders.
- Asymmetric feature bento, 2×2 pure-CSS product mockups, dashed scheduling timeline.
- Constellation of color-coded integration capsules with individual float rhythms.
- Scroll-reveal via IntersectionObserver; honors `prefers-reduced-motion`.

## Stack

HTML, CSS, Vanilla JS
