# Job Board: Cruip Template Clone

[![Watch Demo](./poster.jpg)](./demo.mp4)

A pixel-faithful, self-contained HTML, CSS, and JavaScript reproduction of the Cruip Job Board template. It includes the landing page, sign-in page, job posting form, and job detail page as static files with no build step.

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero, company logo strip, job list with sidebar filters, newsletter CTA, testimonials, footer |
| Sign In | `signin.html` | Magic-link email sign in + Google OAuth, split-panel layout with testimonials |
| Post a Job | `post-a-job.html` | 3-step job posting form with add-on selection, split-panel layout |
| Job Detail | `job-post.html` | Full job description, company sidebar card, related jobs, newsletter CTA |

## Features Reproduced

- Sticky header with backdrop blur
- Hero with indigo gradient background and decorative SVG illustration
- Press logo strip with six company marks
- Filterable job list: Job Type, Job Roles, Remote Only toggle, Salary Range, Location
- Highlighted featured job card (Qonto) with star badge
- Newsletter CTA embedded mid-list between jobs 10 and 11
- Hover states: job card reveals "Apply Now" button, arrow icon slides right
- Testimonial cards with CSS `rotate(±1deg)` that straighten on hover
- Split-panel auth layout (left form + right fixed decorative panel)
- Add-on selection with animated plus and checkmark toggles
- "Follow us" cursive label in footer

## Design Tokens

- **Primary**: `#6366f1` (indigo)
- **Font**: Inter variable (wt 100–900) + Nothing You Could Do (cursive accents)
- **Border radius**: 9999px (pills), 0.75rem (cards), 0.25rem (inputs)
- **Transitions**: 150ms `cubic-bezier(0.4, 0, 0.2, 1)`

## Run Locally

```bash
cd templates/premium/cruip/jobboard
python3 -m http.server 8080
```

Open `http://localhost:8080`. No dependencies or build step are required. Fonts, images, scripts, and favicons are vendored locally.

## Credits

Faithful clone of an existing design, recreated for study/learning. All credit for the original design goes to its creators.

**Original:** Cruip, <https://cruip.com/demos/jobboard/>

[Back to Cruip templates](../) · [All premium templates](../../) · [Root gallery](../../../../)
