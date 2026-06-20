# Verdigris Trail — Architecture Studio Landing Page

A quiet, gallery-like editorial landing page for **Verdigris Archi.**, a fictional high-end architecture studio. The named design language is **"Architectural Trail"** — a printed-monograph feel set on a soft fennel-pastel canvas, with ink-dark Playfair Display serif type punctuated by a single luminous mint accent. The whole page is threaded by a literal "trail": a faint hairline running down the left margin with a glowing mint comet looping top-to-bottom, and each major section numbered as a "trail entry."

Sections move from a transparent fixed header and a left-weighted serif hero with a circular "Begin Trail" CTA, through a scrolling pillar marquee, a grayscale-to-color brutalist hero image, numbered principle cards, a staggered two-column projects gallery, an ink-dark stats band, and a closing contact CTA. Built with vanilla HTML, CSS, and JS.

Motion is restrained and deliberate: the ~8s eased comet loop, a seamless duplicated-track marquee that pauses on hover, IntersectionObserver scroll reveals, and grayscale-to-color image hovers — all gated behind `prefers-reduced-motion`.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
