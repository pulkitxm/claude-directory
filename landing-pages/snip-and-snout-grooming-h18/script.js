(() => {
	/* ---------- Marquee ---------- */
	var words = [
		"Full Groom",
		"Nail Trim",
		"Deshed",
		"Blowout",
		"Spa Day",
		"Puppy Cuts",
		"Cat Grooming",
		"Teeth Brush",
	];
	var marquee = document.getElementById("marquee");
	if (marquee) {
		var line = "";
		for (var i = 0; i < 2; i++) {
			words.forEach((w) => {
				line += `<span>${w} <span class="star">✦</span></span>`;
			});
		}
		marquee.innerHTML = line;
	}

	/* ---------- Testimonials ---------- */
	var reviewsA = [
		{
			q: "Finally found a groomer who understands poodles! The scissor work is impeccable and she looks like a show dog.",
			who: "Amanda T. & Luna",
			tint: true,
		},
		{
			q: "My cat is a nightmare to wash, but the team handles him with such grace. Truly stress-free for both of us.",
			who: "Robert S. & Oliver",
			tint: false,
		},
		{
			q: "The Puppy Spa was the perfect intro for our labradoodle. So patient and gentle. Highly recommend!",
			who: "Chloe B. & Barnaby",
			tint: true,
		},
		{
			q: "Booked a blowout for our husky and the deshed was unreal. No more fur tumbleweeds in the house.",
			who: "Priya N. & Kona",
			tint: false,
		},
	];
	var reviewsB = [
		{
			q: "Professional, clean, and they actually listen to how you want the cut. Best in the city, full stop.",
			who: "Mark J. & Buster",
			tint: false,
		},
		{
			q: "The nail trimming is quick and stress-free. My dog does not even flinch anymore. Master groomers.",
			who: "Sarah K. & Winston",
			tint: true,
		},
		{
			q: "They spotted a skin irritation we had missed and recommended a gentle shampoo. These folks really care.",
			who: "Jessica P. & Mochi",
			tint: false,
		},
		{
			q: "Walk-out result every single time. Tail wagging, coat shining, and a free bandana? Sold.",
			who: "Diego R. & Pepper",
			tint: true,
		},
	];

	var starSvg =
		'<svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>';

	function cardHtml(r) {
		return (
			'<div class="t-card' +
			(r.tint ? " tint" : "") +
			'">' +
			'<div class="t-stars" aria-hidden="true">' +
			starSvg +
			starSvg +
			starSvg +
			starSvg +
			starSvg +
			"</div>" +
			'<p class="quote">"' +
			r.q +
			'"</p>' +
			'<p class="who">' +
			r.who +
			"</p>" +
			"</div>"
		);
	}

	function rowHtml(list, dir) {
		var inner = list.map(cardHtml).join("");
		// duplicate for seamless loop
		return `<div class="t-row ${dir}">${inner}${inner}</div>`;
	}

	var rows = document.getElementById("t-rows");
	if (rows) {
		rows.innerHTML = rowHtml(reviewsA, "left") + rowHtml(reviewsB, "right");
	}

	/* ---------- Scroll reveal ---------- */
	var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	var revealEls = document.querySelectorAll("[data-reveal], [data-stagger]");
	if (reduced || !("IntersectionObserver" in window)) {
		revealEls.forEach((el) => {
			el.classList.add("in");
		});
	} else {
		var obs = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						e.target.classList.add("in");
						obs.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.12 },
		);
		revealEls.forEach((el) => {
			obs.observe(el);
		});
	}

	/* ---------- Mobile menu ---------- */
	var menu = document.getElementById("mobile-menu");
	var openBtn = document.getElementById("open-menu");
	var closeBtn = document.getElementById("close-menu");
	function setMenu(open) {
		if (!menu) return;
		menu.classList.toggle("open", open);
		document.body.style.overflow = open ? "hidden" : "";
	}
	if (openBtn)
		openBtn.addEventListener("click", () => {
			setMenu(true);
		});
	if (closeBtn)
		closeBtn.addEventListener("click", () => {
			setMenu(false);
		});
	document.querySelectorAll("[data-mnav]").forEach((a) => {
		a.addEventListener("click", () => {
			setMenu(false);
		});
	});

	/* ---------- Booking form ---------- */
	var form = document.getElementById("booking-form");
	if (form) {
		form.addEventListener("submit", (e) => {
			e.preventDefault();
			var btn = form.querySelector(".submit");
			var original = btn.textContent;
			btn.textContent = "Sending Request…";
			btn.disabled = true;
			setTimeout(() => {
				btn.textContent = "Request Sent!";
				btn.classList.add("ok");
				form.reset();
				setTimeout(() => {
					btn.textContent = original;
					btn.classList.remove("ok");
					btn.disabled = false;
				}, 2600);
			}, 1300);
		});
	}

	/* ---------- Newsletter ---------- */
	var news = document.getElementById("news-form");
	if (news) {
		news.addEventListener("submit", (e) => {
			e.preventDefault();
			var btn = news.querySelector("button");
			var original = btn.textContent;
			btn.textContent = "Checking…";
			setTimeout(() => {
				btn.textContent = "You're In!";
				news.reset();
				setTimeout(() => {
					btn.textContent = original;
				}, 2600);
			}, 900);
		});
	}
})();
