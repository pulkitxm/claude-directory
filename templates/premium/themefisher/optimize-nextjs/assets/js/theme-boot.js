/* Pre-paint theme boot — avoids a flash of the wrong theme. Must run before <body> paints,
   so it's loaded as a blocking <script> in <head>, before any stylesheet that reads the
   custom properties it toggles. */
(function () {
  try {
    var d = document.documentElement;
    var c = d.classList;
    c.remove('light', 'dark');
    var stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') {
      c.add(stored);
    } else {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      c.add(mq.matches ? 'dark' : 'light');
    }
  } catch (e) {}
})();
