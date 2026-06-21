(() => {
	/* ---- Scroll reveal ---- */
	var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	var revealEls = document.querySelectorAll(".reveal");

	if (reduce || !("IntersectionObserver" in window)) {
		revealEls.forEach((el) => {
			el.classList.add("in");
		});
	} else {
		var io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						e.target.classList.add("in");
						io.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.12 },
		);
		revealEls.forEach((el) => {
			io.observe(el);
		});
	}

	/* ---- Sticky header state ---- */
	var header = document.getElementById("header");
	var onScroll = () => {
		if (window.scrollY > 40) header.classList.add("scrolled");
		else header.classList.remove("scrolled");
	};
	onScroll();
	window.addEventListener("scroll", onScroll, { passive: true });

	/* ---- FAQ accordion (exclusive) ---- */
	var items = document.querySelectorAll(".faq-item");
	items.forEach((item) => {
		var btn = item.querySelector(".faq-q");
		var ans = item.querySelector(".faq-a");
		btn.addEventListener("click", () => {
			var isOpen = item.classList.contains("open");
			items.forEach((other) => {
				other.classList.remove("open");
				other.querySelector(".faq-q").setAttribute("aria-expanded", "false");
				other.querySelector(".faq-a").style.maxHeight = "0px";
			});
			if (!isOpen) {
				item.classList.add("open");
				btn.setAttribute("aria-expanded", "true");
				ans.style.maxHeight = `${ans.scrollHeight}px`;
			}
		});
	});

	/* ---- Testimonial marquee: duplicate track for seamless loop ---- */
	var track = document.querySelector(".marquee-track");
	if (track && !reduce) {
		track.innerHTML += track.innerHTML;
	}
})();
