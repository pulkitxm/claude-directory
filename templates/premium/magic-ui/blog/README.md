# Magic UI Blog — Editorial Blog Template Clone (Vanilla HTML/CSS/JS + Canvas)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A pixel-faithful clone of the Magic UI Blog template — a clean editorial blog site built on a shadcn/Tailwind neutral design system, rebuilt as plain HTML, CSS, and vanilla JavaScript with no build step. The blog index lists six posts in a bordered three-column card grid with a category filter (pill buttons with count badges on desktop, a dropdown on mobile), and each of the six article pages has a full-width hero image, a prose body with syntax-highlighted code blocks, a sticky sidebar with an author card and an "On this page" table-of-contents scroll-spy, and a "Read more" related-posts section. A sticky backdrop-blur header carries the Magic UI logo and a light/dark theme toggle (persisted in `localStorage`) above an animated gradient `<canvas>` banner, with card hover scale/underline motion throughout. Generated with Claude Fable 5.

## Run

No build step — serve the folder with any static server and open `index.html`:

```sh
python3 -m http.server 8000
# then open http://localhost:8000/index.html
```

Article pages live under `blog/` (e.g. `blog/react-animation-libraries.html`) and link to one another.

`prompt.md` holds the full build spec (palette, type scale, layout, motion), and `demo.mp4` shows the template in motion.

## Credits

Faithful clone of an existing design, recreated for study/learning. All credit for the original design goes to its creators.

**Original:** Magic UI — <https://blog-magicui.vercel.app/>

---

Part of the [Templates](../../../) collection in the [claude-directory](../../../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
