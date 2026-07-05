const REPOSITORY_URL = "https://github.com/pulkitxm/claude-directory";
const RAW_BASE_URL =
	"https://raw.githubusercontent.com/pulkitxm/claude-directory/main";
const PAGE_SIZE = 24;

const CATEGORY_LABELS = {
	"hero-sections": "Hero sections",
	"landing-pages": "Landing pages",
	"animations-loaders": "Animations & loaders",
	"3d-games": "3D & games",
	portfolios: "Portfolios",
	"components-ui": "Components & UI",
	"ui-design": "UI design",
	shaders: "Shaders",
	templates: "Templates",
};

const state = {
	projects: [],
	filtered: [],
	category: "all",
	query: "",
	sort: "latest",
	visible: PAGE_SIZE,
};

const elements = {
	grid: document.querySelector("#project-grid"),
	filters: document.querySelector("#category-filters"),
	search: document.querySelector("#project-search"),
	sort: document.querySelector("#project-sort"),
	visibleCount: document.querySelector("#visible-count"),
	resultsLabel: document.querySelector("#results-label"),
	clearFilters: document.querySelector("#clear-filters"),
	emptyState: document.querySelector("#empty-state"),
	loadMoreWrap: document.querySelector("#load-more-wrap"),
	loadMore: document.querySelector("#load-more"),
	remainingCount: document.querySelector("#remaining-count"),
	cardTemplate: document.querySelector("#project-card-template"),
	projectCount: document.querySelector("#hero-project-count"),
	categoryCount: document.querySelector("#hero-category-count"),
	dialog: document.querySelector("#project-dialog"),
	dialogClose: document.querySelector(".dialog-close"),
	dialogVideo: document.querySelector("#dialog-video"),
	videoLoading: document.querySelector("#video-loading"),
	dialogCategory: document.querySelector("#dialog-category"),
	dialogTitle: document.querySelector("#dialog-title"),
	dialogPath: document.querySelector("#dialog-path"),
	dialogDescription: document.querySelector("#dialog-description"),
	dialogStack: document.querySelector("#dialog-stack"),
	dialogDate: document.querySelector("#dialog-date"),
	dialogSource: document.querySelector("#dialog-source"),
	dialogPrompt: document.querySelector("#dialog-prompt"),
};

function encodePath(path) {
	return path.split("/").map(encodeURIComponent).join("/");
}

function displayTitle(name) {
	const lastPart = name.split("/").at(-1);
	return lastPart
		.split("-")
		.map((word) => {
			if (/^(ai|ui|ux|3d|hls|saas|defi|nft|glsl|webgl)$/i.test(word)) {
				return word.toUpperCase();
			}
			return word.charAt(0).toUpperCase() + word.slice(1);
		})
		.join(" ");
}

function decodeEntities(value) {
	const parser = document.createElement("textarea");
	parser.innerHTML = value;
	return parser.value;
}

function formatDate(value, compact = false) {
	if (!value) return "Date unknown";
	const date = new Date(value);
	if (Number.isNaN(date.valueOf())) return "Date unknown";
	return new Intl.DateTimeFormat(
		"en",
		compact
			? { month: "short", day: "numeric" }
			: { year: "numeric", month: "short", day: "numeric" },
	).format(date);
}

function parseProjects(readme, posters, dates) {
	const dateMap = new Map();
	for (const item of dates) {
		dateMap.set(item.project, item.lastUpdated);
	}

	const projects = [];
	const rowPattern =
		/^\| \[([^\]]+)\]\(\.\/([^)]+)\/\) \| (.*?) \| (.*?) \|$/gm;

	for (const match of readme.matchAll(rowPattern)) {
		const [, name, path, rawDescription, rawStack] = match;
		const category = path.split("/")[0];
		const media = posters[path];
		const description = decodeEntities(
			rawDescription.replaceAll(/`([^`]+)`/g, "$1"),
		);
		const stack = decodeEntities(rawStack.replaceAll(/`([^`]+)`/g, "$1"));
		const pathParts = path.split("/");
		const updatedAt =
			dateMap.get(path) ||
			dateMap.get(name) ||
			dateMap.get(pathParts.at(-1)) ||
			null;

		projects.push({
			name,
			title: displayTitle(name),
			path,
			category,
			categoryLabel: CATEGORY_LABELS[category] || category,
			description,
			stack,
			tags: stack
				.split(",")
				.map((tag) => tag.trim())
				.filter(Boolean),
			poster: media?.poster || null,
			video: media?.video || null,
			blurDataURL: media?.blurDataURL || "",
			width: media?.width || 16,
			height: media?.height || 10,
			updatedAt,
			timestamp: updatedAt ? new Date(updatedAt).valueOf() : 0,
			searchText: `${name} ${path} ${description} ${stack}`.toLowerCase(),
		});
	}

	return projects;
}

function renderFilters() {
	const counts = new Map();
	for (const project of state.projects) {
		counts.set(project.category, (counts.get(project.category) || 0) + 1);
	}

	const categories = [
		"all",
		...Object.keys(CATEGORY_LABELS).filter((slug) => counts.has(slug)),
	];
	const fragment = document.createDocumentFragment();

	for (const category of categories) {
		const button = document.createElement("button");
		const count =
			category === "all" ? state.projects.length : counts.get(category);
		button.type = "button";
		button.className = "filter-button";
		button.dataset.category = category;
		button.setAttribute("aria-pressed", String(category === state.category));
		button.append(
			document.createTextNode(
				category === "all" ? "All projects" : CATEGORY_LABELS[category],
			),
		);

		const countElement = document.createElement("span");
		countElement.textContent = String(count);
		button.append(countElement);
		fragment.append(button);
	}

	elements.filters.replaceChildren(fragment);
}

function makeCard(project, index) {
	const node = elements.cardTemplate.content.cloneNode(true);
	const article = node.querySelector(".project-card");
	const button = node.querySelector(".card-open");
	const imageWrap = node.querySelector(".card-image-wrap");
	const image = node.querySelector("img");

	button.dataset.path = project.path;
	button.setAttribute("aria-label", `Preview ${project.title}`);
	node.querySelector(".card-number").textContent = String(index + 1).padStart(
		3,
		"0",
	);
	node.querySelector(".card-category").textContent = project.categoryLabel;
	node.querySelector(".card-title").textContent = project.title;
	node.querySelector(".card-description").textContent = project.description;

	if (project.poster) {
		image.src = `${RAW_BASE_URL}/${encodePath(project.poster)}`;
		image.alt = `Preview of ${project.title}`;
		image.width = project.width;
		image.height = project.height;
		imageWrap.style.backgroundImage = project.blurDataURL
			? `url("${project.blurDataURL}")`
			: "";
		image.addEventListener(
			"error",
			() => {
				article.classList.add("image-unavailable");
				image.alt = `${project.title} preview unavailable`;
			},
			{ once: true },
		);
	} else {
		image.remove();
	}

	const tagContainer = node.querySelector(".card-tags");
	for (const tag of project.tags.slice(0, 2)) {
		const element = document.createElement("i");
		element.textContent = tag;
		tagContainer.append(element);
	}

	const date = node.querySelector("time");
	date.textContent = formatDate(project.updatedAt, true);
	if (project.updatedAt) date.dateTime = project.updatedAt;

	return node;
}

function applyFilters() {
	const terms = state.query.toLowerCase().trim().split(/\s+/).filter(Boolean);

	state.filtered = state.projects.filter((project) => {
		const matchesCategory =
			state.category === "all" || project.category === state.category;
		const matchesSearch = terms.every((term) =>
			project.searchText.includes(term),
		);
		return matchesCategory && matchesSearch;
	});

	state.filtered.sort((a, b) => {
		if (state.sort === "name") return a.title.localeCompare(b.title);
		if (state.sort === "category") {
			return (
				a.categoryLabel.localeCompare(b.categoryLabel) ||
				a.title.localeCompare(b.title)
			);
		}
		return b.timestamp - a.timestamp || a.title.localeCompare(b.title);
	});

	renderProjects();
}

function renderProjects() {
	const visibleProjects = state.filtered.slice(0, state.visible);
	const fragment = document.createDocumentFragment();

	visibleProjects.forEach((project, index) => {
		fragment.append(makeCard(project, index));
	});
	elements.grid.replaceChildren(fragment);
	elements.grid.setAttribute("aria-busy", "false");

	const total = state.filtered.length;
	const remaining = Math.max(total - visibleProjects.length, 0);
	elements.visibleCount.textContent = total.toLocaleString();
	elements.resultsLabel.textContent = total === 1 ? "project" : "projects";
	elements.emptyState.hidden = total !== 0;
	elements.grid.hidden = total === 0;
	elements.loadMoreWrap.hidden = remaining === 0;
	elements.remainingCount.textContent = remaining
		? `${remaining.toLocaleString()} remaining`
		: "";
	elements.clearFilters.hidden = state.category === "all" && !state.query;
}

function resetFilters() {
	state.category = "all";
	state.query = "";
	state.visible = PAGE_SIZE;
	elements.search.value = "";
	for (const button of elements.filters.querySelectorAll(".filter-button")) {
		button.setAttribute(
			"aria-pressed",
			String(button.dataset.category === "all"),
		);
	}
	applyFilters();
}

function openProject(project) {
	const encodedPath = encodePath(project.path);
	const posterUrl = project.poster
		? `${RAW_BASE_URL}/${encodePath(project.poster)}`
		: "";
	const videoUrl = project.video
		? `${RAW_BASE_URL}/${encodePath(project.video)}`
		: "";

	elements.dialogCategory.textContent = project.categoryLabel;
	elements.dialogTitle.textContent = project.title;
	elements.dialogPath.textContent = project.path;
	elements.dialogDescription.textContent = project.description;
	elements.dialogStack.textContent = project.stack;
	elements.dialogDate.textContent = formatDate(project.updatedAt);
	elements.dialogSource.href = `${REPOSITORY_URL}/tree/main/${encodedPath}`;
	elements.dialogPrompt.href = `${REPOSITORY_URL}/blob/main/${encodedPath}/prompt.md`;
	elements.videoLoading.classList.remove("is-ready");
	elements.videoLoading.style.backgroundImage = posterUrl
		? `url("${posterUrl}")`
		: "";
	elements.dialogVideo.poster = posterUrl;

	if (videoUrl) {
		elements.dialogVideo.src = videoUrl;
		elements.dialogVideo.load();
		elements.dialogVideo.play().catch(() => {});
	} else {
		elements.videoLoading.querySelector("p").textContent =
			"No recorded demo available";
	}

	elements.dialog.showModal();
	document.body.classList.add("dialog-open");
}

function closeProject() {
	elements.dialog.close();
}

function resetDialogMedia() {
	document.body.classList.remove("dialog-open");
	elements.dialogVideo.pause();
	elements.dialogVideo.removeAttribute("src");
	elements.dialogVideo.removeAttribute("poster");
	elements.dialogVideo.load();
	elements.videoLoading.classList.remove("is-ready");
	elements.videoLoading.querySelector("p").textContent =
		"Loading recorded demo…";
}

function bindEvents() {
	let searchTimer;

	elements.search.addEventListener("input", (event) => {
		window.clearTimeout(searchTimer);
		searchTimer = window.setTimeout(() => {
			state.query = event.target.value;
			state.visible = PAGE_SIZE;
			applyFilters();
		}, 120);
	});

	elements.sort.addEventListener("change", (event) => {
		state.sort = event.target.value;
		state.visible = PAGE_SIZE;
		applyFilters();
	});

	elements.filters.addEventListener("click", (event) => {
		const button = event.target.closest(".filter-button");
		if (!button) return;
		state.category = button.dataset.category;
		state.visible = PAGE_SIZE;
		for (const filter of elements.filters.querySelectorAll(".filter-button")) {
			filter.setAttribute("aria-pressed", String(filter === button));
		}
		applyFilters();
	});

	elements.grid.addEventListener("click", (event) => {
		const button = event.target.closest(".card-open");
		if (!button) return;
		const project = state.projects.find(
			(item) => item.path === button.dataset.path,
		);
		if (project) openProject(project);
	});

	elements.loadMore.addEventListener("click", () => {
		state.visible += PAGE_SIZE;
		renderProjects();
	});

	elements.clearFilters.addEventListener("click", resetFilters);
	document
		.querySelector("[data-clear-filters]")
		.addEventListener("click", resetFilters);
	elements.dialogClose.addEventListener("click", closeProject);
	elements.dialog.addEventListener("click", (event) => {
		if (event.target === elements.dialog) closeProject();
	});
	elements.dialog.addEventListener("close", resetDialogMedia);
	elements.dialogVideo.addEventListener("canplay", () => {
		elements.videoLoading.classList.add("is-ready");
	});

	document.addEventListener("keydown", (event) => {
		if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
			event.preventDefault();
			elements.search.focus();
			elements.search.select();
		}
	});
}

async function initialise() {
	try {
		const [readmeResponse, postersResponse, datesResponse] = await Promise.all([
			fetch("README.md"),
			fetch("posters.json"),
			fetch("project-dates.json"),
		]);

		if (!readmeResponse.ok || !postersResponse.ok || !datesResponse.ok) {
			throw new Error("One or more catalog files could not be loaded.");
		}

		const [readme, posters, dates] = await Promise.all([
			readmeResponse.text(),
			postersResponse.json(),
			datesResponse.json(),
		]);

		state.projects = parseProjects(readme, posters, dates);
		if (!state.projects.length)
			throw new Error("No projects were found in README.md.");

		elements.projectCount.textContent = state.projects.length.toLocaleString();
		elements.categoryCount.textContent = String(
			new Set(state.projects.map((item) => item.category)).size,
		).padStart(2, "0");
		renderFilters();
		applyFilters();
		bindEvents();
	} catch (error) {
		console.error(error);
		elements.grid.setAttribute("aria-busy", "false");
		elements.grid.innerHTML = `
      <div class="error-state">
        <p>The catalog could not be loaded. Run this page through a local web server instead of opening the file directly.</p>
      </div>
    `;
	}
}

initialise();
