# GoStartup — Next.js Startup Boilerplate Clone (Vanilla HTML/CSS/JS + Tailwind CSS)

[![Watch Demo](./poster.jpg)](./demo.mp4)

GoStartup is a pixel-faithful, offline-runnable reproduction of the "GoStartup" Next.js business/startup boilerplate, rebuilt as plain HTML, CSS, and vanilla JS with no build step and no framework runtime. It is a dark-mode-first SaaS/startup marketing site (with a full light-mode toggle) styled with Tailwind CSS, using a deep navy-black background, an indigo/blue "startup blue" accent, Inter for body text, and Lexend for headings. The site reproduces the full one-page marketing home (hero, features, about, team, portfolio, testimonials, logo cloud, pricing, blog preview, contact form, final CTA), a full blog (index + 6 post detail pages + a tag-filter page), a docs section with sidebar navigation, a support/contact page, sign-in/sign-up auth pages, and a 404 page — including hover states, a sticky header with a "Pages" dropdown, a persisted light/dark theme toggle, and scroll-triggered fade/slide entrance animations. Generated with Claude Fable 5.

## Run

This project has no build step — it ships as static HTML/CSS/JS. Serve the folder with any static file server, e.g.:

```sh
python3 -m http.server
```

then open `http://localhost:8000/index.html` (or open `index.html` directly in a browser).

### Regenerating pages (authoring-time only)

Each page's HTML is assembled from shared `_partials/header.html` / `_partials/footer.html` and a per-page fragment in `_content/`, driven by `_pages.json`. This is only needed if you edit a partial or content fragment — the output pages are plain static HTML and require no build to serve:

```sh
node _build.mjs
```

## Verify

The full build spec — palette tokens, typography, page-by-page layout, and every interaction to reproduce — is documented in `prompt.md`. `demo.mp4` shows the site in motion (theme toggle, scroll animations, tab/carousel/filter interactions).

## Credits

Faithful clone of an existing design, recreated for study/learning. All credit for the original design goes to its creators.

**Original:** nextjstemplates.com (GoStartup / Go Next.js Starter) — <https://go.demo.nextjstemplates.com>

---

Part of the [Templates](../../../) collection in the [claude-directory](../../../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
