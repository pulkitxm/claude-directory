/* ============================================================
   POCKET — vanilla JS shim (home page behaviours)
   ============================================================ */
(function () {
	"use strict";

	/* ---------- logo mark (cyan split circle) ---------- */
	var LOGO =
		'<svg viewBox="0 0 40 40" aria-hidden="true">' +
		'<path fill="#00b7d7" fill-rule="evenodd" clip-rule="evenodd" d="M20 40C8.954 40 0 31.046 0 20S8.954 0 20 0s20 8.954 20 20-8.954 20-20 20ZM4 20c0 7.264 5.163 13.321 12.02 14.704C17.642 35.03 19 33.657 19 32V8c0-1.657-1.357-3.031-2.98-2.704C9.162 6.68 4 12.736 4 20Z"/></svg>';
	document.querySelectorAll("[data-logo]").forEach(function (el) {
		el.innerHTML = LOGO;
	});

	/* ---------- background illustration (concentric circles) ---------- */
	var bg = "";
	for (var r = 1; r <= 7; r++) {
		var rad = 116 + r * 56;
		bg +=
			'<circle cx="513" cy="513" r="' +
			rad +
			'" stroke="currentColor" stroke-opacity="0.7"/>';
	}
	document.querySelectorAll("[data-bgillus]").forEach(function (el) {
		el.innerHTML = bg;
		el.setAttribute("stroke-width", "1");
		el.classList.add("spin-slow");
	});

	/* ---------- news logos ---------- */
	var LOGOS = [
		"forbes",
		"techcrunch",
		"wired",
		"cnn",
		"bbc",
		"cbs",
		"fast-company",
		"huffpost",
	];
	var cloud = document.querySelector("[data-logos]");
	if (cloud) {
		LOGOS.forEach(function (n) {
			cloud.innerHTML +=
				'<li><img src="assets/logos/' + n + '.svg" alt="' + n + '" /></li>';
		});
	}

	/* ---------- app screens ---------- */
	function inviteScreen() {
		return appShell(
			"Invite people",
			'<span class="app__sub">Get tips <b>5s sooner</b> for every invite.</span>',
			'<div class="app-field"><label>Full name</label><div class="v">Albert H. Wiggin</div></div>' +
				'<div class="app-field"><label>Email address</label><div class="v">awiggin@chase.com</div></div>' +
				'<button class="app-btn">Invite person</button>',
		);
	}
	var STOCKS = [
		["Laravel", "4,098.01", "+4.98%", "up", "#ff2d20"],
		["Tuple", "5,451.10", "-3.38%", "down", "#5a67d8"],
		["Transistor", "4,098.41", "+6.25%", "up", "#2563eb"],
		["Diageo", "250.65", "+1.25%", "up", "#4338ca"],
		["StaticKit", "250.65", "-3.38%", "down", "#171717"],
		["Statamic", "5,040.85", "-3.11%", "down", "#00b7d7"],
		["Mirage", "140.44", "+9.09%", "up", "#16a34a"],
		["Reversable", "550.60", "-1.25%", "down", "#737373"],
	];
	function stocksScreen() {
		var rows = STOCKS.map(function (s) {
			return (
				'<div class="stock-row"><span class="stock-ic" style="background:' +
				s[4] +
				'">' +
				s[0][0] +
				"</span>" +
				'<span class="stock-name">' +
				s[0] +
				"</span>" +
				'<span class="stock-vals"><div class="stock-price">' +
				s[1] +
				"</div>" +
				'<div class="stock-pct ' +
				s[3] +
				'">' +
				s[2] +
				"</div></span></div>"
			);
		}).join("");
		return (
			'<div class="app__bar"><div class="app__bar-top">' +
			hamburgerIcon() +
			'<span class="logo" style="gap:.4rem"><span class="logo__mark" data-logo></span><span class="logo__word">Pocket</span></span>' +
			userIcon() +
			"</div>" +
			'<div class="app__title">Stocks</div><div class="app__sub">March 9, 2022</div></div>' +
			'<div class="app__body app-body--list">' +
			rows +
			"</div>"
		);
	}
	function investScreen() {
		return appShell(
			"Buy $LA",
			'<span class="app__sub"><b>$34.28</b> per share</span>',
			'<div class="buy-row"><span class="k">Number of shares</span><span class="v">100</span></div>' +
				'<div class="buy-row"><span class="k">Current market price</span><span class="v">$34.28 <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12L12 4M12 4H6M12 4v6"/></svg></span></div>' +
				'<div class="buy-row"><span class="k">Estimated cost</span><span class="v">$3,428.00</span></div>' +
				'<button class="app-btn">Buy shares</button>',
		);
	}
	function demoScreen() {
		return (
			'<div class="app__bar"><div class="app__bar-top">' +
			hamburgerIcon() +
			'<span class="logo" style="gap:.4rem"><span class="logo__mark" data-logo></span><span class="logo__word">Pocket</span></span>' +
			userIcon() +
			"</div></div>" +
			'<div class="app__body" style="padding-top:0;gap:0">' +
			'<div class="demo__top"><span class="demo__name"><b>Tailwind Labs, Inc.</b> $CSS</span>' +
			plusIcon() +
			"</div>" +
			'<div class="demo__price-row"><span class="demo__price">752.56 <small>USD</small></span><span class="demo__chg">+12.21%</span></div>' +
			'<div class="demo__ranges"><span>1D</span><span>5D</span><span class="on">1M</span><span>6M</span><span>1Y</span><span>5Y</span></div>' +
			'<div class="demo__chart">' +
			chartSvg() +
			"</div>" +
			'<div class="demo__trade">Trade</div>' +
			'<div class="demo__stats"><div><div class="k">Open</div><div class="v">6,387.55</div></div>' +
			'<div><div class="k">Closed</div><div class="v">6,487.09</div></div>' +
			'<div><div class="k">Low</div><div class="v">6,322.01</div></div></div></div>'
		);
	}
	function appShell(title, sub, body) {
		return (
			'<div class="app__bar"><div class="app__bar-top">' +
			hamburgerIcon() +
			'<span class="logo" style="gap:.4rem"><span class="logo__mark" data-logo></span><span class="logo__word">Pocket</span></span>' +
			userIcon() +
			"</div>" +
			'<div class="app__title">' +
			title +
			"</div>" +
			sub +
			"</div>" +
			'<div class="app__body">' +
			body +
			"</div>"
		);
	}
	function hamburgerIcon() {
		return '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
	}
	function userIcon() {
		return '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke-width="2"><circle cx="12" cy="8" r="3.2"/><path d="M5.5 20a6.5 6.5 0 0 1 13 0"/></svg>';
	}
	function plusIcon() {
		return '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#171717" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>';
	}
	function chartSvg() {
		return (
			'<svg viewBox="0 0 320 180" fill="none" preserveAspectRatio="none">' +
			'<defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#00b7d7" stop-opacity="0.3"/><stop offset="1" stop-color="#00b7d7" stop-opacity="0"/></linearGradient></defs>' +
			'<path d="M0 30 L20 70 L40 50 L60 95 L80 80 L100 120 L120 100 L140 135 L160 150 L180 130 L200 145 L220 120 L240 140 L260 110 L280 125 L300 95 L320 105 V180 H0 Z" fill="url(#cg)"/>' +
			'<path d="M0 30 L20 70 L40 50 L60 95 L80 80 L100 120 L120 100 L140 135 L160 150 L180 130 L200 145 L220 120 L240 140 L260 110 L280 125 L300 95 L320 105" stroke="#00b7d7" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/></svg>'
		);
	}
	var SCREENS = {
		demo: demoScreen,
		invite: inviteScreen,
		stocks: stocksScreen,
		invest: investScreen,
	};
	document.querySelectorAll("[data-screen]").forEach(function (el) {
		var fn = SCREENS[el.getAttribute("data-screen")];
		if (fn) el.innerHTML = fn();
	});
	// re-render any nested logo marks injected inside screens
	document.querySelectorAll("[data-screen] [data-logo]").forEach(function (el) {
		el.innerHTML = LOGO;
	});

	/* ---------- secondary features ---------- */
	var icon = function (p) {
		return (
			'<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
			p +
			"</svg>"
		);
	};
	var SFEAT = [
		[
			"Invest any amount",
			"Whether it's $1 or $1,000,000, we can put your money to work for you.",
			'<path d="M16 4v24M22 9.5c0-2-2.7-3.5-6-3.5s-6 1.5-6 3.5 2.7 3.5 6 4 6 2 6 4-2.7 3.5-6 3.5-6-1.5-6-3.5"/>',
		],
		[
			"Build a balanced portfolio",
			"Invest in different industries to find the most opportunities to win huge.",
			'<path d="M4 28h24M9 28V14M16 28V8M23 28V18"/>',
		],
		[
			"Trade in real-time",
			"Get insider tips on big stock moves and act on them within seconds.",
			'<path d="M16 6v10l6 4M16 28A12 12 0 1 0 16 4a12 12 0 0 0 0 24Z"/>',
		],
		[
			"Profit from your network",
			"Invite new insiders to get tips faster and beat even other Pocket users.",
			'<circle cx="12" cy="11" r="4"/><path d="M4 27a8 8 0 0 1 16 0M22 8a4 4 0 0 1 0 7M28 27a8 8 0 0 0-6-7.7"/>',
		],
		[
			"Encrypted and anonymized",
			"Cutting-edge security technology that even the NSA doesn't know about keeps you hidden.",
			'<rect x="7" y="14" width="18" height="14" rx="2"/><path d="M11 14v-3a5 5 0 0 1 10 0v3"/>',
		],
		[
			"Portfolio tracking",
			"Watch your investments grow exponentially, leaving other investors in the dust.",
			'<path d="M4 24l7-8 5 5 10-12M21 9h5v5"/>',
		],
	];
	var sfeat = document.querySelector("[data-sfeat]");
	if (sfeat) {
		sfeat.innerHTML = SFEAT.map(function (f) {
			return (
				'<li class="sfeat__card">' +
				icon(f[2]) +
				"<h3>" +
				f[0] +
				"</h3><p>" +
				f[1] +
				"</p></li>"
			);
		}).join("");
	}

	/* ---------- reviews ---------- */
	var REVIEWS = [
		[
			"It really works.",
			"I downloaded Pocket today and turned $5000 into $25,000 in half an hour.",
			"CrazyInvestor",
		],
		[
			"You need this app.",
			"I didn't understand the stock market at all before Pocket. I still don't, but at least I'm rich now.",
			"CluelessButRich",
		],
		[
			"This shouldn't be legal.",
			"Pocket makes it so easy to win big in the stock market that I can't believe it's actually legal.",
			"LivingDaDream",
		],
		[
			"Screw financial advisors.",
			"I barely made any money investing in mutual funds. With Pocket, I'm doubling my net-worth every single month.",
			"JordanBelfort1962",
		],
		[
			"I love it!",
			"I started providing insider information myself and now I get new insider tips every 5 minutes. I don't even have time to act on all of them. New Lamborghini is being delivered next week!",
			"MrBurns",
		],
		[
			"Too good to be true.",
			"I was making money so fast with Pocket that it felt like a scam. But I sold my shares and withdrew the money and it's really there, right in my bank account. This app is crazy!",
			"LazyRich99",
		],
		[
			"Wish I could give 6 stars",
			"This is literally the most important app you will ever download in your life. Get on this before it's so popular that everyone else is getting these tips too.",
			"SarahLuvzCash",
		],
		[
			"Bought an island.",
			"Yeah, you read that right. Want your own island too? Get Pocket.",
			"ScroogeMcduck",
		],
		[
			"No more debt!",
			"After 2 weeks of trading on Pocket I was debt-free. Why did I even go to school at all when Pocket exists?",
			"BruceWayne",
		],
		[
			"I'm 13 and I'm rich.",
			"I love that with Pocket's transaction anonymization I could sign up and start trading when I was 12 years old. I had a million dollars before I had armpit hair!",
			"RichieRich",
		],
		[
			"Started an investment firm.",
			"I charge clients a 3% management fee and just throw all their investments into Pocket. Easy money!",
			"TheCountOfMonteChristo",
		],
		[
			"It's like a superpower.",
			"Every tip Pocket has sent me has paid off. It's like playing Blackjack but knowing exactly what card is coming next!",
			"ClarkKent",
		],
		[
			"Quit my job.",
			"I downloaded Pocket three days ago and quit my job today. I can't believe no one else thought to build a stock trading app that works this way!",
			"GeorgeCostanza",
		],
		[
			"Don't download this app",
			"Unless you want to have the best life ever! I am literally writing this from a yacht.",
			"JeffBezos",
		],
	];
	var STAR =
		'<svg viewBox="0 0 20 20" fill="currentColor"><path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.4 4.3a1 1 0 0 0 .95.69h4.52c.97 0 1.37 1.24.59 1.81l-3.66 2.66a1 1 0 0 0-.36 1.12l1.4 4.3c.3.92-.76 1.69-1.54 1.12l-3.66-2.66a1 1 0 0 0-1.18 0l-3.66 2.66c-.78.57-1.84-.2-1.54-1.12l1.4-4.3a1 1 0 0 0-.36-1.12L1.08 9.74c-.78-.57-.38-1.81.59-1.81h4.52a1 1 0 0 0 .95-.69l1.4-4.3Z"/></svg>';
	function reviewCard(r) {
		return (
			'<figure class="review"><figcaption class="review__title">' +
			r[0] +
			"</figcaption>" +
			'<div class="review__stars">' +
			STAR +
			STAR +
			STAR +
			STAR +
			STAR +
			"</div>" +
			'<blockquote class="review__body">' +
			r[1] +
			"</blockquote>" +
			'<p class="review__author">@' +
			r[2] +
			"</p></figure>"
		);
	}
	var rwrap = document.querySelector("[data-reviews]");
	if (rwrap) {
		// 3 columns; distribute reviews; duplicate track for seamless marquee
		var cols = [[], [], []];
		REVIEWS.forEach(function (r, i) {
			cols[i % 3].push(r);
		});
		var durs = ["62s", "74s", "56s"];
		cols.forEach(function (col, ci) {
			var cards = col.concat(col).map(reviewCard).join("");
			rwrap.innerHTML +=
				'<div class="reviews__col"><div class="reviews__track" style="--dur:' +
				durs[ci] +
				'">' +
				cards +
				"</div></div>";
		});
	}

	/* ---------- pricing ---------- */
	var PLANS = [
		{
			name: "Starter",
			price: { m: "$0", a: "$0" },
			desc: "You're new to investing but want to do it right. Get started for free.",
			features: [
				"Commission-free trading",
				"Multi-layered encryption",
				"One tip every day",
				"Invest up to $1,500 each month",
			],
			cta: "Get started for free",
			featured: false,
		},
		{
			name: "Investor",
			price: { m: "$7", a: "$70" },
			desc: "You've been investing for a while. Invest more and grow your wealth faster.",
			features: [
				"Commission-free trading",
				"Multi-layered encryption",
				"One tip every hour",
				"Invest up to $15,000 each month",
				"Basic transaction anonymization",
			],
			cta: "Subscribe",
			featured: false,
		},
		{
			name: "VIP",
			price: { m: "$199", a: "$1,990" },
			desc: "You've got a huge amount of assets but it's not enough. To the moon.",
			features: [
				"Commission-free trading",
				"Multi-layered encryption",
				"Real-time tip notifications",
				"No investment limits",
				"Advanced transaction anonymization",
				"Automated tax-loss harvesting",
			],
			cta: "Subscribe",
			featured: true,
		},
	];
	// circled check: outline circle + check, matching the reference
	var CHECK =
		'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M8.5 12.5l2.5 2.5 4.5-5"/></svg>';
	var plansEl = document.querySelector("[data-plans]");
	function renderPlans(period) {
		if (!plansEl) return;
		plansEl.innerHTML = PLANS.map(function (p) {
			return (
				'<section class="plan' +
				(p.featured ? " plan--featured" : "") +
				'">' +
				'<div class="plan__head"><span class="logo__mark" data-logo></span><h3 class="plan__name">' +
				p.name +
				"</h3></div>" +
				'<p class="plan__price" data-price="' +
				p.name +
				'">' +
				(period === "annually" ? p.price.a : p.price.m) +
				"</p>" +
				'<p class="plan__desc">' +
				p.desc +
				"</p>" +
				'<a href="register.html" class="plan__btn ' +
				(p.featured ? "plan__btn--cyan" : "plan__btn--dark") +
				'" aria-label="Get started with the ' +
				p.name +
				' plan">' +
				p.cta +
				"</a>" +
				'<ul class="plan__list">' +
				p.features
					.map(function (f) {
						return "<li>" + CHECK + "<span>" + f + "</span></li>";
					})
					.join("") +
				"</ul>" +
				"</section>"
			);
		}).join("");
		// re-inject logo marks inside plan heads
		plansEl.querySelectorAll("[data-logo]").forEach(function (el) {
			el.innerHTML = LOGO;
		});
	}
	renderPlans("monthly");
	var toggle = document.querySelector(".toggle");
	if (toggle) {
		toggle.querySelectorAll("[data-period-btn]").forEach(function (btn) {
			btn.addEventListener("click", function () {
				var period = btn.getAttribute("data-period-btn");
				toggle.setAttribute("data-period", period);
				toggle.querySelectorAll("[data-period-btn]").forEach(function (b) {
					b.setAttribute("aria-checked", b === btn ? "true" : "false");
				});
				renderPlans(period);
			});
		});
	}

	/* ---------- faqs ---------- */
	var FAQS = [
		[
			"How do I know the tips are good?",
			"Our whole business depends on our tips being good, so it's in our best interest that they are. The results of our customers speak for themselves, just trust us.",
		],
		[
			"Isn't this insider trading?",
			"Yes exactly. But at scale! Historically you could only make insider trades with knowledge from your direct network. Pocket brings you insider trading tips from people you don't even know.",
		],
		[
			"But isn't insider trading illegal?",
			"Here's the thing: you're the one doing the insider trading, not us. We're just giving you the tips and some tools to make trades. We're not doing anything wrong here.",
		],
		[
			"Do the people giving you tips realize what they are doing?",
			"Again I would argue this isn't really our responsibility. People make their own choices. If they don't research the consequences that's on them, not on us.",
		],
		[
			"Where is Pocket based?",
			"Let's just say it's not somewhere where the SEC is going to find us.",
		],
		[
			"Is there any age limit to trading on Pocket?",
			"For our free plan, the age limit is based on the minimum age to trade in your country of residence. Our VIP plan uses advanced transaction anonymization though, so you can use that plan even if you're 9 years old. Or a dog.",
		],
		[
			"How did you get this on the App Store?",
			"Honestly we were surprised too, but eventually we found out that the app reviewer found the app so compelling they approved it just so they could use it themselves.",
		],
		[
			"How do I explain the money I withdraw from Pocket to the IRS?",
			"This feels like one-hundred percent a you problem. Pocket is not responsible in any way for your tax returns.",
		],
		[
			"How do I become an insider?",
			"Contact us with some details about your industry and the type of access you have to apply for an insider account. Once approved, we'll send you a guide on collecting insider information without being detected at work.",
		],
	];
	var faqEl = document.querySelector("[data-faqs]");
	if (faqEl) {
		var fcols = [[], [], []];
		FAQS.forEach(function (f, i) {
			fcols[Math.floor(i / 3)].push(f);
		});
		faqEl.innerHTML = fcols
			.map(function (col) {
				return (
					'<div class="faqs__col">' +
					col
						.map(function (f) {
							return (
								'<div class="faq"><h3>' +
								f[0] +
								"</h3><p>" +
								f[1] +
								"</p></div>"
							);
						})
						.join("") +
					"</div>"
				);
			})
			.join("");
	}

	/* ---------- mobile nav popover ---------- */
	var mnav = document.querySelector(".mobilenav");
	if (mnav) {
		var ham = mnav.querySelector(".hamburger");
		var open = function (state) {
			mnav.classList.toggle("open", state);
			ham.setAttribute("aria-expanded", state ? "true" : "false");
		};
		ham.addEventListener("click", function (e) {
			e.stopPropagation();
			open(!mnav.classList.contains("open"));
		});
		mnav
			.querySelector(".mobilenav__backdrop")
			.addEventListener("click", function () {
				open(false);
			});
		mnav.querySelectorAll(".mobilenav__panel a").forEach(function (a) {
			a.addEventListener("click", function () {
				open(false);
			});
		});
		document.addEventListener("keydown", function (e) {
			if (e.key === "Escape") open(false);
		});
		document.addEventListener("click", function (e) {
			if (!mnav.contains(e.target)) open(false);
		});
	}

	/* ---------- primary features tabs (desktop, auto-rotate) ---------- */
	var tabs = Array.prototype.slice.call(
		document.querySelectorAll(".pfeat__tab"),
	);
	var screens = Array.prototype.slice.call(
		document.querySelectorAll(".pfeat__screen"),
	);
	if (tabs.length) {
		var active = 0,
			timer = null,
			userActed = false;
		function select(i) {
			active = i;
			tabs.forEach(function (t, k) {
				t.setAttribute("aria-selected", k === i ? "true" : "false");
			});
			screens.forEach(function (s, k) {
				s.classList.toggle("active", k === i);
			});
		}
		function startAuto() {
			timer = setInterval(function () {
				if (!userActed) select((active + 1) % tabs.length);
			}, 5000);
		}
		tabs.forEach(function (t, i) {
			t.addEventListener("click", function () {
				userActed = true;
				clearInterval(timer);
				select(i);
			});
		});
		select(0);
		startAuto();
	}

	/* ---------- mobile feature carousel dots ---------- */
	var slides = document.querySelector(".pfeat__slides");
	if (slides) {
		var dots = Array.prototype.slice.call(
			document.querySelectorAll(".pfeat__dots button"),
		);
		dots.forEach(function (d, i) {
			d.addEventListener("click", function () {
				slides.scrollTo({ left: slides.clientWidth * i, behavior: "smooth" });
			});
		});
		slides.addEventListener("scroll", function () {
			var idx = Math.round(slides.scrollLeft / slides.clientWidth);
			dots.forEach(function (d, i) {
				d.classList.toggle("on", i === idx);
			});
		});
	}

	/* ---------- recording mode: pause the continuous marquee so the
     frame-by-frame demo recorder isn't GPU-thrashed on this long page.
     The infinite CSS marquee composites every frame regardless of the
     recorder's virtual clock; pausing it keeps the scroll-through demo
     smooth and fast while staying visually faithful. ---------- */
	(function () {
		var check = function () {
			if (window.__rec) {
				document.documentElement.classList.add("recording");
				return true;
			}
			return false;
		};
		if (!check()) {
			var n = 0,
				iv = setInterval(function () {
					if (check() || ++n > 40) clearInterval(iv);
				}, 100);
		}
	})();

	/* ---------- entrance reveal ---------- */
	var reveals = Array.prototype.slice.call(
		document.querySelectorAll(".reveal"),
	);
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
			{ rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
		);
		reveals.forEach(function (el) {
			io.observe(el);
		});
		// Safety net: anything still hidden after a moment (e.g. full-page render
		// with no scroll) reveals so content is never stuck invisible.
		setTimeout(function () {
			reveals.forEach(function (el) {
				el.classList.add("in");
			});
		}, 1200);
	} else {
		reveals.forEach(function (el) {
			el.classList.add("in");
		});
	}
})();
