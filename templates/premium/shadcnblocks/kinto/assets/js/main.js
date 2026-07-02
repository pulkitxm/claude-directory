// Kinto — theme toggle, mobile menu, scroll reveals
(function () {
	// theme toggle
	var toggle = document.querySelector("[data-theme-toggle]");
	function setTheme(t) {
		document.documentElement.classList.toggle("dark", t === "dark");
		try {
			localStorage.setItem("kinto-theme", t);
		} catch (e) {}
	}
	if (toggle) {
		toggle.addEventListener("click", function () {
			setTheme(
				document.documentElement.classList.contains("dark") ? "light" : "dark",
			);
		});
	}

	// mobile menu
	var menuBtn = document.querySelector("[data-menu-open]");
	var menu = document.querySelector(".mobile-menu");
	var closeBtn = document.querySelector("[data-menu-close]");
	if (menuBtn && menu) {
		menuBtn.addEventListener("click", function () {
			menu.classList.add("open");
		});
	}
	if (closeBtn && menu) {
		closeBtn.addEventListener("click", function () {
			menu.classList.remove("open");
		});
	}
	if (menu) {
		menu.querySelectorAll("a").forEach(function (a) {
			a.addEventListener("click", function () {
				menu.classList.remove("open");
			});
		});
	}

	// scroll reveal
	var els = document.querySelectorAll(".reveal");
	if ("IntersectionObserver" in window) {
		var io = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (e) {
					if (e.isIntersecting) {
						e.target.classList.add("in");
						io.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
		);
		els.forEach(function (el) {
			io.observe(el);
		});
		// safety: never leave content permanently hidden (programmatic scroll / no-scroll views)
		window.addEventListener("load", function () {
			setTimeout(function () {
				document.querySelectorAll(".reveal:not(.in)").forEach(function (el) {
					var r = el.getBoundingClientRect();
					if (r.top < window.innerHeight) el.classList.add("in");
				});
			}, 600);
		});
	} else {
		els.forEach(function (el) {
			el.classList.add("in");
		});
	}
})();
