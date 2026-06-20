# Cobalt Bento Folio

A single-page, forced-light personal portfolio for a fictional full-stack engineer (Nora Aveline) in a "Daylight Workbench" aesthetic: a soft, airy canvas built entirely from a bento grid of frosted-glass panels over cool pale gray. One commanding royal-cobalt panel anchors the composition (the colossal "PORT / FOLIO" hero tile) while everything else stays white-on-glass with near-black ink panels as punctuation. Typography is Plus Jakarta Sans with JetBrains Mono accents, all self-hosted.

The structural device is an asymmetric 12-column bento grid where panels of different spans interlock into one continuous dashboard. Vanilla JS drives staggered IntersectionObserver panel reveals, a pointer-parallax cobalt hero with a cursor-tracking specular highlight, a requestAnimationFrame count-up for stats, an animated SVG skill ring, a typewriter role rotator, and a contact form with validation and a success state — all gated behind `prefers-reduced-motion`.

Pure static site (one `index.html`, `styles.css`, `main.js`), all assets vendored locally, runs fully offline.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
