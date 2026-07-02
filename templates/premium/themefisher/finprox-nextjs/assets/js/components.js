/* =====================================================
   FINPROX — Shared Header & Footer Components
   ===================================================== */

(function () {
  'use strict';

  /* ---- Determine relative path to assets ---- */
  function getBase() {
    // Works whether opened from the root or a subdirectory
    const path = window.location.pathname;
    return ''; // All pages are in the root folder
  }

  const base = getBase();

  /* ==================== HEADER ==================== */
  const headerHTML = `
<header class="header" id="main-header">
  <div class="main-container">
    <nav class="navbar container">
      <!-- Logo -->
      <div class="order-0">
        <a class="navbar-brand" href="index.html">
          <img src="assets/images/logo.png" alt="FinProX" width="160" height="40">
        </a>
      </div>

      <!-- Desktop Nav -->
      <ul class="navbar-nav" id="nav-menu">
        <li class="nav-item">
          <a class="nav-link" href="index.html">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="about.html">About us</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="features.html">Features</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="pricing.html">Pricing</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="contact.html">Contact</a>
        </li>
        <li class="nav-item nav-dropdown">
          <a class="nav-link" href="#" onclick="return false;" style="display:flex;align-items:center;gap:4px;">
            Pages
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </a>
          <ul class="dropdown-menu">
            <li><a href="blog.html">Blog</a></li>
            <li><a href="blog-single.html">Blog Details</a></li>
            <li><a href="case-studies.html">Case Studies</a></li>
            <li><a href="case-study-single.html">Case Study Details</a></li>
            <li><a href="careers.html">Careers</a></li>
            <li><a href="careers-single.html">Career Details</a></li>
            <li><a href="changelog.html">Changelog</a></li>
            <li><a href="integrations.html">Integrations</a></li>
            <li><a href="signin.html">Sign In</a></li>
            <li><a href="signup.html">Sign Up</a></li>
            <li><a href="elements.html">Elements</a></li>
            <li><a href="404.html">404 Page</a></li>
          </ul>
        </li>
      </ul>

      <!-- CTA + Mobile Toggle -->
      <div class="nav-actions">
        <a href="signin.html" class="btn btn-ghost" style="display:none;" id="nav-signin">Sign In</a>
        <a href="signup.html" class="btn btn-primary" id="nav-signup">Get Started</a>
        <button class="mobile-toggle" id="mobile-toggle" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  </div>

  <!-- Mobile Menu -->
  <div class="mobile-menu" id="mobile-menu">
    <a class="nav-link" href="index.html">Home</a>
    <a class="nav-link" href="about.html">About us</a>
    <a class="nav-link" href="features.html">Features</a>
    <a class="nav-link" href="pricing.html">Pricing</a>
    <a class="nav-link" href="contact.html">Contact</a>
    <div>
      <div class="mobile-submenu-toggle" id="mobile-pages-toggle">
        Pages
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div>
      <div class="mobile-submenu-links" id="mobile-pages-links">
        <a class="nav-link" href="blog.html">Blog</a>
        <a class="nav-link" href="blog-single.html">Blog Details</a>
        <a class="nav-link" href="case-studies.html">Case Studies</a>
        <a class="nav-link" href="case-study-single.html">Case Study Details</a>
        <a class="nav-link" href="careers.html">Careers</a>
        <a class="nav-link" href="careers-single.html">Career Details</a>
        <a class="nav-link" href="changelog.html">Changelog</a>
        <a class="nav-link" href="integrations.html">Integrations</a>
        <a class="nav-link" href="signin.html">Sign In</a>
        <a class="nav-link" href="signup.html">Sign Up</a>
        <a class="nav-link" href="elements.html">Elements</a>
        <a class="nav-link" href="404.html">404 Page</a>
      </div>
    </div>
    <div style="display:flex;gap:0.75rem;margin-top:1.25rem;">
      <a href="signin.html" class="btn btn-ghost btn-sm">Sign In</a>
      <a href="signup.html" class="btn btn-primary btn-sm">Get Started</a>
    </div>
  </div>
</header>`;

  /* ==================== FOOTER ==================== */
  const footerHTML = `
<footer>
  <div class="footer-inner">
    <div class="container">
      <div class="footer-body">
        <div class="footer-grid">
          <!-- Brand col -->
          <div class="footer-brand">
            <a href="index.html" class="navbar-brand">
              <img src="assets/images/logo.png" alt="FinProX" width="160" height="40">
            </a>
            <p>Smart financial management for modern businesses.</p>
            <a href="mailto:finprox@gmail.com" class="footer-email">
              finprox@gmail.com
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path></svg>
            </a>
          </div>
          <!-- Nav cols -->
          <div class="footer-nav-grid">
            <div class="footer-nav-col">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="pricing.html">Pricing</a></li>
                <li><a href="integrations.html">Integration</a></li>
              </ul>
            </div>
            <div class="footer-nav-col">
              <h3>Company</h3>
              <ul>
                <li><a href="about.html">About</a></li>
                <li><a href="blog.html">Blog</a></li>
                <li><a href="careers.html">Careers</a></li>
                <li><a href="contact.html">Contact</a></li>
              </ul>
            </div>
            <div class="footer-nav-col">
              <h3>Legal</h3>
              <ul>
                <li><a href="privacy-policy.html">Privacy Policy</a></li>
                <li><a href="terms-of-service.html">Terms of Service</a></li>
              </ul>
            </div>
            <div class="footer-nav-col">
              <h3>Follow Us</h3>
              <div class="social-links" style="margin-top:0.5rem;">
                <a href="https://www.facebook.com/" target="_blank" rel="noopener" class="social-icon" title="Facebook">
                  <svg fill="currentColor" viewBox="0 0 24 24" width="18" height="18"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://x.com/" target="_blank" rel="noopener" class="social-icon" title="X (Twitter)">
                  <svg fill="currentColor" viewBox="0 0 24 24" width="18" height="18"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://www.github.com/" target="_blank" rel="noopener" class="social-icon" title="GitHub">
                  <svg fill="currentColor" viewBox="0 0 24 24" width="18" height="18"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href="https://themefisher.com/" target="_blank" rel="noopener" class="social-icon" title="Themefisher">
                  <svg fill="currentColor" viewBox="0 0 24 24" width="18" height="18"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.77 1.52V6.78a4.85 4.85 0 0 1-1-.09z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom bar -->
        <div class="footer-bottom">
          <p>© ${new Date().getFullYear()} FinProX. All rights reserved.</p>
          <p>Designed by <a href="https://themefisher.com/" target="_blank" rel="noopener" style="color:var(--color-primary);">Themefisher</a></p>
        </div>
      </div>
    </div>
  </div>
</footer>`;

  /* ==================== INJECT ==================== */
  function inject() {
    const headerEl = document.getElementById('site-header');
    if (headerEl) headerEl.innerHTML = headerHTML;

    const footerEl = document.getElementById('site-footer');
    if (footerEl) footerEl.innerHTML = footerHTML;

    // Set active nav link based on current page
    setActiveNav();

    // Show sign in button on desktop
    const signinBtn = document.getElementById('nav-signin');
    if (signinBtn) signinBtn.style.display = 'inline-flex';
  }

  function setActiveNav() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href !== '#' && (page === href || (page === '' && href === 'index.html'))) {
        link.classList.add('active');
      }
    });
  }

  /* Run when DOM is ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

})();
