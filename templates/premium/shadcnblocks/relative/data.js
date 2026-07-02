/* ===== Shared data + renderers (testimonials, pricing, faq) ===== */
(function () {
	const testimonials = [
		{
			brand: "ZeroStatic",
			logo: "assets/images/logos/zerostatic.png",
			quote:
				"Our team at Zerostatic relies heavily on automation, and this app takes it to another level. It's like having a virtual assistant built right into my workflow.",
			name: "Abdulsalam Abdulsalam",
			role: "Product Designer, Zerostatic",
			avatar: "assets/images/testimonials/1.png",
		},
		{
			brand: "Notion",
			logo: "assets/images/partners/notion.svg",
			quote:
				"I especially love the seamless calendar integrations and advanced task management features keep everyone aligned and organized.",
			name: "Emma Lee",
			role: "Product Manager, Notion",
			avatar: "assets/images/testimonials/2.png",
		},
		{
			brand: "slack",
			logo: "assets/images/partners/slack.svg",
			quote:
				"We needed a productivity app that could grow with our team's evolving needs, this has been the perfect fit. The automation tools have saved us hours.",
			name: "Ryan Chen",
			role: "Operations Lead, Slack",
			avatar: "assets/images/testimonials/3.png",
		},
		{
			brand: "GitHub",
			logo: "assets/images/partners/github.svg",
			quote:
				"This platform has been invaluable for managing projects across distributed teams. Its integration with our existing tools makes setup easy.",
			name: "Ryan Patel",
			role: "Engineering Manager, GitHub",
			avatar: "assets/images/testimonials/4.png",
		},
		{
			brand: "Figma",
			logo: "assets/images/partners/figma.svg",
			quote:
				"As a designer, I appreciate how intuitive and visually appealing this app is. It simplifies task management without sacrificing powerful features.",
			name: "Carlos Diaz",
			role: "Design Lead, Figma",
			avatar: "assets/images/testimonials/5.png",
		},
		{
			brand: "loom",
			logo: "assets/images/partners/loom.svg",
			quote:
				"The smart reminders and automated scheduling keep our team focused and on track. We&apos;ve also found the collaborative features to be very helpful.",
			name: "Matthew Kim",
			role: "Content Strategist, Loom",
			avatar: "assets/images/testimonials/6.png",
		},
	];

	const check = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`;
	const planIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 16-4-4 4-4M3 8l4 4-4 4M16 3l-4 4-4-4M8 21l4-4 4 4"/></svg>`;

	const plans = [
		{
			name: "Basic plan",
			monthly: "$19",
			yearly: "$190",
			sub: "or $190 yearly",
			featured: false,
			feats: [
				"Basic task management tools",
				"Calendar sync with limited integrations",
				"Access to 1 dashboard for tracking tasks",
				"Limited to suggestions and insights",
				"Basic support and community access",
			],
		},
		{
			name: "Business plan",
			monthly: "$29",
			yearly: "$290",
			sub: "or $290 yearly",
			featured: true,
			feats: [
				"All Free Plan features, plus:",
				"Unlimited task lists",
				"Advanced calendar sync",
				"AI-driven scheduling",
				"Access to custom dashboards",
				"Priority email support",
			],
		},
		{
			name: "Enterprise plan",
			monthly: "$49",
			yearly: "$490",
			sub: "or $490 yearly",
			featured: false,
			feats: [
				"All Pro Plan features, plus:",
				"Dedicated account manager",
				"Custom integrations",
				"Real-time collaboration",
				"Role-based permissions",
				"24/7 priority support",
			],
		},
	];

	const faqs = [
		[
			"Is there a free version?",
			"Yes! Relative offers a free plan with core task management features so you can get started at no cost and upgrade whenever you need more.",
		],
		[
			"What apps can I integrate?",
			"Relative integrates with Google Calendar, Slack, Trello, Notion, and many more popular productivity tools.",
		],
		[
			"How does the AI work?",
			"Our AI analyzes your tasks, calendar, and working habits to suggest priorities, schedule time slots, and surface actionable insights automatically.",
		],
		[
			"Can I use this with a team?",
			"Absolutely. Shared dashboards, real-time collaboration, and team analytics keep everyone aligned and on track.",
		],
		[
			"Is my data safe?",
			"Your data is encrypted in transit and at rest. We follow industry best practices to keep your information private and secure.",
		],
		[
			"How do I manage my subscription?",
			"You can upgrade, downgrade, or cancel your subscription at any time from your account settings.",
		],
	];

	function renderTestimonials(el) {
		el.innerHTML = `<div class="container">
      <div class="section-head center reveal">
        <p class="eyebrow">lovin' it</p>
        <h2 class="h-section">What industry experts are saying</h2>
        <p class="lead">Trusted by Professionals from Leading Tech Companies.</p>
      </div>
      <div class="testimonials-grid">
        ${testimonials
					.map(
						(t) => `
        <div class="card testimonial reveal">
          <div class="t-brand"><img src="${t.logo}" alt="${t.brand}" />${t.brand}</div>
          <blockquote>“${t.quote}”</blockquote>
          <div class="t-author"><img src="${t.avatar}" alt="${t.name}" /><div><div class="ta-name">${t.name}</div><div class="ta-role">${t.role}</div></div></div>
        </div>`,
					)
					.join("")}
      </div>
    </div>`;
	}

	function renderPricingCards(el) {
		el.innerHTML = `<div class="price-grid">
      ${plans
				.map(
					(p) => `
      <div class="card price-card ${p.featured ? "featured" : ""} reveal">
        <div class="pc-name">${planIcon}${p.name}</div>
        <div class="pc-price"><span data-price data-monthly="${p.monthly}" data-yearly="${p.yearly}"><span class="price-amount">${p.monthly}</span></span><span class="price-suffix">/mo</span></div>
        <div class="pc-sub">${p.sub}</div>
        <div class="pc-divider">Features Included</div>
        <ul class="pc-features">${p.feats.map((f) => `<li>${check}<span>${f}</span></li>`).join("")}</ul>
        <a class="btn ${p.featured ? "btn-primary" : "btn-outline"} btn-block" href="signup.html">Get started</a>
      </div>`,
				)
				.join("")}
    </div>`;
	}

	function renderFaq(el) {
		el.innerHTML = faqs
			.map(
				([q, a]) => `
      <div class="accordion-item" data-accordion-item>
        <button data-accordion-trigger>${q}<svg class="acc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg></button>
        <div class="accordion-content"><p>${a}</p></div>
      </div>`,
			)
			.join("");
	}

	document.querySelectorAll("[data-testimonials]").forEach(renderTestimonials);
	document.querySelectorAll("[data-pricing-cards]").forEach(renderPricingCards);
	document.querySelectorAll("[data-faq]").forEach(renderFaq);
	window.__RELATIVE_DATA__ = { testimonials, plans, faqs, check, planIcon };
})();
