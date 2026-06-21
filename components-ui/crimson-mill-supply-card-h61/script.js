// Crimson Mill — scroll reveal with a small stagger
(function () {
	"use strict";
	var reduce =
		window.matchMedia &&
		window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	var items = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

	if (reduce || !("IntersectionObserver" in window)) {
		items.forEach(function (el) {
			el.classList.add("is-in");
		});
		return;
	}

	var io = new IntersectionObserver(
		function (entries) {
			entries.forEach(function (entry) {
				if (!entry.isIntersecting) return;
				var el = entry.target;
				var delay = parseInt(el.getAttribute("data-delay") || "0", 10);
				setTimeout(function () {
					el.classList.add("is-in");
				}, delay);
				io.unobserve(el);
			});
		},
		{ threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
	);

	items.forEach(function (el) {
		io.observe(el);
	});
})();
