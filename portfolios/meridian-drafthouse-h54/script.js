document.addEventListener("DOMContentLoaded", () => {
	// Hero type rise on load
	requestAnimationFrame(() => document.body.classList.add("loaded"));

	// Mobile menu
	const burger = document.getElementById("burger");
	const menu = document.getElementById("mobile-menu");
	if (burger && menu) {
		burger.addEventListener("click", () => {
			const open = menu.hidden;
			menu.hidden = !open;
			burger.classList.toggle("open", open);
			burger.setAttribute("aria-expanded", String(open));
		});
		menu.querySelectorAll("a").forEach((a) =>
			a.addEventListener("click", () => {
				menu.hidden = true;
				burger.classList.remove("open");
				burger.setAttribute("aria-expanded", "false");
			}),
		);
	}

	// Scroll reveal
	const reveal = new IntersectionObserver(
		(entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) {
					e.target.classList.add("in");
					reveal.unobserve(e.target);
				}
			});
		},
		{ threshold: 0.08 },
	);
	document
		.querySelectorAll("[data-reveal]")
		.forEach((el) => reveal.observe(el));

	// Image reveal overlays
	const imgObs = new IntersectionObserver(
		(entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) {
					setTimeout(() => e.target.classList.add("revealed"), 160);
					imgObs.unobserve(e.target);
				}
			});
		},
		{ threshold: 0.15 },
	);
	document
		.querySelectorAll("[data-image-reveal]")
		.forEach((el) => imgObs.observe(el));

	// Count-up stats
	const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
	const countObs = new IntersectionObserver(
		(entries) => {
			entries.forEach((e) => {
				if (!e.isIntersecting) return;
				const el = e.target;
				const target = parseInt(el.dataset.count, 10);
				const suffix = el.dataset.suffix || "";
				if (reduce) {
					el.textContent = target + suffix;
					countObs.unobserve(el);
					return;
				}
				const dur = 1300;
				const start = performance.now();
				const step = (now) => {
					const p = Math.min((now - start) / dur, 1);
					const eased = 1 - (1 - p) ** 3;
					el.textContent = Math.round(target * eased) + suffix;
					if (p < 1) requestAnimationFrame(step);
				};
				requestAnimationFrame(step);
				countObs.unobserve(el);
			});
		},
		{ threshold: 0.5 },
	);
	document
		.querySelectorAll("[data-count]")
		.forEach((el) => countObs.observe(el));

	// Header shadow on scroll
	const header = document.querySelector(".site-header");
	addEventListener(
		"scroll",
		() => {
			header.style.boxShadow =
				scrollY > 10 ? "0 1px 0 rgba(43,43,43,.15)" : "none";
		},
		{ passive: true },
	);
});
