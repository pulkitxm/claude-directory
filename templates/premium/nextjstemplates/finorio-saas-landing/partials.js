// ===== Finorio clone — shared partials & data injection =====
(function () {
	"use strict";

	const FOOTER = `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <a class="logo" href="index.html"><img src="assets/svg/logo.svg" alt="Finorio" /></a>
          <p>Start your financial journey today with our easy, secure money management app</p>
          <div class="socials">
            <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 13.5h2.5l1-4H14V7c0-1.03 0-2 2-2h1.5V1.64c-.33-.04-1.55-.14-2.84-.14C11.93 1.5 10 3.16 10 6.2v3.3H7v4h3V22h4v-8.5z"/></svg></a>
            <a href="#" aria-label="Twitter"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 5.8a8.5 8.5 0 0 1-2.36.65 4.13 4.13 0 0 0 1.8-2.27 8.2 8.2 0 0 1-2.6 1 4.1 4.1 0 0 0-7 3.74A11.64 11.64 0 0 1 3.4 4.5a4.1 4.1 0 0 0 1.27 5.48A4 4 0 0 1 2.8 9.5v.05a4.1 4.1 0 0 0 3.3 4.03 4.1 4.1 0 0 1-1.86.07 4.1 4.1 0 0 0 3.83 2.85A8.23 8.23 0 0 1 2 18.28a11.6 11.6 0 0 0 6.29 1.84c7.55 0 11.67-6.25 11.67-11.67l-.01-.53A8.3 8.3 0 0 0 22 5.8z"/></svg></a>
            <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a>
            <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.94 5a2 2 0 1 1-4-.02 2 2 0 0 1 4 .02zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z"/></svg></a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Product</h4>
          <ul>
            <li><a href="features.html">Features</a></li>
            <li><a href="pricing.html">Pricing</a></li>
            <li><a href="register.html">Download App</a></li>
            <li><a href="index.html#testimonials">Testimonials</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Others</h4>
          <ul>
            <li><a href="#">Blog</a></li>
            <li><a href="index.html#faq">FAQs</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="contact.html">Help Center</a></li>
          </ul>
        </div>
        <div class="footer-col footer-dl">
          <h4>Download the App now</h4>
          <p>Download our finance manage and track your finance effortlessly.</p>
          <div class="store-badges">
            <a class="store-badge" href="#"><img src="assets/svg/app-store.svg" alt="Download on the App Store" /></a>
            <a class="store-badge" href="#"><img src="assets/svg/google-play.svg" alt="Get it on Google Play" /></a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2025 Finorio . All rights reserved.</span>
        <div class="links">
          <a href="#">Terms &amp; Conditions</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
    </div>
  </footer>`;

	const CTA = `
  <section class="cta-section reveal">
    <div class="container">
      <div class="cta">
        <img class="cta-phone left" src="assets/images/cta-img-1.webp" alt="" />
        <img class="cta-phone right" src="assets/images/cta-img-2.webp" alt="" />
        <h2>Start managing your money<br/>the smart way</h2>
        <p>From tracking expenses to sending payments, everything is designed to be simple, fast, and secure.</p>
        <div class="store-badges">
          <a class="store-badge" href="#"><img src="assets/svg/app-store.svg" alt="Download on the App Store" /></a>
          <a class="store-badge" href="#"><img src="assets/svg/google-play.svg" alt="Get it on Google Play" /></a>
        </div>
      </div>
    </div>
  </section>`;

	const footerSlot = document.getElementById("footer-slot");
	if (footerSlot) footerSlot.outerHTML = FOOTER;
	const ctaSlot = document.getElementById("cta-slot");
	if (ctaSlot) ctaSlot.outerHTML = CTA;

	// ---- Pricing plans ----
	const PLANS = [
		{
			name: "Free Plan",
			monthly: "$0.00",
			annual: "$0.00",
			desc: "Simple features to begin.",
			featured: false,
			feats: [
				["Dashboard", 1],
				["Basic statistics", 1],
				["QR payments", 1],
				["Standard security", 1],
				["1 card storage", 0],
			],
		},
		{
			name: "Professional",
			monthly: "$6.99",
			annual: "$5.59",
			desc: "Smart tools, unlimited access.",
			featured: true,
			popular: true,
			feats: [
				["Everything in Free", 1],
				["Unlimited cards", 1],
				["Advanced insights", 1],
				["Priority syncing", 1],
				["Scheduled transfers", 0],
			],
		},
		{
			name: "Enterprise",
			monthly: "$11.99",
			annual: "$9.59",
			desc: "Maximum features, zero limits.",
			featured: false,
			feats: [
				["Everything in Pro", 1],
				["Family mode", 1],
				["Custom categories", 1],
				["Export reports", 1],
				["Smart budgeting", 0],
			],
		},
	];
	const CHECK = `<svg class="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`;
	const CHECK_GRAY = `<svg class="check gray" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`;
	const plansEl = document.getElementById("plans");
	if (plansEl) {
		plansEl.innerHTML = PLANS.map(
			(p, i) => `
      <div class="plan ${p.featured ? "featured" : ""} reveal" data-delay="${i * 90}">
        <div class="plan-head">
          <span class="plan-name">${p.name}</span>
          ${p.popular ? '<span class="pop-pill">Most Popular</span>' : ""}
        </div>
        <div class="plan-price"><span class="price-amount" data-monthly="${p.monthly}" data-annual="${p.annual}">${p.annual}</span><span class="price-period">/month</span></div>
        <p class="plan-desc">${p.desc}</p>
        <a href="register.html" class="btn ${p.featured ? "btn-dark" : "btn-light"} btn-block">Get Started</a>
        <ul class="plan-feats">
          ${p.feats.map(([t, on]) => `<li class="${on ? "" : "dim"}">${on ? CHECK : CHECK_GRAY}${t}</li>`).join("")}
        </ul>
      </div>`,
		).join("");
	}

	// ---- Testimonials ----
	const T = [
		{
			title: "Saved more than $150 in a month.",
			body: "Managing my income from multiple clients used to be chaotic. This app gives me a clean dashboard where I can see everything in one place.",
			name: "Alex Morgan",
			img: "alex-morgon",
		},
		{
			title: "Faster payments with QR.",
			body: "The QR payment feature is a lifesaver. Instead of sending bank details every time, customers just scan and pay instantly. It reduced my payment delays by 80%.",
			name: "Sofia Ramirez",
			img: "sofia-ramirez",
		},
		{
			title: "Smooth card management.",
			body: "I've tried many budgeting apps, but most were either too complicated or ugly. This one is different. The card management system is super clean.",
			name: "Daniel Kim",
			img: "daniel-kim",
		},
	];
	const QUOTE = `<img class="quote-icon" src="assets/images/quote.svg" alt="" />`;
	const STARS = `<span class="stars">${'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.26 6.9.62-5.2 4.6 1.55 6.76L12 17.27 5.85 20.84 7.4 14.08 2.2 9.48l6.9-.62L12 2z"/></svg>'.repeat(5)}</span>`;
	const testiEl = document.getElementById("testimonials");
	if (testiEl) {
		const order = [0, 1, 2, 1, 2, 0];
		testiEl.innerHTML = order
			.map((idx, i) => {
				const t = T[idx];
				return `<div class="testi reveal" data-delay="${(i % 3) * 90}">
        ${QUOTE}
        <h4>${t.title}</h4>
        <p>${t.body}</p>
        <div class="person">
          <div class="person-l"><img src="assets/images/${t.img}.webp" alt="${t.name}" /><span class="name">${t.name}</span></div>
          ${STARS}
        </div>
      </div>`;
			})
			.join("");
	}

	// ---- FAQ ----
	const FAQ = [
		{
			q: "What is Finorio?",
			a: "Finorio helps startups and creators build beautiful landing pages, manage tasks, and grow faster — all from one dashboard.",
			open: true,
		},
		{
			q: "Do I need to code?",
			a: "No, Finorio is a drag-and-drop builder that allows you to create landing pages and manage tasks without any coding knowledge.",
		},
		{
			q: "Can I use my own domain?",
			a: "Yes, you can use your own domain with Finorio. You can also use a custom subdomain.",
		},
		{
			q: "How secure is Finorio?",
			a: "Your data is encrypted, protected, and always under your control — with enterprise-grade security.",
		},
		{
			q: "Is there a free plan?",
			a: "Yes, Finorio offers a free plan that includes 10 landing pages and 10 tasks.",
		},
	];
	const faqEl = document.getElementById("faq");
	if (faqEl) {
		faqEl.innerHTML = FAQ.map(
			(f) => `
      <div class="faq-item ${f.open ? "open" : ""}">
        <button class="faq-q">
          <span>${f.q}</span>
          <span class="icon">
            <svg class="faq-plus" style="${f.open ? "display:none" : "display:block"}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
            <svg class="faq-minus" style="${f.open ? "display:block" : "display:none"}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14"/></svg>
          </span>
        </button>
        <div class="faq-a"><div class="faq-a-inner">${f.a}</div></div>
      </div>`,
		).join("");
	}
})();
