(() => {
	/* ---- Mobile nav ---- */
	var nav = document.getElementById("nav");
	var toggle = document.getElementById("navToggle");
	if (toggle) {
		toggle.addEventListener("click", () => {
			var open = nav.classList.toggle("open");
			toggle.setAttribute("aria-expanded", open ? "true" : "false");
		});
		document.querySelectorAll("#mobilePanel a").forEach((a) => {
			a.addEventListener("click", () => {
				nav.classList.remove("open");
				toggle.setAttribute("aria-expanded", "false");
			});
		});
	}

	/* ---- Scroll reveal ---- */
	var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	if (!reduce && "IntersectionObserver" in window) {
		var io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						e.target.classList.add("in");
						io.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.12 },
		);
		document.querySelectorAll(".reveal").forEach((el) => {
			io.observe(el);
		});
	} else {
		document.querySelectorAll(".reveal").forEach((el) => {
			el.classList.add("in");
		});
	}

	/* ---- Service switcher ---- */
	var content = {
		op: {
			img: "./assets/img/svc-op.jpg",
			desc: "We eliminate friction from your core operations, deploying automated intelligence and streamlined protocols that let your team focus on high-impact creativity.",
		},
		cons: {
			img: "./assets/img/svc-cons.jpg",
			desc: "We build the physical and digital frameworks that support global expansion — designed for modularity, ensuring your infrastructure grows at the speed of your ambition.",
		},
		hosp: {
			img: "./assets/img/svc-hosp.jpg",
			desc: "We craft premium, frictionless touchpoints for every stakeholder, treating each internal and external interaction as a critical piece of your brand experience architecture.",
		},
		fire: {
			img: "./assets/img/svc-fire.jpg",
			desc: "For high-stakes environments where failure is not an option, we build redundant, secure, and hyper-reliable systems that protect your most vital assets around the clock.",
		},
	};
	var items = document.querySelectorAll(".svc-item");
	var svcImg = document.getElementById("svcImg");
	var svcDesc = document.getElementById("svcDesc");
	function activate(item) {
		var key = item.getAttribute("data-svc");
		if (!content[key] || item.classList.contains("active")) return;
		items.forEach((i) => {
			i.classList.remove("active");
		});
		item.classList.add("active");
		svcImg.style.opacity = "0";
		svcDesc.style.opacity = "0";
		svcDesc.style.transform = "translateY(10px)";
		setTimeout(() => {
			svcImg.src = content[key].img;
			svcDesc.textContent = content[key].desc;
			svcImg.style.opacity = "1";
			svcDesc.style.opacity = "1";
			svcDesc.style.transform = "translateY(0)";
		}, 280);
	}
	items.forEach((item) => {
		item.addEventListener("mouseenter", () => {
			activate(item);
		});
		item.addEventListener("click", () => {
			activate(item);
		});
	});

	/* ---- Testimonial carousel ---- */
	var people = [
		{
			img: "./assets/img/person-1.jpg",
			q: '"Helix Strata didn’t just solve our problems; they fundamentally evolved how we think about scale. Their architecture let us 10x our volume without increasing overhead by a single percent."',
			name: "Sarah Lee",
			role: "CEO, TECH INFINITY",
		},
		{
			img: "./assets/img/person-2.jpg",
			q: '"They re-platformed a fifteen-year-old monolith with zero downtime. What we thought would take two years and a fortune took two quarters. Genuinely the best partner we’ve hired."',
			name: "Marcus Okafor",
			role: "COO, NORTHWIND LOGISTICS",
		},
		{
			img: "./assets/img/person-3.jpg",
			q: '"The clarity Helix brings to chaos is unmatched. They turned our tangled operations into a clean, observable system we now actually trust to scale us into new markets."',
			name: "Priya Nandakumar",
			role: "CTO, VERITAS HEALTH",
		},
	];
	var idx = 0;
	var tImg = document.getElementById("tImg");
	var tQuote = document.getElementById("tQuote");
	var tName = document.getElementById("tName");
	var tRole = document.getElementById("tRole");
	var els = [tImg, tQuote, tName, tRole];
	function render(i) {
		var p = people[i];
		els.forEach((el) => {
			el.style.opacity = "0";
		});
		setTimeout(() => {
			tImg.src = p.img;
			tQuote.textContent = p.q;
			tName.textContent = p.name;
			tRole.textContent = p.role;
			els.forEach((el) => {
				el.style.opacity = "1";
			});
		}, 300);
	}
	var prev = document.getElementById("tPrev");
	var next = document.getElementById("tNext");
	if (prev && next) {
		prev.addEventListener("click", () => {
			idx = (idx - 1 + people.length) % people.length;
			render(idx);
		});
		next.addEventListener("click", () => {
			idx = (idx + 1) % people.length;
			render(idx);
		});
	}
})();
