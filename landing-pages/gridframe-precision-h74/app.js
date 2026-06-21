(() => {
	/* ---------- Scroll reveal ---------- */
	var revealObs = new IntersectionObserver(
		(entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) {
					e.target.classList.add("in");
					revealObs.unobserve(e.target);
				}
			});
		},
		{ threshold: 0.12 },
	);
	document.querySelectorAll("[data-reveal]").forEach((el) => {
		revealObs.observe(el);
	});

	/* ---------- Stat count-up ---------- */
	function runCount(el) {
		var target = parseFloat(el.getAttribute("data-count"));
		var dec = parseInt(el.getAttribute("data-dec") || "0", 10);
		var dur = 1900,
			start = null;
		function step(t) {
			if (!start) start = t;
			var p = Math.min((t - start) / dur, 1);
			var eased = 1 - (1 - p) ** 3;
			el.textContent = (eased * target).toFixed(dec);
			if (p < 1) requestAnimationFrame(step);
			else el.textContent = target.toFixed(dec);
		}
		requestAnimationFrame(step);
	}
	var impact = document.getElementById("impact");
	if (impact) {
		var statObs = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						impact.querySelectorAll("[data-count]").forEach(runCount);
						statObs.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.3 },
		);
		statObs.observe(impact);
	}

	/* ---------- Mega menu ---------- */
	var content = {
		strategy: {
			title: "Methodology",
			desc: "Architectural precision in marketing — we engineer systems, not campaigns.",
			img: "./assets/menu-strategy.jpg",
			c1t: "Approach",
			c1l: [
				"Structural Audit",
				"Growth Blueprint",
				"Position Mapping",
				"Friction Analysis",
			],
			c2t: "Insight",
			c2l: [
				"Case Studies",
				"Strategic Papers",
				"System Design",
				"Success Metrics",
			],
		},
		capabilities: {
			title: "Divisions",
			desc: "Specialized teams operating with surgical precision across every channel.",
			img: "./assets/menu-capabilities.jpg",
			c1t: "Solutions",
			c1l: [
				"Market Intelligence",
				"Brand Engineering",
				"Performance Media",
				"Revenue Ops",
			],
			c2t: "Integration",
			c2l: [
				"API Connectivity",
				"CRM Optimization",
				"Funnel Automation",
				"Data Visualization",
			],
		},
	};

	var mega = document.getElementById("mega");
	var navWrap = document.getElementById("navWrap");
	var mTitle = document.getElementById("mTitle"),
		mDesc = document.getElementById("mDesc"),
		mImg = document.getElementById("mImg"),
		c1t = document.getElementById("c1t"),
		c2t = document.getElementById("c2t"),
		c1l = document.getElementById("c1l"),
		c2l = document.getElementById("c2l");

	function linkMarkup(text) {
		return (
			'<div class="mlink"><div class="mbase">' +
			text +
			"</div>" +
			'<div class="mfill">' +
			text +
			'<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2"/></svg></div></div>'
		);
	}
	function fill(list, arr) {
		list.innerHTML = arr.map(linkMarkup).join("");
	}

	function setMenu(key) {
		var d = content[key];
		if (!d) return;
		mTitle.textContent = d.title;
		mDesc.textContent = d.desc;
		mImg.style.backgroundImage = `url('${d.img}')`;
		c1t.textContent = d.c1t;
		c2t.textContent = d.c2t;
		fill(c1l, d.c1l);
		fill(c2l, d.c2l);
	}

	document.querySelectorAll("[data-menu]").forEach((trig) => {
		trig.addEventListener("mouseenter", () => {
			setMenu(trig.getAttribute("data-menu"));
			mega.classList.add("open");
		});
	});
	if (navWrap) {
		navWrap.addEventListener("mouseleave", () => {
			mega.classList.remove("open");
		});
	}

	/* ---------- Mobile menu ---------- */
	var burger = document.getElementById("burger"),
		mClose = document.getElementById("mClose"),
		mobileMenu = document.getElementById("mobileMenu");
	if (burger)
		burger.addEventListener("click", () => {
			mobileMenu.classList.add("open");
		});
	if (mClose)
		mClose.addEventListener("click", () => {
			mobileMenu.classList.remove("open");
		});
	mobileMenu.querySelectorAll("a").forEach((a) => {
		a.addEventListener("click", () => {
			mobileMenu.classList.remove("open");
		});
	});

	/* ---------- FAQ accordion ---------- */
	document.querySelectorAll(".acc-trig").forEach((trig) => {
		trig.addEventListener("click", () => {
			var item = trig.parentElement;
			var body = item.querySelector(".acc-body");
			var isOpen = item.classList.contains("open");
			document.querySelectorAll(".acc-item").forEach((it) => {
				it.classList.remove("open");
				it.querySelector(".acc-body").style.maxHeight = null;
			});
			if (!isOpen) {
				item.classList.add("open");
				body.style.maxHeight = `${body.scrollHeight}px`;
			}
		});
	});
})();
