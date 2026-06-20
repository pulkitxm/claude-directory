# Meridyne — Precision Grid Studio

A full, multi-section, responsive landing page for a fictional growth-systems studio named Meridyne — "we engineer marketing systems, not campaigns." The named design language is **Precision Grid Studio**: a calm, architecturally-ruled aesthetic like a Swiss engineering dossier printed on warm paper. Every module lives inside a hairline-ruled cell, and major frames are punctuated at their corners by small "plus" crosshair markers like registration marks on a print sheet.

Signature motifs run throughout: the plus crosshairs (turning cream on the green CTA), a hairline cell grid, and a text flip-up hover on nav and menu links. Sections include a celled nav with a hover-driven mega menu, a two-column hero with a cream testimonial card, a logo marquee, a strategy section, a cream capabilities band, a count-up impact stats section, a single-open FAQ, a solid forest-green closing CTA panel, and a footer. Motion is vanilla JS: IntersectionObserver reveals, `requestAnimationFrame` stat count-ups, the flip-up effect, the mega menu, and the marquee.

One typeface throughout — Inter Tight, vendored locally; portraits and images local; icons inline SVG.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
