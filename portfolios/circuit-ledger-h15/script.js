const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ===== CIRCUIT CANVAS ===== */
(() => {
	const canvas = document.getElementById("circuit");
	if (!canvas) return;
	const ctx = canvas.getContext("2d");
	let _w,
		_h,
		runners = [],
		bits = [],
		dpr = Math.min(window.devicePixelRatio || 1, 2);
	const grid = 50;
	const mouse = { x: -200, y: -200 };
	const COLORS = [
		"rgba(247,226,192,.34)",
		"rgba(74,222,128,.30)",
		"rgba(224,242,254,.26)",
		"rgba(255,105,180,.24)",
	];

	function resize() {
		_w = canvas.width = Math.floor(innerWidth * dpr);
		_h = canvas.height = Math.floor(innerHeight * dpr);
		canvas.style.width = `${innerWidth}px`;
		canvas.style.height = `${innerHeight}px`;
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
	}
	const VW = () => innerWidth,
		VH = () => innerHeight;

	class Runner {
		constructor() {
			this.reset(true);
		}
		reset(initial) {
			this.x = Math.floor(Math.random() * (VW() / grid)) * grid;
			this.y = Math.floor(Math.random() * (VH() / grid)) * grid;
			const d = Math.floor(Math.random() * 4);
			this.s = 0.5;
			this.vx = (d === 0 ? 1 : d === 1 ? -1 : 0) * this.s;
			this.vy = (d === 2 ? 1 : d === 3 ? -1 : 0) * this.s;
			this.hist = [];
			this.maxH = Math.random() * 20 + 10;
			this.life = Math.random() * 220 + 120;
			this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
			this.th = Math.random() > 0.8 ? 2 : 1;
			if (initial) this.life = Math.random() * 340;
		}
		update() {
			this.x += this.vx;
			this.y += this.vy;
			if (Math.abs(this.x % grid) < 0.6 && Math.abs(this.y % grid) < 0.6) {
				this.x = Math.round(this.x / grid) * grid;
				this.y = Math.round(this.y / grid) * grid;
				if (Math.random() < 0.16) {
					if (this.vx !== 0) {
						this.vx = 0;
						this.vy = (Math.random() > 0.5 ? 1 : -1) * this.s;
					} else {
						this.vy = 0;
						this.vx = (Math.random() > 0.5 ? 1 : -1) * this.s;
					}
				}
			}
			this.life--;
			if (
				this.x < -grid ||
				this.x > VW() + grid ||
				this.y < -grid ||
				this.y > VH() + grid ||
				this.life <= 0
			)
				this.reset(false);
			this.hist.push({ x: this.x, y: this.y });
			if (this.hist.length > this.maxH) this.hist.shift();
		}
		draw() {
			if (this.hist.length < 2) return;
			ctx.beginPath();
			ctx.moveTo(this.hist[0].x, this.hist[0].y);
			for (let i = 1; i < this.hist.length; i++)
				ctx.lineTo(this.hist[i].x, this.hist[i].y);
			ctx.strokeStyle = this.color;
			ctx.lineWidth = this.th;
			ctx.lineCap = "round";
			ctx.lineJoin = "round";
			ctx.shadowBlur = 6;
			ctx.shadowColor = this.color;
			ctx.stroke();
			ctx.shadowBlur = 0;
			ctx.fillStyle = "rgba(255,255,255,.45)";
			ctx.fillRect(this.x - 1.5, this.y - 1.5, 3, 3);
		}
	}
	class Bit {
		constructor() {
			this.relocate();
		}
		relocate() {
			this.x = Math.floor(Math.random() * (VW() / grid)) * grid + grid / 4;
			this.y = Math.floor(Math.random() * (VH() / grid)) * grid + grid / 1.5;
			this.v = Math.random() > 0.5 ? "1" : "0";
			this.o = Math.random() * 0.05;
		}
		update() {
			if (Math.random() < 0.005) this.relocate();
			if (Math.random() < 0.01) this.v = this.v === "1" ? "0" : "1";
		}
		draw() {
			ctx.fillStyle = `rgba(255,255,255,${this.o})`;
			ctx.font = "10px monospace";
			ctx.fillText(this.v, this.x, this.y);
		}
	}

	function init() {
		resize();
		runners = [];
		bits = [];
		const rc = innerWidth < 700 ? 22 : 40;
		for (let i = 0; i < rc; i++) runners.push(new Runner());
		for (let i = 0; i < 80; i++) bits.push(new Bit());
	}

	function frame() {
		ctx.fillStyle = "rgba(5,5,5,.15)";
		ctx.fillRect(0, 0, VW(), VH());
		ctx.strokeStyle = "rgba(255,255,255,.015)";
		ctx.lineWidth = 1;
		ctx.beginPath();
		for (let x = 0; x <= VW(); x += grid) {
			ctx.moveTo(x, 0);
			ctx.lineTo(x, VH());
		}
		for (let y = 0; y <= VH(); y += grid) {
			ctx.moveTo(0, y);
			ctx.lineTo(VW(), y);
		}
		ctx.stroke();
		if (mouse.x > 0) {
			const mx = Math.floor(mouse.x / grid) * grid,
				my = Math.floor(mouse.y / grid) * grid;
			ctx.shadowBlur = 15;
			ctx.shadowColor = "rgba(247,226,192,.2)";
			ctx.strokeStyle = "rgba(247,226,192,.22)";
			ctx.strokeRect(mx, my, grid, grid);
			ctx.shadowBlur = 0;
		}
		bits.forEach((b) => {
			b.update();
			b.draw();
		});
		runners.forEach((r) => {
			r.update();
			r.draw();
		});
		requestAnimationFrame(frame);
	}

	function still() {
		resize();
		ctx.fillStyle = "#050505";
		ctx.fillRect(0, 0, VW(), VH());
		ctx.strokeStyle = "rgba(255,255,255,.02)";
		ctx.lineWidth = 1;
		ctx.beginPath();
		for (let x = 0; x <= VW(); x += grid) {
			ctx.moveTo(x, 0);
			ctx.lineTo(x, VH());
		}
		for (let y = 0; y <= VH(); y += grid) {
			ctx.moveTo(0, y);
			ctx.lineTo(VW(), y);
		}
		ctx.stroke();
		// a few static accent sparks for visual interest at rest
		for (let i = 0; i < 14; i++) {
			const x = Math.floor(Math.random() * (VW() / grid)) * grid,
				y = Math.floor(Math.random() * (VH() / grid)) * grid;
			ctx.fillStyle = COLORS[i % COLORS.length];
			ctx.fillRect(x - 1.5, y - 1.5, 3, 3);
		}
	}

	addEventListener("mousemove", (e) => {
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	});
	addEventListener("resize", () => {
		reduced ? still() : init();
	});
	if (reduced) {
		still();
	} else {
		init();
		frame();
	}
})();

/* ===== REVEAL + BARS ===== */
(() => {
	const io = new IntersectionObserver(
		(es) => {
			es.forEach((e) => {
				if (e.isIntersecting) {
					e.target.classList.add("in");
					io.unobserve(e.target);
				}
			});
		},
		{ threshold: 0.12 },
	);
	document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

	const barIO = new IntersectionObserver(
		(es) => {
			es.forEach((e) => {
				if (e.isIntersecting) {
					e.target.querySelectorAll(".bar-fill").forEach((b) => {
						b.style.width = b.dataset.w;
					});
					barIO.unobserve(e.target);
				}
			});
		},
		{ threshold: 0.4 },
	);
	const mob = document.querySelector(".card-mob");
	if (mob) barIO.observe(mob);
})();

/* ===== SCROLL-SPY ===== */
(() => {
	const links = [...document.querySelectorAll(".nav-links .lnk")];
	const map = links
		.map((l) => ({ l, sec: document.querySelector(l.getAttribute("href")) }))
		.filter((o) => o.sec);
	const spy = new IntersectionObserver(
		(es) => {
			es.forEach((e) => {
				if (e.isIntersecting) {
					links.forEach((l) => l.classList.remove("active"));
					const m = map.find((o) => o.sec === e.target);
					if (m) m.l.classList.add("active");
				}
			});
		},
		{ rootMargin: "-45% 0px -50% 0px" },
	);
	map.forEach((o) => spy.observe(o.sec));
})();

/* ===== MOBILE MENU ===== */
(() => {
	const btn = document.getElementById("hamb"),
		menu = document.getElementById("mobileMenu");
	if (!btn || !menu) return;
	btn.addEventListener("click", () => {
		menu.style.display = menu.style.display === "block" ? "none" : "block";
	});
	menu.querySelectorAll("a").forEach((a) =>
		a.addEventListener("click", () => {
			menu.style.display = "none";
		}),
	);
})();

/* ===== TERMINAL TYPEWRITER ===== */
(() => {
	const term = document.getElementById("term");
	if (!term) return;
	const lines = [
		[
			{ t: "import ", c: "t-kw" },
			{ t: "Experience ", c: "t-pl" },
			{ t: "from ", c: "t-kw" },
			{ t: "'life'", c: "t-str" },
			{ t: ";", c: "t-pl" },
		],
		[
			{ t: "const ", c: "t-kw" },
			{ t: "skills ", c: "t-id" },
			{ t: "= [", c: "t-pl" },
		],
		[
			{ t: "  'React'", c: "t-str" },
			{ t: ", ", c: "t-pl" },
			{ t: "'Next.js'", c: "t-str" },
			{ t: ",", c: "t-pl" },
		],
		[
			{ t: "  'TypeScript'", c: "t-str" },
			{ t: ", ", c: "t-pl" },
			{ t: "'Rust'", c: "t-str" },
			{ t: ",", c: "t-pl" },
		],
		[
			{ t: "  'AWS'", c: "t-str" },
			{ t: ", ", c: "t-pl" },
			{ t: "'Node.js'", c: "t-str" },
		],
		[{ t: "];", c: "t-pl" }],
		[{ t: "", c: "" }],
		[{ t: "// keep shipping quiet, capable things", c: "t-com" }],
	];
	const cur = document.createElement("span");
	cur.className = "cur";
	let li = 0;
	function run() {
		if (reduced) {
			lines.forEach((ln) => {
				const d = document.createElement("div");
				d.className = "line";
				ln.forEach((tk) => {
					const s = document.createElement("span");
					s.className = tk.c;
					s.textContent = tk.t;
					d.appendChild(s);
				});
				term.appendChild(d);
			});
			term.appendChild(cur);
			return;
		}
		term.innerHTML = "";
		term.appendChild(cur);
		setTimeout(nextLine, 350);
	}
	function nextLine() {
		if (li >= lines.length) return;
		const data = lines[li];
		const div = document.createElement("div");
		div.className = "line";
		term.insertBefore(div, cur);
		let ti = 0;
		(function nextTok() {
			if (ti >= data.length) {
				li++;
				setTimeout(nextLine, 90);
				return;
			}
			const tk = data[ti];
			const sp = document.createElement("span");
			sp.className = tk.c;
			div.appendChild(sp);
			let ci = 0;
			(function typeCh() {
				if (ci >= tk.t.length) {
					ti++;
					nextTok();
					return;
				}
				sp.textContent += tk.t[ci++];
				setTimeout(typeCh, Math.random() * 22 + 6);
			})();
		})();
	}
	const io = new IntersectionObserver(
		(es) => {
			es.forEach((e) => {
				if (e.isIntersecting) {
					run();
					io.disconnect();
				}
			});
		},
		{ threshold: 0.4 },
	);
	io.observe(term);
})();
