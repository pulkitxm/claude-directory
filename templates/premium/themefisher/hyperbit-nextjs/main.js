/* ================================================================
   HYPERBIT — SHARED JAVASCRIPT
   ================================================================ */

// ── Smooth scroll with Lenis ──────────────────────────────────
if (typeof Lenis !== 'undefined') {
  const lenis = new Lenis({ lerp: 0.08, smooth: true });
  function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);
}

// ── Sticky header ─────────────────────────────────────────────
const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 80);
  });
}

// ── Scroll reveal ─────────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px 50px 0px' });
  revealEls.forEach(el => observer.observe(el));
  // Fallback: reveal any elements still hidden after 300ms (e.g. above-fold on load)
  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 200) el.classList.add('visible');
    });
  }, 300);
}

// ── Mobile nav ────────────────────────────────────────────────
const mobileMenuToggle = document.querySelector('#mobile-menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
if (mobileMenuToggle && mobileMenu) {
  mobileMenuToggle.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    mobileMenuToggle.setAttribute('aria-expanded', open);
  });
}

// ── Accordion FAQ ─────────────────────────────────────────────
document.querySelectorAll('.accordion-header').forEach(btn => {
  btn.addEventListener('click', () => {
    const acc = btn.closest('.accordion');
    const isOpen = acc.classList.contains('open');
    document.querySelectorAll('.accordion').forEach(a => a.classList.remove('open'));
    if (!isOpen) acc.classList.add('open');
  });
});

// ── Testimonials carousel ─────────────────────────────────────
(function () {
  const track = document.querySelector('.testimonials-track');
  if (!track) return;
  const cards = track.querySelectorAll('.testimonial-card');
  if (!cards.length) return;
  let current = 0;
  const total = cards.length;
  let interval;

  function goto(n) {
    current = (n + total) % total;
    // Simple scroll-based carousel
    const cardWidth = cards[0].getBoundingClientRect().width + 24; // gap
    track.style.transform = `translateX(-${current * cardWidth}px)`;
    track.style.transition = 'transform 0.5s ease';
  }

  // Auto-play
  function start() { interval = setInterval(() => goto(current + 1), 3500); }
  function stop() { clearInterval(interval); }

  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  if (prevBtn) prevBtn.addEventListener('click', () => { stop(); goto(current - 1); start(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { stop(); goto(current + 1); start(); });

  start();
})();

// ── Active nav link ───────────────────────────────────────────
(function () {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-link[href]').forEach(link => {
    if (link.getAttribute('href') === path || link.getAttribute('href') === path.replace('.html', '')) {
      link.classList.add('active');
    }
  });
})();
