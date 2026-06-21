(() => {
	var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	document.addEventListener("DOMContentLoaded", () => {
		/* ---- hero word reveal ---- */
		var h1 = document.querySelector(".hero h1");
		if (h1) {
			var words = h1.querySelectorAll(".word");
			words.forEach((w, i) => {
				w.style.transitionDelay = `${i * 65}ms`;
			});
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					h1.classList.add("in");
				});
			});
		}

		/* ---- header shadow on scroll ---- */
		var header = document.querySelector(".site-header");
		function onScroll() {
			if (window.scrollY > 40) header.classList.add("scrolled");
			else header.classList.remove("scrolled");
		}
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });

		/* ---- mobile menu ---- */
		var burger = document.querySelector(".burger");
		var sheet = document.querySelector(".mobile-sheet");
		if (burger) {
			burger.addEventListener("click", () => {
				document.body.classList.toggle("menu-open");
				var open = document.body.classList.contains("menu-open");
				burger.setAttribute("aria-expanded", open ? "true" : "false");
			});
			sheet.querySelectorAll("a").forEach((a) => {
				a.addEventListener("click", () => {
					document.body.classList.remove("menu-open");
				});
			});
		}

		/* ---- scroll reveal ---- */
		var io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						e.target.classList.add("show");
						io.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.12 },
		);
		document.querySelectorAll(".reveal").forEach((el) => {
			io.observe(el);
		});

		/* ---- count-up stats ---- */
		var cio = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (!e.isIntersecting) return;
					var el = e.target;
					var target = parseFloat(el.getAttribute("data-target"));
					var suffix = el.getAttribute("data-suffix") || "";
					var dec = el.getAttribute("data-dec") === "1";
					if (reduce) {
						el.textContent = (dec ? target.toFixed(0) : target) + suffix;
						cio.unobserve(el);
						return;
					}
					var dur = 1500,
						start = performance.now();
					function tick(now) {
						var p = Math.min((now - start) / dur, 1);
						var eased = 1 - (1 - p) ** 3;
						var val = target * eased;
						el.textContent = Math.round(val) + suffix;
						if (p < 1) requestAnimationFrame(tick);
						else el.textContent = target + suffix;
					}
					requestAnimationFrame(tick);
					cio.unobserve(el);
				});
			},
			{ threshold: 0.5 },
		);
		document.querySelectorAll("[data-target]").forEach((el) => {
			cio.observe(el);
		});

		/* ---- FAQ accordion ---- */
		var items = document.querySelectorAll(".faq-item");
		items.forEach((item) => {
			var q = item.querySelector(".faq-q");
			var a = item.querySelector(".faq-a");
			q.addEventListener("click", () => {
				var isOpen = item.classList.contains("open");
				items.forEach((other) => {
					other.classList.remove("open");
					other.querySelector(".faq-q").setAttribute("aria-expanded", "false");
					other.querySelector(".faq-a").style.maxHeight = null;
				});
				if (!isOpen) {
					item.classList.add("open");
					q.setAttribute("aria-expanded", "true");
					a.style.maxHeight = `${a.scrollHeight}px`;
				}
			});
		});

		/* ---- testimonial rotation ---- */
		var pool = [
			{
				q: "The mock simulations broke down exactly where I lost time. By prelims I had the decisive hour mapped out minute by minute.",
				n: "Aarav Menon",
				r: "UPSC CSE — AIR 212",
				img: "assets/av1.jpg",
			},
			{
				q: "Speed maths and DI drills here are unlike anything else. The mentors treat every test like the real selection board.",
				n: "Ritika Bansal",
				r: "IBPS PO 2024",
				img: "assets/av2.jpg",
			},
			{
				q: "Concept clarity first, then relentless practice. That order is why my reasoning accuracy finally held under pressure.",
				n: "Karan Deshmukh",
				r: "SSC CGL Qualifier",
				img: "assets/av3.jpg",
			},
			{
				q: "The performance analysis sessions found weak spots I never knew I had. Two months later I cleared RRB NTPC.",
				n: "Sneha Pillai",
				r: "RRB NTPC Selected",
				img: "assets/av4.jpg",
			},
		];
		var slots = document.querySelectorAll(".tcard");
		if (slots.length === 2) {
			var i1 = 0,
				i2 = 1;
			function paint(slot, d) {
				var quote = slot.querySelector(".quote");
				var foot = slot.querySelector(".tcard-foot");
				quote.classList.add("fade-out");
				foot.classList.add("fade-out");
				setTimeout(() => {
					quote.textContent = `“${d.q}”`;
					foot.querySelector("img").src = d.img;
					foot.querySelector("img").alt = d.n;
					foot.querySelector(".nm").textContent = d.n;
					foot.querySelector(".rl").textContent = d.r;
					quote.classList.remove("fade-out");
					foot.classList.remove("fade-out");
				}, 450);
			}
			paint(slots[0], pool[0]);
			paint(slots[1], pool[1]);
			if (!reduce) {
				setInterval(() => {
					i1 = (i1 + 2) % pool.length;
					i2 = (i2 + 2) % pool.length;
					if (i1 === i2) i2 = (i2 + 1) % pool.length;
					paint(slots[0], pool[i1]);
					paint(slots[1], pool[i2]);
				}, 6000);
			}
		}

		/* ---- newsletter (demo) ---- */
		var nf = document.querySelector(".news");
		if (nf)
			nf.addEventListener("submit", (e) => {
				e.preventDefault();
				var btn = nf.querySelector("button");
				btn.textContent = "Joined";
				nf.querySelector("input").value = "";
			});
	});
})();
