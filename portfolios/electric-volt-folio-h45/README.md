# Electric Volt Folio

A fully responsive, multi-section portfolio for a fictional motion designer (Nova Reyes) in a "Kinetic Brutalism" design language — a loud, unapologetically typographic neo-brutalist poster aesthetic, like a risograph zine crossed with a 3D motion reel. Everything is hard-edged and high-contrast: black ink on acid-green paper punched through with hot-pink accents, thick borders, and blocky no-blur offset drop-shadows, with a visible grid overlay.

Display headlines are oversized Inter Black, paired with a monospace for meta labels. Sections run fixed nav (transparent → solid-black on scroll), a 12-column hero with a rotated portrait and an infinite marquee, about, a count-up stats band, a staggered masonry work grid, a pull-quote, contact, and an outlined-wordmark footer. Vanilla JS drives the scroll-aware nav flip, tactile press-down button shadows, the pausing marquee, IntersectionObserver counters and reveals — all respecting `prefers-reduced-motion`.

Vanilla HTML + CSS + a little JS, all assets vendored locally, runs fully offline.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
