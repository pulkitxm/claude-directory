# Orbital Frequency — Deep-Space Signals Summit

A multi-section landing page for Orbital Frequency, a fictional two-day deep-tech summit for aerospace engineers, ground-station operators, and signals-software hackers. The named aesthetic is "Deep Signal" — an observatory-at-night visual language built around telemetry, radar sweeps, orbital rings, and mission-control readouts, on a near-black backdrop with warm amber-gold and signal-green accents.

Sections include a fixed nav that condenses on scroll, a full-viewport hero with rotating orbital rings, a sweeping radar cone, drifting star particles and a telemetry strip, a mission block with live counters, a challenge-tracks grid, two day timelines, a flight-crew speaker grid, a passes pricing section with bobbing beacons, a native-`<details>` FAQ accordion, a CTA/sponsor band, and footer. Vanilla HTML/CSS (custom properties) + JS with continuous ambient motion, IntersectionObserver reveals, count-up stats, a scroll-depth signal bar, and `prefers-reduced-motion` support. Self-contained and offline-runnable.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
