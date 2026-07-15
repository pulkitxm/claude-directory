# Oatmeal — SaaS Marketing Kit Template Clone (HTML + CSS + Vanilla JS)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A self-contained, pixel-faithful clone of the Tailwind Plus "Oatmeal" SaaS marketing kit in its olive + Instrument Serif theme, rebuilt as plain HTML, CSS, and vanilla JavaScript with no build step. This warm, editorial multi-page website template spans 13 pages — three home layouts, three about layouts, three pricing layouts, two privacy-policy layouts, and two 404 pages — sharing a centered top nav and a four-column footer, with all fonts (Inter + Instrument Serif) and imagery vendored locally so it runs fully offline. A small vanilla-JS shim (`assets/js/oatmeal.js`) reimplements the original's `command` / `commandfor` invoker behaviors — a native `<dialog>` mobile menu, FAQ disclosures, Monthly/Yearly pricing tabs, and a click-to-copy code snippet — and adds an IntersectionObserver entrance-reveal system. Built with HTML + CSS + vanilla JS. Generated with Claude Fable 5.

## Run

This is a static site with no build step. Serve the folder with any static file server, for example:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000/index.html>.

The other pages live alongside `index.html`: `home-02.html`, `home-03.html`, `about.html`, `about-02.html`, `about-03.html`, `pricing.html`, `pricing-02.html`, `pricing-03.html`, `privacy-policy.html`, `privacy-policy-02.html`, `404.html`, and `404-02.html`.

## Notes

- **No proprietary dependencies.** The original drives interactivity with the proprietary `@tailwindplus/elements` module. This clone replaces it with `assets/js/oatmeal.js`, which reimplements the same `command` / `commandfor` invoker API: `show-modal` / `close` (mobile menu `<dialog>`), `--toggle` (FAQ disclosures with `aria-expanded`), pricing tab groups, and `--copy` (the `npm install oatmeal` snippet on home-03), plus an IntersectionObserver fade-and-rise reveal.
- **Vendored assets.** Inter and Instrument Serif fonts are self-hosted under `assets/fonts/`, and all imagery lives under `assets/img/`, so nothing is fetched from the network at runtime.
- See `prompt.md` for the full style and layout breakdown (OKLCH olive palette, typography, per-page structure), and `demo.mp4` (with `poster.jpg`) to see the kit in motion.

## Credits

Faithful clone of an existing design, recreated for study/learning. All credit for the original design goes to its creators.

**Original:** Tailwind Plus (Tailwind Labs) — Oatmeal SaaS marketing kit — <https://tailwindcss.com/plus/kits/oatmeal/preview?theme=olive_instrument>

---

Part of the [Templates](../../../) collection in the [claude-directory](../../../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
