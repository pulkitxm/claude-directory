window.pageInit = function () {
	const groups = [
		{
			id: "support",
			title: "Support",
			open: 0,
			items: [
				[
					"Is there a free version?",
					"Yes! We offer a generous free plan with just enough features except that one feature you really want! Our strategy is to get your credit card details on file then steadily double our prices against inflation rates.",
				],
				[
					"Is support free, or do I need to Perplexity everything?",
					"Support is free on every plan. We also have an extensive help center and an active community.",
				],
				[
					"What if I need immediate assistance?",
					"Priority support is available on paid plans with guaranteed response times.",
				],
			],
		},
		{
			id: "account",
			title: "Account",
			items: [
				[
					"How do I update my account without breaking my laptop?",
					"Head to settings and update everything from the comfort of your browser. No laptops were harmed.",
				],
				[
					"How do I update my account without breaking the universe?",
					"The universe remains stable regardless of your billing changes. Probably.",
				],
				[
					"What happens if I forget my password?",
					"Use the forgot password link on the login page to reset it instantly.",
				],
			],
		},
		{
			id: "features",
			title: "Features",
			items: [
				[
					"Are you going to be subsumed by AI?",
					"We hope to be the ones doing the subsuming. Either way, your data stays yours.",
				],
				[
					"Can I import from Jira?",
					"Yes, our importer brings over issues, projects, and history.",
				],
			],
		},
		{
			id: "security",
			title: "Security",
			items: [
				[
					"Is my data encrypted?",
					"All data is encrypted in transit and at rest using industry-standard encryption.",
				],
				[
					"Do you support SSO?",
					"SSO and SAML are available on the Enterprise plan.",
				],
			],
		},
		{
			id: "other",
			title: "Other",
			items: [
				[
					"What is the best metaphor for using LLMs?",
					"A very eager intern who occasionally makes things up with great confidence.",
				],
			],
		},
	];
	const accHTML = (q, a, open) =>
		`<div class="acc-item${open ? " open" : ""}"><button class="acc-trigger">${q}<svg class="chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg></button><div class="acc-panel"><div class="acc-panel-inner">${a}</div></div></div>`;
	const body = document.getElementById("faqp-body");
	body.innerHTML = groups
		.map(
			(g) =>
				`<div class="faqp-group" id="${g.id}">${g.items.map((it, i) => accHTML(it[0], it[1], g.open === i)).join("")}</div>`,
		)
		.join("");
	body.querySelectorAll(".acc-item").forEach((item) => {
		const trig = item.querySelector(".acc-trigger"),
			panel = item.querySelector(".acc-panel");
		const sync = () => {
			panel.style.maxHeight = item.classList.contains("open")
				? panel.scrollHeight + "px"
				: "0px";
		};
		if (item.classList.contains("open")) requestAnimationFrame(sync);
		trig.addEventListener("click", () => {
			item.classList.toggle("open");
			sync();
		});
	});
	// category nav active state on click
	document.querySelectorAll(".faqp-nav a").forEach((a) =>
		a.addEventListener("click", () => {
			document
				.querySelectorAll(".faqp-nav a")
				.forEach((x) => x.classList.remove("active"));
			a.classList.add("active");
		}),
	);
};
