/* ProFolioX — App JS */

// ── Theme ────────────────────────────────────────────────────────────────────
(function () {
	const stored = localStorage.getItem("theme");
	const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	const isDark = stored ? stored === "dark" : prefersDark;
	if (isDark) document.documentElement.classList.add("dark");
	else document.documentElement.classList.remove("dark");
})();

document.addEventListener("DOMContentLoaded", () => {
	// ── Theme toggle ────────────────────────────────────────────────────────
	const isDark = () => document.documentElement.classList.contains("dark");

	const setTheme = (dark) => {
		document.documentElement.classList.toggle("dark", dark);
		localStorage.setItem("theme", dark ? "dark" : "light");
		document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
			btn.setAttribute("aria-checked", dark ? "true" : "false");
		});
	};

	document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
		btn.setAttribute("aria-checked", isDark() ? "true" : "false");
		btn.addEventListener("click", () => setTheme(!isDark()));
	});

	// ── Nav stagger animation ──────────────────────────────────────────────
	const animateNav = (container) => {
		if (!container) return;
		const links = container.querySelectorAll(".nav-link");
		links.forEach((el, i) => {
			el.style.opacity = "0";
			el.style.transform = "translateY(20px)";
			el.style.transition = "none";
			setTimeout(() => {
				el.style.transition = `opacity 0.3s ease-out ${i * 0.1}s, transform 0.3s ease-out ${i * 0.1}s`;
				el.style.opacity = "1";
				el.style.transform = "translateY(0)";
			}, 50);
		});
	};

	animateNav(document.getElementById("menuContent"));
	animateNav(document.getElementById("mobileMenuContent"));

	// ── Mobile drawer ───────────────────────────────────────────────────────
	const drawer = document.getElementById("mobileDrawer");
	const drawerOverlay = document.getElementById("drawerOverlay");
	const hamburger = document.getElementById("hamburger");
	const closeDrawer = document.getElementById("closeDrawer");

	const openDrawer = () => {
		if (!drawer) return;
		drawer.classList.add("open");
		document.body.style.overflow = "hidden";
		setTimeout(
			() => animateNav(document.getElementById("mobileMenuContent")),
			50,
		);
	};

	const closeDrawerFn = () => {
		if (!drawer) return;
		drawer.classList.remove("open");
		document.body.style.overflow = "";
	};

	if (hamburger) hamburger.addEventListener("click", openDrawer);
	if (closeDrawer) closeDrawer.addEventListener("click", closeDrawerFn);
	if (drawerOverlay) drawerOverlay.addEventListener("click", closeDrawerFn);

	// ── Search modal ────────────────────────────────────────────────────────
	const searchModal = document.getElementById("searchModal");
	const searchInput = document.getElementById("searchInput");
	const searchResults = document.getElementById("searchResults");
	const searchBtn = document.querySelectorAll("[data-search-toggle]");

	const searchItems = [
		{
			pubDate: "2025-02-01T00:00:00.000Z",
			title: "Breaking down complex ui patterns",
			description:
				"A guide to understanding and implementing advanced user interface concepts.",
			slug: "1",
			collection: "posts",
			collectionLabel: "Blog",
			href: "blog/posts/1.html",
		},
		{
			pubDate: "2025-02-02T00:00:00.000Z",
			title: "Crafting user experiences with precision",
			description:
				"Exploring the intersection of engineering and design to create intuitive user interfaces.",
			slug: "2",
			collection: "posts",
			collectionLabel: "Blog",
			href: "blog/posts/2.html",
		},
		{
			pubDate: "2025-02-03T00:00:00.000Z",
			title: "The art of balancing beauty and function",
			description:
				"How to approach design engineering to deliver visually stunning yet functional products.",
			slug: "3",
			collection: "posts",
			collectionLabel: "Blog",
			href: "blog/posts/3.html",
		},
		{
			pubDate: "2025-02-04T00:00:00.000Z",
			title: "Design systems as a foundation for success",
			description:
				"How to build scalable and reusable design systems for web development.",
			slug: "4",
			collection: "posts",
			collectionLabel: "Blog",
			href: "blog/posts/4.html",
		},
		{
			pubDate: "2025-02-05T00:00:00.000Z",
			title: "Optimizing UI/UX for performance",
			description:
				"Techniques for designing interfaces that are fast, responsive, and user-friendly.",
			slug: "5",
			collection: "posts",
			collectionLabel: "Blog",
			href: "blog/posts/5.html",
		},
		{
			pubDate: "2025-02-06T00:00:00.000Z",
			title: "Accessibility in design engineering",
			description:
				"Why inclusive design is the cornerstone of successful digital products.",
			slug: "6",
			collection: "posts",
			collectionLabel: "Blog",
			href: "blog/posts/6.html",
		},
		{
			title: "Sinequanone",
			description:
				"Developed websites and supported branding efforts for a diverse clientele, ranging from independent professionals to large enterprises.",
			slug: "1",
			collection: "work",
			collectionLabel: "Work",
			href: "work/1.html",
		},
		{
			title: "Granular",
			description:
				"Developed websites and branding strategies for eco-focused companies, helping them amplify their mission and values.",
			slug: "2",
			collection: "work",
			collectionLabel: "Work",
			href: "work/2.html",
		},
		{
			title: "Sekkaa",
			description:
				"Designed and developed websites and branding solutions for eco-conscious companies with a focus on sustainability.",
			slug: "3",
			collection: "work",
			collectionLabel: "Work",
			href: "work/3.html",
		},
		{
			title: "EarthWise",
			description:
				"Developed websites and branding strategies for eco-focused businesses dedicated to environmental responsibility and sustainable practices.",
			slug: "4",
			collection: "work",
			collectionLabel: "Work",
			href: "work/4.html",
		},
		{
			title: "Stucko",
			description:
				"Developed websites and branding strategies for eco-focused businesses dedicated to environmental responsibility and sustainable practices.",
			slug: "5",
			collection: "work",
			collectionLabel: "Work",
			href: "work/5.html",
		},
		{
			title: "Enviroson",
			description:
				"Developed websites and branding strategies for eco-focused businesses dedicated to environmental responsibility and sustainable practices.",
			slug: "6",
			collection: "work",
			collectionLabel: "Work",
			href: "work/6.html",
		},
		{
			title: "Sample Notebook",
			description:
				"A meticulously designed notebook for creatives, professionals, and minimalism enthusiasts.",
			slug: "1",
			collection: "store",
			collectionLabel: "Store",
			href: "store/1.html",
		},
		{
			title: "The Field Journal",
			description:
				"Inspired by industrial design and built for creatives on the move.",
			slug: "2",
			collection: "store",
			collectionLabel: "Store",
			href: "store/2.html",
		},
		{
			title: "The Field Keyboard",
			description:
				"A precision-engineered 60% mechanical keyboard designed for creators on the go.",
			slug: "3",
			collection: "store",
			collectionLabel: "Store",
			href: "store/3.html",
		},
		{
			title: "Apple Smartwatch",
			description:
				"The Apple Smartwatch is the perfect companion for anyone looking to stay connected.",
			slug: "4",
			collection: "store",
			collectionLabel: "Store",
			href: "store/4.html",
		},
		{
			title: "Grid System Planner",
			description: "A must-have planner for product designers and developers.",
			slug: "5",
			collection: "store",
			collectionLabel: "Store",
			href: "store/5.html",
		},
		{
			title: "The Focus Journal",
			description:
				"A structured yet flexible journal designed to help creatives and developers maintain focus.",
			slug: "6",
			collection: "store",
			collectionLabel: "Store",
			href: "store/6.html",
		},
	];

	const openSearch = (e) => {
		if (e) {
			e.preventDefault();
			e.stopPropagation();
		}
		if (!searchModal) return;
		searchModal.classList.add("open");
		document.body.style.overflow = "hidden";
		setTimeout(() => searchInput && searchInput.focus(), 100);
	};

	const closeSearch = () => {
		if (!searchModal) return;
		searchModal.classList.remove("open");
		document.body.style.overflow = "";
		if (searchInput) searchInput.value = "";
		if (searchResults) {
			searchResults.innerHTML = "";
			searchResults.classList.remove("visible");
		}
	};

	searchBtn.forEach((btn) => btn.addEventListener("click", openSearch));

	const modalOverlay = document.getElementById("modalOverlay");
	if (modalOverlay) modalOverlay.addEventListener("click", closeSearch);

	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") closeSearch();
		if ((e.metaKey || e.ctrlKey) && e.key === "k") {
			e.preventDefault();
			openSearch();
		}
	});

	if (searchInput && searchResults) {
		// Lazy-load Fuse
		let fuse = null;
		const initFuse = () => {
			if (fuse) return;
			if (typeof Fuse !== "undefined") {
				fuse = new Fuse(searchItems, {
					keys: ["title", "description", "collection"],
					threshold: 0.3,
					includeMatches: true,
				});
			}
		};

		searchInput.addEventListener("input", () => {
			initFuse();
			const q = searchInput.value.trim();
			if (!q) {
				searchResults.innerHTML = "";
				searchResults.classList.remove("visible");
				return;
			}
			if (!fuse) {
				return;
			}
			const results = fuse.search(q);
			if (!results.length) {
				searchResults.innerHTML = `<div style="padding:2rem"><p style="font-size:0.875rem;color:var(--text-secondary)">There's nothing here...</p></div>`;
				searchResults.classList.add("visible");
				return;
			}
			searchResults.innerHTML = results
				.map(({ item }) => {
					const date = item.pubDate
						? new Date(item.pubDate).toLocaleDateString("en-US", {
								year: "numeric",
								month: "long",
								day: "2-digit",
							})
						: "";
					return `<a class="search-result-item" href="${item.href}">
          <div class="search-result-meta">
            <span class="search-result-tag">${item.collectionLabel}</span>
            ${date ? `<span class="search-result-date">${date}</span>` : ""}
          </div>
          <div class="search-result-title">${item.title}</div>
          <div class="search-result-desc">${item.description}</div>
        </a>`;
				})
				.join("");
			searchResults.classList.add("visible");
		});
	}

	// ── Accordion ──────────────────────────────────────────────────────────
	document.querySelectorAll(".accordion-trigger").forEach((btn) => {
		btn.addEventListener("click", () => {
			const item = btn.closest(".accordion-item");
			const wasOpen = item.classList.contains("open");
			document
				.querySelectorAll(".accordion-item")
				.forEach((i) => i.classList.remove("open"));
			if (!wasOpen) item.classList.add("open");
		});
	});

	// ── Show more ──────────────────────────────────────────────────────────
	document.querySelectorAll("[data-showmore-btn]").forEach((btn) => {
		const list = document.getElementById(btn.dataset.showmoreBtn);
		if (!list) return;
		const items = list.querySelectorAll("[data-showmore-item]");
		const limit = parseInt(btn.dataset.limit || "4", 10);
		let expanded = false;
		items.forEach((item, i) => {
			if (i >= limit) item.classList.add("hidden");
		});
		if (items.length <= limit) {
			btn.style.display = "none";
			return;
		}
		btn.addEventListener("click", () => {
			expanded = !expanded;
			items.forEach((item, i) => {
				if (i >= limit) item.classList.toggle("hidden", !expanded);
			});
			btn.textContent = expanded ? "Show less" : `Show all ${items.length}`;
		});
	});

	// ── AOS init ───────────────────────────────────────────────────────────
	if (typeof AOS !== "undefined") {
		AOS.init({ easing: "ease", duration: 400, delay: 0, once: true });
	}
});
