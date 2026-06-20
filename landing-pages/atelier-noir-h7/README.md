# Atelier Noir

A multi-section landing page for **Maison Éclisse**, a fictional Parisian fashion house, built in the "Atelier Noir" aesthetic — a quiet, editorial, haute-couture lookbook built on restraint, negative space, and the interplay of ink on bone. It reads like a printed campaign book that happens to scroll: section numbers, corner index markers, and running uppercase metadata in the margins. No gradients, no rounded corners — everything is hard-edged and architectural.

A single warm-neutral canvas (`#F4F1EA`) carries true-ink type with muted sepia secondary text. Display headings use a high-contrast Cormorant Garamond serif against a clean uppercase sans for labels — the signature typographic tension. Sections include a full-viewport editorial hero with a slowly rotating circular text badge, alternating collection diptychs, a staggered product grid, the journal, and a soot-dark footer. Motion covers IntersectionObserver fade-ups, image hover scales within clipped frames, and full-screen menu/search overlays, all respecting `prefers-reduced-motion`.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
