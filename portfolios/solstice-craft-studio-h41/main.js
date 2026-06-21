/* SOLSTICE STUDIO — interactions */
(() => {
	const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	/* ---------- Fullscreen menu ---------- */
	const toggle = document.getElementById("menuToggle");
	const fsMenu = document.getElementById("fsMenu");
	if (toggle && fsMenu) {
		const close = () => {
			document.body.classList.remove("nav-open");
			fsMenu.classList.remove("open");
		};
		const open = () => {
			document.body.classList.add("nav-open");
			fsMenu.classList.add("open");
		};
		toggle.addEventListener("click", () =>
			document.body.classList.contains("nav-open") ? close() : open(),
		);
		fsMenu
			.querySelectorAll("a")
			.forEach((a) => a.addEventListener("click", close));
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") close();
		});
	}

	/* ---------- Scroll reveal ---------- */
	const reveals = document.querySelectorAll(".animate-on-scroll");
	if (reveals.length) {
		if (reduced || !("IntersectionObserver" in window)) {
			reveals.forEach((el) => el.classList.add("is-visible"));
		} else {
			const io = new IntersectionObserver(
				(entries) => {
					entries.forEach((e) => {
						if (e.isIntersecting) {
							e.target.classList.add("is-visible");
							io.unobserve(e.target);
						}
					});
				},
				{ threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
			);
			reveals.forEach((el) => io.observe(el));
		}
	}

	/* ---------- Process progress line ---------- */
	const flow = document.getElementById("processFlow");
	const fill = document.getElementById("processFill");
	if (flow && fill && !reduced && "IntersectionObserver" in window) {
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						setTimeout(() => {
							fill.style.width = "100%";
						}, 250);
						io.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.3 },
		);
		io.observe(flow);
	} else if (fill) {
		fill.style.width = "100%";
	}

	/* ---------- Logo ticker (rAF marquee, paused off-screen) ---------- */
	const track = document.getElementById("logoTrack");
	if (track && !reduced) {
		Array.from(track.children).forEach((c) =>
			track.appendChild(c.cloneNode(true)),
		);
		let x = 0,
			raf = null,
			visible = false;
		const speed = 0.5;
		const halfWidth = () => track.scrollWidth / 2;
		function step() {
			if (!visible) {
				raf = null;
				return;
			}
			x -= speed;
			if (Math.abs(x) >= halfWidth()) x = 0;
			track.style.transform = `translate3d(${x}px,0,0)`;
			raf = requestAnimationFrame(step);
		}
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					visible = e.isIntersecting;
					if (visible && !raf) raf = requestAnimationFrame(step);
				});
			},
			{ threshold: 0 },
		);
		io.observe(track.parentElement);
	}

	/* ---------- Project ticker: duplicate cards for seamless -50% loop ---------- */
	const proj = document.getElementById("projectTrack");
	if (proj) {
		Array.from(proj.children).forEach((c) =>
			proj.appendChild(c.cloneNode(true)),
		);
	}

	/* ---------- Newsletter (no backend) ---------- */
	const news = document.getElementById("newsForm");
	if (news) {
		news.addEventListener("submit", (e) => {
			e.preventDefault();
			const btn = news.querySelector("button");
			const orig = btn.textContent;
			btn.textContent = "Joined ✓";
			news.querySelector("input").value = "";
			setTimeout(() => {
				btn.textContent = orig;
			}, 2200);
		});
	}
})();
