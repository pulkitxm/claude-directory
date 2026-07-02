/* Charter clone — shared interactions */
(function () {
	// ----- announcement bar dismiss -----
	document.addEventListener("click", function (e) {
		if (e.target.closest(".announce__close")) {
			e.target.closest(".announce").classList.add("hidden");
		}
	});

	// ----- theme toggle -----
	function applyTheme(t) {
		document.documentElement.classList.toggle("dark", t === "dark");
	}
	window.__toggleTheme = function () {
		var next = document.documentElement.classList.contains("dark")
			? "light"
			: "dark";
		localStorage.setItem("theme", next);
		applyTheme(next);
	};
	document.addEventListener("click", function (e) {
		if (e.target.closest(".theme-toggle")) window.__toggleTheme();
	});

	// ----- product dropdown (click to toggle on mobile, hover on desktop via CSS) -----
	document.addEventListener("click", function (e) {
		var trig = e.target.closest(".dropdown__trigger");
		var openD = document.querySelector(".dropdown.open");
		if (trig) {
			var d = trig.closest(".dropdown");
			d.classList.toggle("open");
		} else if (openD && !e.target.closest(".dropdown__menu")) {
			openD.classList.remove("open");
		}
	});

	// ----- mobile menu -----
	document.addEventListener("click", function (e) {
		if (e.target.closest(".menu-btn")) {
			document.querySelector(".mobile-nav").classList.toggle("open");
		}
	});

	// ----- FAQ accordion -----
	document.addEventListener("click", function (e) {
		var trig = e.target.closest(".acc__trigger");
		if (!trig) return;
		var item = trig.closest(".acc__item");
		var panel = item.querySelector(".acc__panel");
		var open = item.classList.toggle("open");
		if (open) {
			panel.style.maxHeight = panel.scrollHeight + "px";
		} else {
			panel.style.maxHeight = "0px";
		}
	});

	// ----- Code security accordion -----
	document.addEventListener("click", function (e) {
		var trig = e.target.closest(".code-acc__trigger");
		if (!trig) return;
		var item = trig.closest(".code-acc__item");
		var body = item.querySelector(".code-acc__body");
		var isOpen = item.classList.contains("code-acc__item--open");
		// Close all
		document.querySelectorAll(".code-acc__item").forEach(function (el) {
			el.classList.remove("code-acc__item--open");
			el.querySelector(".code-acc__trigger").setAttribute(
				"aria-expanded",
				"false",
			);
			el.querySelector(".code-acc__body").classList.add(
				"code-acc__body--closed",
			);
		});
		if (!isOpen) {
			item.classList.add("code-acc__item--open");
			trig.setAttribute("aria-expanded", "true");
			body.classList.remove("code-acc__body--closed");
		}
	});

	// ----- scroll reveal -----
	var io = new IntersectionObserver(
		function (entries) {
			entries.forEach(function (en) {
				if (en.isIntersecting) {
					en.target.classList.add("in");
					io.unobserve(en.target);
				}
			});
		},
		{ threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
	);
	document.querySelectorAll(".reveal").forEach(function (el, i) {
		el.style.transitionDelay = Math.min(i % 6, 5) * 60 + "ms";
		io.observe(el);
	});
})();
