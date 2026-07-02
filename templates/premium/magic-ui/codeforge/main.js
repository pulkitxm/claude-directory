// ---------- check icons in feature lists ----------
const CHECK =
	'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
document.querySelectorAll(".feat-list li").forEach((li) => {
	if (li.textContent.startsWith("%C"))
		li.innerHTML = CHECK + li.innerHTML.replace("%C", "");
});

// ---------- navbar scroll ----------
const nav = document.getElementById("nav");
addEventListener(
	"scroll",
	() => nav.classList.toggle("scrolled", scrollY > 20),
	{ passive: true },
);

// ---------- theme toggle ----------
const html = document.documentElement;
document.getElementById("theme-toggle").addEventListener("click", () => {
	html.dataset.theme = html.dataset.theme === "dark" ? "light" : "dark";
});

// ---------- logo cloud ----------
const logos = [
	{
		name: "OpenAI",
		svg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.896zm16.597 3.855l-5.843-3.371 2.019-1.168a.076.076 0 0 1 .071 0l4.83 2.786a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.4-.674zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/></svg>`,
	},
	{
		name: "Retool",
		svg: `<svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor"><rect x="0" y="0" width="14" height="14" rx="2"/><rect x="18" y="0" width="14" height="14" rx="2" opacity=".45"/><rect x="0" y="18" width="14" height="14" rx="2" opacity=".45"/><rect x="18" y="18" width="14" height="14" rx="2"/></svg>`,
	},
	{
		name: "stripe",
		svg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="#635BFF"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/></svg>`,
	},
	{
		name: "Wise",
		svg: `<svg width="22" height="16" viewBox="0 0 180 60" fill="currentColor"><path d="M0 0l18 60h20L49 18l11 42h20L98 0H78L70 36 60 0H40L30 36 20 0H0z"/><path d="M108 0l-8 60h18l8-60h-18zM138 0l-8 60h18l8-60h-18z" opacity=".6"/></svg>`,
	},
	{
		name: "loom",
		svg: `<svg width="18" height="18" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="50" fill="#625DF5"/><circle cx="50" cy="50" r="18" fill="none" stroke="white" stroke-width="8"/><circle cx="50" cy="22" r="8" fill="white"/><circle cx="73" cy="65" r="8" fill="white"/><circle cx="27" cy="65" r="8" fill="white"/></svg>`,
	},
	{
		name: "Medium",
		svg: `<svg width="22" height="14" viewBox="0 0 195 105" fill="currentColor"><ellipse cx="48" cy="52" rx="48" ry="48"/><ellipse cx="130" cy="52" rx="29" ry="48" opacity=".65"/><ellipse cx="181" cy="52" rx="14" ry="48" opacity=".4"/></svg>`,
	},
	{
		name: "Cash App",
		svg: `<svg width="18" height="18" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="22" fill="#00D64F"/><path d="M62 24l-3.5 3.5c5.5 3.2 9.2 9.1 9.2 15.9 0 10.1-8.2 18.3-18.3 18.3-3.3 0-6.4-.9-9-2.5L37 62.7c3.2 1.7 6.9 2.7 10.8 2.7 12.8 0 23.2-10.4 23.2-23.2 0-7.5-3.6-14.2-9-18.2zm-24.5 52l3.5-3.5c-5.5-3.2-9.2-9.1-9.2-15.9 0-10.1 8.2-18.3 18.3-18.3 3.3 0 6.4.9 9 2.5L63 37.3c-3.2-1.7-6.9-2.7-10.8-2.7C39.4 34.6 29 45 29 57.8c0 7.5 3.6 14.2 9 18.2z" fill="white"/></svg>`,
	},
	{
		name: "Linear",
		svg: `<svg width="18" height="18" viewBox="0 0 100 100" fill="currentColor"><path d="M1 67l32 32C14 93 7 86 1 67zm0-15l47 47c-2-.1-5-.4-7-.8L2 51c-.3-2-.6-4-.8-7l-.2 8zm3-18l60 60c-2 1-4 2-6 2L5 52c0-2 0-4-1-7 0-3 0-6 0-11zm6-15l72 72C70 97 58 99 50 99L1 50C1 42 3 30 10 19zm14-12L99 82C90 91 76 97 64 99L1 36C3 24 9 10 24 7zm25-5l49 49C93 65 84 76 74 83L17 26C24 16 35 7 49 2z"/></svg>`,
	},
];
const logoGrid = document.getElementById("logo-grid");
logos.forEach(({ name, svg }) => {
	const cell = document.createElement("div");
	cell.className = "logo-cell";
	cell.innerHTML = `${svg}<span>${name}</span>`;
	logoGrid.appendChild(cell);
});

// ---------- hero tabs ----------
const tabs = document.querySelectorAll(".hero-tab");
tabs.forEach((t) =>
	t.addEventListener("click", () => {
		tabs.forEach((x) => x.classList.remove("active"));
		t.classList.add("active");
	}),
);

// ---------- terminal typewriter ----------
const termLines = [
	{ html: '<span class="prompt">$</span> npx codeforge clone repo', d: 30 },
	{ html: "Cloning repository<span class='ell'></span>", d: 18 },
	{ html: "Resolving deltas: <b>100%</b> (1234/1234), done.", d: 14 },
	{ html: "Analyzing codebase<span class='ell'></span>", d: 18 },
	{ html: "Setting up AI agent<span class='ell'></span>", d: 18 },
	{ html: "✓ Repository cloned successfully", d: 18 },
];
function runTerminal() {
	const body = document.getElementById("terminal-body");
	const status = document.getElementById("term-status");
	body.innerHTML = "";
	status.innerHTML =
		'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-6.2-8.5"/></svg> Cloning';
	let li = 0;
	function nextLine() {
		if (li >= termLines.length) {
			status.innerHTML =
				'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--green)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Cloned';
			setTimeout(runTerminal, 3500);
			return;
		}
		const div = document.createElement("div");
		body.appendChild(div);
		const line = termLines[li];
		const text = line.html;
		let i = 0;
		(function type() {
			// type char-by-char on the rendered string (skip tag chunks)
			div.innerHTML = text.slice(0, i) + '<span class="cursor"></span>';
			// advance past full tags to avoid broken markup
			if (text[i] === "<") {
				const close = text.indexOf(">", i);
				i = close + 1;
			} else {
				i++;
			}
			if (i <= text.length) {
				setTimeout(type, line.d);
			} else {
				div.innerHTML = text;
				li++;
				setTimeout(nextLine, 350);
			}
		})();
	}
	nextLine();
}
runTerminal();

// ---------- testimonials ----------
const testimonials = [
	{
		n: "Alex Rivera",
		r: "CTO at InnovateTech",
		q: "#CodeForge has revolutionized how our team ships code. We move 10x faster now.",
		a: "men-91",
	},
	{
		n: "Samantha Lee",
		r: "Marketing Director at NextGen Solutions",
		q: "The AI agents handle the boilerplate so our engineers focus on real product work.",
		a: "women-12",
	},
	{
		n: "Raj Patel",
		r: "Founder & CEO at StartUp Grid",
		q: "As a small team, CodeForge lets us punch way above our weight. Indispensable.",
		a: "men-45",
	},
	{
		n: "Emily Chen",
		r: "Product Manager at Digital Wave",
		q: "Code reviews that used to take hours now happen instantly with visual diffs.",
		a: "women-83",
	},
	{
		n: "Michael Brown",
		r: "Data Scientist at FinTech Innovations",
		q: "Parallel agents let me run experiments while shipping production features.",
		a: "men-1",
	},
	{
		n: "Linda Wu",
		r: "VP of Operations at LogiChain Solutions",
		q: "#LogiTech's supply chain optimization tools have drastically reduced our operational costs. Efficiency and accuracy in logistics have never been better.",
		a: "women-5",
	},
	{
		n: "Carlos Gomez",
		r: "Head of R&D at EcoInnovate",
		q: "By integrating #GreenTech's sustainable energy solutions, we've seen a significant reduction in carbon footprint. Leading the way in eco-friendly business practices.",
		a: "men-14",
	},
	{
		n: "Aisha Khan",
		r: "Chief Marketing Officer at Fashion Forward",
		q: "#TrendSetter's market analysis AI has transformed how we approach fashion trends. Our campaigns are now data-driven with higher customer engagement.",
		a: "women-56",
	},
	{
		n: "Tom Chen",
		r: "Director of IT at HealthTech Solutions",
		q: "Implementing #MediCareAI in our patient care systems has improved patient outcomes significantly. Technology and healthcare working hand in hand.",
		a: "men-18",
	},
	{
		n: "Sofia Patel",
		r: "CEO at EduTech Innovations",
		q: "#LearnSmart's AI-driven personalized learning plans have doubled student performance metrics. Education tailored to every learner's needs.",
		a: "women-73",
	},
	{
		n: "Jake Morrison",
		r: "CTO at SecureNet Tech",
		q: "With #CyberShield's AI-powered security systems, our data protection levels are unmatched. Redefining cybersecurity standards.",
		a: "men-25",
	},
	{
		n: "Nadia Ali",
		r: "Product Manager at Creative Solutions",
		q: "#DesignPro's AI has streamlined our creative process, enhancing productivity and innovation. A game-changer for creative industries.",
		a: "women-78",
	},
	{
		n: "Omar Farooq",
		r: "Founder at Startup Hub",
		q: "#VentureAI's insights into startup ecosystems have been invaluable for our growth and funding strategies. A catalyst for startup success.",
		a: "men-54",
	},
];
function card(t) {
	const q = t.q.replace(/(#\w+)/g, '<span class="hash">$1</span>');
	return `<div class="testi-card"><div class="testi-head"><img src="assets/avatars/${t.a}.jpg" alt="${t.n}"/><div><div class="nm">${t.n}</div><div class="rl">${t.r}</div></div></div><p>${q}</p></div>`;
}
const cols = [[], [], []];
testimonials.forEach((t, i) => cols[i % 3].push(t));
document.getElementById("testi-cols").innerHTML = cols
	.map((col, i) => {
		const dir = i === 1 ? "down" : "up";
		const inner = col.concat(col).map(card).join("");
		return `<div style="overflow:hidden"><div class="testi-col ${dir}">${inner}</div></div>`;
	})
	.join("");

// ---------- velocity scroll ----------
const vTrack = document.getElementById("velocity");
const phrase = [
	"Ship faster",
	"Build smarter",
	"Code with AI",
	"Scale instantly",
];
vTrack.innerHTML = phrase
	.concat(phrase, phrase)
	.map((p) => `<span>${p}</span><span>★</span>`)
	.join("");
let vx = 0;
let vBoost = 0;
let lastY = scrollY;
addEventListener(
	"scroll",
	() => {
		vBoost += Math.abs(scrollY - lastY) * 2;
		lastY = scrollY;
	},
	{ passive: true },
);
function vLoop() {
	vx -= 1 + vBoost;
	vBoost *= 0.9;
	if (vBoost < 0.1) vBoost = 0;
	const w = vTrack.scrollWidth / 3;
	if (-vx >= w) vx += w;
	vTrack.style.transform = `translateX(${vx}px) skewX(-6deg)`;
	requestAnimationFrame(vLoop);
}
vLoop();

// ---------- pricing toggle ----------
const ptoggle = document.getElementById("price-toggle");
ptoggle.querySelectorAll("button").forEach((b) =>
	b.addEventListener("click", () => {
		ptoggle
			.querySelectorAll("button")
			.forEach((x) => x.classList.remove("active"));
		b.classList.add("active");
		const mode = b.dataset.mode;
		document.querySelectorAll(".plan-price .amt").forEach((a) => {
			a.textContent = mode === "annual" ? a.dataset.annual : a.dataset.monthly;
		});
	}),
);

// ---------- FAQ ----------
const faqs = [
	[
		"What is an AI Agent?",
		"An AI Agent is an intelligent software program that can perform tasks autonomously, learn from interactions, and make decisions to help achieve specific goals. It combines artificial intelligence and machine learning to provide personalized assistance and automation.",
	],
	[
		"How does SkyAgent work?",
		"SkyAgent connects to your repositories and toolchain, analyzes your codebase, and uses large language models to write, review, and refactor code while you stay in control of every change.",
	],
	[
		"How secure is my data?",
		"Your data is encrypted in transit and at rest. Agents run in isolated environments and never train on your private code without explicit permission.",
	],
	[
		"Can I integrate my existing tools?",
		"Yes. Install MCP servers with one click and connect GitHub, databases, and any tool your team already uses.",
	],
	[
		"Is there a free trial available?",
		"Absolutely. Try free for 14 days with full access to all features — no credit card required.",
	],
	[
		"How does SkyAgent save me time?",
		"By handling boilerplate, automating reviews, and running parallel agents, SkyAgent lets your team focus on architecture and shipping features faster.",
	],
];
const faqList = document.getElementById("faq-list");
faqList.innerHTML = faqs
	.map(
		([q, a], i) => `
  <div class="faq-item${i === 0 ? " open" : ""}">
    <button class="faq-q">${q}
      <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
    </button>
    <div class="faq-a"><p>${a}</p></div>
  </div>`,
	)
	.join("");
faqList.querySelectorAll(".faq-item").forEach((item) => {
	const a = item.querySelector(".faq-a");
	if (item.classList.contains("open"))
		a.style.maxHeight = a.scrollHeight + "px";
	item.querySelector(".faq-q").addEventListener("click", () => {
		const open = item.classList.contains("open");
		faqList.querySelectorAll(".faq-item").forEach((x) => {
			x.classList.remove("open");
			x.querySelector(".faq-a").style.maxHeight = null;
		});
		if (!open) {
			item.classList.add("open");
			a.style.maxHeight = a.scrollHeight + "px";
		}
	});
});

// ---------- world map dots ----------
(function worldmap() {
	const c = document.getElementById("worldmap");
	if (!c) return;
	const ctx = c.getContext("2d");
	const W = c.width,
		H = c.height,
		gap = 7,
		r = 1.3;
	// crude landmass mask using ellipses
	const blobs = [
		[120, 110, 70, 45],
		[110, 170, 55, 55],
		[300, 90, 55, 45],
		[300, 150, 50, 60],
		[350, 120, 35, 30],
		[470, 200, 45, 30],
		[200, 110, 40, 30],
	];
	function inLand(x, y) {
		return blobs.some(
			([cx, cy, rx, ry]) =>
				(x - cx) ** 2 / (rx * rx) + (y - cy) ** 2 / (ry * ry) <= 1,
		);
	}
	const style = getComputedStyle(document.body);
	function draw() {
		ctx.clearRect(0, 0, W, H);
		const col =
			document.documentElement.dataset.theme === "dark" ? "#3a3a3a" : "#d4d4d4";
		for (let y = 10; y < H - 10; y += gap)
			for (let x = 10; x < W - 10; x += gap)
				if (inLand(x, y)) {
					ctx.beginPath();
					ctx.arc(x, y, r, 0, Math.PI * 2);
					ctx.fillStyle = col;
					ctx.fill();
				}
	}
	draw();
	new MutationObserver(draw).observe(document.documentElement, {
		attributes: true,
		attributeFilter: ["data-theme"],
	});
})();

// ---------- network constellation canvas ----------
(function networkCanvas() {
	const c = document.getElementById("network-canvas");
	if (!c) return;
	const ctx = c.getContext("2d");
	const W = c.width,
		H = c.height;
	// Node positions: center hub + surrounding nodes
	const nodes = [
		{ x: W / 2, y: H / 2 + 20 }, // center
		{ x: W * 0.28, y: H * 0.22 },
		{ x: W * 0.62, y: H * 0.15 },
		{ x: W * 0.78, y: H * 0.42 },
		{ x: W * 0.68, y: H * 0.78 },
		{ x: W * 0.35, y: H * 0.82 },
		{ x: W * 0.15, y: H * 0.6 },
	];
	// Edges: connect center to all, plus some outer edges
	const edges = [
		[0, 1],
		[0, 2],
		[0, 3],
		[0, 4],
		[0, 5],
		[0, 6],
		[1, 2],
		[2, 3],
		[5, 6],
	];
	function draw() {
		ctx.clearRect(0, 0, W, H);
		const isDark = document.documentElement.dataset.theme === "dark";
		const edgeColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";
		const nodeBg = isDark ? "#1c1c1c" : "#ffffff";
		const nodeBorder = isDark ? "#333" : "#e5e5e5";
		const iconColor = isDark ? "#a1a1a1" : "#737373";

		// Draw edges
		ctx.save();
		ctx.strokeStyle = edgeColor;
		ctx.lineWidth = 1.5;
		edges.forEach(([a, b]) => {
			ctx.beginPath();
			ctx.moveTo(nodes[a].x, nodes[a].y);
			ctx.lineTo(nodes[b].x, nodes[b].y);
			ctx.stroke();
		});
		ctx.restore();

		// Draw nodes
		nodes.forEach(({ x, y }, i) => {
			const r = i === 0 ? 22 : 18;
			ctx.save();
			ctx.beginPath();
			ctx.arc(x, y, r, 0, Math.PI * 2);
			ctx.fillStyle = nodeBg;
			ctx.shadowColor = isDark ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.12)";
			ctx.shadowBlur = 8;
			ctx.fill();
			ctx.shadowBlur = 0;
			ctx.strokeStyle = nodeBorder;
			ctx.lineWidth = 1;
			ctx.stroke();
			ctx.restore();
			// Draw upward arrow icon inside each node
			ctx.save();
			ctx.translate(x, y);
			ctx.strokeStyle = iconColor;
			ctx.lineWidth = 1.8;
			ctx.lineCap = "round";
			ctx.lineJoin = "round";
			// Arrow up
			const s = r * 0.55;
			ctx.beginPath();
			ctx.moveTo(0, s * 0.4);
			ctx.lineTo(0, -s * 0.6);
			ctx.moveTo(-s * 0.5, -s * 0.05);
			ctx.lineTo(0, -s * 0.6);
			ctx.lineTo(s * 0.5, -s * 0.05);
			ctx.stroke();
			ctx.restore();
		});
	}
	draw();
	new MutationObserver(draw).observe(document.documentElement, {
		attributes: true,
		attributeFilter: ["data-theme"],
	});
})();

// ---------- scroll reveal ----------
const io = new IntersectionObserver(
	(entries) =>
		entries.forEach(
			(e) =>
				e.isIntersecting &&
				(e.target.classList.add("in"), io.unobserve(e.target)),
		),
	{ threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
