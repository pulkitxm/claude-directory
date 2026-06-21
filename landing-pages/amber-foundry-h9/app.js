(() => {
	var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	/* ---------- scroll reveal ---------- */
	function initReveal() {
		var els = document.querySelectorAll("[data-reveal]");
		if (reduce || !("IntersectionObserver" in window)) {
			els.forEach((e) => {
				e.classList.add("show");
			});
			return;
		}
		var io = new IntersectionObserver(
			(entries) => {
				entries.forEach((en) => {
					if (en.isIntersecting) {
						en.target.classList.add("show");
						io.unobserve(en.target);
					}
				});
			},
			{ threshold: 0.12 },
		);
		els.forEach((e) => {
			io.observe(e);
		});
	}

	/* ---------- solutions auto-advance ---------- */
	function initSolutions() {
		var steps = Array.prototype.slice.call(document.querySelectorAll(".step"));
		var mocks = Array.prototype.slice.call(document.querySelectorAll(".mock"));
		if (!steps.length) return;
		var active = 0,
			timer = null,
			DURATION = 5200;

		function set(i) {
			active = i;
			steps.forEach((s, k) => {
				s.classList.toggle("active", k === i);
			});
			mocks.forEach((m, k) => {
				m.classList.toggle("show", k === i);
			});
		}
		function restartProgress() {
			// force reflow so the progress bar transition replays
			var bar = steps[active].querySelector(".prog i");
			if (bar) {
				bar.style.transition = "none";
				bar.style.transform = "scaleX(0)";
				void bar.offsetWidth;
				bar.style.transition = "";
				bar.style.transform = "";
			}
		}
		function schedule() {
			if (reduce) return;
			clearTimeout(timer);
			timer = setTimeout(() => {
				go((active + 1) % steps.length);
			}, DURATION);
		}
		function go(i) {
			set(i);
			restartProgress();
			schedule();
		}

		steps.forEach((s, i) => {
			s.addEventListener("click", () => {
				go(i);
			});
		});
		set(0);
		schedule();
	}

	/* ---------- faq accordion ---------- */
	function initFaq() {
		var items = Array.prototype.slice.call(document.querySelectorAll(".fitem"));
		items.forEach((item) => {
			var btn = item.querySelector(".fq");
			var body = item.querySelector(".fa");
			btn.addEventListener("click", () => {
				var open = item.classList.contains("open");
				items.forEach((o) => {
					o.classList.remove("open");
					var b = o.querySelector(".fa");
					b.style.maxHeight = "0px";
					b.style.opacity = "0";
				});
				if (!open) {
					item.classList.add("open");
					body.style.maxHeight = `${body.scrollHeight}px`;
					body.style.opacity = "1";
				}
			});
		});
	}

	/* ---------- hero neural canvas ---------- */
	function initNeural() {
		var canvas = document.getElementById("neural");
		if (!canvas) return;
		var ctx = canvas.getContext("2d");
		var dpr = Math.min(window.devicePixelRatio || 1, 2);
		var W = 0,
			H = 0,
			nodes = [],
			edges = [],
			particles = [],
			running = false,
			raf = null;

		function resize() {
			var r = canvas.getBoundingClientRect();
			W = r.width;
			H = r.height;
			canvas.width = Math.round(W * dpr);
			canvas.height = Math.round(H * dpr);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			build();
		}

		function build() {
			nodes = [];
			edges = [];
			particles = [];
			var cols = Math.max(4, Math.round(W / 150));
			var rows = Math.max(3, Math.round(H / 120));
			for (var y = 0; y < rows; y++) {
				for (var x = 0; x < cols; x++) {
					var jx = (Math.random() - 0.5) * 60;
					var jy = (Math.random() - 0.5) * 50;
					nodes.push({
						x: ((x + 0.5) / cols) * W + jx,
						y: ((y + 0.5) / rows) * H + jy,
						r: 1.6 + Math.random() * 2.6,
						ph: Math.random() * Math.PI * 2,
						sp: 0.6 + Math.random() * 0.8,
					});
				}
			}
			// connect each node to a couple of nearest neighbours
			for (var i = 0; i < nodes.length; i++) {
				var dlist = [];
				for (var j = 0; j < nodes.length; j++) {
					if (i === j) continue;
					var dx = nodes[i].x - nodes[j].x,
						dy = nodes[i].y - nodes[j].y;
					dlist.push({ j: j, d: dx * dx + dy * dy });
				}
				dlist.sort((a, b) => a.d - b.d);
				var k = 2 + (Math.random() < 0.3 ? 1 : 0);
				for (var m = 0; m < k && m < dlist.length; m++) {
					var jj = dlist[m].j;
					if (jj > i) edges.push({ a: i, b: jj });
				}
			}
			for (var p = 0; p < Math.min(edges.length, 40); p++) {
				particles.push({
					e: (Math.random() * edges.length) | 0,
					t: Math.random(),
					sp: 0.0025 + Math.random() * 0.004,
				});
			}
		}

		function draw(now) {
			ctx.clearRect(0, 0, W, H);
			// warm wash
			var g = ctx.createRadialGradient(
				W * 0.5,
				H * 0.45,
				10,
				W * 0.5,
				H * 0.45,
				Math.max(W, H) * 0.7,
			);
			g.addColorStop(0, "rgba(218,182,151,0.16)");
			g.addColorStop(1, "rgba(218,182,151,0)");
			ctx.fillStyle = g;
			ctx.fillRect(0, 0, W, H);

			// edges
			ctx.lineWidth = 1;
			for (var i = 0; i < edges.length; i++) {
				var a = nodes[edges[i].a],
					b = nodes[edges[i].b];
				ctx.strokeStyle = "rgba(43,24,10,0.10)";
				ctx.beginPath();
				ctx.moveTo(a.x, a.y);
				ctx.lineTo(b.x, b.y);
				ctx.stroke();
			}
			// flowing particles
			for (var q = 0; q < particles.length; q++) {
				var pt = particles[q];
				pt.t += pt.sp;
				if (pt.t > 1) {
					pt.t = 0;
					pt.e = (Math.random() * edges.length) | 0;
				}
				var e = edges[pt.e];
				if (!e) continue;
				var na = nodes[e.a],
					nb = nodes[e.b];
				var px = na.x + (nb.x - na.x) * pt.t;
				var py = na.y + (nb.y - na.y) * pt.t;
				ctx.fillStyle = "rgba(218,182,151,0.9)";
				ctx.beginPath();
				ctx.arc(px, py, 1.8, 0, Math.PI * 2);
				ctx.fill();
			}
			// nodes
			var t = now * 0.001;
			for (var n = 0; n < nodes.length; n++) {
				var nd = nodes[n];
				var pulse = 0.55 + 0.45 * Math.sin(t * nd.sp + nd.ph);
				ctx.fillStyle = `rgba(218,182,151,${0.25 + pulse * 0.55})`;
				ctx.beginPath();
				ctx.arc(nd.x, nd.y, nd.r + pulse * 1.4, 0, Math.PI * 2);
				ctx.fill();
				ctx.fillStyle = `rgba(43,24,10,${0.3 + pulse * 0.4})`;
				ctx.beginPath();
				ctx.arc(nd.x, nd.y, nd.r * 0.45, 0, Math.PI * 2);
				ctx.fill();
			}
			if (running) raf = requestAnimationFrame(draw);
		}

		function start() {
			if (!running && !reduce) {
				running = true;
				raf = requestAnimationFrame(draw);
			}
		}
		function stop() {
			running = false;
			if (raf) cancelAnimationFrame(raf);
		}

		resize();
		if (reduce) {
			draw(0);
			return;
		}
		window.addEventListener("resize", resize);
		if ("IntersectionObserver" in window) {
			new IntersectionObserver(
				(e) => {
					e[0].isIntersecting ? start() : stop();
				},
				{ threshold: 0.05 },
			).observe(canvas);
		} else {
			start();
		}
	}

	/* ---------- dispatch demo ---------- */
	function initDispatch() {
		document.querySelectorAll("[data-no-submit]").forEach((f) => {
			f.addEventListener("submit", (e) => {
				e.preventDefault();
			});
		});
	}

	document.addEventListener("DOMContentLoaded", () => {
		initReveal();
		initSolutions();
		initFaq();
		initNeural();
		initDispatch();
	});
})();
