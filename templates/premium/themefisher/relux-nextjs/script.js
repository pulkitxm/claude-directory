/* ============================================================
   RELUX — Shared JS (nav, reveal, testimonial slider, etc.)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initStickyHeader();
  initTestimonialSlider();
  initGalleryLightbox();
  initBackToTop();
  initMobileNav();
  setActiveNavLink();
});

/* --- Sticky header on scroll --- */
function initStickyHeader() {
  const header = document.querySelector('.header');
  if (!header) return;
  const onScroll = () => {
    if (window.scrollY > 60) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --- Close mobile nav on link click --- */
function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  if (!toggle) return;
  document.querySelectorAll('.mobile-nav a').forEach(a => {
    a.addEventListener('click', () => { toggle.checked = false; });
  });
}

/* --- Set active link in nav --- */
function setActiveNavLink() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-link, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    // Match exact or prefix (e.g. /rooms for /rooms/deluxe-suite)
    const base = href.split('/')[1];
    const pagePart = path.split('/')[1];
    if (href === path || (base && pagePart && base === pagePart && base !== '')) {
      a.classList.add('active');
    }
    if (href === '/' && path === '/') a.classList.add('active');
  });
}

/* --- Scroll reveal --- */
function initScrollReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => observer.observe(el));
}

/* --- Testimonial / image slider --- */
function initTestimonialSlider() {
  document.querySelectorAll('.slider-wrap').forEach(wrap => {
    const track = wrap.querySelector('.slider-track');
    const slides = wrap.querySelectorAll('.slider-slide');
    const prevBtn = wrap.querySelector('.slider-prev');
    const nextBtn = wrap.querySelector('.slider-next');
    if (!track || !slides.length) return;

    let current = 0;
    const visible = () => window.innerWidth >= 1024 ? 2 : 1;

    function update() {
      const pct = 100 / visible();
      const gap = window.innerWidth >= 1024 ? 24 : 0;
      track.style.transform = `translateX(calc(-${current * pct}% - ${current * gap}px))`;
      if (prevBtn) prevBtn.disabled = current === 0;
      if (nextBtn) nextBtn.disabled = current >= slides.length - visible();
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (current > 0) { current--; update(); }
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (current < slides.length - visible()) { current++; update(); }
      });
    }

    window.addEventListener('resize', update, { passive: true });
    update();
  });
}

/* --- Gallery lightbox --- */
function initGalleryLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  const img = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.lightbox-close');

  document.querySelectorAll('[data-lightbox]').forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => {
      img.src = el.dataset.lightbox || el.src || el.querySelector('img')?.src || '';
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLB = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };
  if (closeBtn) closeBtn.addEventListener('click', closeLB);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLB(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLB(); });
}

/* --- Back to top --- */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
