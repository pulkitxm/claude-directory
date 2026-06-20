# Verdant

A refined, editorial hero for a fictional high-end strategy advisory firm, built in a "Quiet Luxury Consulting" design language: a calm white canvas, a single oversized forest-green hero card (`#1F514C`), serif display type (Hedvig Letters) paired with a neutral grotesque (Inter), and generous negative space with soft rounded corners. The mood is composed, expensive, and trustworthy — the opposite of flashy SaaS.

Beyond the two-column hero card, the page carries a trust marquee of serif company names, a stats strip, an approach/feature trio, and a footer CTA band. Motion includes scroll-triggered entrance reveals (Intersection Observer, staggered with a smooth cubic-bezier), an infinite logo marquee with edge-fade masks that pauses on hover, a slow vertical float on the hero image and its glass stat chip, springy arrow-nudge button hovers, and count-up stats. All loops and count-ups respect `prefers-reduced-motion`. Both font families and the hero photo are vendored locally for offline use, with accessible, semantic markup throughout.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
