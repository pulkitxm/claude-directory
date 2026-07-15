# Lumen — SaaS Marketing Website Template Clone (Vanilla HTML/CSS/JS)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A self-contained, pixel-faithful clone of the **Lumen** SaaS marketing template (originally Shadcn/UI + Tailwind v4), rebuilt as plain HTML, CSS, and vanilla JavaScript with no build step. This is a full 20-page multi-page site — home, about, pricing, blog index plus 10 blog posts, FAQ, sign in, sign up, contact (rendered as the source's 404 page), terms and conditions, and privacy policy — with light/dark theming on OKLCH design tokens, soft aurora gradients, Inter typography, and reproduced interactions: a header theme toggle (localStorage + `prefers-color-scheme`, no-flash boot), an FAQ accordion, a monthly/annual pricing toggle, blog category filters and sort, a logo marquee, and scroll-reveal entrance animations. Everything runs offline from a static server with assets vendored locally under `assets/`. Generated with Claude Fable 5.

## Run

No build step. Serve the folder over a static HTTP server:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000/index.html>.

## Pages

- `index.html` — home (hero, logo marquee, features grid, feature showcase, testimonials, FAQ, pricing CTA)
- `about.html`, `pricing.html`, `faq.html`
- `blog.html` — blog index with category filter tabs, sort, and pagination
- `blog/<slug>.html` — 10 blog post articles
- `signin.html`, `signup.html`
- `contact.html` — reproduces the source's 404 "page not found" state
- `terms-and-conditions.html`, `privacy-policy.html`

See `prompt.md` for the full build spec and `demo.mp4` for the template in motion.

## Credits

Faithful clone of an existing design, recreated for study/learning. All credit for the original design goes to its creators.

**Original:** Lumen by Shadcnblocks — <https://www.shadcnblocks.com/template/lumen>

---

Part of the [Templates](../../) collection in the [claude-directory](../../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
