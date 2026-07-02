// Zippay — shared behavior
(function () {
	var root = document.documentElement;
	root.classList.add("js");

	// Theme toggle
	function setTheme(t) {
		root.classList.toggle("dark", t === "dark");
		try {
			localStorage.setItem("zippay-theme", t);
		} catch (e) {}
	}
	document.addEventListener("click", function (e) {
		var t = e.target.closest("[data-theme-toggle]");
		if (t) setTheme(root.classList.contains("dark") ? "light" : "dark");

		var ham = e.target.closest("[data-hamburger]");
		if (ham) {
			var m = document.querySelector("[data-mobile-menu]");
			if (m) m.classList.toggle("open");
		}

		var dd = e.target.closest(".nav-item > button");
		if (dd) dd.parentElement.classList.toggle("open");

		var acc = e.target.closest(".accordion-trigger");
		if (acc) {
			var item = acc.parentElement;
			var body = item.querySelector(".accordion-body");
			var isOpen = item.classList.toggle("open");
			body.style.maxHeight = isOpen ? body.scrollHeight + "px" : "0";
		}
	});

	// Scroll reveal
	var io = new IntersectionObserver(
		function (entries) {
			entries.forEach(function (en) {
				if (en.isIntersecting) {
					en.target.classList.add("in");
					io.unobserve(en.target);
				}
			});
		},
		{ threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
	);
	document.querySelectorAll(".reveal").forEach(function (el) {
		io.observe(el);
	});
	// Safety net: ensure everything is visible even if IO never fires (e.g. headless full-page capture)
	setTimeout(function () {
		document.querySelectorAll(".reveal:not(.in)").forEach(function (el) {
			el.classList.add("in");
		});
	}, 1200);
})();
