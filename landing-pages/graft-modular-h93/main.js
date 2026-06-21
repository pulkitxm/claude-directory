(() => {
	/* ---------- Systems grid ---------- */
	const systems = [
		{
			n: "01 / External",
			name: "Axis Wall Systems",
			img: "sys-01",
			desc: "High-R insulated panels with vibrant architectural finishes.",
		},
		{
			n: "02 / Structural",
			name: "Titan Floor Grids",
			img: "sys-02",
			desc: "Lightweight steel-composite flooring with epoxy color-coding.",
		},
		{
			n: "03 / Internal",
			name: "Core Utility Pods",
			img: "sys-03",
			desc: "Finished modules with premium tile and fixture selections.",
		},
		{
			n: "04 / Envelope",
			name: "Apex Roof Units",
			img: "sys-04",
			desc: "Solar-ready modules in high-density polymer colorways.",
		},
		{
			n: "05 / Infra",
			name: "Terra Foundations",
			img: "sys-05",
			desc: "Precision-cast footings with durable color-coded sealant.",
		},
		{
			n: "06 / Joinery",
			name: "Link Connectors",
			img: "sys-06",
			desc: "Chrome-plated interlocking structural nodes.",
		},
		{
			n: "07 / Finish",
			name: "Vista Facades",
			img: "sys-07",
			desc: "Full-spectrum architectural skins in any RAL color.",
		},
		{
			n: "08 / MEP",
			name: "Nexus Shafts",
			img: "sys-08",
			desc: "Pre-assembled utility cores with color-coded piping.",
		},
		{
			n: "09 / Intelligence",
			name: "Smart Hubs",
			img: "sys-09",
			desc: "Interactive building-management dashboards, factory-fitted.",
		},
	];
	const arrow =
		'<svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>';
	const sysGrid = document.getElementById("sysGrid");
	sysGrid.innerHTML = systems
		.map(
			(s, i) => `
    <article class="scard" data-reveal data-delay="${(i % 3) * 90}">
      <img src="assets/img/${s.img}.jpg" alt="${s.name}">
      <div class="scard-body">
        <span class="scard-num">${s.n}</span>
        <h4>${s.name}</h4>
        <p>${s.desc}</p>
        <span class="scard-link">View Specs ${arrow}</span>
      </div>
    </article>`,
		)
		.join("");

	/* ---------- Stats ---------- */
	const stats = [
		{ v: 540000, suffix: "+", fmt: "k", label: "Total SQ FT Built" },
		{ v: 14, label: "Active Facilities" },
		{ v: 45, suffix: "%", label: "Faster Delivery" },
		{ v: 280, suffix: "k", label: "Lbs Carbon Saved" },
		{ v: 100, suffix: "%", label: "BIM Compliance" },
		{ v: 9, label: "Patented Systems" },
	];
	const statsGrid = document.getElementById("statsGrid");
	statsGrid.innerHTML = stats
		.map(
			(s, i) => `
    <div class="stat" data-reveal data-delay="${i * 80}">
      <div class="bar"></div>
      <div class="n" data-counter="${s.v}" data-suffix="${s.suffix || ""}" data-kfmt="${s.fmt || ""}">0</div>
      <span class="label">${s.label}</span>
    </div>`,
		)
		.join("");

	/* ---------- Process ---------- */
	const steps = [
		{
			n: "01",
			t: "Digital Twin",
			d: "Full BIM integration. Every screw and conduit is modeled before a single plate is cut.",
		},
		{
			n: "02",
			t: "Fabrication",
			d: "Automated robotic assembly in a climate-controlled environment for absolute consistency.",
		},
		{
			n: "03",
			t: "Logistics",
			d: "Volumetric shipping optimized for global transit and a minimal carbon footprint.",
		},
		{
			n: "04",
			t: "Deployment",
			d: "On-site rapid assembly by certified crews. Foundation to enclosure in days.",
		},
	];
	document.getElementById("procGrid").innerHTML = steps
		.map(
			(s, i) => `
    <article class="pcard" data-reveal="zoom" data-delay="${i * 120}">
      <span class="ghost">${s.n}</span>
      <div class="body"><h4>${s.t}</h4><p>${s.d}</p></div>
    </article>`,
		)
		.join("");

	/* ---------- Counter ---------- */
	function runCounter(el) {
		const target = parseFloat(el.dataset.counter);
		const suffix = el.dataset.suffix || "";
		const kfmt = el.dataset.kfmt === "k";
		const dur = 2200,
			start = performance.now();
		function step(now) {
			const p = Math.min((now - start) / dur, 1);
			const e = 1 - (1 - p) ** 3;
			const cur = Math.floor(e * target);
			el.textContent =
				(kfmt ? `${Math.round(cur / 1000)}k` : cur.toLocaleString()) + suffix;
			if (p < 1) requestAnimationFrame(step);
			else
				el.textContent =
					(kfmt ? `${Math.round(target / 1000)}k` : target.toLocaleString()) +
					suffix;
		}
		requestAnimationFrame(step);
	}

	/* ---------- Scroll reveal ---------- */
	const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	const revealEls = document.querySelectorAll("[data-reveal]");
	if (reduce) {
		revealEls.forEach((el) => {
			el.classList.add("in");
			el.querySelectorAll("[data-counter]").forEach(runCounter);
			if (el.dataset.counter) runCounter(el);
		});
	} else {
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((en) => {
					if (!en.isIntersecting) return;
					const el = en.target;
					const delay = parseInt(el.dataset.delay || 0, 10);
					setTimeout(() => {
						el.classList.add("in");
						el.querySelectorAll("[data-counter]").forEach(runCounter);
						if (el.dataset.counter) runCounter(el);
					}, delay);
					io.unobserve(el);
				});
			},
			{ threshold: 0.15 },
		);
		revealEls.forEach((el) => io.observe(el));
	}

	/* ---------- Mobile menu ---------- */
	const burger = document.getElementById("burger");
	const menu = document.getElementById("mobileMenu");
	const links = [
		["Systems", "#systems"],
		["Process", "#process"],
		["Specifications", "#specifications"],
		["Enterprise", "#contact"],
	];
	menu.innerHTML =
		links.map((l) => `<a href="${l[1]}">${l[0]}</a>`).join("") +
		'<a href="#contact" class="mm-cta">Request Quote</a>';
	Object.assign(menu.style, {
		position: "fixed",
		top: "61px",
		left: 0,
		right: 0,
		zIndex: 49,
		background: "rgba(255,255,255,.97)",
		backdropFilter: "blur(14px)",
		borderBottom: "1px solid var(--line)",
		flexDirection: "column",
		padding: "8px 24px 18px",
	});
	menu.querySelectorAll("a").forEach((a) =>
		Object.assign(a.style, {
			display: "block",
			padding: "14px 0",
			borderBottom: "1px solid var(--line)",
			fontSize: "13px",
			fontWeight: 600,
			textTransform: "uppercase",
			letterSpacing: ".16em",
		}),
	);
	let open = false;
	function toggle(state) {
		open = state ?? !open;
		menu.style.display = open ? "flex" : "none";
		burger.setAttribute("aria-expanded", String(open));
		menu.setAttribute("aria-hidden", String(!open));
	}
	toggle(false);
	burger.addEventListener("click", () => toggle());
	menu
		.querySelectorAll("a")
		.forEach((a) => a.addEventListener("click", () => toggle(false)));

	/* ---------- Form ---------- */
	const form = document.getElementById("quoteForm");
	form.addEventListener("submit", (e) => {
		e.preventDefault();
		const btn = form.querySelector("button");
		if (btn.disabled) return;
		btn.disabled = true;
		btn.textContent = "Transmitting Data…";
		setTimeout(() => {
			btn.textContent = "Inquiry Received";
			btn.style.background = "var(--matcha)";
			btn.style.color = "var(--ink)";
			btn.style.borderColor = "var(--matcha)";
			form.querySelectorAll("input,textarea").forEach((i) => (i.value = ""));
			setTimeout(() => {
				btn.disabled = false;
				btn.textContent = "Submit System Inquiry";
				btn.style.background = "";
				btn.style.color = "";
				btn.style.borderColor = "";
			}, 2600);
		}, 1400);
	});
})();
