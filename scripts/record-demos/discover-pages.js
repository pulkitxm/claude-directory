import { chromium } from 'playwright';

(async () => {
  const legacyChromePath = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
  const proxyUrl = process.env.HTTPS_PROXY || '';

  const browser = await chromium.launch({
    executablePath: legacyChromePath,
    args: [
      '--ignore-certificate-errors',
      '--ssl-version-max=tls1.2',
      `--proxy-server=${proxyUrl}`
    ]
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Navigating to ThemeFisher demo...');
  await page.goto('https://themefisher.com/demo?theme=clarity-nextjs', {
    waitUntil: 'networkidle',
    timeout: 90000
  });

  console.log('Page title:', await page.title());

  // Find all frames
  const frames = page.frames();
  console.log('\nAll frames (' + frames.length + '):');
  for (const frame of frames) {
    console.log(' - URL:', frame.url());
  }

  // Find iframes
  const iframes = await page.$$('iframe');
  console.log('\nIframes (' + iframes.length + '):');
  for (const iframe of iframes) {
    const src = await iframe.getAttribute('src');
    const width = await iframe.getAttribute('width');
    const height = await iframe.getAttribute('height');
    console.log(' - src:', src, '| width:', width, '| height:', height);
  }

  // Find the main content frame (largest iframe)
  let mainFrameUrl = null;
  for (const frame of frames) {
    const url = frame.url();
    if (url && url !== 'about:blank' && !url.includes('themefisher.com/demo')) {
      mainFrameUrl = url;
      console.log('\nMain content frame URL:', url);

      // Find all navigation links in this frame
      try {
        const links = await frame.evaluate(() => {
          const navLinks = [];
          // Look for nav links
          const selectors = ['nav a', 'header a', '.navbar a', '.nav a', '.menu a', '[role="navigation"] a'];
          for (const sel of selectors) {
            for (const el of document.querySelectorAll(sel)) {
              const href = el.getAttribute('href');
              const text = el.textContent.trim();
              if (href && text && !navLinks.find(l => l.href === href)) {
                navLinks.push({ text, href });
              }
            }
          }
          // Also get all links
          const allLinks = [];
          for (const el of document.querySelectorAll('a[href]')) {
            const href = el.getAttribute('href');
            const text = el.textContent.trim();
            if (href && text) {
              allLinks.push({ text, href });
            }
          }
          return { navLinks, allLinks: allLinks.slice(0, 50) };
        });

        console.log('\nNavigation links:');
        for (const l of links.navLinks) {
          console.log(' -', l.text, ':', l.href);
        }
        console.log('\nAll links (first 50):');
        for (const l of links.allLinks) {
          console.log(' -', l.text, ':', l.href);
        }
      } catch(e) {
        console.log('Error getting links:', e.message);
      }
      break;
    }
  }

  await browser.close();
})().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
