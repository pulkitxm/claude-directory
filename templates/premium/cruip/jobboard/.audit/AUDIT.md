# Job Board Template Audit

Reference: <https://cruip.com/demos/jobboard/>

Direct template source: <https://preview.cruip.com/job-board/>

Audit date: 2026-07-15

## Scope

The live template exposes four routes, and the clone contains the same four pages:

| Page | Live route | Clone file | Result |
| --- | --- | --- | --- |
| Home | `/job-board/` | `index.html` | Faithful |
| Job detail | `/job-board/job-post.html` | `job-post.html` | Faithful |
| Sign in | `/job-board/signin.html` | `signin.html` | Faithful |
| Post a job | `/job-board/post-a-job.html` | `post-a-job.html` | Faithful |

No missing or extra routes remain. Every live section is present in the same order, including the hero, company strip, filter panel, complete job list, newsletter insertion, testimonials, job detail sidebar, related jobs, authentication panels, posting form, add-ons, and footers.

## Drift repaired

The previous clone represented an older and abridged release. Its generated CSS contained 15,823 to 16,042 bytes of active rules compared with 49,871 bytes in the current live build. The current source pages, complete content, generated Tailwind styles, Alpine behavior, images, typography, scripts, and favicon set were restored from the live template. External font requests were replaced by locally vendored copies of the exact current font files.

## Verification

Fresh reference, initial clone, and repaired clone captures are stored in this directory. The reference was captured from the direct template URL, without the Cruip preview toolbar.

- Responsive coverage: 390, 768, and 1280 pixels on every route
- Theme coverage: both light and dark operating system preferences on every route
- Interaction coverage: filter checkboxes, remote toggle, location select, form focus, required-field validity, both add-on toggles, and social-link hover
- Required form behavior: both sign-in and job-posting forms report invalid while required fields are empty in the reference and clone
- Theme behavior: the template intentionally remains light under both color preferences
- Responsive geometry: every reference and clone document has identical width and height at every tested breakpoint
- Responsive screenshot SSIM: 0.999909 to 1.000000
- Interaction-state screenshot SSIM: 0.999906 to 1.000000

Exact document heights in pixels:

| Page | 390 | 768 | 1280 |
| --- | ---: | ---: | ---: |
| Home | 6542 | 4771 | 3645 |
| Job detail | 4068 | 3143 | 2401 |
| Sign in | 900 | 900 | 900 |
| Post a job | 1629 | 1581 | 1581 |

## Verdict

All four pages converged in one repair iteration. Pages, sections, styles, responsive layouts, hover and focus states, interactive behavior, and light-theme behavior match the current original. No residual visual or behavioral differences were found beyond subpixel font rasterization from serving the same font files locally.
