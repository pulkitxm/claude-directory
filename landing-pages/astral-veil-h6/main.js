/* ============ ASTRAL VEIL — interactions ============ */
(() => {
	const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	/* ---- navbar scroll state ---- */
	const nav = document.getElementById("nav");
	const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 24);
	onScroll();
	window.addEventListener("scroll", onScroll, { passive: true });

	/* ---- mobile menu ---- */
	const burger = document.getElementById("burger");
	const menu = document.getElementById("mobileMenu");
	const icOpen = document.getElementById("ic-open");
	const icClose = document.getElementById("ic-close");
	const setMenu = (open) => {
		menu.classList.toggle("open", open);
		icOpen.style.display = open ? "none" : "block";
		icClose.style.display = open ? "block" : "none";
	};
	burger.addEventListener("click", () =>
		setMenu(!menu.classList.contains("open")),
	);
	menu
		.querySelectorAll("a")
		.forEach((a) => a.addEventListener("click", () => setMenu(false)));

	/* ---- integration capsules (color + staggered float) ---- */
	const capsuleData = [
		{
			n: "Notion",
			c: "rgba(255,255,255,.10)",
			b: "rgba(255,255,255,.14)",
			t: "#e6e6ec",
		},
		{
			n: "Slack",
			c: "rgba(236,72,153,.16)",
			b: "rgba(236,72,153,.28)",
			t: "#fbcfe8",
		},
		{
			n: "Figma",
			c: "rgba(251,146,60,.16)",
			b: "rgba(251,146,60,.28)",
			t: "#fed7aa",
		},
		{
			n: "Linear",
			c: "rgba(124,58,237,.18)",
			b: "rgba(124,58,237,.30)",
			t: "#ddd6fe",
		},
		{
			n: "Zoom",
			c: "rgba(96,165,250,.16)",
			b: "rgba(96,165,250,.28)",
			t: "#bfdbfe",
		},
		{
			n: "Drive",
			c: "rgba(52,211,153,.16)",
			b: "rgba(52,211,153,.28)",
			t: "#a7f3d0",
		},
		{
			n: "Dropbox",
			c: "rgba(34,211,238,.16)",
			b: "rgba(34,211,238,.28)",
			t: "#a5f3fc",
		},
		{
			n: "GitHub",
			c: "rgba(255,255,255,.06)",
			b: "rgba(255,255,255,.12)",
			t: "#d4d4dc",
		},
		{
			n: "Intercom",
			c: "rgba(59,130,246,.16)",
			b: "rgba(59,130,246,.28)",
			t: "#bfdbfe",
		},
		{
			n: "Discord",
			c: "rgba(129,140,248,.18)",
			b: "rgba(129,140,248,.30)",
			t: "#c7d2fe",
		},
		{
			n: "Teams",
			c: "rgba(139,92,246,.16)",
			b: "rgba(139,92,246,.28)",
			t: "#ddd6fe",
		},
		{
			n: "Jira",
			c: "rgba(56,189,248,.16)",
			b: "rgba(56,189,248,.28)",
			t: "#bae6fd",
		},
	];
	const cap = document.getElementById("capsules");
	capsuleData.forEach((d, i) => {
		const el = document.createElement("div");
		el.className = "capsule";
		el.textContent = d.n;
		el.style.background = `linear-gradient(135deg, ${d.c}, rgba(255,255,255,.02))`;
		el.style.borderColor = d.b;
		el.style.color = d.t;
		if (!reduced) {
			el.style.animationDelay = `${((i * 0.32) % 3).toFixed(2)}s`;
			el.style.animationDuration = `${(5.5 + (i % 5) * 0.7).toFixed(1)}s`;
		} else {
			el.style.animation = "none";
		}
		cap.appendChild(el);
	});

	/* ---- star rating ---- */
	const starSvg =
		'<svg width="16" height="16" viewBox="0 0 24 24" fill="#FBBF24" stroke="#FBBF24" stroke-width="1.5"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>';
	document.getElementById("stars").innerHTML = starSvg.repeat(5);

	/* ---- hero staggered entrance ---- */
	const heroEls = document.querySelectorAll("[data-hero]");
	if (reduced) {
		heroEls.forEach((el) => {
			el.style.opacity = 1;
		});
	} else {
		heroEls.forEach((el, i) => {
			el.style.opacity = 0;
			el.style.transform = "translateY(22px)";
			el.style.transition =
				"opacity .8s cubic-bezier(.16,1,.3,1), transform .8s cubic-bezier(.16,1,.3,1)";
			setTimeout(
				() => {
					el.style.opacity = 1;
					el.style.transform = "none";
				},
				120 + i * 110,
			);
		});
	}

	/* ---- scroll reveal ---- */
	const reveals = document.querySelectorAll(".reveal");
	if (reduced || !("IntersectionObserver" in window)) {
		reveals.forEach((el) => el.classList.add("in"));
	} else {
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						e.target.classList.add("in");
						io.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.12 },
		);
		reveals.forEach((el) => io.observe(el));
	}
})();
