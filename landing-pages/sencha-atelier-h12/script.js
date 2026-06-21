// Sencha Atelier — interactions
(() => {
	const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	// Header scroll state
	const header = document.getElementById("header");
	const onScroll = () => {
		if (window.scrollY > 50) header.classList.add("scrolled");
		else header.classList.remove("scrolled");
	};
	window.addEventListener("scroll", onScroll, { passive: true });
	onScroll();

	// Scroll reveal with staggered card delays
	const revealEls = document.querySelectorAll(".reveal");
	if (reduce) {
		revealEls.forEach((el) => el.classList.add("in"));
	} else {
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) return;
					const el = entry.target;
					const delay = parseInt(el.getAttribute("data-delay") || "0", 10);
					setTimeout(() => el.classList.add("in"), delay);
					io.unobserve(el);
				});
			},
			{ threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
		);
		revealEls.forEach((el) => io.observe(el));
	}

	// Count-up stats
	const counters = document.querySelectorAll("[data-count]");
	const animateCount = (el) => {
		const target = parseInt(el.getAttribute("data-count"), 10);
		if (reduce) {
			el.textContent = target;
			return;
		}
		const dur = 1400;
		const start = performance.now();
		const tick = (now) => {
			const p = Math.min((now - start) / dur, 1);
			const eased = 1 - (1 - p) ** 3;
			el.textContent = Math.round(eased * target);
			if (p < 1) requestAnimationFrame(tick);
		};
		requestAnimationFrame(tick);
	};
	const cio = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					animateCount(entry.target);
					cio.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.5 },
	);
	counters.forEach((el) => cio.observe(el));
})();
