document.addEventListener("DOMContentLoaded", () => {
	/* Scroll reveal */
	const io = new IntersectionObserver(
		(entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) {
					e.target.classList.add("in");
					io.unobserve(e.target);
				}
			});
		},
		{ threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
	);
	document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

	/* Mobile menu */
	const menu = document.getElementById("mobileMenu");
	const open = document.getElementById("menuOpen");
	const close = document.getElementById("menuClose");
	const toggle = (show) => {
		menu.classList.toggle("open", show);
		document.body.style.overflow = show ? "hidden" : "";
	};
	open.addEventListener("click", () => toggle(true));
	close.addEventListener("click", () => toggle(false));
	document
		.querySelectorAll(".mlink")
		.forEach((l) => l.addEventListener("click", () => toggle(false)));

	/* Testimonial carousel */
	const slider = document.getElementById("tstSlider");
	const prev = document.getElementById("tstPrev");
	const next = document.getElementById("tstNext");
	if (slider && prev && next) {
		const amount = () => {
			const first = slider.firstElementChild;
			return first ? first.offsetWidth + 16 : 360;
		};
		prev.addEventListener("click", () =>
			slider.scrollBy({ left: -amount(), behavior: "smooth" }),
		);
		next.addEventListener("click", () =>
			slider.scrollBy({ left: amount(), behavior: "smooth" }),
		);
		const sync = () => {
			prev.style.opacity = slider.scrollLeft <= 4 ? "0.45" : "1";
			next.style.opacity =
				slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth - 4
					? "0.45"
					: "1";
		};
		slider.addEventListener("scroll", sync);
		window.addEventListener("resize", sync);
		sync();
	}

	/* Active nav link on scroll */
	const sections = ["top", "about", "services"];
	const navMap = {};
	document.querySelectorAll(".nav-links a").forEach((a) => {
		const id = a.getAttribute("href").replace("#", "");
		if (sections.includes(id)) navMap[id] = a;
	});
	const navIo = new IntersectionObserver(
		(entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) {
					Object.values(navMap).forEach((a) => a.classList.remove("active"));
					if (navMap[e.target.id]) navMap[e.target.id].classList.add("active");
				}
			});
		},
		{ threshold: 0.4 },
	);
	sections.forEach((id) => {
		const el = document.getElementById(id);
		if (el) navIo.observe(el);
	});
});
