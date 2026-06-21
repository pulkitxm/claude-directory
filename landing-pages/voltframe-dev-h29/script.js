document.addEventListener("DOMContentLoaded", () => {
	// Scroll-triggered reveals
	const animated = document.querySelectorAll(".animate-on-scroll, .header");
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("is-visible");
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.1 },
	);
	animated.forEach((el) => observer.observe(el));

	// Header reveal on load (in case it's already in view)
	requestAnimationFrame(() =>
		document.querySelector(".header")?.classList.add("is-visible"),
	);

	// Mobile menu
	const hamburger = document.getElementById("hamburger");
	const menu = document.getElementById("mobile-menu");
	if (hamburger && menu) {
		hamburger.addEventListener("click", () => {
			hamburger.classList.toggle("open");
			menu.classList.toggle("open");
			document.body.style.overflow = menu.classList.contains("open")
				? "hidden"
				: "";
		});
		menu.querySelectorAll("a").forEach((link) => {
			link.addEventListener("click", () => {
				hamburger.classList.remove("open");
				menu.classList.remove("open");
				document.body.style.overflow = "";
			});
		});
	}

	// Smooth scroll for in-page anchors with header offset
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", function (e) {
			const id = this.getAttribute("href");
			if (id === "#" || id.length < 2) return;
			const target = document.querySelector(id);
			if (!target) return;
			e.preventDefault();
			const top = target.getBoundingClientRect().top + window.pageYOffset - 100;
			window.scrollTo({ top, behavior: "smooth" });
		});
	});
});
