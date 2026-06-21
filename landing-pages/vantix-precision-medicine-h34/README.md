# Vantix — Precision Medicine & Clinical Intelligence Landing Page (Vanilla HTML + CSS + JS)

[![Watch Demo](./poster.jpg)](./demo.mp4)

**Vantix** is a self-contained, fully responsive marketing landing page for a fictional next-generation precision-medicine institute. The **"Clinical Obsidian"** aesthetic is a deep-navy, instrument-grade design language that crosses a diagnostics command console with an editorial medical journal — dark obsidian canvas, electric cyan-blue accent, crisp off-white type, hairline borders, fine grid lines, and technical JetBrains Mono micro-labels that read like telemetry. An authoritative clinical and healthcare landing page suited to precision medicine, medical AI, and biotech brands. Generated with Claude Fable 5.

The page runs top to bottom through a fixed translucent header, an asymmetric hero split (38/62) with count-up metrics, a cyan rapid-response strip, a three-card capabilities grid, a platform/tech split with a numbered feature list, a four-up specialists grid, a consultation-request contact section with inline (no-endpoint) submit handling, and a four-column footer. Type pairs Bricolage Grotesque display headlines with Inter Tight body, all fonts vendored locally. Motion is driven by `IntersectionObserver` staggered fade-and-rise reveals (plus a scale variant for specialist cards), hero numerals that count up on load, editorial photos that transition from grayscale to full color on hover, a pulsing rapid-response ring, and hover micro-interactions — all respecting `prefers-reduced-motion`. JavaScript is dependency-free vanilla, with a CSS custom-property token layer and a custom cyan-on-navy scrollbar.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.

---

Part of the [Landing pages](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
