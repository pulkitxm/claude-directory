/* NOCTURNE BENTO — main.js */
(() => {
	const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	const touch = window.matchMedia("(pointer: coarse)").matches;

	/* ---------- Mobile menu ---------- */
	const burger = document.getElementById("burger");
	const menu = document.getElementById("mobile-menu");
	const burgerPath = document.getElementById("burger-path");
	const OPEN_D = "M6 18L18 6M6 6l12 12";
	const CLOSED_D = "M3.75 9h16.5m-16.5 6.75h16.5";
	let open = false;

	function setMenu(state) {
		open = state;
		menu.classList.toggle("open", open);
		burger.setAttribute("aria-expanded", String(open));
		burgerPath.setAttribute("d", open ? OPEN_D : CLOSED_D);
		document.body.style.overflow = open ? "hidden" : "";
	}
	burger.addEventListener("click", () => setMenu(!open));
	menu
		.querySelectorAll("[data-close]")
		.forEach((a) => a.addEventListener("click", () => setMenu(false)));
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && open) setMenu(false);
	});

	/* ---------- Scroll reveal ---------- */
	const reveals = document.querySelectorAll("[data-reveal]");
	if (reduce || !("IntersectionObserver" in window)) {
		reveals.forEach((el) => el.classList.add("in"));
	} else {
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("in");
						io.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
		);
		reveals.forEach((el) => io.observe(el));
	}

	/* ---------- Hero entrance stagger ---------- */
	const heroPanels = document.querySelectorAll(".bento [data-reveal]");
	heroPanels.forEach((el, i) => {
		el.style.transitionDelay = reduce ? "0ms" : `${i * 90 + 90}ms`;
	});

	/* ---------- Pointer parallax ---------- */
	if (!reduce && !touch) {
		const targets = Array.from(document.querySelectorAll("[data-parallax]"));
		const orb = document.getElementById("orb");
		let raf = null;
		let tx = 0,
			ty = 0;

		function onMove(e) {
			const cx = (e.clientX / window.innerWidth - 0.5) * 2;
			const cy = (e.clientY / window.innerHeight - 0.5) * 2;
			tx = cx;
			ty = cy;
			if (!raf) raf = requestAnimationFrame(apply);
		}
		function apply() {
			raf = null;
			targets.forEach((el) => {
				const d = parseFloat(el.getAttribute("data-parallax")) || 4;
				el.style.transform = `translate3d(${(-tx * d).toFixed(2)}px, ${(-ty * d).toFixed(2)}px, 0)`;
			});
			if (orb)
				orb.style.transform = `translate3d(${(tx * 22).toFixed(2)}px, ${(ty * 22).toFixed(2)}px, 0)`;
		}
		window.addEventListener("mousemove", onMove, { passive: true });
	}

	/* ---------- Contact form ---------- */
	const form = document.getElementById("contact-form");
	const success = document.getElementById("form-success");
	const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	function validate() {
		let ok = true;
		const checks = [
			["f-name", () => form.name.value.trim().length > 0],
			["f-email", () => emailRe.test(form.email.value.trim())],
			["f-msg", () => form.message.value.trim().length > 0],
		];
		checks.forEach(([id, fn]) => {
			const field = document.getElementById(id);
			const valid = fn();
			field.classList.toggle("invalid", !valid);
			if (!valid) ok = false;
		});
		return ok;
	}

	form.addEventListener("submit", (e) => {
		e.preventDefault();
		if (!validate()) return;
		form.style.display = "none";
		success.classList.add("show");
	});

	// Clear error state as the user fixes a field
	["name", "email", "message"].forEach((id) => {
		const input = document.getElementById(id);
		input.addEventListener("input", () => {
			const field = input.closest(".field");
			if (field.classList.contains("invalid")) validate();
		});
	});
})();
