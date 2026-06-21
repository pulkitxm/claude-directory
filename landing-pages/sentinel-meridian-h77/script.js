(() => {
	var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	/* ---- Nav scroll state ---- */
	var nav = document.getElementById("nav");
	function onScroll() {
		if (window.scrollY > 40) nav.classList.add("scrolled");
		else nav.classList.remove("scrolled");
	}
	window.addEventListener("scroll", onScroll, { passive: true });
	onScroll();

	/* ---- Mobile drawer ---- */
	var menuBtn = document.getElementById("navMenu");
	var drawer = document.getElementById("navDrawer");
	menuBtn.addEventListener("click", () => {
		var open = drawer.classList.toggle("open");
		menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
	});
	drawer.querySelectorAll("a").forEach((a) => {
		a.addEventListener("click", () => {
			drawer.classList.remove("open");
			menuBtn.setAttribute("aria-expanded", "false");
		});
	});

	/* ---- Live UTC clock ---- */
	var utcEl = document.getElementById("utc");
	function pad(n) {
		return n < 10 ? `0${n}` : `${n}`;
	}
	function tick() {
		var d = new Date();
		utcEl.textContent =
			pad(d.getUTCHours()) +
			":" +
			pad(d.getUTCMinutes()) +
			":" +
			pad(d.getUTCSeconds()) +
			" UTC";
	}
	tick();
	setInterval(tick, 1000);

	/* ---- Hero mouse parallax ---- */
	var heroImg = document.getElementById("heroImg");
	var hero = document.getElementById("hero");
	if (!reduce && heroImg && hero) {
		hero.addEventListener("mousemove", (e) => {
			var mx = (e.clientX / window.innerWidth - 0.5) * 16;
			var my = (e.clientY / window.innerHeight - 0.5) * 16;
			heroImg.style.transform = `scale(1.06) translate(${mx}px,${my}px)`;
		});
		hero.addEventListener("mouseleave", () => {
			heroImg.style.transform = "scale(1)";
		});
	}

	/* ---- Ticker feed ---- */
	var feed = [
		["SIGNAL", "51°30′58″N 0°07′12″W LONDON DESK ACTIVE"],
		["REDACT", "██████ SOVEREIGN MANDATE — SEALED"],
		["MARKET", "VOLATILITY INDEX ↗ +4.1 · LIQUIDITY HOLD"],
		["SIGNAL", "01°21′10″N 103°51′21″E SINGAPORE NODE"],
		["BRIEF", "TIER–1 DOSSIER CIRCULATED · 14 RECIPIENTS"],
		["REDACT", "████ COUNTER-INTEL · NON-ATTRIBUTABLE"],
		["SIGNAL", "40°42′46″N 74°00′21″W NEW YORK CHANNEL SECURE"],
	];
	var track = document.getElementById("tickerTrack");
	function buildTicker() {
		var html = "";
		for (var pass = 0; pass < 2; pass++) {
			for (var i = 0; i < feed.length; i++) {
				var redact = feed[i][0] === "REDACT";
				html +=
					'<span class="ticker__item"><b>' +
					feed[i][0] +
					'</b><span class="' +
					(redact ? "rd" : "") +
					'">' +
					feed[i][1] +
					"</span></span>";
			}
		}
		track.innerHTML = html;
	}
	buildTicker();

	/* ---- Scroll reveal ---- */
	var io = new IntersectionObserver(
		(entries) => {
			entries.forEach((en) => {
				if (!en.isIntersecting) return;
				var el = en.target;
				if (el.classList.contains("stagger")) {
					var kids = el.children;
					for (var i = 0; i < kids.length; i++) {
						kids[i].style.transitionDelay = `${i * 0.12}s`;
					}
				}
				el.classList.add("in");
				io.unobserve(el);
			});
		},
		{ threshold: 0.16, rootMargin: "0px 0px -40px 0px" },
	);

	document.querySelectorAll(".reveal, .stagger").forEach((el) => {
		io.observe(el);
	});

	/* ---- Stat count-up ---- */
	function animateStat(el) {
		var target = parseFloat(el.getAttribute("data-count"));
		var prefix = el.getAttribute("data-prefix") || "";
		var suffix = el.getAttribute("data-suffix") || "";
		if (reduce) {
			el.textContent = prefix + target + suffix;
			return;
		}
		var dur = 1500,
			start = null;
		function frame(t) {
			if (!start) start = t;
			var p = Math.min((t - start) / dur, 1);
			var eased = 1 - (1 - p) ** 3;
			el.textContent = prefix + Math.round(target * eased) + suffix;
			if (p < 1) requestAnimationFrame(frame);
		}
		requestAnimationFrame(frame);
	}
	var statIO = new IntersectionObserver(
		(entries) => {
			entries.forEach((en) => {
				if (!en.isIntersecting) return;
				animateStat(en.target);
				statIO.unobserve(en.target);
			});
		},
		{ threshold: 0.6 },
	);
	document.querySelectorAll(".stat__num[data-count]").forEach((el) => {
		statIO.observe(el);
	});
})();
