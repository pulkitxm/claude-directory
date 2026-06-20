# Cyberpunk / Glitch Design System

A landing page built to express the "Cyberpunk / Glitch" design system — "high-tech, low-life": a digital dystopia of underground hackers, neon-drenched megacities, and corrupted data streams that feels rendered on a malfunctioning CRT. Against a deep void black (`#0A0A0F`), neon accents illuminate the UI — electric green (`#00FF88`), hot magenta (`#FF00FF`), and cyan (`#00D4FF`) — with monospace typography (Orbitron headlines, JetBrains Mono body) in uppercase with wide tracking.

The aesthetic is carried by its visual signatures: chromatic aberration (RGB-split text shadows), full-page CRT scanline overlays, glitch flicker animations, real multi-layered box-shadow neon glow, chamfered corner cuts via `clip-path` (no rounded corners), and circuit/grid pattern backgrounds. A terminal aesthetic recurs (`>` prefixes, blinking cursors), motion is sharp and mechanical (snaps over smooth eases), and asymmetric layouts use skew/rotate transforms. Glitch animations respect `prefers-reduced-motion` by falling back to static chromatic aberration.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
