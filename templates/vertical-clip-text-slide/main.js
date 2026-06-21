(() => {
	var stage = document.getElementById("stage");
	var lines = stage.querySelectorAll(".line");
	var _subline = stage.querySelector(".subline");
	var BASE_MS = 200; // var(--base) in CSS, kept in sync here
	var STAGGER_MS = 70;
	var DUR_MS = 620;

	// ---- split each line into clipped letter columns ----
	var gi = 0; // continuous global stagger index across all lines
	lines.forEach((line) => {
		var text = line.textContent;
		line.textContent = "";
		Array.prototype.forEach.call(text, (ch) => {
			if (ch === " ") {
				var sp = document.createElement("span");
				sp.className = "space";
				sp.innerHTML = "&nbsp;";
				line.appendChild(sp);
				return;
			}
			var clip = document.createElement("span");
			clip.className = "clip";
			var g = document.createElement("span");
			g.className = "glyph";
			g.style.setProperty("--i", String(gi++));
			g.textContent = ch;
			clip.appendChild(g);
			line.appendChild(clip);
		});
	});

	var TOTAL = gi;
	// ms from cascade start until the last letter has fully settled
	var settleMs = BASE_MS + (TOTAL - 1) * STAGGER_MS + DUR_MS;
	// subline starts just before the cascade finishes
	stage.style.setProperty("--subline-delay", `${settleMs - 250}ms`);

	var reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

	var loopTimer = null;
	var HOLD_MS = 2200;

	function play() {
		stage.classList.remove("play");
		// force reflow so the animation restarts cleanly
		void stage.offsetWidth;
		stage.classList.add("play");
	}

	function loop() {
		play();
		clearTimeout(loopTimer);
		loopTimer = setTimeout(loop, settleMs + HOLD_MS);
	}

	if (reduce) {
		stage.classList.add("play"); // CSS strips the motion under reduced-motion
	} else {
		loop();
	}

	var replay = document.querySelector(".replay");
	if (replay) {
		replay.addEventListener("click", () => {
			if (reduce) return;
			loop(); // restart cascade + reset the loop timer
		});
	}
})();
