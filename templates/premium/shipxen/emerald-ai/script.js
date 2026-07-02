// Emerald AI clone — theme toggle, FAQ accordion, mobile menu, scroll reveals.

(function () {
	// Theme: default dark, honor stored choice then prefers-color-scheme.
	const root = document.documentElement;
	function apply(theme) {
		root.classList.remove("light", "dark");
		root.classList.add(theme);
	}
	document.addEventListener("DOMContentLoaded", () => {
		const toggle = document.querySelector(".theme-toggle");
		if (toggle) {
			toggle.addEventListener("click", () => {
				const next = root.classList.contains("dark") ? "light" : "dark";
				apply(next);
				try {
					localStorage.setItem("emerald-theme", next);
				} catch (e) {}
			});
		}

		// FAQ accordion
		document.querySelectorAll(".faq-q").forEach((btn) => {
			btn.addEventListener("click", () => {
				const expanded = btn.getAttribute("aria-expanded") === "true";
				const panel = btn.nextElementSibling;
				btn.setAttribute("aria-expanded", String(!expanded));
				if (expanded) {
					panel.style.maxHeight = "0px";
				} else {
					panel.style.maxHeight = panel.scrollHeight + "px";
				}
			});
		});

		// Mobile menu
		const burger = document.querySelector(".hamburger");
		const menu = document.querySelector(".mobile-menu");
		if (burger && menu) {
			burger.addEventListener("click", () => menu.classList.toggle("open"));
			menu
				.querySelectorAll("a")
				.forEach((a) =>
					a.addEventListener("click", () => menu.classList.remove("open")),
				);
		}

		// Scroll reveal
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						e.target.classList.add("in");
						io.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.12 },
		);
		document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
	});
})();
