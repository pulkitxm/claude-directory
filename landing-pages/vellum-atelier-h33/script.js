document.addEventListener("DOMContentLoaded", () => {
	const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	// Build hero wordmark character-by-character
	const title = document.getElementById("hero-title");
	const word = "VELLUM";
	const chars = [];
	word.split("").forEach((c, i) => {
		const span = document.createElement("span");
		span.className = "char";
		span.textContent = c;
		span.style.animationDelay = `${0.1 + i * 0.1}s`;
		title.appendChild(span);
		chars.push(span);
	});

	if (reduce) {
		chars.forEach((c) => c.classList.add("settled"));
	} else {
		chars.forEach((c, i) =>
			setTimeout(() => c.classList.add("dancing"), i * 100),
		);
		setTimeout(() => {
			chars.forEach((c) => {
				c.classList.remove("dancing");
				c.classList.add("settled");
			});
		}, 2800);
	}

	// Mobile menu
	const burger = document.getElementById("burger");
	const mClose = document.getElementById("mClose");
	const mMenu = document.getElementById("mMenu");
	const toggle = (open) => {
		mMenu.classList.toggle("open", open);
		document.body.style.overflow = open ? "hidden" : "";
	};
	burger?.addEventListener("click", () => toggle(true));
	mClose?.addEventListener("click", () => toggle(false));
	document
		.querySelectorAll(".m-link")
		.forEach((l) => l.addEventListener("click", () => toggle(false)));

	// Scroll reveal
	const io = new IntersectionObserver(
		(entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) {
					e.target.classList.add("visible");
					const z = e.target.querySelector(".zoom-img");
					if (z) z.classList.add("visible");
					io.unobserve(e.target);
				}
			});
		},
		{ threshold: 0.12, rootMargin: "0px 0px -50px 0px" },
	);
	document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

	// Menu hover preview cursor tracking
	document.querySelectorAll("[data-row]").forEach((row) => {
		const img = row.querySelector(".menu-preview");
		if (!img) return;
		row.addEventListener("mousemove", (e) => {
			const r = row.getBoundingClientRect();
			const dx = (e.clientX - r.left - r.width / 2) / 10;
			const rot = (e.clientX - r.left - r.width / 2) / 50;
			img.style.transform = `translateY(-50%) translateX(${dx}px) rotate(${rot}deg) scale(1)`;
		});
		row.addEventListener("mouseleave", () => {
			img.style.transform = "translateY(-50%) scale(0.9)";
		});
	});
});
