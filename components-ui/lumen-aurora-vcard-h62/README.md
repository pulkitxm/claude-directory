# Lumen Aurora — A Cinematic Personal Digital Visiting Card

A single-page, mobile-first personal vCard for a fictional individual (Nova Härenberg, "Creative Technologist & Generative Artist"). One tactile frosted-glass card floats over a slow, living aurora, stacking an avatar/name/role hero with a live "available" status, a short bio with tag chips, a quick-actions grid (email / call / WhatsApp), a social-link row, a "Save Contact" download, and a footer with location and a ticking local clock.

The design language is "Lumen Aurora" — dark, cinematic, near-black `#070a12` ink with a drifting multi-stop aurora (violet/cyan/magenta/indigo blobs), fine hairline borders, and a single reserved signal-amber accent `#ffb347` for the primary action. Type pairs a Fraunces display serif with Geist and Geist Mono, all vendored locally. Built as a self-contained static site (`index.html` + `styles.css` + vanilla `script.js`, no build step). Notable interactions: CSS-keyframe aurora drift with a grain overlay, staggered card entrance, desktop pointer parallax (`rotateX/Y` + specular highlight), a pulsing status dot, and a client-side vCard 3.0 `.vcf` generated in-browser from a single data object — all gated behind `prefers-reduced-motion`, with no runtime network calls.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
