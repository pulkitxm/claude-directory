(function () {
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (stored === 'dark' || (!stored && prefersDark)) document.documentElement.classList.add('dark');
})();

document.addEventListener('DOMContentLoaded', function () {
  const themeToggleBtns = document.querySelectorAll('[data-theme-toggle]');
  const hamburger = document.querySelector('[data-hamburger]');
  const mobileNav = document.querySelector('[data-mobile-nav]');
  const mobileClose = document.querySelector('[data-mobile-close]');

  function updateThemeIcons() {
    const isDark = document.documentElement.classList.contains('dark');
    document.querySelectorAll('.icon-sun').forEach(function (element) {
      element.style.display = isDark ? 'block' : 'none';
    });
    document.querySelectorAll('.icon-moon').forEach(function (element) {
      element.style.display = isDark ? 'none' : 'block';
    });
    themeToggleBtns.forEach(function (button) {
      button.setAttribute('aria-label', isDark ? 'Use light theme' : 'Use dark theme');
      button.setAttribute('aria-pressed', String(isDark));
    });
  }

  function closeMenu(restoreFocus) {
    if (!mobileNav) return;
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    if (restoreFocus && hamburger) hamburger.focus();
  }

  themeToggleBtns.forEach(function (button) {
    button.addEventListener('click', function () {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeIcons();
    });
  });
  updateThemeIcons();

  if (hamburger && mobileNav) {
    if (!mobileNav.id) mobileNav.id = 'mobile-navigation';
    hamburger.setAttribute('aria-label', 'Open navigation menu');
    hamburger.setAttribute('aria-controls', mobileNav.id);
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
    hamburger.addEventListener('click', function () {
      mobileNav.classList.add('open');
      mobileNav.setAttribute('aria-hidden', 'false');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      const firstLink = mobileNav.querySelector('a');
      if (firstLink) firstLink.focus();
    });
  }

  if (mobileClose) {
    mobileClose.setAttribute('aria-label', 'Close navigation menu');
    mobileClose.addEventListener('click', function () { closeMenu(true); });
  }

  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { closeMenu(false); });
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && mobileNav && mobileNav.classList.contains('open')) closeMenu(true);
  });

  const scrollBtn = document.querySelector('.scroll-top-btn');
  if (scrollBtn) {
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    window.addEventListener('scroll', function () {
      scrollBtn.classList.toggle('visible', window.scrollY > 400);
    });
    scrollBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const currentPath = window.location.pathname.replace(/\/index\.html$/, '/');
  document.querySelectorAll('.desktop-nav a, .mobile-nav-links a').forEach(function (link) {
    const href = link.getAttribute('href') || '';
    const page = href.split('/').filter(Boolean).pop() || '';
    const pathPage = currentPath.split('/').filter(Boolean).pop() || '';
    if ((href === 'index.html' && (currentPath === '/' || currentPath.endsWith('index.html'))) || (page && pathPage && page === pathPage)) link.classList.add('active');
  });

  const searchBox = document.querySelector('.search-box');
  if (searchBox) {
    if (!searchBox.getAttribute('aria-label')) searchBox.setAttribute('aria-label', 'Search posts');
    searchBox.addEventListener('input', function () {
      const query = searchBox.value.toLowerCase().trim();
      document.querySelectorAll('.post-item[data-title]').forEach(function (item) {
        const title = (item.getAttribute('data-title') || '').toLowerCase();
        const tags = (item.getAttribute('data-tags') || '').toLowerCase();
        const summary = (item.getAttribute('data-summary') || '').toLowerCase();
        item.style.display = !query || title.includes(query) || tags.includes(query) || summary.includes(query) ? '' : 'none';
      });
    });
  }

  document.querySelectorAll('pre').forEach(function (pre) {
    const button = document.createElement('button');
    button.textContent = 'Copy';
    button.setAttribute('aria-label', 'Copy code');
    button.className = 'copy-code-btn';
    pre.style.position = 'relative';
    pre.appendChild(button);
    button.addEventListener('click', function () {
      const code = pre.querySelector('code') ? pre.querySelector('code').textContent : pre.textContent;
      navigator.clipboard.writeText(code).then(function () {
        button.textContent = 'Copied!';
        setTimeout(function () { button.textContent = 'Copy'; }, 2000);
      });
    });
  });
});
