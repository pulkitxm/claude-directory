document.addEventListener('DOMContentLoaded', function () {
  const menu = document.getElementById('mobile-menu');
  const menuButton = document.querySelector('.mobile-menu-btn');

  function closeMenu(restoreFocus) {
    if (!menu) return;
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
    if (menuButton) menuButton.setAttribute('aria-expanded', 'false');
    if (restoreFocus && menuButton) menuButton.focus();
  }

  if (menu && menuButton) {
    menuButton.setAttribute('aria-controls', 'mobile-menu');
    menuButton.setAttribute('aria-expanded', String(menu.classList.contains('open')));
    menu.setAttribute('aria-hidden', String(!menu.classList.contains('open')));
    window.toggleMobileMenu = function () {
      const open = menu.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-hidden', String(!open));
      if (open) {
        const firstLink = menu.querySelector('a');
        if (firstLink) firstLink.focus();
      }
    };
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { closeMenu(false); });
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && menu.classList.contains('open')) closeMenu(true);
    });
  }

  document.querySelectorAll('.theme-toggle').forEach(function (button) {
    if (!button.getAttribute('aria-label')) button.setAttribute('aria-label', 'Toggle theme');
    button.addEventListener('click', function () {
      requestAnimationFrame(function () {
        button.setAttribute('aria-pressed', String(document.documentElement.getAttribute('data-theme') === 'dark'));
      });
    });
  });

  document.querySelectorAll('input, textarea, select').forEach(function (field) {
    if (field.getAttribute('aria-label') || field.closest('label')) return;
    const label = field.getAttribute('placeholder') || field.getAttribute('name') || field.getAttribute('type') || 'Form field';
    field.setAttribute('aria-label', label);
  });

  document.querySelectorAll('form').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const button = form.querySelector('[type="submit"]');
      if (button) {
        const label = button.textContent;
        button.textContent = 'Ready to continue';
        setTimeout(function () { button.textContent = label; }, 1800);
      }
    });
  });
});
