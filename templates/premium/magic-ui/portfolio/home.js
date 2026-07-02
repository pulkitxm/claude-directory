(function () {
	const chevron =
		'<svg class="chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';
	const ext =
		'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>';

	function resumeCard(d, i) {
		const companyInner = d.href
			? `<a class="resume-company-link" href="${d.href}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${d.company}</a>`
			: d.company;
		return `<div class="resume-card blur-fade" data-delay="${(i * 0.04).toFixed(2)}" aria-expanded="false">
      <img class="resume-logo" src="./assets/img/${d.logo}" alt="${d.company}" />
      <div class="resume-body">
        <div class="resume-head-row">
          <div class="resume-company">${companyInner} ${chevron}</div>
          <div class="resume-date">${d.start} - ${d.end}</div>
        </div>
        <div class="resume-role">${d.role}</div>
        <div class="resume-detail"><div>${d.role}</div></div>
      </div>
    </div>`;
	}

	function chip(l) {
		return `<a class="link-chip" href="${l.href}" target="_blank" rel="noopener">${ext}${l.type}</a>`;
	}

	document.getElementById("work").innerHTML = DATA.work
		.map(resumeCard)
		.join("");
	document.getElementById("education-list").innerHTML = DATA.education
		.map(resumeCard)
		.join("");
	document.getElementById("skills").innerHTML = DATA.skills
		.map(
			(s, i) =>
				`<span class="skill blur-fade" data-delay="${(i * 0.02).toFixed(2)}">${s}</span>`,
		)
		.join("");

	document.getElementById("projects-grid").innerHTML = DATA.projects
		.map(
			(
				p,
				i,
			) => `<div class="project-card blur-fade" data-delay="${(i * 0.05).toFixed(2)}">
      <video class="project-media" src="./assets/video/${p.video}" autoplay loop muted playsinline></video>
      <div class="project-body">
        <div class="project-title">${p.title}</div>
        <div class="project-dates">${p.dates}</div>
        <div class="project-desc">${p.desc}</div>
        <div class="tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
        <div class="project-links">${(p.links || []).map(chip).join("")}</div>
      </div>
    </div>`,
		)
		.join("");

	document.getElementById("hackathons-list").innerHTML = DATA.hackathons
		.map(
			(
				h,
				i,
			) => `<div class="tl-item blur-fade" data-delay="${(i * 0.03).toFixed(2)}">
      <div class="tl-dot"><img src="./assets/img/${h.img}" alt="${h.title}" /></div>
      <div class="tl-date">${h.date}</div>
      <div class="tl-title">${h.title}</div>
      <div class="tl-location">${h.location}</div>
      <div class="tl-desc">${h.desc}</div>
      <div class="tl-links">${(h.links || []).map(chip).join("")}</div>
    </div>`,
		)
		.join("");
})();
