# Amber Foundry

A single-page landing site for **Amber Foundry**, a fictional enterprise-AI consultancy, built in a "Warm Editorial Intelligence" design language — a quiet, paper-and-amber aesthetic that feels like a luxury strategy firm crossed with a scientific journal, the opposite of the typical neon-on-black AI startup. Everything sits on warm cream paper (`#F6F0E9`), accented by a muted amber/gold and anchored by a deep roasted-coffee brown.

Display type pairs Host Grotesk with a Halant serif over Inter body. The hero renders a self-contained canvas "neural foundry" graphic — an animated amber node-and-edge network with flowing edge particles, no external image. Other highlights: a partner marquee, an auto-advancing interactive split panel with built-out mock UI cards, a 12-column method bento, and one dramatic dark-brown pricing section. Motion uses IntersectionObserver reveals, a heading bounce keyframe, and a requestAnimationFrame canvas loop that pauses off-screen, all respecting `prefers-reduced-motion`.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
