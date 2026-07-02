// Per-project detail content + showcase rendering.
window.PROJECT_DETAIL = {
	"echo-ui": {
		title: "Echo UI v3",
		intro:
			"Echo UI is a comprehensive component library and design system built for modern web applications. It provides a cohesive set of accessible, customizable components that help teams ship beautiful interfaces faster while maintaining consistency across their products.",
		body: "Building Echo UI taught me the importance of developer experience. Every component was designed with both the end user and the developer in mind — clear APIs, comprehensive documentation, and sensible defaults that can be easily overridden. The result is a system that teams actually want to use.",
		shots: ["01", "02", "03", "04", "05"],
		captions: [
			"Component showcase",
			"Design tokens system",
			"Interactive documentation",
			"Component API",
			"Developer experience",
		],
		highlights: [
			"Built 50+ accessible components following WAI-ARIA guidelines",
			"Created a flexible theming system with CSS variables and Tailwind",
			"Implemented comprehensive Storybook documentation with interactive examples",
			"Achieved 98% test coverage with unit and integration tests",
		],
		more: ["justos", "scalar"],
	},
	justos: {
		title: "JustOS",
		intro:
			"JustOS is a productivity operating system designed specifically for creators and makers. It combines task management, note-taking, and project planning into a unified workspace that adapts to how creative professionals actually work.",
		body: "The biggest challenge with JustOS was balancing flexibility with simplicity. Creators need tools that can adapt to their unique workflows, but they also need to be able to start working immediately without a steep learning curve. We solved this with a modular architecture that reveals complexity gradually.",
		shots: ["01", "02", "03", "04", "05"],
		captions: [
			"JustOS workspace",
			"Project dashboard",
			"Clean interface design",
			"Task management",
			"Note-taking interface",
		],
		highlights: [
			"Designed a modular workspace system with customizable layouts",
			"Built real-time collaboration features using WebSockets",
			"Implemented offline-first architecture with automatic sync",
			"Created a plugin system for extending functionality",
		],
		more: ["happy-stats", "streamline"],
	},
	"happy-stats": {
		title: "Happy Stats",
		intro:
			"Happy Stats is a lightweight analytics dashboard built for developers who want clear insights without complex setup. It visualizes metrics like commits, deployments, and project activity in a fast, privacy-friendly way.",
		body: "Beyond the technical build, Happy Stats was also an exercise in product thinking. I wanted to design analytics that developers would actually enjoy using — clear typography, instant feedback, and no unnecessary clutter. Every chart was tested against real-world commit data to make sure it told a story at a glance. Building it reminded me how powerful simple, focused tools can be when they're made by someone who uses them every day.",
		shots: ["01", "02", "03", "04", "05"],
		captions: [
			"Dashboard overview",
			"Activity charts",
			"Real-time metrics",
			"Commit analytics",
			"Team insights",
		],
		highlights: [
			"Built a modular charting system using Recharts for clean, customizable visuals",
			"Designed a real-time update flow powered by Supabase subscriptions",
			"Implemented role-based dashboards for teams and solo developers",
			"Optimized queries for large datasets using PostgreSQL window functions",
		],
		more: ["justos", "neobase"],
	},
	"cactus-plant": {
		title: "Cactus Plant",
		intro:
			"Cactus Plant is a realtime collaboration framework for building multiplayer experiences. It abstracts away the complexity of conflict resolution, presence awareness, and state synchronization, letting developers focus on building features.",
		body: "The hardest part of building Cactus Plant was handling edge cases — network partitions, out-of-order messages, and conflicting edits. We spent months perfecting our CRDT implementation to ensure that no matter what happens, data is never lost and conflicts are resolved deterministically.",
		shots: ["01", "02", "03", "04", "05"],
		captions: [
			"Collaboration in action",
			"Architecture overview",
			"Developer experience",
			"CRDT implementation",
			"Real-time sync",
		],
		highlights: [
			"Implemented CRDT-based conflict resolution for seamless collaboration",
			"Built a presence system showing real-time cursor positions and selections",
			"Created an efficient binary protocol reducing bandwidth by 70%",
			"Designed horizontal scaling architecture supporting 100k+ concurrent users",
		],
		more: ["neobase", "sonic"],
	},
};

document.addEventListener("DOMContentLoaded", () => {
	const slug = document.body.dataset.slug;
	const d = window.PROJECT_DETAIL[slug];
	if (!d) return;
	const P = window.assetPrefix;
	const I = window.ICONS;
	const byId = (id) => document.getElementById(id);

	byId("d-title").textContent = d.title;
	byId("d-intro").textContent = d.intro;
	const projMeta = window.DATA.projects.find((p) => p.slug === slug);
	const coverSrc = projMeta
		? projMeta.cover
		: "images/projects/" + slug + "/cover.webp";
	const coverImg = byId("d-cover");
	coverImg.src = P + "assets/" + coverSrc;
	if (coverSrc.endsWith(".svg")) coverImg.classList.add("logo-cover");

	// stack
	byId("d-stack").innerHTML = window.STACK_ICONS.map(
		(s) => `<span class="stack-icon">${s}</span>`,
	).join("");

	// showcase: shots 0+1 full-width | body | shots 2+3 two-column | shot 4 full-width
	const sc = byId("d-showcase");
	const mk = (n, cap, mt) => `<div class="reveal" style="margin-top:${mt}">
      <div class="showcase-img" style="aspect-ratio:16/9"><img src="${P}assets/images/projects/${slug}/${n}.webp" alt="${cap}" loading="lazy"/></div>
      <p class="showcase-caption">${cap}</p>
    </div>`;
	let html = "";
	if (d.shots[0]) html += mk(d.shots[0], d.captions[0] || "", 0);
	if (d.shots[1]) html += mk(d.shots[1], d.captions[1] || "", "1.5rem");
	html += `<p class="detail-intro reveal" style="margin-top:2.5rem">${d.body}</p>`;
	if (d.shots[2] || d.shots[3]) {
		html += `<div class="showcase-grid" style="margin-top:1.5rem">`;
		if (d.shots[2])
			html += `<div class="reveal"><div class="showcase-img" style="aspect-ratio:16/9"><img src="${P}assets/images/projects/${slug}/${d.shots[2]}.webp" alt="${d.captions[2] || ""}" loading="lazy"/></div><p class="showcase-caption">${d.captions[2] || ""}</p></div>`;
		if (d.shots[3])
			html += `<div class="reveal"><div class="showcase-img" style="aspect-ratio:16/9"><img src="${P}assets/images/projects/${slug}/${d.shots[3]}.webp" alt="${d.captions[3] || ""}" loading="lazy"/></div><p class="showcase-caption">${d.captions[3] || ""}</p></div>`;
		html += `</div>`;
	}
	if (d.shots[4]) html += mk(d.shots[4], d.captions[4] || "", "1.5rem");
	sc.innerHTML = html;
	if (byId("d-body")) byId("d-body").style.display = "none";
	if (window.observeReveals) window.observeReveals();

	// highlights
	byId("d-highlights").innerHTML = d.highlights
		.map((h) => `<li>${h}</li>`)
		.join("");

	// more projects
	const more = d.more
		.map((s) => window.DATA.projects.find((p) => p.slug === s))
		.filter(Boolean);
	byId("d-more").innerHTML = window.renderCards ? window.renderCards(more) : "";
});
