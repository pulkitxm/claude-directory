# Finorio — Finance SaaS Landing Page Template Clone (Vanilla HTML/CSS/JS)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A self-contained, pixel-faithful clone of the **Finorio** finance / money-management SaaS marketing template, rebuilt as plain HTML, CSS, and vanilla JavaScript with **no build step**. It pairs a light lavender / off-white palette and a rounded geometric display font ("Stack Sans Text") with a floating pill navbar, phone-mockup hero, soft gradient feature cards, a monthly/annually pricing toggle, a testimonial grid, an FAQ accordion, and a lavender CTA panel — across seven full pages. All assets (font, webp imagery, inline logo/badge SVGs) are vendored locally so the site runs completely offline. Generated with Claude Fable 5.

## Pages

Seven static pages share the same pill header and light footer (injected from `partials.js`):

- `index.html` — Home: hero, stats bar, feature-card grid, alternating image/text feature rows, pricing, testimonials, FAQ, CTA.
- `features.html` — Features: hero preview cards, alternating feature rows, security section, 6-icon feature grid.
- `pricing.html` — Pricing: monthly/annually plan cards plus a "Compare our plans" comparison table.
- `contact.html` — Contact: contact info and a message form, plus the FAQ accordion.
- `login.html` — Log in: email/password card with eye toggle, remember-me, and Google sign-in.
- `register.html` — Create account: name/email/password card with eye toggle.
- `forget-password.html` — Forgot password: email reset card.

## Interactions

All behavior is in `script.js` and `partials.js` (no framework, no bundler):

- **Pricing Monthly/Annually toggle** — switches every plan price between monthly and annual values via `data-monthly`/`data-annual` attributes; defaults to Annually.
- **FAQ accordion** — click to expand/collapse, first item open by default, animated `max-height` with a +/− icon swap.
- **Password eye toggle** — switches login/register password inputs between `password` and `text`.
- **Mobile hamburger menu** — toggles the pill nav open on small screens.
- **Scroll-reveal entrance animations** — `IntersectionObserver` fades and rises sections/cards into view with staggered delays (falls back to instantly visible where unsupported).
- **Demo forms** — submit is prevented for forms marked `data-demo`.

## Run

There is no build step or dependencies. Serve the folder over a static HTTP server (needed so the `partials.js` injection and local font/webp assets load correctly), then open the site in a browser:

```sh
python3 -m http.server 8000
# then open http://localhost:8000/
```

Any static file server works (for example `npx serve`). The full build spec lives in `prompt.md`, and `demo.mp4` (poster: `poster.jpg`) shows the site and its interactions in motion.

## Credits

Faithful clone of an existing design, recreated for study/learning. All credit for the original design goes to its creators.

**Original:** Finorio (Next.js Templates) — <https://finorio.demo.nextjstemplates.com/#hero>

---

Part of the [Templates](../../../) collection in the [claude-directory](../../../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
