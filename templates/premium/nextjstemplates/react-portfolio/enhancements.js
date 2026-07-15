(function () {
  var root = document.documentElement;
  var menuButton = document.querySelector('.mobile-menu-btn');
  var menu = document.querySelector('.mobile-popover');
  var cursorCircle = document.querySelector('.cursor-tracker circle');

  function syncTheme() {
    var theme = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    root.style.colorScheme = theme;
    if (cursorCircle) {
      cursorCircle.setAttribute('fill', theme === 'dark' ? '#fff' : '#000');
      cursorCircle.setAttribute('stroke', theme === 'dark' ? '#fff' : '#000');
    }
  }

  function closeMenu() {
    if (!menu || !menuButton) return;
    menu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }

  if (menuButton && menu) {
    if (!menu.id) menu.id = 'mobile-navigation';
    if (!menuButton.getAttribute('aria-label')) menuButton.setAttribute('aria-label', 'Open menu');
    if (!menu.getAttribute('aria-label')) menu.setAttribute('aria-label', 'Navigation menu');
    menuButton.setAttribute('aria-controls', menu.id);
    menuButton.setAttribute('aria-expanded', menu.classList.contains('open') ? 'true' : 'false');
    menuButton.addEventListener('click', function () {
      window.requestAnimationFrame(function () {
        menuButton.setAttribute('aria-expanded', menu.classList.contains('open') ? 'true' : 'false');
      });
    });
    menu.querySelectorAll('a, button').forEach(function (item) {
      item.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && menu.classList.contains('open')) {
        closeMenu();
        menuButton.focus();
      }
    });
  }

  document.querySelectorAll('.btn-icon').forEach(function (button) {
    if (!button.getAttribute('aria-label')) button.setAttribute('aria-label', 'Toggle theme');
  });

  syncTheme();
  new MutationObserver(syncTheme).observe(root, {
    attributes: true,
    attributeFilter: ['data-theme']
  });
})();
