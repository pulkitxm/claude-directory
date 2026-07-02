// Mobile menu toggle
(function () {
	const toggle = document.querySelector(".menu-toggle");
	const menu = document.querySelector(".mobile-menu");
	if (toggle && menu) {
		toggle.addEventListener("click", () => menu.classList.toggle("open"));
		menu
			.querySelectorAll("a")
			.forEach((a) =>
				a.addEventListener("click", () => menu.classList.remove("open")),
			);
	}
})();

// BlurFade entrance via IntersectionObserver (with stagger)
(function () {
	const els = document.querySelectorAll(".blur-fade");
	if (!("IntersectionObserver" in window) || !els.length) {
		els.forEach((e) => e.classList.add("in"));
		return;
	}
	const io = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const delay = parseFloat(entry.target.dataset.delay || "0");
					setTimeout(() => entry.target.classList.add("in"), delay * 1000);
					io.unobserve(entry.target);
				}
			});
		},
		{ rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
	);
	els.forEach((e) => io.observe(e));
	// Failsafe: ensure nothing stays permanently hidden (covers full-page
	// captures, no-scroll viewports and any element the observer misses).
	setTimeout(() => els.forEach((e) => e.classList.add("in")), 2500);
})();

// Tabs (code showcase)
(function () {
	const tabs = document.querySelectorAll(".tab");
	if (!tabs.length) return;
	tabs.forEach((tab) =>
		tab.addEventListener("click", () => {
			tabs.forEach((t) => t.classList.remove("active"));
			tab.classList.add("active");
		}),
	);
})();

// Pricing toggle (Yearly default / Monthly)
(function () {
	const toggle = document.querySelector(".toggle");
	if (!toggle) return;
	const buttons = toggle.querySelectorAll("button");
	const prices = document.querySelectorAll("[data-yearly]");
	function set(period) {
		toggle.classList.toggle("monthly", period === "monthly");
		buttons.forEach((b) =>
			b.classList.toggle("active", b.dataset.period === period),
		);
		prices.forEach((p) => {
			const val = period === "monthly" ? p.dataset.monthly : p.dataset.yearly;
			p.style.opacity = "0";
			setTimeout(() => {
				p.firstChild.textContent = val;
				p.style.opacity = "1";
			}, 150);
		});
		document.querySelectorAll(".per-label").forEach((el) => {
			el.textContent = period === "monthly" ? "/ month" : "/ year";
		});
	}
	buttons.forEach((b) =>
		b.addEventListener("click", () => set(b.dataset.period)),
	);
})();

// Stat count-up when scrolled into view
(function () {
	const stats = document.querySelectorAll("[data-count]");
	if (!stats.length) return;
	function animate(el) {
		const target = parseFloat(el.dataset.count);
		const suffix = el.dataset.suffix || "";
		const dur = 1400;
		const start = performance.now();
		function frame(now) {
			const t = Math.min((now - start) / dur, 1);
			const eased = 1 - Math.pow(1 - t, 3);
			const cur = target * eased;
			const v = t >= 1 ? target : cur;
			let out;
			if (target >= 1000000) out = Math.round(v / 1000000) + "M";
			else if (target >= 1000) out = Math.round(v / 1000) + "K";
			else out = Math.round(v).toString();
			el.firstChild.textContent = out + suffix;
			if (t < 1) requestAnimationFrame(frame);
		}
		requestAnimationFrame(frame);
	}
	const io = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					animate(entry.target);
					io.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.5 },
	);
	stats.forEach((s) => io.observe(s));
	// Failsafe: animate any stat still untouched (full-page captures, no scroll)
	setTimeout(
		() =>
			stats.forEach((s) => {
				io.unobserve(s);
				animate(s);
			}),
		2500,
	);
})();
