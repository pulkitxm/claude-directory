document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('#nav-toggle');
  const navMenu = document.querySelector('#nav-menu');
  const showButton = document.querySelector('#show-button');
  const hideButton = document.querySelector('#hide-button');

  if (navToggle && navMenu) {
    navToggle.addEventListener('change', () => {
      navMenu.classList.toggle('hidden', !navToggle.checked);
      showButton?.classList.toggle('hidden', navToggle.checked);
      hideButton?.classList.toggle('hidden', !navToggle.checked);
    });
  }

  const solutionLabels = ['Startups & Founders', 'Enterprise Teams', 'Small Businesses', 'CFOs & Accountants'];
  const solutionButtons = solutionLabels.map(label => [...document.querySelectorAll('button')].find(button => button.textContent.trim() === label));
  const solutionList = solutionButtons[0]?.closest('ul');
  let solutionPanel = solutionList?.nextElementSibling;

  solutionButtons.forEach((button, index) => {
    button?.addEventListener('click', () => {
      if (!solutionPanel || !window.finproxSolutionPanels?.[index]) return;
      solutionButtons.forEach((item, itemIndex) => {
        item?.classList.toggle('bg-light', itemIndex === index);
        item?.classList.toggle('border-border', itemIndex === index);
        item?.classList.toggle('border-transparent', itemIndex !== index);
      });
      solutionPanel.outerHTML = window.finproxSolutionPanels[index];
      solutionPanel = solutionList.nextElementSibling;
    });
  });

  const pricingTabs = document.querySelectorAll('[role="tablist"] [role="tab"]');
  const pricingMarker = document.querySelector('[role="tablist"] span[aria-hidden="true"]');
  const setPricing = index => {
    pricingTabs.forEach((tab, tabIndex) => {
      const active = tabIndex === index;
      tab.setAttribute('aria-selected', String(active));
      tab.classList.toggle('text-text-light', active);
      tab.classList.toggle('text-text-dark', !active);
    });
    document.querySelectorAll('[data-price-tag-monthly]').forEach(price => {
      price.classList.toggle('active', index === 0);
      price.classList.toggle('inactive', index !== 0);
    });
    document.querySelectorAll('[data-price-tag-yearly]').forEach(price => {
      price.classList.toggle('active', index === 1);
      price.classList.toggle('inactive', index !== 1);
    });
    if (pricingMarker && pricingTabs[index]) {
      pricingMarker.style.width = `${pricingTabs[index].offsetWidth}px`;
      pricingMarker.style.transform = `translateX(${pricingTabs[index].offsetLeft}px)`;
    }
  };

  pricingTabs.forEach((tab, index) => tab.addEventListener('click', () => setPricing(index)));

  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => header.closest('.accordion')?.classList.toggle('active'));
  });

  document.querySelectorAll('.tab').forEach(tab => {
    const tabs = [...tab.querySelectorAll('.tab-nav-item')];
    const panels = [...tab.querySelectorAll('.tab-content')];
    tabs.forEach((item, index) => {
      const activate = () => {
        tabs.forEach((next, nextIndex) => {
          next.classList.toggle('active', nextIndex === index);
          next.tabIndex = nextIndex === index ? 0 : -1;
        });
        panels.forEach((panel, panelIndex) => {
          panel.classList.toggle('block', panelIndex === index);
          panel.classList.toggle('hidden', panelIndex !== index);
        });
      };
      item.addEventListener('click', activate);
      item.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') activate();
      });
    });
  });

  const faqHeading = [...document.querySelectorAll('h2')].find(heading => heading.textContent.includes('Your questions'));
  const faqSection = faqHeading?.closest('section');
  faqSection?.querySelectorAll('h3').forEach(heading => {
    const trigger = heading.parentElement;
    const content = trigger?.nextElementSibling;
    trigger?.addEventListener('click', () => {
      const open = content.style.maxHeight !== '0px';
      content.style.maxHeight = open ? '0px' : `${content.scrollHeight}px`;
      content.style.marginTop = open ? '0px' : '16px';
      trigger.lastElementChild?.classList.toggle('rotate-45', !open);
    });
  });

  const loadMore = [...document.querySelectorAll('button')].find(button => button.textContent.trim() === 'Load More');
  loadMore?.addEventListener('click', () => {
    const container = loadMore.parentElement?.firstElementChild;
    if (container && window.finproxExtraIntegration) container.insertAdjacentHTML('beforeend', window.finproxExtraIntegration);
    loadMore.remove();
  });

  document.querySelectorAll('.testimonial-button-next').forEach(next => {
    const section = next.closest('section');
    const previous = section?.querySelector('.testimonial-button-prev');
    const wrapper = section?.querySelector('.swiper-wrapper');
    const slides = wrapper ? [...wrapper.querySelectorAll('.swiper-slide')] : [];
    let index = 0;
    const move = direction => {
      if (!wrapper || !slides.length) return;
      index = (index + direction + slides.length) % slides.length;
      const gap = Number.parseFloat(getComputedStyle(slides[0]).marginRight) || 24;
      wrapper.style.transitionDuration = '500ms';
      wrapper.style.transform = `translate3d(-${index * (slides[0].getBoundingClientRect().width + gap)}px, 0, 0)`;
    };
    next.addEventListener('click', () => move(1));
    previous?.addEventListener('click', () => move(-1));
  });

  const sizeTestimonials = () => {
    if (window.innerWidth >= 1024) return;
    document.querySelectorAll('.swiper').forEach(swiper => {
      swiper.querySelectorAll('.swiper-slide').forEach(slide => {
        slide.style.width = `${swiper.clientWidth}px`;
      });
    });
  };

  sizeTestimonials();
  window.addEventListener('resize', sizeTestimonials);

  document.querySelectorAll('lite-youtube').forEach(player => {
    player.style.display = 'block';
    player.style.position = 'relative';
    player.style.aspectRatio = '16 / 9';
    player.style.background = `center / cover no-repeat url("https://i.ytimg.com/vi/${player.getAttribute('videoid')}/maxresdefault.jpg")`;
    const play = document.createElement('button');
    play.type = 'button';
    play.setAttribute('aria-label', player.getAttribute('title') || 'Play video');
    play.style.cssText = 'position:absolute;left:50%;top:50%;width:68px;height:48px;transform:translate(-50%,-50%);border:0;border-radius:12px;background:#ff0000;color:#ffffff;font-size:24px;cursor:pointer';
    const playIcon = document.createElement('span');
    playIcon.style.cssText = 'display:block;width:0;height:0;margin:auto;border-top:11px solid transparent;border-bottom:11px solid transparent;border-left:19px solid #ffffff';
    play.append(playIcon);
    play.addEventListener('click', () => {
      const frame = document.createElement('iframe');
      frame.title = player.getAttribute('videotitle') || 'Video';
      frame.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
      frame.allowFullscreen = true;
      frame.src = `https://www.youtube.com/embed/${player.getAttribute('videoid')}?autoplay=1`;
      frame.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:0';
      player.replaceChildren(frame);
    });
    player.append(play);
  });
});
