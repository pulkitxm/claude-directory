# Sidefolio — Developer Portfolio Website Template Clone (Vanilla HTML/CSS/JS)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A faithful, pixel-level clone of the "Sidefolio" developer portfolio template, rebuilt as a self-contained static website in plain HTML, CSS, and vanilla JavaScript with no build step and all assets vendored locally so it runs offline. This light-theme portfolio is built around a fixed left sidebar (avatar, name and role, outline-icon navigation, socials, and a dark "Read Resume" pill button with an animated sky-glow hover) and a white rounded content panel, spanning all 14 pages of the template: home, about, projects list, four project detail pages, articles/blog list, four blog articles, contact, and resume. It uses the Cal Sans display font with a gradient-clipped heading treatment and Inter for body copy, staggered card entrance animations driven by IntersectionObserver, copy-to-clipboard code blocks on blog posts, and a mobile sidebar overlay toggle. Generated with Claude Fable 5.

## Run

This project has no build step — it is a set of static files. Serve the folder over HTTP (so relative asset and page links resolve) and open `index.html`:

```sh
python3 -m http.server 8000
# then open http://localhost:8000/index.html
```

Any static file server works; you can also open `index.html` directly, though a local server is recommended so cross-page navigation and fonts/images load reliably.

Pages:

- `index.html` (home), `about.html`, `projects.html`, `blog.html`, `contact.html`, `resume.html`
- `projects/aceternity.html`, `projects/algochurn.html`, `projects/moonbeam.html`, `projects/tailwindmasterkit.html`
- `blog/clean-code.html`, `blog/how-to-win-clients.html`, `blog/tailwindcss-tips-and-tricks.html`, `blog/dark-mode-with-nextjs.html`

Shared chrome (sidebar, content panel, footer) and interactions are mounted at runtime by `main.js` via `window.SidefolioChrome.mountChrome(...)`; page data lives in `data.js`, with `projects/project-detail.js` and `blog/article.js` rendering the detail pages. Styles are in `styles.css`; fonts, images, and logos are vendored under `assets/`.

The full build spec is in `prompt.md`, and `demo.mp4` (with `poster.jpg`) shows the template in motion.

## Credits

Faithful clone of an existing design, recreated for study/learning. All credit for the original design goes to its creators.

**Original:** Aceternity UI (Sidefolio template) — <https://ui.aceternity.com/template-preview/sidefolio-portfolio-template>

---

Part of the [Templates](../../../) collection in the [claude-directory](../../../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
