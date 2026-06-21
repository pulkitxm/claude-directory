(() => {
	const reduceMotion = window.matchMedia(
		"(prefers-reduced-motion: reduce)",
	).matches;

	document.addEventListener("DOMContentLoaded", () => {
		/* ---- Mobile menu ---- */
		const menuBtn = document.getElementById("menuBtn");
		const mobileMenu = document.getElementById("mobileMenu");
		let open = false;
		const ICON_OPEN =
			'<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5"/></svg>';
		const ICON_CLOSE =
			'<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>';
		const setMenu = (v) => {
			open = v;
			mobileMenu.classList.toggle("open", v);
			document.body.style.overflow = v ? "hidden" : "";
			menuBtn.innerHTML = v ? ICON_CLOSE : ICON_OPEN;
		};
		menuBtn.addEventListener("click", () => setMenu(!open));
		mobileMenu
			.querySelectorAll("a")
			.forEach((a) => a.addEventListener("click", () => setMenu(false)));

		/* ---- Marquee hover colors ---- */
		document.querySelectorAll(".marquee-track span[data-c]").forEach((s) => {
			const c = s.getAttribute("data-c");
			s.addEventListener("mouseenter", () => (s.style.color = c));
			s.addEventListener("mouseleave", () => (s.style.color = ""));
		});

		/* ---- Hero blob parallax ---- */
		const blob = document.getElementById("heroBlob");
		if (blob && !reduceMotion) {
			window.addEventListener("pointermove", (e) => {
				const x = (e.clientX / window.innerWidth - 0.5) * 60;
				const y = (e.clientY / window.innerHeight - 0.5) * 60;
				blob.style.transform = `translate(${x}px, ${y}px)`;
			});
		}

		/* ---- Project filters ---- */
		const filterBtns = document.querySelectorAll(".filter-btn");
		const cards = document.querySelectorAll(".proj-card");
		filterBtns.forEach((btn) =>
			btn.addEventListener("click", () => {
				filterBtns.forEach((b) => b.classList.remove("active"));
				btn.classList.add("active");
				const f = btn.dataset.filter;
				cards.forEach((c) =>
					c.classList.toggle(
						"hide",
						!(f === "all" || c.dataset.category === f),
					),
				);
			}),
		);

		/* ---- Accordions (experience + faq) ---- */
		document.querySelectorAll(".acc-trigger").forEach((t) => {
			t.addEventListener("click", () => {
				const item = t.closest(".acc");
				const content = t.nextElementSibling;
				const isOpen = item.classList.toggle("open");
				content.style.maxHeight = isOpen ? `${content.scrollHeight}px` : null;
				if (isOpen) {
					item
						.querySelectorAll(".bar i")
						.forEach((bar) => (bar.style.width = `${bar.dataset.w}%`));
				}
			});
		});
		document.querySelectorAll(".faq-trigger").forEach((t) => {
			t.addEventListener("click", () => {
				const item = t.closest(".faq-item");
				const content = t.nextElementSibling;
				const isOpen = item.classList.toggle("open");
				content.style.maxHeight = isOpen ? `${content.scrollHeight}px` : null;
			});
		});

		/* ---- Scroll reveal ---- */
		const revObs = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						e.target.classList.add("visible");
						revObs.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.12 },
		);
		document.querySelectorAll(".reveal").forEach((el) => revObs.observe(el));

		/* ---- Count-up counters ---- */
		const countObs = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (!e.isIntersecting) return;
					const el = e.target;
					countObs.unobserve(el);
					const target = +el.dataset.count;
					const suffix = el.dataset.suffix || "";
					if (reduceMotion) {
						el.textContent = target + suffix;
						return;
					}
					const dur = 1400;
					const start = performance.now();
					const step = (now) => {
						const p = Math.min((now - start) / dur, 1);
						const eased = 1 - (1 - p) ** 3;
						el.textContent = Math.round(target * eased) + suffix;
						if (p < 1) requestAnimationFrame(step);
					};
					requestAnimationFrame(step);
				});
			},
			{ threshold: 0.6 },
		);
		document
			.querySelectorAll(".num[data-count]")
			.forEach((el) => countObs.observe(el));

		/* ---- Terminal typewriter ---- */
		const tw = document.getElementById("typewriter");
		if (tw) {
			const lines = [
				{ t: "$ npm install @voltmark/portfolio", c: "t-cmd" },
				{ t: "[+] resolving dependencies ...", c: "t-info" },
				{ t: "[ok] 482 packages installed in 3.1s", c: "t-ok" },
				{ t: "$ voltmark deploy --prod", c: "t-cmd" },
				{ t: "[ok] build passed · 0 vulnerabilities", c: "t-ok" },
				{ t: "> architecting scalable systems ...", c: "t-info" },
			];
			const cursor = document.createElement("span");
			cursor.className = "cursor";

			const run = () => {
				let li = 0;
				const typeLine = () => {
					if (li >= lines.length) {
						tw.appendChild(cursor);
						return;
					}
					const { t, c } = lines[li];
					const span = document.createElement("span");
					span.className = c;
					tw.appendChild(span);
					tw.appendChild(cursor);
					let ci = 0;
					const typeChar = () => {
						if (ci < t.length) {
							span.textContent += t.charAt(ci++);
							tw.appendChild(cursor);
							setTimeout(typeChar, reduceMotion ? 0 : 26 + Math.random() * 24);
						} else {
							tw.appendChild(document.createElement("br"));
							li++;
							setTimeout(typeLine, reduceMotion ? 0 : 240);
						}
					};
					typeChar();
				};
				typeLine();
			};

			const twObs = new IntersectionObserver(
				(entries) => {
					entries.forEach((e) => {
						if (e.isIntersecting) {
							run();
							twObs.disconnect();
						}
					});
				},
				{ threshold: 0.3 },
			);
			twObs.observe(tw);
		}
	});
})();
