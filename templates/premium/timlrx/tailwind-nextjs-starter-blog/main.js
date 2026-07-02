/* =========================================================
   Tailwind Next.js Starter Blog — Shared JS
   ========================================================= */

// ── Theme (dark/light) ──────────────────────────────────
(function () {
  // No-flash boot: apply theme before paint
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = stored === 'dark' || (!stored && prefersDark);
  if (isDark) document.documentElement.classList.add('dark');
})();

document.addEventListener('DOMContentLoaded', function () {
  // ── Theme toggle ─────────────────────────────────────
  const themeToggleBtns = document.querySelectorAll('[data-theme-toggle]');
  themeToggleBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      // Update icon visibility
      updateThemeIcons();
    });
  });

  function updateThemeIcons() {
    const isDark = document.documentElement.classList.contains('dark');
    document.querySelectorAll('.icon-sun').forEach(function (el) {
      el.style.display = isDark ? 'block' : 'none';
    });
    document.querySelectorAll('.icon-moon').forEach(function (el) {
      el.style.display = isDark ? 'none' : 'block';
    });
  }

  // Initial icon state
  updateThemeIcons();

  // ── Mobile navigation ────────────────────────────────
  const hamburger = document.querySelector('[data-hamburger]');
  const mobileNav = document.querySelector('[data-mobile-nav]');
  const mobileClose = document.querySelector('[data-mobile-close]');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (mobileClose && mobileNav) {
    mobileClose.addEventListener('click', function () {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // Close mobile nav on link click
  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Scroll to top ────────────────────────────────────
  const scrollBtn = document.querySelector('.scroll-top-btn');
  if (scrollBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    });

    scrollBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Active nav link ──────────────────────────────────
  const currentPath = window.location.pathname.replace(/\/index\.html$/, '/');
  document.querySelectorAll('.desktop-nav a, .mobile-nav-links a').forEach(function (link) {
    const href = link.getAttribute('href') || '';
    const page = href.split('/').filter(Boolean).pop() || '';
    const pathPage = currentPath.split('/').filter(Boolean).pop() || '';
    if (
      (href === 'index.html' && (currentPath === '/' || currentPath.endsWith('index.html'))) ||
      (page && pathPage && page === pathPage)
    ) {
      link.classList.add('active');
    }
  });

  // ── Blog search filter ───────────────────────────────
  const searchBox = document.querySelector('.search-box');
  if (searchBox) {
    searchBox.addEventListener('input', function () {
      const q = searchBox.value.toLowerCase().trim();
      document.querySelectorAll('.post-item[data-title]').forEach(function (item) {
        const title = (item.getAttribute('data-title') || '').toLowerCase();
        const tags = (item.getAttribute('data-tags') || '').toLowerCase();
        const summary = (item.getAttribute('data-summary') || '').toLowerCase();
        const match = !q || title.includes(q) || tags.includes(q) || summary.includes(q);
        item.style.display = match ? '' : 'none';
      });
    });
  }

  // ── Copy code blocks ─────────────────────────────────
  document.querySelectorAll('pre').forEach(function (pre) {
    const btn = document.createElement('button');
    btn.textContent = 'Copy';
    btn.style.cssText = 'position:absolute;top:0.5rem;right:0.5rem;font-size:0.75rem;padding:0.25rem 0.5rem;border-radius:0.25rem;background:#334155;color:#e2e8f0;cursor:pointer;border:none;font-family:inherit;opacity:0;transition:opacity 0.2s';
    pre.style.position = 'relative';
    pre.appendChild(btn);

    pre.addEventListener('mouseenter', function () { btn.style.opacity = '1'; });
    pre.addEventListener('mouseleave', function () { btn.style.opacity = '0'; });

    btn.addEventListener('click', function () {
      const code = pre.querySelector('code') ? pre.querySelector('code').textContent : pre.textContent;
      navigator.clipboard.writeText(code).then(function () {
        btn.textContent = 'Copied!';
        setTimeout(function () { btn.textContent = 'Copy'; }, 2000);
      });
    });
  });
});
