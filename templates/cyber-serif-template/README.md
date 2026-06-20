# Cyber Serif

A premium, avant-garde design system that pairs the elegance of serif display type with the high-tech utility of monospace labels and emerald-glow accents. It runs on a deep black base (`#050505`) with off-white text (`#EBEBEB`) and a surgical emerald accent (`#10B981`) used sparingly — never as a large block.

Typography is a three-way system: Newsreader (serif) for stark, tight-tracked display headings with italic emphasis words, Inter for readable body, and Space Grotesk for all-caps high-tracking technical labels. The look leans on glassmorphism (`rgba(255,255,255,0.02)` with 12px blur), shimmer borders, radial-gradient spotlight cards that track the cursor, and morphing blurred background glows. Sections include a fixed navbar that turns to blurred glass on scroll, a 100vh split hero, a 3-column spotlight feature grid, a benchmark table with count-up numbers, and an animated gradient-text CTA.

All motion uses a weighted `cubic-bezier(0.16, 1, 0.3, 1)`: scroll reveals, shimmer sweeps, cursor spotlights, and pulse-glow on pill buttons.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
