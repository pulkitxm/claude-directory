// Dev-time generator: assembles each page's HTML from shared header/footer/cta-band
// partials + a per-page content fragment. Output is plain static HTML — no build step
// is needed to run/ship the site, this script is only used while authoring so every
// page shares identical chrome.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = __dirname;

const header = fs.readFileSync(path.join(root, "_partials/header.html"), "utf8");
const footer = fs.readFileSync(path.join(root, "_partials/footer.html"), "utf8");
const ctaBand = fs.readFileSync(path.join(root, "_partials/cta-band.html"), "utf8");

const pages = JSON.parse(fs.readFileSync(path.join(root, "_pages.json"), "utf8"));

function activeFlags(html, active) {
	const keys = [
		"HOME",
		"FEATURES",
		"PRICING",
		"REVIEWS",
		"CONTACT",
		"BLOG",
		"BLOGPOST",
		"PRIVACY",
		"TERMS",
		"404",
		"ELEMENTS",
	];
	let h = html;
	for (const k of keys) {
		h = h.replaceAll(`{{ACTIVE_${k}}}`, k === active ? "active" : "");
	}
	return h;
}

// ---- reusable data-driven fragments (integrations grid, testimonials, pricing, FAQ) ----

function integrationsGrid() {
	let html = "";
	for (let i = 1; i <= 19; i++) {
		html += `<img src="assets/images/integrations/int-${i}.png" alt="Integration ${i}" loading="lazy" />\n`;
	}
	return html;
}

const TESTIMONIALS = [
	["The comprehensive investment tracking tools have revolutionized how I manage my portfolio and make strategic financial decisions.", "Zachariah Winter", "avatar-7"],
	["Exceptional budgeting features that transformed my spending habits, though the app interface could be more intuitive for new users.", "Isabella Blackwood", "avatar-8"],
	["Their fraud detection system caught suspicious activity on my account within minutes, potentially saving me thousands of dollars.", "Maxwell Thornton", "avatar-9"],
	["As a small business owner, the expense categorization and receipt scanning features have streamlined my accounting processes.", "Alexandria Chen", "circle-avatar-1"],
	["The bill-splitting feature makes managing shared expenses with roommates effortless. Minor sync issues occasionally occur.", "Sebastian Cruz", "circle-avatar-2"],
	["Monthly financial insights helped me identify spending patterns I never noticed before, leading to significant savings.", "Victoria Pearson", "circle-avatar-3"],
	["The debt payoff calculator created a realistic timeline for becoming debt-free, and I achieved my goal ahead of schedule.", "Theodore Hayes", "avatar-7"],
	["Love the savings goal tracker - it kept me motivated throughout my home down payment journey. Needs more bank integration options.", "Cassandra Mitchell", "avatar-8"],
];

function testimonialTrack() {
	let html = "";
	for (const [quote, name, avatar] of TESTIMONIALS) {
		html += `<div class="testimonial-card"><p>"${quote}"</p><div class="who"><img src="assets/images/avatar/${avatar}.png" alt="${name}"/>${name}</div></div>\n`;
	}
	return html;
}

function pricingCards() {
	const plans = [
		{
			name: "Free",
			desc: "Designed for growing businesses with more advanced needs.",
			monthly: "0",
			yearly: "0",
			features: ["Centralized employee database", "Clock-in/clock-out functionality", "Applicant tracking system (ATS)", "Learning management system (LMS)", "Performance management tools"],
			featured: false,
		},
		{
			name: "Premium",
			desc: "Advanced features for established businesses seeking growth",
			monthly: "340",
			yearly: "3400",
			features: ["All Essential features", "Performance management tools", "Advanced reporting and analytics", "Custom workflows", "Priority support"],
			featured: true,
		},
		{
			name: "Business",
			desc: "Comprehensive solution for large enterprises with complex needs",
			monthly: "470",
			yearly: "4700",
			features: ["All Premium features", "Multi-company management", "Advanced security controls", "API access", "Dedicated account manager", "Custom branding"],
			featured: false,
		},
	];
	let html = '<div class="pricing-grid">\n';
	for (const plan of plans) {
		html += `<div class="pricing-card${plan.featured ? " featured" : ""}">
			<h5>${plan.name}</h5>
			<p class="desc">${plan.desc}</p>
			<div class="price monthly"><span class="amount">$${plan.monthly}</span><span class="cycle">/month</span></div>
			<div class="price yearly"><span class="amount">$${plan.yearly}</span><span class="cycle">/year</span></div>
			<hr/>
			<ul>
				${plan.features.map((f) => `<li><svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 10l4 4 8-8"/></svg>${f}</li>`).join("\n")}
			</ul>
			<a class="btn btn-primary" href="contact.html">Get Started</a>
		</div>\n`;
	}
	html += "</div>";
	return html;
}

const FAQS = [
	["How secure is my financial data on your platform?", "We take the security and privacy of your financial data very seriously. Our platform employs industry-standard encryption protocols to safeguard your information during transmission and storage."],
	["Do you offer phone support?", "Yes, we offer phone support for all customers. Contact us during business hours for assistance."],
	["Can I use my own domain?", "Yes, you can use your own domain with all plans. Go to your account settings to set up your custom domain."],
	["Do you offer a discount for annual plans?", "Yes, we offer a 20% discount on all annual plans. Contact us for more information."],
	["Can I change my password?", "Yes, you can change your password at any time. Go to your account settings to update your password."],
	["Do you offer a free plan?", "Yes, we offer a free plan with limited features. Upgrade to a paid plan for full access to all features."],
];

function faqAccordion() {
	let html = "";
	for (const [q, a] of FAQS) {
		html += `<div class="accordion">
			<button class="accordion-header">
				<span>${q}</span>
				<svg class="accordion-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<line class="v-line" x1="12" y1="5" x2="12" y2="19"></line>
					<line x1="5" y1="12" x2="19" y2="12"></line>
				</svg>
			</button>
			<div class="accordion-body"><div class="accordion-body-inner"><p>${a}</p></div></div>
		</div>\n`;
	}
	return html;
}

const BLOG_POSTS = {
	1: { title: "Spendings vs Earnings: Achieving the Right Balance", img: 6, excerpt: "Embracing change with business management apps. In the rapidly evolving landscape of modern work, the integration of technology has become a driving force behind increased effi" },
	2: { title: "Bill Pay Made Easy: Streamline Payments in One Spot", img: 2, excerpt: "Bill Pay Made Easy: Streamline Payments in One Spot. Managing multiple bills across different accounts can be overwhelming, but it doesn't have to be." },
	3: { title: "How to Budget for Weddings, Babies, and More", img: 3, excerpt: "Wedding Budgeting Tips. Planning a wedding is an exciting time, but it can also be a stressful one. One of the most important aspects of wedding planning is setting a budget." },
	4: { title: "Tips for Building Wealth Through Property Ownership", img: 4, excerpt: "Property ownership remains one of the most reliable paths to building long-term wealth, but it requires careful planning and financial discipline." },
	5: { title: "Investing for Beginners: Grow Your Money with Micro-Investing", img: 5, excerpt: "Micro-investing apps have made it easier than ever to start growing your money, even with just a few dollars at a time." },
	6: { title: "Tackle Debt Once and for All with This Proven Pay-Off Strategy", img: 6, excerpt: "Debt can feel overwhelming, but a proven, structured pay-off strategy can help you become debt-free faster than you think." },
	7: { title: "How to Handle Online Trolls and Cyberbullying", img: 7, excerpt: "Navigating online harassment can be difficult. Here are practical, level-headed strategies for handling trolls and cyberbullying." },
	8: { title: "Understanding the Risks of Oversharing on Social Media", img: 3, excerpt: "Oversharing personal and financial information on social media can expose you to real risks. Here's what to watch out for." },
	9: { title: "Employee Engagement Strategies That Actually Work", img: 1, excerpt: "Keeping employees engaged takes more than a pizza party. Here are strategies backed by real results." },
	10: { title: "Digital Finance Management: A Modern Must for Busy Lifestyles", img: 5, excerpt: "Digital Finance Management: A Modern Must for Busy Lifestyles. In today's fast-paced world, managing finances can be a daunting task. With multiple accounts, bills, and expens" },
	11: { title: "Learn how to budget for weddings, babies, and more", img: 4, excerpt: "Wedding Budgeting Tips. Planning a wedding is an exciting time, but it can also be a stressful one. One of the most important aspects of wedding planning is setting a budget." },
	12: { title: "How to Budget for Weddings, Babies, and More", img: 3, excerpt: "Wedding Budgeting Tips. Planning a wedding is an exciting time, but it can also be a stressful one. One of the most important aspects of wedding planning is setting a budget." },
	13: { title: "How to Build an Emergency Fund and Plan for the Future", img: 7, excerpt: "An emergency fund is your financial safety net. Here's how to build one and plan confidently for the future." },
};

function blogCard(n) {
	const p = BLOG_POSTS[n];
	return `<div class="blog-card">
		<a href="blog-post-${n}.html" class="thumb"><img src="assets/images/blog/${p.img}.png" alt="${p.title}" loading="lazy" /></a>
		<span class="date">04 Apr, 2025</span>
		<h3><a class="title-link" href="blog-post-${n}.html">${p.title}</a></h3>
		<p>${p.excerpt}</p>
	</div>`;
}

function blogGrid(nums) {
	return `<div class="blog-grid">\n${nums.map(blogCard).join("\n")}\n</div>`;
}

function relatedPost(n) {
	const p = BLOG_POSTS[n];
	return `<section class="related-post">
		<h6>Read More Articles</h6>
		${blogCard(n)}
	</section>`;
}

function pagination(current) {
	const pages = [1, 2, 3];
	const prevHref = current > 1 ? (current - 1 === 1 ? "blog.html" : `blog-page-${current - 1}.html`) : null;
	const nextHref = current < 3 ? `blog-page-${current + 1}.html` : null;
	let html = '<nav class="pagination">';
	html += prevHref ? `<a href="${prevHref}">‹</a>` : `<span style="opacity:.3">‹</span>`;
	for (const p of pages) {
		const href = p === 1 ? "blog.html" : `blog-page-${p}.html`;
		html += p === current ? `<span class="active">${p}</span>` : `<a href="${href}">${p}</a>`;
	}
	html += nextHref ? `<a href="${nextHref}">›</a>` : `<span style="opacity:.3">›</span>`;
	html += "</nav>";
	return html;
}

function expandFragments(html, page) {
	html = html
		.replaceAll("<!--INTEGRATIONS-->", integrationsGrid())
		.replaceAll("<!--TESTIMONIALS-->", testimonialTrack())
		.replaceAll("<!--PRICING-->", pricingCards())
		.replaceAll("<!--FAQ-->", faqAccordion());
	if (page.blogGrid) html = html.replaceAll("<!--BLOGGRID-->", blogGrid(page.blogGrid));
	if (page.pagination) html = html.replaceAll("<!--PAGINATION-->", pagination(page.pagination));
	if (page.relatedPost) html = html.replaceAll("<!--RELATEDPOST-->", relatedPost(page.relatedPost));
	return html;
}

let built = 0;
for (const page of pages) {
	const contentPath = path.join(root, "_content", page.content);
	if (!fs.existsSync(contentPath)) {
		console.warn("MISSING content fragment:", page.content);
		continue;
	}
	const content = fs.readFileSync(contentPath, "utf8");
	const hdr = activeFlags(header, page.active);
	const showCta = page.cta !== false;
	const html = `<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>${page.title}</title>
	<meta name="description" content="${page.description}" />
	<link rel="icon" href="assets/images/logo.png" />
	<link rel="stylesheet" href="assets/fonts/fonts.css" />
	<link rel="stylesheet" href="assets/vendor/aos/aos.css" />
	<link rel="stylesheet" href="assets/css/tokens.css" />
	<link rel="stylesheet" href="assets/css/base.css" />
	<link rel="stylesheet" href="assets/css/pages.css" />
</head>
<body>
${hdr}
<main>
${content}
</main>
${showCta ? ctaBand : ""}
${footer}
<script src="assets/vendor/aos/aos.js"></script>
<script src="assets/js/main.js"></script>
<script>AOS.init({ duration: 600, easing: "ease-out-cubic", once: true, offset: 80 });</script>
</body>
</html>
`;
	fs.writeFileSync(path.join(root, page.file), expandFragments(html, page));
	built++;
}
console.log(`Built ${built}/${pages.length} pages.`);
