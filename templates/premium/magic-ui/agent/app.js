// ===== theme =====
const root = document.documentElement;
const stored = localStorage.getItem("skyagent-theme");
if (stored === "dark") root.classList.add("dark");
document.getElementById("themeToggle").addEventListener("click", () => {
	root.classList.toggle("dark");
	localStorage.setItem(
		"skyagent-theme",
		root.classList.contains("dark") ? "dark" : "light",
	);
	drawGlobe();
});

// ===== navbar scroll =====
const navWrap = document.getElementById("navWrap");
const onScroll = () =>
	navWrap.classList.toggle("scrolled", window.scrollY > 20);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ===== mobile menu =====
const mm = document.getElementById("mobileMenu");
document
	.getElementById("hamburger")
	.addEventListener("click", () => mm.classList.toggle("open"));
mm.querySelectorAll("a").forEach((a) =>
	a.addEventListener("click", () => mm.classList.remove("open")),
);

// ===== how-it-works accordion (single open) =====
document.querySelectorAll("#steps .step-head").forEach((h) => {
	h.addEventListener("click", () => {
		const step = h.parentElement;
		const open = step.classList.contains("open");
		document
			.querySelectorAll("#steps .step")
			.forEach((s) => s.classList.remove("open"));
		if (!open) step.classList.add("open");
	});
});

// ===== pricing toggle =====
const seg = document.getElementById("seg");
seg.querySelectorAll("button").forEach((b) => {
	b.addEventListener("click", () => {
		seg.querySelectorAll("button").forEach((x) => x.classList.remove("active"));
		b.classList.add("active");
		const year = b.dataset.period === "year";
		seg.classList.toggle("year", year);
		document.querySelectorAll(".price-amt[data-month]").forEach((el) => {
			const v = year ? el.dataset.year : el.dataset.month;
			el.firstChild.textContent = v + " ";
		});
	});
});

// ===== sun rays =====
const sun = document.getElementById("sunRays");
for (let i = 0; i < 24; i++) {
	const s = document.createElement("span");
	s.style.transform = `rotate(${(i / 24) * 360 - 180}deg)`;
	sun.insertBefore(s, sun.firstChild);
}

// ===== testimonials =====
const testimonials = [
	{
		t: "The AI-driven analytics from #QuantumInsights have revolutionized our product development cycle. Insights are now more accurate and faster than ever. A game-changer for tech companies.",
		n: "Alex Rivera",
		r: "CTO at InnovateTech",
		a: "men-91",
	},
	{
		t: "Implementing #AIStream's customer prediction model has drastically improved our targeting strategy. Seeing a 50% increase in conversion rates! Highly recommend their solutions.",
		n: "Samantha Lee",
		r: "Marketing Director at NextGen Solutions",
		a: "women-12",
	},
	{
		t: "As a startup, we need to move fast and stay ahead. #CodeAI's automated coding assistant helps us do just that. Our development speed has doubled. Essential tool for any startup.",
		n: "Raj Patel",
		r: "Founder & CEO at StartUp Grid",
		a: "men-45",
	},
	{
		t: "#VoiceGen's AI-driven voice synthesis has made creating global products a breeze. Localization is now seamless and efficient. A must-have for global product teams.",
		n: "Emily Chen",
		r: "Product Manager at Digital Wave",
		a: "women-83",
	},
	{
		t: "Leveraging #DataCrunch's AI for our financial models has given us an edge in predictive accuracy. Our investment strategies are now powered by real-time data analytics. Transformative for the finance industry.",
		n: "Michael Brown",
		r: "Data Scientist at FinTech Innovations",
		a: "men-1",
	},
	{
		t: "#LogiTech's supply chain optimization tools have drastically reduced our operational costs. Efficiency and accuracy in logistics have never been better.",
		n: "Linda Wu",
		r: "VP of Operations at LogiChain Solutions",
		a: "women-5",
	},
	{
		t: "By integrating #GreenTech's sustainable energy solutions, we've seen a significant reduction in carbon footprint. Leading the way in eco-friendly business practices. Pioneering change in the industry.",
		n: "Carlos Gomez",
		r: "Head of R&D at EcoInnovate",
		a: "men-14",
	},
	{
		t: "#TrendSetter's market analysis AI has transformed how we approach fashion trends. Our campaigns are now data-driven with higher customer engagement. Revolutionizing fashion marketing.",
		n: "Aisha Khan",
		r: "Chief Marketing Officer at Fashion Forward",
		a: "women-56",
	},
	{
		t: "Implementing #MediCareAI in our patient care systems has improved patient outcomes significantly. Technology and healthcare working hand in hand for better health. A milestone in medical technology.",
		n: "Tom Chen",
		r: "Director of IT at HealthTech Solutions",
		a: "men-18",
	},
	{
		t: "#LearnSmart's AI-driven personalized learning plans have doubled student performance metrics. Education tailored to every learner's needs. Transforming the educational landscape.",
		n: "Sofia Patel",
		r: "CEO at EduTech Innovations",
		a: "women-73",
	},
	{
		t: "With #CyberShield's AI-powered security systems, our data protection levels are unmatched. Ensuring safety and trust in digital spaces. Redefining cybersecurity standards.",
		n: "Jake Morrison",
		r: "CTO at SecureNet Tech",
		a: "men-25",
	},
	{
		t: "#DesignPro's AI has streamlined our creative process, enhancing productivity and innovation. Bringing creativity and technology together. A game-changer for creative industries.",
		n: "Nadia Ali",
		r: "Product Manager at Creative Solutions",
		a: "women-78",
	},
	{
		t: "#VentureAI's insights into startup ecosystems have been invaluable for our growth and funding strategies. Empowering startups with data-driven decisions. A catalyst for startup success.",
		n: "Omar Farooq",
		r: "Founder at Startup Hub",
		a: "men-54",
	},
];
function card(d) {
	const txt = d.t.replace(/(#\w+)/g, '<span class="tag">$1</span>');
	return `<div class="tw-card"><div class="head"><img src="./assets/avatars/${d.a}.jpg" alt="${d.n}"/><div><div class="name">${d.n}</div><div class="role">${d.r}</div></div></div><p>${txt}</p></div>`;
}
const cols = document.getElementById("wallCols");
const split = [[], [], []];
testimonials.forEach((t, i) => split[i % 3].push(t));
split.forEach((group) => {
	const col = document.createElement("div");
	col.className = "col";
	const inner = group.map(card).join("");
	col.innerHTML = `<div class="col-track">${inner}${inner}</div>`;
	cols.appendChild(col);
});

// ===== faq =====
const faqs = [
	{
		q: "What is an AI Agent?",
		a: "An AI Agent is an intelligent software program that can perform tasks autonomously, learn from interactions, and make decisions to help achieve specific goals. It combines artificial intelligence and machine learning to provide personalized assistance and automation.",
	},
	{
		q: "How does SkyAgent work?",
		a: "SkyAgent works by analyzing your requirements, leveraging advanced AI algorithms to understand context, and executing tasks based on your instructions. It can integrate with your workflow, learn from feedback, and continuously improve its performance.",
	},
	{
		q: "How secure is my data?",
		a: "We implement enterprise-grade security measures including end-to-end encryption, secure data centers, and regular security audits. Your data is protected according to industry best practices and compliance standards.",
	},
	{
		q: "Can I integrate my existing tools?",
		a: "Yes, SkyAgent is designed to be highly compatible with popular tools and platforms. We offer APIs and pre-built integrations for seamless connection with your existing workflow tools and systems.",
	},
	{
		q: "Is there a free trial available?",
		a: "Yes, we offer a 14-day free trial that gives you full access to all features. No credit card is required to start your trial, and you can upgrade or cancel at any time.",
	},
	{
		q: "How does SkyAgent save me time?",
		a: "SkyAgent automates repetitive tasks, streamlines workflows, and provides quick solutions to common challenges. This automation and efficiency can save hours of manual work, allowing you to focus on more strategic activities.",
	},
];
const faqList = document.getElementById("faqList");
faqs.forEach((f, i) => {
	const el = document.createElement("div");
	el.className = "faq-item" + (i === 0 ? " open" : "");
	el.innerHTML = `<div class="faq-q">${f.q}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></div><div class="faq-a"><p>${f.a}</p></div>`;
	el.querySelector(".faq-q").addEventListener("click", () => {
		const open = el.classList.contains("open");
		faqList
			.querySelectorAll(".faq-item")
			.forEach((x) => x.classList.remove("open"));
		if (!open) el.classList.add("open");
	});
	faqList.appendChild(el);
});

// ===== reveal on scroll =====
const io = new IntersectionObserver(
	(entries) =>
		entries.forEach((e) => {
			if (e.isIntersecting) {
				e.target.classList.add("in");
				io.unobserve(e.target);
			}
		}),
	{ threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// globe is pure CSS (see styles.css) — robust across headless + real browsers
function drawGlobe() {}
