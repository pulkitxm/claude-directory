# Modern Obsidian — Elite Waitlist & Design System Landing Page (HTML + CSS + JS)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A monochromatic elite waitlist landing page built in the "Modern Obsidian" design system: a strictly black-to-white palette (`#080808` to `#FFFFFF`) with silver gradients, editorial serif italics, technical monospace labels, frosted-glass UI, and a noise-textured background that creates depth without color — ideal as a premium dark landing page or exclusive membership template. Generated with Claude Fable 5.

Typography pairs DM Serif Display (italic, for the hero headline at `clamp(42px, 10vw, 140px)`), Geist Mono (for all technical labels and buttons), and Inter (body). Layouts use fluid 92vw widths for editorial impact. The vertical narrative runs nav → explosive hero → metadata bar → beta capture form → urgency/social-proof strip → bento feature grid → value proposition → testimonials → final CTA → footer. Signature components include an editorial countdown timer with serif numerals and slash separators, a floating mobile bottom nav that appears after the hero, and a 2×2 member registry card with hover slides. Entry animations are staggered slide-ups on a `cubic-bezier(0.16, 1, 0.3, 1)` curve; depth comes from borders and backdrop-blur, not box-shadows.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.

---

Part of the [Templates](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
