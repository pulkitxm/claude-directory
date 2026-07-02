(function () {
	const I = {
		home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
		blog: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>',
		github:
			'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.2 3.44 9.6 8.21 11.16.6.11.82-.25.82-.57v-2c-3.34.71-4.04-1.58-4.04-1.58-.55-1.37-1.34-1.74-1.34-1.74-1.1-.73.08-.72.08-.72 1.21.08 1.84 1.22 1.84 1.22 1.08 1.81 2.83 1.29 3.52.99.11-.77.42-1.29.76-1.59-2.67-.3-5.47-1.31-5.47-5.83 0-1.29.47-2.34 1.24-3.17-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.21.96-.26 1.98-.39 3-.4 1.02 0 2.04.14 3 .4 2.29-1.53 3.3-1.21 3.3-1.21.66 1.65.25 2.87.12 3.17.77.83 1.24 1.88 1.24 3.17 0 4.53-2.81 5.52-5.49 5.81.43.36.81 1.09.81 2.2v3.26c0 .32.21.69.83.57C20.57 21.88 24 17.48 24 12.29 24 5.78 18.63.5 12 .5z"/></svg>',
		linkedin:
			'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>',
		x: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
		youtube:
			'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6z"/></svg>',
		sun: '<svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>',
		moon: '<svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/></svg>',
	};
	// path prefix: posts live at blog-*.html in same dir, so all links relative to root dir
	const html = `
  <nav class="dock"><div class="dock-inner">
    <a class="dock-btn" href="./index.html" aria-label="Home">${I.home}</a>
    <a class="dock-btn" href="./blog.html" aria-label="Blog">${I.blog}</a>
    <div class="dock-sep"></div>
    <a class="dock-btn" href="https://github.com/dillionverma" aria-label="GitHub" target="_blank" rel="noopener">${I.github}</a>
    <a class="dock-btn" href="https://www.linkedin.com/in/dillion-verma/" aria-label="LinkedIn" target="_blank" rel="noopener">${I.linkedin}</a>
    <a class="dock-btn" href="https://x.com/dillionverma" aria-label="X" target="_blank" rel="noopener">${I.x}</a>
    <a class="dock-btn" href="https://www.youtube.com/@dillionverma" aria-label="YouTube" target="_blank" rel="noopener">${I.youtube}</a>
    <div class="dock-sep"></div>
    <button class="dock-btn theme-toggle" aria-label="Toggle theme">${I.sun}${I.moon}</button>
  </div></nav>`;
	const mount = document.getElementById("dock-mount");
	if (mount) mount.innerHTML = html;
})();
