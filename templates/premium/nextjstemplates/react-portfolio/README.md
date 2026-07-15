# React Portfolio Template Clone - Minimalist Developer Portfolio (Vanilla HTML + CSS + GSAP)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A pixel-faithful static HTML, CSS, and vanilla JavaScript recreation of Chetan Verma's React Portfolio Template. The site reproduces the full multi-page layout, a pink-purple radial gradient decoration, a custom pointer on fine-pointer devices, and a light and dark theme toggle backed by `localStorage`. All fonts and imagery are vendored locally, so the project has no build step or runtime network dependency.

## Run

This project is plain HTML/CSS/JS with no build step. Serve the folder with any static file server:

```sh
python3 -m http.server 8080
```

Then open `http://localhost:8080` in your browser.

Alternatively, open `index.html` directly in a browser, though a local server is recommended so that navigation between pages works correctly.

## Features

- **Six pages** - Home, blog listing, three individual blog posts, and resume.
- **Light / dark mode** - toggled by clicking the sun icon in the nav; preference stored in `localStorage` and applied before first paint to avoid flash.
- **Custom SVG cursor** - a 30×30 px SVG circle tracks the mouse; hidden automatically on touch/coarse-pointer devices.
- **Pink-purple gradient decorations** - a radial-gradient circle (`#f86bdf` → `rgba(107,107,248,0.8)`) appears at the top and bottom of every page.
- **Sticky/fixed navigation** - desktop sticky header with scroll-to-section links (Work, About, Contact); mobile fixed header with a full-height hamburger popover.
- **Entrance animations** - hero headings and page titles slide into place with an opacity fade on load.
- **Work section** - 2-column grid of 6 projects, each with a tall cover image (600 px) that scales to `1.1×` on hover inside an `overflow: hidden` container.
- **Services section** - 2-column grid of 4 service cards with hover highlight and `scale(1.05)` transition.
- **Blog listing** - responsive 3/2/1-column grid of 3 post cards with cover image, title, preview text, and date.
- **Blog post page** - full-width hero image, large title, and a styled markdown body (`markdown-class`) with headings, lists, blockquote, inline code, and images.
- **Resume page** - centered card with name, bio, social links, experience entries with bullet points, education, and a 3-column skills grid (Languages, Frameworks, Others).
- **Hind typeface** - vendored locally in `assets/fonts/` (weights 400, 500, 700 as `.woff2`) so the site loads offline with no Google Fonts request.
- **Smooth hover transitions** - all interactive elements use `cubic-bezier(0,0,0.2,1)` at `0.3 s`.

## Project files

| File | Purpose |
|---|---|
| `index.html` | Home page - hero, work, services, about, contact |
| `blog.html` | Blog listing page |
| `blog/*.html` | Three individual blog posts with styled article bodies |
| `resume.html` | Resume / CV page |
| `styles.css` | All styles - layout, theming, responsive breakpoints |
| `enhancements.js` | Shared accessibility and theme synchronization behavior |
| `assets/` | Vendored fonts, SVG icons, project and blog images |

`prompt.md` holds the full build specification and `demo.mp4` shows the site in motion.

## Credits

Faithful clone of an existing design, recreated for study/learning. All credit for the original design goes to its creators.

**Original:** Chetan Verma's React Portfolio Template - <https://react-portfolio-template.netlify.app/>
