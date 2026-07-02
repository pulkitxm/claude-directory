# Super Design — Warm Industrial Design System Landing Page (HTML, CSS, Inter, Playfair Display, clip-path reveal)

[![Watch Demo](./poster.jpg)](./demo.mp4)

An industrial-chic design system landing page centered on structural grids, warm gray tones, and high-impact editorial typography with technical "readout" accents, stacking a sticky header, a split 12-column hero, a marquee ticker, an interactive project list with clip-path image reveal, a philosophical parallax statement, a technical journal, and a massive dark footer. The "warm industrial" palette runs on a `#EBEBE8` background with `#18181B` foreground and an electric-blue accent (`#0066FF`) under a subtle 4% fractal-noise overlay and a fixed full-page 12-column grid of thin vertical hairlines; all animations use high-inertia `cubic-bezier(0.16, 1, 0.3, 1)` with stroke-text hero headings, a looping marquee, cursor-following "View" circles, scroll-driven parallax, and animated status pulses. Fonts and grayscale imagery are vendored locally for full offline use in a single self-contained `index.html`. Generated with Claude Fable 5.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.

---

Part of the [Templates](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
