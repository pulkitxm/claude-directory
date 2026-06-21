(() => {
	document.addEventListener("DOMContentLoaded", () => {
		var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		// Scroll reveal
		var revealEls = document.querySelectorAll(".reveal");
		if (reduce || !("IntersectionObserver" in window)) {
			revealEls.forEach((el) => {
				el.classList.add("show");
			});
		} else {
			var obs = new IntersectionObserver(
				(entries) => {
					entries.forEach((e) => {
						if (e.isIntersecting) {
							e.target.classList.add("show");
							obs.unobserve(e.target);
						}
					});
				},
				{ threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
			);
			revealEls.forEach((el) => {
				obs.observe(el);
			});
		}

		// Header compaction on scroll
		var header = document.getElementById("main-header");
		var onScroll = () => {
			if (window.scrollY > 50) header.classList.add("scrolled");
			else header.classList.remove("scrolled");
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });

		// Mobile menu
		var toggle = document.getElementById("menu-toggle");
		var menu = document.getElementById("mobile-menu");
		if (toggle && menu) {
			var setOpen = (open) => {
				menu.classList.toggle("open", open);
				toggle.setAttribute("aria-expanded", String(open));
			};
			toggle.addEventListener("click", () => {
				setOpen(!menu.classList.contains("open"));
			});
			menu.querySelectorAll("a").forEach((a) => {
				a.addEventListener("click", () => {
					setOpen(false);
				});
			});
		}
	});
})();
