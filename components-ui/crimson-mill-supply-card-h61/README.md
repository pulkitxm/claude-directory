# Crimson Mill — Heritage Stone-Mill Digital Visiting Card

A vertical, mobile-first "digital visiting card" — a tap-to-contact brand page for a fictional heritage stone-mill supplier, Crimson Mill ("Stone-Ground Since 1962"). The page stacks rounded, soft-shadowed cards on a warm paper-cream canvas: a branded hero, a two-up contact grid, a product showcase gallery, a flagship-store location block, and an hours/footer strip — each revealed on scroll.

The design language is "Millstone Craft" — warm, artisanal, print-adjacent, deliberately the opposite of generic SaaS: paper-cream `#F4EDE1`, ink-charcoal type `#2B2118`, a brick-crimson accent `#A6271C`, and wheat-gold `#C99A3C`. Type pairs condensed uppercase Oswald (stamped flour-sack feel) with Inter Tight, both vendored locally. It's a self-contained static project (HTML + CSS + a small vanilla `script.js`, no build step). Motion includes `IntersectionObserver` scroll reveals with sibling stagger, a hardware-accelerated marquee ticker, press-scale feedback, and a pulsing "open" dot — all gated behind `prefers-reduced-motion`. Links are real `tel:` / `wa.me` / `mailto:` / maps actions; all assets are vendored under `assets/` so it runs offline.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
