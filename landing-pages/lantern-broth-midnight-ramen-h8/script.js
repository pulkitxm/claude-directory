// ---------- scroll reveal ----------
(() => {
	const els = document.querySelectorAll(".reveal");
	if (!("IntersectionObserver" in window)) {
		els.forEach((e) => e.classList.add("in"));
	} else {
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((en) => {
					if (en.isIntersecting) {
						en.target.classList.add("in");
						io.unobserve(en.target);
					}
				});
			},
			{ threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
		);
		els.forEach((e) => io.observe(e));
	}
})();

// ---------- testimonials carousel ----------
(() => {
	const data = [
		{
			img: "avatar1.jpg",
			name: "Sarah Jenkins",
			text: "The broth is liquid gold. I've never had ramen this good outside of Tokyo. The 12 AM vibe is unmatched.",
		},
		{
			img: "avatar2.jpg",
			name: "Mike Tavern",
			text: "Perfect for late-night cravings. The spicy miso has a real kick, and the noodles are always al dente.",
		},
		{
			img: "avatar3.jpg",
			name: "Anita Sharma",
			text: "I love the vegan options! Usually vegan broth is thin, but this one is creamy and rich. Highly recommend.",
		},
		{
			img: "avatar2.jpg",
			name: "Diego Park",
			text: "Open till 3 AM saved my soul more than once. The lantern glow inside makes you want to linger.",
		},
		{
			img: "avatar1.jpg",
			name: "Mei Lin",
			text: "Hand-pulled noodles you can actually taste the difference in. The chashu melts. Worth every penny.",
		},
		{
			img: "avatar3.jpg",
			name: "Tom Becker",
			text: "Cozy, earthy, nostalgic — exactly what they promise. The ramen kits made my home dinners legendary.",
		},
	];
	const wrap = document.getElementById("reviews");
	if (!wrap) return;
	let start = 0;
	const per = () => (window.innerWidth <= 760 ? 1 : 3);

	function render() {
		const n = per();
		let html = "";
		for (let i = 0; i < n; i++) {
			const r = data[(start + i) % data.length];
			html += `<div class="review">
        <img src="./assets/img/${r.img}" alt="${r.name}" loading="lazy">
        <h5>${r.name}</h5>
        <p>"${r.text}"</p>
        <div class="stars">★★★★★</div>
      </div>`;
		}
		wrap.innerHTML = html;
	}
	render();

	document.querySelector(".rev-nav.next")?.addEventListener("click", () => {
		start = (start + per()) % data.length;
		render();
	});
	document.querySelector(".rev-nav.prev")?.addEventListener("click", () => {
		start = (start - per() + data.length) % data.length;
		render();
	});

	let rt;
	window.addEventListener("resize", () => {
		clearTimeout(rt);
		rt = setTimeout(render, 150);
	});
})();
