(() => {
	// Mobile menu toggle
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

	// Scroll reveal
	var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	var reveals = document.querySelectorAll(".reveal");
	if (reduce || !("IntersectionObserver" in window)) {
		reveals.forEach((el) => {
			el.classList.add("in");
		});
	} else {
		var io = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("in");
						io.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1 },
		);
		reveals.forEach((el) => {
			io.observe(el);
		});
	}

	// Portfolio row toggle (let any row become the active/highlighted one)
	var rows = document.querySelectorAll(".pf-row");
	rows.forEach((row) => {
		row.addEventListener("click", () => {
			rows.forEach((r) => {
				r.classList.add("dim");
			});
			row.classList.remove("dim");
		});
	});
})();
