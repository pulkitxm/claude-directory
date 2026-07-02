/* ============================================================
   PHANATIK — main.js
   ============================================================ */

/* ---- Live Clock ---- */
function updateClock() {
	const now = new Date();
	let h = now.getHours();
	const m = now.getMinutes();
	const ampm = h >= 12 ? "PM" : "AM";
	h = h % 12 || 12;
	const timeStr =
		[h.toString().padStart(2, "0"), m.toString().padStart(2, "0")].join(":") +
		" " +
		ampm;
	const el = document.getElementById("clock");
	if (el) el.textContent = timeStr;
}
setInterval(updateClock, 1000);
updateClock();

/* ---- Current Year ---- */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---- Mobile Menu Toggle ---- */
document.addEventListener("DOMContentLoaded", () => {
	const menuBtn = document.getElementById("menubutton");
	const menu = document.getElementById("menu");
	const menuIcon = document.getElementById("menuIcon");
	let menuOpen = false;

	if (menuBtn && menu) {
		menuBtn.addEventListener("click", () => {
			menuOpen = !menuOpen;
			menuBtn.setAttribute("aria-expanded", menuOpen);
			menu.classList.toggle("expanded", menuOpen);
			if (menuIcon) menuIcon.style.opacity = menuOpen ? "0" : "1";
		});
	}

	/* ---- Category tabs (for any tabbed section) ---- */
	const tabsList = document.getElementById("tabsList");
	const tabPanels = document.getElementById("tabPanels");

	if (tabsList && tabPanels) {
		tabsList.addEventListener("click", (e) => {
			if (e.target.tagName === "BUTTON") {
				const cat = e.target.getAttribute("data-category");
				tabsList.querySelectorAll("button").forEach((btn) => {
					btn.classList.toggle("active", btn === e.target);
				});
				tabPanels.querySelectorAll("[data-category]").forEach((panel) => {
					panel.classList.toggle(
						"hidden",
						panel.getAttribute("data-category") !== cat,
					);
				});
			}
		});
	}

	/* ---- Search Modal ---- */
	const searchItems = [
		{
			slug: "1",
			tags: ["economics"],
			title: "Global Economic Shifts: What to Expect in 2025",
			pubDate: "2025-05-01",
			description:
				"An analysis of the major economic trends shaping the world in 2025.",
			type: "article",
			url: "blog-post.html",
		},
		{
			slug: "10",
			tags: ["business"],
			title: "The Future of Renewable Energy: Innovations and Challenges",
			pubDate: "2025-05-10",
			description: "Exploring the latest advancements in renewable energy.",
			type: "article",
			url: "blog-post.html",
		},
		{
			slug: "11",
			tags: ["business"],
			title: "AI and the Future of Technology: What's Next?",
			pubDate: "2025-05-11",
			description: "A deep dive into the latest AI breakthroughs.",
			type: "article",
			url: "blog-post.html",
		},
		{
			slug: "12",
			tags: ["business"],
			title: "The Future of Digital Health: From Wearables to AI Diagnostics",
			pubDate: "2025-05-12",
			description:
				"Exploring how emerging technologies are transforming healthcare.",
			type: "article",
			url: "blog-post.html",
		},
		{
			slug: "13",
			tags: ["tech"],
			title: "Inside the Chip Race: How Semiconductors Power the Modern World",
			pubDate: "2025-05-13",
			description:
				"A look into how the global demand for microchips is shaping innovation.",
			type: "article",
			url: "blog-post.html",
		},
		{
			slug: "14",
			tags: ["tech"],
			title: "The Silent Revolution: How 5G Is Reshaping Connectivity",
			pubDate: "2025-05-14",
			description:
				"An exploration of how 5G technology is unlocking new opportunities.",
			type: "article",
			url: "blog-post.html",
		},
		{
			slug: "15",
			tags: ["tech"],
			title:
				"Blockchain Beyond Bitcoin: The Future of Decentralized Technology",
			pubDate: "2025-05-15",
			description: "A closer look at how blockchain technology is expanding.",
			type: "article",
			url: "blog-post.html",
		},
		{
			slug: "16",
			tags: ["tech"],
			title: "Human-Machine Collaboration: The Next Evolution in Tech",
			pubDate: "2025-05-16",
			description:
				"Exploring how AI and automation are enhancing human capabilities.",
			type: "article",
			url: "blog-post.html",
		},
		{
			slug: "17",
			tags: ["sports"],
			title:
				"The Data-Driven Athlete: How Technology Is Changing Sports Forever",
			pubDate: "2025-05-17",
			description: "From biometric wearables to AI-powered scouting.",
			type: "article",
			url: "blog-post.html",
		},
		{
			slug: "18",
			tags: ["health"],
			title: "Women's Sports Are Surging — And So Is the Audience",
			pubDate: "2025-05-18",
			description:
				"With record-breaking attendance and rising stars, women's sports are entering a new era.",
			type: "article",
			url: "blog-post.html",
		},
		{
			slug: "19",
			tags: ["sports"],
			title:
				"From Stadiums to Streams: How Sports Viewing Is Going Fully Digital",
			pubDate: "2025-05-19",
			description: "The way fans watch sports is changing fast.",
			type: "article",
			url: "blog-post.html",
		},
		{
			slug: "20",
			tags: ["sports"],
			title: "Esports Aren't the Future — They're the Present",
			pubDate: "2025-05-20",
			description: "Competitive gaming has exploded into a global phenomenon.",
			type: "article",
			url: "blog-post.html",
		},
	];

	const searchButton = document.getElementById("searchButton");
	const searchModal = document.getElementById("searchModal");
	const modalOverlay = document.getElementById("modalOverlay");
	const searchInput = document.getElementById("searchInput");
	const searchResults = document.getElementById("searchResults");

	// Simple fuzzy search without Fuse.js dependency
	function simpleSearch(query, items) {
		if (!query) return [];
		const q = query.toLowerCase();
		return items
			.filter(
				(item) =>
					item.title.toLowerCase().includes(q) ||
					item.description.toLowerCase().includes(q) ||
					item.tags.some((t) => t.toLowerCase().includes(q)),
			)
			.slice(0, 8);
	}

	function formatDate(dateStr) {
		return new Date(dateStr).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "2-digit",
		});
	}

	function renderResults(results) {
		if (!searchInput.value.trim()) {
			searchResults.innerHTML = "";
			searchResults.classList.add("hidden");
			return;
		}
		if (results.length === 0) {
			searchResults.innerHTML =
				'<div><h3 style="padding:1rem;font-weight:500;font-size:1rem;color:var(--color-base-900)">There\'s nothing here...</h3></div>';
			searchResults.classList.remove("hidden");
			return;
		}
		searchResults.innerHTML = results
			.map(
				(item, i) => `
      <a href="${item.url}" class="search-result-item" id="result-${i}">
        <div class="article-meta">
          ${item.tags.map((t) => `<span style="font-size:0.75rem;color:var(--color-base-600);text-transform:capitalize">${t}</span>`).join(", ")}
          <span>·</span>
          <span style="font-size:0.75rem;color:var(--color-base-600)">${formatDate(item.pubDate)}</span>
        </div>
        <h3 class="font-display" style="font-size:1.25rem;color:var(--color-base-900);margin-top:0.5rem">${item.title}</h3>
        <p style="font-size:0.75rem;text-transform:uppercase;color:var(--color-base-600);margin-top:0.25rem">${item.type}</p>
      </a>
    `,
			)
			.join("");
		searchResults.classList.remove("hidden");
	}

	function openSearch(e) {
		e.preventDefault();
		e.stopPropagation();
		searchModal.classList.remove("hidden");
		document.body.style.overflow = "hidden";
		setTimeout(() => searchInput && searchInput.focus(), 100);
	}

	function closeSearch() {
		searchModal.classList.add("hidden");
		document.body.style.overflow = "";
		if (searchInput) searchInput.value = "";
		if (searchResults) {
			searchResults.innerHTML = "";
			searchResults.classList.add("hidden");
		}
	}

	if (searchButton) searchButton.addEventListener("click", openSearch);
	if (modalOverlay) modalOverlay.addEventListener("click", closeSearch);

	if (searchInput) {
		searchInput.addEventListener("input", (e) => {
			const results = simpleSearch(e.target.value.trim(), searchItems);
			renderResults(results);
		});
	}

	document.addEventListener("keydown", (e) => {
		if (
			e.key === "Escape" &&
			searchModal &&
			!searchModal.classList.contains("hidden")
		) {
			closeSearch();
		}
	});

	// Load Fuse.js from CDN for better search if available
	const fuseScript = document.createElement("script");
	fuseScript.src =
		"https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.min.js";
	fuseScript.onload = () => {
		const fuse = new Fuse(searchItems, {
			keys: ["title", "description", "tags"],
			threshold: 0.3,
			includeMatches: true,
		});
		if (searchInput) {
			searchInput.addEventListener(
				"input",
				(e) => {
					const val = e.target.value.trim();
					if (!val) {
						renderResults([]);
						return;
					}
					const results = fuse.search(val).map((r) => r.item);
					renderResults(results);
				},
				{ once: false },
			);
		}
	};
	document.head.appendChild(fuseScript);
});
