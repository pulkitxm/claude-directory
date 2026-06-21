(() => {
	var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	/* ---------- hero reveal on load ---------- */
	function fireHero() {
		var overlay = document.getElementById("heroOverlay");
		var img = document.getElementById("heroImg");
		if (overlay) overlay.classList.add("active");
		if (img) img.classList.add("active");
	}
	if (reduce) {
		fireHero();
	} else {
		window.setTimeout(fireHero, 120);
	}

	/* ---------- scroll reveal ---------- */
	var reveals = document.querySelectorAll(".reveal");
	if ("IntersectionObserver" in window && !reduce) {
		var io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						e.target.classList.add("in");
						io.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
		);
		reveals.forEach((el) => {
			io.observe(el);
		});
	} else {
		reveals.forEach((el) => {
			el.classList.add("in");
		});
	}

	/* ---------- mobile menu ---------- */
	var burger = document.querySelector(".hamburger");
	var menu = document.getElementById("menu");
	var close = document.querySelector(".menu-close");

	function setMenu(open) {
		menu.classList.toggle("open", open);
		menu.setAttribute("aria-hidden", String(!open));
		burger.setAttribute("aria-expanded", String(open));
		document.body.style.overflow = open ? "hidden" : "";
		if (open) {
			var first = menu.querySelector("a");
			if (first) first.focus();
		}
	}
	if (burger)
		burger.addEventListener("click", () => {
			setMenu(true);
		});
	if (close)
		close.addEventListener("click", () => {
			setMenu(false);
		});
	menu.querySelectorAll("a").forEach((a) => {
		a.addEventListener("click", () => {
			setMenu(false);
		});
	});
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && menu.classList.contains("open")) setMenu(false);
	});

	/* ---------- custom cursor ---------- */
	var fine = window.matchMedia("(pointer: fine)").matches;
	var cursor = document.querySelector(".cursor");
	if (fine && cursor && !reduce) {
		var cx = window.innerWidth / 2,
			cy = window.innerHeight / 2,
			tx = cx,
			ty = cy,
			shown = false;

		window.addEventListener("mousemove", (e) => {
			tx = e.clientX;
			ty = e.clientY;
			if (!shown) {
				shown = true;
				cursor.style.opacity = "1";
			}
		});
		window.addEventListener("mouseleave", () => {
			cursor.style.opacity = "0";
			shown = false;
		});

		function loop() {
			cx += (tx - cx) * 0.2;
			cy += (ty - cy) * 0.2;
			cursor.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
			requestAnimationFrame(loop);
		}
		requestAnimationFrame(loop);

		var hot = "a, button, input, select, .ritual";
		document.addEventListener("mouseover", (e) => {
			if (e.target.closest(hot)) cursor.classList.add("active");
		});
		document.addEventListener("mouseout", (e) => {
			if (e.target.closest(hot)) cursor.classList.remove("active");
		});
	}
})();
