// Shared render helpers for list/grid content.
(function () {
	const P = window.assetPrefix;
	const D = window.DATA;
	const I = window.ICONS;

	function projectHref(p) {
		return p.detail ? P + "projects/" + p.slug + ".html" : "javascript:void(0)";
	}

	function cardHTML(p) {
		const logoClass = p.cover.endsWith(".svg") ? ' class="logo-cover"' : "";
		return `<a class="project-card" href="${projectHref(p)}" data-cats="${p.cats.join(",")}">
      <div class="cover"><img src="${P}assets/${p.cover}" alt="${p.title}" loading="lazy"${logoClass} /></div>
      <div class="meta">
        <div class="title">${p.title}</div>
      </div>
      <div class="subtitle">${p.subtitle}</div>
    </a>`;
	}

	function writeHTML(a) {
		const link = a.slug
			? P + "articles/" + a.slug + ".html"
			: "javascript:void(0)";
		const tag = a.slug ? "a" : "div";
		return `<${tag} class="write-row" ${a.slug ? `href="${link}"` : ""}>
      <div>
        <div class="wr-title">${a.title}</div>
        <div class="wr-excerpt">${a.excerpt}</div>
        <div class="wr-date">${a.date}</div>
      </div>
      <span class="wr-arrow">${I.arrow}</span>
    </${tag}>`;
	}

	function stackHTML() {
		return window.STACK_ICONS.map(
			(svg) => `<span class="stack-icon">${svg}</span>`,
		).join("");
	}

	function fill(id, html) {
		const el = document.getElementById(id);
		if (el) el.innerHTML = html;
	}

	document.addEventListener("DOMContentLoaded", () => {
		// selected work = first 4 projects
		fill("selected-work", D.projects.slice(0, 4).map(cardHTML).join(""));
		fill("stack-row", stackHTML());
		fill("latest-writing", D.articles.slice(0, 3).map(writeHTML).join(""));

		// projects page grid (all)
		fill("projects-grid", D.projects.map(cardHTML).join(""));

		// about: currently building (first 2)
		fill("building-grid", D.projects.slice(0, 2).map(cardHTML).join(""));

		// articles page (all 4)
		fill("articles-list", D.articles.map(writeHTML).join(""));

		// expose for detail pages
		window.renderCards = (list) => list.map(cardHTML).join("");
	});
})();
