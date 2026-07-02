# SD — Typography-First Editorial Creative Studio Landing Page (HTML + CSS + JS)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A typography-first creative studio landing page in a strict black-and-white palette (`#000000` / `#FFFFFF`) built around Inter set at extreme weight and size contrasts — an editorial portfolio template with per-letter text reveals, a continuous motion marquee, and grayscale-to-color project grid hover transitions. Generated with Claude Fable 5.

The layout follows a spacious vertical flow: a fixed `mix-blend-difference` header, a massive display hero ("Design Studio") with a staggered per-letter reveal, a continuous motion marquee, a centered intro statement, a two-column project grid (six projects with title / category / year metadata), and a high-contrast dark footer. Signature components include a custom 32px `mix-blend-difference` cursor that lerps toward the mouse and scales 2.5× on interactive elements, and asymmetrical marquee cards using non-uniform border radii. All easing uses `cubic-bezier(0.16, 1, 0.3, 1)` for a premium feel, with text-span reveals sliding up over 1s and a 30s marquee that pauses on hover. Images stay grayscale, shifting to full color on hover to keep the visual discipline.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.

---

Part of the [Templates](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
