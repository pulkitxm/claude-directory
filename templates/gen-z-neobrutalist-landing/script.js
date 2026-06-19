// nav blur / shrink on scroll
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 30);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// intersection-observer reveals
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      io.unobserve(e.target);
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
);
document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.animationDelay = `${(i % 4) * 0.08}s`;
  io.observe(el);
});

// animate the mini-dashboard bars when the pink card enters view
const chart = document.querySelector(".chart");
if (chart) {
  const chartIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        chart.querySelectorAll(".bar").forEach((bar, i) => {
          setTimeout(() => bar.classList.add("grow"), i * 90);
        });
        chartIO.disconnect();
      });
    },
    { threshold: 0.4 }
  );
  chartIO.observe(chart);
}

// only one FAQ item open at a time
const items = document.querySelectorAll(".qa");
items.forEach((d) => {
  d.addEventListener("toggle", () => {
    if (d.open) items.forEach((o) => o !== d && (o.open = false));
  });
});
