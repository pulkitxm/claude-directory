(() => {
	document.addEventListener("DOMContentLoaded", () => {
		/* ---------- Navbar scroll state ---------- */
		const nav = document.getElementById("nav");
		const onScroll = () => {
			if (window.scrollY > 50) nav.classList.add("scrolled");
			else nav.classList.remove("scrolled");
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();

		/* ---------- Mobile menu ---------- */
		const burger = document.getElementById("burger");
		const panel = document.getElementById("mobilePanel");
		burger.addEventListener("click", () => {
			const open = panel.classList.toggle("open");
			burger.setAttribute("aria-expanded", open ? "true" : "false");
		});
		panel
			.querySelectorAll("a")
			.forEach((a) =>
				a.addEventListener("click", () => panel.classList.remove("open")),
			);

		/* ---------- Scroll reveal ---------- */
		const reduce = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		const reveals = document.querySelectorAll(".reveal");
		if (reduce) {
			reveals.forEach((el) => el.classList.add("in"));
		} else {
			const io = new IntersectionObserver(
				(entries) => {
					entries.forEach((e) => {
						if (e.isIntersecting) {
							const delay = parseInt(e.target.dataset.delay || "0", 10);
							setTimeout(() => e.target.classList.add("in"), delay);
							io.unobserve(e.target);
						}
					});
				},
				{ threshold: 0.12 },
			);
			reveals.forEach((el) => io.observe(el));
		}

		/* ---------- Gallery carousel ---------- */
		const track = document.getElementById("galTrack");
		const prev = document.getElementById("galPrev");
		const next = document.getElementById("galNext");
		if (track && prev && next) {
			const step = () => {
				const item = track.querySelector(".gal-item");
				return item ? item.offsetWidth + 18 : 320;
			};
			prev.addEventListener("click", () =>
				track.scrollBy({ left: -step(), behavior: "smooth" }),
			);
			next.addEventListener("click", () =>
				track.scrollBy({ left: step(), behavior: "smooth" }),
			);
		}

		/* ---------- Pricing toggle ---------- */
		const toggle = document.getElementById("toggle");
		const btnM = document.getElementById("billMonthly");
		const btnY = document.getElementById("billYearly");
		const vals = document.querySelectorAll(".price-card .val");
		const pers = document.querySelectorAll(".price-card .per");
		const saves = document.querySelectorAll(".price-card .save");

		const setBilling = (cycle) => {
			const yearly = cycle === "yearly";
			toggle.classList.toggle("yearly", yearly);
			btnY.classList.toggle("active", yearly);
			btnM.classList.toggle("active", !yearly);
			btnY.setAttribute("aria-pressed", yearly);
			btnM.setAttribute("aria-pressed", !yearly);
			vals.forEach((v) => {
				v.textContent = `$${yearly ? v.dataset.yearly : v.dataset.monthly}`;
			});
			pers.forEach((p) => (p.textContent = yearly ? "/yr" : "/mo"));
			saves.forEach(
				(s) => (s.textContent = yearly ? "Save 15% billed annually" : ""),
			);
		};
		btnM.addEventListener("click", () => setBilling("monthly"));
		btnY.addEventListener("click", () => setBilling("yearly"));
		setBilling("monthly");

		/* ---------- Hero pointer parallax ---------- */
		const heroImg = document.getElementById("heroImg");
		if (heroImg && !reduce && window.matchMedia("(pointer:fine)").matches) {
			const hero = document.getElementById("hero");
			hero.addEventListener("mousemove", (e) => {
				const r = hero.getBoundingClientRect();
				const x = (e.clientX - r.left) / r.width - 0.5;
				const y = (e.clientY - r.top) / r.height - 0.5;
				heroImg.style.translate = `${x * -16}px ${y * -16}px`;
			});
			hero.addEventListener("mouseleave", () => {
				heroImg.style.translate = "0 0";
			});
		}

		/* ---------- Year ---------- */
		const y = document.getElementById("year");
		if (y) y.textContent = new Date().getFullYear();
	});
})();
