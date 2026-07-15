/* Click-to-load YouTube facade, ported from the source's srcdoc iframe
   trick (thumbnail + play button that swaps to a real embedded iframe with
   autoplay on click, avoiding loading YouTube's JS until requested). */
(function () {
	var frame = document.getElementById("feature-video");
	if (!frame) return;
	frame.setAttribute("role", "button");
	frame.setAttribute("tabindex", "0");
	frame.setAttribute("aria-label", "Play feature video");
	function loadVideo() {
		var id = frame.getAttribute("data-yt-id");
		var iframe = document.createElement("iframe");
		iframe.src = "https://www.youtube.com/embed/" + id + "?autoplay=1";
		iframe.setAttribute("allow", "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture");
		iframe.setAttribute("allowfullscreen", "");
		iframe.setAttribute("frameborder", "0");
		frame.innerHTML = "";
		frame.appendChild(iframe);
	}
	frame.addEventListener("click", loadVideo);
	frame.addEventListener("keydown", function (event) {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			loadVideo();
		}
	});
})();
