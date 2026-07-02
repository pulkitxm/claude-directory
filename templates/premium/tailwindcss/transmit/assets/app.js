// Transmit clone — sticky audio player + about "show more"
(function () {
	// ---- About "Show more" ----
	document.querySelectorAll("[data-showmore]").forEach((btn) => {
		btn.addEventListener("click", () => {
			const p = btn.parentElement.querySelector("[data-about]");
			if (!p) return;
			const clamped = p.classList.toggle("clamped");
			btn.textContent = clamped ? "Show more" : "Show less";
		});
	});

	// ---- Audio player ----
	const player = document.getElementById("player");
	const audio = document.getElementById("audio");
	if (!player || !audio) return;

	const titleEl = document.getElementById("player-title");
	const ppMain = document.getElementById("pp-main");
	const ppMobile = document.getElementById("pp-mobile");
	const rewind = document.getElementById("rewind");
	const forward = document.getElementById("forward");
	const slider = document.getElementById("slider");
	const fill = document.getElementById("slider-fill");
	const thumb = document.getElementById("slider-thumb");
	const curTime = document.getElementById("cur-time");
	const totTime = document.getElementById("tot-time");
	const rateBtn = document.getElementById("rate");
	const muteBtn = document.getElementById("mute");
	const muteBtnMobile = document.getElementById("mute-mobile");

	const playSVG =
		'<svg viewBox="0 0 36 36" aria-hidden="true"><path d="M33.75 16.701C34.75 17.2783 34.75 18.7217 33.75 19.299L11.25 32.2894C10.25 32.8668 9 32.1451 9 30.9904L9 5.00962C9 3.85491 10.25 3.13323 11.25 3.71058L33.75 16.701Z"></path></svg>';
	const pauseSVG =
		'<svg viewBox="0 0 36 36" aria-hidden="true"><path d="M8.5 4C7.67157 4 7 4.67157 7 5.5V30.5C7 31.3284 7.67157 32 8.5 32H11.5C12.3284 32 13 31.3284 13 30.5V5.5C13 4.67157 12.3284 4 11.5 4H8.5ZM24.5 4C23.6716 4 23 4.67157 23 5.5V30.5C23 31.3284 23.6716 32 24.5 32H27.5C28.3284 32 29 31.3284 29 30.5V5.5C29 4.67157 28.3284 4 27.5 4H24.5Z"></path></svg>';

	// Build a silent WAV data URI so the player has a real duration without remote assets.
	function silentWav(seconds) {
		const sr = 8000,
			n = sr * seconds,
			bytes = 44 + n * 2;
		const buf = new ArrayBuffer(bytes),
			v = new DataView(buf);
		const w = (off, s) => {
			for (let i = 0; i < s.length; i++) v.setUint8(off + i, s.charCodeAt(i));
		};
		w(0, "RIFF");
		v.setUint32(4, 36 + n * 2, true);
		w(8, "WAVE");
		w(12, "fmt ");
		v.setUint32(16, 16, true);
		v.setUint16(20, 1, true);
		v.setUint16(22, 1, true);
		v.setUint32(24, sr, true);
		v.setUint32(28, sr * 2, true);
		v.setUint16(32, 2, true);
		v.setUint16(34, 16, true);
		w(36, "data");
		v.setUint32(40, n * 2, true);
		let b = "";
		const u8 = new Uint8Array(buf);
		for (let i = 0; i < u8.length; i++) b += String.fromCharCode(u8[i]);
		return "data:audio/wav;base64," + btoa(b);
	}
	// durations vary slightly per episode for realism
	const durations = { 1: 60, 2: 73, 3: 81, 4: 55, 5: 64 };
	let currentId = null;
	let rate = 1;
	const rates = [1, 1.5, 2];

	function fmt(t) {
		if (!isFinite(t)) t = 0;
		const m = Math.floor(t / 60),
			s = Math.floor(t % 60);
		return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
	}
	function setPlayIcons(playing) {
		const svg = playing ? pauseSVG : playSVG;
		const lbl = playing ? "Pause" : "Play";
		[ppMain, ppMobile].forEach((b) => {
			if (b) {
				b.innerHTML = svg;
				b.setAttribute("aria-label", lbl);
			}
		});
	}
	function render() {
		const d = audio.duration || durations[currentId] || 64;
		const pct = d ? (audio.currentTime / d) * 100 : 0;
		fill.style.width = pct + "%";
		thumb.style.left = pct + "%";
		curTime.textContent = fmt(audio.currentTime);
		totTime.textContent = fmt(d);
	}

	function loadEpisode(id, title) {
		if (currentId !== id) {
			currentId = id;
			audio.src = silentWav(durations[id] || 64);
			titleEl.textContent = title;
			titleEl.href = "/" + id + ".html";
			audio.load();
		}
	}

	function startEpisode(id, title) {
		player.classList.add("active");
		loadEpisode(id, title);
		audio.play().catch(() => {});
	}

	document.querySelectorAll("[data-play]").forEach((btn) => {
		btn.addEventListener("click", () => {
			const id = parseInt(btn.getAttribute("data-play"), 10);
			const title = btn.getAttribute("data-title");
			if (currentId === id && !audio.paused) {
				audio.pause();
			} else {
				startEpisode(id, title);
			}
		});
	});

	function togglePlay() {
		if (audio.paused) audio.play().catch(() => {});
		else audio.pause();
	}
	ppMain && ppMain.addEventListener("click", togglePlay);
	ppMobile && ppMobile.addEventListener("click", togglePlay);
	rewind &&
		rewind.addEventListener("click", () => {
			audio.currentTime = Math.max(0, audio.currentTime - 10);
			render();
		});
	forward &&
		forward.addEventListener("click", () => {
			audio.currentTime = Math.min(
				audio.duration || 64,
				audio.currentTime + 10,
			);
			render();
		});

	rateBtn &&
		rateBtn.addEventListener("click", () => {
			const i = (rates.indexOf(rate) + 1) % rates.length;
			rate = rates[i];
			audio.playbackRate = rate;
			rateBtn.textContent = rate + "x";
		});

	function handleMute() {
		audio.muted = !audio.muted;
		const lbl = audio.muted ? "Unmute" : "Mute";
		const op = audio.muted ? "0.5" : "";
		[muteBtn, muteBtnMobile].forEach((b) => {
			if (b) {
				b.setAttribute("aria-label", lbl);
				b.style.opacity = op;
			}
		});
	}
	muteBtn && muteBtn.addEventListener("click", handleMute);
	muteBtnMobile && muteBtnMobile.addEventListener("click", handleMute);

	// Scrub
	function seekFromEvent(e) {
		const rect = slider.getBoundingClientRect();
		const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
		const pct = Math.min(1, Math.max(0, x / rect.width));
		audio.currentTime = pct * (audio.duration || durations[currentId] || 64);
		render();
	}
	let dragging = false;
	slider.addEventListener("mousedown", (e) => {
		dragging = true;
		seekFromEvent(e);
	});
	window.addEventListener("mousemove", (e) => {
		if (dragging) seekFromEvent(e);
	});
	window.addEventListener("mouseup", () => {
		dragging = false;
	});
	slider.addEventListener("click", seekFromEvent);

	audio.addEventListener("play", () => setPlayIcons(true));
	audio.addEventListener("pause", () => setPlayIcons(false));
	audio.addEventListener("timeupdate", render);
	audio.addEventListener("loadedmetadata", render);
	audio.addEventListener("ended", () => setPlayIcons(false));
})();
