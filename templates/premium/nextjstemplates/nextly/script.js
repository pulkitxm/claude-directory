(function () {
  "use strict";

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

  var mobileToggle = document.getElementById("mobile-toggle");
  var navLinksPanel = document.getElementById("nav-links-panel");
  var mobileCloseTimer;
  function buildMobilePanel() {
    var div = document.createElement("div");
    div.id = "mobile-menu-panel";
    div.className =
      "mobile-menu-panel flex flex-wrap w-full my-5 lg:hidden entering";
    div.innerHTML =
      '<a class="w-full px-4 py-2 -ml-4 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 dark:focus:bg-gray-800 focus:outline-none" href="#top">Product</a>' +
      '<a class="w-full px-4 py-2 -ml-4 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 dark:focus:bg-gray-800 focus:outline-none" href="#top">Features</a>' +
      '<a class="w-full px-4 py-2 -ml-4 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 dark:focus:bg-gray-800 focus:outline-none" href="#top">Pricing</a>' +
      '<a class="w-full px-4 py-2 -ml-4 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 dark:focus:bg-gray-800 focus:outline-none" href="#top">Company</a>' +
      '<a class="w-full px-4 py-2 -ml-4 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 dark:focus:bg-gray-800 focus:outline-none" href="#top">Blog</a>' +
      '<a class="w-full px-6 py-2 mt-3 text-center text-white bg-indigo-600 rounded-md lg:ml-5" href="#top">Get Started</a>';
    return div;
  }

  function openMobileNav() {
    clearTimeout(mobileCloseTimer);
    var previousPanel = document.getElementById("mobile-menu-panel");
    if (previousPanel) previousPanel.remove();
    var panel = buildMobilePanel();
    navLinksPanel.before(panel);
    void panel.offsetWidth;
    panel.classList.remove("entering");
    panel.classList.add("entered");
    mobileToggle.setAttribute("aria-expanded", "true");
  }
  function closeMobileNav() {
    var panel = document.getElementById("mobile-menu-panel");
    if (panel) panel.classList.remove("entered");
    mobileToggle.setAttribute("aria-expanded", "false");
    mobileCloseTimer = setTimeout(function () {
      if (panel) panel.remove();
    }, 200);
  }
  mobileToggle.addEventListener("click", function () {
    var expanded = mobileToggle.getAttribute("aria-expanded") === "true";
    if (expanded) closeMobileNav();
    else openMobileNav();
  });

  var faqToggles = document.querySelectorAll("[data-faq-toggle]");
  var faqTimers = new WeakMap();
  faqToggles.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var expanded = btn.getAttribute("aria-expanded") === "true";
      var answer = document.getElementById(btn.getAttribute("aria-controls"));
      btn.setAttribute("aria-expanded", String(!expanded));
      if (!answer) return;
      clearTimeout(faqTimers.get(answer));
      if (expanded) {
        answer.classList.remove("open");
        faqTimers.set(
          answer,
          setTimeout(function () {
            answer.hidden = true;
          }, 200),
        );
      } else {
        answer.hidden = false;
        answer.classList.add("open");
      }
    });
  });

  var contactFab = document.getElementById("contact-fab");
  var contactPanel = document.getElementById("contact-panel");
  var contactCloseTimer;

  function openContactPanel() {
    clearTimeout(contactCloseTimer);
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
    contactCloseTimer = setTimeout(function () {
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
    closeContactPanel();
  });

  var playBtn = document.getElementById("play-video-btn");
  playBtn.addEventListener("click", function () {
    var iframe = document.createElement("iframe");
    iframe.src =
      "https://www.youtube-nocookie.com/embed/fZ0D0cnR88E?controls=0&autoplay=1";
    iframe.title = "YouTube video player";
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.className = "w-full h-full aspect-video";
    playBtn.replaceWith(iframe);
  });
})();
