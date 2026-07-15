document.addEventListener("DOMContentLoaded", function () {
  var header = document.querySelector(".site-header");
  var navToggle = document.querySelector(".nav-toggle");
  var navMenu = document.querySelector(".nav-menu");

  function syncHeader() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 10);
  }

  function closeMenu(restoreFocus) {
    if (!navToggle || !navMenu) return;
    navMenu.classList.remove("open");
    navToggle.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    navToggle.querySelectorAll("span").forEach(function (span) {
      span.style.transform = "";
      span.style.opacity = "";
    });
    if (restoreFocus) navToggle.focus();
  }

  function openMenu() {
    if (!navToggle || !navMenu) return;
    navMenu.classList.add("open");
    navToggle.classList.add("active");
    navToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    var spans = navToggle.querySelectorAll("span");
    if (spans[0]) spans[0].style.transform = "rotate(45deg) translate(4px, 5px)";
    if (spans[1]) spans[1].style.opacity = "0";
    if (spans[2]) spans[2].style.transform = "rotate(-45deg) translate(4px, -5px)";
  }

  window.addEventListener("scroll", syncHeader, { passive: true });
  syncHeader();

  if (navToggle && navMenu) {
    if (!navMenu.id) navMenu.id = "primary-navigation";
    navToggle.setAttribute("aria-controls", navMenu.id);
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.addEventListener("click", function () {
      if (navMenu.classList.contains("open")) closeMenu(false);
      else openMenu();
    });
  }

  document.querySelectorAll(".nav-item").forEach(function (item, index) {
    var link = item.querySelector(".nav-link");
    var dropdown = item.querySelector(".nav-dropdown");
    if (!link || !dropdown) return;
    if (!dropdown.id) dropdown.id = "navigation-dropdown-" + (index + 1);
    link.setAttribute("aria-controls", dropdown.id);
    link.setAttribute("aria-expanded", "false");
    link.addEventListener("click", function (event) {
      if (window.innerWidth >= 1024) return;
      event.preventDefault();
      var open = item.classList.toggle("open");
      link.setAttribute("aria-expanded", String(open));
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeMenu(true);
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth >= 1024) closeMenu(false);
  });

  document.querySelectorAll(".newsletter-form form").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var input = form.querySelector("input[type='email']");
      if (!input || !input.value || !form.reportValidity()) return;
      var status = form.querySelector("[role='status']");
      if (!status) {
        status = document.createElement("p");
        status.setAttribute("role", "status");
        status.className = "form-status form-status-success";
        form.appendChild(status);
      }
      status.textContent = "Thank you for subscribing!";
      input.value = "";
    });
  });

  document.querySelectorAll(".auth-card form").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var password = form.querySelector("#password");
      var confirmation = form.querySelector("#confirm-password");
      if (confirmation) {
        confirmation.setCustomValidity(password && password.value !== confirmation.value ? "Passwords must match." : "");
      }
      if (!form.reportValidity()) return;
      var status = form.querySelector("[role='status']");
      if (!status) {
        status = document.createElement("p");
        status.setAttribute("role", "status");
        status.className = "form-status form-status-success";
        form.appendChild(status);
      }
      status.textContent = "Your details look good. This preview does not submit account data.";
    });
  });

  var searchForm = document.querySelector(".search-form");
  if (searchForm) {
    var searchInput = searchForm.querySelector("input[type='search']");
    var cards = document.querySelectorAll(".posts-grid .post-card");
    var resultsHeading = document.querySelector(".posts-grid")?.previousElementSibling;
    function filterSearch(query) {
      var normalized = query.trim().toLowerCase();
      var visible = 0;
      cards.forEach(function (card) {
        var match = !normalized || card.textContent.toLowerCase().includes(normalized);
        card.hidden = !match;
        if (match) visible += 1;
      });
      if (resultsHeading) resultsHeading.textContent = normalized ? visible + " matching article" + (visible === 1 ? "" : "s") : "Featured Articles";
    }
    searchForm.addEventListener("submit", function (event) {
      event.preventDefault();
      filterSearch(searchInput ? searchInput.value : "");
    });
    document.querySelectorAll(".search-hero .tag").forEach(function (tag) {
      tag.addEventListener("click", function (event) {
        event.preventDefault();
        if (searchInput) searchInput.value = tag.textContent.trim();
        filterSearch(tag.textContent);
      });
    });
  }

  var filterButtons = document.querySelectorAll(".cat-filter-btn");
  if (filterButtons.length) {
    var categoryCards = document.querySelectorAll(".posts-section .post-card");
    filterButtons.forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.classList.contains("active")));
      button.addEventListener("click", function () {
        var category = button.dataset.category;
        filterButtons.forEach(function (item) {
          var active = item === button;
          item.classList.toggle("active", active);
          item.setAttribute("aria-pressed", String(active));
        });
        categoryCards.forEach(function (card) {
          var badge = card.querySelector(".category-badge");
          var cardCategory = badge ? badge.textContent.trim().toLowerCase() : "";
          var matches = category === "all" || cardCategory === category || (category === "technology" && cardCategory === "tech");
          card.hidden = !matches;
        });
      });
    });
  }

  var currentFile = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link[href]").forEach(function (link) {
    var href = link.getAttribute("href").split("?")[0].split("#")[0];
    if (href.split("/").pop() === currentFile) link.setAttribute("aria-current", "page");
  });
});
