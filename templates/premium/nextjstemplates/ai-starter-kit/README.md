# AIStarterkit — AI Tools SaaS Landing Page Template Clone (Vanilla HTML/CSS/JS)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A self-contained, pixel-faithful clone of the **AIStarterkit** marketing site for a self-hosted AI starter kit product (text/image/code/video/email generators), rebuilt as plain HTML, CSS, and vanilla JavaScript with **no build step**. It pairs the `Onest` variable font and a purple gradient-button system with a sticky pill header (Products/Pages dropdowns), a floating-chip AI hero, a dark "key benefits" band, a monthly/annually pricing toggle, an FAQ accordion, and a testimonials "show more" grid — plus light/dark theme support — across seven full pages. All fonts and imagery are vendored locally under `assets/` so the site runs completely offline.

## Pages

Seven static pages share the same sticky header and dark footer:

- `index.html` — Home: hero, trusted-by logo strip, core-features grid, product tools showcase, dark benefits band, testimonials, pricing, FAQ.
- `pricing.html` — Pricing: the same pricing cards and FAQ accordion as the home page, standalone.
- `contact.html` — Contact: name/email fields and a message form on a soft gradient-glow card.
- `signin.html` — Sign In: social buttons, email/password (with show/hide toggle), "keep me logged in," and a demo-account link.
- `signup.html` — Sign Up: social buttons, name/email/password (with show/hide toggle).
- `reset-password.html` — Reset Password: single email field and a link back to sign in.
- `privacy.html` — Privacy Policy: long-form legal copy with subheadings and bulleted lists.

## Interactions

All behavior is in `script.js` (no framework, no bundler):

- **Theme toggle** — header sun/moon icon button toggles a `dark` class on the root element, persists the choice in `localStorage`, and honors `prefers-color-scheme` on first load.
- **Nav dropdowns** (`Products`, `Pages`) — fade + slide-down panels with a rotating chevron, closing on outside click or Escape.
- **Mobile menu** — hamburger button (below the `lg` breakpoint) toggles a slide-down nav panel.
- **FAQ accordion** — click to expand/collapse, first item open by default, animated open/close with a plus/minus icon swap.
- **Pricing Monthly/Annually toggle** — segmented control re-renders price and billing-period text on all four pricing cards.
- **Testimonials "show more"** — reveals additional testimonial cards and removes the bottom fade-gradient mask.
- **Password visibility toggle** — eye/eye-slash icon in sign-in/sign-up password fields switches `type="password"` ↔ `type="text"`.
- **Scroll-reveal entrance animations** — hero chips, feature cards, and testimonial cards fade/slide into view on scroll.

## Run

There is no build step or dependencies. Serve the folder over a static HTTP server, then open the site in a browser:

```sh
python3 -m http.server 8000
# then open http://localhost:8000/
```

Any static file server works (for example `npx serve`). The full build spec lives in `prompt.md`, and `demo.mp4` (poster: `poster.jpg`) shows the site and its interactions in motion.

## Credits

Faithful clone of an existing design, recreated for study/learning. All credit for the original design goes to its creators.

**Original:** Next.js Templates (Pimjo) — <https://demo.aistarterkit.nextjstemplates.com/>

---

Part of the [Templates](../../../) collection in the [claude-directory](../../../../) — an open-source gallery of AI-generated UI. [Browse the live gallery](https://pulkitxm.com/claude-directory).
