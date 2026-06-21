# Neumorphism Soft UI — Landing Page Design System (HTML + CSS)

A landing page that expresses the **Neumorphism / Soft UI** design system: the illusion of physical depth created through carefully balanced dual shadows — a light source from the top-left, a dark shadow falling bottom-right — on a single monochromatic cool-grey surface (`#E0E5EC`). Elements appear molded from the same continuous material, either extruded (raised) or inset (pressed into) the surface, never flat. A soft violet accent (`#6C63FF`) is used sparingly for CTAs and focus states. Type pairs Plus Jakarta Sans (display) with DM Sans (body). Generated with Claude Fable 5.

The signature is its shadow system: dual opposing RGBA shadows for smooth blending, deep inset "wells" for icons and inputs, hyper-rounded corners (32px containers, 16px elements), and complex nested depth (extruded → inset → extruded) that showcases the physics. Micro-interactions run 300ms ease-out — buttons lift on hover and press down on active, cards lift, and decorative concentric circles scale and rotate. Contrast meets WCAG AA/AAA and all interactive elements carry visible accent focus rings.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.

---

Part of the [UI design](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
