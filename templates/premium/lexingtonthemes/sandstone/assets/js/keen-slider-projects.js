import e from "https://cdn.jsdelivr.net/npm/keen-slider@6.8.6/+esm";
var t = new e(
		`#keen-slider`,
		{
			loop: !0,
			slides: { origin: `auto`, perView: 1.25, spacing: 8 },
			breakpoints: {
				"(min-width: 1024px)": {
					slides: { origin: `auto`, perView: 1.3, spacing: 16 },
				},
			},
		},
		[],
	),
	n = document.getElementById(`keen-slider-previous`),
	r = document.getElementById(`keen-slider-next`);
n.addEventListener(`click`, () => t.prev()),
	r.addEventListener(`click`, () => t.next());
var i = document.getElementById(`project-year`),
	a = document.getElementById(`project-title`),
	o = document.getElementById(`project-location`);
function s(e) {
	let t = window.sortedProjects[e];
	t &&
		((i.textContent = t.data.year),
		(a.textContent = t.data.title),
		(o.textContent = t.data.location));
}
t.on(`slideChanged`, (e) => {
	s(e.track.details.abs % window.sortedProjects.length);
}),
	s(0);
