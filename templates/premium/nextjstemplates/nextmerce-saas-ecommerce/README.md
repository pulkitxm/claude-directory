# NextMerce — SaaS E-commerce Storefront Template Clone (Vanilla HTML/CSS/JS + Swiper)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A self-contained, pixel-faithful clone of the NextMerce e-commerce template — a bright, conversion-focused online-electronics storefront — rebuilt as a static multi-page site in plain HTML, CSS and vanilla JavaScript (with Swiper for carousels), runnable offline with no build step. It reproduces the full storefront across 18 pages: a rich home page (hero carousel, category circles, new arrivals, promo banners, best sellers, a live countdown CTA, testimonials, newsletter), shop listings with and without a filter sidebar, category and popular listings, a product-details page (gallery + tabs + recently-viewed carousel), cart, checkout, wishlist, a blog (grid / grid-with-sidebar / details / details-with-sidebar), contact, sign in, sign up, mail-success and a 404 page — along with shared sticky header, nav dropdowns, slide-in mini-cart, quick-view modal, quantity steppers, tabs and hover/entrance interactions. The design language is airy modern SaaS-commerce: white surfaces, deep navy ink (#1C274C), a signature indigo-blue primary (#3C50E0), rounded corners and soft card shadows. Generated with Claude Fable 5.

## Run

This is a static multi-page HTML site — no build or install needed. Serve the folder over a local web server (so relative asset paths resolve), then open `index.html`:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000/
```

All pages, fonts (the template's rendered system-sans stack), logos, icons, promo art and product imagery are vendored locally under `assets/`. Swiper is bundled under `assets/vendor/`.

## How it was built

The pages were generated from captured reference DOM under `.reference/` by the helper script in `tools/build-pages.py`, which extracts each page body, strips Next.js runtime artifacts and inline Swiper state, rewrites image/route links to the local static files, and wraps everything in a shared shell that links `assets/css/vendor.css`, `assets/css/app.css` and the Swiper bundle. Interaction behavior (dropdowns, mini-cart drawer, quick-view modal, gallery swap, quantity steppers, tab switching, countdown timer, carousels) lives in `assets/js/app.js`.

The full build spec — every page, token, layout detail and reproduced interaction — is documented in `prompt.md`.

## Credits

Faithful clone of an existing design, recreated for study/learning. All credit for the original design goes to its creators.

**Original:** NextMerce — <https://demo.nextmerce.com/>

---

Part of the [Templates](../../../) collection in the [claude-directory](../../../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
