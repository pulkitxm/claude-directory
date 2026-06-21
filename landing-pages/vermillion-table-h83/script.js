document.addEventListener("DOMContentLoaded", () => {
	// Scroll reveal (one-shot)
	const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	const items = document.querySelectorAll(".reveal");
	if (reduce || !("IntersectionObserver" in window)) {
		items.forEach((el) => el.classList.add("is-visible"));
	} else {
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						e.target.classList.add("is-visible");
						io.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.08, rootMargin: "0px 0px -5% 0px" },
		);
		items.forEach((el) => io.observe(el));
	}

	// Smooth anchor scroll with fixed-header offset
	document.querySelectorAll('a[href^="#"]').forEach((a) => {
		a.addEventListener("click", (ev) => {
			const id = a.getAttribute("href");
			if (!id || id === "#") return;
			const target = document.querySelector(id);
			if (!target) return;
			ev.preventDefault();
			const top = target.getBoundingClientRect().top + window.scrollY - 96;
			window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
		});
	});
});
