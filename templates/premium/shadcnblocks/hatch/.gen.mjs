// One-shot generator for Hatch static pages. Output is plain HTML committed to the repo.
import fs from "fs";
import vm from "vm";
const dir = decodeURIComponent(new URL(".", import.meta.url).pathname);
const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(dir + "work-data.js", "utf8"), ctx);
const WORK = ctx.window.HATCH_WORK,
	SERVICES = ctx.window.HATCH_SERVICES;

const arrow =
	'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>';
const back =
	'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>';

const page = (title, desc, body) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} — Hatch</title>
<meta name="description" content="${desc}">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<script>try{var t=localStorage.getItem('hatch-theme')||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');document.documentElement.classList.toggle('dark',t==='dark')}catch(e){}</script>
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div data-promo></div>
<div data-header></div>
<main>
${body}
</main>
<div data-footer></div>
<script src="app.js"></script>
</body>
</html>
`;

// ---- WORK INDEX ----
const workCards = WORK.map(
	(w) => `      <a class="work-card reveal" href="work-${w.slug}.html">
        <div class="thumb"><img src="assets/images/work/${w.slug}-cover.jpg" alt="${w.title}"><div class="overlay"><span>View project ${arrow}</span></div></div>
        <h3 class="serif">${w.title}</h3><p>${w.blurb}</p>
      </a>`,
).join("\n");
fs.writeFileSync(
	dir + "work.html",
	page(
		"Work",
		"Selected freelance design case studies — branding, packaging, and web.",
		`  <section class="page-hero"><div class="container reveal">
    <span class="eyebrow">Selected work</span>
    <h1 class="serif">Projects I'm proud to have shipped.</h1>
    <p>A mix of brand, packaging, and product work for founders and teams who care about the details.</p>
  </div></section>
  <section style="padding-top:0"><div class="container"><div class="work-grid">
${workCards}
  </div></div></section>`,
	),
);

// ---- WORK DETAIL ----
WORK.forEach((w) => {
	const more = WORK.filter((x) => x.slug !== w.slug)
		.slice(0, 3)
		.map(
			(x) => `      <a class="work-card reveal" href="work-${x.slug}.html">
        <div class="thumb"><img src="assets/images/work/${x.slug}-cover.jpg" alt="${x.title}"><div class="overlay"><span>View project ${arrow}</span></div></div>
        <h3 class="serif">${x.title}</h3><p>${x.blurb}</p>
      </a>`,
		)
		.join("\n");
	fs.writeFileSync(
		dir + `work-${w.slug}.html`,
		page(
			w.title,
			w.blurb,
			`  <section class="page-hero"><div class="container reveal">
    <a class="btn btn-outline" href="work.html" style="margin-bottom:2rem">${back} Back</a>
    <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:1rem;flex-wrap:wrap">
      <h1 class="serif">${w.title}</h1>
      <a class="btn btn-primary" href="contact.html">View live ${arrow}</a>
    </div>
    <p style="margin-top:1.25rem">${w.blurb}</p>
    <div class="meta-row">
      <div class="item"><div class="k">Role</div><div class="v">${w.role}</div></div>
      <div class="item"><div class="k">Timeline</div><div class="v">${w.timeline}</div></div>
      <div class="item"><div class="k">Focus</div><div class="v">${w.focus}</div></div>
    </div>
  </div></section>
  <section style="padding-top:0"><div class="container reveal">
    <img class="cover-img" src="assets/images/work/${w.slug}-cover.jpg" alt="${w.title} cover">
  </div></section>
  <section style="padding-top:0"><div class="container">
    <div class="prose reveal">
      <h2 class="serif">The Challenge</h2><p>${w.challenge}</p>
      <h2 class="serif">What I Did</h2><p>${w.did}</p>
    </div>
    <div class="gallery reveal">
      <img src="assets/images/work/${w.slug}-gallery-1.jpg" alt="${w.title} gallery 1">
      <img src="assets/images/work/${w.slug}-gallery-2.jpg" alt="${w.title} gallery 2">
    </div>
  </div></section>
  <section class="process"><div class="container">
    <div class="section-head reveal"><span class="eyebrow">More work</span><h2 class="serif">Keep exploring.</h2></div>
    <div class="work-grid" style="margin-top:2.5rem">
${more}
    </div>
  </div></section>`,
		),
	);
});

// ---- SERVICES INDEX ----
const svcCards = SERVICES.map(
	(s) => `      <a class="svc-card reveal" href="services-${s.slug}.html">
        <img class="svc-icon" src="assets/images/services/${s.icon}.svg" alt="">
        <span class="eyebrow">${s.eyebrow}</span>
        <h3 class="serif">${s.title}</h3><p class="muted">${s.desc}</p>
        <span class="btn btn-outline" style="margin-top:1.25rem">Learn more ${arrow}</span>
      </a>`,
).join("\n");
fs.writeFileSync(
	dir + "services.html",
	page(
		"Services",
		"Brand, UX & web, product design, and Framer development for founders and teams.",
		`  <section class="page-hero"><div class="container reveal">
    <span class="eyebrow">Services</span>
    <h1 class="serif">Design help, scoped the way you need it.</h1>
    <p>From a single brand sprint to an ongoing product partnership—clear deliverables, honest timelines, and work that ships.</p>
  </div></section>
  <section style="padding-top:0"><div class="container"><div class="svc-grid" style="margin-top:0">
${svcCards}
  </div></div></section>`,
	),
);

// ---- SERVICE DETAIL ----
SERVICES.forEach((s) => {
	const groups = s.groups
		.map(
			(g) =>
				`        <div class="svc-group reveal"><h3 class="serif">${g[0]}</h3><ul>${g[1].map((i) => `<li>${i}</li>`).join("")}</ul></div>`,
		)
		.join("\n");
	const feat = WORK.slice(0, 3)
		.map(
			(x) => `      <a class="work-card reveal" href="work-${x.slug}.html">
        <div class="thumb"><img src="assets/images/work/${x.slug}-cover.jpg" alt="${x.title}"><div class="overlay"><span>View project ${arrow}</span></div></div>
        <h3 class="serif">${x.title}</h3><p>${x.blurb}</p>
      </a>`,
		)
		.join("\n");
	fs.writeFileSync(
		dir + `services-${s.slug}.html`,
		page(
			s.title,
			s.desc,
			`  <section class="page-hero"><div class="container reveal">
    <a class="btn btn-outline" href="services.html" style="margin-bottom:2rem">${back} Back</a>
    <span class="eyebrow">${s.eyebrow}</span>
    <h1 class="serif">${s.title}</h1>
    <p style="margin-top:1.25rem">${s.desc}</p>
    <div style="display:flex;align-items:baseline;gap:.75rem;margin:1.75rem 0 1.25rem">
      <span class="serif" style="font-size:2.5rem">${s.price}</span><span class="muted">Starting at</span>
    </div>
    <a class="btn btn-primary btn-lg" href="contact.html">Get a quote ${arrow}</a>
  </div></section>
  <section style="padding-top:0"><div class="container">
    <div class="svc-detail-grid">
${groups}
    </div>
    <div class="meta-row" style="margin-top:3rem">
      <div class="item"><div class="k">Timeline</div><div class="v">${s.timeline}</div></div>
      <div class="item"><div class="k">Ideal for</div><div class="v">${s.idealFor}</div></div>
    </div>
  </div></section>
  <section class="process"><div class="container">
    <div class="section-head reveal"><span class="eyebrow">Selected work</span><h2 class="serif">Recent projects.</h2></div>
    <div class="work-grid" style="margin-top:2.5rem">
${feat}
    </div>
  </div></section>`,
		),
	);
});

// ---- ABOUT ----
const timeline = [
	[
		"2015 – 2016",
		"Started Freelancing",
		"Began taking on small web design projects while learning the fundamentals. Quickly realized I loved solving complex problems through design.",
	],
	[
		"2016 – 2017",
		"Joined Design Team At Early-Stage Startup",
		"Wore many hats—product design, brand identity, marketing site. Grew the company from 5 to 50 people and shipped features millions use today.",
	],
	[
		"2017 – 2019",
		"Led Design At Series B SaaS Company",
		"Built the design systems that scaled to 500K+ users. Mentored junior designers and established processes that stuck.",
	],
	[
		"2019 – 2021",
		"Shipped Products For Growing Teams",
		"Partnered with founders to launch new features, refine onboarding, and turn rough ideas into shippable, measurable products.",
	],
	[
		"2021 – Now",
		"Independent Design Partner",
		"Freelancing full-time with startups and agencies—brand, web, and product work, end to end, with a calm and reliable process.",
	],
]
	.map(
		(t) =>
			`        <div class="tl-item reveal"><div class="tl-year mono">${t[0]}</div><div class="tl-body"><h3 class="serif">${t[1]}</h3><p>${t[2]}</p></div></div>`,
	)
	.join("\n");
fs.writeFileSync(
	dir + "about.html",
	page(
		"About",
		"Freelance product designer with 8+ years across startups, agencies, and Fortune 500 teams.",
		`  <section class="page-hero"><div class="container reveal">
    <span class="eyebrow">About me</span>
    <h1 class="serif">I create digital products that solve real problems for real people.</h1>
  </div></section>
  <section style="padding-top:0"><div class="container two-col">
    <div class="prose reveal">
      <p>My journey started with a passion for clean design and thoughtful user experiences. Over the past 8 years, I've worked with startups, agencies, and Fortune 500 companies to bring their visions to life.</p>
      <p>I believe great design is invisible—it just works. It's about understanding your users deeply and creating experiences that feel natural and delightful.</p>
      <a class="btn btn-primary" href="contact.html">Book a call ${arrow}</a>
    </div>
    <div class="reveal"><img src="assets/images/about/portrait.jpg" alt="Portrait" style="border:1px solid var(--border)"></div>
  </div></section>
  <section class="process"><div class="container">
    <div class="section-head reveal"><span class="eyebrow">My story</span><h2 class="serif">A path built one project at a time.</h2></div>
    <div class="timeline" style="margin-top:2.5rem">
${timeline}
    </div>
  </div></section>`,
	),
);

// ---- CONTACT ----
fs.writeFileSync(
	dir + "contact.html",
	page(
		"Contact",
		"Ready to start your next project? Get in touch and let's create something great.",
		`  <section class="page-hero"><div class="container reveal">
    <span class="eyebrow">Contact us</span>
    <h1 class="serif">Let's work together</h1>
    <p>Ready to start your next project? Get in touch and let's create something great.</p>
  </div></section>
  <section style="padding-top:0"><div class="container two-col" style="align-items:start">
    <div class="reveal">
      <div class="meta-row" style="flex-direction:column;gap:1.25rem;margin-top:0">
        <div class="item"><div class="k">Phone</div><div class="v">+1 (555) 123-4567</div></div>
        <div class="item"><div class="k">Email</div><div class="v">hello@example.com</div></div>
        <div class="item"><div class="k">Studio</div><div class="v">123 Design Street, San Francisco, CA 94102</div></div>
      </div>
      <div class="hero-trust" style="margin-top:1.5rem">
        <div class="avatars">
          <img src="assets/images/avatars/avatar-1.webp" alt=""><img src="assets/images/avatars/avatar-2.webp" alt="">
          <img src="assets/images/avatars/avatar-3.webp" alt=""><img src="assets/images/avatars/avatar-4.webp" alt="">
        </div><span class="muted">The work that's trusted by teams and founders</span>
      </div>
    </div>
    <form class="form-grid card reveal" style="padding:2rem" onsubmit="event.preventDefault();this.querySelector('.sent').hidden=false">
      <h2 class="serif" style="font-size:1.5rem">Send us a message</h2>
      <div class="field"><label>Full Name *</label><input required placeholder="Jane Doe"></div>
      <div class="field"><label>Email *</label><input type="email" required placeholder="jane@company.com"></div>
      <div class="field"><label>Company (optional)</label><input placeholder="Company"></div>
      <div class="field"><label>Project Details *</label><textarea required placeholder="Tell me about your project…"></textarea></div>
      <button class="btn btn-primary" type="submit">Send message ${arrow}</button>
      <p class="sent muted" hidden style="font-size:.85rem">Thanks — this is a demo form, no message was sent.</p>
    </form>
  </div></section>`,
	),
);

// ---- 404 (subscribe + book route to 404 in source) ----
const notFound = page(
	"404",
	"The page you're looking for doesn't exist or has been moved.",
	`  <section style="min-height:60vh;display:flex;align-items:center"><div class="container text-center reveal" style="max-width:560px">
    <span class="eyebrow">Oops!</span>
    <h1 class="serif" style="font-size:clamp(4rem,12vw,7rem);margin:1rem 0">404</h1>
    <p class="lead" style="margin-bottom:2rem">The page you're looking for doesn't exist or has been moved.</p>
    <div style="display:flex;gap:.85rem;justify-content:center;flex-wrap:wrap">
      <a class="btn btn-primary" href="index.html">Back to Home ${arrow}</a>
      <a class="btn btn-outline" href="contact.html">Contact Support</a>
    </div>
  </div></section>`,
);
fs.writeFileSync(dir + "subscribe.html", notFound);
fs.writeFileSync(dir + "book.html", notFound);
fs.writeFileSync(dir + "404.html", notFound);

console.log("generated pages");
