(() => {
	const reduceMotion = window.matchMedia(
		"(prefers-reduced-motion: reduce)",
	).matches;

	/* ---------- nav scroll state ---------- */
	const nav = document.getElementById("nav");
	const onScroll = () => {
		nav.classList.toggle("scrolled", window.scrollY > 60);
		const sig = document.getElementById("scrollSignal");
		const h = document.documentElement.scrollHeight - window.innerHeight;
		sig.style.width = `${h > 0 ? (window.scrollY / h) * 100 : 0}%`;
	};
	window.addEventListener("scroll", onScroll, { passive: true });
	onScroll();

	/* ---------- mobile menu ---------- */
	const burger = document.getElementById("burger");
	const panel = document.getElementById("navPanel");
	burger.addEventListener("click", () => {
		const open = panel.hidden;
		panel.hidden = !open;
		burger.setAttribute("aria-expanded", String(open));
	});
	panel.querySelectorAll("a").forEach((a) =>
		a.addEventListener("click", () => {
			panel.hidden = true;
			burger.setAttribute("aria-expanded", "false");
		}),
	);

	/* ---------- reveal on scroll ---------- */
	const revealEls = document.querySelectorAll(".reveal, .reveal-up");
	if (reduceMotion) {
		revealEls.forEach((el) => el.classList.add("in"));
	} else {
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e, _i) => {
					if (e.isIntersecting) {
						// stagger within grids
						const sibs = Array.from(e.target.parentElement.children).filter(
							(c) => c.classList.contains("reveal-up"),
						);
						const idx = sibs.indexOf(e.target);
						e.target.style.transitionDelay = `${idx > 0 ? Math.min(idx, 4) * 0.08 : 0}s`;
						e.target.classList.add("in");
						io.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
		);
		revealEls.forEach((el) => io.observe(el));
	}

	/* ---------- count up stats ---------- */
	const counters = document.querySelectorAll(".num[data-count]");
	const animateCount = (el) => {
		const target = parseInt(el.dataset.count, 10);
		const prefix = el.dataset.prefix || "";
		if (reduceMotion) {
			el.textContent = prefix + target;
			return;
		}
		const dur = 1400,
			start = performance.now();
		const step = (t) => {
			const p = Math.min((t - start) / dur, 1);
			const eased = 1 - (1 - p) ** 3;
			el.textContent = prefix + Math.round(eased * target);
			if (p < 1) requestAnimationFrame(step);
		};
		requestAnimationFrame(step);
	};
	const cIO = new IntersectionObserver(
		(entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) {
					animateCount(e.target);
					cIO.unobserve(e.target);
				}
			});
		},
		{ threshold: 0.6 },
	);
	counters.forEach((c) => cIO.observe(c));

	/* ---------- starfield canvas ---------- */
	const canvas = document.getElementById("stars");
	const ctx = canvas.getContext("2d");
	let stars = [],
		w = 0,
		h = 0,
		_raf = null;

	const resize = () => {
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		w = canvas.clientWidth;
		h = canvas.clientHeight;
		canvas.width = w * dpr;
		canvas.height = h * dpr;
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		const count = Math.min(160, Math.round((w * h) / 11000));
		stars = Array.from({ length: count }, () => ({
			x: Math.random() * w,
			y: Math.random() * h,
			r: Math.random() * 1.3 + 0.2,
			a: Math.random() * 0.6 + 0.15,
			tw: Math.random() * 0.02 + 0.004,
			ph: Math.random() * Math.PI * 2,
			vx: (Math.random() - 0.5) * 0.05,
			vy: (Math.random() - 0.5) * 0.05,
		}));
	};

	const draw = (time) => {
		ctx.clearRect(0, 0, w, h);
		for (const s of stars) {
			s.x += s.vx;
			s.y += s.vy;
			if (s.x < 0) s.x = w;
			if (s.x > w) s.x = 0;
			if (s.y < 0) s.y = h;
			if (s.y > h) s.y = 0;
			const alpha = s.a * (0.6 + 0.4 * Math.sin(time * s.tw + s.ph));
			ctx.beginPath();
			ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
			ctx.fillStyle = `rgba(220,228,245,${alpha})`;
			ctx.fill();
		}
		_raf = requestAnimationFrame(draw);
	};

	resize();
	window.addEventListener("resize", () => {
		resize();
	});
	if (!reduceMotion) {
		_raf = requestAnimationFrame(draw);
	} else {
		// static draw
		ctx.clearRect(0, 0, w, h);
		for (const s of stars) {
			ctx.beginPath();
			ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
			ctx.fillStyle = `rgba(220,228,245,${s.a})`;
			ctx.fill();
		}
	}
})();
