(() => {
	const reduceMotion = window.matchMedia(
		"(prefers-reduced-motion: reduce)",
	).matches;
	const app = document.getElementById("app");

	/* ---------- Reveal on load (with IntersectionObserver as guard) ---------- */
	const reveals = Array.from(document.querySelectorAll(".reveal"));
	if (reduceMotion) {
		reveals.forEach((el) => el.classList.add("in"));
	} else if ("IntersectionObserver" in window) {
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("in");
						io.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.04 },
		);
		reveals.forEach((el) => io.observe(el));
	} else {
		reveals.forEach((el) => el.classList.add("in"));
	}

	/* ---------- Menu toggle ---------- */
	const toggle = document.getElementById("menuToggle");
	const menu = document.getElementById("menu");
	let open = false;

	function setMenu(state) {
		open = state;
		app.classList.toggle("is-open", open);
		toggle.setAttribute("aria-expanded", String(open));
		toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
		menu.setAttribute("aria-hidden", String(!open));
		document.body.style.overflow = open ? "hidden" : "";
	}

	toggle.addEventListener("click", () => setMenu(!open));
	menu.querySelectorAll(".menu__link").forEach((link) => {
		link.addEventListener("click", () => {
			if (open) setMenu(false);
		});
	});
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && open) setMenu(false);
	});

	/* ---------- Pointer parallax on tiles ---------- */
	if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) {
		const tiles = Array.from(document.querySelectorAll("[data-parallax]")).map(
			(el) => ({
				el,
				depth: parseFloat(el.getAttribute("data-parallax")) || 0,
			}),
		);
		let targetX = 0,
			targetY = 0,
			curX = 0,
			curY = 0,
			raf = null;

		function loop() {
			curX += (targetX - curX) * 0.08;
			curY += (targetY - curY) * 0.08;
			tiles.forEach(({ el, depth }) => {
				el.style.transform = `translate3d(${curX * depth}px, ${curY * depth}px, 0)`;
			});
			if (Math.abs(targetX - curX) > 0.1 || Math.abs(targetY - curY) > 0.1) {
				raf = requestAnimationFrame(loop);
			} else {
				raf = null;
			}
		}

		window.addEventListener("pointermove", (e) => {
			targetX = (e.clientX / window.innerWidth - 0.5) * 2;
			targetY = (e.clientY / window.innerHeight - 0.5) * 2;
			if (!raf) raf = requestAnimationFrame(loop);
		});
	}
})();
