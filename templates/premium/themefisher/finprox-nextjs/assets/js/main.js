/* =====================================================
   FINPROX — Main JavaScript
   Interactions: nav, tabs, slider, pricing, accordion
   ===================================================== */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* ==================== STICKY HEADER ==================== */
    const header = document.querySelector('.header');
    if (header) {
      function handleScroll() {
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    }

    /* ==================== MOBILE MENU ==================== */
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu   = document.getElementById('mobile-menu');

    if (mobileToggle && mobileMenu) {
      mobileToggle.addEventListener('click', function () {
        this.classList.toggle('open');
        mobileMenu.classList.toggle('open');
      });
    }

    /* Mobile submenu toggle (Pages) */
    const pagesToggle = document.getElementById('mobile-pages-toggle');
    const pagesLinks  = document.getElementById('mobile-pages-links');
    if (pagesToggle && pagesLinks) {
      pagesToggle.addEventListener('click', function () {
        pagesLinks.classList.toggle('open');
      });
    }

    /* Close mobile menu on resize */
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024 && mobileMenu) {
        mobileMenu.classList.remove('open');
        if (mobileToggle) mobileToggle.classList.remove('open');
      }
    });

    /* ==================== TABS ==================== */
    function initTabs(containerSelector) {
      const containers = document.querySelectorAll(containerSelector);
      containers.forEach(function (container) {
        const buttons = container.querySelectorAll('.tab-btn');
        const panels  = container.querySelectorAll('.tab-panel');

        buttons.forEach(function (btn, i) {
          btn.addEventListener('click', function () {
            buttons.forEach(b => b.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            if (panels[i]) panels[i].classList.add('active');
          });
        });

        // Activate first
        if (buttons[0]) buttons[0].classList.add('active');
        if (panels[0])  panels[0].classList.add('active');
      });
    }

    initTabs('.features-tabs-wrapper');
    initTabs('.solutions-tabs-wrapper');

    /* ==================== SOLUTION TABS ==================== */
    const solBtns   = document.querySelectorAll('.solution-tab-btn');
    const solPanels = document.querySelectorAll('.solution-panel');

    solBtns.forEach(function (btn, i) {
      btn.addEventListener('click', function () {
        solBtns.forEach(b => b.classList.remove('active'));
        solPanels.forEach(p => p.classList.remove('active'));
        this.classList.add('active');
        if (solPanels[i]) solPanels[i].classList.add('active');
      });
    });

    if (solBtns[0]) { solBtns[0].classList.add('active'); }
    if (solPanels[0]) { solPanels[0].classList.add('active'); }

    /* ==================== PRICING TOGGLE ==================== */
    const pricingToggle = document.getElementById('pricing-toggle');
    if (pricingToggle) {
      pricingToggle.addEventListener('change', function () {
        if (this.checked) {
          document.body.classList.add('annual-mode');
        } else {
          document.body.classList.remove('annual-mode');
        }
      });
    }

    /* ==================== ACCORDION ==================== */
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(function (header) {
      header.addEventListener('click', function () {
        const item = this.closest('.accordion-item');
        const isOpen = item.classList.contains('open');

        // Close all
        document.querySelectorAll('.accordion-item.open').forEach(function (openItem) {
          openItem.classList.remove('open');
        });

        // Open clicked (if wasn't already open)
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    });

    /* ==================== TESTIMONIALS SLIDER ==================== */
    const track  = document.querySelector('.testimonial-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots   = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');

    if (track && slides.length) {
      let current = 0;
      let autoInterval;

      function getVisible() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 640)  return 2;
        return 1;
      }

      function goTo(idx) {
        const visible  = getVisible();
        const maxIndex = Math.max(0, slides.length - visible);
        current = Math.max(0, Math.min(idx, maxIndex));

        const slideWidth = slides[0].offsetWidth + 24; // 24 = gap
        track.style.transform = `translateX(-${current * slideWidth}px)`;

        dots.forEach(function (dot, i) {
          dot.classList.toggle('active', i === current);
        });
      }

      function next() { goTo(current + 1 >= slides.length - getVisible() + 1 ? 0 : current + 1); }
      function prev() { goTo(current <= 0 ? slides.length - getVisible() : current - 1); }

      if (nextBtn) nextBtn.addEventListener('click', next);
      if (prevBtn) prevBtn.addEventListener('click', prev);

      dots.forEach(function (dot, i) {
        dot.addEventListener('click', function () { goTo(i); });
      });

      function startAuto() {
        autoInterval = setInterval(next, 5000);
      }

      function stopAuto() {
        clearInterval(autoInterval);
      }

      if (track) {
        track.addEventListener('mouseenter', stopAuto);
        track.addEventListener('mouseleave', startAuto);
      }

      startAuto();
      goTo(0);

      window.addEventListener('resize', function () { goTo(current); });
    }

    /* ==================== SCROLL ANIMATIONS ==================== */
    if (typeof IntersectionObserver !== 'undefined') {
      const animEls = document.querySelectorAll('[data-aos]');
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.getAttribute('data-aos-delay') || '0');
            setTimeout(function () {
              entry.target.classList.add('aos-animate');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

      animEls.forEach(function (el) {
        el.style.opacity = '0';
        if (el.getAttribute('data-aos') === 'fade-up') {
          el.style.transform = 'translateY(2rem)';
          el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        } else {
          el.style.transition = 'opacity 0.7s ease';
        }
        observer.observe(el);
      });

      // Listen for the animate class
      const styleEl = document.createElement('style');
      styleEl.textContent = '[data-aos].aos-animate { opacity: 1 !important; transform: none !important; }';
      document.head.appendChild(styleEl);
    }

    /* ==================== COUNTER ANIMATION ==================== */
    const counters = document.querySelectorAll('[data-count]');
    if (counters.length && typeof IntersectionObserver !== 'undefined') {
      const counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const el    = entry.target;
            const target = parseInt(el.getAttribute('data-count'));
            const suffix = el.getAttribute('data-suffix') || '';
            let start = 0;
            const duration = 2000;
            const step = Math.ceil(target / (duration / 16));

            const timer = setInterval(function () {
              start += step;
              if (start >= target) {
                start = target;
                clearInterval(timer);
              }
              el.textContent = start.toLocaleString() + suffix;
            }, 16);

            counterObserver.unobserve(el);
          }
        });
      }, { threshold: 0.5 });

      counters.forEach(function (el) { counterObserver.observe(el); });
    }

    /* ==================== SMOOTH SCROLL ==================== */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#!') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    /* ==================== FEATURES TABS (home page) ==================== */
    const featureBtns   = document.querySelectorAll('.feature-tab-btn');
    const featurePanels = document.querySelectorAll('.feature-tab-panel');

    featureBtns.forEach(function (btn, i) {
      btn.addEventListener('click', function () {
        featureBtns.forEach(b => b.classList.remove('active'));
        featurePanels.forEach(p => p.classList.remove('active'));
        this.classList.add('active');
        if (featurePanels[i]) featurePanels[i].classList.add('active');
      });
    });

    if (featureBtns[0]) featureBtns[0].classList.add('active');
    if (featurePanels[0]) featurePanels[0].classList.add('active');

  }); // end DOMContentLoaded

})();
