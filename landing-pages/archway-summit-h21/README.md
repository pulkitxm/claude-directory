# Archway Summit

A multi-section landing page for **Archway Summit**, a fictional developer conference, built in a "Gallery Arch" design language — a near-black editorial gallery where each headline speaker is framed inside a tall, pastel, museum-style arch, like portraits hung in a modern art hall. Contrast comes from hard black negative space (`#050505`) against candy-pastel arch cards (pink, blue, beige, yellow), oversized uppercase Inter display type, and monospace timestamps.

The signature section is the speaker arches: tall cards with a perfect top arch radius, grayscale portraits that turn full-color and lift on hover. Other sections include a day-1/day-2 schedule toggle that swaps session sets via JS, a logo strip, native `<details>` FAQ accordions, and an inverted white footer/CTA. Motion uses IntersectionObserver scroll reveals, card hover lifts, arrow-button rotations, and a fading day swap.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
