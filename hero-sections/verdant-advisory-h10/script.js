(() => {
	var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	document.addEventListener("DOMContentLoaded", () => {
		/* Scroll reveal */
		var revealEls = document.querySelectorAll("[data-reveal]");
		if (reduce || !("IntersectionObserver" in window)) {
			revealEls.forEach((el) => {
				el.classList.add("is-visible");
			});
		} else {
			var io = new IntersectionObserver(
				(entries) => {
					entries.forEach((e) => {
						if (e.isIntersecting) {
							e.target.classList.add("is-visible");
							io.unobserve(e.target);
						}
					});
				},
				{ threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
			);
			revealEls.forEach((el) => {
				io.observe(el);
			});
		}

		/* Navbar shadow on scroll */
		var nav = document.getElementById("nav");
		var onScroll = () => {
			nav.classList.toggle("scrolled", window.scrollY > 12);
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });

		/* Mobile menu */
		var burger = document.getElementById("burger");
		var menu = document.getElementById("mobile-menu");
		burger.addEventListener("click", () => {
			var open = menu.classList.toggle("open");
			burger.setAttribute("aria-expanded", String(open));
		});
		menu.querySelectorAll("a").forEach((a) => {
			a.addEventListener("click", () => {
				menu.classList.remove("open");
				burger.setAttribute("aria-expanded", "false");
			});
		});

		/* Count-up stats */
		var counters = document.querySelectorAll("[data-count]");
		function runCount(el) {
			var target = parseFloat(el.getAttribute("data-count"));
			var suffix = el.getAttribute("data-suffix") || "";
			if (reduce) {
				el.textContent = target + suffix;
				return;
			}
			var dur = 1400,
				start = null;
			function step(ts) {
				if (start === null) start = ts;
				var p = Math.min((ts - start) / dur, 1);
				var eased = 1 - (1 - p) ** 3;
				el.textContent = Math.round(target * eased) + suffix;
				if (p < 1) requestAnimationFrame(step);
			}
			requestAnimationFrame(step);
		}
		if (!("IntersectionObserver" in window)) {
			counters.forEach(runCount);
		} else {
			var co = new IntersectionObserver(
				(entries) => {
					entries.forEach((e) => {
						if (e.isIntersecting) {
							runCount(e.target);
							co.unobserve(e.target);
						}
					});
				},
				{ threshold: 0.6 },
			);
			counters.forEach((el) => {
				co.observe(el);
			});
		}
	});
})();
