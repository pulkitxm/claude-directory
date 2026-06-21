(() => {
	// ---- Scroll reveal ----
	var observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("visible");
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.05, rootMargin: "0px 0px -40px 0px" },
	);

	document.querySelectorAll(".reveal").forEach((el) => {
		observer.observe(el);
	});

	// ---- Schedule day toggle ----
	var btn1 = document.getElementById("btnDay1");
	var btn2 = document.getElementById("btnDay2");
	var day1 = document.getElementById("day1");
	var day2 = document.getElementById("day2");

	function showDay(n) {
		var on = n === 1 ? day1 : day2;
		var off = n === 1 ? day2 : day1;
		var bOn = n === 1 ? btn1 : btn2;
		var bOff = n === 1 ? btn2 : btn1;
		off.classList.add("hidden");
		on.classList.remove("hidden");
		bOn.classList.add("active");
		bOff.classList.remove("active");
		// re-trigger fade
		on.classList.remove("fade-in");
		void on.offsetWidth;
		on.classList.add("fade-in");
		// ensure rows are visible (they may not have intersected yet)
		on.querySelectorAll(".reveal").forEach((el) => {
			el.classList.add("visible");
		});
	}

	if (btn1 && btn2) {
		btn1.addEventListener("click", () => {
			showDay(1);
		});
		btn2.addEventListener("click", () => {
			showDay(2);
		});
	}

	// ---- Mobile menu ----
	var ham = document.getElementById("hamburger");
	var menu = document.getElementById("mobileMenu");
	if (ham && menu) {
		ham.addEventListener("click", () => {
			menu.style.display = menu.style.display === "block" ? "none" : "block";
		});
		menu.querySelectorAll("a").forEach((a) => {
			a.addEventListener("click", () => {
				menu.style.display = "none";
			});
		});
	}
})();
