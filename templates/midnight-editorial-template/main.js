// ---- Reveal-up on scroll ----
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    }
  }
}, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// ---- Parallax on the full-width gallery image ----
const parallaxEls = [...document.querySelectorAll('[data-parallax]')];
let ticking = false;

function updateParallax() {
  const vh = window.innerHeight;
  for (const el of parallaxEls) {
    const r = el.getBoundingClientRect();
    if (r.bottom < 0 || r.top > vh) continue;
    // progress: -1 (below) .. 1 (above), 0 when centered
    const progress = (r.top + r.height / 2 - vh / 2) / vh;
    const shift = progress * -60; // px, image is scaled 1.2 so edges stay covered
    el.style.transform = `scale(1.2) translate3d(0, ${shift}px, 0)`;
  }
  ticking = false;
}

function onScroll() {
  if (!ticking) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
}

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll, { passive: true });
updateParallax();
