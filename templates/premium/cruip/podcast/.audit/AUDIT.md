# Cruip Podcast audit

Reference wrapper: <https://cruip.com/demos/podcast/>

Direct content source: <https://preview.cruip.com/podcast/>

The source and clone both contain `index.html`, `podcast.html`, and `subscribe.html`. No route was missing or extra. Every landing-page section, all eight episodes, six hosts, six testimonials, the complete player content, related episodes, subscription platforms, and copyable podcast URL were checked.

One repair iteration refreshed the complete current HTML, compiled styles, Alpine, AOS, Swiper, imagery, audio, favicons, and locally vendored fonts. The source had changed its subscribe page from the older email-capture specification to platform links and a copyable URL, which is now reproduced in full.

Final full-page captures had exact dimensions, with SSIM 0.999832 for home, 0.990554 for the independently timed audio page, and 1.0 for subscribe. Nine responsive pairs at 390, 768, and 1280 pixels all had identical dimensions. Median responsive SSIM was 0.999703 and minimum SSIM was 0.986527 on the timed audio page. All seven deterministic filter, player, focus, and copy states reached SSIM 1.0. Podcast is dark-only and has no theme toggle.

All three routes converged after one repair iteration with no residual page, section, breakpoint, interaction, or theme gap.
