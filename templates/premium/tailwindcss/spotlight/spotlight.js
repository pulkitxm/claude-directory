/**
 * Spotlight — shared JS: dark mode, mobile menu, sticky header
 */
(function () {
  // 1. Apply saved theme before paint
  var html = document.documentElement;
  var stored = localStorage.getItem('theme');
  if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.remove('light');
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
    html.classList.add('light');
  }

  // 2. Dark toggle
  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('dark-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        var isDark = html.classList.contains('dark');
        if (isDark) {
          html.classList.replace('dark', 'light');
          localStorage.setItem('theme', 'light');
        } else {
          html.classList.replace('light', 'dark');
          localStorage.setItem('theme', 'dark');
        }
      });
    }

    // 3. Mobile menu
    var overlay = document.getElementById('mobile-menu');
    var openBtn = document.getElementById('mobile-menu-btn');
    var closeBtn = document.getElementById('mobile-menu-close');
    if (overlay && openBtn) {
      openBtn.addEventListener('click', function () { overlay.classList.add('open'); });
      if (closeBtn) closeBtn.addEventListener('click', function () { overlay.classList.remove('open'); });
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) overlay.classList.remove('open');
      });
    }

    // 4. Sticky header shrink (non-home pages)
    var headerEl = document.getElementById('site-header');
    if (headerEl && headerEl.dataset.type !== 'home') {
      window.addEventListener('scroll', function () {
        // nothing extra needed — CSS handles sticky
      }, { passive: true });
    }
  });
})();
