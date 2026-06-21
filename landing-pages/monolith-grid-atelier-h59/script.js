(() => {
	// ---- Menu overlay ----
	var burger = document.getElementById("burger");
	var overlay = document.getElementById("overlay");
	var isOpen = false;

	function setMenu(open) {
		isOpen = open;
		burger.classList.toggle("open", open);
		overlay.classList.toggle("open", open);
		burger.setAttribute("aria-expanded", String(open));
		burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
		document.body.style.overflow = open ? "hidden" : "";
	}

	burger.addEventListener("click", () => {
		setMenu(!isOpen);
	});
	overlay.querySelectorAll("[data-close]").forEach((a) => {
		a.addEventListener("click", () => {
			setMenu(false);
		});
	});
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && isOpen) setMenu(false);
	});

	// ---- Scroll reveal ----
	var reveals = document.querySelectorAll(".reveal");
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

	// ---- Form ----
	var form = document.getElementById("enquiry");
	if (form) {
		form.addEventListener("submit", (e) => {
			e.preventDefault();
			var btn = form.querySelector(".submit");
			if (btn.classList.contains("done")) return;
			var original = btn.textContent;
			btn.textContent = "Sending…";
			btn.disabled = true;
			setTimeout(() => {
				btn.textContent = "Enquiry Received →";
				btn.classList.add("done");
				btn.disabled = false;
				form.reset();
				setTimeout(() => {
					btn.textContent = original;
					btn.classList.remove("done");
				}, 3200);
			}, 1300);
		});
	}
})();
