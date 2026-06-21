(() => {
	document.addEventListener("DOMContentLoaded", () => {
		/* ---- Reveal on scroll ---- */
		var io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						e.target.classList.add("is-visible");
						io.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.12 },
		);
		document.querySelectorAll(".reveal").forEach((el) => {
			io.observe(el);
		});

		/* ---- Seamless marquee: duplicate the track ---- */
		var marquee = document.getElementById("marquee");
		if (marquee) {
			var cards = Array.prototype.slice.call(marquee.children);
			cards.forEach((c) => {
				var clone = c.cloneNode(true);
				clone.setAttribute("aria-hidden", "true");
				marquee.appendChild(clone);
			});
		}

		/* ---- Accordion + cross-fade image ---- */
		var accItems = document.querySelectorAll(".acc-item");
		var slides = document.querySelectorAll("#advMedia .slide");
		accItems.forEach((item) => {
			item.querySelector(".acc-title").addEventListener("click", () => {
				var i = parseInt(item.getAttribute("data-i"), 10);
				accItems.forEach((it) => {
					it.classList.remove("active");
				});
				slides.forEach((s) => {
					s.classList.remove("active");
				});
				item.classList.add("active");
				if (slides[i]) slides[i].classList.add("active");
			});
		});

		/* ---- Custom cursor (desktop only) ---- */
		var cursor = document.getElementById("cursor");
		if (cursor && window.matchMedia("(pointer:fine)").matches) {
			var cx = window.innerWidth / 2,
				cy = window.innerHeight / 2;
			var x = cx,
				y = cy;
			window.addEventListener("mousemove", (e) => {
				cx = e.clientX;
				cy = e.clientY;
			});
			(function loop() {
				x += (cx - x) * 0.2;
				y += (cy - y) * 0.2;
				cursor.style.transform = `translate(${x}px,${y}px)`;
				requestAnimationFrame(loop);
			})();
			// grow over interactive elements
			document.querySelectorAll("a, button").forEach((el) => {
				el.addEventListener("mouseenter", () => {
					cursor.style.width = "34px";
					cursor.style.height = "34px";
					cursor.style.margin = "-17px 0 0 -17px";
					cursor.style.opacity = ".65";
				});
				el.addEventListener("mouseleave", () => {
					cursor.style.width = "10px";
					cursor.style.height = "10px";
					cursor.style.margin = "-5px 0 0 -5px";
					cursor.style.opacity = "1";
				});
			});
		} else if (cursor) {
			cursor.style.display = "none";
		}

		/* ---- Mobile menu ---- */
		var mMenu = document.getElementById("mMenu");
		document.getElementById("menuOpen").addEventListener("click", () => {
			mMenu.classList.add("open");
		});
		document.getElementById("menuClose").addEventListener("click", () => {
			mMenu.classList.remove("open");
		});
		mMenu.querySelectorAll("a").forEach((a) => {
			a.addEventListener("click", () => {
				mMenu.classList.remove("open");
			});
		});
	});
})();
