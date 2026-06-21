(() => {
	var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	/* ---- Header scroll state ---- */
	var header = document.getElementById("header");
	function onScrollHeader() {
		header.classList.toggle("scrolled", window.scrollY > 50);
	}
	onScrollHeader();
	window.addEventListener("scroll", onScrollHeader, { passive: true });

	/* ---- Mobile menu ---- */
	var toggle = document.getElementById("menuToggle");
	var menu = document.getElementById("mobileMenu");
	function setMenu(open) {
		toggle.classList.toggle("open", open);
		menu.classList.toggle("open", open);
		toggle.setAttribute("aria-expanded", open ? "true" : "false");
		menu.setAttribute("aria-hidden", open ? "false" : "true");
		document.body.style.overflow = open ? "hidden" : "";
	}
	toggle.addEventListener("click", () => {
		setMenu(!menu.classList.contains("open"));
	});
	menu.querySelectorAll("a").forEach((a) => {
		a.addEventListener("click", () => {
			setMenu(false);
		});
	});

	/* ---- Scroll reveal ---- */
	var revealEls = document.querySelectorAll(".reveal");
	if ("IntersectionObserver" in window && !reduce) {
		var io = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						e.target.classList.add("in");
						obs.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.12 },
		);
		revealEls.forEach((el) => {
			io.observe(el);
		});
	} else {
		revealEls.forEach((el) => {
			el.classList.add("in");
		});
	}

	/* ---- Methodology deck fan ---- */
	var deck = document.getElementById("deck");
	if (deck) {
		if (reduce) {
			deck.classList.add("fan");
		} else if ("IntersectionObserver" in window) {
			var deckIo = new IntersectionObserver(
				(entries) => {
					entries.forEach((e) => {
						if (e.isIntersecting) {
							deck.classList.add("fan");
							deckIo.unobserve(deck);
						}
					});
				},
				{ threshold: 0.4 },
			);
			deckIo.observe(deck);
		} else {
			deck.classList.add("fan");
		}
	}

	/* ---- FAQ accordion ---- */
	var faqItems = document.querySelectorAll(".faq-item");
	faqItems.forEach((item) => {
		var q = item.querySelector(".faq-q");
		var a = item.querySelector(".faq-a");
		q.addEventListener("click", () => {
			var isOpen = item.classList.contains("open");
			faqItems.forEach((other) => {
				other.classList.remove("open");
				other.querySelector(".faq-a").style.maxHeight = null;
			});
			if (!isOpen) {
				item.classList.add("open");
				a.style.maxHeight = `${a.scrollHeight}px`;
			}
		});
	});

	/* ---- Testimonial scroll parallax ---- */
	var wrap = document.getElementById("testiWrap");
	var track = document.getElementById("testiTrack");
	if (wrap && track && !reduce) {
		var ticking = false;
		function updateParallax() {
			var rect = wrap.getBoundingClientRect();
			var vh = window.innerHeight;
			if (rect.top < vh && rect.bottom > 0) {
				var progress = 1 - rect.bottom / (vh + rect.height);
				var moveX = (progress - 0.5) * 600;
				track.style.transform = `translateX(${-moveX}px)`;
			}
			ticking = false;
		}
		window.addEventListener(
			"scroll",
			() => {
				if (!ticking) {
					window.requestAnimationFrame(updateParallax);
					ticking = true;
				}
			},
			{ passive: true },
		);
		updateParallax();
	}

	/* ---- Newsletter (demo) ---- */
	var form = document.getElementById("newsForm");
	var ok = document.getElementById("newsOk");
	if (form) {
		form.addEventListener("submit", (e) => {
			e.preventDefault();
			form.reset();
			if (ok) {
				ok.hidden = false;
			}
		});
	}
})();
