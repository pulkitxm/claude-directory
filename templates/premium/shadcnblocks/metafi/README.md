# Metafi — Fintech Payments SaaS Template Clone (HTML/CSS/JS + shadcn OKLCH Tokens)

[![Watch Demo](./poster.jpg)](./demo.mp4)

Metafi is a same-to-same, multi-page clone of the Shadcnblocks "Metafi" fintech / payments SaaS marketing template, recreated for study as plain HTML, CSS, and vanilla JavaScript with no build step. It reproduces the shadcn/ui design system — Tailwind v4-style CSS custom properties in OKLCH, the Inter typeface, and shared header/footer chrome — across 14 pages with a persistent light/dark theme toggle, scroll-reveal entrance animations, an FAQ accordion, a monthly/annual pricing toggle, and a mobile menu. Useful as a reference for building a fintech landing page, a shadcn-token design system, or a static multi-page marketing site. Generated with Claude Fable 5.

## Pages

14 pages, all sharing an injected sticky header and footer:

- **Home** — hero, dashboard mockup, logo strip, feature grid, integrations, testimonials, FAQ accordion, latest blog posts, CTA banner
- **Features** — recurring billing / end-to-end billing sections
- **Integrations** — "all integrations" grid
- **About** — company + team
- **Pricing** — tiers with monthly/annual billing toggle and FAQ
- **Blog** — post card grid with category tags
- **Blog post** — article layout
- **Contact** — contact form + details
- **Login** / **Sign up** — auth card forms
- **Careers** — open roles listing
- **Privacy** / **Terms** / **Cookie policy** — long-form legal pages

## Features

- **shadcn OKLCH token design system** — colors, radii, and type scale driven by CSS custom properties, with a `.dark` override.
- **Light/dark theme toggle** — persists to `localStorage` (`metafi-theme`) and honors `prefers-color-scheme`; a small `theme-boot.js` runs in `<head>` to prevent a flash before paint.
- **Injected chrome** — `app.js` builds the shared header (with nav, theme toggle, login/get-started buttons, hamburger) and footer for every page.
- **Scroll reveals** — `IntersectionObserver` fade/rise entrance animations that fail open (content is never trapped hidden).
- **FAQ accordion**, **pricing billing toggle**, and a **mobile menu**, all in vanilla JS.

## Run

No build step — it's static HTML/CSS/JS. Serve the folder with any static server and open `index.html`:

```sh
python3 -m http.server
# then open http://localhost:8000/index.html
```

`prompt.md` holds the full build spec (design tokens, page list, layout), and `demo.mp4` shows the template in motion across both themes.

## Credits

Faithful clone of an existing design, recreated for study/learning. All credit for the original design goes to its creators.

**Original:** Shadcnblocks — <https://www.shadcnblocks.com/template/metafi>

---

Part of the [Templates](../../../templates/) collection in the [claude-directory](../../../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
