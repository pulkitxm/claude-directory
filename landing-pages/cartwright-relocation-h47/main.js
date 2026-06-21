(() => {
	const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	/* ---- Partner marquee (inline SVG wordmarks, rendered twice) ---- */
	const partners = [
		["M3 5h6l3 7 3-7h6l-6 14h-6z", "Vantor"],
		["M4 4h10a5 5 0 010 10H4z M4 14h7l5 6", "Reliant"],
		["M12 3l9 5v8l-9 5-9-5V8z", "Meridian"],
		["M5 4h14v4H5z M9 8v12 M15 8v12", "Northbay"],
		["M4 12a8 8 0 1116 0", "Halcyon"],
		["M3 18l6-12 6 12 M6 13h6", "Atlas Freight"],
	];
	const setHTML = partners
		.map(
			([d, name]) => `
    <a class="plogo" href="#" tabindex="-1">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${d}"/></svg>
      <span>${name}</span>
    </a>`,
		)
		.join("");
	const marquee = document.getElementById("marquee");
	if (marquee)
		marquee.innerHTML = `<div class="mset">${setHTML}</div><div class="mset" aria-hidden="true">${setHTML}</div>`;

	/* ---- Scroll reveal ---- */
	const revealEls = document.querySelectorAll("[data-reveal]");
	if (reduce) {
		revealEls.forEach((el) => el.classList.add("in"));
	} else {
		const ro = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						e.target.classList.add("in");
						ro.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.15 },
		);
		revealEls.forEach((el) => ro.observe(el));
	}

	/* ---- Count-up ---- */
	const counters = document.querySelectorAll(".counter");
	const animateCount = (el) => {
		const target = parseFloat(el.dataset.target);
		const suffix = el.dataset.suffix || "";
		if (reduce) {
			el.textContent = target + suffix;
			return;
		}
		const dur = 1800,
			start = performance.now();
		const tick = (now) => {
			const p = Math.min((now - start) / dur, 1);
			const ease = 1 - (1 - p) ** 4;
			el.textContent = Math.floor(target * ease) + suffix;
			if (p < 1) requestAnimationFrame(tick);
			else el.textContent = target + suffix;
		};
		requestAnimationFrame(tick);
	};
	const co = new IntersectionObserver(
		(entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) {
					animateCount(e.target);
					co.unobserve(e.target);
				}
			});
		},
		{ threshold: 0.6 },
	);
	counters.forEach((c) => co.observe(c));

	/* ---- Process timeline ---- */
	const proc = document.getElementById("proc");
	if (proc) {
		const fill = document.getElementById("procFill");
		const steps = proc.querySelectorAll(".step");
		const run = () => {
			if (fill) fill.style.width = "100%";
			steps.forEach((step, i) => {
				setTimeout(
					() => {
						step.classList.add("active");
						const mob = step.querySelector(".mob-line .fill");
						if (mob) mob.style.height = "100%";
					},
					reduce ? 0 : i * 480,
				);
			});
		};
		const po = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					run();
					po.disconnect();
				}
			},
			{ threshold: 0.3 },
		);
		po.observe(proc);
	}

	/* ---- Testimonial deck ---- */
	const deck = document.getElementById("deck");
	if (deck) {
		const cards = Array.from(deck.querySelectorAll("[data-card]"));
		let animating = false,
			timer = null;

		const layout = () => {
			cards.forEach((c, i) => {
				c.style.zIndex = String(30 - i);
				c.style.opacity = i > 2 ? "0" : "1";
				c.style.transform = `translateY(${i * 22}px) scale(${1 - i * 0.05}) rotate(${i * 1.2}deg)`;
			});
		};
		layout();

		const advance = () => {
			if (animating) return;
			animating = true;
			const top = cards[0];
			top.style.transition =
				"transform .55s cubic-bezier(.2,.8,.2,1), opacity .55s";
			top.style.transform = "translateX(118%) rotate(12deg) scale(.85)";
			top.style.opacity = "0";
			setTimeout(() => {
				cards.push(cards.shift());
				const moved = cards[cards.length - 1];
				moved.style.transition = "none";
				layout();
				requestAnimationFrame(() => {
					moved.style.transition =
						"transform .55s cubic-bezier(.2,.8,.2,1), opacity .55s";
					animating = false;
				});
			}, 560);
		};

		const start = () => {
			if (!reduce) timer = setInterval(advance, 4200);
		};
		deck.addEventListener("click", () => {
			clearInterval(timer);
			advance();
			start();
		});
		start();
	}

	/* ---- Navbar shrink ---- */
	const nav = document.getElementById("nav");
	const onScroll = () => {
		nav.classList.toggle("shrink", window.scrollY > 40);
	};
	window.addEventListener("scroll", onScroll, { passive: true });
	onScroll();

	/* ---- Mobile menu ---- */
	const burger = document.getElementById("burger");
	const closeMenu = document.getElementById("closeMenu");
	const mobile = document.getElementById("mobile");
	const toggle = (open) => {
		mobile.classList.toggle("open", open);
		document.body.style.overflow = open ? "hidden" : "";
	};
	if (burger) burger.addEventListener("click", () => toggle(true));
	if (closeMenu) closeMenu.addEventListener("click", () => toggle(false));
	mobile
		.querySelectorAll("a")
		.forEach((a) => a.addEventListener("click", () => toggle(false)));

	/* ---- Form ---- */
	const form = document.getElementById("quoteForm");
	if (form) {
		form.addEventListener("submit", (e) => {
			e.preventDefault();
			if (!form.checkValidity()) {
				form.reportValidity();
				return;
			}
			document.getElementById("formOk").classList.add("show");
			form.reset();
		});
	}
})();
