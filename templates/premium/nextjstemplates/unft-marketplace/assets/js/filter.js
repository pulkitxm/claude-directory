
(function (global) {
  function wireFilter(chipRowSel, gridSel) {
    var chipRow = document.querySelector(chipRowSel);
    var grid = document.querySelector(gridSel);
    if (!chipRow || !grid) return;

    chipRow.addEventListener("click", function (e) {
      var chip = e.target.closest("[data-filter-chip]");
      if (!chip) return;
      chipRow.querySelectorAll("[data-filter-chip]").forEach(function (c) {
        c.classList.remove("is-active");
      });
      chip.classList.add("is-active");
      var cat = chip.getAttribute("data-filter-chip");
      grid.querySelectorAll(".card").forEach(function (card) {
        var cats = (card.getAttribute("data-categories") || "").split(",");
        var show = cat === "all" || cats.indexOf(cat) !== -1;
        card.style.display = show ? "" : "none";
      });
    });
  }

  global.UnftFilter = { wireFilter: wireFilter };
})(window);
