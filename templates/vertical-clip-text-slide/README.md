# Vertical Clip Text — Letter-by-Letter Slide-Down

A single-screen, full-viewport hero whose only job is to showcase one signature motion: a large display headline that resolves letter by letter, each glyph clipped inside its own vertical mask column and sliding down from above into place in a staggered, eased cascade.

Each headline line is split into per-letter spans by JS on load. Every letter is wrapped in a `.clip` column (`overflow: hidden`, the vertical mask) holding a `.glyph` that starts translated up and out (`translateY(-110%)`) and animates down to `translateY(0)`, so it appears to pour into its slot from the top edge. The stagger is `base + index * 70ms`, counted continuously across all lines so the headline reads as one left-to-right wave, with a per-letter `0.62s` duration on a `cubic-bezier(0.22, 1, 0.36, 1)` expo-out, plus a subtle opacity fade and clearing blur. After the last letter lands the sub-line and caption fade up; the cascade then auto-loops, a "Replay" button restarts it, and `prefers-reduced-motion` shows the headline statically. Type is Space Grotesk (display) and JetBrains Mono (UI) on a near-black `#0B0B0C` canvas with a faint film-grain overlay.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
