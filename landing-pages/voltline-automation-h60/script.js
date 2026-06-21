(() => {
	const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	/* ---------- nav scrolled state ---------- */
	const nav = document.getElementById("nav");
	const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 12);
	onScroll();
	window.addEventListener("scroll", onScroll, { passive: true });

	/* ---------- pixel-fill button ---------- */
	const btn = document.getElementById("startBtn");
	const grid = document.getElementById("pixgrid");
	if (btn && grid) {
		const total = 36; // 12 x 3
		const cells = [];
		for (let i = 0; i < total; i++) {
			const c = document.createElement("i");
			grid.appendChild(c);
			cells.push(c);
		}
		let timers = [];
		const clear = () => {
			timers.forEach(clearTimeout);
			timers = [];
		};
		const shuffle = () => [...cells].sort(() => Math.random() - 0.5);

		btn.addEventListener("mouseenter", () => {
			clear();
			btn.classList.add("is-filled");
			shuffle().forEach((c, i) =>
				timers.push(
					setTimeout(() => {
						c.style.opacity = "1";
					}, i * 22),
				),
			);
		});
		btn.addEventListener("mouseleave", () => {
			clear();
			btn.classList.remove("is-filled");
			shuffle().forEach((c, i) =>
				timers.push(
					setTimeout(() => {
						c.style.opacity = "0";
					}, i * 14),
				),
			);
		});
	}

	/* ---------- starfields ---------- */
	function seedStars(container, count, _area) {
		const frag = document.createDocumentFragment();
		for (let i = 0; i < count; i++) {
			const s = document.createElement("span");
			s.className = "star";
			const sz = (Math.random() * 1.6 + 0.5).toFixed(2);
			s.style.width = s.style.height = `${sz}px`;
			s.style.top = `${(Math.random() * 100).toFixed(1)}%`;
			s.style.left = `${(Math.random() * 100).toFixed(1)}%`;
			s.style.setProperty("--dur", `${(Math.random() * 3 + 1.5).toFixed(2)}s`);
			s.style.animationDelay = `${(Math.random() * 3).toFixed(2)}s`;
			frag.appendChild(s);
		}
		container.appendChild(frag);
	}

	// CTA hover reveals
	document.querySelectorAll(".spacebtn").forEach((b) => {
		const field = b.querySelector(".starfield");
		if (!field) return;
		seedStars(field, 14);
		b.addEventListener("mouseenter", () => {
			field.style.opacity = "1";
		});
		b.addEventListener("mouseleave", () => {
			field.style.opacity = "0";
		});
	});

	// mission band persistent starfield
	const ms = document.getElementById("missionStars");
	if (ms) seedStars(ms, reduced ? 0 : 70);

	/* ---------- scroll reveal ---------- */
	const reveals = document.querySelectorAll(".reveal");
	if (reduced || !("IntersectionObserver" in window)) {
		reveals.forEach((el) => el.classList.add("in"));
	} else {
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e, idx) => {
					if (e.isIntersecting) {
						setTimeout(() => e.target.classList.add("in"), idx * 60);
						io.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.12 },
		);
		reveals.forEach((el) => io.observe(el));
	}

	/* ---------- stat count-up ---------- */
	function animateStat(el) {
		const target = parseFloat(el.dataset.count);
		const suffix = el.dataset.suffix || "";
		const decimals = (el.dataset.count.split(".")[1] || "").length;
		const dur = 1400;
		const start = performance.now();
		const tick = (now) => {
			const p = Math.min((now - start) / dur, 1);
			const eased = 1 - (1 - p) ** 3;
			const val = (target * eased).toFixed(decimals);
			el.innerHTML = `${val}<span class="u">${suffix}</span>`;
			if (p < 1) requestAnimationFrame(tick);
		};
		requestAnimationFrame(tick);
	}
	const statNums = document.querySelectorAll(".stat__num");
	if (reduced || !("IntersectionObserver" in window)) {
		statNums.forEach((el) => {
			el.innerHTML =
				el.dataset.count +
				'<span class="u">' +
				(el.dataset.suffix || "") +
				"</span>";
		});
	} else {
		const sio = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						animateStat(e.target);
						sio.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.6 },
		);
		statNums.forEach((el) => sio.observe(el));
	}
})();
