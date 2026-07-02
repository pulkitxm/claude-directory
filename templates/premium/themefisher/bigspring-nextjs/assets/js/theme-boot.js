/* Pre-paint theme boot script — mirrors the source's inline next-themes-style
   boot script so there is no flash of the wrong theme. Must run before <body> paints. */
(function () {
  try {
    var d = document.documentElement;
    var c = d.classList;
    c.remove('light', 'dark');
    var stored = localStorage.getItem('theme');
    if (stored === 'system' || !stored) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      c.add(mq.matches ? 'dark' : 'light');
    } else {
      c.add(stored);
    }
  } catch (e) {}
})();
