/* Simplexity — shared JS: theme toggle + search modal */

// ── Theme persistence ──
(function () {
	const stored = localStorage.getItem("theme");
	if (
		stored === "dark" ||
		(!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)
	) {
		document.documentElement.classList.add("dark");
	}
})();

// Search data
const SEARCH_ITEMS = [
	{
		title: "Five Google Fonts pairings for 2024",
		description:
			"These fonts offer a modern look and work well together, making them a great choice for your next project.",
		url: "blog/posts/1.html",
		type: "Post",
	},
	{
		title: "Achieving peak website performance: a 2026 guide",
		description:
			"Uncover key strategies for maximizing site performance, from load speed improvements to enhancing overall user experience.",
		url: "blog/posts/10.html",
		type: "Post",
	},
	{
		title: "Nineteen of the best sites to hunt for free fonts",
		description:
			"Your essential guide to the 19 best sources for high-quality free and open-source fonts.",
		url: "blog/posts/2.html",
		type: "Post",
	},
	{
		title:
			"Dive into darkness with 5 striking dark color palettes for your next website",
		description:
			"Explore bold and dramatic tones to elevate your design aesthetic.",
		url: "blog/posts/3.html",
		type: "Post",
	},
	{
		title:
			"Website directories for finding inspiration for your next landing page or website",
		description:
			"This collection of websites of the best websites to find inspiration on 2024.",
		url: "blog/posts/4.html",
		type: "Post",
	},
	{
		title:
			"2024 Web Design Trends: What's Shaping the Future of Digital Design?",
		description:
			"Exploring the Future of Web Design: Trends to Inspire and Elevate Your 2024 Projects",
		url: "blog/posts/5.html",
		type: "Post",
	},
	{
		title:
			"Maximizing website performance in 2024: essential tips for speed and efficiency",
		description:
			"Learn the top strategies to enhance load times, boost user experience, and optimize your site for a faster, smoother digital presence.",
		url: "blog/posts/6.html",
		type: "Post",
	},
	{
		title: "Optimizing your website for speed and user engagement in 2024",
		description:
			"Discover effective techniques to reduce load times, enhance user interactions, and ensure your site delivers a fast, engaging experience.",
		url: "blog/posts/7.html",
		type: "Post",
	},
	{
		title: "Website speed secrets: optimizing performance in 2024",
		description:
			"Explore proven methods for improving site speed, optimizing user experience, and achieving a high-performance digital platform.",
		url: "blog/posts/8.html",
		type: "Post",
	},
	{
		title:
			"Enhancing digital experiences with faster website performance in 2024",
		description:
			"Learn the best practices to improve page load speed, boost user satisfaction, and create a seamless online experience.",
		url: "blog/posts/9.html",
		type: "Post",
	},
	{
		title: "Lexington Themes",
		description:
			"Free and premium multipage themes and UI Kits for freelancers, developers, businesses, and personal use.",
		url: "projects/1.html",
		type: "Project",
	},
	{
		title: "Colors & fonts",
		description:
			"Color & typography tools for web developers & digital designers",
		url: "projects/2.html",
		type: "Project",
	},
	{
		title: "Studio Max",
		description: "A dark-themed, gradient-filled masterpiece for agency sites.",
		url: "store/1.html",
		type: "Store",
	},
	{
		title: "Carbon",
		description:
			"Carbon is a bold, dark, with vibrant orange accents, designed for creative directory sites.",
		url: "store/2.html",
		type: "Store",
	},
];

document.addEventListener("DOMContentLoaded", function () {
	// ── Theme toggle ──
	const themeBtn = document.getElementById("themeToggle");
	if (themeBtn) {
		themeBtn.addEventListener("click", function () {
			const isDark = document.documentElement.classList.toggle("dark");
			localStorage.setItem("theme", isDark ? "dark" : "light");
		});
	}

	// ── Search modal ──
	const searchBtn = document.getElementById("searchButton");
	const searchModal = document.getElementById("searchModal");
	const modalOverlay = document.getElementById("modalOverlay");
	const searchInput = document.getElementById("searchInput");
	const searchResults = document.getElementById("searchResults");

	function openSearch() {
		if (!searchModal) return;
		searchModal.classList.add("open");
		document.body.style.overflow = "hidden";
		setTimeout(() => {
			if (searchInput) searchInput.focus();
		}, 50);
	}

	function closeSearch() {
		if (!searchModal) return;
		searchModal.classList.remove("open");
		document.body.style.overflow = "";
		if (searchInput) searchInput.value = "";
		if (searchResults) searchResults.innerHTML = "";
	}

	if (searchBtn) searchBtn.addEventListener("click", openSearch);
	if (modalOverlay) modalOverlay.addEventListener("click", closeSearch);

	// Cmd+K / Ctrl+K shortcut
	document.addEventListener("keydown", function (e) {
		if ((e.metaKey || e.ctrlKey) && e.key === "k") {
			e.preventDefault();
			if (searchModal && searchModal.classList.contains("open")) {
				closeSearch();
			} else {
				openSearch();
			}
		}
		if (
			e.key === "Escape" &&
			searchModal &&
			searchModal.classList.contains("open")
		) {
			closeSearch();
		}
	});

	// Search logic (simple fuzzy match without Fuse.js dependency)
	if (searchInput) {
		searchInput.addEventListener("input", function () {
			const query = this.value.trim().toLowerCase();
			if (!query) {
				searchResults.innerHTML = "";
				return;
			}

			const results = SEARCH_ITEMS.filter(
				(item) =>
					item.title.toLowerCase().includes(query) ||
					item.description.toLowerCase().includes(query) ||
					item.type.toLowerCase().includes(query),
			).slice(0, 8);

			if (results.length === 0) {
				searchResults.innerHTML =
					'<div style="padding:0.75rem 1rem;font-size:0.875rem;color:var(--color-text-muted)">No results found</div>';
				return;
			}

			// Determine base path relative to current page
			const depth = (window.location.pathname.match(/\//g) || []).length;
			const base = depth <= 1 ? "" : "../".repeat(depth - 1);

			searchResults.innerHTML = results
				.map(
					(item) => `
        <a href="${base}${item.url}" class="search-result-item">
          <span class="search-result-type">${item.type}</span>
          <span class="search-result-title">${item.title}</span>
          <span class="search-result-desc">${item.description}</span>
        </a>
      `,
				)
				.join("");
		});
	}
});
