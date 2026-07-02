/* Shared header/footer/mobile-drawer/modal markup, rendered at runtime so every
   page shares one source of truth without needing a build step. `basePath` is
   "" for top-level pages and "../" for pages nested one level deep (item/*.html). */
(function (global) {
  function iconSearch() {
    return (
      '<svg viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/>' +
      '<path d="M21 21l-4.3-4.3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
    );
  }
  function iconBurger() {
    return (
      '<svg viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
    );
  }
  function iconClose() {
    return "&times;";
  }
  function socialIcon(name) {
    var paths = {
      twitter:
        '<path d="M23 4.5c-.8.36-1.66.6-2.56.71a4.48 4.48 0 001.96-2.48 8.94 8.94 0 01-2.83 1.08 4.47 4.47 0 00-7.61 4.08A12.7 12.7 0 013 3.6a4.47 4.47 0 001.38 5.96 4.44 4.44 0 01-2.03-.56v.06a4.47 4.47 0 003.58 4.38 4.5 4.5 0 01-2.02.08 4.48 4.48 0 004.17 3.1A8.97 8.97 0 012 18.4a12.66 12.66 0 006.86 2.01c8.23 0 12.73-6.82 12.73-12.73l-.01-.58A9.1 9.1 0 0023 4.5z"/>',
      facebook:
        '<path d="M14 9h3V6h-3c-1.66 0-3 1.34-3 3v2H9v3h2v7h3v-7h3l1-3h-4V9c0-.55.45-1 1-1z"/>',
      linkedin:
        '<path d="M4.98 3.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2 3.77-2 4.03 0 4.78 2.66 4.78 6.11V21h-4v-5.4c0-1.3-.02-2.97-1.81-2.97-1.82 0-2.1 1.42-2.1 2.88V21h-4z"/>',
      youtube:
        '<path d="M22 8.2s-.2-1.6-.8-2.3c-.8-.8-1.7-.8-2.1-.9C16.4 4.8 12 4.8 12 4.8s-4.4 0-7.1.2c-.4 0-1.3.1-2.1.9-.6.7-.8 2.3-.8 2.3S1.8 10 1.8 11.8v1.4c0 1.8.2 3.6.2 3.6s.2 1.6.8 2.3c.8.9 1.9.8 2.4.9 1.7.2 7.3.2 7.3.2s4.4 0 7.1-.2c.4 0 1.3-.1 2.1-.9.6-.7.8-2.3.8-2.3s.2-1.8.2-3.6v-1.4c0-1.8-.2-3.6-.2-3.6zM9.7 15.2V8.9l5.8 3.2-5.8 3.1z"/>',
      slack:
        '<path d="M6 15a2 2 0 11-2-2h2v2zm1 0a2 2 0 114 0v5a2 2 0 11-4 0v-5zM9 6a2 2 0 112-2 2 2 0 01-2 2zm0 1a2 2 0 110 4H4a2 2 0 110-4h5zm9 3a2 2 0 112 2h-2v-2zm-1 0a2 2 0 11-4 0V5a2 2 0 114 0v5zm-3 9a2 2 0 11-2 2 2 2 0 012-2zm0-1a2 2 0 110-4h5a2 2 0 110 4h-5z"/>',
    };
    return (
      '<svg viewBox="0 0 24 24">' + (paths[name] || "") + "</svg>"
    );
  }

  function headerHTML(basePath, active) {
    var b = basePath;
    function navLink(href, label, key) {
      var cls = active === key ? ' class="active"' : "";
      return '<a href="' + b + href + '"' + cls + ">" + label + "</a>";
    }
    return (
      '<div class="announce">The source code for this marketplace app is ' +
      '<a href="https://github.com/cosmicjs/nextjs-marketplace" target="_blank" rel="noopener">available on GitHub</a>.</div>' +
      '<header class="site-header">' +
      '<div class="container">' +
      '<a href="' + b + 'index.html" class="brand">' +
      '<img src="' + b + 'assets/img/misc/logo.png" alt="uNFT Marketplace logo" width="40" height="40">' +
      "</a>" +
      '<div class="brand-divider"></div>' +
      '<nav class="main-nav">' +
      navLink("index.html#discover", "Discover", "discover") +
      navLink("upload-details.html", "Create Item", "create") +
      navLink("about.html", "About Us", "about") +
      "</nav>" +
      '<div class="header-actions">' +
      '<label class="theme-toggle" data-theme-toggle aria-label="Toggle dark theme">' +
      '<input type="checkbox"><span class="knob"></span>' +
      "</label>" +
      '<a href="' + b + 'search.html" class="header-search"><span aria-hidden="true">' + iconSearch() + "</span>Search</a>" +
      '<button type="button" class="btn btn-outline btn-sm" data-open-modal>Login</button>' +
      '<button type="button" class="hamburger" data-open-drawer aria-label="Open menu">' + iconBurger() + "</button>" +
      "</div>" +
      "</div>" +
      "</header>" +
      '<div class="mobile-drawer" data-drawer>' +
      '<div class="mobile-drawer-top">' +
      '<a href="' + b + 'index.html" class="brand"><img src="' + b + 'assets/img/misc/logo.png" alt="uNFT Marketplace logo" width="36" height="36"></a>' +
      '<label class="theme-toggle" data-theme-toggle aria-label="Toggle dark theme"><input type="checkbox"><span class="knob"></span></label>' +
      '<button type="button" class="mobile-drawer-close" data-close-drawer aria-label="Close menu">' + iconClose() + "</button>" +
      "</div>" +
      "<nav>" +
      '<a href="' + b + 'index.html#discover">Discover</a>' +
      '<a href="' + b + 'upload-details.html">Create Item</a>' +
      '<a href="' + b + 'about.html">About Us</a>' +
      "</nav>" +
      "</div>"
    );
  }

  function footerHTML(basePath) {
    var b = basePath;
    return (
      '<footer class="site-footer">' +
      '<div class="container">' +
      '<div class="footer-top">' +
      '<div class="footer-brand">' +
      '<img src="' + b + 'assets/img/misc/logo.png" alt="uNFT Marketplace logo" width="48" height="48">' +
      "<h3>The New Creative Economy.</h3>" +
      '<div class="footer-theme"><span>Dark theme</span>' +
      '<label class="theme-toggle" data-theme-toggle aria-label="Toggle dark theme"><input type="checkbox"><span class="knob"></span></label>' +
      "</div>" +
      "</div>" +
      '<div class="footer-col">' +
      "<h4>Menu</h4>" +
      '<a href="' + b + 'index.html#discover">Discover</a>' +
      '<a href="' + b + 'upload-details.html">Create Item</a>' +
      '<a href="' + b + 'about.html">About Us</a>' +
      "</div>" +
      '<div class="footer-col">' +
      "<h4>About Cosmic</h4>" +
      '<a href="https://www.cosmicjs.com/docs" target="_blank" rel="noopener">Documentation</a>' +
      '<a href="https://www.cosmicjs.com/contact" target="_blank" rel="noopener">Contact Us</a>' +
      '<div class="footer-social">' +
      '<a href="https://twitter.com/cosmicjs" target="_blank" rel="noopener" aria-label="Twitter">' + socialIcon("twitter") + "</a>" +
      '<a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook">' + socialIcon("facebook") + "</a>" +
      '<a href="https://linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn">' + socialIcon("linkedin") + "</a>" +
      '<a href="https://youtube.com" target="_blank" rel="noopener" aria-label="YouTube">' + socialIcon("youtube") + "</a>" +
      '<a href="https://slack.com" target="_blank" rel="noopener" aria-label="Slack">' + socialIcon("slack") + "</a>" +
      "</div>" +
      '<button type="button" class="btn btn-primary btn-sm">Subscribe Newsletter</button>' +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="footer-divider"></div>' +
      '<div class="container">' +
      '<div class="footer-bottom">Powered by ' +
      '<img src="' + b + 'assets/img/misc/logo.png" alt="Cosmic" width="24" height="24">' +
      "</div>" +
      "</div>" +
      "</footer>"
    );
  }

  function modalHTML() {
    return (
      '<div class="modal-overlay" data-modal>' +
      '<div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title">' +
      '<button type="button" class="modal-close" data-close-modal aria-label="Close">' + iconClose() + "</button>" +
      '<h2 id="auth-modal-title">Authentication with <span>Cosmic</span></h2>' +
      "<p>To create an item you need to register an account at " +
      '<a href="https://www.cosmicjs.com" target="_blank" rel="noopener">Cosmic</a></p>' +
      '<input class="field" type="email" placeholder="Email" autocomplete="off">' +
      '<input class="field" type="password" placeholder="Password" autocomplete="off">' +
      '<div class="modal-actions">' +
      '<button type="button" class="btn btn-primary btn-block">Continue</button>' +
      '<button type="button" class="btn btn-outline btn-block" data-close-modal>Cancel</button>' +
      "</div>" +
      "</div>" +
      "</div>"
    );
  }

  function mount(basePath, active) {
    var headerMount = document.querySelector("[data-mount=header]");
    var footerMount = document.querySelector("[data-mount=footer]");
    var modalMount = document.querySelector("[data-mount=modal]");
    if (headerMount) headerMount.outerHTML = headerHTML(basePath, active);
    if (footerMount) footerMount.outerHTML = footerHTML(basePath);
    if (modalMount) modalMount.outerHTML = modalHTML();
    wire();
  }

  /* Event delegation on document so dynamically-inserted triggers (e.g. the
     "Choose collection" tiles built after mount() on upload-details.html)
     open/close the drawer and modal without needing to be re-wired. */
  var delegatedWired = false;
  function wire() {
    if (delegatedWired) return;
    delegatedWired = true;
    document.addEventListener("click", function (e) {
      var drawer = document.querySelector("[data-drawer]");
      var modal = document.querySelector("[data-modal]");
      if (e.target.closest("[data-open-drawer]")) {
        if (drawer) drawer.classList.add("is-open");
      }
      if (e.target.closest("[data-close-drawer]")) {
        if (drawer) drawer.classList.remove("is-open");
      }
      if (e.target.closest("[data-open-modal]")) {
        e.preventDefault();
        if (modal) modal.classList.add("is-open");
      }
      if (e.target.closest("[data-close-modal]") || e.target === modal) {
        if (modal) modal.classList.remove("is-open");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        var drawer = document.querySelector("[data-drawer]");
        var modal = document.querySelector("[data-modal]");
        if (modal) modal.classList.remove("is-open");
        if (drawer) drawer.classList.remove("is-open");
      }
    });
  }

  global.UnftChrome = { mount: mount };
})(window);
