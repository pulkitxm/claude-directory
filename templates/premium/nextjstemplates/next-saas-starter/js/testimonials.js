/* Testimonial carousel, ported from the source's Swiper-based slider
   (prev/next arrows + pagination dots), reimplemented with plain JS so no
   external runtime dependency is required. */
(function () {
	var slides = document.querySelectorAll(".testimonial-slide");
	if (!slides.length) return;
	var dots = document.querySelectorAll("[data-dot]");
	var current = 0;

	function show(index) {
		slides.forEach(function (slide, i) {
			slide.style.display = i === index ? "flex" : "none";
		});
		dots.forEach(function (dot, i) {
			dot.classList.toggle("active", i === index);
			dot.setAttribute("aria-current", i === index ? "true" : "false");
		});
		current = index;
	}

	var prevBtn = document.querySelector("[data-testimonial-prev]");
	var nextBtn = document.querySelector("[data-testimonial-next]");
	if (prevBtn) {
		prevBtn.addEventListener("click", function () {
			show((current - 1 + slides.length) % slides.length);
		});
	}
	if (nextBtn) {
		nextBtn.addEventListener("click", function () {
			show((current + 1) % slides.length);
		});
	}
	dots.forEach(function (dot, i) {
		dot.setAttribute("role", "button");
		dot.setAttribute("tabindex", "0");
		dot.setAttribute("aria-label", "Show testimonial " + (i + 1));
		dot.addEventListener("click", function () {
			show(i);
		});
		dot.addEventListener("keydown", function (event) {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				show(i);
			}
		});
	});
	show(0);
})();
