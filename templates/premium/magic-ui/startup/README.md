# Magic UI Startup — Dark SaaS Landing Page Template Clone (Vanilla HTML/CSS/JS)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A pixel-faithful, self-contained clone of the Magic UI "Startup" landing-page template — a pure-black, dark-themed SaaS marketing site — rebuilt as plain HTML, CSS, and vanilla JavaScript with all assets vendored locally and no build step. It reproduces the original's gradient-clipped hero headline, an animated dashboard hero image with a perspective tilt, color glow, and bottom fade, a "trusted by" grayscale logo marquee, a four-tier pricing section with an annual/monthly toggle, a CTA, and a footer, plus minimal sign-in and sign-up auth pages — matching the original's layout, typography, oklch color tokens, staggered entrance animations, and interactions. Generated with Claude Fable 5.

## Pages

- `index.html` — the full marketing landing page (sticky header, hero with shimmer banner pill, logo marquee, pricing, CTA, footer).
- `signin.html` — "Welcome back" auth card.
- `signup.html` — "Welcome to Magic UI" auth card.

## Run

There is no build step. Serve the folder statically and open `index.html`:

```sh
python3 -m http.server
```

Then open <http://localhost:8000/index.html> in your browser. (You can also open `index.html` directly, but serving over HTTP is recommended so the locally vendored fonts load correctly.)

## Notes

- The site renders in dark mode (`.dark` on `<html>`) using CSS custom properties — pure-black `--background`, white `--foreground`, and hero-glow color tokens (`--color-one/two/three`) in oklch.
- `Inter` is vendored locally as WOFF2 in `assets/fonts/`; the hero dashboard image and logos are vendored in `assets/`.
- Entrance animations (`fade-in`, `fade-up`) are staggered via a `--animation-delay` custom property; the logo marquee duplicates its track for a seamless loop and pauses on hover; the sticky header acquires a blurred, bordered background after scroll (handled in `app.js`).
- Header/footer links such as Features, Pricing, Careers, Contact Us, Terms, and Privacy are dead/placeholder links in the original template and are reproduced as the same non-navigating / hash links — no extra pages exist to clone.
- See `prompt.md` for the full build spec and `demo.mp4` for the template in motion.

## Credits

Faithful clone of an existing design, recreated for study/learning. All credit for the original design goes to its creators.

**Original:** Magic UI — <https://startup-template-sage.vercel.app/>

---

Part of the [Templates](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
