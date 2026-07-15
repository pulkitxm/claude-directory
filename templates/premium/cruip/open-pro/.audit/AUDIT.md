# Cruip Open Pro audit

Reference wrapper: <https://cruip.com/demos/open-pro/>

Direct content source: <https://preview.cruip.com/open-pro/>

## Coverage

The live source and clone both contain 12 routes: home, pricing, about, blog, blog post, help, newsletter, contact, 404, sign in, sign up, and reset password. No route was missing or extra. Every page was checked from top to bottom for complete sections, cards, rows, posts, team members, pricing tiers, forms, header, and footer content. No live section was omitted or abridged after repair.

## Initial drift

Eight of the 12 initial full-page captures had document-height mismatches. The home page was 31 pixels too tall, pricing was 31 pixels too tall, and several inner pages differed by 30 pixels. Equal-height pages ranged from SSIM 0.952329 to 0.997749. The clone also used an older release and asset layout.

## Repair

One repair iteration was run for every route. The complete current HTML, compiled Tailwind styles, Alpine and AOS behavior, images, video, favicons, and Nacelle files were refreshed. Inter was vendored locally. The resources dropdown, mobile menu, video modal, workflow tabs, billing toggle, blog filter, help navigation, spotlight behavior, scroll reveals, focus styling, and form validation were replayed against the source.

## Verification

Final full-page SSIM ranged from 0.999566 to 0.999989 with exact document dimensions on every route. Thirty-six responsive comparisons covered 390, 768, and 1280 pixel widths. All pairs had identical document dimensions, median SSIM was 0.999908, and minimum SSIM was 0.997481. Thirteen interaction captures had median SSIM 0.999987 and minimum SSIM 0.988704. The lowest state was an independently timed workflow transition. Open Pro is dark-only and has no theme toggle, so a second theme was not applicable.

Every route converged after one repair iteration with no residual page, section, breakpoint, interaction, or theme gap.
