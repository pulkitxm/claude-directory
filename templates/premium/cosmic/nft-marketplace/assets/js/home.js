(function () {
  var basePath = "";
  var items = UnftProductGrid.allItems();
  var categories = UNFT_CATALOG.categories;
  var reviews = UNFT_CATALOG.reviews;

  /* Hot bid strip — first 4 catalog items, matches reference order */
  var hotbid = items.slice(0, 4);
  var track = document.querySelector("[data-hotbid-track]");
  if (track) {
    track.innerHTML = hotbid.map(function (item) {
      return UnftProductGrid.cardHTML(basePath, item);
    }).join("");
  }
  var trackEl = document.querySelector("[data-hotbid-track]");
  document.querySelectorAll("[data-carousel-prev],[data-carousel-next]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (!trackEl) return;
      var dir = btn.hasAttribute("data-carousel-next") ? 1 : -1;
      trackEl.scrollBy({ left: dir * 300, behavior: "smooth" });
    });
  });

  /* Hot collections — one tile per category with a mosaic of its item thumbnails */
  var catGrid = document.querySelector("[data-category-grid]");
  if (catGrid) {
    catGrid.innerHTML = categories
      .filter(function (c) {
        return ["sale", "offer", "cosmos"].indexOf(c.slug) !== -1;
      })
      .map(function (cat) {
        var catItems = items.filter(function (it) {
          return it.categories.indexOf(cat.slug) !== -1;
        }).slice(0, 8);
        var mosaic = catItems.map(function (it) {
          return '<div style="background-image:url(\'' + basePath + it.image_local + "')\"></div>";
        }).join("");
        return (
          '<a class="category-tile" href="search.html">' +
          '<div class="category-mosaic">' + mosaic + "</div>" +
          "<h4>" + cat.title + "</h4>" +
          "<p>" + catItems.length + " items</p>" +
          "</a>"
        );
      })
      .join("");
  }

  /* Spotlight panel — first item as the big feature, next 3 as the mini list */
  var spotlightMain = document.querySelector("[data-spotlight-main]");
  var featured = items[0];
  if (spotlightMain && featured) {
    spotlightMain.href = basePath + "item/" + featured.slug + ".html";
    spotlightMain.innerHTML =
      '<img src="' + basePath + featured.image_local + '" alt="' + featured.title + '">' +
      '<div class="spotlight-main-info"><span>' + featured.title + "</span><span class=\"card-price\">$" + featured.price + "</span></div>";
  }
  var spotlightList = document.querySelector("[data-spotlight-list]");
  if (spotlightList) {
    spotlightList.innerHTML = items.slice(1, 4).map(function (it) {
      return (
        '<a class="spotlight-row" href="' + basePath + "item/" + it.slug + '.html">' +
        '<img src="' + basePath + it.image_local + '" alt="' + it.title + '">' +
        '<span class="spotlight-row-info"><strong>' + it.title + "</strong><em>Show item</em></span>" +
        '<span class="card-price">$' + it.price + "</span>" +
        "</a>"
      );
    }).join("");
  }
  var spotlightCats = document.querySelector("[data-spotlight-categories]");
  if (spotlightCats) {
    spotlightCats.innerHTML = categories.map(function (c) {
      return '<li><a href="search.html">' + c.title + "</a></li>";
    }).join("");
  }

  /* Reviews strip */
  var reviewsTrack = document.querySelector("[data-reviews-track]");
  if (reviewsTrack) {
    reviewsTrack.innerHTML = reviews.map(function (r) {
      return (
        '<div class="review-card">' +
        '<img src="' + basePath + r.avatar_local + '" alt="' + r.name + '">' +
        "<h4>" + r.name + "</h4>" +
        "<span>" + r.position + "</span>" +
        "<p>" + r.comment + "</p>" +
        "</div>"
      );
    }).join("");
  }

  /* Discover grid — full catalog with category-chip filtering */
  var grid = document.querySelector("[data-grid]");
  if (grid) {
    UnftProductGrid.renderGrid(grid, basePath, items);
    UnftFilter.wireFilter("[data-chip-row]", "[data-grid]");
  }
})();
