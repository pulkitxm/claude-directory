# Nextra Docs Template Clone: Docs Site Theme Study (Vanilla HTML/CSS/JS)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A pixel-faithful, self-contained reproduction of the official Nextra "Docs Template" starter theme. It includes the classic Nextra docs chrome with a sticky blurred navbar, tree-style sidebar, centered prose content, "On This Page" rail, and System/Light/Dark theme switcher. Five static pages are implemented in plain HTML, CSS, and vanilla JavaScript with no framework or build step.

## Run

This is a static site with no `package.json`, build step, or dependencies. Serve the folder with any static file server, or open the HTML files directly in a browser:

```sh
python3 -m http.server
```

Then visit the pages:

- `index.html`: Introduction / home (`/`)
- `about.html`: About (`/about`)
- `another.html`: Another Page (`/another`), with the code block and two independent "Clicked N times" counters
- `advanced.html`: Advanced folder index (`/advanced`)
- `advanced-satori.html`: Advanced > Satori (`/advanced/satori`), the nested child page

Styling lives in `assets/css/tokens.css` (design tokens) and `assets/css/styles.css`; behavior (theme switcher, sidebar folder toggle, search modal, mobile nav, counters) lives in `assets/js/app.js`.

`prompt.md` holds the full design/content spec this clone was built against, and `demo.mp4` (with `poster.jpg`) shows it in motion.

## Credits

Faithful clone of an existing design, recreated for study/learning. All credit for the original design goes to its creators.

**Original:** Nextra Docs Template (shuding/nextra-docs-template), <https://nextra-docs-template.vercel.app>

---

Part of the [Studies](../) collection. [Browse the live gallery](https://pulkitxm.com/).
