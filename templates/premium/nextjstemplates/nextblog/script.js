// NextBlog - Shared JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // ===================== HEADER SCROLL =====================
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // ===================== MOBILE MENU =====================
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('open');
      navToggle.classList.toggle('active');

      // Toggle hamburger to X
      const spans = navToggle.querySelectorAll('span');
      if (navToggle.classList.contains('active')) {
        if (spans[0]) spans[0].style.transform = 'rotate(45deg) translate(4px, 5px)';
        if (spans[1]) spans[1].style.opacity = '0';
        if (spans[2]) spans[2].style.transform = 'rotate(-45deg) translate(4px, -5px)';
      } else {
        spans.forEach(s => {
          s.style.transform = '';
          s.style.opacity = '';
        });
      }
    });
  }

  // ===================== MOBILE DROPDOWN =====================
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    const dropdown = item.querySelector('.nav-dropdown');

    if (link && dropdown) {
      link.addEventListener('click', function(e) {
        if (window.innerWidth < 1024) {
          e.preventDefault();
          item.classList.toggle('open');
        }
      });
    }
  });

  // ===================== NEWSLETTER FORM =====================
  const newsletterForm = document.querySelector('.newsletter-form form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      if (input && input.value) {
        // Show success message
        const wrap = newsletterForm.querySelector('.newsletter-input-wrap');
        if (wrap) {
          wrap.innerHTML = '<p style="color: var(--green); font-weight: 500;">Thank you for subscribing!</p>';
        }
      }
    });
  }

  // ===================== AUTH FORMS =====================
  const authForms = document.querySelectorAll('.auth-card form');
  authForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
    });
  });

  // ===================== SEARCH FORM =====================
  const searchForm = document.querySelector('.search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
    });
  }

  // ===================== ACTIVE NAV LINK =====================
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPath || (href === '/' && currentPath === ''))) {
      link.style.color = 'var(--dark)';
      link.style.fontWeight = '600';
    }
  });
});
