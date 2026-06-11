/**
 * Headless verification of the Mainframe A.R.I.A hero page.
 * Serves the production build via `vite preview`, then checks structure,
 * styles, typewriter timing, pill reveal, clipboard copy, mobile menu,
 * and the mouse-scrub video behavior in headless Chromium.
 */
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const PORT = 4731;
const BASE = `http://localhost:${PORT}/`;
const EMAIL = 'hello@mainframe.co';
const TYPED_TEXT =
  'Glad you stopped in. Good taste tends to find us. Now, what are we building?';

let failures = 0;
function check(name, ok, detail = '') {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? `  [${detail}]` : ''}`);
  if (!ok) failures += 1;
}

async function waitForServer(url, tries = 50) {
  for (let i = 0; i < tries; i += 1) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error(`Server never came up at ${url}`);
}

const projectRoot = fileURLToPath(new URL('..', import.meta.url));
const preview = spawn(
  process.execPath,
  ['node_modules/vite/bin/vite.js', 'preview', '--port', String(PORT), '--strictPort'],
  { cwd: projectRoot, stdio: 'ignore' },
);

try {
  await waitForServer(BASE);
  const browser = await chromium.launch();

  // ---------- Served HTML: font links ----------
  const html = await (await fetch(BASE)).text();
  check(
    'index.html loads heading font stylesheet',
    html.includes('5ac3fe7c6abd2f62067f266d89671492?family=HelveticaNowDisplay-Medium'),
  );
  check(
    'index.html loads body font stylesheet',
    html.includes('1aa3377e489837a26d019bba501e779d?family=HelveticaNowDisplayW01-Rg'),
  );

  // ---------- Context A: deterministic timing via fake clock ----------
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.clock.install();
    await page.goto(BASE, { waitUntil: 'domcontentloaded' });

    const pills = page.locator('section .flex.flex-wrap');
    check('pills hidden at t=0 (opacity 0)', (await pills.evaluate((el) => el.style.opacity)) === '0');
    // CSSOM drops the default 'ease' keyword when serializing.
    const transition = await pills.evaluate((el) => el.style.transition);
    check(
      'pills use 0.4s opacity+transform transition',
      transition.includes('opacity 0.4s') && transition.includes('transform 0.4s'),
      transition,
    );
    check(
      'pills start translated down 8px',
      (await pills.evaluate((el) => el.style.transform)) === 'translateY(8px)',
    );

    const typed = page.locator('p.min-h-\\[54px\\]');
    check('typewriter empty before 600ms delay', (await typed.innerText()).trim() === '');

    await page.clock.runFor(450);
    check('pills visible after 400ms (opacity 1)', (await pills.evaluate((el) => el.style.opacity)) === '1');
    check(
      'pills slide to translateY(0)',
      (await pills.evaluate((el) => el.style.transform)) === 'translateY(0px)',
    );
    check(
      'typewriter still empty at 450ms (start delay 600ms)',
      (await typed.innerText()).trim() === '',
    );

    await page.clock.runFor(1500); // t = 1950ms -> ~35 chars typed
    const partial = (await typed.innerText()).trim();
    check(
      'typewriter mid-flight at ~2s (partial text)',
      partial.length > 0 && partial.length < TYPED_TEXT.length && TYPED_TEXT.startsWith(partial),
      `${partial.length} chars`,
    );
    check('blinking cursor present while typing', (await page.locator('.cursor-blink').count()) === 1);

    await page.clock.runFor(4000); // t = 5950ms -> typing done (600 + 77*38 = 3526ms)
    check('typewriter completes full text', (await typed.innerText()).trim() === TYPED_TEXT);
    check('cursor removed when done', (await page.locator('.cursor-blink').count()) === 0);
    await ctx.close();
  }

  // ---------- Context B: desktop, real timers ----------
  {
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      permissions: ['clipboard-read', 'clipboard-write'],
    });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: 'load' });

    // Fonts
    const bodyFont = await page.evaluate(() => getComputedStyle(document.body).fontFamily);
    check('body uses HelveticaNowDisplayW01-Rg', bodyFont.includes('HelveticaNowDisplayW01-Rg'), bodyFont);
    const logo = page.getByText('Mainframe®');
    check('logo text "Mainframe®" rendered', (await logo.count()) === 1);
    const logoFont = await logo.evaluate((el) => getComputedStyle(el).fontFamily);
    check('logo uses HelveticaNowDisplay-Medium', logoFont.includes('HelveticaNowDisplay-Medium'), logoFont);
    check('decorative asterisk rendered', (await page.getByText('✳︎').count()) === 1);

    // Navbar
    for (const label of ['Labs', 'Studio', 'Openings', 'Shop']) {
      check(`nav link "${label}" visible on desktop`, await page.locator('nav a', { hasText: label }).isVisible());
    }
    const navText = (await page.locator('nav').innerText()).replace(/\s+/g, ' ').trim();
    check('nav links comma-separated', navText === 'Labs, Studio, Openings, Shop', navText);
    check('desktop CTA "Get in touch" visible', await page.locator('header a:has-text("Get in touch")').isVisible());
    check('hamburger hidden on desktop', !(await page.locator('header button').isVisible()));
    const headerZ = await page.locator('header').evaluate((el) => getComputedStyle(el).zIndex);
    check('navbar z-index 10', headerZ === '10', headerZ);

    // Video element
    const video = page.locator('video');
    const v = await video.evaluate((el) => {
      const cs = getComputedStyle(el);
      return {
        muted: el.muted,
        playsInline: el.playsInline,
        preload: el.preload,
        autoplay: el.hasAttribute('autoplay'),
        paused: el.paused,
        position: cs.position,
        zIndex: cs.zIndex,
        objectFit: cs.objectFit,
        objectPosition: cs.objectPosition,
        src: el.currentSrc || el.src,
      };
    });
    check('video muted', v.muted);
    check('video playsInline', v.playsInline);
    check('video preload=auto', v.preload === 'auto', v.preload);
    check('video does not autoplay', !v.autoplay && v.paused);
    check('video fixed / z-0 / cover', v.position === 'fixed' && v.zIndex === '0' && v.objectFit === 'cover');
    check('video object-position 70% center', v.objectPosition === '70% 50%', v.objectPosition);
    check('video src is the CloudFront mp4', v.src.includes('d8j0ntlcm91z4.cloudfront.net'));

    // Blurred intro label
    const intro = page.locator('section p').first();
    const introStyles = await intro.evaluate((el) => {
      const cs = getComputedStyle(el);
      return { filter: cs.filter, pe: cs.pointerEvents, text: el.innerText };
    });
    check('intro label blurred 4px', introStyles.filter === 'blur(4px)', introStyles.filter);
    check('intro label pointer-events none', introStyles.pe === 'none');
    check(
      'intro label two lines of A.R.I.A copy',
      introStyles.text.includes('Hey there, meet A.R.I.A,') &&
        introStyles.text.includes("Mainframe's Adaptive Response Interface Agent"),
    );

    // Pills content
    for (const label of ['Pitch us an idea', 'Come work here', 'Send a brief hello', 'See how we operate']) {
      check(`white pill "${label}" visible`, await page.locator('button', { hasText: label }).isVisible());
    }
    const outline = page.locator('button', { hasText: 'Reach us:' });
    check('outline pill visible with email', (await outline.innerText()).includes(EMAIL));
    check('outline pill has copy icon svg', (await outline.locator('svg rect').count()) === 2);

    // Clipboard copy
    await outline.click();
    const copied = await page.evaluate(() => navigator.clipboard.readText());
    check('clicking outline pill copies email', copied === EMAIL, copied);

    // Typewriter completes with real timers
    await page.waitForFunction(
      (t) => document.querySelector('p.min-h-\\[54px\\]')?.textContent?.trim() === t,
      TYPED_TEXT,
      { timeout: 10000 },
    );
    check('typewriter completes with real timers', true);

    // Mouse-scrub: wait for metadata, then move the mouse horizontally.
    const hasDuration = await page
      .waitForFunction(() => {
        const el = document.querySelector('video');
        return !!el && Number.isFinite(el.duration) && el.duration > 0;
      }, { timeout: 30000 })
      .then(() => true)
      .catch(() => false);
    check('video metadata (duration) loaded', hasDuration);
    if (hasDuration) {
      const duration = await video.evaluate((el) => el.duration);
      await page.mouse.move(100, 500);
      for (let x = 150; x <= 1300; x += 50) {
        await page.mouse.move(x, 500);
        await page.waitForTimeout(20);
      }
      await page.waitForTimeout(500);
      const after = await video.evaluate((el) => el.currentTime);
      // moved +1200px of 1440 => ~0.667 * 0.8 * duration expected
      const expected = (1200 / 1440) * 0.8 * duration;
      check(
        'mouse scrub advances video.currentTime',
        after > 0 && Math.abs(after - expected) < duration * 0.15,
        `t=${after.toFixed(2)}s expected~${expected.toFixed(2)}s dur=${duration.toFixed(2)}s`,
      );
      // Scrub backwards
      for (let x = 1300; x >= 700; x -= 50) {
        await page.mouse.move(x, 500);
        await page.waitForTimeout(20);
      }
      await page.waitForTimeout(500);
      const back = await video.evaluate((el) => el.currentTime);
      check('mouse scrub rewinds video.currentTime', back < after, `t=${back.toFixed(2)}s < ${after.toFixed(2)}s`);
      check('video still paused after scrubbing', await video.evaluate((el) => el.paused));
    }

    await page.screenshot({ path: '/tmp/mainframe-aria-desktop.png' });
    await ctx.close();
  }

  // ---------- Context C: mobile ----------
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: 'load' });

    check('desktop nav hidden on mobile', !(await page.locator('nav').isVisible()));
    check('desktop CTA hidden on mobile', !(await page.locator('header a:has-text("Get in touch")').isVisible()));
    const burger = page.locator('header button');
    check('hamburger visible on mobile', await burger.isVisible());
    check('hamburger has 3 bars', (await burger.locator('span').count()) === 3);

    const overlay = page.locator('div.z-\\[9\\]');
    let o = await overlay.evaluate((el) => {
      const cs = getComputedStyle(el);
      return { opacity: cs.opacity, pe: cs.pointerEvents };
    });
    check('overlay hidden initially (opacity 0, no pointer events)', o.opacity === '0' && o.pe === 'none');

    await burger.click();
    await page.waitForTimeout(400);
    o = await overlay.evaluate((el) => {
      const cs = getComputedStyle(el);
      return { opacity: cs.opacity, pe: cs.pointerEvents };
    });
    check('overlay fades in on toggle', o.opacity === '1' && o.pe !== 'none');
    for (const label of ['Labs', 'Studio', 'Openings', 'Shop', 'Get in touch']) {
      check(`overlay link "${label}" visible`, await overlay.locator(`a:has-text("${label}")`).isVisible());
    }
    const topBar = await burger.locator('span').first().evaluate((el) => getComputedStyle(el).transform);
    check('hamburger top bar rotated into X', topBar !== 'none', topBar);
    await page.screenshot({ path: '/tmp/mainframe-aria-mobile-menu.png' });

    await overlay.locator('a:has-text("Labs")').click();
    await page.waitForTimeout(400);
    o = await overlay.evaluate((el) => getComputedStyle(el).opacity);
    check('overlay closes after link click', o === '0');

    await page.waitForTimeout(4000); // let typewriter finish for the screenshot
    await page.screenshot({ path: '/tmp/mainframe-aria-mobile.png' });
    await ctx.close();
  }

  await browser.close();
} finally {
  preview.kill('SIGTERM');
}

console.log(failures === 0 ? '\nALL CHECKS PASSED' : `\n${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
