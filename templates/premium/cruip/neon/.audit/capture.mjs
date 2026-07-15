import { chromium } from '../../../../../scripts/record-demos/node_modules/playwright/index.mjs'
import fs from 'node:fs/promises'
import path from 'node:path'

const [base, output] = process.argv.slice(2)
const pages = ['index', 'signin', 'signup', 'reset-password']
const widths = [390, 768, 1280]
const browser = await chromium.launch({ headless: true })
const measurements = []

async function settle(page) {
  await page.waitForLoadState('networkidle')
  await page.evaluate(async () => {
    await document.fonts.ready
    for (let y = 0; y < document.documentElement.scrollHeight; y += window.innerHeight * 0.8) {
      window.scrollTo(0, y)
      await new Promise(resolve => setTimeout(resolve, 80))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(700)
}

for (const slug of pages) {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 })
    await page.goto(`${base}/${slug}.html`)
    await settle(page)
    const dimensions = await page.evaluate(() => ({
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight,
    }))
    const directory = path.join(output, 'responsive')
    await fs.mkdir(directory, { recursive: true })
    await page.screenshot({ path: path.join(directory, `${slug}-${width}.png`), fullPage: true })
    measurements.push({ slug, viewport: width, ...dimensions })
    await page.close()
  }
}

const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 })
await page.goto(`${base}/index.html`)
await settle(page)
const stateDirectory = path.join(output, 'states')
await fs.mkdir(stateDirectory, { recursive: true })
const resource = page.locator('[x-data]').last()
for (const category of [1, 2, 3, 4]) {
  await resource.locator('button').nth(category - 1).click()
  await page.waitForTimeout(250)
  await resource.screenshot({ path: path.join(stateDirectory, `resources-${category}.png`) })
}
const features = page.locator('[data-aos-id-testimonials]').first()
await features.scrollIntoViewIfNeeded()
await page.waitForTimeout(650)
await features.screenshot({ path: path.join(stateDirectory, 'aos-features.png') })
await page.close()

for (const slug of ['signin', 'signup', 'reset-password']) {
  const auth = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 })
  await auth.goto(`${base}/${slug}.html`)
  await settle(auth)
  await auth.locator('#email').focus()
  await auth.locator('form').screenshot({ path: path.join(stateDirectory, `${slug}-focus.png`) })
  await auth.locator('form button').first().click()
  await auth.waitForTimeout(150)
  await auth.locator('form').screenshot({ path: path.join(stateDirectory, `${slug}-validity.png`) })
  await auth.close()
}

await fs.writeFile(path.join(output, 'measurements.json'), `${JSON.stringify(measurements, null, 2)}\n`)
await browser.close()
