import KeenSlider from "./keen-slider.es.js";

const sliderElement = document.getElementById("keen-slider");
const previousButton = document.getElementById("keen-slider-previous");
const nextButton = document.getElementById("keen-slider-next");

if (sliderElement) {
	const slider = new KeenSlider(sliderElement, {
		loop: true,
		slides: { origin: "auto", perView: 1.2, spacing: 5 },
		breakpoints: {
			"(min-width: 1024px)": {
				slides: { origin: "auto", perView: 3.2, spacing: 10 },
			},
		},
	});

	previousButton?.addEventListener("click", () => slider.prev());
	nextButton?.addEventListener("click", () => slider.next());
}
