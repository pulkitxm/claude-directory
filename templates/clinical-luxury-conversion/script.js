// ---- scroll reveal ----
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// ---- nav shadow on scroll ----
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 12);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ---- mobile sticky cart reveal after hero ----
const sticky = document.getElementById('stickyCart');
const heroEl = document.querySelector('.hero');
const ctaEl = document.getElementById('cta');
const stickyIO = new IntersectionObserver((entries) => {
  // show when hero is out of view, hide again over the final CTA
  entries.forEach((e) => {
    if (e.target === heroEl) {
      sticky.classList.toggle('show', !e.isIntersecting);
    }
  });
}, { threshold: 0 });
if (heroEl) stickyIO.observe(heroEl);

// ---- countdown ----
const pad = (n) => String(n).padStart(2, '0');
// Fixed 47h window so the timer is always live and dramatic.
const DEADLINE = Date.now() + (47 * 3600 + 12 * 60 + 33) * 1000;
const elD = document.getElementById('cd-d');
const elH = document.getElementById('cd-h');
const elM = document.getElementById('cd-m');
const elS = document.getElementById('cd-s');
function tick() {
  let diff = Math.max(0, DEADLINE - Date.now());
  const d = Math.floor(diff / 86400000); diff -= d * 86400000;
  const h = Math.floor(diff / 3600000); diff -= h * 3600000;
  const m = Math.floor(diff / 60000); diff -= m * 60000;
  const s = Math.floor(diff / 1000);
  elD.textContent = pad(d); elH.textContent = pad(h);
  elM.textContent = pad(m); elS.textContent = pad(s);
}
tick();
setInterval(tick, 1000);
