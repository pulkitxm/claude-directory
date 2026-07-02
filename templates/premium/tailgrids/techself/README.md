# TechSelf — Premium Electronics & Gadgets E-Commerce Template (Tailwind CSS + Vanilla JS)

[![Watch Demo](./poster.jpg)](./demo.mp4)

TechSelf is a premium, high-converting e-commerce design system and website template tailored specifically for electronics and gadgets retailers. It features a modern, responsive multi-page layout with a fully functional slide-out cart drawer, dynamic local storage-backed operations, and a dual-mode light/dark theme system. Generated with Claude Fable 5.

## Run

This is a static project that requires no compilation or build steps. To run locally, serve it with any static web server:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your web browser. Alternatively, you can open `index.html` directly in any web browser.

## Features

- **Multi-page Architecture**: A fully realized multi-page website featuring a Home landing page (`index.html`), Shop Directory (`shop.html`), Product Details page (`product-detail.html`), Checkout interface (`checkout.html`), and a Thank You success screen (`thank-you.html`).
- **Interactive Shopping Cart**: A slide-out shopping cart drawer with a live item counter, interactive quantity modifiers, and item removal, fully backed by `localStorage` for persistent state across pages.
- **Advanced Product Directory & Filters**: The shop directory features layout sorting and interactive collapsible sidebar accordions for categories, brands, price ranges, and ratings.
- **Product Details & Attribute Tabs**: An interactive product page containing image gallery slide previews, color selection, product quantity adjustments, and collapsible detailed information tabs (Description, Specifications, and Reviews).
- **Dual-Mode Theming**: Seamless dark and light mode toggle mounted in the header, utilizing Tailwind CSS variables and saving user preferences to `localStorage` to prevent screen flickering on page load.
- **Modern Polish & Styles**: Designed with the DM Sans font, smooth entry fade-in-up card transitions, scale hovers, and a sleek violet accent palette (#7C3AED / #8B5CF6).

## Credits

Faithful clone of an existing design, recreated for study/learning. All credit for the original design goes to its creators.

**Original:** Tailgrids — <https://techself.demos.tailgrids.com/>

---

Part of the [Templates](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
