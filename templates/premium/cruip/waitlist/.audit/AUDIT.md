# Cruip Waitlist audit

Reference wrapper: `https://cruip.com/demos/waitlist/`

Reference content: `https://preview.cruip.com/waitlist/`

## Scope and repairs

The live crawl confirmed one landing page. The stale clone was rebuilt from the current reference markup, styles, scripts, avatars, and font assets. Analytics was removed, Google font loading was replaced with local font files, and the README was reconciled.

Every current section is present in reference order: animated background, floating header, navigation, theme toggle, hero badge, headline, email form, member avatars, and footer.

## Verification

The responsive suite contains three reference and three clone screenshots at 390, 768, and 1280 pixels. Every pair has identical dimensions and zero normalized mean pixel error.

The light and dark themes were captured separately. Theme toggle replay matched the reference and applied the `dark` class in both copies.

The page converged in one repair loop. No residual page, section, style, breakpoint, hover, behavior, or theme gaps remain.

## Evidence

- `reference/`: current live capture, DOM outline, computed source CSS, and hover states
- `initial/`: pre-repair clone capture
- `final/`: repaired clone capture
- `responsive/`: six responsive screenshots
- `interactions/`: light and dark theme screenshots plus structured toggle results
- `measurements.json`: final responsive dimensions and pixel error
