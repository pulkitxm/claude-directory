document.addEventListener("DOMContentLoaded", function () {
  var header = document.querySelector(".site-header");
  var navigation = document.querySelector(".nav-links");
  if (header && navigation) {
    var menuButton = document.createElement("button");
    menuButton.className = "mobile-menu-toggle";
    menuButton.type = "button";
    menuButton.setAttribute("aria-label", "Toggle navigation");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    header.appendChild(menuButton);

    function closeMenu() {
      header.classList.remove("mobile-open");
      menuButton.setAttribute("aria-expanded", "false");
    }

    menuButton.addEventListener("click", function () {
      var isOpen = header.classList.toggle("mobile-open");
      menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navigation.addEventListener("click", closeMenu);
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });
  }

  var toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var root = document.documentElement;
      var nowDark = root.classList.toggle("dark");
      try {
        localStorage.setItem("theme", nowDark ? "dark" : "light");
      } catch (e) {}
    });
  }

  var contactForm = document.querySelector("[data-contact-form]");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = contactForm.querySelector(".form-status");
      if (status) status.textContent = "Thanks! Your message has been sent.";
      contactForm.reset();
    });
  }

  var inlineForm = document.querySelector("[data-inline-contact-form]");
  if (inlineForm) {
    inlineForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = inlineForm.querySelector("button");
      if (btn) {
        var original = btn.textContent;
        btn.textContent = "Sent!";
        setTimeout(function () {
          btn.textContent = original;
        }, 2000);
      }
      inlineForm.reset();
    });
  }
});
