(() => {
	var reduceMotion = window.matchMedia(
		"(prefers-reduced-motion: reduce)",
	).matches;

	/* ---------- Product grid ---------- */
	var products = [
		{
			img: "prod-1.jpg",
			name: "Éclat Diamond Pendant",
			meta: "18k Yellow Gold",
			price: "$1,850",
		},
		{
			img: "prod-2.jpg",
			name: "Atelier Solitaire",
			meta: "Certified 2ct Diamond",
			price: "$5,400",
		},
		{
			img: "prod-3.jpg",
			name: "Celestial Hoops",
			meta: "14k Rose Gold",
			price: "$1,250",
		},
		{
			img: "prod-4.jpg",
			name: "Infinite Link Bracelet",
			meta: "White Gold Pavé",
			price: "$2,100",
		},
		{
			img: "prod-5.jpg",
			name: "Marquise Halo Ring",
			meta: "18k Yellow Gold",
			price: "$3,200",
		},
		{
			img: "prod-6.jpg",
			name: "Riviera Diamond Choker",
			meta: "White Gold Illusion",
			price: "$7,800",
		},
		{
			img: "prod-7.jpg",
			name: "Empress Pearl Drops",
			meta: "Natural South Sea",
			price: "$1,950",
		},
		{
			img: "prod-8.jpg",
			name: "Aura Tennis Bracelet",
			meta: "5ct TDW White Gold",
			price: "$6,500",
		},
	];
	var checkSvg =
		'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12.5l4.5 4.5L19 7" stroke-linecap="round" stroke-linejoin="round"/></svg>';

	var grid = document.getElementById("prod-grid");
	if (grid) {
		products.forEach((p) => {
			var card = document.createElement("article");
			card.className = "card reveal";
			card.innerHTML =
				'<div class="card-img">' +
				'<img src="assets/' +
				p.img +
				'" alt="' +
				p.name +
				'">' +
				'<button class="qadd" aria-label="Save ' +
				p.name +
				'">+</button>' +
				"</div>" +
				'<div class="card-body">' +
				'<div class="pname">' +
				p.name +
				"</div>" +
				'<div class="meta">' +
				p.meta +
				"</div>" +
				'<div class="price">' +
				p.price +
				"</div>" +
				"</div>";
			grid.appendChild(card);
		});
	}

	/* ---------- Quick-add simulation ---------- */
	var count = 0;
	var counter = document.getElementById("cart-count");
	document.addEventListener("click", (e) => {
		var btn = e.target.closest(".qadd");
		if (!btn || btn.classList.contains("done")) return;
		btn.classList.add("done");
		btn.innerHTML = checkSvg;
		count += 1;
		if (counter) counter.textContent = String(count);
		setTimeout(() => {
			btn.classList.remove("done");
			btn.textContent = "+";
		}, 1600);
	});

	/* ---------- Scroll reveals ---------- */
	var reveals = document.querySelectorAll(".reveal");
	if (reduceMotion || !("IntersectionObserver" in window)) {
		reveals.forEach((el) => {
			el.classList.add("in");
		});
	} else {
		var io = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry, i) => {
					if (entry.isIntersecting) {
						setTimeout(
							() => {
								entry.target.classList.add("in");
							},
							(i % 4) * 90,
						);
						io.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
		);
		reveals.forEach((el) => {
			io.observe(el);
		});
	}

	/* ---------- Hero slideshow ---------- */
	var slides = document.querySelectorAll(".hero-slide");
	var pips = document.querySelectorAll("#focus-pips span");
	var fcName = document.getElementById("fc-name");
	var names = [
		"Celestial Solitaire",
		"Lumière Pavé Suite",
		"Nocturne Diamond Line",
	];
	if (slides.length && !reduceMotion) {
		var idx = 0;
		setInterval(() => {
			slides[idx].classList.remove("active");
			pips[idx]?.classList.remove("on");
			idx = (idx + 1) % slides.length;
			slides[idx].classList.add("active");
			pips[idx]?.classList.add("on");
			if (fcName) fcName.textContent = names[idx];
		}, 5000);
	}

	/* ---------- Header shadow on scroll ---------- */
	var header = document.getElementById("header");
	function onScroll() {
		if (window.scrollY > 80) header.classList.add("scrolled");
		else header.classList.remove("scrolled");
	}
	window.addEventListener("scroll", onScroll, { passive: true });
	onScroll();

	/* ---------- Mobile drawer ---------- */
	var drawer = document.getElementById("drawer");
	var open = document.getElementById("open-drawer");
	var close = document.getElementById("close-drawer");
	var back = document.getElementById("drawer-back");
	function openDrawer() {
		drawer.classList.add("open");
		document.body.style.overflow = "hidden";
	}
	function closeDrawer() {
		drawer.classList.remove("open");
		document.body.style.overflow = "";
	}
	open?.addEventListener("click", openDrawer);
	close?.addEventListener("click", closeDrawer);
	back?.addEventListener("click", closeDrawer);
	document.querySelectorAll("[data-close]").forEach((a) => {
		a.addEventListener("click", closeDrawer);
	});
})();
