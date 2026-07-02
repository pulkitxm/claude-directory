/* Renders product cards from the vendored catalog dataset (assets/data/catalog.js).
   Shared by the home "Discover" grid, the search page grid, and the item detail
   page's "Discover" + "Hot bid" strips. */
(function (global) {
  function formatCount(item) {
    var c = item.count;
    if (c === null || c === undefined) return "Not Available";
    return c + (c === 1 ? " Item" : c < 1 ? " Items" : " Items");
  }

  function cardHTML(basePath, item) {
    var price = item.price === null || item.price === undefined ? "-" : "$ " + item.price;
    return (
      '<article class="card" data-categories="' + item.categories.join(",") + '">' +
      '<a class="card-media" href="' + basePath + "item/" + item.slug + '.html">' +
      '<img src="' + basePath + item.image_local + '" alt="' + item.title + '">' +
      '<span class="card-overlay"><span class="btn btn-primary">Quick view</span></span>' +
      "</a>" +
      '<a class="card-body" href="' + basePath + "item/" + item.slug + '.html">' +
      '<div class="card-row">' +
      '<span class="card-title">' + item.title + "</span>" +
      '<span class="card-price">' + price + "</span>" +
      "</div>" +
      '<span class="card-counter">' + formatCount(item) + "</span>" +
      "</a>" +
      "</article>"
    );
  }

  function renderGrid(container, basePath, items) {
    container.innerHTML = items.map(function (item) {
      return cardHTML(basePath, item);
    }).join("");
  }

  function allItems() {
    var items = global.UNFT_CATALOG.items;
    return Object.keys(items).map(function (k) {
      return items[k];
    });
  }

  global.UnftProductGrid = { renderGrid: renderGrid, allItems: allItems, cardHTML: cardHTML };
})(window);
