(() => {
	/* ---------- Header scroll state ---------- */
	var header = document.getElementById("header");
	function onScroll() {
		if (window.scrollY > 20) header.classList.add("scrolled");
		else header.classList.remove("scrolled");
	}
	window.addEventListener("scroll", onScroll, { passive: true });
	onScroll();

	/* ---------- Mobile drawer ---------- */
	var burger = document.getElementById("burger");
	var drawer = document.getElementById("drawer");
	burger.addEventListener("click", () => {
		var open = drawer.classList.toggle("open");
		burger.classList.toggle("open", open);
		document.body.style.overflow = open ? "hidden" : "";
	});
	drawer.querySelectorAll("a").forEach((a) => {
		a.addEventListener("click", () => {
			drawer.classList.remove("open");
			burger.classList.remove("open");
			document.body.style.overflow = "";
		});
	});

	/* ---------- Scroll reveal ---------- */
	var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	if (!reduce && "IntersectionObserver" in window) {
		var io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						e.target.classList.add("is-visible");
						io.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.12 },
		);
		document.querySelectorAll(".reveal, .reveal-l, .reveal-r").forEach((el) => {
			io.observe(el);
		});
	} else {
		document.querySelectorAll(".reveal, .reveal-l, .reveal-r").forEach((el) => {
			el.classList.add("is-visible");
		});
	}

	/* ---------- Interactive packages ---------- */
	var plans = {
		essential: {
			title: "Prenatal Essential",
			cta: "Book essential care",
			features: [
				"9 doctor consultations",
				"Core lab screening",
				"Nutrition consultation",
				"Prenatal yoga sessions",
				"24/7 nurse helpline",
				"First-trimester scan",
			],
		},
		blissful: {
			title: "Blissful Delivery",
			cta: "Book the blissful package",
			features: [
				"Natural delivery fee",
				"Private LDRP suite (2 nights)",
				"Pediatrician checkup",
				"Lactation support",
				"Postnatal care visits",
				"Baby's first vaccination",
			],
		},
		royal: {
			title: "Royal Suite",
			cta: "Enquire about the suite",
			features: [
				"Presidential birthing suite",
				"Painless birthing option",
				"Partner-stay program",
				"Postpartum massage",
				"Maternity photo session",
				"NICU support coverage",
			],
		},
	};

	var planCards = document.querySelectorAll(".plan");
	var pkgTitle = document.getElementById("pkgTitle");
	var pkgFeatures = document.getElementById("pkgFeatures");
	var pkgCta = document.getElementById("pkgCta");
	var checkSvg =
		'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';

	function renderPlan(key) {
		var p = plans[key];
		if (!p) return;
		pkgTitle.textContent = p.title;
		pkgCta.childNodes[0].nodeValue = `${p.cta} `;
		pkgFeatures.innerHTML = p.features
			.map(
				(f) =>
					'<div class="pkg__feature">' +
					checkSvg +
					"<span>" +
					f +
					"</span></div>",
			)
			.join("");
	}

	planCards.forEach((card) => {
		card.addEventListener("click", () => {
			planCards.forEach((c) => {
				c.classList.remove("active");
			});
			card.classList.add("active");
			renderPlan(card.dataset.plan);
		});
	});
	renderPlan("blissful");

	/* ---------- FAQ accordion ---------- */
	var faqItems = document.querySelectorAll(".faq-item");
	faqItems.forEach((item) => {
		var q = item.querySelector(".faq-item__q");
		var a = item.querySelector(".faq-item__a");
		q.addEventListener("click", () => {
			var isOpen = item.classList.contains("open");
			faqItems.forEach((other) => {
				other.classList.remove("open");
				other.querySelector(".faq-item__a").style.maxHeight = null;
			});
			if (!isOpen) {
				item.classList.add("open");
				a.style.maxHeight = `${a.scrollHeight}px`;
			}
		});
	});

	/* ---------- Booking form ---------- */
	var form = document.getElementById("bookForm");
	var success = document.getElementById("formSuccess");
	form.addEventListener("submit", (e) => {
		e.preventDefault();
		var name = document.getElementById("name");
		var phone = document.getElementById("phone");
		if (!name.value.trim() || !phone.value.trim()) {
			(name.value.trim() ? phone : name).focus();
			return;
		}
		success.classList.add("show");
		form.querySelector('button[type="submit"]').style.display = "none";
		form.reset();
	});
})();
