# Voltframe — Bracketed Voltage Developer Portfolio Landing Page (HTML + CSS + Vanilla JS)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A single-creator developer portfolio landing page for **Voltframe**, built on a near-black stage (`#0F0F0F`) with one decisive electric-yellow accent (`#FAE100`). Its core motif is the *framed hero box* — a hairline-bordered rectangle with glowing corner nodes and gradient edge highlights that wraps the name like a blueprint bracket or schematic frame. The mood is precise and engineered: "terminal calm meets neon blueprint" — a quiet dark canvas where one live wire of yellow does all the emotional work, surrounded by a faint 50px grid, blurred pulsing orbs, and floating dust particles. Typography pairs self-hosted **Onest** for headings and nav with **Inter** as the utility face. Generated with Claude Fable 5.

The page runs as a centered ~750px column through a sticky blurred header, a hero with the framed title box, skills columns, a stack of featured-work project cards, a testimonials grid, an about section, contact, and footer. Decoration is schematic rather than decorative: hairline borders, corner node dots, and edge highlights instead of imagery.

Motion rewards curiosity. Hero title words turn yellow one at a time on hover; the framed box gains a soft yellow glow and lights its neutral corner nodes; cards lift and gain a yellow ring; section headings reveal word by word; and an IntersectionObserver fades and rises elements on scroll. Ambient orbs pulse and particles drift on loops, while `prefers-reduced-motion` keeps content visible without required motion. All fonts and avatar images are vendored locally for fully offline operation.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.

---

Part of the [Landing pages](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
