/* Shared header + footer injection for Andromeda clone */
(function() {
  const NAV_LINKS = [
    { href: 'index.html', text: 'Home' },
    { href: 'about.html', text: 'About' },
    { href: 'how-it-works.html', text: 'How It Works' },
    { href: 'blog.html', text: 'Blog' },
  ];
  const DROPDOWN_LINKS = [
    { href: 'careers.html', text: 'Careers' },
    { href: 'case-studies.html', text: 'Case Studies' },
    { href: 'pricing.html', text: 'Pricing' },
    { href: 'signin.html', text: 'Sign In' },
    { href: 'elements.html', text: 'Elements' },
    { href: 'changelog.html', text: 'Changelog' },
    { href: 'terms-and-conditions.html', text: 'Terms And Conditions' },
  ];

  function currentPage() {
    return window.location.pathname.split('/').pop() || 'index.html';
  }
  function isActive(href) {
    const cur = currentPage();
    return cur === href || (cur === '' && href === 'index.html');
  }

  function injectHeader() {
    const placeholder = document.getElementById('header-placeholder');
    if (!placeholder) return;

    const navItems = NAV_LINKS.map(l =>
      `<li><a class="nav-link${isActive(l.href)?' active':''}" href="${l.href}">${l.text}</a></li>`
    ).join('');
    const dropItems = DROPDOWN_LINKS.map(l =>
      `<li class="nav-dropdown-item"><a href="${l.href}"${isActive(l.href)?' class="active"':''}>${l.text}</a></li>`
    ).join('');
    const pagesActive = DROPDOWN_LINKS.some(l => isActive(l.href));

    placeholder.outerHTML = `
    <header class="header" id="header">
      <nav class="navbar container">
        <a class="navbar-brand" href="index.html">
          <img src="assets/images/logo.png" alt="Andromeda" style="height:36px;width:auto">
        </a>
        <button class="hamburger-btn" id="hamburger" aria-label="Toggle menu">
          <svg viewBox="0 0 20 20" fill="currentColor" width="24" height="24"><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
        <ul class="nav-menu" id="nav-menu">
          ${navItems}
          <li class="nav-dropdown${pagesActive?' open':''}" id="pages-dropdown">
            <span${pagesActive?' style="color:var(--primary)"':''}>Pages
              <svg viewBox="0 0 20 20" style="width:1rem;height:1rem;fill:currentColor;vertical-align:middle"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </span>
            <ul class="nav-dropdown-list">${dropItems}</ul>
          </li>
          <li><a class="nav-link${isActive('contact.html')?' active':''}" href="contact.html">Contact</a></li>
          <li class="nav-cta-mobile"><a class="btn btn-primary" href="signup.html">Sign Up Now</a></li>
        </ul>
        <div class="nav-cta-desktop"><a class="btn btn-primary" href="signup.html">Sign Up Now</a></div>
      </nav>
    </header>`;
  }

  function injectFooter() {
    const placeholder = document.getElementById('footer-placeholder');
    if (!placeholder) return;
    placeholder.outerHTML = `
    <footer class="footer">
      <div class="container footer-top">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="index.html"><img src="assets/images/logo.png" alt="Andromeda" style="height:36px;width:auto"></a>
            <p class="mt-2">Lorem ipsum dolor sit sed dmi amet, consectetur adipiscing. Cdo tellus, sed condimentum volutpat.</p>
          </div>
          <div class="footer-col">
            <h5>Socials</h5>
            <p class="footer-email">Info@andromeda.io</p>
            <ul class="social-icons">
              <li><a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a></li>
              <li><a href="#" aria-label="Twitter"><svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg></a></li>
              <li><a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg></a></li>
              <li><a href="#" aria-label="Pinterest"><svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg></a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h5>Quick Links</h5>
            <ul>
              <li><a href="about.html">About</a></li>
              <li><a href="contact.html">Contact</a></li>
              <li><a href="terms-and-conditions.html">Terms And Conditions</a></li>
              <li><a href="changelog.html">Changelog</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h5>Location &amp; Contact</h5>
            <p style="font-size:0.9rem;color:var(--body-color);margin-bottom:0.75rem">2118 Thornridge Cir. Syracuse,<br>Connecticut 35624</p>
            <p style="font-size:0.9rem;color:var(--body-color)">+704-555-0127</p>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="container">Designed &amp; Developed By <a href="https://themefisher.com" target="_blank" rel="noopener">Themefisher</a></div>
      </div>
    </footer>`;
  }

  function initNav() {
    const header = document.getElementById('header');
    if (!header) return;
    window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 10));
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    if (hamburger && navMenu) {
      hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        const isOpen = navMenu.classList.contains('open');
        hamburger.innerHTML = isOpen
          ? '<svg viewBox="0 0 20 20" fill="currentColor" width="24" height="24"><polygon points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2" transform="rotate(45 10 10)"/></svg>'
          : '<svg viewBox="0 0 20 20" fill="currentColor" width="24" height="24"><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>';
      });
    }
    const pagesDropdown = document.getElementById('pages-dropdown');
    if (pagesDropdown) {
      pagesDropdown.addEventListener('click', e => {
        if (window.innerWidth < 992) {
          e.currentTarget.classList.toggle('open');
          e.stopPropagation();
        }
      });
    }
  }

  function initAOS() {
    const els = document.querySelectorAll('[data-aos]');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          const d = parseInt(en.target.dataset.aosDelay || '0');
          setTimeout(() => en.target.classList.add('aos-animate'), d);
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0, rootMargin: '9999px 0px 9999px 0px' });
    els.forEach(el => obs.observe(el));
  }

  document.addEventListener('DOMContentLoaded', () => {
    injectHeader();
    injectFooter();
    initNav();
    initAOS();
  });
})();
