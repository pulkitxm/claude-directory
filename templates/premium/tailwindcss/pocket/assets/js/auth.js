/* POCKET — auth pages: inject logo mark + concentric background illustration */
(function () {
	"use strict";
	var LOGO =
		'<svg viewBox="0 0 40 40" aria-hidden="true">' +
		'<path fill="#00b7d7" fill-rule="evenodd" clip-rule="evenodd" d="M20 40C8.954 40 0 31.046 0 20S8.954 0 20 0s20 8.954 20 20-8.954 20-20 20ZM4 20c0 7.264 5.163 13.321 12.02 14.704C17.642 35.03 19 33.657 19 32V8c0-1.657-1.357-3.031-2.98-2.704C9.162 6.68 4 12.736 4 20Z"/></svg>';
	document.querySelectorAll("[data-logo]").forEach(function (el) {
		el.innerHTML = LOGO;
	});

	var bg = "";
	for (var r = 1; r <= 9; r++) {
		bg +=
			'<circle cx="512" cy="512" r="' +
			(60 + r * 52) +
			'" stroke="currentColor" stroke-opacity="0.6"/>';
	}
	document.querySelectorAll("[data-bgillus]").forEach(function (el) {
		el.innerHTML = bg;
		el.setAttribute("stroke-width", "1");
	});
})();
