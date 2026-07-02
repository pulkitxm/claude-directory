/* AI Tool - Main JavaScript */
/* Shared across all pages */

(function() {
  'use strict';

  // ============================================================
  // MOBILE HAMBURGER MENU
  // ============================================================
  function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileSubmenuToggles = document.querySelectorAll('.mobile-submenu-toggle');

    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close when clicking a non-toggle link
    mobileMenu.querySelectorAll('a:not(.mobile-submenu-toggle)').forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Mobile submenus
    mobileSubmenuToggles.forEach(function(toggle) {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        const parent = this.closest('.mobile-nav-item');
        const submenu = parent ? parent.querySelector('.mobile-submenu') : null;
        const arrow = this.querySelector('.mobile-arrow');
        if (submenu) {
          submenu.classList.toggle('open');
          if (arrow) arrow.style.transform = submenu.classList.contains('open') ? 'rotate(180deg)' : '';
        }
      });
    });
  }

  // ============================================================
  // STICKY HEADER
  // ============================================================
  function initStickyHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    function updateHeader() {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }

  // ============================================================
  // BOX HOVER MOUSE TRACKING
  // ============================================================
  function initBoxHover() {
    const cards = document.querySelectorAll('.box-hover');

    cards.forEach(function(card) {
      card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', x + 'px');
        card.style.setProperty('--mouse-y', y + 'px');
      });
    });
  }

  // ============================================================
  // SCROLL REVEAL
  // ============================================================
  function initScrollReveal() {
    // Elements are already visible by default (opacity:1 in CSS).
    // We just add the .visible class for semantic completeness,
    // allowing future enhancements to apply on-scroll entrance effects.
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });

      elements.forEach(function(el) {
        observer.observe(el);
      });
    } else {
      elements.forEach(function(el) { el.classList.add('visible'); });
    }
  }

  // ============================================================
  // FAQ ACCORDION
  // ============================================================
  function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(function(item) {
      const question = item.querySelector('.faq-question');
      if (!question) return;

      question.addEventListener('click', function() {
        const isOpen = item.classList.contains('open');
        // Close all others
        faqItems.forEach(function(other) {
          other.classList.remove('open');
        });
        // Toggle current
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    });
  }

  // ============================================================
  // TESTIMONIAL MARQUEE
  // ============================================================
  function initMarquee() {
    // The CSS animation handles the marquee; this just sets up
    // duplicate content for seamless looping if needed.
    const tracks = document.querySelectorAll('.marquee-track');
    tracks.forEach(function(track) {
      // Duplicate children for seamless loop
      const children = Array.from(track.children);
      children.forEach(function(child) {
        const clone = child.cloneNode(true);
        track.appendChild(clone);
      });
    });
  }

  // ============================================================
  // COPY BUTTON
  // ============================================================
  function initCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        const output = document.querySelector('.ai-output-text');
        const text = output ? output.textContent : '';
        if (text && navigator.clipboard) {
          navigator.clipboard.writeText(text).then(function() {
            btn.textContent = 'Copied!';
            setTimeout(function() { btn.textContent = 'Copy'; }, 2000);
          });
        }
      });
    });
  }

  // ============================================================
  // SMOOTH ANCHOR LINKS
  // ============================================================
  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(function(link) {
      link.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ============================================================
  // NEWSLETTER FORM
  // ============================================================
  function initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input) input.value = '';
    });
  }

  // ============================================================
  // CONTACT FORM
  // ============================================================
  function initContactForm() {
    const form = document.querySelector('.contact-form-el');
    if (!form) return;
    form.addEventListener('submit', function(e) {
      e.preventDefault();
    });
  }

  // ============================================================
  // GENERATE BUTTON (AI tools)
  // ============================================================
  function initGenerateButtons() {
    document.querySelectorAll('.generate-btn').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const output = document.querySelector('.ai-output-text');
        const placeholder = document.querySelector('.ai-output-placeholder');
        if (output) {
          output.textContent = 'This is a demonstration. In the real application, this would call the OpenAI API and display generated content based on your inputs. Add your OpenAI API key in .env to enable real generation.';
        }
        if (placeholder) {
          placeholder.textContent = 'This is a demonstration. In the real application, this would call the OpenAI API and display generated content based on your inputs.';
        }
      });
    });
  }

  // ============================================================
  // INIT ALL
  // ============================================================
  document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initStickyHeader();
    initBoxHover();
    initScrollReveal();
    initFAQ();
    initMarquee();
    initCopyButtons();
    initSmoothAnchors();
    initNewsletterForm();
    initContactForm();
    initGenerateButtons();
  });

})();
