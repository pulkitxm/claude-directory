# Hemingway: Editorial Magazine and Podcast Website Template

[![Watch Demo](./poster.jpg)](./demo.mp4)

Hemingway is a pixel-faithful implementation of the Hemingway premium Astro template by Lexington Themes. It is a clean editorial content and podcast website built with HTML, CSS, and JavaScript. The template combines Inter and STIX Two Text, uses a carefully tuned neutral palette, and includes nine pages: Home, About, Magazine, Blog Post, Podcast, Podcast Interview, Pricing, Design System Overview, and 404. Images, supporting assets, and the Tailwind utility stylesheet are vendored locally.

## Run

No build step is required. Open the files directly or serve the directory with:

```sh
python3 -m http.server
```

Then open `http://localhost:8000/index.html`.

## Pages

| File | Description |
|------|-------------|
| `index.html` | Home: hero headline, popular posts grid, interviews, podcast CTA |
| `about.html` | About: two-column editorial layout with grayscale image grid |
| `blog.html` | Magazine: article grid with square images and metadata |
| `blog-post.html` | Blog Post: sticky large title, author bio, subscriber gate |
| `podcast.html` | Podcast: episode list with dual images per entry |
| `podcast-interview.html` | Podcast Interview: hero image, episode detail, subscriber gate |
| `pricing.html` | Pricing: four-tier pricing grid |
| `overview.html` | Overview: design system page listing all template pages |
| `404.html` | 404: large serif number with back-home button |

## Assets

All images are vendored locally in `assets/images/`. The Tailwind utility CSS is vendored at `assets/tailwind.css`. Fonts are loaded from Google Fonts and rsms.me CDN (Inter, STIX Two Text).

See `prompt.md` for the full build spec and `demo.mp4` for a live recording of the template in motion.

## Credits

Faithful clone of an existing design, recreated for study/learning. All credit for the original design goes to its creators.

**Original:** [Lexington Themes](https://lexingtonthemes.com/viewports/hemingway)
