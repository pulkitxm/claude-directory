(() => {
	/* ---- Scroll reveal ---- */
	var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	var reveals = document.querySelectorAll(".reveal");

	if (reduced || !("IntersectionObserver" in window)) {
		reveals.forEach((el) => {
			el.classList.add("visible");
		});
	} else {
		var io = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("visible");
						io.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1 },
		);
		reveals.forEach((el) => {
			io.observe(el);
		});
	}

	/* ---- Mobile menu ---- */
	var menu = document.getElementById("mobileMenu");
	var openBtn = document.getElementById("menuOpen");
	var closeBtn = document.getElementById("menuClose");
	var links = document.querySelectorAll(".mm-link");

	function openMenu() {
		menu.classList.add("open");
		menu.setAttribute("aria-hidden", "false");
		openBtn.setAttribute("aria-expanded", "true");
		document.body.classList.add("no-scroll");
	}
	function closeMenu() {
		menu.classList.remove("open");
		menu.setAttribute("aria-hidden", "true");
		openBtn.setAttribute("aria-expanded", "false");
		document.body.classList.remove("no-scroll");
	}

	if (openBtn) openBtn.addEventListener("click", openMenu);
	if (closeBtn) closeBtn.addEventListener("click", closeMenu);
	links.forEach((l) => {
		l.addEventListener("click", closeMenu);
	});
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && menu.classList.contains("open")) closeMenu();
	});

	/* ---- Subscribe form (no backend) ---- */
	var form = document.getElementById("subscribeForm");
	var note = document.getElementById("subNote");
	if (form) {
		form.addEventListener("submit", (e) => {
			e.preventDefault();
			var input = form.querySelector("input");
			if (input?.value && input.checkValidity()) {
				note.hidden = false;
				form.reset();
			} else {
				input.focus();
			}
		});
	}
})();
