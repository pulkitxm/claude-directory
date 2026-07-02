(function () {
  var basePath = "../";
  var slug = window.ITEM_SLUG;
  var item = UNFT_CATALOG.items[slug];
  if (!item) return;

  document.title = item.title + " — uNFT Marketplace";

  document.querySelector("[data-item-image]").src = basePath + item.image_local;
  document.querySelector("[data-item-image]").alt = item.title;
  document.querySelector("[data-item-title]").textContent = item.title;
  document.querySelector("[data-item-price]").textContent = item.price === null || item.price === undefined ? "-" : "$" + item.price;
  document.querySelector("[data-item-stock]").textContent =
    item.count === null || item.count === undefined ? "Not Available" : item.count + " in stock";
  document.querySelector("[data-item-desc]").textContent = item.description;

  var tagWrap = document.querySelector("[data-item-tags]");
  var catTitles = { sale: "Sale", offer: "Special offer", cosmos: "Cosmos", artwork: "Artwork" };
  tagWrap.innerHTML = item.categories.map(function (c) {
    return '<span class="chip chip-static">' + (catTitles[c] || c) + "</span>";
  }).join("");

  document.querySelector("[data-buy-now]").addEventListener("click", function (e) {
    e.preventDefault();
    var modal = document.querySelector("[data-modal]");
    if (modal) modal.classList.add("is-open");
  });

  /* Hot bid strip — first 4 catalog items excluding the current one */
  var allItems = UnftProductGrid.allItems();
  var related = allItems.filter(function (it) {
    return it.slug !== slug;
  }).slice(0, 4);
  var track = document.querySelector("[data-hotbid-track]");
  if (track) {
    track.innerHTML = related.map(function (it) {
      return UnftProductGrid.cardHTML(basePath, it);
    }).join("");
  }
  document.querySelectorAll("[data-carousel-prev],[data-carousel-next]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (!track) return;
      var dir = btn.hasAttribute("data-carousel-next") ? 1 : -1;
      track.scrollBy({ left: dir * 300, behavior: "smooth" });
    });
  });

  /* Discover grid with the same category chips as home/search */
  var grid = document.querySelector("[data-grid]");
  if (grid) {
    UnftProductGrid.renderGrid(grid, basePath, allItems);
    UnftFilter.wireFilter("[data-chip-row]", "[data-grid]");
  }
})();
