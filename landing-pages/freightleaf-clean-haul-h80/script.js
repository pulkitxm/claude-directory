(() => {
	const reduceMotion = window.matchMedia(
		"(prefers-reduced-motion: reduce)",
	).matches;
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
			{
				threshold: 0.12,
			},
		);
		revealEls.forEach((el) => io.observe(el));
	}
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
			{
				threshold: 0.5,
			},
		);
		counters.forEach((c) => cio.observe(c));
	} else {
		counters.forEach(animateCount);
	}
	const QUOTES = [
		{
			name: "Sarah Jenkins",
			role: "VP of Supply Chain",
			img: "field-2",
			text: "FreightLeaf slashed our transport emissions without adding a single delay to our schedule. A genuine game-changer.",
		},
		{
			name: "Marcus Chen",
			role: "Logistics Director",
			img: "field-3",
			text: "Their electric fleet integration was seamless. We hit our sustainability milestones two full years ahead of plan.",
		},
		{
			name: "Elena Rodriguez",
			role: "Sustainability Lead",
			img: "field-1",
			text: "Finally, a logistics partner that matches our dedication to the planet. Their carbon-savings reporting is phenomenal.",
		},
		{
			name: "Thomas Wright",
			role: "Operations Manager",
			img: "field-2",
			text: "Cost-effective and green usually don’t mix in freight. FreightLeaf proved us wrong. Brilliant, dependable service.",
		},
	];
	const GLYPH =
		'<span class="glyph" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 7H10V13H4ZM14 7H20V13H14Z"/><path d="M8 13L5 18H3L6 13ZM18 13L15 18H13L16 13Z"/></svg></span>';
	function cardHTML(q) {
		return (
			'<article class="quote">' +
			'<div class="who"><div role="img" data-visual="' +
			q.img +
			'" aria-label="Original abstract geometric study"  class="procedural-visual"></div>' +
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
		track.innerHTML = set + set;
	}
})();
