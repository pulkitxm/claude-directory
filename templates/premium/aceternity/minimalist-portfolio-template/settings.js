(function () {
	var root = document.documentElement;
	var fonts = document.querySelectorAll(".font-option");
	var colors = document.querySelectorAll(".color-option");
	var font = localStorage.getItem("portfolio-font") || "schibsted";
	var color = localStorage.getItem("portfolio-color") || "stone";

	function applyFont(value) {
		root.dataset.font = value;
		localStorage.setItem("portfolio-font", value);
		fonts.forEach(function (option) {
			option.classList.toggle("active", option.dataset.font === value);
		});
	}

	function applyColor(value) {
		root.dataset.color = value;
		localStorage.setItem("portfolio-color", value);
		colors.forEach(function (option) {
			option.classList.toggle("active", option.dataset.color === value);
		});
	}

	fonts.forEach(function (option) {
		option.addEventListener("click", function (event) {
			event.stopPropagation();
			applyFont(option.dataset.font);
		});
	});
	colors.forEach(function (option) {
		option.addEventListener("click", function (event) {
			event.stopPropagation();
			applyColor(option.dataset.color);
		});
	});
	applyFont(font);
	applyColor(color);
})();
