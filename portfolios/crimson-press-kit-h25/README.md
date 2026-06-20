# Crimson Press Kit

A single-page designer portfolio staged as a physical spiral-bound magazine / brand press kit lying open on a dark studio table. The aesthetic is raw, editorial, and print-inspired — "fashion magazine meets brutalist zine": sharp, inked, grainy, deliberately not a generic SaaS site. Each "page" is a full-bleed card with a heavy drop shadow, and consecutive pages are joined by a metal spiral-binding divider rendered in pure SVG.

Signature crimson anchors the cover and method pages against near-black ink, warm off-white paper, and dark gallery cards, with a generated noise/grain texture overlay in `mix-blend-multiply` to sell the printed feel. The binder runs cover → contents → intro → selected works → the method → contact, using a heavy uppercase grotesk for the loud voice, a monospace for labels, and one italic serif accent word. Vanilla JS handles smooth anchor scrolling, IntersectionObserver page reveals, grayscale-to-color hovers, and a fixed "back to contents" button.

Plain static build (HTML + CSS + a small vanilla JS file), all assets vendored locally, runs fully offline.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
