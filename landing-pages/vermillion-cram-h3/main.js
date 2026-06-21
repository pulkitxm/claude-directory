(() => {
	const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	/* ---- Mobile menu ---- */
	const burger = document.getElementById("burger");
	const menu = document.getElementById("mobileMenu");
	burger.addEventListener("click", () => {
		const open = menu.classList.toggle("open");
		burger.setAttribute("aria-expanded", String(open));
	});
	menu.querySelectorAll("a").forEach((a) =>
		a.addEventListener("click", () => {
			menu.classList.remove("open");
			burger.setAttribute("aria-expanded", "false");
		}),
	);

	/* ---- Testimonials (built from data, duplicated for seamless loop) ---- */
	const star =
		'<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3 6.9 7.6.6-5.8 5 1.8 7.4L12 18l-6.6 3.9 1.8-7.4-5.8-5 7.6-.6z"/></svg>';
	const rowA = [
		{
			v: "orange",
			stars: true,
			q: "Vermillion transformed my Physics prep. I went from a 70 to a 98 in my Class 12 boards. The personalised attention is unmatched.",
			n: "Aryan Sharma",
			r: "98% CBSE · Class 12",
			a: "avatar1.jpg",
		},
		{
			v: "white",
			q: 'Seeing a student’s "aha!" moment is why I teach. Here we have the resources to push every student toward excellence.',
			n: "Dr. Amit K.",
			r: "HOD Chemistry",
			a: "avatar2.jpg",
		},
		{
			v: "navy",
			q: "The faculty is professional yet approachable. They helped my son overcome his fear of Mathematics completely.",
			n: "Meera Iyer",
			r: "Parent · Grade 10",
			a: "avatar3.jpg",
		},
		{
			v: "white",
			q: "Expert teachers and incredible mock tests. I felt genuinely confident walking into my final board exams.",
			n: "Rahul Verma",
			r: "96% ISC · Class 12",
			a: "avatar4.jpg",
		},
	];
	const rowB = [
		{
			v: "white",
			q: "The online portal and doubt-clearing sessions were a lifesaver during my pre-boards. A must for ICSE students.",
			n: "Ishani Patel",
			r: "97.5% ICSE · Class 10",
			a: "avatar5.jpg",
		},
		{
			v: "orange",
			q: "As a parent, the weekly progress reports are fantastic. I always know exactly where my daughter needs help.",
			n: "Sanjay Kapoor",
			r: "Parent · Grade 12",
			a: "avatar6.jpg",
		},
		{
			v: "white",
			q: "The hybrid model lets me reach students exactly where they are. We track with data, but teach with heart.",
			n: "Neha S.",
			r: "Senior Maths Faculty",
			a: "avatar2.jpg",
		},
		{
			v: "navy",
			q: "Vermillion isn’t only about marks — they truly care about exam-stress management and student wellbeing.",
			n: "Rajesh Deshmukh",
			r: "Parent · Grade 12",
			a: "avatar1.jpg",
		},
	];

	function cardHTML(t) {
		return `<div class="t-card ${t.v === "orange" ? "orange" : t.v === "navy" ? "navy" : ""}">
      ${t.stars ? `<div class="t-stars">${star.repeat(5)}</div>` : ""}
      <p>${t.q}</p>
      <div class="t-who"><img src="./assets/img/${t.a}" alt="${t.n}"><div><b>${t.n}</b><small>${t.r}</small></div></div>
    </div>`;
	}
	function buildRow(data, dir) {
		const cards = data.map(cardHTML).join("");
		return `<div class="tst-row"><div class="tst-track ${dir}">${cards}${cards}</div></div>`;
	}
	document.getElementById("tstRows").innerHTML =
		buildRow(rowA, "left") + buildRow(rowB, "right");

	/* ---- Scroll reveal ---- */
	const reveals = document.querySelectorAll(".reveal");
	if (reduce || !("IntersectionObserver" in window)) {
		reveals.forEach((el) => el.classList.add("shown"));
	} else {
		const io = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach((e, i) => {
					if (e.isIntersecting) {
						const el = e.target;
						setTimeout(() => el.classList.add("shown"), (i % 4) * 90);
						obs.unobserve(el);
					}
				});
			},
			{ threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
		);
		reveals.forEach((el) => io.observe(el));
	}

	/* ---- Counters ---- */
	const counters = document.querySelectorAll(".count");
	const fmt = (n, dec) =>
		dec ? n.toFixed(dec) : Math.round(n).toLocaleString("en-US");
	function run(el) {
		const target = parseFloat(el.dataset.target);
		const dec = parseInt(el.dataset.decimals || "0", 10);
		if (reduce) {
			el.textContent = fmt(target, dec);
			return;
		}
		const dur = 1600,
			start = performance.now();
		const tick = (now) => {
			const p = Math.min((now - start) / dur, 1);
			const eased = 1 - (1 - p) ** 3;
			el.textContent = fmt(target * eased, dec);
			if (p < 1) requestAnimationFrame(tick);
			else el.textContent = fmt(target, dec);
		};
		requestAnimationFrame(tick);
	}
	if (!("IntersectionObserver" in window)) {
		counters.forEach(run);
	} else {
		const cio = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						run(e.target);
						obs.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.5 },
		);
		counters.forEach((c) => cio.observe(c));
	}

	/* ---- Trial form ---- */
	const form = document.getElementById("trialForm");
	const success = document.getElementById("formSuccess");
	form.addEventListener("submit", (e) => {
		e.preventDefault();
		if (!form.checkValidity()) {
			form.reportValidity();
			return;
		}
		success.classList.add("show");
		form.querySelector("button").textContent = "Reserved ✓";
		setTimeout(() => {
			form.reset();
			success.classList.remove("show");
			form.querySelector("button").textContent = "Confirm Free Trial";
		}, 4500);
	});
})();
