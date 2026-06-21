// Inkpress Atelier — scroll reveal + language toggle
(() => {
	const reveals = document.querySelectorAll(".reveal");
	if ("IntersectionObserver" in window) {
		const io = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						e.target.classList.add("is-visible");
						obs.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
		);
		reveals.forEach((el) => io.observe(el));
	} else {
		reveals.forEach((el) => el.classList.add("is-visible"));
	}

	// Simple EN / HI language toggle (decorative)
	const lang = document.querySelector(".lang");
	if (lang) {
		const spans = lang.querySelectorAll("span");
		spans.forEach((s) => {
			if (s.textContent.trim() === "/") return;
			s.style.cursor = "pointer";
			s.addEventListener("click", () => {
				spans.forEach((x) => {
					if (x.textContent.trim() !== "/") x.classList.add("off");
				});
				s.classList.remove("off");
			});
		});
	}

	// Make keyboard activation of "cards/cta" feel intentional (no real nav)
	document.querySelectorAll("[tabindex='0']").forEach((el) => {
		el.addEventListener("keydown", (ev) => {
			if (ev.key === "Enter" || ev.key === " ") {
				ev.preventDefault();
				el.classList.add("is-visible");
			}
		});
	});
})();
