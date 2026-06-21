// ===== Auric — interactions =====
(() => {
	const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	// Hero word stagger + reveal trigger on load
	function onLoad() {
		document.body.classList.add("loaded");
		const words = document.querySelectorAll(".hero__title .w");
		words.forEach((w, i) => {
			w.style.transitionDelay = `${0.12 + i * 0.06}s`;
		});
		// Stagger the hero reveal items
		document.querySelectorAll(".hero .reveal").forEach((el, i) => {
			setTimeout(() => el.classList.add("in"), 350 + i * 110);
		});
	}
	if (document.readyState === "complete") onLoad();
	else window.addEventListener("load", onLoad);

	// Nav scrolled state
	const nav = document.getElementById("nav");
	const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
	onScroll();
	window.addEventListener("scroll", onScroll, { passive: true });

	// Mobile menu
	const burger = document.getElementById("burger");
	const sheet = document.getElementById("sheet");
	function setMenu(open) {
		burger.setAttribute("aria-expanded", String(open));
		sheet.hidden = !open;
	}
	burger.addEventListener("click", () =>
		setMenu(burger.getAttribute("aria-expanded") !== "true"),
	);
	sheet
		.querySelectorAll("a")
		.forEach((a) => a.addEventListener("click", () => setMenu(false)));
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") setMenu(false);
	});

	// Scroll reveal (non-hero)
	const reveals = document.querySelectorAll(".reveal:not(.hero .reveal)");
	if (reduce) {
		reveals.forEach((el) => el.classList.add("in"));
	} else {
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((en) => {
					if (en.isIntersecting) {
						en.target.classList.add("in");
						io.unobserve(en.target);
					}
				});
			},
			{ threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
		);
		reveals.forEach((el) => io.observe(el));
	}

	// Count-up stats
	const stats = document.querySelectorAll(".stat[data-to]");
	function countUp(el) {
		const to = +el.dataset.to;
		if (reduce) {
			el.textContent = to;
			return;
		}
		const dur = 1300,
			t0 = performance.now();
		function tick(now) {
			const p = Math.min(1, (now - t0) / dur);
			const eased = 1 - (1 - p) ** 3;
			el.textContent = Math.round(to * eased);
			if (p < 1) requestAnimationFrame(tick);
		}
		requestAnimationFrame(tick);
	}
	const sio = new IntersectionObserver(
		(entries) => {
			entries.forEach((en) => {
				if (en.isIntersecting) {
					countUp(en.target);
					sio.unobserve(en.target);
				}
			});
		},
		{ threshold: 0.6 },
	);
	stats.forEach((s) => sio.observe(s));
})();
