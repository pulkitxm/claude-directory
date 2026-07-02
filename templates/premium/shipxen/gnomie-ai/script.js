// ===== Gnomie AI — interactions =====
(function () {
	// --- theme toggle ---
	var root = document.documentElement;
	var tt = document.getElementById("themeToggle");
	tt &&
		tt.addEventListener("click", function () {
			var dark = root.classList.toggle("dark");
			try {
				localStorage.setItem("gnomie-theme", dark ? "dark" : "light");
			} catch (e) {}
		});

	// --- mobile menu ---
	var burger = document.getElementById("hamburger");
	var menu = document.getElementById("mobileMenu");
	burger &&
		burger.addEventListener("click", function () {
			menu.classList.toggle("open");
		});
	menu &&
		menu.querySelectorAll("a").forEach(function (a) {
			a.addEventListener("click", function () {
				menu.classList.remove("open");
			});
		});

	// --- avatar pool ---
	var av = [
		"av-64",
		"av-65",
		"av-669",
		"av-r7",
		"av-r8",
		"av-r9",
		"av-r10",
		"av-r11",
		"av-r12",
	];
	function avatar(i) {
		return "./assets/img/" + av[i % av.length] + ".webp";
	}

	// --- user strips ---
	var madeUsers = [
		["Amy Lawrence", "Atlanta, GA"],
		["Jane Doe", "Los Angeles, CA"],
		["Alice Doe", "Chicago, IL"],
		["Alex Woltman", "San Francisco, CA"],
		["John Smith", "Seattle, WA"],
		["Jane Smith", "Portland, OR"],
		["Alice Smith", "Denver, CO"],
		["Alex Doe", "Austin, TX"],
		["John Woltman", "Houston, TX"],
		["Brian King", "Miami, FL"],
		["Chris Johnson", "Boston, MA"],
		["Sarah Miller", "Philadelphia, PA"],
		["John Doe", "New York, NY"],
	];
	var proofUsers = [
		["Michael Thompson", "Phoenix, AZ"],
		["Sophia Turner", "Orlando, FL"],
		["Oliver Smith", "Nashville, TN"],
		["Emily Davis", "Dallas, TX"],
		["Liam Johnson", "Charlotte, NC"],
		["Isabella Martinez", "San Diego, CA"],
		["Noah Brown", "Columbus, OH"],
		["Ava Wilson", "Las Vegas, NV"],
		["Lucas Garcia", "Baltimore, MD"],
		["Mia Rodriguez", "Kansas City, MO"],
		["Ethan Lee", "Indianapolis, IN"],
		["Charlotte White", "Louisville, KY"],
	];
	var strips = {
		made: { data: madeUsers, el: document.getElementById("madeUsers"), idx: 0 },
		proof: {
			data: proofUsers,
			el: document.getElementById("proofUsers"),
			idx: 0,
		},
	};
	function renderStrip(key) {
		var s = strips[key];
		if (!s || !s.el) return;
		var n = 4,
			html = "";
		for (var i = 0; i < n; i++) {
			var u = s.data[(s.idx + i) % s.data.length];
			var ai = (s.idx + i) % av.length;
			html +=
				'<div class="user-card"><img src="' +
				avatar(ai) +
				'" alt=""><div><div class="nm">' +
				u[0] +
				'</div><div class="ct">' +
				u[1] +
				"</div></div></div>";
		}
		s.el.innerHTML = html;
	}
	renderStrip("made");
	renderStrip("proof");
	document.querySelectorAll("[data-strip]").forEach(function (btn) {
		btn.addEventListener("click", function () {
			var key = btn.getAttribute("data-strip"),
				dir = +btn.getAttribute("data-dir");
			var s = strips[key];
			s.idx = (s.idx + dir + s.data.length) % s.data.length;
			renderStrip(key);
		});
	});
	// auto-advance made strip
	setInterval(function () {
		var s = strips.made;
		s.idx = (s.idx + 1) % s.data.length;
		renderStrip("made");
	}, 4000);

	// --- pricing toggle ---
	var pt = document.getElementById("pricingToggle");
	pt &&
		pt.querySelectorAll("button").forEach(function (b) {
			b.addEventListener("click", function () {
				pt.querySelectorAll("button").forEach(function (x) {
					x.classList.remove("active");
				});
				b.classList.add("active");
				var cycle = b.getAttribute("data-cycle");
				document.querySelectorAll(".price-card").forEach(function (card) {
					var val = card.querySelector(".amt-val"),
						suf = card.querySelector(".amt-suf");
					val.textContent =
						cycle === "2"
							? val.getAttribute("data-y")
							: val.getAttribute("data-m");
					suf.textContent = cycle === "2" ? "/year" : "/month";
				});
			});
		});

	// --- FAQ accordion ---
	var faqs = [
		[
			"How does Gnomie work?",
			"Gnomie uses AI to analyze photos of your garden and provides customized recommendations for plants, flowers, and landscaping that suit your region and preferences.",
		],
		[
			"Is Gnomie suitable for beginners?",
			"Absolutely! Whether you’re new to gardening or have some experience, Gnomie offers tools and suggestions that make it easy to enhance your garden.",
		],
		[
			"Can I use Gnomie for large gardens?",
			"Yes, Gnomie can handle garden designs for any size, from small balconies to large yards. Just provide photos of your space, and we’ll help you design it.",
		],
		[
			"What types of plants does Gnomie recommend?",
			"Gnomie recommends plants that thrive in your specific region and climate. Our AI ensures that the suggestions are tailored to your local environment.",
		],
		[
			"How often should I update my garden design?",
			"It’s a good idea to revisit your garden design seasonally to incorporate new plants or landscaping ideas. Gnomie can help you make updates easily.",
		],
		[
			"Do I need to pay for the full version?",
			"Gnomie offers both free and paid plans. The free plan provides basic features, while the paid plans offer more advanced features and personalized recommendations.",
		],
		[
			"Can I try Gnomie before purchasing?",
			"Yes, we offer a free trial so you can explore Gnomie’s features and see how it works for your garden before committing to a paid plan.",
		],
		[
			"Is my data secure with Gnomie?",
			"Absolutely. We take your privacy seriously and ensure that all your data is encrypted and securely stored. Your garden photos and designs are safe with us.",
		],
		[
			"How do I contact customer support?",
			"You can reach our customer support team via email, live chat on our website, or through our social media channels. We’re here to help with any questions or issues.",
		],
		[
			"What if I’m not satisfied with Gnomie?",
			"If you’re not satisfied with Gnomie, we offer a satisfaction guarantee. You can contact our support team for assistance or to discuss any concerns you might have.",
		],
	];
	var faqList = document.getElementById("faqList");
	if (faqList) {
		faqs.forEach(function (f) {
			var item = document.createElement("div");
			item.className = "faq-item";
			item.innerHTML =
				'<button class="faq-q" aria-expanded="false">' +
				f[0] +
				'<svg class="chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></button>' +
				'<div class="faq-a"><div class="faq-a-inner">' +
				f[1] +
				"</div></div>";
			var btn = item.querySelector(".faq-q"),
				ans = item.querySelector(".faq-a");
			btn.addEventListener("click", function () {
				var open = item.classList.toggle("open");
				btn.setAttribute("aria-expanded", open ? "true" : "false");
				ans.style.maxHeight = open ? ans.scrollHeight + "px" : "0";
			});
			faqList.appendChild(item);
		});
	}

	// --- scroll reveal ---
	var io = new IntersectionObserver(
		function (entries) {
			entries.forEach(function (e) {
				if (e.isIntersecting) {
					e.target.classList.add("in");
					io.unobserve(e.target);
				}
			});
		},
		{ threshold: 0.12 },
	);
	var revealEls = document.querySelectorAll(".reveal");
	revealEls.forEach(function (el) {
		io.observe(el);
	});
	// safety fallback: ensure nothing stays hidden (e.g. for static capture / no-IO)
	setTimeout(function () {
		revealEls.forEach(function (el) {
			el.classList.add("in");
		});
	}, 2500);
})();
