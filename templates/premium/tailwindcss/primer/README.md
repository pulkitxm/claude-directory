# Primer — Info-Product / Book-Course Landing Page Clone (Vanilla HTML/CSS/JS)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A pixel-faithful clone of the Tailwind Plus "Primer" info-product landing template, rebuilt as a self-contained single-page marketing site for a fictional book + video course ("Everything Starts as a Square") with no build step. It reproduces the editorial blue/slate design same-to-same — a dark book-cover hero, a sticky numbered section-tab navigation that tracks the active section on scroll, a "See more" table-of-contents expand, scroll-entrance reveals via IntersectionObserver, hover states, email-capture forms, and a mobile dropdown menu. Built with plain HTML, CSS, and vanilla JavaScript, all assets vendored locally. Generated with Claude Fable 5.

## Run

This is a static site with no build step. Serve the folder with any static server and open `index.html`:

```sh
python3 -m http.server
```

Then visit the printed local URL (default `http://localhost:8000`) and open `index.html`. You can also open `index.html` directly in a browser.

## Verify

Load the page in a browser and check the reproduced interactions:

- Sticky section-tab navigation (`01`–`05`) highlights and glides its glow under the active section as you scroll.
- The table-of-contents "See more" toggle smoothly expands the hidden chapter groups (and flips to "See less").
- Hover states on buttons, links, and cards (darken / lift / shadow).
- Scroll-entrance reveals fade/slide sections up as they enter the viewport.
- The email-capture forms focus-ring on input and confirm without a backend (submit is prevented).
- On mobile, the "Contents" pill opens a full dropdown menu (01–05) with a close X.

`prompt.md` holds the full build spec, and `demo.mp4` shows the template in motion.

## Credits

Faithful clone of an existing design, recreated for study/learning. All credit for the original design goes to its creators.

**Original:** Tailwind Plus (Primer template) — <https://tailwindcss.com/plus/templates/primer/preview>

---

Part of the [Templates](../../../README.md) collection in the [claude-directory](../../../../README.md) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
