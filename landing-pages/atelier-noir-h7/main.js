/* Maison Éclisse — Atelier Noir interactions */
(() => {
	/* ---- Header solid on scroll ---- */
	var head = document.getElementById("head");
	var onScroll = () => {
		if (window.scrollY > 40) head.classList.add("solid");
		else head.classList.remove("solid");
	};
	window.addEventListener("scroll", onScroll, { passive: true });
	onScroll();

	/* ---- Scroll reveal ---- */
	var reveals = document.querySelectorAll(".reveal");
	if ("IntersectionObserver" in window) {
		var io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e, i) => {
					if (e.isIntersecting) {
						var el = e.target;
						// light stagger for items sharing a parent grid
						var delay =
							el.classList.contains("card") || el.classList.contains("article")
								? (i % 3) * 90
								: 0;
						setTimeout(() => {
							el.classList.add("in");
						}, delay);
						io.unobserve(el);
					}
				});
			},
			{ threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
		);
		reveals.forEach((el) => {
			io.observe(el);
		});
	} else {
		reveals.forEach((el) => {
			el.classList.add("in");
		});
	}

	/* ---- Overlays (menu + search) ---- */
	var body = document.body;
	var menu = document.getElementById("menu");
	var search = document.getElementById("search");
	var lastFocus = null;

	function openOverlay(el, focusEl) {
		lastFocus = document.activeElement;
		el.classList.add("open");
		body.classList.add("locked");
		if (focusEl)
			setTimeout(() => {
				focusEl.focus();
			}, 60);
	}
	function closeOverlay(el) {
		el.classList.remove("open");
		if (
			!menu.classList.contains("open") &&
			!search.classList.contains("open")
		) {
			body.classList.remove("locked");
		}
		if (lastFocus) lastFocus.focus();
	}

	document.getElementById("menuOpen").addEventListener("click", () => {
		openOverlay(menu);
	});
	document.getElementById("menuClose").addEventListener("click", () => {
		closeOverlay(menu);
	});
	document.getElementById("searchOpen").addEventListener("click", () => {
		openOverlay(search, document.getElementById("searchField"));
	});
	document.getElementById("searchClose").addEventListener("click", () => {
		closeOverlay(search);
	});

	// close menu when a link is chosen
	document.querySelectorAll('[data-close="menu"]').forEach((a) => {
		a.addEventListener("click", () => {
			closeOverlay(menu);
		});
	});

	// Esc closes whichever is open
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") {
			if (menu.classList.contains("open")) closeOverlay(menu);
			if (search.classList.contains("open")) closeOverlay(search);
		}
	});

	/* ---- Newsletter (no backend) ---- */
	var form = document.getElementById("newsForm");
	var done = document.getElementById("newsDone");
	form.addEventListener("submit", (e) => {
		e.preventDefault();
		var input = document.getElementById("email");
		if (!input.value || input.value.indexOf("@") === -1) {
			input.focus();
			return;
		}
		done.classList.add("show");
		form.reset();
		setTimeout(() => {
			done.classList.remove("show");
		}, 4000);
	});
})();
