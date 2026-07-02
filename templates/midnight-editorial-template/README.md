# Midnight Editorial — Dark Brutalist Fashion Template (Clash Display, Inter, mix-blend-difference Nav)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A dark brutalist fashion editorial template, branded **Midnight**, blending brutalist typography with high-end editorial aesthetics on a near-black canvas (`#050505`, footer `#0A0A0A`) against pure white. Soft blurred orange/blue light leaks (120px blur, `mix-blend-screen`) add atmospheric depth; ultra-subtle thin borders and sharp 2px corners define the geometry. Clash Display drives massive uppercase headings (hero at `15vw`); Inter handles clean body copy with 10px uppercase metadata labels. The 12-column editorial scroll runs a `mix-blend-difference` fixed nav that inverts over light imagery, a full-height hero with an overlapping "FORM / MATTER" headline and a floating description block, a 4-column staggered stats grid, asymmetrical numbered content blocks with 80px gutters, a full-width 21:9 parallax gallery, a two-up gallery with hover-reveal captions, and a centered footer with a giant clipped ghost wordmark. Motion is reveal-up on `cubic-bezier(0.22, 1, 0.36, 1)` at 1s with per-element stagger delays, 2s image hover scales, and rAF scroll parallax. Generated with Claude Fable 5.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.

---

Part of the [Templates](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
