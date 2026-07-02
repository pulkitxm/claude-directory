/* Matterhaus — shared interaction JS */

// ── Search data (all site content for Fuse.js) ────────────────────────────────
const SEARCH_ITEMS = [
	// Blog posts
	{
		title: "Human-Centered Architecture",
		description:
			"How architects translate vision into space, blending context, materiality, and technology to shape environments that elevate daily life.",
		pubDate: "2025-11-12T00:00:00.000Z",
		slug: "1",
		collection: "posts",
		url: "blog/posts/1.html",
	},
	{
		title: "Breathing new life into existing structures",
		description:
			"Strategies for transforming legacy buildings into high-performance spaces without erasing their character.",
		pubDate: "2025-10-22T00:00:00.000Z",
		slug: "2",
		collection: "posts",
		url: "blog/posts/2.html",
	},
	{
		title: "AI-Augmented design workflows for the studio",
		description:
			"Practical ways architecture teams can pair algorithmic tools with human insight to work faster and smarter.",
		pubDate: "2025-08-05T00:00:00.000Z",
		slug: "3",
		collection: "posts",
		url: "blog/posts/3.html",
	},
	{
		title: "Architecture that supports well-being",
		description:
			"Evidence-based design moves that help healthcare and workplace projects nurture calm, connection, and recovery.",
		pubDate: "2025-09-14T00:00:00.000Z",
		slug: "4",
		collection: "posts",
		url: "blog/posts/4.html",
	},
	// Projects
	{
		title: "Advanced Medical Center",
		description:
			"Regional Health Network • Medical District, Health City • 2025",
		pubDate: "2025-07-05T00:00:00.000Z",
		slug: "advanced-medical-center",
		collection: "projects",
		url: "projects/advanced-medical-center.html",
	},
	{
		title: "Contemporary Art Museum",
		description:
			"Metropolitan Arts Foundation • Cultural District, Art City • 2025",
		pubDate: "2025-11-08T00:00:00.000Z",
		slug: "contemporary-art-museum",
		collection: "projects",
		url: "projects/contemporary-art-museum.html",
	},
	{
		title: "Corporate Headquarters Tower",
		description:
			"TechNova Corporation • Innovation District, Silicon Valley • 2025",
		pubDate: "2025-11-09T00:00:00.000Z",
		slug: "corporate-headquarters-tower",
		collection: "projects",
		url: "projects/corporate-headquarters-tower.html",
	},
	{
		title: "Innovation Research Campus",
		description:
			"Global Research Institute • Research Park, Innovation Valley • 2025",
		pubDate: "2025-08-10T00:00:00.000Z",
		slug: "innovation-research-campus",
		collection: "projects",
		url: "projects/innovation-research-campus.html",
	},
	{
		title: "Cultural Arts Center",
		description: "Metro Arts Foundation • Arts District, Cultural City • 2025",
		pubDate: "2025-10-15T00:00:00.000Z",
		slug: "cultural-arts-center",
		collection: "projects",
		url: "projects/cultural-arts-center.html",
	},
	{
		title: "Luxury Resort & Retail Complex",
		description:
			"Coastal Resorts Group • Beachfront District, Paradise Bay • 2025",
		pubDate: "2025-05-18T00:00:00.000Z",
		slug: "luxury-resort-retail-complex",
		collection: "projects",
		url: "projects/luxury-resort-retail-complex.html",
	},
	{
		title: "Sustainable Urban Village",
		description: "Green Living Cooperative • Eco District, Green City • 2025",
		pubDate: "2025-09-20T00:00:00.000Z",
		slug: "sustainable-urban-village",
		collection: "projects",
		url: "projects/sustainable-urban-village.html",
	},
	{
		title: "Metropolitan Transit Hub",
		description: "City Transit Authority • Downtown Core, Metro Central • 2025",
		pubDate: "2025-04-22T00:00:00.000Z",
		slug: "metropolitan-transit-hub",
		collection: "projects",
		url: "projects/metropolitan-transit-hub.html",
	},
	{
		title: "Modern Residential Complex",
		description:
			"Urban Living Developments • Downtown District, Metro City • 2025",
		pubDate: "2025-11-01T00:00:00.000Z",
		slug: "modern-residential-complex",
		collection: "projects",
		url: "projects/modern-residential-complex.html",
	},
	{
		title: "University Innovation Hub",
		description: "Metro University • Technology Campus, Academic City • 2025",
		pubDate: "2025-06-12T00:00:00.000Z",
		slug: "university-innovation-hub",
		collection: "projects",
		url: "projects/university-innovation-hub.html",
	},
	// Services
	{
		title: "Architectural Design",
		description:
			"Comprehensive architectural design services from concept to construction documents",
		pubDate: null,
		slug: "architectural-design",
		collection: "services",
		url: "services/architectural-design.html",
	},
	{
		title: "Construction Administration",
		description:
			"Comprehensive construction oversight ensuring quality, compliance, and successful project delivery",
		pubDate: null,
		slug: "construction-administration",
		collection: "services",
		url: "services/construction-administration.html",
	},
	{
		title: "Interior Design",
		description:
			"Complete interior design solutions that enhance functionality and aesthetics",
		pubDate: null,
		slug: "interior-design",
		collection: "services",
		url: "services/interior-design.html",
	},
	{
		title: "Project Management",
		description:
			"Expert project management ensuring your architectural vision is delivered on time, within budget, and to the highest standards",
		pubDate: null,
		slug: "project-management",
		collection: "services",
		url: "services/project-management.html",
	},
	{
		title: "Urban Planning & Master Planning",
		description: "Strategic urban planning and master development solutions",
		pubDate: null,
		slug: "urban-planning",
		collection: "services",
		url: "services/urban-planning.html",
	},
	{
		title: "Landscape Architecture",
		description:
			"Transforming outdoor spaces into functional, beautiful environments that complement architectural design",
		pubDate: null,
		slug: "landscape-architecture",
		collection: "services",
		url: "services/landscape-architecture.html",
	},
	{
		title: "3D Visualization & Rendering",
		description:
			"Photorealistic 3D visualizations and virtual reality experiences",
		pubDate: null,
		slug: "visualization-rendering",
		collection: "services",
		url: "services/visualization-rendering.html",
	},
	{
		title: "Sustainable Design",
		description:
			"Creating environmentally responsible buildings that minimize ecological impact and maximize efficiency",
		pubDate: null,
		slug: "sustainable-design",
		collection: "services",
		url: "services/sustainable-design.html",
	},
	// Team
	{
		title: "Sofia Ramirez",
		description: "Project Architect",
		pubDate: null,
		slug: "sofia-ramirez",
		collection: "team",
		url: "team/sofia-ramirez.html",
	},
	{
		title: "Jordan Smith",
		description: "Architectural Designer",
		pubDate: null,
		slug: "jordan-smith",
		collection: "team",
		url: "team/jordan-smith.html",
	},
	{
		title: "David Lee",
		description: "Senior Architect",
		pubDate: null,
		slug: "david-lee",
		collection: "team",
		url: "team/david-lee.html",
	},
	// Legal
	{
		title: "Cookies",
		description: "",
		pubDate: "2025-11-12T00:00:00.000Z",
		slug: "cookies",
		collection: "legal",
		url: "legal/cookies.html",
	},
	{
		title: "Privacy",
		description: "",
		pubDate: "2025-11-12T00:00:00.000Z",
		slug: "privacy",
		collection: "legal",
		url: "legal/privacy.html",
	},
	{
		title: "Copyright",
		description: "",
		pubDate: "2025-11-12T00:00:00.000Z",
		slug: "copyright",
		collection: "legal",
		url: "legal/copyright.html",
	},
	{
		title: "Disclaimer",
		description: "",
		pubDate: "2025-11-12T00:00:00.000Z",
		slug: "disclaimer",
		collection: "legal",
		url: "legal/disclaimer.html",
	},
	{
		title: "Terms",
		description: "",
		pubDate: "2025-11-12T00:00:00.000Z",
		slug: "terms",
		collection: "legal",
		url: "legal/terms.html",
	},
	// Careers
	{
		title: "Architectural Intern",
		description: "New York, NY • internship",
		pubDate: null,
		slug: "architectural-intern",
		collection: "careers",
		url: "careers/architectural-intern.html",
	},
	{
		title: "Interior Designer",
		description: "Los Angeles, CA • full-time",
		pubDate: null,
		slug: "interior-designer",
		collection: "careers",
		url: "careers/interior-designer.html",
	},
	{
		title: "BIM Specialist",
		description: "Remote / On-site • full-time",
		pubDate: null,
		slug: "bim-specialist",
		collection: "careers",
		url: "careers/bim-specialist.html",
	},
	{
		title: "Project Manager",
		description: "Remote / On-site • full-time",
		pubDate: null,
		slug: "project-manager",
		collection: "careers",
		url: "careers/project-manager.html",
	},
	{
		title: "Senior Architect",
		description: "New York, NY • full-time",
		pubDate: null,
		slug: "senior-architect",
		collection: "careers",
		url: "careers/senior-architect.html",
	},
];

// ── Utility: resolve root-relative URL from current page depth ────────────────
function rootUrl(path) {
	// count directory depth from base (assets/js/main.js loaded with a relative path from the HTML)
	// Instead we use data-root attribute on <body> to know the root prefix
	const root = document.body.dataset.root || "";
	return root + path;
}

// ── Mobile menu ───────────────────────────────────────────────────────────────
function initMobileMenu() {
	const toggle = document.getElementById("mobile-menu-toggle");
	const menu = document.getElementById("mobile-menu");
	const header = document.querySelector("header");

	function updateMenuTop() {
		if (!menu || !header) return;
		const h = header.getBoundingClientRect().height;
		menu.style.top = `${h}px`;
	}

	updateMenuTop();
	window.addEventListener("resize", updateMenuTop);

	toggle?.addEventListener("click", () => {
		menu?.classList.toggle("hidden");
	});

	// Close on outside click
	document.addEventListener("click", (e) => {
		if (
			menu &&
			!menu.classList.contains("hidden") &&
			!menu.contains(e.target) &&
			!toggle.contains(e.target)
		) {
			menu.classList.add("hidden");
		}
	});
}

// ── Search modal ──────────────────────────────────────────────────────────────
function initSearch() {
	const searchButton = document.getElementById("searchButton");
	const searchModal = document.getElementById("searchModal");
	const searchInput = document.getElementById("searchInput");
	const searchResults = document.getElementById("searchResults");
	const closeSearch = document.getElementById("closeSearch");

	if (!searchButton || !searchModal) return;

	// Resolve search item URLs relative to current page root
	const root = document.body.dataset.root || "";
	const items = SEARCH_ITEMS.map((item) => ({ ...item, url: root + item.url }));

	// Load Fuse.js dynamically then init
	const script = document.createElement("script");
	script.src = "https://cdn.jsdelivr.net/npm/fuse.js@7.1.0/dist/fuse.min.js";
	script.onload = () => {
		const fuse = new Fuse(items, {
			keys: ["title", "description", "collection", "pubDate"],
			threshold: 0.3,
			includeMatches: true,
		});

		searchResults.classList.add("hidden");

		function openSearch(e) {
			e.preventDefault();
			e.stopPropagation();
			searchModal.classList.remove("hidden");
			requestAnimationFrame(() => {
				searchModal.classList.remove("opacity-0");
				searchModal.classList.add("opacity-100");
			});
			document.body.style.overflow = "hidden";
			setTimeout(() => searchInput.focus(), 100);
		}

		function closeSearchModal(e) {
			if (e) {
				e.preventDefault();
				e.stopPropagation();
			}
			searchModal.classList.remove("opacity-100");
			searchModal.classList.add("opacity-0");
			const onEnd = (evt) => {
				if (evt.target !== searchModal) return;
				searchModal.classList.add("hidden");
				searchModal.removeEventListener("transitionend", onEnd);
			};
			searchModal.addEventListener("transitionend", onEnd);
			document.body.style.overflow = "";
			searchInput.value = "";
			searchResults.innerHTML = "";
			searchResults.classList.add("hidden");
		}

		function renderResults(results) {
			if (!searchInput.value.trim()) {
				searchResults.innerHTML = "";
				searchResults.classList.add("hidden");
				return;
			}
			if (results.length === 0) {
				searchResults.innerHTML = `<div><h3 class="p-4 duration-300 hover:bg-white/80 backdrop-blur bg-white/90">There's nothing here.</h3></div>`;
				searchResults.classList.remove("hidden");
				return;
			}
			searchResults.innerHTML = results
				.map((result) => {
					const item = result.item;
					const meta = item.pubDate
						? new Date(item.pubDate).toLocaleDateString("en-US", {
								year: "numeric",
								month: "long",
								day: "2-digit",
							})
						: item.collection.charAt(0).toUpperCase() +
							item.collection.slice(1);
					return `<div class="relative block p-4 duration-300 hover:bg-white/80 backdrop-blur bg-white/90">
          <a href="${item.url}" class="absolute inset-0 z-10"></a>
          <p class="block text-xs text-sm text-base-600">${meta}</p>
          <h3 class="block mt-2 text-sm font-medium text-base-900">${item.title}</h3>
          <p class="block text-xs text-base-600">${item.description ?? ""}</p>
        </div>`;
				})
				.join("");
			searchResults.classList.remove("hidden");
		}

		searchButton.addEventListener("click", openSearch);
		searchButton.addEventListener("touchend", openSearch);
		closeSearch?.addEventListener("click", closeSearchModal);
		closeSearch?.addEventListener("touchend", closeSearchModal);

		let debounce;
		searchInput.addEventListener("input", (e) => {
			clearTimeout(debounce);
			const value = e.target.value.trim();
			debounce = setTimeout(() => {
				const results = value ? fuse.search(value).slice(0, 20) : [];
				renderResults(results);
			}, 120);
		});

		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape" && !searchModal.classList.contains("hidden"))
				closeSearchModal();
		});

		searchModal.addEventListener("click", (e) => {
			const modalContent = e.target.closest(".inline-block");
			if (!modalContent) closeSearchModal(e);
		});

		document.addEventListener("keydown", (e) => {
			const target = e.target;
			const isTyping =
				target &&
				(target.tagName === "INPUT" ||
					target.tagName === "TEXTAREA" ||
					target.isContentEditable);
			const isCmdK = e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey);
			const isSlash = e.key === "/";
			const isOpen = !searchModal.classList.contains("hidden");
			if (!isTyping && !isOpen && (isCmdK || isSlash)) {
				e.preventDefault();
				openSearch(e);
			}
		});
	};
	document.head.appendChild(script);
}

// ── Init ──────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
	initMobileMenu();
	initSearch();
});
