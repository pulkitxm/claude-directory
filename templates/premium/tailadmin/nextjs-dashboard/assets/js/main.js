// TailAdmin Dashboard - Main JS

(function () {
  'use strict';

  /* ===== DARK MODE ===== */
  const THEME_KEY = 'tailadmin-theme';

  function getTheme() {
    return localStorage.getItem(THEME_KEY) || 'light';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    updateThemeIcon(theme);
  }

  function updateThemeIcon(theme) {
    const btn = document.getElementById('darkModeToggle');
    if (!btn) return;
    const sunIcon = btn.querySelector('.icon-sun');
    const moonIcon = btn.querySelector('.icon-moon');
    if (sunIcon) sunIcon.style.display = theme === 'dark' ? 'none' : 'block';
    if (moonIcon) moonIcon.style.display = theme === 'dark' ? 'block' : 'none';
  }

  function initDarkMode() {
    const theme = getTheme();
    setTheme(theme);

    const btn = document.getElementById('darkModeToggle');
    if (btn) {
      btn.addEventListener('click', function () {
        const current = getTheme();
        setTheme(current === 'dark' ? 'light' : 'dark');
      });
    }
  }

  /* ===== SIDEBAR TOGGLE (DESKTOP) ===== */
  const SIDEBAR_KEY = 'tailadmin-sidebar';

  function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const toggleBtn = document.getElementById('sidebarToggle');

    if (!sidebar) return;

    // Restore state
    const isCollapsed = localStorage.getItem(SIDEBAR_KEY) === 'collapsed';
    if (isCollapsed) {
      sidebar.classList.add('collapsed');
      if (mainContent) mainContent.classList.add('expanded');
    }

    if (toggleBtn) {
      toggleBtn.addEventListener('click', function () {
        sidebar.classList.toggle('collapsed');
        const collapsed = sidebar.classList.contains('collapsed');
        if (mainContent) mainContent.classList.toggle('expanded', collapsed);
        localStorage.setItem(SIDEBAR_KEY, collapsed ? 'collapsed' : 'expanded');
      });
    }
  }

  /* ===== MOBILE SIDEBAR ===== */
  function initMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const mobileToggle = document.getElementById('mobileToggle');

    if (!sidebar) return;

    function openSidebar() {
      sidebar.classList.add('mobile-open');
      if (overlay) overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
      sidebar.classList.remove('mobile-open');
      if (overlay) overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (mobileToggle) mobileToggle.addEventListener('click', openSidebar);
    if (overlay) overlay.addEventListener('click', closeSidebar);

    // Close on resize to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1024) closeSidebar();
    });
  }

  /* ===== NAV ACCORDION ===== */
  function initNavAccordion() {
    const navItems = document.querySelectorAll('.nav-item[data-submenu]');
    navItems.forEach(function (item) {
      const link = item.querySelector('.nav-link');
      if (!link) return;

      link.addEventListener('click', function (e) {
        e.preventDefault();
        const isOpen = item.classList.contains('open');
        // Close all open items
        document.querySelectorAll('.nav-item.open').forEach(function (i) {
          if (i !== item) i.classList.remove('open');
        });
        item.classList.toggle('open', !isOpen);
      });
    });
  }

  /* ===== ACTIVE NAV DETECTION ===== */
  function initActiveNav() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const allLinks = document.querySelectorAll('.nav-link[href], .nav-submenu-link[href]');

    allLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      if (href === currentPath || href === './' + currentPath) {
        link.classList.add('active');
        // Open parent submenu
        const parentItem = link.closest('.nav-item[data-submenu]');
        if (parentItem) parentItem.classList.add('open');
        const parentSubmenu = link.closest('.nav-submenu');
        if (parentSubmenu) {
          const parentNavItem = parentSubmenu.closest('.nav-item');
          if (parentNavItem) parentNavItem.classList.add('open');
        }
      }
    });

    // Default: highlight index.html as active if on root
    if (currentPath === '' || currentPath === 'index.html' || currentPath === '/') {
      const indexLink = document.querySelector('.nav-link[href="index.html"], .nav-submenu-link[href="index.html"]');
      if (indexLink) {
        indexLink.classList.add('active');
        const parentItem = indexLink.closest('.nav-item');
        if (parentItem) parentItem.classList.add('open');
      }
    }
  }

  /* ===== DROPDOWNS ===== */
  function initDropdowns() {
    document.querySelectorAll('.dropdown').forEach(function (dropdown) {
      const toggle = dropdown.querySelector('[data-dropdown-toggle]');
      const menu = dropdown.querySelector('.dropdown-menu');
      if (!toggle || !menu) return;

      toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        menu.classList.toggle('open');
      });
    });

    // Close on outside click
    document.addEventListener('click', function () {
      document.querySelectorAll('.dropdown-menu.open').forEach(function (menu) {
        menu.classList.remove('open');
      });
    });
  }

  /* ===== TOPBAR USER DROPDOWN ===== */
  function initUserDropdown() {
    const userBtn = document.getElementById('userMenuBtn');
    const userMenu = document.getElementById('userMenu');
    if (!userBtn || !userMenu) return;

    userBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      userMenu.classList.toggle('open');
    });

    document.addEventListener('click', function () {
      userMenu.classList.remove('open');
    });
  }

  /* ===== NOTIFICATIONS DROPDOWN ===== */
  function initNotifDropdown() {
    const btn = document.getElementById('notifBtn');
    const menu = document.getElementById('notifMenu');
    if (!btn || !menu) return;

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      menu.classList.toggle('open');
    });

    document.addEventListener('click', function () {
      menu.classList.remove('open');
    });
  }

  /* ===== TABS ===== */
  function initTabs() {
    document.querySelectorAll('.tabs').forEach(function (tabsEl) {
      const tabs = tabsEl.querySelectorAll('.tab[data-tab]');
      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          const target = tab.getAttribute('data-tab');
          tabs.forEach(function (t) { t.classList.remove('active'); });
          tab.classList.add('active');

          const panel = document.getElementById(target);
          if (panel) {
            document.querySelectorAll('.tab-content').forEach(function (c) { c.classList.remove('active'); });
            panel.classList.add('active');
          }
        });
      });
    });
  }

  /* ===== INIT ===== */
  document.addEventListener('DOMContentLoaded', function () {
    initDarkMode();
    initSidebar();
    initMobileSidebar();
    initNavAccordion();
    initActiveNav();
    initDropdowns();
    initUserDropdown();
    initNotifDropdown();
    initTabs();
  });

})();
