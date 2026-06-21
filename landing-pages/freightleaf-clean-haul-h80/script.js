/* FreightLeaf — Clean Haul interactions */
(() => {
	const reduceMotion = window.matchMedia(
		"(prefers-reduced-motion: reduce)",
	).matches;

	/* ---------- Mobile menu ---------- */
	const toggle = document.getElementById("menuToggle");
	const menu = document.getElementById("mobileMenu");
	const backdrop = document.getElementById("backdrop");

	const ICON_OPEN =
		'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16m-7 6h7"/></svg>';
	const ICON_CLOSE =
		'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 18 18 6M6 6l12 12"/></svg>';

	function setMenu(open) {
		menu.classList.toggle("active", open);
		backdrop.classList.toggle("active", open);
		toggle.innerHTML = open ? ICON_CLOSE : ICON_OPEN;
		toggle.setAttribute("aria-expanded", String(open));
		toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
		document.body.style.overflow = open ? "hidden" : "";
	}

	if (toggle && menu) {
		toggle.addEventListener("click", (e) => {
			e.stopPropagation();
			setMenu(!menu.classList.contains("active"));
		});
		backdrop.addEventListener("click", () => setMenu(false));
		menu
			.querySelectorAll("a")
			.forEach((a) => a.addEventListener("click", () => setMenu(false)));
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") setMenu(false);
		});
	}

	/* ---------- Scroll reveal ---------- */
	const revealEls = document.querySelectorAll("[data-reveal]");
	if (reduceMotion || !("IntersectionObserver" in window)) {
		revealEls.forEach((el) => el.classList.add("in"));
	} else {
		const io = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("in");
						obs.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.12 },
		);
		revealEls.forEach((el) => io.observe(el));
	}

	/* ---------- Count-up metrics ---------- */
	const counters = document.querySelectorAll("[data-count]");
	function animateCount(el) {
		const target = parseFloat(el.dataset.count);
		const decimals = parseInt(el.dataset.decimals || "0", 10);
		const suffix = el.dataset.suffix || "";
		if (reduceMotion) {
			el.textContent = target.toFixed(decimals) + suffix;
			return;
		}
		const dur = 1600;
		const start = performance.now();
		function frame(now) {
			const p = Math.min((now - start) / dur, 1);
			const eased = 1 - (1 - p) ** 3;
			el.textContent = (target * eased).toFixed(decimals) + suffix;
			if (p < 1) requestAnimationFrame(frame);
			else el.textContent = target.toFixed(decimals) + suffix;
		}
		requestAnimationFrame(frame);
	}
	if ("IntersectionObserver" in window) {
		const cio = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						animateCount(entry.target);
						obs.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.5 },
		);
		counters.forEach((c) => cio.observe(c));
	} else {
		counters.forEach(animateCount);
	}

	/* ---------- Testimonial marquee (built then duplicated) ---------- */
	const QUOTES = [
		{
			name: "Sarah Jenkins",
			role: "VP of Supply Chain",
			img: "av1.jpg",
			text: "FreightLeaf slashed our transport emissions without adding a single delay to our schedule. A genuine game-changer.",
		},
		{
			name: "Marcus Chen",
			role: "Logistics Director",
			img: "av2.jpg",
			text: "Their electric fleet integration was seamless. We hit our sustainability milestones two full years ahead of plan.",
		},
		{
			name: "Elena Rodriguez",
			role: "Sustainability Lead",
			img: "av3.jpg",
			text: "Finally, a logistics partner that matches our dedication to the planet. Their carbon-savings reporting is phenomenal.",
		},
		{
			name: "Thomas Wright",
			role: "Operations Manager",
			img: "av4.jpg",
			text: "Cost-effective and green usually don’t mix in freight. FreightLeaf proved us wrong. Brilliant, dependable service.",
		},
	];
	const GLYPH =
		'<span class="glyph" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg></span>';

	function cardHTML(q) {
		return (
			'<article class="quote">' +
			'<div class="who"><img src="./assets/img/' +
			q.img +
			'" alt="Portrait of ' +
			q.name +
			'" />' +
			"<div><h4>" +
			q.name +
			"</h4><p>" +
			q.role +
			"</p></div></div>" +
			'<p class="text">“' +
			q.text +
			"”</p>" +
			GLYPH +
			"</article>"
		);
	}
	const track = document.getElementById("track");
	if (track) {
		const set = QUOTES.map(cardHTML).join("");
		track.innerHTML = set + set; // duplicate for seamless 50% loop
	}
})();
