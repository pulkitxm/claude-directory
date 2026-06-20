# Helix Vault

An above-the-fold hero for a fictional crypto portfolio platform, built in an "Institutional Crypto Terminal" aesthetic — a deep near-black trading-floor canvas (`#07080C`) lit by a single blade of emerald light, with an oversized editorial headline floating above a hyper-detailed, glass-panelled portfolio dashboard mockup. The mood is a Bloomberg terminal reimagined as a luxury product: frosted hairline-bordered glass panels, a faint grain and dot-grid backdrop, and emerald (`#19F5A0`) as the single brand color. DM Sans handles all UI; a monospace stack carries the ticker numerals.

The signature device is the horizon "blade of light" — layered glow elements behind the dashboard's top edge. Motion includes a staggered fade-and-rise on load (Intersection Observer, replays on scroll-in), an emerald scan-line that sweeps the dashboard on a ~3.5s loop, a breathing glow core, a count-up on the net-worth balance, bars that grow from zero on reveal, and live-feeling ticker flickers. All data is hand-authored; fonts are vendored locally and icons are inline SVG, so the project runs fully offline.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
