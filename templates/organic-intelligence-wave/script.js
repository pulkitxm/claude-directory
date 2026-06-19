// Organic Intelligence — interactions

// --- Scroll reveal + draw-line via IntersectionObserver ---
const io = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  }
}, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

document.querySelectorAll('.reveal, .draw-line').forEach((el) => io.observe(el));

// --- Accordion (single-open, fluid max-height) ---
const items = Array.from(document.querySelectorAll('.acc-item'));

function setPanel(item, open) {
  const panel = item.querySelector('.acc-panel');
  const head = item.querySelector('.acc-head');
  const icon = item.querySelector('.acc-icon');
  if (open) {
    item.classList.add('open');
    head.setAttribute('aria-expanded', 'true');
    icon.textContent = '–'; // en-dash
    panel.style.maxHeight = panel.scrollHeight + 'px';
    panel.style.opacity = '1';
  } else {
    item.classList.remove('open');
    head.setAttribute('aria-expanded', 'false');
    icon.textContent = '+';
    panel.style.maxHeight = '0px';
    panel.style.opacity = '0';
  }
}

items.forEach((item) => {
  const head = item.querySelector('.acc-head');
  head.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    items.forEach((it) => setPanel(it, false));
    if (!isOpen) setPanel(item, true);
  });
});

// Initialise: open the first item (matches markup .open default)
items.forEach((item, i) => setPanel(item, i === 0 && item.classList.contains('open')));

// Re-measure open panel on resize so the fluid height stays correct
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const open = document.querySelector('.acc-item.open .acc-panel');
    if (open) open.style.maxHeight = open.scrollHeight + 'px';
  }, 120);
});
