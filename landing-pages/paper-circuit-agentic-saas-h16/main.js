document.addEventListener("DOMContentLoaded", () => {
	const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	/* ---- mobile menu ---- */
	const menu = document.getElementById("mobileMenu");
	const open = () => {
		menu.classList.add("open");
		document.body.style.overflow = "hidden";
	};
	const close = () => {
		menu.classList.remove("open");
		document.body.style.overflow = "";
	};
	document.getElementById("burger").addEventListener("click", open);
	document.getElementById("closeMenu").addEventListener("click", close);
	menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));

	/* ---- button ripple ---- */
	document.querySelectorAll(".fb").forEach((btn) => {
		btn.addEventListener("click", (e) => {
			const r = btn.getBoundingClientRect();
			const d = Math.max(r.width, r.height);
			const s = document.createElement("span");
			s.className = "ripple";
			s.style.width = s.style.height = `${d}px`;
			s.style.left = `${e.clientX - r.left - d / 2}px`;
			s.style.top = `${e.clientY - r.top - d / 2}px`;
			const old = btn.querySelector(".ripple");
			if (old) old.remove();
			btn.appendChild(s);
		});
	});

	/* ---- icon belt seamless loop ---- */
	const belt = document.getElementById("iconBelt");
	if (belt && !reduce) {
		const originals = [...belt.children];
		const total = originals.length;
		originals.slice(0, 5).forEach((c) => belt.appendChild(c.cloneNode(true)));
		const step = 44; // 36 chip + 8 gap
		let i = 0;
		setInterval(() => {
			i++;
			belt.style.transition = "transform 900ms cubic-bezier(.5,0,.2,1)";
			belt.style.transform = `translateX(-${i * step}px)`;
			if (i >= total) {
				setTimeout(() => {
					belt.style.transition = "none";
					i = 0;
					belt.style.transform = "translateX(0)";
				}, 920);
			}
		}, 3000);
	}

	/* ---- scroll reveal ---- */
	const io = new IntersectionObserver(
		(entries) => {
			entries.forEach((en) => {
				if (en.isIntersecting) {
					en.target.classList.add("in");
					io.unobserve(en.target);
				}
			});
		},
		{ threshold: 0.12 },
	);
	document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

	/* ---- hero mockup parallax ---- */
	const mock = document.getElementById("mock");
	if (mock && !reduce) {
		let raf = null,
			tx = 0,
			ty = 0;
		window.addEventListener("mousemove", (e) => {
			tx = (e.clientX / window.innerWidth - 0.5) * 12;
			ty = (e.clientY / window.innerHeight - 0.5) * 12;
			if (!raf)
				raf = requestAnimationFrame(() => {
					const cx = Math.max(-6, Math.min(6, tx));
					const cy = Math.max(-6, Math.min(6, ty));
					mock.style.transform = `rotateY(${cx}deg) rotateX(${-cy}deg)`;
					raf = null;
				});
		});
	}

	/* ---- AI node click recalibrate ---- */
	const aiNode = document.getElementById("aiNode");
	const aiBar = document.getElementById("aiBar");
	if (aiNode && aiBar) {
		aiNode.addEventListener("click", () => {
			aiBar.style.width = "0%";
			setTimeout(() => {
				aiBar.style.width = `${60 + Math.floor(Math.random() * 40)}%`;
			}, 120);
		});
	}

	/* ---- code terminal re-reveal on hover ---- */
	const term = document.getElementById("term");
	if (term) {
		const lines = term.querySelectorAll(".cl");
		term.addEventListener("mouseenter", () => {
			if (reduce) return;
			lines.forEach((l, k) => {
				l.style.opacity = "0";
				l.style.transform = "translateX(-10px)";
				setTimeout(() => {
					l.style.opacity = "1";
					l.style.transform = "translateX(0)";
				}, k * 90);
			});
		});
	}

	/* ---- live counter ---- */
	const counter = document.getElementById("counter");
	if (counter && !reduce) {
		const last = counter.lastElementChild;
		setInterval(() => {
			last.style.transform = "translateY(-10px)";
			last.style.opacity = "0";
			setTimeout(() => {
				last.textContent = Math.floor(Math.random() * 10);
				last.style.transform = "translateY(0)";
				last.style.opacity = "1";
			}, 150);
		}, 2600);
	}

	/* ---- footer wordmark spotlight ---- */
	const wm = document.getElementById("wm");
	if (wm) {
		wm.innerHTML = wm.textContent
			.split("")
			.map((c) => `<span>${c}</span>`)
			.join("");
		const chars = wm.querySelectorAll("span");
		wm.addEventListener("mousemove", (e) => {
			chars.forEach((ch) => {
				const r = ch.getBoundingClientRect();
				const dist = Math.hypot(
					e.clientX - (r.left + r.width / 2),
					e.clientY - (r.top + r.height / 2),
				);
				if (dist < 120) {
					const t = 1 - dist / 120;
					ch.style.color = "#EC4899";
					ch.style.opacity = (0.1 + t * 0.9).toFixed(2);
					ch.style.transform = `scale(${1 + t * 0.12})`;
				} else {
					ch.style.color = "";
					ch.style.opacity = "0.1";
					ch.style.transform = "scale(1)";
				}
			});
		});
		wm.addEventListener("mouseleave", () =>
			chars.forEach((ch) => {
				ch.style.color = "";
				ch.style.opacity = "0.1";
				ch.style.transform = "scale(1)";
			}),
		);
	}
});
