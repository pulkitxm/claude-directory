import e from "https://cdn.jsdelivr.net/npm/keen-slider@6.8.6/+esm";
var t = new e(
		`#keen-slider`,
		{
			loop: !0,
			slides: { origin: `center`, perView: 2, spacing: 0 },
			breakpoints: {
				"(min-width: 1024px)": {
					slides: { origin: `auto`, perView: 5, spacing: 0 },
				},
			},
		},
		[],
	),
	n = document.getElementById(`keen-slider-previous`),
	r = document.getElementById(`keen-slider-next`);
n.addEventListener(`click`, () => t.prev()),
	r.addEventListener(`click`, () => t.next());
