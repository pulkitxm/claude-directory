/* Copy Machine — setup overlay micro-interactions (presentational only) */
(function () {
  "use strict";

  var screen = document.getElementById("setup-screen");
  if (!screen) return;

  var reduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Reveal cascade
  requestAnimationFrame(function () {
    screen.classList.add("in");
  });

  // Count-up readout
  var nums = Array.prototype.slice.call(
    document.querySelectorAll(".readout-num")
  );

  nums.forEach(function (el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";

    if (reduce || target === 0) {
      el.textContent = String(target) + suffix;
      return;
    }

    var duration = 1100;
    var start = null;

    function tick(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      // easeOutCubic
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(eased * target)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = String(target) + suffix;
    }

    requestAnimationFrame(tick);
  });
})();
