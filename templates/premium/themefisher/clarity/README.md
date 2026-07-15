# Clarity — SaaS Security Landing Page Template Clone (Vanilla HTML + CSS + JS)

[![Watch Demo](./poster.jpg)](./demo.mp4)

Pixel-faithful, self-contained clone of the Clarity Next.js SaaS/security marketing template by ThemeFisher, rebuilt as plain HTML, CSS, and vanilla JavaScript with no build step required. The template covers 14 pages — home, features, pricing, about, contact, blog, blog post, FAQ, integrations, case studies, careers, changelog, privacy policy, and 404 — all sharing a common header and footer. Standout UI details include a fixed navbar with mega dropdown, an animated SVG hero background, an infinite brand logo marquee, a monthly/yearly pricing toggle, a Swiper.js testimonials carousel, an FAQ accordion, and AOS scroll entrance animations throughout. All fonts (Satoshi, Clash Grotesk), images, and icons are vendored locally so the project runs fully offline. Generated with Claude Fable 5.

## Run

No build step is required. Serve the project folder with any static file server and open it in a browser.

Using Python (built into most systems):

```sh
cd templates/premium/themefisher/clarity
python3 -m http.server 8080
```

Then open `http://localhost:8080/` in a browser. Any other static server (e.g. `npx serve .`, `npx http-server .`) works equally well.

## Pages

| File | Page |
|---|---|
| `index.html` | Home |
| `features.html` | Features |
| `pricing.html` | Pricing |
| `about.html` | About |
| `contact.html` | Contact |
| `blog.html` | Blog |
| `blog-post.html` | Blog Post |
| `faq.html` | FAQ |
| `integrations.html` | Integrations |
| `case-studies.html` | Case Studies |
| `careers.html` | Careers |
| `changelog.html` | Changelog |
| `privacy-policy.html` | Privacy Policy |
| `404.html` | 404 |

## Notes

- `assets/css/styles.css` — all design tokens, reset, typography, layout, and component styles.
- `assets/js/main.js` — navbar toggle, mega dropdown, pricing monthly/yearly toggle, FAQ accordion, AOS init, Swiper carousel, and marquee animation.
- `prompt.md` holds the full build specification including palette, type scale, and page-by-page layout details.
- `demo.mp4` shows the finished template in motion.

## Credits

Faithful clone of an existing design, recreated for study/learning. All credit for the original design goes to its creators.

**Original:** Themefisher — https://themefisher.com/demo?theme=clarity-nextjs

---

Part of the [Themefisher](../) provider collection within the [Templates](../../../) section of the [claude-directory](../../../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
