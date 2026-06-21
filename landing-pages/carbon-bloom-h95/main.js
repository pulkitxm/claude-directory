// Carbon Bloom — interactions

document.addEventListener("DOMContentLoaded", () => {
	// ---- Directional scroll reveals ----
	const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	const els = document.querySelectorAll("[data-reveal]");

	if (reduce) {
		els.forEach((el) =>
			el.classList.add("reveal", el.dataset.reveal || "up", "is-visible"),
		);
	} else {
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("is-visible");
						io.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
		);
		els.forEach((el) => {
			el.classList.add("reveal", el.dataset.reveal || "up");
			io.observe(el);
		});
	}

	// ---- Header shrink on scroll ----
	const header = document.querySelector(".site-header");
	const onScroll = () =>
		header.classList.toggle("scrolled", window.scrollY > 50);
	onScroll();
	window.addEventListener("scroll", onScroll, { passive: true });

	// ---- Accordion (single open) ----
	const accs = document.querySelectorAll(".acc");
	accs.forEach((acc) => {
		const btn = acc.querySelector(".acc-btn");
		const body = acc.querySelector(".acc-body");
		btn.addEventListener("click", () => {
			const isOpen = acc.classList.contains("open");
			accs.forEach((other) => {
				other.classList.remove("open");
				other.querySelector(".acc-body").style.maxHeight = null;
			});
			if (!isOpen) {
				acc.classList.add("open");
				body.style.maxHeight = `${body.scrollHeight}px`;
			}
		});
	});
});
