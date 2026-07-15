document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.pricing-check').forEach(toggle => {
    toggle.addEventListener('change', () => {
      document.querySelectorAll('.data-count').forEach(price => {
        price.textContent = toggle.checked ? price.dataset.countYearly : price.dataset.countMonthly;
      });
      document.querySelectorAll('.text-monthly').forEach(text => text.classList.toggle('hidden', toggle.checked));
      document.querySelectorAll('.text-yearly').forEach(text => text.classList.toggle('hidden', !toggle.checked));
    });
  });

  const answers = {
    'How secure is my financial data on your platform?': 'We take the security and privacy of your financial data very seriously. Our platform employs industry-standard encryption protocols to safeguard your information during transmission and storage.',
    'Do you offer phone support?': 'Yes, we offer phone support for all customers. Contact us during business hours for assistance.',
    'Can I use my own domain?': 'Yes, you can use your own domain with all plans. Go to your account settings to set up your custom domain.',
    'Do you offer a discount for annual plans?': 'Yes, we offer a 20% discount on all annual plans. Contact us for more information.',
    'Can I change my password?': 'Yes, you can change your password at any time. Go to your account settings to update your password.',
    'Do you offer a free plan?': 'Yes, we offer a free plan with limited features. Upgrade to a paid plan for full access to all features.',
    'Why should you need to do this?': 'Our system continuously monitors for unusual activity. If any suspicious actions are detected, we alert you immediately so that you can take action to protect your account. This proactive approach helps to prevent potential security breaches before they happen',
    'How can I adjust Horizontal centering': 'All sensitive data is encrypted using advanced encryption methods both in transit and at rest. This ensures that your information is securely stored and cannot be accessed without proper authorization, giving you peace of mind.',
    'Should you use Negative margin?': 'We take the security and privacy of your financial data very seriously. Our platform employs industry-standard encryption protocols to safeguard your information during transmission and storage.'
  };

  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const accordion = header.closest('.accordion');
      const panel = header.nextElementSibling;
      const open = panel.style.height !== '0px';
      if (!panel.innerHTML && answers[header.textContent.trim()]) {
        const content = document.createElement(header.closest('main')?.querySelector('.tab') ? 'p' : 'div');
        content.textContent = answers[header.textContent.trim()];
        panel.append(content);
      }
      panel.style.height = open ? '0px' : `${panel.scrollHeight}px`;
      header.querySelector('.accordion-icon')?.classList.toggle('rotate-180', !open);
      header.querySelector('line')?.classList.toggle('opacity-0', !open);
    });
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

  document.querySelectorAll('lite-youtube').forEach(player => {
    player.style.display = 'block';
    player.style.position = 'relative';
    player.style.aspectRatio = '16 / 9';
    player.style.background = `center / cover no-repeat url("https://i.ytimg.com/vi/${player.getAttribute('videoid')}/maxresdefault.jpg")`;
  });

  if (location.pathname.startsWith('/features')) {
    document.querySelectorAll('.inf-slide-track').forEach(track => {
      [...track.children].forEach(slide => track.append(slide.cloneNode(true)));
    });
  }

  const sizeFeatureSlider = () => {
    if (window.innerWidth >= 1024) return;
    document.querySelectorAll('.is-feature-swiper').forEach(swiper => {
      const width = window.innerWidth < 640 ? swiper.clientWidth : (swiper.clientWidth - 16) / 1.2;
      swiper.querySelectorAll(':scope > .swiper-wrapper > .swiper-slide').forEach(slide => {
        slide.style.width = `${width}px`;
      });
    });
  };

  sizeFeatureSlider();
  window.addEventListener('resize', sizeFeatureSlider);

  if (window.innerWidth >= 640 && window.innerWidth < 1024) {
    const savingsSection = document.querySelector('main > section:nth-child(4)');
    if (savingsSection) savingsSection.style.marginBottom = '-12.125px';
  }
});
