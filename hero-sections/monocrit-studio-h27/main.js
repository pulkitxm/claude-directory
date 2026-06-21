(() => {
	var app = document.getElementById("app");
	var hero = document.getElementById("hero");
	var headline = document.getElementById("headline");
	var card = document.getElementById("card");
	var ring = document.getElementById("ring");
	var ringLabel = document.getElementById("ring-label");
	var stack = document.getElementById("stack");
	var imgs = Array.prototype.slice.call(stack.querySelectorAll("img"));
	var capName = document.getElementById("cap-name");
	var capNum = document.getElementById("cap-num");
	var dotsWrap = document.getElementById("dots");

	var CAPTIONS = [
		"FIELD STUDY",
		"TYPE SPECIMEN",
		"MOTION FRAME",
		"BRAND MARK",
		"EDITORIAL",
		"STILL LIFE",
	];
	var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	var coarse = window.matchMedia("(hover: none), (pointer: coarse)").matches;

	/* ---- split headline into chars ---- */
	var chars = [];
	headline.querySelectorAll(".line").forEach((line) => {
		var text = line.textContent;
		line.textContent = "";
		for (var i = 0; i < text.length; i++) {
			var s = document.createElement("span");
			s.className = "char";
			s.textContent = text[i];
			line.appendChild(s);
			chars.push(s);
		}
	});

	/* ---- footer dots ---- */
	imgs.forEach((_, i) => {
		var d = document.createElement("i");
		if (i === 0) d.className = "is-on";
		dotsWrap.appendChild(d);
	});
	var dots = Array.prototype.slice.call(dotsWrap.children);

	/* ---- entrance ---- */
	chars.forEach((c, i) => {
		c.style.transitionDelay = `${0.18 + i * 0.035}s`;
	});
	requestAnimationFrame(() => {
		requestAnimationFrame(() => {
			app.classList.add("is-in");
		});
	});

	/* ---- live clock ---- */
	var clock = document.getElementById("clock");
	function tick() {
		var d = new Date();
		function p(n) {
			return n < 10 ? `0${n}` : `${n}`;
		}
		clock.textContent = `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
	}
	tick();
	setInterval(tick, 1000);

	/* ---- image cycling ---- */
	var current = 0;
	function setImage(n) {
		imgs[current].classList.remove("is-active");
		dots[current].classList.remove("is-on");
		current = (n + imgs.length) % imgs.length;
		imgs[current].classList.add("is-active");
		dots[current].classList.add("is-on");
		capName.textContent = CAPTIONS[current];
		capNum.textContent = `${(current + 1 < 10 ? "0" : "") + (current + 1)} / 06`;
	}

	/* ============ TOUCH / REDUCED-MOTION: auto cycle ============ */
	if (coarse || reduce) {
		var _auto = setInterval(() => {
			setImage(current + 1);
		}, 1800);
		if (reduce && !coarse) {
			// keep a static centred card visible
			card.style.opacity = "1";
			card.style.left = "50%";
			card.style.top = "50%";
		}
		// still split chars but no magnetism
		return;
	}

	/* ============ DESKTOP: cursor-driven ============ */
	var pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
	var pos = { x: pointer.x, y: pointer.y };
	var prev = { x: pointer.x, y: pointer.y };
	var travel = 0;
	var THRESHOLD = 70;
	var overInteractive = false;

	document.addEventListener("mousemove", (e) => {
		pointer.x = e.clientX;
		pointer.y = e.clientY;

		var t = e.target;
		var interactive = t.closest ? t.closest("[data-cursor]") : null;
		overInteractive = !!interactive;
		if (interactive) {
			ring.classList.add("is-on");
			ringLabel.textContent = interactive.getAttribute("data-cursor") || "";
		} else {
			ring.classList.remove("is-on");
		}

		// accumulate travel for image swaps
		travel += Math.hypot(pointer.x - prev.x, pointer.y - prev.y);
		if (!overInteractive && travel > THRESHOLD) {
			travel = 0;
			setImage(current + 1);
		}
		prev.x = pointer.x;
		prev.y = pointer.y;

		// magnetic letters
		for (var i = 0; i < chars.length; i++) {
			var r = chars[i].getBoundingClientRect();
			var cx = r.left + r.width / 2;
			var cy = r.top + r.height / 2;
			var dx = pointer.x - cx;
			var dy = pointer.y - cy;
			var dist = Math.hypot(dx, dy);
			if (dist < 150) {
				var ang = Math.atan2(dy, dx);
				var push = (150 - dist) / 8;
				chars[i].style.transform =
					"translate(" +
					-Math.cos(ang) * push +
					"px," +
					-Math.sin(ang) * push +
					"px)";
			} else {
				chars[i].style.transform = "translate(0,0)";
			}
		}
	});

	hero.addEventListener("mouseleave", () => {
		chars.forEach((c) => {
			c.style.transform = "translate(0,0)";
		});
	});

	// hide native; show card after first real move
	var seen = false;
	document.addEventListener("mousemove", function once() {
		seen = true;
		document.removeEventListener("mousemove", once);
	});

	/* ---- ring follows instantly ---- */
	function moveRing() {
		ring.style.left = `${pointer.x}px`;
		ring.style.top = `${pointer.y}px`;
	}

	/* ---- card lerps with inertia + velocity skew ---- */
	function loop() {
		pos.x += (pointer.x - pos.x) * 0.16;
		pos.y += (pointer.y - pos.y) * 0.16;

		var vx = pointer.x - pos.x;
		var vy = pointer.y - pos.y;
		var rot = Math.max(-12, Math.min(12, vx * 0.14));
		var skew = Math.max(-7, Math.min(7, vy * 0.06));

		card.style.transform =
			"translate(" +
			pos.x +
			"px," +
			pos.y +
			"px) translate(-50%,-50%) rotate(" +
			rot +
			"deg) skewY(" +
			skew +
			"deg)";
		card.style.opacity = seen && !overInteractive ? "1" : "0";

		moveRing();
		requestAnimationFrame(loop);
	}
	// card uses top/left 0 baseline; override transform translate
	card.style.left = "0px";
	card.style.top = "0px";
	requestAnimationFrame(loop);
})();
