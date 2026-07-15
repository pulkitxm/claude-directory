# Snip & Snout — Neo-Brutalist Pet Grooming Studio Landing Page (Vanilla HTML/CSS/JS)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A multi-section landing page for Snip & Snout, a fictional premium pet-grooming studio. The named design language is "Brutalist Kennel Club" — a loud, confident neo-brutalist poster aesthetic crossed with a high-end barbershop: thick ink-black outlines, hard zero-blur offset "brutal" shadows, and crisp 90-degree corners, with one signature playful twist — an oversized rounded "quarter-pipe" corner on the hero photo panel. Generated with Claude Fable 5.

Sections include a sticky header, a two-column outlined hero (signature corner, floating rotated rating sticker), a scrolling marquee strip, a stats row of accent-colored tiles, a fanned "card deck" services section, two infinite auto-scrolling testimonial rows, an ink booking-CTA with a form that animates through states, and a multi-column footer. Vanilla HTML/CSS/JS with a bouncy `data-reveal` / `data-stagger` scroll-in, the "brutal press" hover (translate + shadow collapse), seamless marquee loops, and `prefers-reduced-motion` support. Archivo + Plus Jakarta Sans and images vendored locally; offline-runnable.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.

---

Part of the [Landing pages](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
