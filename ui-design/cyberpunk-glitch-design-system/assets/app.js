/* =====================================================================
   NEUROCITRINE // NETRUNNER OS — interaction layer
   Vanilla JS. No deps. Respects prefers-reduced-motion.
   ===================================================================== */
(function () {
	"use strict";

	const reduceMotion = window.matchMedia(
		"(prefers-reduced-motion: reduce)",
	).matches;
	const $ = (s, r = document) => r.querySelector(s);
	const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

	/* ----------------------------------------------------------------
     1. Mobile drawer
  ---------------------------------------------------------------- */
	const drawer = $("#drawer");
	const openBtn = $("#navToggle");
	const closeBtn = $("#drawerClose");
	function setDrawer(open) {
		if (!drawer) return;
		drawer.classList.toggle("open", open);
		drawer.setAttribute("aria-hidden", String(!open));
		if (openBtn) openBtn.setAttribute("aria-expanded", String(open));
		document.body.style.overflow = open ? "hidden" : "";
	}
	openBtn && openBtn.addEventListener("click", () => setDrawer(true));
	closeBtn && closeBtn.addEventListener("click", () => setDrawer(false));
	drawer &&
		$$("a", drawer).forEach((a) =>
			a.addEventListener("click", () => setDrawer(false)),
		);
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") setDrawer(false);
	});

	/* ----------------------------------------------------------------
     2. Typewriter subtitle (cycles through phrases)
  ---------------------------------------------------------------- */
	const typeEl = $("#typed");
	if (typeEl) {
		const phrases = [
			"breach corporate ICE before it sees you coming.",
			"decrypt the black market data-vault in 4ms.",
			"route your ghost through 12 proxy relays.",
			"compile the daemon. burn the trace. vanish.",
		];
		if (reduceMotion) {
			typeEl.textContent = phrases[0];
		} else {
			let pi = 0,
				ci = 0,
				deleting = false;
			const tick = () => {
				const word = phrases[pi];
				ci += deleting ? -1 : 1;
				typeEl.textContent = word.slice(0, ci);
				let delay = deleting ? 28 : 46;
				if (!deleting && ci === word.length) {
					deleting = false;
					delay = 2000;
					setTimeout(() => {
						deleting = true;
						tick();
					}, delay);
					return;
				}
				if (deleting && ci === 0) {
					deleting = false;
					pi = (pi + 1) % phrases.length;
					delay = 320;
				}
				setTimeout(tick, delay);
			};
			tick();
		}
	}

	/* ----------------------------------------------------------------
     3. Live terminal console — boot sequence
  ---------------------------------------------------------------- */
	const consoleBody = $("#consoleLog");
	if (consoleBody) {
		const seq = [
			{ t: "prompt", c: "init --target=arasaka.mainframe --stealth" },
			{ t: "out", c: "[ * ] establishing encrypted tunnel ......" },
			{ t: "ok", c: "[ OK ] tunnel up // aes-512 // latency 3.1ms" },
			{ t: "out", c: "[ * ] spoofing MAC // rotating ghost identity" },
			{ t: "hl", c: "[ >> ] identity = 0xA3F1-N3UR0-C1TR1N3" },
			{ t: "prompt", c: "deploy daemon --payload=icebreaker.v9" },
			{ t: "out", c: "[ * ] injecting payload into firewall node 7" },
			{ t: "warn", c: "[ !! ] black ICE detected // countermeasure online" },
			{ t: "out", c: "[ * ] deflecting trace // burning relays 4..11" },
			{ t: "ok", c: "[ OK ] ICE shattered // perimeter breached" },
			{ t: "mg", c: "[ ++ ] vault access GRANTED // 14.2 PB exposed" },
			{ t: "prompt", c: "exfil --silent --shred-logs" },
			{ t: "ok", c: "[ OK ] data routed to dead-drop // 0 trace left" },
			{ t: "out", c: "[ * ] connection terminated. you were never here." },
		];
		const makeLine = (item) => {
			const div = document.createElement("div");
			div.className = "ln";
			const span = document.createElement("span");
			span.className = item.t === "prompt" ? "prompt" : item.t;
			span.textContent = item.c;
			div.appendChild(span);
			return { div, span, item };
		};

		if (reduceMotion) {
			seq.forEach((item) => consoleBody.appendChild(makeLine(item).div));
			const last = document.createElement("span");
			last.className = "cursor";
			consoleBody.appendChild(last);
		} else {
			let started = false;
			const runConsole = () => {
				if (started) return;
				started = true;
				let i = 0;
				const cursor = document.createElement("span");
				cursor.className = "cursor";
				const typeLine = () => {
					if (i >= seq.length) {
						// loop: clear after a beat and restart
						setTimeout(() => {
							consoleBody.innerHTML = "";
							i = 0;
							typeLine();
						}, 4200);
						return;
					}
					const { div, span, item } = makeLine(seq[i]);
					span.textContent = "";
					div.appendChild(cursor);
					consoleBody.appendChild(div);
					consoleBody.scrollTop = consoleBody.scrollHeight;
					const full = item.c;
					let ci = 0;
					const speed = item.t === "prompt" ? 26 : 12;
					const typeChar = () => {
						span.textContent = full.slice(0, ci++);
						if (ci <= full.length) {
							setTimeout(typeChar, speed);
						} else {
							i++;
							setTimeout(typeLine, item.t === "prompt" ? 360 : 200);
						}
					};
					typeChar();
				};
				typeLine();
			};
			// start only when scrolled into view
			const io = new IntersectionObserver(
				(entries) => {
					entries.forEach((e) => {
						if (e.isIntersecting) {
							runConsole();
							io.disconnect();
						}
					});
				},
				{ threshold: 0.25 },
			);
			io.observe(consoleBody);
		}
	}

	/* ----------------------------------------------------------------
     4. Scroll reveals
  ---------------------------------------------------------------- */
	const reveals = $$(".reveal");
	if (reveals.length) {
		if (reduceMotion) {
			reveals.forEach((el) => el.classList.add("in"));
		} else {
			const io = new IntersectionObserver(
				(entries) => {
					entries.forEach((e) => {
						if (e.isIntersecting) {
							const delay = Number(e.target.dataset.delay || 0);
							setTimeout(() => e.target.classList.add("in"), delay);
							io.unobserve(e.target);
						}
					});
				},
				{ threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
			);
			reveals.forEach((el) => io.observe(el));
		}
	}

	/* ----------------------------------------------------------------
     5. Stat count-up
  ---------------------------------------------------------------- */
	const stats = $$("[data-count]");
	const runCount = (el) => {
		const target = parseFloat(el.dataset.count);
		const decimals = (el.dataset.count.split(".")[1] || "").length;
		const dur = 1400;
		const start = performance.now();
		const step = (now) => {
			const p = Math.min((now - start) / dur, 1);
			const eased = 1 - Math.pow(1 - p, 3);
			const val = target * eased;
			el.firstChild.textContent = val.toFixed(decimals);
			if (p < 1) requestAnimationFrame(step);
			else el.firstChild.textContent = target.toFixed(decimals);
		};
		requestAnimationFrame(step);
	};
	if (stats.length) {
		if (reduceMotion) {
			stats.forEach((el) => {
				el.firstChild.textContent = parseFloat(el.dataset.count).toFixed(
					(el.dataset.count.split(".")[1] || "").length,
				);
			});
		} else {
			const io = new IntersectionObserver(
				(entries) => {
					entries.forEach((e) => {
						if (e.isIntersecting) {
							runCount(e.target);
							io.unobserve(e.target);
						}
					});
				},
				{ threshold: 0.5 },
			);
			stats.forEach((el) => io.observe(el));
		}
	}

	/* ----------------------------------------------------------------
     6. HUD meters + equalizer
  ---------------------------------------------------------------- */
	$$(".meter span").forEach((el) => {
		const v = el.dataset.v || "60";
		requestAnimationFrame(() => {
			el.style.width = v + "%";
		});
	});
	$$(".hud__wave i").forEach((bar, idx) => {
		if (!reduceMotion) {
			bar.style.animationDelay = idx * 0.07 + "s";
			bar.style.animationDuration = 0.85 + (idx % 4) * 0.12 + "s";
		} else {
			bar.style.height = 30 + ((idx * 13) % 60) + "%";
		}
	});

	/* ----------------------------------------------------------------
     7. FAQ accordion
  ---------------------------------------------------------------- */
	$$(".faq__item").forEach((item) => {
		const q = $(".faq__q", item);
		const a = $(".faq__a", item);
		if (!q || !a) return;
		q.addEventListener("click", () => {
			const isOpen = item.classList.contains("open");
			// close siblings (single-open accordion)
			$$(".faq__item.open").forEach((other) => {
				if (other !== item) {
					other.classList.remove("open");
					$(".faq__q", other).setAttribute("aria-expanded", "false");
					$(".faq__a", other).style.maxHeight = "0px";
				}
			});
			item.classList.toggle("open", !isOpen);
			q.setAttribute("aria-expanded", String(!isOpen));
			a.style.maxHeight = !isOpen ? a.scrollHeight + "px" : "0px";
		});
	});

	/* ----------------------------------------------------------------
     8. Access form (fake submit → terminal confirmation)
  ---------------------------------------------------------------- */
	const form = $("#accessForm");
	if (form) {
		const out = $("#formOut");
		const input = $("#accessInput");
		form.addEventListener("submit", (e) => {
			e.preventDefault();
			const val = (input && input.value.trim()) || "";
			if (!val) {
				if (out) {
					out.style.color = "var(--destructive)";
					out.textContent = "[ ERR ] handle required // access denied";
				}
				return;
			}
			if (out) {
				out.style.color = "var(--accent)";
				const tag = "0x" + Math.random().toString(16).slice(2, 8).toUpperCase();
				out.textContent =
					"[ OK ] " +
					val +
					" queued // node id " +
					tag +
					" // welcome to the sprawl.";
			}
			if (input) input.value = "";
		});
	}

	/* ----------------------------------------------------------------
     9. Footer year + system clock
  ---------------------------------------------------------------- */
	const yr = $("#year");
	if (yr) yr.textContent = String(new Date().getFullYear());
	const clock = $("#sysclock");
	if (clock) {
		const pad = (n) => String(n).padStart(2, "0");
		const tick = () => {
			const d = new Date();
			clock.textContent =
				pad(d.getHours()) +
				":" +
				pad(d.getMinutes()) +
				":" +
				pad(d.getSeconds());
		};
		tick();
		if (!reduceMotion) setInterval(tick, 1000);
	}

	/* ----------------------------------------------------------------
     10. Pointer-reactive glow on holographic HUD (desktop only)
  ---------------------------------------------------------------- */
	const hud = $("#hud");
	if (hud && !reduceMotion && window.matchMedia("(pointer: fine)").matches) {
		hud.addEventListener("pointermove", (e) => {
			const r = hud.getBoundingClientRect();
			const x = ((e.clientX - r.left) / r.width - 0.5) * 6;
			const y = ((e.clientY - r.top) / r.height - 0.5) * 6;
			hud.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${-y}deg)`;
		});
		hud.addEventListener("pointerleave", () => {
			hud.style.transform = "";
		});
	}
})();
