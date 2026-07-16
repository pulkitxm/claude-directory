(() => {
	document.documentElement.classList.add("js");
	var head = document.getElementById("head");
	var onScroll = () => {
		if (window.scrollY > 40) head.classList.add("solid");
		else head.classList.remove("solid");
	};
	window.addEventListener("scroll", onScroll, { passive: true });
	onScroll();

	var reveals = document.querySelectorAll(".reveal");
	var revealVisible = () => {
		reveals.forEach((element) => {
			if (
				!element.classList.contains("in") &&
				element.getBoundingClientRect().top <= window.innerHeight + 120
			) {
				element.classList.add("in");
			}
		});
	};
	if ("IntersectionObserver" in window) {
		var io = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("in");
						io.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0, rootMargin: "0px 0px 120px 0px" },
		);
		reveals.forEach((el) => {
			io.observe(el);
		});
	} else {
		reveals.forEach((el) => {
			el.classList.add("in");
		});
	}
	window.addEventListener("scroll", revealVisible, { passive: true });
	window.addEventListener("resize", revealVisible);
	revealVisible();
	setTimeout(() => {
		reveals.forEach((element) => {
			element.classList.add("in");
		});
	}, 1200);

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

	document.querySelectorAll('[data-close="menu"]').forEach((a) => {
		a.addEventListener("click", () => {
			closeOverlay(menu);
		});
	});

	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") {
			if (menu.classList.contains("open")) closeOverlay(menu);
			if (search.classList.contains("open")) closeOverlay(search);
		}
	});

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
