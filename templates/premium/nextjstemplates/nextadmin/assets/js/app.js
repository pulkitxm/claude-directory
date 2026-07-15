(function () {
  "use strict";

  function currentFile() {
    var p = window.location.pathname.split("/").pop();
    return p === "" ? "index.html" : p;
  }

  function initSidebar() {
    var sidebar = document.getElementById("app-sidebar");
    if (!sidebar) return;
    var file = currentFile();
    var links = sidebar.querySelectorAll(".nav-toplink, .nav-sublink");
    links.forEach(function (a) {
      var href = a.getAttribute("href");
      if (href === file) {
        a.classList.add("is-active");
        var group = a.closest(".nav-group");
        if (group) {
          var btn = group.querySelector(".nav-group-btn");
          var list = group.querySelector(".nav-sublist");
          if (btn && list) {
            btn.setAttribute("aria-expanded", "true");
            btn.classList.add("is-active");
            list.classList.remove("hidden");
          }
        }
      }
    });

    var groupBtns = sidebar.querySelectorAll(".nav-group-btn");
    groupBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var list = btn.parentElement.querySelector(".nav-sublist");
        var expanded = btn.getAttribute("aria-expanded") === "true";
        var section = btn.closest("nav");
        if (section) {
          section.querySelectorAll(".nav-group-btn").forEach(function (other) {
            if (other !== btn) {
              other.setAttribute("aria-expanded", "false");
              var otherList = other.parentElement.querySelector(".nav-sublist");
              if (otherList) otherList.classList.add("hidden");
            }
          });
        }
        btn.setAttribute("aria-expanded", expanded ? "false" : "true");
        if (list) list.classList.toggle("hidden", expanded);
      });
    });
    var toggleBtn = document.getElementById("sidebar-toggle-btn");
    var closeBtn = document.getElementById("sidebar-close-btn");
    var overlay = document.getElementById("sidebar-overlay");
    var previousOverflow = "";
    function openSidebar() {
      sidebar.classList.add("sidebar-open");
      if (overlay) overlay.classList.remove("hidden");
      if (toggleBtn) toggleBtn.setAttribute("aria-expanded", "true");
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      if (closeBtn) closeBtn.focus();
    }
    function closeSidebar(restoreFocus) {
      sidebar.classList.remove("sidebar-open");
      if (overlay) overlay.classList.add("hidden");
      if (toggleBtn) toggleBtn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = previousOverflow;
      if (restoreFocus && toggleBtn) toggleBtn.focus();
    }
    if (toggleBtn) toggleBtn.addEventListener("click", openSidebar);
    if (closeBtn) closeBtn.addEventListener("click", function () { closeSidebar(true); });
    if (overlay) overlay.addEventListener("click", function () { closeSidebar(true); });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && sidebar.classList.contains("sidebar-open")) {
        closeSidebar(true);
      }
    });
  }

  function initTheme() {
    var btn = document.getElementById("theme-toggle-btn");
    if (!btn) return;
    function syncThemeButton() {
      var isDark = document.documentElement.classList.contains("dark");
      btn.setAttribute("aria-pressed", String(isDark));
      btn.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
    }
    syncThemeButton();
    btn.addEventListener("click", function () {
      var root = document.documentElement;
      var isDark = root.classList.contains("dark");
      root.classList.toggle("dark", !isDark);
      root.classList.toggle("light", isDark);
      try {
        localStorage.setItem("theme", isDark ? "light" : "dark");
      } catch (e) {}
      syncThemeButton();
    });
  }

  function closeDropdowns() {
    document.querySelectorAll(".dropdown-panel").forEach(function (panel) {
      panel.classList.add("hidden");
    });
    document.querySelectorAll("#notif-btn, #user-menu-btn").forEach(function (btn) {
      btn.setAttribute("aria-expanded", "false");
    });
  }

  function initDropdown(btnId, panelId) {
    var btn = document.getElementById(btnId);
    var panel = document.getElementById(panelId);
    if (!btn || !panel) return;
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = !panel.classList.contains("hidden");
      closeDropdowns();
      panel.classList.toggle("hidden", open);
      btn.setAttribute("aria-expanded", String(!open));
    });
  }

  function initDropdowns() {
    initDropdown("notif-btn", "notif-dropdown");
    initDropdown("user-menu-btn", "user-dropdown");
    document.addEventListener("click", closeDropdowns);
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeDropdowns();
    });
  }

  function initAccordions() {
    document.querySelectorAll("[data-accordion-trigger], button[data-state][aria-controls]").forEach(function (trigger) {
      var selector = trigger.getAttribute("data-accordion-trigger");
      var panel = selector
        ? document.querySelector(selector)
        : document.getElementById(trigger.getAttribute("aria-controls"));
      if (panel) {
        var initiallyCollapsed = panel.classList.contains("is-collapsed") || panel.hidden;
        trigger.setAttribute("aria-expanded", String(!initiallyCollapsed));
        panel.setAttribute("aria-hidden", String(initiallyCollapsed));
      }
      trigger.addEventListener("click", function () {
        if (!panel) return;
        var collapsed = trigger.getAttribute("aria-expanded") === "true";
        panel.classList.toggle("is-collapsed", collapsed);
        panel.hidden = collapsed;
        trigger.classList.toggle("is-open");
        trigger.setAttribute("data-state", collapsed ? "closed" : "open");
        panel.setAttribute("data-state", collapsed ? "closed" : "open");
        trigger.setAttribute("aria-expanded", String(!collapsed));
        panel.setAttribute("aria-hidden", String(collapsed));
      });
    });
  }

  function initTabs() {
    document.querySelectorAll("[data-tabs]").forEach(function (group) {
      var buttons = group.querySelectorAll("[data-tab-trigger]");
      group.setAttribute("role", "tablist");
      buttons.forEach(function (btn) {
        var active = btn.classList.contains("is-active-tab");
        btn.setAttribute("role", "tab");
        btn.setAttribute("aria-selected", String(active));
        btn.setAttribute("tabindex", active ? "0" : "-1");
        btn.addEventListener("click", function () {
          var target = btn.getAttribute("data-tab-trigger");
          buttons.forEach(function (b) {
            b.classList.remove("is-active-tab");
            b.setAttribute("aria-selected", "false");
            b.setAttribute("tabindex", "-1");
          });
          btn.classList.add("is-active-tab");
          btn.setAttribute("aria-selected", "true");
          btn.setAttribute("tabindex", "0");
          group.querySelectorAll("[data-tab-panel]").forEach(function (panel) {
            var hidden = "#" + panel.id !== target;
            panel.classList.toggle("is-hidden", hidden);
            panel.setAttribute("aria-hidden", String(hidden));
          });
        });
      });
    });

    document.querySelectorAll("button[aria-selected][aria-controls]").forEach(function (btn) {
      var panel = document.getElementById(btn.getAttribute("aria-controls"));
      if (!panel || panel.getAttribute("role") !== "tabpanel") return;
      btn.setAttribute("role", "tab");
      btn.setAttribute("tabindex", btn.getAttribute("aria-selected") === "true" ? "0" : "-1");
      btn.addEventListener("click", function () {
        var container = panel.parentElement;
        var panels = container.querySelectorAll("[role='tabpanel']");
        panels.forEach(function (item) {
          var active = item === panel;
          item.hidden = !active;
          var trigger = document.getElementById(item.getAttribute("aria-labelledby"));
          if (trigger) {
            trigger.setAttribute("aria-selected", String(active));
            trigger.setAttribute("data-active", String(active));
            trigger.setAttribute("tabindex", active ? "0" : "-1");
          }
        });
      });
    });
  }

  function initModals() {
    if (/^Modals\s*\|/i.test(document.title)) {
      document.querySelectorAll("main button").forEach(function (btn, index) {
        if (!/^Modal [123]$/.test(btn.textContent.trim())) return;
        var id = "showcase-modal-" + (index + 1);
        btn.setAttribute("data-modal-open", "#" + id);
        btn.setAttribute("aria-haspopup", "dialog");
        var backdrop = document.createElement("div");
        backdrop.id = id;
        backdrop.setAttribute("data-modal-backdrop", "");
        backdrop.setAttribute("aria-hidden", "true");
        backdrop.innerHTML = '<section aria-labelledby="' + id + '-title" class="mx-4 w-full max-w-[520px] rounded-[10px] bg-white p-7.5 text-center shadow-card dark:bg-gray-dark" role="dialog"><h2 class="text-2xl font-bold text-dark dark:text-white" id="' + id + '-title">Your Message Sent Successfully</h2><p class="mt-3 text-dark-4 dark:text-dark-6">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p><div class="mt-7 flex justify-center gap-3"><button class="rounded-[7px] border border-stroke px-6 py-2.5 font-medium text-dark dark:border-dark-3 dark:text-white" data-modal-close type="button">Cancel</button><a class="rounded-[7px] bg-primary px-6 py-2.5 font-medium text-white" href="index.html">View Details</a></div></section>';
        document.body.appendChild(backdrop);
      });
    }

    var opener = null;
    function closeModal(modal) {
      if (!modal) return;
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (opener) opener.focus();
    }
    document.querySelectorAll("[data-modal-open]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var modal = document.querySelector(btn.getAttribute("data-modal-open"));
        if (!modal) return;
        opener = btn;
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        var focusTarget = modal.querySelector("[data-modal-close], button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
        if (focusTarget) focusTarget.focus();
      });
    });
    document.querySelectorAll("[data-modal-close]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var modal = btn.closest("[data-modal-backdrop]");
        closeModal(modal);
      });
    });
    document.querySelectorAll("[data-modal-backdrop]").forEach(function (backdrop) {
      backdrop.addEventListener("click", function (e) {
        if (e.target === backdrop) closeModal(backdrop);
      });
      backdrop.setAttribute("aria-hidden", String(!backdrop.classList.contains("is-open")));
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeModal(document.querySelector("[data-modal-backdrop].is-open"));
    });
  }

  function initPopovers() {
    document.querySelectorAll("button[aria-haspopup='dialog'][aria-controls]").forEach(function (btn) {
      var id = btn.getAttribute("aria-controls");
      if (document.getElementById(id)) return;
      var panel = document.createElement("div");
      var direction = btn.textContent.toLowerCase();
      panel.id = id;
      panel.setAttribute("data-popover-panel", "");
      panel.setAttribute("role", "dialog");
      panel.className = "generated-popover";
      if (direction.includes("right")) panel.classList.add("generated-popover-right");
      else if (direction.includes("top")) panel.classList.add("generated-popover-top");
      else if (direction.includes("left")) panel.classList.add("generated-popover-left");
      else panel.classList.add("generated-popover-bottom");
      panel.innerHTML = '<strong class="block text-dark dark:text-white">Popover Title</strong><p class="mt-1 text-sm text-dark-4 dark:text-dark-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris facilisis congue justo.</p>';
      btn.setAttribute("data-popover-trigger", "#" + id);
      btn.parentElement.appendChild(panel);
    });

    document.querySelectorAll("[data-popover-trigger]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var panel = document.querySelector(btn.getAttribute("data-popover-trigger"));
        if (!panel) return;
        var wasOpen = panel.classList.contains("is-open");
        document.querySelectorAll("[data-popover-trigger]").forEach(function (trigger) {
          trigger.setAttribute("aria-expanded", "false");
        });
        document.querySelectorAll("[data-popover-panel]").forEach(function (item) {
          item.classList.remove("is-open");
        });
        panel.classList.toggle("is-open", !wasOpen);
        btn.setAttribute("aria-expanded", String(!wasOpen));
      });
    });
    document.addEventListener("click", function () {
      document.querySelectorAll("[data-popover-panel]").forEach(function (p) {
        p.classList.remove("is-open");
      });
      document.querySelectorAll("[data-popover-trigger]").forEach(function (btn) {
        btn.setAttribute("aria-expanded", "false");
      });
    });
  }

  function initCarousels() {
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.querySelectorAll("[data-carousel]").forEach(function (carousel) {
      var track = carousel.querySelector("[data-carousel-track]");
      var slides = carousel.querySelectorAll("[data-carousel-slide]");
      if (!track || !slides.length) return;
      var index = 0;
      function show(i) {
        index = (i + slides.length) % slides.length;
        track.style.transform = "translateX(-" + index * 100 + "%)";
      }
      var prev = carousel.querySelector("[data-carousel-prev]");
      var next = carousel.querySelector("[data-carousel-next]");
      if (prev) prev.addEventListener("click", function () { show(index - 1); });
      if (next) next.addEventListener("click", function () { show(index + 1); });
      if (!reduceMotion) {
        setInterval(function () {
          if (!document.hidden) show(index + 1);
        }, 4000);
      }
    });

    document.querySelectorAll(".swiper").forEach(function (carousel) {
      var track = carousel.querySelector(".swiper-wrapper");
      var slides = carousel.querySelectorAll(".swiper-slide");
      var prev = carousel.querySelector(".swiper-button-prev");
      var next = carousel.querySelector(".swiper-button-next");
      var pagination = carousel.querySelector(".swiper-pagination");
      if (!track || !slides.length) return;
      var index = 0;
      function show(nextIndex) {
        index = Math.max(0, Math.min(nextIndex, slides.length - 1));
        track.style.transform = "translateX(-" + index * 100 + "%)";
        slides.forEach(function (slide, slideIndex) {
          slide.classList.toggle("swiper-slide-active", slideIndex === index);
          slide.setAttribute("aria-hidden", String(slideIndex !== index));
        });
        if (prev) prev.disabled = index === 0;
        if (next) next.disabled = index === slides.length - 1;
        if (pagination) {
          pagination.querySelectorAll("button").forEach(function (dot, dotIndex) {
            dot.setAttribute("aria-current", dotIndex === index ? "true" : "false");
          });
        }
      }
      if (prev) {
        prev.setAttribute("aria-label", "Previous slide");
        prev.addEventListener("click", function () { show(index - 1); });
      }
      if (next) {
        next.setAttribute("aria-label", "Next slide");
        next.addEventListener("click", function () { show(index + 1); });
      }
      if (pagination) {
        pagination.innerHTML = "";
        slides.forEach(function (_, dotIndex) {
          var dot = document.createElement("button");
          dot.type = "button";
          dot.setAttribute("aria-label", "Go to slide " + (dotIndex + 1));
          dot.addEventListener("click", function () { show(dotIndex); });
          pagination.appendChild(dot);
        });
      }
      show(0);
    });
  }

  function initProgressBars() {
    document.querySelectorAll("[data-progress-bar]").forEach(function (bar) {
      var target = bar.getAttribute("data-progress-bar");
      bar.style.width = "0%";
      requestAnimationFrame(function () {
        setTimeout(function () {
          bar.style.width = target + "%";
        }, 100);
      });
    });
  }

  function initReveal() {
    var items = document.querySelectorAll(".reveal-on-scroll");
    if (!("IntersectionObserver" in window) || !items.length) return;
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach(function (el) {
      io.observe(el);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initSidebar();
    initTheme();
    initDropdowns();
    initAccordions();
    initTabs();
    initModals();
    initPopovers();
    initCarousels();
    initProgressBars();
    initReveal();
  });
})();
