const lightSwitches = document.querySelectorAll('.light-switch');
if (lightSwitches.length > 0) {
  lightSwitches.forEach((lightSwitch, i) => {
    if (localStorage.getItem('dark-mode') === 'true') {
      lightSwitch.checked = true;
    }
    lightSwitch.addEventListener('change', () => {
      const { checked } = lightSwitch;
      lightSwitches.forEach((el, n) => {
        if (n !== i) {
          el.checked = checked;
        }
      });
      if (lightSwitch.checked) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('dark-mode', true);
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('dark-mode', false);
      }
    });
  });
}
document.addEventListener('DOMContentLoaded', function () {
  const targets = document.querySelectorAll('[data-scrollspy-target]');
  const links = document.querySelectorAll('[data-scrollspy-link]');
  if (links.length < 1) return;
  const addActive = (i) => {
    const link = links[i] ? links[i] : links[0];
    link.classList.add('scrollspy-active');
  }
  const removeActive = (i) => {
    links[i].classList.remove('scrollspy-active');
  }
  const removeAllActive = () => [...Array(targets.length).keys()].forEach((link) => removeActive(link));
  const targetMargin = 100;
  let currentActive = 0;
  addActive(0);
  window.addEventListener('scroll', () => {
    const current = targets.length - [...targets].reverse().findIndex((target) => window.scrollY >= target.offsetTop - targetMargin) - 1;
    if (current !== currentActive) {
      removeAllActive();
      currentActive = current;
      addActive(current);
    }
  });
}, false);

