# Circuit Ledger

A single-page, forced-dark developer portfolio in a design language called "Quiet Circuitry" — a near-black engineering workbench at night, part hacker-terminal and part high-end print. Champagne-cream is the signature accent over a void background, with editorial Playfair Display headlines, Inter body, and JetBrains Mono labels (all fonts self-hosted).

The signature motif is a fixed full-viewport `<canvas>`: faint grid "circuit runners" that travel along grid lines and turn 90° at intersections leaving glowing trails, scattered flipping `0`/`1` glyphs, and a mouse-following highlighted cell. The page runs through hero, about, a bento "technical arsenal" with animated proficiency bars, device-framed featured projects, a typewriter live-stack terminal, an experience timeline, pricing, and a contact footer — with IntersectionObserver scroll reveals, scroll-spy nav, and a `prefers-reduced-motion` fallback throughout.

Self-contained static build (HTML + CSS + vanilla JS), all assets vendored locally, runs fully offline.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
