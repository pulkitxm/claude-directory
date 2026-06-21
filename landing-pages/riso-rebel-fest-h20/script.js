(() => {
	// ---- Mobile menu toggle ----
	var burger = document.getElementById("burger");
	var menu = document.getElementById("mobileMenu");
	if (burger && menu) {
		burger.addEventListener("click", () => {
			var open = menu.classList.toggle("open");
			burger.setAttribute("aria-expanded", open ? "true" : "false");
		});
		menu.querySelectorAll("a").forEach((a) => {
			a.addEventListener("click", () => {
				menu.classList.remove("open");
				burger.setAttribute("aria-expanded", "false");
			});
		});
	}

	// ---- Sticky header shadow ----
	var header = document.getElementById("header");
	if (header) {
		var onScroll = () => {
			header.classList.toggle("scrolled", window.scrollY > 40);
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
	}

	// ---- Scroll reveal ----
	var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	var els = document.querySelectorAll(".reveal");
	if (reduce || !("IntersectionObserver" in window)) {
		els.forEach((el) => {
			el.classList.add("in");
		});
	} else {
		var io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						e.target.classList.add("in");
						io.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
		);
		els.forEach((el) => {
			io.observe(el);
		});
	}
})();
