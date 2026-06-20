# Monocrit Studio

A full-viewport, cursor-driven hero for a fictional art-direction studio, built in the "Monocrit" design language — a quiet, near-monochrome Swiss-brutalist aesthetic: huge Bricolage Grotesque display type centered in a field of warm off-white paper (`#F2F0EB`), framed by hairline rules and tight uppercase eyebrow labels, with a single signal-red accent (`#FF3B2F`) used sparingly. It is built to feel like a living poster.

The whole page is driven by the pointer. A floating image card replaces the native cursor and lerps toward it each frame with slight inertia and velocity-based tilt; headline letters magnetically recoil away from the cursor and spring back; and accumulated pointer travel cycles a stack of six portfolio images with a crossfade, advancing the caption, frame counter, and footer index dots. Header and footer use `mix-blend-difference` to stay legible over both paper and the dark card. On coarse-pointer devices the cursor-follow is disabled and images auto-cycle on a timer. Motion respects `prefers-reduced-motion`. The font and all six images are vendored locally for offline use.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
