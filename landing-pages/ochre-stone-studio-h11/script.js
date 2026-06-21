/* ============ OCHRE & STONE — interactions ============ */
(() => {
	/* ---- Scroll reveal ---- */
	var revealEls = document.querySelectorAll("[data-reveal]");
	if ("IntersectionObserver" in window) {
		var io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						e.target.classList.add("is-in");
						io.unobserve(e.target);
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
			el.classList.add("is-in");
		});
	}

	/* ---- Hero card carousel ---- */
	var slides = [
		{
			tag: "The Curation",
			title: "Tailored spatial design",
			desc: "We shape rooms around the way you live — through the slow selection of material, form and natural light.",
			img: "assets/img/thumb-1.jpg",
		},
		{
			tag: "The Vision",
			title: "Form, married to function",
			desc: "Every square metre earns its place, holding aesthetic clarity without losing the warmth of a home.",
			img: "assets/img/thumb-2.jpg",
		},
		{
			tag: "The Detail",
			title: "Finishes that tell a story",
			desc: "From honed marble to reclaimed oak, we gather materials that carry texture, memory and patina.",
			img: "assets/img/thumb-3.jpg",
		},
	];
	var idx = 0;
	var fade = document.getElementById("hcFade");
	var hcImg = document.getElementById("hcImg");
	var hcTag = document.getElementById("hcTag");
	var hcTitle = document.getElementById("hcTitle");
	var hcDesc = document.getElementById("hcDesc");

	if (fade && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
		setInterval(() => {
			idx = (idx + 1) % slides.length;
			var s = slides[idx];
			fade.classList.add("out");
			hcImg.style.opacity = "0";
			setTimeout(() => {
				hcTag.textContent = s.tag;
				hcTitle.textContent = s.title;
				hcDesc.textContent = s.desc;
				hcImg.src = s.img;
				fade.classList.remove("out");
				hcImg.style.opacity = "1";
			}, 600);
		}, 5000);
	}

	/* ---- Freefall process cards ---- */
	var stage = document.getElementById("stage");
	var cards = document.querySelectorAll(".pcard");
	if (stage && cards.length) {
		var dropped = false;
		var drop = () => {
			if (dropped) return;
			dropped = true;
			cards.forEach((card, i) => {
				setTimeout(() => {
					card.classList.add("dropped");
				}, i * 150);
			});
		};
		if ("IntersectionObserver" in window) {
			var so = new IntersectionObserver(
				(entries) => {
					entries.forEach((e) => {
						if (e.isIntersecting) {
							drop();
							so.unobserve(e.target);
						}
					});
				},
				{ threshold: 0.15 },
			);
			so.observe(stage);
		} else {
			drop();
		}
	}

	/* ---- Mobile menu ---- */
	var burger = document.getElementById("burger");
	var menu = document.getElementById("mobileMenu");
	var close = document.getElementById("mmClose");
	var open = () => {
		menu.classList.add("open");
		document.body.style.overflow = "hidden";
	};
	var shut = () => {
		menu.classList.remove("open");
		document.body.style.overflow = "";
	};
	if (burger) burger.addEventListener("click", open);
	if (close) close.addEventListener("click", shut);
	if (menu)
		menu.querySelectorAll("a").forEach((a) => {
			a.addEventListener("click", shut);
		});
})();
