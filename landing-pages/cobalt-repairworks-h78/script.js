// RepairWorks — scroll reveal + header state
(() => {
	var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	// ---- Scroll reveal with staggered grid children ----
	var revealEls = Array.prototype.slice.call(
		document.querySelectorAll(".reveal"),
	);

	if (reduce || !("IntersectionObserver" in window)) {
		revealEls.forEach((el) => {
			el.classList.add("in");
		});
	} else {
		// assign a small stagger delay to siblings inside grids
		document
			.querySelectorAll(
				".card-grid-3, .services-grid, .benefits-grid, .testi-grid",
			)
			.forEach((grid) => {
				var kids = grid.querySelectorAll(".reveal");
				kids.forEach((el, i) => {
					el.style.transitionDelay = `${i * 90}ms`;
				});
			});

		var io = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("in");
						io.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
		);

		revealEls.forEach((el) => {
			io.observe(el);
		});
	}

	// ---- Header shadow on scroll ----
	var header = document.getElementById("header");
	var ticking = false;
	function onScroll() {
		if (!ticking) {
			window.requestAnimationFrame(() => {
				header.classList.toggle("scrolled", window.scrollY > 40);
				ticking = false;
			});
			ticking = true;
		}
	}
	window.addEventListener("scroll", onScroll, { passive: true });
	onScroll();
})();
