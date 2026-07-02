// Theme toggle
(function () {
	var root = document.documentElement;
	var btn = document.getElementById("theme-toggle");
	var sun = btn.querySelector(".i-sun");
	var moon = btn.querySelector(".i-moon");
	function sync() {
		var dark = root.classList.contains("dark");
		sun.style.display = dark ? "none" : "";
		moon.style.display = dark ? "" : "none";
	}
	sync();
	btn.addEventListener("click", function () {
		root.classList.toggle("dark");
		try {
			localStorage.setItem(
				"mv-theme",
				root.classList.contains("dark") ? "dark" : "light",
			);
		} catch (e) {}
		sync();
	});
})();

// FAQ accordion
document.querySelectorAll(".faq-q").forEach(function (q) {
	q.addEventListener("click", function () {
		var item = q.closest(".faq-item");
		var panel = item.querySelector(".faq-a");
		var open = item.classList.toggle("open");
		panel.style.maxHeight = open ? panel.scrollHeight + "px" : "0px";
	});
});
