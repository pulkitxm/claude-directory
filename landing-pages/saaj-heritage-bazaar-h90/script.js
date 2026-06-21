(() => {
	/* ---------- Products ---------- */
	var products = [
		{
			name: "The Jodhpur Sofa",
			mat: "Solid Sheesham Wood",
			img: "card-1.jpg",
			now: "₹74,999",
			was: "₹89,999",
			badge: "popular",
		},
		{
			name: "Vedic 6-Seater Dining",
			mat: "Natural Honey Finish",
			img: "prod-2.jpg",
			now: "₹52,499",
			was: "",
		},
		{
			name: "The Scribe's Desk",
			mat: "Teak & Brass",
			img: "prod-3.jpg",
			now: "₹28,500",
			was: "",
		},
		{
			name: "Haveli Poster Bed",
			mat: "King Size Sheesham",
			img: "prod-4.jpg",
			now: "₹89,000",
			was: "",
			badge: "new",
		},
		{
			name: "Jaali Coffee Table",
			mat: "Hand-carved",
			img: "prod-5.jpg",
			now: "₹12,999",
			was: "",
		},
		{
			name: "Mehraab Wall Mirror",
			mat: "Teak Gold Finish",
			img: "prod-6.jpg",
			now: "₹8,499",
			was: "",
		},
		{
			name: "Brass Inlay Trunk",
			mat: "Storage & Seating",
			img: "prod-7.jpg",
			now: "₹18,900",
			was: "",
		},
		{
			name: "Vedic Bookcase",
			mat: "Acacia Wood",
			img: "prod-8.jpg",
			now: "₹31,500",
			was: "",
		},
	];

	var grid = document.getElementById("prod-grid");
	if (grid) {
		grid.innerHTML = products
			.map((p) => {
				var badge = p.badge
					? '<div class="badge ' +
						p.badge +
						'">' +
						(p.badge === "new" ? "New" : "Popular") +
						"</div>"
					: "";
				var was = p.was ? `<span class="was">${p.was}</span>` : "";
				return (
					"" +
					'<article class="prod">' +
					'<div class="prod-media">' +
					'<img src="./assets/img/' +
					p.img +
					'" alt="' +
					p.name +
					'" loading="lazy">' +
					badge +
					'<button class="view-bar" type="button">View Product</button>' +
					"</div>" +
					"<h3>" +
					p.name +
					"</h3>" +
					'<p class="mat">' +
					p.mat +
					"</p>" +
					'<div class="price"><span class="now">' +
					p.now +
					"</span>" +
					was +
					"</div>" +
					"</article>"
				);
			})
			.join("");
	}

	/* ---------- Testimonials ---------- */
	var testimonials = [
		{
			q: "The Jodhpur Sofa set completely transformed my living room. The wood quality is visible from across the room, and the finish is just silk.",
			n: "Anjali R.",
			l: "Gurgaon, Haryana",
			a: "av-1.jpg",
		},
		{
			q: "Finding authentic solid wood furniture in Mumbai was a chore until Saaj. The Haveli Bed is like sleeping in a palace. Worth every penny.",
			n: "Vikram M.",
			l: "Mumbai, Maharashtra",
			a: "av-2.jpg",
		},
		{
			q: "The white-glove delivery was a game changer. They assembled everything in an hour and cleaned up. Best D2C experience in India so far.",
			n: "Sana K.",
			l: "Bangalore, Karnataka",
			a: "av-3.jpg",
		},
	];
	var star =
		'<svg viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>';
	var tg = document.getElementById("test-grid");
	if (tg) {
		tg.innerHTML = testimonials
			.map(
				(t, _i) =>
					"" +
					'<div class="test" data-reveal>' +
					'<div class="stars">' +
					star.repeat(5) +
					"</div>" +
					'<p class="quote">"' +
					t.q +
					'"</p>' +
					'<div class="reviewer">' +
					'<img src="./assets/img/' +
					t.a +
					'" alt="' +
					t.n +
					'">' +
					'<div><p class="rn">' +
					t.n +
					'</p><p class="rl">' +
					t.l +
					"</p></div>" +
					"</div>" +
					"</div>",
			)
			.join("");
	}

	/* ---------- Scroll reveal ---------- */
	var io = new IntersectionObserver(
		(entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) {
					e.target.classList.add("visible");
					io.unobserve(e.target);
				}
			});
		},
		{ threshold: 0.1 },
	);
	document.querySelectorAll("[data-reveal]").forEach((el) => {
		io.observe(el);
	});

	/* ---------- Header shrink ---------- */
	var header = document.getElementById("site-header");
	window.addEventListener(
		"scroll",
		() => {
			header.classList.toggle("shrink", window.scrollY > 50);
		},
		{ passive: true },
	);

	/* ---------- Mobile menu ---------- */
	var menu = document.getElementById("mobile-menu");
	var open = document.getElementById("menu-toggle");
	var close = document.getElementById("menu-close");
	function setMenu(on) {
		menu.classList.toggle("open", on);
		document.body.style.overflow = on ? "hidden" : "";
	}
	if (open)
		open.addEventListener("click", () => {
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

	/* ---------- Hero card rotation ---------- */
	var collections = [
		{
			tag: "The Collection",
			title: "Pure Sheesham Wood Craftsmanship",
			desc: "Ethically sourced, seasoned for Indian weather, and finished by master artisans of Rajasthan.",
			img: "card-1.jpg",
		},
		{
			tag: "The Living Room",
			title: "Handcrafted Heritage Sofas",
			desc: "Sink into the luxury of hand-polished Sheesham frames with premium Indian fabric upholstery.",
			img: "card-3.jpg",
		},
		{
			tag: "The Bedroom",
			title: "Royal Haveli Poster Beds",
			desc: "Bring the grandeur of Rajasthan to your bedroom with intricately carved teak four-poster beds.",
			img: "card-2.jpg",
		},
	];
	var idx = 0;
	var cContent = document.getElementById("card-content");
	var cImg = document.getElementById("card-image");
	var cTag = document.getElementById("card-tag");
	var cTitle = document.getElementById("card-title");
	var cDesc = document.getElementById("card-desc");
	if (cContent && cImg) {
		setInterval(() => {
			idx = (idx + 1) % collections.length;
			var d = collections[idx];
			cContent.classList.add("fade");
			cImg.style.opacity = "0";
			setTimeout(() => {
				cImg.src = `./assets/img/${d.img}`;
				cTag.textContent = d.tag;
				cTitle.textContent = d.title;
				cDesc.textContent = d.desc;
				cContent.classList.remove("fade");
				cImg.style.opacity = "1";
			}, 500);
		}, 5000);
	}

	/* ---------- Form ---------- */
	var form = document.getElementById("callback-form");
	var msg = document.getElementById("form-msg");
	if (form) {
		form.addEventListener("submit", (e) => {
			e.preventDefault();
			var name = form.name;
			var phone = form.phone;
			var ok = true;
			[name, phone].forEach((f) => {
				var bad = !f.value.trim();
				f.closest(".field").classList.toggle("invalid", bad);
				if (bad) ok = false;
			});
			if (!ok) {
				msg.textContent = "Please fill in your name and contact number.";
				msg.className = "form-msg err";
				return;
			}
			msg.textContent =
				"Thank you, " +
				name.value.trim() +
				". A design consultant will call you back shortly.";
			msg.className = "form-msg ok";
			form.reset();
		});
	}
})();
