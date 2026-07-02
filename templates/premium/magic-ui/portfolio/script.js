// theme
(function () {
	const stored = localStorage.getItem("theme");
	const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	if (stored === "dark" || (!stored && prefersDark)) {
		document.documentElement.classList.add("dark");
	}
})();

function toggleTheme() {
	const isDark = document.documentElement.classList.toggle("dark");
	localStorage.setItem("theme", isDark ? "dark" : "light");
}

document.addEventListener("DOMContentLoaded", () => {
	// theme toggle button
	const tt = document.querySelector(".theme-toggle");
	if (tt) tt.addEventListener("click", toggleTheme);

	// blur-fade staggered reveal
	const items = Array.from(document.querySelectorAll(".blur-fade"));
	items.forEach((el, i) => {
		const delay = parseFloat(el.dataset.delay || i * 0.04);
		el.style.transitionDelay = delay + "s";
	});

	const io = new IntersectionObserver(
		(entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) {
					e.target.classList.add("in");
					io.unobserve(e.target);
				}
			});
		},
		{ threshold: 0.05, rootMargin: "0px 0px 200px 0px" },
	);
	items.forEach((el) => io.observe(el));

	// safety: ensure nothing stays hidden if it never enters view
	setTimeout(() => items.forEach((el) => el.classList.add("in")), 3000);

	// resume accordion
	document.querySelectorAll(".resume-card").forEach((card) => {
		card.addEventListener("click", () => {
			const open = card.getAttribute("aria-expanded") === "true";
			card.setAttribute("aria-expanded", open ? "false" : "true");
		});
	});
});
