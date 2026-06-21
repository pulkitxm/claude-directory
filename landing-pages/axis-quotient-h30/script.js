/* AXIS QUOTIENT — interactions */
(() => {
	const reduceMotion = window.matchMedia(
		"(prefers-reduced-motion: reduce)",
	).matches;
	const $ = (s, c = document) => c.querySelector(s);
	const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

	/* ---------- Header scroll state ---------- */
	const header = $("#header");
	const onScroll = () =>
		header.classList.toggle("scrolled", window.scrollY > 40);
	onScroll();
	window.addEventListener("scroll", onScroll, { passive: true });

	/* ---------- Live clock (London) ---------- */
	const clockEl = $("#clock-time");
	function tick() {
		try {
			clockEl.textContent = new Intl.DateTimeFormat("en-GB", {
				timeZone: "Europe/London",
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
				hour12: false,
			}).format(new Date());
		} catch (_e) {
			clockEl.textContent = new Date().toTimeString().slice(0, 8);
		}
	}
	tick();
	setInterval(tick, 1000);

	/* ---------- Solutions dropdown ---------- */
	const menuBtn = $("#menu-btn"),
		dropdown = $("#dropdown");
	function closeMenu() {
		dropdown.classList.remove("open");
		menuBtn.classList.remove("open");
		menuBtn.setAttribute("aria-expanded", "false");
	}
	menuBtn.addEventListener("click", (e) => {
		e.stopPropagation();
		const open = dropdown.classList.toggle("open");
		menuBtn.classList.toggle("open", open);
		menuBtn.setAttribute("aria-expanded", String(open));
	});
	document.addEventListener("click", (e) => {
		if (!dropdown.contains(e.target) && !menuBtn.contains(e.target))
			closeMenu();
	});
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") closeMenu();
	});
	$$("#dropdown a").forEach((a) => a.addEventListener("click", closeMenu));

	/* ---------- Scroll reveal ---------- */
	const io = new IntersectionObserver(
		(entries) => {
			entries.forEach((en) => {
				if (en.isIntersecting) {
					en.target.classList.add("in");
					const m = en.target.querySelector(".mask");
					if (m) m.classList.add("in");
					io.unobserve(en.target);
				}
			});
		},
		{ threshold: 0.14, rootMargin: "0px 0px -40px 0px" },
	);
	$$(".reveal").forEach((el) => io.observe(el));

	/* ---------- Count-up metrics ---------- */
	const counters = $$("[data-count]");
	const cio = new IntersectionObserver(
		(entries) => {
			entries.forEach((en) => {
				if (!en.isIntersecting) return;
				const el = en.target;
				cio.unobserve(el);
				const target = parseFloat(el.dataset.count);
				const dec = parseInt(el.dataset.dec || "0", 10);
				if (reduceMotion) {
					el.textContent = target.toFixed(dec);
					return;
				}
				const dur = 1300,
					t0 = performance.now();
				function step(now) {
					const p = Math.min((now - t0) / dur, 1);
					const eased = 1 - (1 - p) ** 3;
					el.textContent = (target * eased).toFixed(dec);
					if (p < 1) requestAnimationFrame(step);
					else el.textContent = target.toFixed(dec);
				}
				requestAnimationFrame(step);
			});
		},
		{ threshold: 0.5 },
	);
	counters.forEach((c) => cio.observe(c));

	/* ---------- Accordion (capabilities) ---------- */
	function wireAccordion(rootSel, itemSel, contentSel) {
		const items = $$(itemSel, $(rootSel));
		items.forEach((item) => {
			const btn = item.querySelector("button");
			btn.addEventListener("click", () => {
				const content = item.querySelector(contentSel);
				const isOpen = item.classList.contains("open");
				items.forEach((o) => {
					o.classList.remove("open");
					o.querySelector(contentSel).style.maxHeight = null;
				});
				if (!isOpen) {
					item.classList.add("open");
					content.style.maxHeight = `${content.scrollHeight}px`;
				}
			});
		});
	}
	wireAccordion("#acc", ".acc-item", ".acc-content");
	wireAccordion("#faq-list", ".faq-q", ".faq-ans");

	/* ---------- Pricing toggles ---------- */
	const pricing = {
		retainer: {
			off: false,
			on: { amt: "$14k", per: "/ month" },
			alt: { amt: "$36k", per: "/ quarter" },
		},
		sprint: {
			off: false,
			on: { amt: "$52k", per: "/ sprint", cap: "Fixed Engagement" },
			alt: { amt: "$9k", per: "/ month", cap: "Standby Retainer" },
		},
		mandate: {
			off: false,
			on: { amt: "1.2%", cap: "Buy-side Advisory" },
			alt: { amt: "1.6%", cap: "Sell-side Mandate" },
		},
	};
	$$(".knob[data-toggle]").forEach((knob) => {
		const key = knob.dataset.toggle;
		knob.addEventListener("click", () => {
			const cfg = pricing[key];
			cfg.off = !cfg.off;
			knob.classList.toggle("on", cfg.off);
			const data = cfg.off ? cfg.alt : cfg.on;
			const amtEl = $(`#${key}-amt`);
			if (amtEl) amtEl.textContent = data.amt;
			const perEl = $(`#${key}-per`);
			if (perEl && data.per) perEl.textContent = data.per;
			const capEl = $(`#${key}-cap`);
			if (capEl && data.cap) capEl.textContent = data.cap;
			// emphasize active label
			const onLbl = $(`[data-on="${key}"]`),
				offLbl = $(`[data-off="${key}"]`);
			if (onLbl && offLbl) {
				onLbl.classList.toggle("t-off", cfg.off);
				onLbl.classList.toggle("t-on", !cfg.off);
				offLbl.classList.toggle("t-on", cfg.off);
				offLbl.classList.toggle("t-off", !cfg.off);
			}
		});
	});

	/* ---------- Marquee build ---------- */
	const ticks = [
		["NIFTY 50", "+1.24%", "up"],
		["S&P 500", "+0.62%", "up"],
		["EVIDENCE", "▲", "neu"],
		["GILT 10Y", "−0.18%", "dn"],
		["SIGNAL / NOISE", "4.8 : 1", "neu"],
		["VIX", "−2.1%", "dn"],
		["SHARPE", "2.34", "neu"],
		["HANG SENG", "+0.91%", "up"],
		["CONVICTION", "▲", "neu"],
		["BRENT", "+0.44%", "up"],
		["ALPHA · TTM", "+31.4%", "up"],
		["DXY", "−0.07%", "dn"],
	];
	const marquee = $("#marquee");
	if (marquee) {
		const build = () =>
			ticks
				.map(
					([a, b, c]) =>
						`<span class="tick"><span>${a}</span><span class="${c}">${b}</span></span>`,
				)
				.join("");
		marquee.innerHTML = build() + build(); // duplicate for seamless loop
	}

	/* ---------- Sparkline (hero ticker card) ---------- */
	const spark = $("#spark");
	function genPath(w, h, n, jitter) {
		const pts = [];
		let v = h * 0.6;
		for (let i = 0; i < n; i++) {
			v += (Math.random() - 0.46) * jitter;
			v = Math.max(h * 0.18, Math.min(h * 0.82, v));
			pts.push([(i / (n - 1)) * w, v]);
		}
		return pts;
	}
	function drawSpark() {
		if (!spark) return;
		const w = 280,
			h = 88,
			n = 30;
		const pts = genPath(w, h, n, 9);
		const line = pts
			.map((p, i) => `${(i ? "L" : "M") + p[0].toFixed(1)} ${p[1].toFixed(1)}`)
			.join(" ");
		const area = `${line} L${w} ${h} L0 ${h} Z`;
		spark.innerHTML =
			`<path d="${area}" fill="rgba(31,68,255,0.08)"/>` +
			`<path d="${line}" fill="none" stroke="#1f44ff" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/>` +
			`<circle cx="${w}" cy="${pts[n - 1][1].toFixed(1)}" r="3" fill="#1f44ff"/>`;
	}
	drawSpark();

	/* ---------- Rotating ticker metric ---------- */
	const metrics = [
		["+31.4<em>%</em>", "Median Alpha · TTM"],
		["2.34", "Portfolio Sharpe"],
		["4.8 : 1", "Signal / Noise"],
		["−42<em>%</em>", "Tail Drawdown"],
	];
	const tcVal = $("#tc-val"),
		tcLab = $("#tc-lab");
	let mi = 0;
	if (!reduceMotion && tcVal && tcLab) {
		setInterval(() => {
			mi = (mi + 1) % metrics.length;
			tcVal.style.opacity = "0";
			tcLab.style.opacity = "0";
			setTimeout(() => {
				tcVal.innerHTML = metrics[mi][0];
				tcLab.textContent = metrics[mi][1];
				drawSpark();
				tcVal.style.opacity = "1";
				tcLab.style.opacity = "1";
			}, 320);
		}, 3800);
		[tcVal, tcLab].forEach((e) => {
			e.style.transition = "opacity 0.3s";
		});
	}

	/* ---------- Case-file data-viz (SVG) ---------- */
	function drawViz(id, seed) {
		const svg = $(`#${id}`);
		if (!svg) return;
		const W = 400,
			H = 250,
			cols = 24;
		let bars = "";
		let rnd = seed;
		const rand = () => {
			rnd = (rnd * 9301 + 49297) % 233280;
			return rnd / 233280;
		};
		for (let i = 0; i < cols; i++) {
			const bh = 30 + rand() * 170;
			const x = 16 + i * ((W - 32) / cols);
			const bw = (W - 32) / cols - 4;
			const accent = i % 5 === 0;
			bars += `<rect x="${x.toFixed(1)}" y="${(H - 16 - bh).toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" fill="${accent ? "#1f44ff" : "rgba(17,17,20,0.16)"}"/>`;
		}
		// trend line over bars
		let lp = "";
		for (let i = 0; i < cols; i++) {
			const x = 16 + i * ((W - 32) / cols) + (W - 32) / cols / 2;
			const y = 40 + rand() * 120;
			lp += `${(i ? "L" : "M") + x.toFixed(1)} ${y.toFixed(1)} `;
		}
		svg.innerHTML = `<rect width="${W}" height="${H}" fill="#fbfaf6"/>${bars}<path d="${lp}" fill="none" stroke="#111114" stroke-width="1.5" stroke-dasharray="3 3"/>`;
	}
	drawViz("viz1", 1771);
	drawViz("viz2", 9043);

	/* ---------- Hero canvas: drifting point grid ---------- */
	const canvas = $("#hero-canvas");
	if (canvas && !reduceMotion) {
		const ctx = canvas.getContext("2d");
		let W,
			H,
			dpr,
			pts = [],
			_raf;
		function resize() {
			dpr = Math.min(window.devicePixelRatio || 1, 2);
			W = canvas.clientWidth;
			H = canvas.clientHeight;
			canvas.width = W * dpr;
			canvas.height = H * dpr;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			const count = Math.min(70, Math.floor((W * H) / 22000));
			pts = [];
			for (let i = 0; i < count; i++) {
				pts.push({
					x: Math.random() * W,
					y: Math.random() * H,
					vx: (Math.random() - 0.5) * 0.25,
					vy: (Math.random() - 0.5) * 0.25,
					c: Math.random() > 0.8,
				});
			}
		}
		function frame() {
			ctx.clearRect(0, 0, W, H);
			// faint grid
			ctx.strokeStyle = "rgba(255,255,255,0.04)";
			ctx.lineWidth = 1;
			const g = 64;
			ctx.beginPath();
			for (let x = 0; x < W; x += g) {
				ctx.moveTo(x, 0);
				ctx.lineTo(x, H);
			}
			for (let y = 0; y < H; y += g) {
				ctx.moveTo(0, y);
				ctx.lineTo(W, y);
			}
			ctx.stroke();
			// connections
			for (let i = 0; i < pts.length; i++) {
				const a = pts[i];
				a.x += a.vx;
				a.y += a.vy;
				if (a.x < 0 || a.x > W) a.vx *= -1;
				if (a.y < 0 || a.y > H) a.vy *= -1;
				for (let j = i + 1; j < pts.length; j++) {
					const b = pts[j];
					const dx = a.x - b.x,
						dy = a.y - b.y,
						d = Math.hypot(dx, dy);
					if (d < 120) {
						ctx.strokeStyle = `rgba(243,241,234,${(1 - d / 120) * 0.1})`;
						ctx.beginPath();
						ctx.moveTo(a.x, a.y);
						ctx.lineTo(b.x, b.y);
						ctx.stroke();
					}
				}
			}
			// points
			for (const p of pts) {
				ctx.fillStyle = p.c ? "rgba(31,68,255,0.85)" : "rgba(243,241,234,0.45)";
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.c ? 1.8 : 1.2, 0, Math.PI * 2);
				ctx.fill();
			}
			_raf = requestAnimationFrame(frame);
		}
		resize();
		frame();
		let rt;
		window.addEventListener("resize", () => {
			clearTimeout(rt);
			rt = setTimeout(resize, 200);
		});
	}

	/* ---------- Newsletter form ---------- */
	const form = $("#news-form"),
		msg = $("#news-msg");
	if (form) {
		form.addEventListener("submit", (e) => {
			e.preventDefault();
			const name = $("#nf-name").value.trim();
			const email = $("#nf-email").value.trim();
			const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
			if (!name) {
				msg.textContent = "Please enter your name.";
				msg.className = "news-msg err";
				return;
			}
			if (!valid) {
				msg.textContent = "Please enter a valid email.";
				msg.className = "news-msg err";
				return;
			}
			msg.textContent = "Subscribed — the brief is on its way.";
			msg.className = "news-msg ok";
			form.reset();
		});
	}
})();
