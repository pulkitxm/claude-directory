/* MONOGRAM TERMINAL — interactions */
(() => {
	const reducedMotion = window.matchMedia(
		"(prefers-reduced-motion: reduce)",
	).matches;

	/* ---- Scroll reveal ---- */
	const reveals = document.querySelectorAll(".reveal");
	if ("IntersectionObserver" in window && !reducedMotion) {
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						e.target.classList.add("in");
						io.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
		);
		reveals.forEach((r) => io.observe(r));
	} else {
		reveals.forEach((r) => r.classList.add("in"));
	}

	/* ---- Mobile menu ---- */
	const burger = document.getElementById("burger");
	const menu = document.getElementById("mobileMenu");
	const closeBtn = document.getElementById("mobileClose");
	const mLinks = document.querySelectorAll(".m-link");

	function openMenu() {
		menu.classList.add("open");
		menu.setAttribute("aria-hidden", "false");
		burger.setAttribute("aria-expanded", "true");
		document.body.style.overflow = "hidden";
	}
	function closeMenu() {
		menu.classList.remove("open");
		menu.setAttribute("aria-hidden", "true");
		burger.setAttribute("aria-expanded", "false");
		document.body.style.overflow = "";
	}
	if (burger && menu && closeBtn) {
		burger.addEventListener("click", openMenu);
		closeBtn.addEventListener("click", closeMenu);
		mLinks.forEach((l) => l.addEventListener("click", closeMenu));
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape" && menu.classList.contains("open")) closeMenu();
		});
	}

	/* ---- Slider ---- */
	const slides = Array.from(document.querySelectorAll(".slide"));
	const dots = Array.from(document.querySelectorAll(".dot"));
	const prev = document.getElementById("prevSlide");
	const next = document.getElementById("nextSlide");
	const sliderEl = document.getElementById("slider");

	if (slides.length) {
		let idx = 0;
		let timer = null;
		const N = slides.length;

		function show(i) {
			idx = (i + N) % N;
			slides.forEach((s, k) => s.classList.toggle("active", k === idx));
			dots.forEach((d, k) => d.classList.toggle("active", k === idx));
		}
		function nextSlide() {
			show(idx + 1);
		}
		function start() {
			if (reducedMotion) return;
			stop();
			timer = setInterval(nextSlide, 5000);
		}
		function stop() {
			if (timer) clearInterval(timer);
			timer = null;
		}

		prev?.addEventListener("click", () => {
			show(idx - 1);
			start();
		});
		next?.addEventListener("click", () => {
			show(idx + 1);
			start();
		});
		dots.forEach((d) =>
			d.addEventListener("click", () => {
				show(parseInt(d.dataset.index, 10));
				start();
			}),
		);
		if (sliderEl) {
			sliderEl.addEventListener("mouseenter", stop);
			sliderEl.addEventListener("mouseleave", start);
		}
		start();
	}

	/* ---- Articles pagination ---- */
	const p1 = document.getElementById("artPage1");
	const p2 = document.getElementById("artPage2");
	const b1 = document.getElementById("art1");
	const b2 = document.getElementById("art2");
	const bN = document.getElementById("artNext");

	function setPage(n) {
		const showFirst = n === 1;
		p1.classList.toggle("hidden", !showFirst);
		p2.classList.toggle("hidden", showFirst);
		(showFirst ? p1 : p2).classList.remove("fade-swap");
		void (showFirst ? p1 : p2).offsetWidth; /* reflow to restart anim */
		(showFirst ? p1 : p2).classList.add("fade-swap");
		b1.classList.toggle("active", showFirst);
		b2.classList.toggle("active", !showFirst);
	}
	if (p1 && p2 && b1 && b2 && bN) {
		b1.addEventListener("click", () => setPage(1));
		b2.addEventListener("click", () => setPage(2));
		bN.addEventListener("click", () =>
			setPage(p1.classList.contains("hidden") ? 1 : 2),
		);
	}
})();
