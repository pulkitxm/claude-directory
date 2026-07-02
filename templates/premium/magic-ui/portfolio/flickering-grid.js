// Flickering grid canvas animation — matches the Magic UI portfolio original
(function () {
	var canvas = document.getElementById("flickering-grid");
	if (!canvas) return;
	var ctx = canvas.getContext("2d");

	var CELL = 16;
	var GAP = 1;
	var COLS, ROWS, cells;

	function init() {
		COLS = Math.ceil(window.innerWidth / CELL) + 2;
		ROWS = Math.ceil(100 / CELL) + 1;
		canvas.width = COLS * CELL;
		canvas.height = ROWS * CELL;
		cells = [];
		for (var r = 0; r < ROWS; r++) {
			for (var c = 0; c < COLS; c++) {
				cells.push({
					opacity: Math.random() * 0.5,
					target: Math.random() * 0.5,
					speed: 0.015 + Math.random() * 0.025,
					timer: Math.floor(Math.random() * 120),
				});
			}
		}
	}

	function draw() {
		var isDark = document.documentElement.classList.contains("dark");
		var r = isDark ? 255 : 0;
		var g = isDark ? 255 : 0;
		var b = isDark ? 255 : 0;

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (var i = 0; i < cells.length; i++) {
			var cell = cells[i];
			cell.timer--;
			if (cell.timer <= 0) {
				cell.target = Math.random() * 0.45;
				cell.timer = 40 + Math.floor(Math.random() * 80);
			}
			cell.opacity += (cell.target - cell.opacity) * cell.speed;

			var col = i % COLS;
			var row = Math.floor(i / COLS);
			ctx.fillStyle =
				"rgba(" + r + "," + g + "," + b + "," + cell.opacity.toFixed(3) + ")";
			ctx.fillRect(
				col * CELL + GAP,
				row * CELL + GAP,
				CELL - GAP * 2,
				CELL - GAP * 2,
			);
		}
		requestAnimationFrame(draw);
	}

	init();
	window.addEventListener("resize", init);
	draw();
})();
