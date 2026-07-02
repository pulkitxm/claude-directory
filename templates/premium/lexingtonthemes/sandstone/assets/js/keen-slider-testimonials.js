import e from "https://cdn.jsdelivr.net/npm/keen-slider@6.8.6/+esm";
var t = new e(
		`#testimonials-slider`,
		{
			loop: !0,
			slides: { origin: `auto`, perView: 1, spacing: 8 },
			breakpoints: {
				"(min-width: 1024px)": {
					slides: { origin: `auto`, perView: 1.5, spacing: 16 },
				},
			},
		},
		[],
	),
	n = document.getElementById(`testimonials-previous`),
	r = document.getElementById(`testimonials-next`);
n.addEventListener(`click`, () => t.prev()),
	r.addEventListener(`click`, () => t.next());
