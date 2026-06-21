# Verdant Spine — Precision Chiropractic & Movement-Science Clinic Landing Page (Vanilla HTML/CSS/JS)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A full, multi-section, fully responsive marketing landing page for **Verdant Spine**, a fictional high-end chiropractic and movement-science clinic, styled in the "Clinical Calm" aesthetic. The design collides medical precision with the grounded, botanical stillness of a wellness retreat — Scandinavian health-spa meets sports-medicine — carried by a single sage-green brand color (`rgb(97, 142, 100)`) across a soft warm-grey-green paper canvas. The signature feature is a **glassmorphic appointment card** floating over the rounded hero image. Display headlines use Schibsted Grotesk with tight negative tracking over Inter body type, both locally vendored. Generated with Claude Fable 5.

Sections run from a thin deep-forest top bar and navigation, through a split hero with the frosted glass appointment form card, an about block with gradient stat cards and a glass play button, a deep-forest services section with an infinite uppercase marquee, a sticky-panel "how it works" steps layout, a scroll-snap testimonial carousel with frosted glass quote overlays, a three-column blog grid, and a rounded deep-forest footer with newsletter signup.

Motion is soft and deliberate: `IntersectionObserver` fade-ups with `cubic-bezier(0.16, 1, 0.3, 1)` ease, a seamless infinite marquee of giant uppercase type, a subtle vertical float for decorative elements, hover image scale and button/link color shifts, a `scrollBy`-driven testimonial carousel with boundary-aware prev/next buttons, the sticky "how it works" panel, and a right-side slide-in mobile menu that locks body scroll. All fonts and images are vendored locally so the project is offline-runnable.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.

---

Part of the [Landing pages](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
