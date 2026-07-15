# Carrington: Premium Law Firm Multi-Page Website Template

[![Watch Demo](./poster.jpg)](./demo.mp4)

Carrington is a multi-page professional services template suited to corporate and litigation-focused law firms. The design pairs a near-black background with gold accents, Inter Variable for body copy, and Newsreader serif for display headings. It includes a four-column mega menu, sticky navigation, fuzzy site search, a mobile menu, and animated statistics. The template ships 16 HTML pages, one stylesheet, and locally vendored images with no build step required.

## Pages

| File | Route |
|---|---|
| `index.html` | Home |
| `practice-areas.html` | Practice Areas |
| `cases.html` | Cases listing |
| `cases/acme-acquires-beta.html` | Case detail: Acme Acquires Beta |
| `cases/globaltech-merger-clearance.html` | Case detail: GlobalTech Merger |
| `cases/garcia-wrongful-termination.html` | Case detail: Garcia v. TechStart |
| `cases/megacorp-class-action.html` | Case detail: MegaCorp Class Action |
| `team.html` | Our Attorneys |
| `blog.html` | Journal and insights listing |
| `blog/posts/1.html` | Blog post detail 1 |
| `blog/posts/2.html` | Blog post detail 2 |
| `blog/posts/3.html` | Blog post detail 3 |
| `careers.html` | Careers |
| `press-and-media.html` | Press and media |
| `offices.html` | Offices |
| `contact.html` | Contact |

## Run

Serve the project folder with any static file server and open it in a browser.

```sh
python3 -m http.server 8080
```

## Key interactions

- **Sticky navigation:** The home page navigation starts transparent with white text, then transitions to an opaque white background with dark text. Inner pages use the opaque white state by default.
- **Mega menu:** Hover over Explore in the desktop navigation to reveal a four-column panel.
- **Search modal:** Click the search icon, press `Cmd+K`, or press `/` to open fuzzy search powered by Fuse.js 7. Press `Esc` or click outside to close.
- **Mobile menu:** A full-width dark panel contains navigation links and calls to action.
- **Countup statistics:** Numeric values animate when the home page statistics enter the viewport.

## Assets

37 `.webp` images are vendored locally in `assets/images/`, so no external image CDN is required.

## Credits

The original design is from [Lexington Themes](https://lexingtonthemes.com/viewports/carrington).

Part of the [Templates](../../README.md) collection.
