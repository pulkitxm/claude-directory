(() => {
	const reduceMotion = window.matchMedia(
		"(prefers-reduced-motion: reduce)",
	).matches;

	/* ---- Nav scroll state ---- */
	const nav = document.getElementById("nav");
	const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
	window.addEventListener("scroll", onScroll, { passive: true });
	onScroll();

	/* ---- Mobile menu ---- */
	const hb = document.getElementById("hamburger");
	const mm = document.getElementById("mobileMenu");
	hb.addEventListener("click", () => {
		const open = mm.classList.toggle("open");
		hb.classList.toggle("open", open);
		hb.setAttribute("aria-expanded", String(open));
	});
	mm.querySelectorAll("a").forEach((a) =>
		a.addEventListener("click", () => {
			mm.classList.remove("open");
			hb.classList.remove("open");
			hb.setAttribute("aria-expanded", "false");
		}),
	);

	/* ---- Scroll reveal ---- */
	const reveals = document.querySelectorAll(".reveal");
	if (reduceMotion) {
		reveals.forEach((el) => el.classList.add("in"));
	} else {
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e, i) => {
					if (e.isIntersecting) {
						setTimeout(() => e.target.classList.add("in"), i * 70);
						io.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.12 },
		);
		reveals.forEach((el) => io.observe(el));
	}

	/* ---- Trusted-by marquee ---- */
	const brands = [
		"Vertex Core",
		"CloudPulse",
		"NeuralLink",
		"ApexSolutions",
		"ShieldFlow",
		"Quantas",
		"Northwind",
		"Helio Labs",
	];
	const track = document.getElementById("marqueeTrack");
	if (track) {
		const make = () => brands.map((b) => `<span>${b}</span>`).join("");
		track.innerHTML = make() + make();
	}

	/* ---- Live execution log ---- */
	const logStream = document.getElementById("logStream");
	const logTemplates = [
		{ tag: "system", msg: "Initializing neural gateway...", ok: false },
		{ tag: "agent", msg: "Analyzing token set #4412... Success.", ok: true },
		{ tag: "logic", msg: "Applying predictive model: V3-Stable", ok: false },
		{ tag: "system", msg: "Memory allocation at 14% capacity", ok: true },
		{ tag: "agent", msg: "Routing task to region eu-west-2", ok: true },
		{ tag: "logic", msg: "Recursive refinement, error 0.08%", ok: false },
		{ tag: "system", msg: "Verified 18 sub-tasks autonomously", ok: true },
		{ tag: "agent", msg: "Cross-referencing shipping latency...", ok: false },
		{ tag: "system", msg: "Integrity check passed: all nodes", ok: true },
	];
	let logI = 0;
	function pad(n) {
		return String(n).padStart(2, "0");
	}
	function clockStr() {
		const d = new Date();
		return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
	}
	function pushLog() {
		if (!logStream) return;
		const t = logTemplates[logI % logTemplates.length];
		logI++;
		const line = document.createElement("div");
		line.className = "log-line";
		line.innerHTML =
			`<span class="log-tag ${t.tag}">[${t.tag.toUpperCase()}]</span>` +
			`<span class="log-time">${clockStr()}</span>` +
			`<span class="log-msg ${t.ok ? "ok" : ""}">${t.msg}</span>`;
		logStream.appendChild(line);
		while (logStream.children.length > 6)
			logStream.removeChild(logStream.firstChild);
	}
	// seed a few
	for (let k = 0; k < 4; k++) pushLog();
	if (!reduceMotion) setInterval(pushLog, 1800);

	/* ---- Count-up ---- */
	function animateCount(el) {
		const to = parseFloat(el.dataset.to);
		const dec = parseInt(el.dataset.dec || "0", 10);
		const suffix = el.dataset.suffix || "";
		if (reduceMotion) {
			el.textContent = format(to, dec, suffix);
			return;
		}
		const dur = 1400,
			start = performance.now();
		function step(now) {
			const p = Math.min((now - start) / dur, 1);
			const eased = 1 - (1 - p) ** 3;
			el.textContent = format(to * eased, dec, suffix);
			if (p < 1) requestAnimationFrame(step);
			else el.textContent = format(to, dec, suffix);
		}
		requestAnimationFrame(step);
	}
	function format(v, dec, suffix) {
		let n;
		if (dec > 0) n = v.toFixed(dec);
		else n = Math.round(v).toLocaleString("en-US");
		return n + suffix;
	}
	const counted = new WeakSet();
	const countIO = new IntersectionObserver(
		(entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting && !counted.has(e.target)) {
					counted.add(e.target);
					e.target.querySelectorAll(".count").forEach(animateCount);
				}
			});
		},
		{ threshold: 0.4 },
	);
	["dashMetrics", "statsBand"].forEach((id) => {
		const el = document.getElementById(id);
		if (el) countIO.observe(el);
	});

	/* ---- Node graph in feature card ---- */
	const svg = document.querySelector(".node-graph");
	if (svg) {
		const W = 320,
			H = 120;
		const nodes = [];
		const cols = 5,
			rows = 3;
		for (let c = 0; c < cols; c++) {
			for (let r = 0; r < rows; r++) {
				nodes.push({
					x: 30 + (c * (W - 60)) / (cols - 1) + (Math.random() * 14 - 7),
					y: 22 + (r * (H - 44)) / (rows - 1) + (Math.random() * 12 - 6),
				});
			}
		}
		const edgesG = svg.querySelector(".edges");
		const nodesG = svg.querySelector(".nodes");
		const NS = "http://www.w3.org/2000/svg";
		// connect each node to a couple nearby
		nodes.forEach((n, i) => {
			const near = nodes
				.map((m, j) => ({ j, d: (m.x - n.x) ** 2 + (m.y - n.y) ** 2 }))
				.filter((o) => o.j !== i)
				.sort((a, b) => a.d - b.d)
				.slice(0, 2);
			near.forEach((o) => {
				const l = document.createElementNS(NS, "line");
				l.setAttribute("x1", n.x);
				l.setAttribute("y1", n.y);
				l.setAttribute("x2", nodes[o.j].x);
				l.setAttribute("y2", nodes[o.j].y);
				edgesG.appendChild(l);
			});
		});
		nodes.forEach((n, _i) => {
			const c = document.createElementNS(NS, "circle");
			c.setAttribute("cx", n.x);
			c.setAttribute("cy", n.y);
			c.setAttribute("r", 2.4);
			if (!reduceMotion) {
				const a = document.createElementNS(NS, "animate");
				a.setAttribute("attributeName", "r");
				a.setAttribute("values", "2.4;3.6;2.4");
				a.setAttribute("dur", `${(1.8 + Math.random() * 1.4).toFixed(2)}s`);
				a.setAttribute("repeatCount", "indefinite");
				a.setAttribute("begin", `${Math.random().toFixed(2)}s`);
				c.appendChild(a);
			}
			nodesG.appendChild(c);
		});
	}

	/* ---- Cursor-reactive hero glow ---- */
	const dashGlow = document.querySelector(".dash-glow");
	const dashWrap = document.getElementById("dashWrap");
	if (
		dashGlow &&
		dashWrap &&
		!reduceMotion &&
		window.matchMedia("(pointer:fine)").matches
	) {
		let raf = null,
			tx = 0,
			ty = 0,
			cx = 0,
			cy = 0;
		window.addEventListener(
			"mousemove",
			(e) => {
				const r = dashWrap.getBoundingClientRect();
				const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
				const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
				tx = Math.max(-1, Math.min(1, dx)) * 26;
				ty = Math.max(-1, Math.min(1, dy)) * 16;
				if (!raf) raf = requestAnimationFrame(tick);
			},
			{ passive: true },
		);
		function tick() {
			cx += (tx - cx) * 0.08;
			cy += (ty - cy) * 0.08;
			dashGlow.style.transform = `translate(${cx.toFixed(2)}px, ${cy.toFixed(2)}px)`;
			if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1)
				raf = requestAnimationFrame(tick);
			else raf = null;
		}
	}
})();
