const snapshotAssetRoot = new URL('../', document.currentScript.src);

document.addEventListener('DOMContentLoaded', () => {
  const navigationToggle = document.querySelector('#nav-toggle');
  const navigationMenu = document.querySelector('#nav-menu');
  if (navigationToggle && navigationMenu) {
    navigationToggle.addEventListener('change', () => {
      navigationMenu.classList.toggle('hidden', !navigationToggle.checked);
    });
    navigationMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => { navigationToggle.checked = false; });
    });
  }

  document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
    const trigger = dropdown.querySelector('.nav-link');
    const panel = dropdown.querySelector('.nav-dropdown-list');
    if (!trigger || !panel) return;
    trigger.addEventListener('click', event => {
      if (window.innerWidth >= 1024) return;
      event.preventDefault();
      panel.classList.toggle('static-open');
    });
  });

  const announcementButton = [...document.querySelectorAll('button')].find(button => !button.textContent.trim() && button.classList.contains('absolute'));
  announcementButton?.addEventListener('click', () => announcementButton.closest('section, div')?.remove());

  document.querySelectorAll('.pricing-check').forEach(toggle => {
    toggle.addEventListener('change', () => {
      document.querySelectorAll('.data-count').forEach(price => {
        price.textContent = toggle.checked ? price.dataset.countYearly : price.dataset.countMonthly;
      });
      document.querySelectorAll('.text-monthly').forEach(text => text.classList.toggle('hidden', toggle.checked));
      document.querySelectorAll('.text-yearly').forEach(text => text.classList.toggle('hidden', !toggle.checked));
    });
  });

  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const accordion = header.closest('.accordion');
      const open = accordion?.classList.contains('active');
      accordion?.parentElement?.querySelectorAll('.accordion.active').forEach(item => item.classList.remove('active'));
      if (!open) accordion?.classList.add('active');
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
    player.style.background = `center / cover no-repeat url("${new URL('images/videos/youtube.jpg', snapshotAssetRoot)}")`;
    const play = document.createElement('button');
    play.type = 'button';
    play.setAttribute('aria-label', player.getAttribute('title') || 'Play video');
    play.style.cssText = 'position:absolute;left:50%;top:50%;width:68px;height:48px;transform:translate(-50%,-50%);border:0;border-radius:12px;background:#ff0000;cursor:pointer';
    const icon = document.createElement('span');
    icon.style.cssText = 'display:block;width:0;height:0;margin:auto;border-top:11px solid transparent;border-bottom:11px solid transparent;border-left:19px solid #ffffff';
    play.append(icon);
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
