(() => {
	var LOGOS = [
		[
			"Northbank Studio",
			"<svg width='26' height='26' viewBox='0 0 24 24' aria-hidden='true' fill='none' stroke='currentColor' stroke-width='1.8'><path d='M5 12L12 5L19 12L12 19Z'/><circle cx='12' cy='12' r='2'/></svg>",
		],
		[
			"Cedar Works",
			"<svg width='26' height='26' viewBox='0 0 24 24' aria-hidden='true' fill='none' stroke='currentColor' stroke-width='1.8'><rect x='5' y='5' width='14' height='14' rx='3'/><path d='M8 12H16M12 8V16'/></svg>",
		],
		[
			"Morrow Labs",
			"<svg width='26' height='26' viewBox='0 0 24 24' aria-hidden='true' fill='none' stroke='currentColor' stroke-width='1.8'><circle cx='12' cy='12' r='7'/><path d='M8 12L12 8L16 12L12 16Z'/></svg>",
		],
		[
			"Fieldline Collective",
			"<svg width='26' height='26' viewBox='0 0 24 24' aria-hidden='true' fill='none' stroke='currentColor' stroke-width='1.8'><path d='M5 17L12 5L19 17ZM8 17V20M16 17V20'/></svg>",
		],
		[
			"Harbor Foundry",
			"<svg width='26' height='26' viewBox='0 0 24 24' aria-hidden='true' fill='none' stroke='currentColor' stroke-width='1.8'><path d='M5 8H19V16H5ZM8 5V19M16 5V19'/></svg>",
		],
		[
			"Ember House",
			"<svg width='26' height='26' viewBox='0 0 24 24' aria-hidden='true' fill='none' stroke='currentColor' stroke-width='1.8'><circle cx='8' cy='12' r='4'/><circle cx='16' cy='12' r='4'/></svg>",
		],
		[
			"Birch Guild",
			"<svg width='26' height='26' viewBox='0 0 24 24' aria-hidden='true' fill='none' stroke='currentColor' stroke-width='1.8'><path d='M6 18V6H18V18ZM6 6L18 18M18 6L6 18'/></svg>",
		],
	];
	function logoItem(l) {
		return `<div class="item">${l[1]}<span>${l[0]}</span></div>`;
	}
	var marquee = document.getElementById("logoMarquee");
	if (marquee) {
		var seq = LOGOS.map(logoItem).join("");
		marquee.innerHTML = seq + seq;
	}
	var QUOTES = [
		[
			"We localized our entire launch into 12 languages in an afternoon. What used to take a contractor agency three weeks now ships before lunch.",
			"Maya R.",
			"Head of Growth, Tideflow",
		],
		[
			"I record the demo, hit generate, and the voiceover sounds like a real narrator. Our trial-to-paid jumped 31% after switching.",
			"Dev P.",
			"Founder, Stacklight",
		],
		[
			"Lumen replaced our whole launch checklist. Video, copy, social ,  all from one screen capture. It feels illegal.",
			"Aisha K.",
			"PMM, Northwind",
		],
		[
			"The analytics view tells us which language and channel is converting, then suggests the next cut. It's basically a growth teammate.",
			"Leo M.",
			"Marketing Lead, Orbit",
		],
		[
			"Our changelog videos used to sit in a backlog forever. Now every release ships with a polished demo, automatically.",
			"Sara T.",
			"Product, Loomfield",
		],
		[
			"We're a two-person team. Lumen makes our launches look like they came out of a 20-person marketing department.",
			"Tom B.",
			"Co-founder, Brightfox",
		],
	];
	function tCard(q) {
		return (
			'<div class="t-card"><p>“' +
			q[0] +
			'”</p><div class="who"><div class="mono-av">' +
			q[1][0] +
			"</div><div><b>" +
			q[1] +
			"</b><small>" +
			q[2] +
			"</small></div></div></div>"
		);
	}
	var t1 = document.getElementById("track1");
	var t2 = document.getElementById("track2");
	if (t1) {
		var a = QUOTES.slice(0, 3).map(tCard).join("");
		t1.innerHTML = a + a;
	}
	if (t2) {
		var b = QUOTES.slice(3).map(tCard).join("");
		t2.innerHTML = b + b;
	}
	var burger = document.getElementById("burger");
	var menu = document.getElementById("mobileMenu");
	if (burger && menu) {
		burger.addEventListener("click", () => {
			var open = burger.classList.toggle("open");
			menu.classList.toggle("open", open);
			burger.setAttribute("aria-expanded", open ? "true" : "false");
		});
		menu.querySelectorAll("a").forEach((a) => {
			a.addEventListener("click", () => {
				burger.classList.remove("open");
				menu.classList.remove("open");
				burger.setAttribute("aria-expanded", "false");
			});
		});
	}
	document.querySelectorAll(".faq-item").forEach((item) => {
		var q = item.querySelector(".faq-q");
		var a = item.querySelector(".faq-a");
		q.addEventListener("click", () => {
			var open = item.classList.toggle("open");
			a.style.maxHeight = open ? `${a.scrollHeight}px` : "0px";
		});
	});
	var sw = document.getElementById("switch");
	var labM = document.getElementById("labM");
	var labY = document.getElementById("labY");
	if (sw) {
		sw.addEventListener("click", () => {
			var year = sw.classList.toggle("year");
			labM.classList.toggle("on", !year);
			labY.classList.toggle("on", year);
			document.querySelectorAll(".price span[data-m]").forEach((el) => {
				el.textContent = year
					? el.getAttribute("data-y")
					: el.getAttribute("data-m");
			});
		});
	}
	var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	var reveals = document.querySelectorAll(".reveal");
	if (reduce || !("IntersectionObserver" in window)) {
		reveals.forEach((r) => {
			r.classList.add("show");
		});
	} else {
		var io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e, i) => {
					if (e.isIntersecting) {
						var el = e.target;
						setTimeout(
							() => {
								el.classList.add("show");
							},
							Math.min(i * 70, 240),
						);
						io.unobserve(el);
					}
				});
			},
			{
				threshold: 0.12,
				rootMargin: "0px 0px -8% 0px",
			},
		);
		reveals.forEach((r) => {
			io.observe(r);
		});
	}
})();
