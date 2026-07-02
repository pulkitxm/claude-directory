/* Click-to-load YouTube facade — ported from the source's srcdoc iframe
   trick (thumbnail + play button that swaps to a real embedded iframe with
   autoplay on click, avoiding loading YouTube's JS until requested). */
(function () {
	var frame = document.getElementById("feature-video");
	if (!frame) return;
	frame.addEventListener("click", function () {
		var id = frame.getAttribute("data-yt-id");
		var iframe = document.createElement("iframe");
		iframe.src = "https://www.youtube.com/embed/" + id + "?autoplay=1";
		iframe.setAttribute("allow", "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture");
		iframe.setAttribute("allowfullscreen", "");
		iframe.setAttribute("frameborder", "0");
		frame.innerHTML = "";
		frame.appendChild(iframe);
	});
})();
