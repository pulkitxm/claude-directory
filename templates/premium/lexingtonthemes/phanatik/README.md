# Phanatik — News & Magazine Website Template (Vanilla HTML + CSS + JavaScript)

[![Watch Demo](./poster.jpg)](./demo.mp4)

Phanatik is a pixel-faithful reproduction of the Lexington Themes premium news and magazine template, built as self-contained plain HTML, CSS, and vanilla JavaScript with no build step required. It delivers a full editorial layout across three pages — a content-rich homepage, an about page, and a single blog post reader — styled with the Inter and STIX Two Text font pairing for a refined, authoritative feel. Ideal for digital publishers, online magazines, and news portals covering categories like sports, tech, business, finance, health, and economics. Generated with Claude Fable 5.

## Pages

- `index.html` — Homepage with featured article hero, breaking news card grid, top stories section, briefs grid, sidebar (finance highlight, podcast list, advertisement), and per-category article grids (Business, Finance, Tech, Health, Sports)
- `about.html` — Two-column editorial about page with team photo, mission text, and contact CTA
- `blog-post.html` — Single post reader with byline, hero image, prose body, subscriber paywall teaser, sticky sidebar, and related posts grid

## Features

- Sticky navigation header with a live clock, centered logo, search icon, sign-in/sign-up buttons, and hamburger toggle
- Mega-menu dropdown with category links, top stories, and latest podcast episodes
- Scrolling headline ticker — infinite marquee that pauses on hover
- 4-column homepage grid (3 content columns + 1 sidebar)
- Dark footer (base-950 background) with newsletter signup form and 4-column links grid
- OKLCH color palette with a blue interactive accent (accent-500)
- Cubic-bezier transitions (500 ms) on interactive elements; 32 s linear marquee animation

## Run

No build step needed. Open any page directly in a browser:

```sh
open index.html
```

Or serve the folder with a static file server to avoid any browser file-protocol restrictions:

```sh
python3 -m http.server 8080
# then open http://localhost:8080
```

## Reference

`prompt.md` contains the full build specification. `demo.mp4` shows the template in motion.

## Credits

Faithful clone of an existing design, recreated for study/learning. All credit for the original design goes to its creators.

**Original:** Lexington Themes — https://lexingtonthemes.com/viewports/phanatik

---

Part of the [Templates](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
