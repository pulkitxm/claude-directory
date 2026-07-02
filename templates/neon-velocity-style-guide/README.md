# Neon Velocity — Brutalist × Futuristic Glass Style Guide (Plus Jakarta Sans, Geist Mono, Glassmorphism)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A minimalist yet aggressive style-guide and landing template that blends brutalist structure (heavy borders, massive uppercase type) with futuristic glass effects, running on deep black (`#050505`) and vibrant neon lime (`#BFFF00`). A 3%-opacity fractal-noise overlay, large blurred refraction glows, and glassmorphism panels create the premium atmosphere. Plus Jakarta Sans (800 weight, tight tracking) powers uppercase headlines at `clamp(2.6rem, 10vw, 8.75rem)`; Geist Mono handles wide-tracked technical labels; Inter covers body. Within a 1600px container the page flows from a header with a laser button, through a hero where a 3D-tilted glass card (`perspective(1000px) rotateX(15deg)`) sits behind a massive headline in a sharp 12px white border-box with a live tabular-nums countdown, into a 3-column luminosity bento grid, a social-proof avatar stack with neon-bordered portraits and a glass pill form, a footer, and a fixed mobile bottom-nav pill. Signature components include the laser button (sweeping 45° light gradient on hover) and luminosity cards that react to mouse proximity with an accent spotlight using CSS custom property `--mx`/`--my`. Generated with Claude Fable 5.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.

---

Part of the [Templates](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
