/* ============================================================
   SEOPTIC — SHARED JAVASCRIPT
   ============================================================ */

// ---- MOBILE MENU ----
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const body = document.body;
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', open);
    body.style.overflow = open ? 'hidden' : '';
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      body.style.overflow = '';
    });
  });

  // Mobile dropdown toggle
  document.querySelectorAll('.mobile-dropdown-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const sub = btn.nextElementSibling;
      const icon = btn.querySelector('.dropdown-arrow');
      if (sub) {
        sub.classList.toggle('open');
        if (icon) icon.style.transform = sub.classList.contains('open') ? 'rotate(180deg)' : '';
      }
    });
  });
}

// ---- FAQ ACCORDION ----
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      // Toggle current
      if (!wasOpen) item.classList.add('open');
    });
  });
}

// ---- PRICING TOGGLE ----
function initPricingToggle() {
  const toggle = document.getElementById('billing-toggle');
  if (!toggle) return;
  const monthlyPrices = document.querySelectorAll('.price-monthly');
  const annualPrices = document.querySelectorAll('.price-annual');
  const monthlyLabel = document.querySelector('.toggle-label-monthly');
  const annualLabel = document.querySelector('.toggle-label-annual');

  toggle.addEventListener('change', () => {
    const isAnnual = toggle.checked;
    monthlyPrices.forEach(el => el.classList.toggle('price-tag', true));
    annualPrices.forEach(el => el.classList.toggle('price-tag', true));

    if (isAnnual) {
      monthlyPrices.forEach(el => { el.classList.remove('active'); el.classList.add('inactive'); });
      annualPrices.forEach(el => { el.classList.remove('inactive'); el.classList.add('active'); });
      if (monthlyLabel) monthlyLabel.classList.remove('active');
      if (annualLabel) annualLabel.classList.add('active');
    } else {
      monthlyPrices.forEach(el => { el.classList.add('active'); el.classList.remove('inactive'); });
      annualPrices.forEach(el => { el.classList.add('inactive'); el.classList.remove('active'); });
      if (monthlyLabel) monthlyLabel.classList.add('active');
      if (annualLabel) annualLabel.classList.remove('active');
    }
  });
}

// ---- SOLUTIONS TABS ----
function initSolutionTabs() {
  document.querySelectorAll('.solution-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target;
      document.querySelectorAll('.solution-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.solution-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const content = document.getElementById(target);
      if (content) content.classList.add('active');
    });
  });
}

// ---- AOS SCROLL ANIMATIONS ----
function initAOS() {
  const elements = document.querySelectorAll('[data-aos]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.aosDelay || 0;
        setTimeout(() => {
          entry.target.classList.add('aos-animate');
        }, parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(el => observer.observe(el));
}

// ---- STICKY HEADER ----
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const update = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initFAQ();
  initPricingToggle();
  initSolutionTabs();
  initAOS();
  initStickyHeader();
});
