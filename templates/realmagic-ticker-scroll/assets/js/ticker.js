/* ============================================================
   Real Magic — Horizontal Ticker
   GSAP ScrollTrigger drives a single long flex line sideways.
   The vertical scroll distance == the horizontal travel of the
   line, so it reads like one continuous ticker tape.
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);

const stage = document.getElementById("stage");
const line = document.getElementById("line");
const progressFill = document.querySelector(".progress__fill");

const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ----------------------------------------------------------------
   1. Idle, scroll-independent micro-motion on the inline glyphs so
      the line never feels frozen. These run forever, regardless of
      scroll position, and are intentionally subtle.
---------------------------------------------------------------- */
function startGlyphLoops() {
  if (prefersReduced) return;

  // rising carbonation bubbles
  gsap.utils.toArray(".glyph--bubbles .bub").forEach((bub, i) => {
    gsap.fromTo(
      bub,
      { y: 14, opacity: 0 },
      {
        y: -10,
        opacity: 0.9,
        duration: 2.2 + i * 0.35,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: i * 0.4,
      }
    );
  });

  // ribbon swoosh draws itself on a loop
  const ribbon = document.querySelector(".ribbon-path");
  if (ribbon) {
    const len = ribbon.getTotalLength();
    gsap.set(ribbon, { strokeDasharray: len, strokeDashoffset: len });
    gsap.to(ribbon, {
      strokeDashoffset: 0,
      duration: 2.4,
      ease: "power2.inOut",
      repeat: -1,
      repeatDelay: 1.1,
      yoyo: true,
    });
  }

  // clink spark twinkles
  gsap.fromTo(
    ".glyph--cheers .spark",
    { scale: 0.6, opacity: 0.2, transformOrigin: "60px 12px" },
    { scale: 1.15, opacity: 1, duration: 0.9, ease: "power1.inOut", repeat: -1, yoyo: true }
  );

  // heart heartbeat
  gsap.to(".glyph--heart svg", {
    scale: 1.12,
    duration: 0.6,
    transformOrigin: "center",
    ease: "power1.inOut",
    repeat: -1,
    yoyo: true,
    repeatDelay: 0.7,
  });

  // droplet bob
  gsap.to(".glyph--drop svg", {
    y: 6,
    duration: 1.8,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  });
}

/* ----------------------------------------------------------------
   2. The core horizontal scrub.
      travel = full line width - viewport width (+ a little runway).
      We pin the stage for `travel` pixels of vertical scroll and
      tween line.x from 0 to -travel with scrub. A small parallax
      drift is layered on the accent words for depth.
---------------------------------------------------------------- */
let scrollTween;

function buildScroll() {
  if (scrollTween) {
    scrollTween.scrollTrigger && scrollTween.scrollTrigger.kill();
    scrollTween.kill();
    gsap.set(line, { x: 0 });
  }

  const travel = Math.max(0, line.scrollWidth - window.innerWidth);

  scrollTween = gsap.to(line, {
    x: -travel,
    ease: "none",
    scrollTrigger: {
      trigger: stage,
      start: "top top",
      // 1px of scroll == 1px of horizontal travel feels like real tape.
      // multiplier > 1 makes the read feel longer/slower.
      end: () => "+=" + travel * 1.15,
      pin: true,
      scrub: prefersReduced ? true : 0.6,
      anticipatePin: 1,
      invalidateRefresh: true,
      onUpdate: (self) => {
        if (progressFill) {
          progressFill.style.width = (self.progress * 100).toFixed(2) + "%";
        }
      },
    },
  });

  // subtle depth parallax: accents drift slightly faster than the line
  if (!prefersReduced) {
    gsap.utils.toArray(".accent").forEach((el, i) => {
      gsap.to(el, {
        xPercent: i % 2 === 0 ? -6 : 6,
        ease: "none",
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: () => "+=" + travel * 1.15,
          scrub: 1,
        },
      });
    });
  }
}

/* ----------------------------------------------------------------
   3. Boot: wait for fonts so width measurement is correct, then
      build the scroll. Rebuild on resize via ScrollTrigger refresh.
---------------------------------------------------------------- */
function boot() {
  startGlyphLoops();
  buildScroll();
  ScrollTrigger.refresh();
}

if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(boot);
  // safety net in case fonts.ready never resolves
  setTimeout(() => {
    if (!scrollTween) boot();
  }, 1200);
} else {
  window.addEventListener("load", boot);
}

// Re-measure on resize (widths change → travel changes).
let resizeRAF;
window.addEventListener("resize", () => {
  cancelAnimationFrame(resizeRAF);
  resizeRAF = requestAnimationFrame(() => {
    buildScroll();
    ScrollTrigger.refresh();
  });
});
