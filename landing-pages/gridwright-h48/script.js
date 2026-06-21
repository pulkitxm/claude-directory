(() => {
	const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	/* ---- Scroll reveals ---- */
	const reveals = document.querySelectorAll(".reveal");
	if (reduce) {
		reveals.forEach((el) => el.classList.add("in"));
	} else {
		const io = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						e.target.classList.add("in");
						obs.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.05 },
		);
		reveals.forEach((el) => io.observe(el));
	}

	/* ---- Status bar blink cells ---- */
	const layer = document.getElementById("blink-layer");
	if (layer && !reduce) {
		const cell = 10,
			count = 50;
		const cols = Math.ceil(window.innerWidth / cell),
			rows = Math.ceil(32 / cell);
		const frag = document.createDocumentFragment();
		for (let i = 0; i < count; i++) {
			const d = document.createElement("div");
			d.className = "blink-cell";
			d.style.left = `${Math.floor(Math.random() * cols) * cell + 1}px`;
			d.style.top = `${Math.floor(Math.random() * rows) * cell + 1}px`;
			d.style.animationDelay = `${Math.random() * 2}s`;
			d.style.animationDuration = `${0.5 + Math.random() * 2}s`;
			frag.appendChild(d);
		}
		layer.appendChild(frag);
	}

	/* ---- Hero terminal typewriter ---- */
	const term = document.getElementById("terminal");
	const lines = [
		"> initializing core_modules...",
		"> loading grid_system (v2.0.1)",
		"> optimizing assets...",
		"",
		"const layout = new StructuralGrid({",
		"  padding: '4rem',",
		"  asymmetry: true,",
		"  mode: 'blueprint'",
		"});",
		"",
		"> process complete.",
	];
	function setLine(p, text) {
		p.innerHTML = text ? text.replace(/ /g, "&nbsp;") : "&nbsp;";
	}
	function buildTerminal() {
		term.innerHTML = "";
		lines.forEach((ln) => {
			const p = document.createElement("p");
			setLine(p, ln);
			term.appendChild(p);
		});
		const cur = document.createElement("p");
		cur.innerHTML = '<span class="cur">&nbsp;</span>';
		term.appendChild(cur);
	}
	function typeTerminal() {
		term.innerHTML = "";
		const cur = document.createElement("p");
		cur.innerHTML = '<span class="cur">&nbsp;</span>';
		term.appendChild(cur);
		let li = 0;
		function nextLine() {
			if (li >= lines.length) return;
			const p = document.createElement("p");
			term.insertBefore(p, cur);
			const text = lines[li];
			if (text === "") {
				setLine(p, "");
				li++;
				setTimeout(nextLine, 80);
				return;
			}
			let ci = 0;
			(function typeChar() {
				setLine(p, text.slice(0, ci));
				ci++;
				if (ci <= text.length) setTimeout(typeChar, 14);
				else {
					li++;
					setTimeout(nextLine, 90);
				}
			})();
		}
		nextLine();
	}
	if (term) {
		reduce ? buildTerminal() : typeTerminal();
	}

	/* ---- Stats count-up ---- */
	const nums = document.querySelectorAll(".stat__num");
	function animateCount(el) {
		const suffix = el.dataset.suffix || "";
		const target = parseFloat(el.dataset.count);
		const decimals = (el.dataset.count.split(".")[1] || "").length;
		if (reduce) {
			el.textContent = el.dataset.count + suffix;
			return;
		}
		const dur = 1300,
			start = performance.now();
		function step(now) {
			const t = Math.min((now - start) / dur, 1);
			const eased = 1 - (1 - t) ** 3;
			el.textContent = (target * eased).toFixed(decimals) + suffix;
			if (t < 1) requestAnimationFrame(step);
			else el.textContent = el.dataset.count + suffix;
		}
		requestAnimationFrame(step);
	}
	if (nums.length) {
		const cio = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						animateCount(e.target);
						obs.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.6 },
		);
		nums.forEach((n) => cio.observe(n));
	}

	/* ---- Envelope reveal ---- */
	const envelope = document.getElementById("envelope");
	if (envelope) {
		if (reduce) {
			envelope.querySelector(".postcard").style.opacity = "1";
		} else {
			const eio = new IntersectionObserver(
				(entries, obs) => {
					entries.forEach((e) => {
						if (e.isIntersecting) {
							envelope.classList.add("open");
							obs.unobserve(e.target);
						}
					});
				},
				{ threshold: 0.4 },
			);
			eio.observe(envelope);
		}
	}

	/* ---- Waitlist form ---- */
	const form = document.getElementById("waitForm");
	if (form) {
		form.addEventListener("submit", (ev) => {
			ev.preventDefault();
			const email = form.querySelector("#node");
			if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)) {
				email.focus();
				email.style.borderColor = "#b00";
				return;
			}
			const btn = form.querySelector("button");
			btn.textContent = "Dispatched";
			btn.style.background = "var(--green-deep)";
			if (envelope && !reduce) {
				envelope.classList.remove("open");
				void envelope.offsetWidth;
				envelope.classList.add("open");
			}
		});
	}

	/* ---- Mobile menu (compact: jump to waitlist) ---- */
	const toggle = document.getElementById("menuToggle");
	if (toggle) {
		toggle.addEventListener("click", () => {
			document
				.getElementById("waitlist")
				.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
		});
	}
})();
