(function () {
	const PER = 5;
	const totalPages = Math.ceil(POSTS.length / PER);
	let page = 1;
	const list = document.getElementById("post-list");
	const label = document.getElementById("page-label");
	const prev = document.getElementById("prev");
	const next = document.getElementById("next");

	function render() {
		const start = (page - 1) * PER;
		const slice = POSTS.slice(start, start + PER);
		list.innerHTML = slice
			.map((p, i) => {
				const n = String(start + i + 1).padStart(2, "0");
				return `<a class="post-row" href="./blog-${p.slug}.html">
          <span class="post-num">${n}.</span>
          <div class="post-info">
            <h3>${p.title}</h3>
            <div class="post-date">${p.date}</div>
          </div>
        </a>`;
			})
			.join("");
		label.textContent = `Page ${page} of ${totalPages}`;
		prev.disabled = page === 1;
		next.disabled = page === totalPages;
		// re-trigger reveal
		list.querySelectorAll(".post-row").forEach((el, i) => {
			el.classList.add("blur-fade");
			el.style.transitionDelay = i * 0.05 + "s";
			requestAnimationFrame(() =>
				requestAnimationFrame(() => el.classList.add("in")),
			);
		});
	}

	prev.addEventListener("click", () => {
		if (page > 1) {
			page--;
			render();
		}
	});
	next.addEventListener("click", () => {
		if (page < totalPages) {
			page++;
			render();
		}
	});
	render();
})();
