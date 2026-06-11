/**
 * Headless E2E verification of the built app (run `npm run build` first).
 * Serves dist/ via `vite preview`, then checks desktop + mobile behavior.
 */
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

const PORT = 4871;
const BASE_URL = `http://localhost:${PORT}/`;

let passed = 0;
let failed = 0;

function check(name, condition, detail = '') {
  if (condition) {
    passed += 1;
    console.log(`PASS  ${name}`);
  } else {
    failed += 1;
    console.error(`FAIL  ${name}${detail ? ` — ${detail}` : ''}`);
  }
}

async function waitForServer(url, timeoutMs = 20000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      /* server not up yet */
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Server at ${url} did not start within ${timeoutMs}ms`);
}

async function desktopChecks(browser) {
  console.log('\n--- Desktop (1440x900) ---');
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  const title = await page.title();
  if (!title.includes('Mainframe')) {
    throw new Error(`Port ${PORT} is serving a different app (title: "${title}") — likely a port collision.`);
  }

  // Typewriter cursor visible while typing.
  const cursorDuringTyping = await page
    .waitForSelector('h1 .animate-blink', { timeout: 2000 })
    .then(() => true)
    .catch(() => false);
  check('typewriter cursor blinks while typing', cursorDuringTyping);

  // Headline fully typed (600ms delay + 28 chars * 38ms ≈ 1.7s).
  await page.waitForFunction(
    () => document.querySelector('h1')?.textContent === "we'd love to\nhear from you!",
    null,
    { timeout: 5000 },
  );
  check('headline types out "we\'d love to\\nhear from you!"', true);
  await page.waitForFunction(() => !document.querySelector('h1 .animate-blink'), null, { timeout: 2000 });
  check('cursor removed once typing is done', true);

  // Inter font applied.
  const h1Font = await page.$eval('h1', (el) => getComputedStyle(el).fontFamily);
  check('Inter is the active font-family', h1Font.includes('Inter'), h1Font);

  // Navbar pieces.
  check('logo "Mainframe®" visible', await page.getByText('Mainframe®').isVisible());
  check('asterisk glyph visible', await page.getByText('✱').isVisible());
  for (const label of ['Labs', 'Studio', 'Openings', 'Shop']) {
    check(`nav link "${label}" visible`, await page.locator('header nav', { hasText: label }).first().isVisible());
  }
  check('"Get in touch" CTA visible', await page.locator('header >> text=Get in touch').first().isVisible());
  const dividerCount = await page.locator('header nav >> text=,').count();
  check('comma dividers between nav links', dividerCount >= 3, `found ${dividerCount}`);
  const burgerHidden = !(await page.getByRole('button', { name: 'Open menu' }).isVisible());
  check('hamburger hidden on desktop', burgerHidden);

  // Description copy.
  check(
    'secondary description visible',
    await page.getByText(/drop us a message and we'll get back to you as soon as possible/).isVisible(),
  );

  // Layout container.
  check('#spade-hero layout container exists', (await page.locator('#spade-hero').count()) === 1);

  // Service pills flow.
  check(
    'empty-state placeholder visible',
    await page.getByText('Please click to select services above.').isVisible(),
  );

  const brand = page.getByRole('button', { name: 'Brand' });
  await brand.click();
  await page.waitForTimeout(600); // AnimatePresence mode="wait" swap
  const brandClass = await brand.getAttribute('class');
  check('selected pill gets active classes', brandClass.includes('bg-[#1C2E1E]') && brandClass.includes('text-white'));
  check('check icon mounts inside selected pill', (await brand.locator('svg').count()) === 1);
  check(
    'banner reads "Ready to inquire about: Brand"',
    await page.getByText('Ready to inquire about:').isVisible() && (await page.locator('text=Brand').count()) > 0,
  );
  check('"Let\'s Go" CTA visible', await page.getByRole('button', { name: /Let's Go/i }).isVisible());

  await page.getByRole('button', { name: 'Digital' }).click();
  await page.waitForTimeout(400);
  const bannerText = await page.locator('section').textContent();
  check('multi-select joins selections', bannerText.includes('Brand, Digital'), bannerText.slice(0, 160));

  await brand.click();
  await page.waitForTimeout(400);
  const afterDeselect = await page.locator('section').textContent();
  check('deselect removes item from banner', afterDeselect.includes('Ready to inquire about: Digital') && !afterDeselect.includes('Brand,'));

  await page.getByRole('button', { name: 'Digital' }).click();
  await page.waitForTimeout(700);
  check(
    'placeholder returns when all pills deselected',
    await page.getByText('Please click to select services above.').isVisible(),
  );

  // Video element + scrubbing.
  const videoAttrs = await page.$eval('video', (v) => ({
    muted: v.muted,
    playsInline: v.hasAttribute('playsinline'),
    preload: v.getAttribute('preload'),
    src: v.getAttribute('src') || '',
  }));
  check('video is muted', videoAttrs.muted);
  check('video has playsinline', videoAttrs.playsInline);
  check('video preload="auto"', videoAttrs.preload === 'auto');
  check('video src is the cloudfront mp4', videoAttrs.src.includes('d8j0ntlcm91z4.cloudfront.net'));

  const metadataReady = await page
    .waitForFunction(() => {
      const v = document.querySelector('video');
      return v && v.readyState >= 1 && v.duration > 0;
    }, null, { timeout: 20000 })
    .then(() => true)
    .catch(() => false);

  if (metadataReady) {
    const before = await page.$eval('video', (v) => v.currentTime);
    const paused = await page.$eval('video', (v) => v.paused);
    check('video does not autoplay on desktop', paused);
    // Sweep the mouse to the right to scrub forward.
    await page.mouse.move(100, 450);
    for (let x = 100; x <= 1300; x += 60) {
      await page.mouse.move(x, 450);
      await page.waitForTimeout(16);
    }
    await page.waitForTimeout(500);
    const after = await page.$eval('video', (v) => v.currentTime);
    check('mouse movement scrubs video.currentTime forward', after > before, `before=${before} after=${after}`);

    // Sweep back left — time should decrease again (clamped at 0).
    for (let x = 1300; x >= 60; x -= 60) {
      await page.mouse.move(x, 450);
      await page.waitForTimeout(16);
    }
    await page.waitForTimeout(500);
    const back = await page.$eval('video', (v) => v.currentTime);
    check('reverse movement scrubs backwards (clamped ≥ 0)', back < after && back >= 0, `after=${after} back=${back}`);
  } else {
    check('video metadata loaded (network)', false, 'metadata did not load within 20s');
  }

  // Selection styling on the wrapper.
  const wrapperClass = await page.$eval('#root > div', (el) => el.className);
  check(
    'page wrapper carries spec classes',
    ['selection:bg-[#EAECE9]', 'overflow-x-hidden', 'antialiased', 'lg:min-h-screen'].every((c) =>
      wrapperClass.includes(c),
    ),
  );

  await page.close();
}

async function mobileChecks(browser) {
  console.log('\n--- Mobile (390x844) ---');
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

  const burger = page.getByRole('button', { name: 'Open menu' });
  check('hamburger visible on mobile', await burger.isVisible());
  check(
    'desktop center nav hidden on mobile',
    !(await page.locator('header nav[aria-label="Primary"]').isVisible()),
  );

  const overlay = page.locator('[data-testid="mobile-overlay"]');
  const closedClass = await overlay.getAttribute('class');
  check('overlay starts closed', closedClass.includes('opacity-0') && closedClass.includes('pointer-events-none'));

  await burger.click();
  await page.waitForTimeout(400);
  const openClass = await overlay.getAttribute('class');
  check('overlay opens (opacity-100, pointer-events-auto)', openClass.includes('opacity-100') && openClass.includes('pointer-events-auto'));
  check('burger reports expanded', (await page.getByRole('button', { name: 'Close menu' }).getAttribute('aria-expanded')) === 'true');
  const topBar = await page.locator('header button span').first().getAttribute('class');
  check('burger morphs into X', topBar.includes('rotate-45'));
  check('overlay shows nav links', await overlay.getByText('Openings').isVisible());

  await overlay.getByText('Labs').click();
  await page.waitForTimeout(400);
  const reclosedClass = await overlay.getAttribute('class');
  check('overlay closes after tapping a link', reclosedClass.includes('opacity-0'));

  // Mobile autoplay hook.
  const autoplay = await page.$eval('video', (v) => v.autoplay);
  check('video.autoplay set on mobile', autoplay);
  const playing = await page
    .waitForFunction(() => {
      const v = document.querySelector('video');
      return v && !v.paused && v.currentTime > 0;
    }, null, { timeout: 20000 })
    .then(() => true)
    .catch(() => false);
  check('video actually plays on mobile', playing);

  await page.close();
}

const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
  stdio: 'ignore',
  detached: true,
});

try {
  await waitForServer(BASE_URL);
  const browser = await chromium.launch();
  try {
    await desktopChecks(browser);
    await mobileChecks(browser);
  } catch (error) {
    failed += 1;
    console.error(`FAIL  unexpected error: ${error.message}`);
  } finally {
    await browser.close();
  }
} finally {
  try {
    process.kill(-server.pid, 'SIGTERM');
  } catch {
    server.kill('SIGTERM');
  }
}

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
