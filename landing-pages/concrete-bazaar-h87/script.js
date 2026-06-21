(() => {
	var star =
		'<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15 9 22 9.5 17 14.5 18.5 22 12 18 5.5 22 7 14.5 2 9.5 9 9"/></svg>';

	var products = [
		{
			img: "product-1.jpg",
			name: "Archival Oversized Hoodie",
			rate: "4.8",
			now: "₹2,499",
			was: "₹4,999",
			meta: "124 Reviews • Ships in 2 days",
			tags: [
				["sale", "Sale 40%"],
				["dark", "Trending"],
			],
		},
		{
			img: "product-2.jpg",
			name: "Boxy Fit Tee — Concrete",
			rate: "4.8",
			now: "₹1,200",
			was: "₹1,800",
			meta: "120 Reviews • 100% Cotton",
			tags: [["dark", "New"]],
		},
		{
			img: "product-3.jpg",
			name: "Minimalist Chelsea Boots",
			rate: "5.0",
			now: "₹5,999",
			was: "₹8,999",
			meta: "210 Reviews • Best Value",
			tags: [],
		},
		{
			img: "product-4.jpg",
			name: "Concrete Form Vase",
			rate: "4.7",
			now: "₹1,850",
			was: "₹2,400",
			meta: "45 Reviews • Fragile Care",
			tags: [],
		},
		{
			img: "product-5.jpg",
			name: "Technical Cargo Pants",
			rate: "4.9",
			now: "₹4,500",
			was: "₹6,200",
			meta: "56 Reviews • Waterproof",
			tags: [["sale", "Limited"]],
		},
		{
			img: "product-6.jpg",
			name: "Structured Pleated Trousers",
			rate: "4.9",
			now: "₹3,200",
			was: "₹4,500",
			meta: "89 Reviews • Limited Stock",
			tags: [["dark", "New"]],
		},
		{
			img: "product-7.jpg",
			name: "Archival Beanie",
			rate: "5.0",
			now: "₹850",
			was: "₹1,200",
			meta: "32 Reviews • Wool Blend",
			tags: [],
		},
		{
			img: "product-8.jpg",
			name: "Structural Belt — Black",
			rate: "4.6",
			now: "₹1,400",
			was: "₹2,100",
			meta: "18 Reviews • Genuine Leather",
			tags: [["sale", "Sale 33%"]],
		},
	];

	var reviews = [
		{
			q: "The quality of the oversized hoodies is unmatched. Finally, a brand that gets the brutalist aesthetic right without compromising on fabric.",
			i: "AS",
			n: "Aryan S.",
			c: "Verified Buyer, Mumbai",
		},
		{
			q: "Seamless COD and 2-day delivery to Delhi. The packaging itself was a work of art. 10/10 shopping experience.",
			i: "MK",
			n: "Meera K.",
			c: "Verified Buyer, Delhi",
		},
		{
			q: "Had to exchange my size and the process was so fast. The support team on WhatsApp is actually human and helpful.",
			i: "RJ",
			n: "Rahul J.",
			c: "Verified Buyer, Bangalore",
		},
	];

	var cats = [
		"New Arrivals",
		"Bestsellers",
		"Winter Collection",
		"Accessories",
		"Footwear",
		"Lifestyle",
	];

	function el(html) {
		var t = document.createElement("template");
		t.innerHTML = html.trim();
		return t.content.firstChild;
	}

	// Products
	var grid = document.getElementById("grid");
	products.forEach((p) => {
		var tagsHtml = p.tags
			.map((t) => `<span class="tag ${t[0]}">${t[1]}</span>`)
			.join("");
		var card = el(
			'<article class="card reveal">' +
				'<div class="ph">' +
				(tagsHtml ? `<div class="tags">${tagsHtml}</div>` : "") +
				'<img src="assets/img/' +
				p.img +
				'" alt="' +
				p.name +
				'" loading="lazy">' +
				'<button class="qadd" type="button">Quick Add to Cart</button>' +
				"</div>" +
				'<div class="row"><h3 class="name">' +
				p.name +
				"</h3>" +
				'<span class="rate">' +
				p.rate +
				" " +
				star +
				"</span></div>" +
				'<div class="price"><span class="now">' +
				p.now +
				'</span><span class="was">' +
				p.was +
				"</span></div>" +
				'<p class="meta">' +
				p.meta +
				"</p>" +
				"</article>",
		);
		grid.appendChild(card);
	});

	// Reviews
	var rg = document.getElementById("rev-grid");
	reviews.forEach((r) => {
		rg.appendChild(
			el(
				'<article class="rev reveal">' +
					'<div class="stars">' +
					star +
					star +
					star +
					star +
					star +
					"</div>" +
					'<blockquote>"' +
					r.q +
					'"</blockquote>' +
					'<div class="who"><span class="av">' +
					r.i +
					"</span>" +
					'<div><div class="n">' +
					r.n +
					'</div><div class="c">' +
					r.c +
					"</div></div></div>" +
					"</article>",
			),
		);
	});

	// Category marquee (duplicate track for seamless loop)
	var catMq = document.getElementById("cat-mq");
	var catItems = cats
		.concat(cats)
		.map((c) => `<a href="#bestsellers">${c}</a>`)
		.join("");
	catMq.innerHTML = catItems;

	// Stats marquee
	var statLine =
		"Established 2024 • 50,000+ Happy Customers • Global Shipping • Archival Precision&nbsp;&nbsp;•&nbsp;&nbsp;";
	document.getElementById("stats-mq").innerHTML =
		`<p>${statLine}</p><p>${statLine}</p>`;

	// Add to cart
	var cartCount = document.getElementById("cart-count");
	document.addEventListener("click", (e) => {
		var btn = e.target.closest(".qadd");
		if (!btn || btn.classList.contains("added")) return;
		var n = parseInt(cartCount.textContent, 10) || 0;
		cartCount.textContent = n + 1;
		var orig = btn.textContent;
		btn.classList.add("added");
		btn.textContent = "Added ✓";
		setTimeout(() => {
			btn.classList.remove("added");
			btn.textContent = orig;
		}, 1400);
	});

	// Mobile menu
	var mmenu = document.getElementById("mmenu");
	function setMenu(open) {
		mmenu.classList.toggle("open", open);
		document.body.style.overflow = open ? "hidden" : "";
	}
	document.getElementById("burger").addEventListener("click", () => {
		setMenu(true);
	});
	document.getElementById("mclose").addEventListener("click", () => {
		setMenu(false);
	});
	mmenu.querySelectorAll("a").forEach((a) => {
		a.addEventListener("click", () => {
			setMenu(false);
		});
	});

	// Pincode
	var pinBtn = document.getElementById("pin-btn");
	var pinInput = document.getElementById("pin");
	var pinMsg = document.getElementById("pin-msg");
	function checkPin() {
		var v = (pinInput.value || "").trim();
		if (/^\d{6}$/.test(v)) {
			pinMsg.textContent = `Delivery available in 2–3 days for ${v}`;
			pinMsg.className = "pin-msg ok";
		} else {
			pinMsg.textContent = "Please enter a valid 6-digit pincode";
			pinMsg.className = "pin-msg err";
		}
	}
	pinBtn.addEventListener("click", checkPin);
	pinInput.addEventListener("keydown", (e) => {
		if (e.key === "Enter") checkPin();
	});
	pinInput.addEventListener("input", () => {
		pinInput.value = pinInput.value.replace(/\D/g, "");
	});

	// Newsletter
	document.getElementById("news-form").addEventListener("submit", function (e) {
		e.preventDefault();
		var msg = document.getElementById("news-msg");
		msg.textContent = "You’re in. Welcome to the Circle.";
		this.reset();
	});

	// Scroll reveal
	var io = new IntersectionObserver(
		(entries) => {
			entries.forEach((en) => {
				if (en.isIntersecting) {
					en.target.classList.add("in");
					io.unobserve(en.target);
				}
			});
		},
		{ threshold: 0.06 },
	);
	document.querySelectorAll(".reveal").forEach((n) => {
		io.observe(n);
	});
})();
