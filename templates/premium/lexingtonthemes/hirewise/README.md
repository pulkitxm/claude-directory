# Hirewise: Job Board Website Template

[![Watch Demo](./poster.jpg)](./demo.mp4)

Hirewise is an 11-page job board website template based on the original Astro and Tailwind design by Lexington Themes. It covers job listings with category filters, detailed job and company pages, a candidate directory, pricing, a blog, and authentication forms. Visual highlights include a light and dark mode toggle persisted in `localStorage`, fuzzy search powered by Fuse.js, a large navigation panel with colorful category tiles, and a responsive card-based layout using Geist and a custom OKLCH color scale.

## Pages

| File | Page |
|---|---|
| `index.html` | Home: hero, featured jobs, jobs by category, companies, candidates, newsletter |
| `jobs.html` | Browse all jobs |
| `job-detail.html` | Single job listing |
| `companies.html` | Company directory |
| `company-detail.html` | Individual company profile |
| `candidates.html` | Candidate directory |
| `pricing.html` | Pricing plans |
| `blog.html` | Blog / news listing |
| `sign-in.html` | Sign in |
| `sign-up.html` | Register |
| `submit-job.html` | Job submission form |

## Run

No build step required. Serve the folder with any static file server:

```sh
cd templates/premium/lexingtonthemes/hirewise && python3 -m http.server 8080
```

Then open http://localhost:8080 in your browser.

## Notes

- Dark mode is toggled via a `.dark` class on the `<html>` element and persisted in `localStorage`. A boot script prevents flash on page load.
- Fuzzy search across jobs, companies, and candidates is handled client-side by [Fuse.js](https://fusejs.io/), loaded from CDN.
- All pages share a single `styles.css`; no framework or bundler is needed.
- `prompt.md` holds the full build specification and `demo.mp4` shows the template in motion.

## Credits

Faithful clone of an existing design, recreated for study/learning. All credit for the original design goes to its creators.

**Original:** [Lexington Themes](https://lexingtonthemes.com/viewports/hirewise)
