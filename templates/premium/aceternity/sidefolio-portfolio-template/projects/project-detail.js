/* Renders a single project detail page. Expects window.PROJECT_SLUG set.
   Source order: hero image(s) at top, then title, tags, description, lorem, Live Preview. */
const LOREM = [
	"Sit eiusmod ex mollit sit quis ad deserunt. Sint aliqua aliqua ullamco dolore nulla amet tempor sunt est ipsum. Dolor laborum eiusmod cupidatat consectetur velit ipsum. Deserunt nisi in culpa laboris cupidatat elit velit aute mollit nisi. Officia ad exercitation laboris non cupidatat duis esse velit ut culpa et.",
	"Exercitation pariatur enim occaecat adipisicing nostrud adipisicing Lorem tempor ullamco exercitation quis et dolor sint. Adipisicing sunt sit aute fugiat incididunt nostrud consequat proident fugiat id. Officia aliquip laborum labore eu culpa dolor reprehenderit eu ex enim reprehenderit. Cillum Lorem veniam eu magna exercitation. Reprehenderit adipisicing minim et officia enim et veniam Lorem excepteur velit adipisicing et Lorem magna.",
];

// images shown at the top of each project detail (in source order)
const IMAGES = {
	aceternity: ["../assets/images/aceternity.png"],
	algochurn: ["../assets/images/algochurn.png"],
	moonbeam: [
		"../assets/images/moonbeam.png",
		"../assets/images/moonbeam-2.png",
	],
	tailwindmasterkit: [
		"../assets/images/tailwindmasterkit.png",
		"../assets/images/tailwindmasterkit-2.png",
	],
};

const p = window.PROJECTS.find((x) => x.slug === window.PROJECT_SLUG);
const imgs = (IMAGES[p.slug] || [`../${p.thumb}`])
	.map((src) => `<img class="detail-img" src="${src}" alt="${p.title}" />`)
	.join("");

document.getElementById("app").innerHTML = `
  ${imgs}
  <h1 class="cal h1" style="margin-top:1.5rem">${p.title}</h1>
  <div class="detail-tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
  <p class="card__desc" style="max-width:42rem">${p.desc}</p>
  <div class="prose">
    <p>${LOREM[0]}</p>
    <p>${LOREM[1]}</p>
  </div>
  <a class="live-link" href="${p.live}" target="_blank" rel="noopener">Live Preview</a>
`;

window.SidefolioChrome.mountChrome("projects", "../");
