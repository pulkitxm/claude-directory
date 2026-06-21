/* ===== LUMEN LAUNCH — interactions ===== */
(() => {
	/* ---- brand logos (inline SVG, duplicated for seamless marquee) ---- */
	var LOGOS = [
		[
			"Microsoft",
			'<svg width="26" height="26" viewBox="0 0 23 23"><path d="M0 0h11v11H0z" fill="#F25022"/><path d="M12 0h11v11H12z" fill="#7FBA00"/><path d="M0 12h11v11H0z" fill="#00A4EF"/><path d="M12 12h11v11H12z" fill="#FFB900"/></svg>',
		],
		[
			"Google",
			'<svg width="26" height="26" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>',
		],
		[
			"Amazon",
			'<svg width="30" height="26" viewBox="0 0 40 24"><path d="M24.5 17.9c-4.7 3.5-11.5 5.3-17.4 5.3-8.2 0-15.6-3-21.2-8.1-.4-.4-.1-1 .5-.7 5.8 3.4 13 5.4 20.4 5.4 5 0 10.5-1 15.5-3.1.8-.3 1.4.5.7 1.2z" fill="#FF9900"/><path d="M22.4 11.5c-.8-1-4.8-1.4-7-.7-3.3 1-4.7 3.7-4.7 6.2 0 3.3 2.1 5.2 4.7 5.2 2.1 0 3.8-1 5-2.5.4-.5.1-1.2-.4-.9-1.2.7-2.8 1.2-4.3 1.2-2.2 0-3.9-1.7-3.9-4.2 0-2.6 1.7-4.8 4.2-5.5 1.7-.4 4.2-.1 5.4.8.5.3 1 0 1-.6z" fill="#221F1F"/></svg>',
		],
		[
			"Salesforce",
			'<svg width="28" height="26" viewBox="0 0 24 24"><path d="M10 5.4a3.8 3.8 0 013.2-1.8 3.8 3.8 0 013.6 2.6A4.6 4.6 0 0121.8 10.8c0 2.5-2 4.6-4.6 4.6a4.5 4.5 0 01-2.9-1 3.8 3.8 0 01-3.5 2.2 3.8 3.8 0 01-3.6-2.6A4.6 4.6 0 012.2 9c0-2.5 2-4.6 4.6-4.6a4.5 4.5 0 012.2.6z" fill="#00A1E0"/></svg>',
		],
		[
			"Adobe",
			'<svg width="26" height="26" viewBox="0 0 24 24"><path d="M14 22.6l-1.7-4.3H4.2l-.3 4.3H.05L.33 3h7.85L14 22.6zM10.6 14.8L8.2 7.6l-.3 7.2h2.7z" fill="#FA0F00"/></svg>',
		],
		[
			"Shopify",
			'<svg width="24" height="26" viewBox="0 0 24 24"><path d="M15.3 2.4c0-.1-.1-.1-.2-.1H13.9s-1-1-1.1-1.1c-.1-.1-.3-.1-.4 0 0 0-.2.1-.5.2-.1-.2-.2-.5-.3-.7C11 .1 10.5-.1 10 0c-.1.1-.2.2-.3.2-.8.1-1.2 1.1-1.4 1.7-.4.1-.6.2-.6.2-.4.1-.4.1-.5.5C7.1 2.8 5.5 14.6 5.5 14.6l9.8 1.9V2.5c0-.1 0-.1 0-.1z" fill="#95BF47"/><path d="M15.2 2.3H13.9s-1-1-1.1-1.1V19.7l9.8-1.9S20.3 3.2 20.3 2.7c-.1-.4-.1-.4-.5-.5 0 0-.3-.1-.6-.2 0 0-.2-.1-.4-.3-.1-.1-.3-.1-.4 0 0 0-.2.1-.5.2-.1-.2-.2-.5-.3-.7-.5-1-1.3-1.5-2.2-1.5h-.1v6.7l.1-.4z" fill="#5E8E3E"/></svg>',
		],
		[
			"Stripe",
			'<svg width="30" height="22" viewBox="0 0 40 17"><path fill-rule="evenodd" clip-rule="evenodd" d="M20 0a10 10 0 100 20 10 10 0 000-20zm2.2 13.5c-.9 0-1.7-.3-2.3-.8l.3-1.5c.7.5 1.4.8 2.2.8.6 0 1-.3 1-.7 0-.4-.4-.7-1.3-1-1.6-.5-2.5-1.3-2.5-2.6 0-1.6 1.1-2.8 3.1-2.8.9 0 1.7.2 2.2.5l-.3 1.5c-.4-.3-1-.5-1.8-.5-.7 0-1 .3-1 .7 0 .4.5.7 1.4 1 1.7.5 2.4 1.3 2.4 2.6 0 1.5-1.2 2.8-3.4 2.8z" fill="#635BFF"/></svg>',
		],
	];

	function logoItem(l) {
		return `<div class="item">${l[1]}<span>${l[0]}</span></div>`;
	}
	var marquee = document.getElementById("logoMarquee");
	if (marquee) {
		var seq = LOGOS.map(logoItem).join("");
		marquee.innerHTML = seq + seq; // duplicate => -50% loop
	}

	/* ---- testimonials ---- */
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
			"Lumen replaced our whole launch checklist. Video, copy, social — all from one screen capture. It feels illegal.",
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

	/* ---- mobile menu ---- */
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

	/* ---- FAQ accordion ---- */
	document.querySelectorAll(".faq-item").forEach((item) => {
		var q = item.querySelector(".faq-q");
		var a = item.querySelector(".faq-a");
		q.addEventListener("click", () => {
			var open = item.classList.toggle("open");
			a.style.maxHeight = open ? `${a.scrollHeight}px` : "0px";
		});
	});

	/* ---- pricing toggle ---- */
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

	/* ---- scroll reveal ---- */
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
			{ threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
		);
		reveals.forEach((r) => {
			io.observe(r);
		});
	}
})();
