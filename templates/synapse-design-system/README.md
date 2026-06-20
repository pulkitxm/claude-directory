# Synapse — Futuristic Dark Design System

A futuristic, dark-themed design-system landing page combining large-scale editorial typography with intricate micro-interactions, floating ambient orbs, and high-contrast neon accents. It sits on a vantablack `#030303` foundation with violet (`#8B5CF6`) and cyan (`#06B6D4`) accents, emerald status indicators, glassmorphism, and glowing blurs.

Type pairs Instrument Serif (high-impact headings) with Inter (body and UI). Motion is central: three fixed blurred radial orbs drift behind content, the last hero word runs a continuous gradient shimmer, and elements stage in with staggered entrances on a `cubic-bezier(0.23, 1, 0.32, 1)` easing curve. The vertical stack runs through a fixed glass nav pill, a massive centered hero, a full-width infinite metrics ticker (40s loop), a 3-column feature grid of lift-on-hover cards, a dark IDE-style code integration block with syntax highlighting and a working copy button, and a footer with an emerald "all systems operational" status. Signature components include a shiny-border button (a spinning conic-gradient neon line) and reveal-on-scroll feature cards.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
