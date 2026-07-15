# Cruip Simple Audit

Reference: <https://cruip.com/demos/simple/>

Content frame: <https://preview.cruip.com/simple/>

## Coverage

Live route discovery found thirteen pages. The initial clone contained eleven. The missing Terms of Service and Privacy Policy pages were added with their complete current content, navigation, and footer.

The audit captured the live content frame, initial clone, and repaired clone for every route. Responsive comparisons cover 390, 768, and 1280 pixels. Interaction evidence covers the category tabs, desktop Extra dropdown, yearly and monthly pricing, FAQ accordion, and mobile navigation.

## Findings and repairs

- Pages and sections: the eleven existing files had stale header placement, content blocks, footer links, and spacing. All thirteen pages now use the complete current live markup in source order.
- Missing pages: `terms.html` and `privacy.html` were added. Their protected contact addresses were restored as readable local content.
- Styles and assets: the current production stylesheet, AOS styles, images, favicons, and locally hosted scripts replace the stale approximation.
- Responsiveness: all thirteen pages match the live document dimensions at mobile, tablet, and desktop widths.
- Behavior: category tabs, pricing interval controls, FAQ accordions, desktop dropdowns, mobile navigation, and scroll animation initialization use the current production behavior.
- Themes: the reference exposes one light theme and no theme selector, so no second theme state applies.
- Offline behavior: all application assets are local and every route loads without a failed resource request.

## Verification

All thirteen desktop reference and clone screenshots have identical dimensions. The maximum desktop mean pixel error is 1.042245 on a 0 to 255 channel scale. All 39 responsive pairs also have identical dimensions, with an aggregate mean pixel error of 0.031597 and a maximum of 0.45884.

Two visual correction passes were used: complete live source reconstruction, then contact decoding and resource cleanup for the legal pages. Every route converged without a capped residual layout defect.
