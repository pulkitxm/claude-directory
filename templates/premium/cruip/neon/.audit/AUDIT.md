# Cruip Neon audit

Reference wrapper: <https://cruip.com/demos/neon/>

Direct content source: <https://preview.cruip.com/neon/>

## Coverage

The live source and clone both contain four routes: `index.html`, `signin.html`, `signup.html`, and `reset-password.html`. No route was missing or extra. The landing page was checked from top to bottom for its hero, logo cloud, two feature areas, pricing, nine testimonials, six filtered resources, CTA, and footer. The three authentication pages were checked for their full forms and illustration panels. No section was missing or abridged.

## Initial drift

The existing landing page was 5,671 pixels tall at the audit viewport while the current source was 5,534 pixels tall. Its compiled styles were an older 65 KB release, compared with the current 81 KB release. The authentication pages had the right structure but visual SSIM ranged from 0.997867 to 0.998456.

## Repair

One repair iteration was run for each page. The complete current HTML, compiled Tailwind styles, Alpine behavior, AOS behavior, images, favicons, and Uncut Sans files were refreshed. Inter was vendored locally. The resource filters, scroll reveals, focus styling, native form validation, hover states, and transitions were replayed against the live source.

## Verification

All four final full-page captures reached SSIM 1.0. Twelve explicit responsive comparisons covered 390, 768, and 1280 pixel widths. Every pair had identical document dimensions, the median SSIM was 1.0, and the minimum was 0.999891. Eleven deterministic interaction captures ranged from 0.995980 to 1.0. Small nonzero differences came from native browser validation timing. Neon is dark-only and has no theme toggle, so a second theme was not applicable.

All four page loops converged after one repair iteration with no residual layout, section, breakpoint, interaction, or theme gaps.
