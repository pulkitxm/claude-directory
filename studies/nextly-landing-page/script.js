(function () {
  "use strict";

  // ---------- Dark mode toggle ----------
  var html = document.documentElement;
  var themeBtn = document.getElementById("theme-toggle");
  var sunIcon = document.getElementById("theme-icon-sun");
  var moonIcon = document.getElementById("theme-icon-moon");

  function syncThemeIcon() {
    var isDark = html.classList.contains("dark");
    sunIcon.style.display = isDark ? "none" : "block";
    moonIcon.style.display = isDark ? "block" : "none";
  }
  syncThemeIcon();

  themeBtn.addEventListener("click", function () {
    var isDark = html.classList.contains("dark");
    html.classList.remove("light", "dark");
    if (isDark) {
      html.classList.add("light");
      html.style.colorScheme = "light";
      localStorage.setItem("theme", "light");
    } else {
      html.classList.add("dark");
      html.style.colorScheme = "dark";
      localStorage.setItem("theme", "dark");
    }
    syncThemeIcon();
  });

  // ---------- Mobile hamburger menu ----------
  // Reuses the SAME nav-links block shown inline at desktop width (lg:flex) --
  // matches the live Nextly source, which toggles the "hidden" class on that
  // one block rather than rendering a separate duplicate mobile menu.
  var mobileToggle = document.getElementById("mobile-toggle");
  var navLinksPanel = document.getElementById("nav-links-panel");
  // Mobile-only "Get Started" CTA shown below the links -- the live source
  // only mounts this inside the open Disclosure.Panel (headlessui unmounts
  // panel content when closed), so we mirror that by creating/removing the
  // node itself rather than just hiding it with CSS -- this keeps the DOM
  // element count/ordering identical to the reference when the menu is shut.
  function buildMobileCta() {
    var div = document.createElement("div");
    div.id = "mobile-cta";
    div.className = "flex flex-wrap w-full my-5 lg:hidden";
    div.innerHTML =
      '<a class="w-full px-6 py-2 mt-3 text-center text-white bg-indigo-600 rounded-md lg:ml-5" href="#top">Get Started</a>';
    return div;
  }

  function openMobileNav() {
    navLinksPanel.classList.remove("hidden");
    navLinksPanel.classList.add("entering");
    void navLinksPanel.offsetWidth;
    navLinksPanel.classList.remove("entering");
    navLinksPanel.classList.add("entered");
    mobileToggle.setAttribute("aria-expanded", "true");
    if (!document.getElementById("mobile-cta")) {
      navLinksPanel.appendChild(buildMobileCta());
    }
  }
  function closeMobileNav() {
    navLinksPanel.classList.remove("entered");
    mobileToggle.setAttribute("aria-expanded", "false");
    var cta = document.getElementById("mobile-cta");
    if (cta) cta.remove();
    setTimeout(function () {
      navLinksPanel.classList.add("hidden");
    }, 200);
  }
  mobileToggle.addEventListener("click", function () {
    var expanded = mobileToggle.getAttribute("aria-expanded") === "true";
    if (expanded) closeMobileNav();
    else openMobileNav();
  });

  // ---------- FAQ accordion (independent per item) ----------
  var faqToggles = document.querySelectorAll("[data-faq-toggle]");
  faqToggles.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var expanded = btn.getAttribute("aria-expanded") === "true";
      var answer = document.getElementById(btn.getAttribute("aria-controls"));
      btn.setAttribute("aria-expanded", String(!expanded));
      if (answer) answer.classList.toggle("open", !expanded);
    });
  });

  // ---------- Contact form widget ----------
  var contactFab = document.getElementById("contact-fab");
  var contactPanel = document.getElementById("contact-panel");

  function openContactPanel() {
    contactPanel.hidden = false;
    contactPanel.classList.add("entering");
    void contactPanel.offsetWidth;
    contactPanel.classList.remove("entering");
    contactPanel.classList.add("entered");
    contactFab.setAttribute("aria-expanded", "true");
  }
  function closeContactPanel() {
    contactPanel.classList.remove("entered");
    contactFab.setAttribute("aria-expanded", "false");
    setTimeout(function () {
      contactPanel.hidden = true;
    }, 200);
  }
  contactFab.addEventListener("click", function () {
    var expanded = contactFab.getAttribute("aria-expanded") === "true";
    if (expanded) closeContactPanel();
    else openContactPanel();
  });

  var contactForm = document.getElementById("contact-form");
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    // Decorative demo form (source uses Web3Forms) -- no backend wired in this static clone.
    closeContactPanel();
  });

  // ---------- Decorative play-video button ----------
  var playBtn = document.getElementById("play-video-btn");
  playBtn.addEventListener("click", function () {
    playBtn.classList.add("is-hidden");
  });
})();
