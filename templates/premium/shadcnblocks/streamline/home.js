window.pageInit = function () {
	// Logo marquee (duplicate for seamless loop)
	const logos = [
		"mercury",
		"watershed",
		"retool",
		"descript",
		"perplexity",
		"monzo",
		"ramp",
		"raycast",
		"arc",
	];
	const track = document.getElementById("logos-track");
	if (track) {
		const make = () =>
			logos
				.map((n) => `<img src="assets/images/logos/${n}.svg" alt="${n}">`)
				.join("");
		track.innerHTML = make() + make();
	}

	// FAQ
	const faqs = [
		[
			"What is Streamline?",
			"Streamline is a fit-for-purpose tool for planning and building modern software products. It combines issue tracking, milestones, and project management in one place.",
		],
		[
			"How is Streamline different Linear and Jira?",
			"We focus on developer ergonomics and speed. Streamline is blazingly fast and designed for teams who want to move quickly without the bloat.",
		],
		[
			"How do I update my account ?",
			"Head to your account settings and update your billing, profile, and team preferences at any time.",
		],
		[
			"Is support free, or do I need to Google everything?",
			"Support is free on every plan. We also have an extensive help center and active community.",
		],
		[
			"Are you going to be subsumed by AI?",
			"We hope to be the ones doing the subsuming. Either way, your data stays yours.",
		],
		[
			"Are you going to be subsumed by AI?",
			"We hope to be the ones doing the subsuming. Either way, your data stays yours.",
		],
		[
			"How do I update my account?",
			"Head to your account settings and update your billing, profile, and team preferences at any time.",
		],
		[
			"What if I break my laptop using this app?",
			"Streamline runs in the cloud, so your data is always safe. Grab a new laptop and pick up right where you left off.",
		],
		[
			"What is the best metaphor for using LLMs?",
			"A very eager intern who occasionally makes things up with great confidence.",
		],
	];
	const accHTML = (q, a) =>
		`<div class="acc-item"><button class="acc-trigger">${q}<svg class="chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg></button><div class="acc-panel"><div class="acc-panel-inner">${a}</div></div></div>`;
	const c1 = document.getElementById("faq-col-1"),
		c2 = document.getElementById("faq-col-2");
	if (c1 && c2) {
		c1.innerHTML = faqs
			.slice(0, 5)
			.map((f) => accHTML(f[0], f[1]))
			.join("");
		c2.innerHTML = faqs
			.slice(5)
			.map((f) => accHTML(f[0], f[1]))
			.join("");
		// re-init accordions for dynamically added items
		document.querySelectorAll(".faq-sec .acc-item").forEach((item) => {
			const trig = item.querySelector(".acc-trigger"),
				panel = item.querySelector(".acc-panel");
			trig.addEventListener("click", () => {
				item.classList.toggle("open");
				panel.style.maxHeight = item.classList.contains("open")
					? panel.scrollHeight + "px"
					: "0px";
			});
		});
	}

	// Feature tabs
	const ftabs = document.querySelectorAll("#feat-tabs .feat-tab");
	ftabs.forEach((t) =>
		t.addEventListener("click", () => {
			ftabs.forEach((x) => x.classList.remove("active"));
			t.classList.add("active");
		}),
	);

	// Carousels
	document
		.querySelectorAll("[data-carousel]")
		.forEach((c) => window.initCarousel(c));

	// Pricing toggle
	const bt = document.getElementById("billing-toggle");
	if (bt) {
		const annual = document.querySelector("[data-annual]");
		const annual2 = document.querySelector("[data-annual2]");
		bt.addEventListener("click", () => {
			const on = bt.getAttribute("aria-checked") === "true";
			bt.setAttribute("aria-checked", String(!on));
			if (annual) annual.textContent = on ? "$72" : "$60";
			if (annual2) annual2.textContent = on ? "$144" : "$120";
		});
	}
};
