import { chromium } from '../../../../../scripts/record-demos/node_modules/playwright/index.mjs'
import fs from 'node:fs/promises'
import path from 'node:path'

const [base, output] = process.argv.slice(2)
const pages = ['index', 'pricing', 'about', 'blog', 'blog-post', 'help', 'newsletter', 'contact', '404', 'signin', 'signup', 'reset-password']
const widths = [390, 768, 1280]
const browser = await chromium.launch({ headless: true })
const measurements = []

async function settle(page) {
  await page.waitForLoadState('networkidle')
  await page.evaluate(async () => {
    await document.fonts.ready
    for (let y = 0; y < document.documentElement.scrollHeight; y += window.innerHeight * 0.8) {
      window.scrollTo(0, y)
      await new Promise(resolve => setTimeout(resolve, 65))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(650)
}

for (const slug of pages) {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 })
    await page.goto(`${base}/${slug}.html`)
    await settle(page)
    const dimensions = await page.evaluate(() => ({ width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight }))
    const directory = path.join(output, 'responsive')
    await fs.mkdir(directory, { recursive: true })
    await page.screenshot({ path: path.join(directory, `${slug}-${width}.png`), fullPage: true })
    measurements.push({ slug, viewport: width, ...dimensions })
    await page.close()
  }
}

const states = path.join(output, 'states')
await fs.mkdir(states, { recursive: true })

const desktop = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 })
await desktop.goto(`${base}/index.html`)
await settle(desktop)
const dropdown = desktop.locator('header [x-data]').first()
await dropdown.locator('button').click()
await desktop.waitForTimeout(250)
await dropdown.screenshot({ path: path.join(states, 'header-dropdown.png') })
const modal = desktop.locator('[x-data="handleVideoModal"]')
await modal.locator('button').first().click()
await desktop.waitForTimeout(300)
await desktop.screenshot({ path: path.join(states, 'video-modal.png') })
await desktop.reload()
await settle(desktop)
const tabs = desktop.locator('[x-data*="activeTab"]')
await tabs.scrollIntoViewIfNeeded()
for (const tab of [1, 2, 3]) {
  await tabs.locator('button').nth(tab - 1).click()
  await desktop.waitForTimeout(250)
  await tabs.screenshot({ path: path.join(states, `workflow-tab-${tab}.png`) })
}
await desktop.close()

const mobile = await browser.newPage({ viewport: { width: 390, height: 900 }, deviceScaleFactor: 1 })
await mobile.goto(`${base}/index.html`)
await settle(mobile)
const menu = mobile.locator('header [x-data*="expanded"]')
await menu.locator('button').click()
await mobile.waitForTimeout(250)
await mobile.screenshot({ path: path.join(states, 'mobile-menu.png') })
await mobile.close()

const pricing = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 })
await pricing.goto(`${base}/pricing.html`)
await settle(pricing)
const billing = pricing.locator('[x-data*="isAnnual"]').first()
await billing.scrollIntoViewIfNeeded()
await billing.locator('button, input, label').first().click()
await pricing.waitForTimeout(250)
await billing.screenshot({ path: path.join(states, 'pricing-billing.png') })
await pricing.close()

for (const slug of ['blog', 'help']) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 })
  await page.goto(`${base}/${slug}.html`)
  await settle(page)
  const panel = page.locator('[x-data*="category"], [x-data*="page:"]').last()
  await panel.scrollIntoViewIfNeeded()
  await panel.locator('button, a').nth(1).click()
  await page.waitForTimeout(250)
  await panel.screenshot({ path: path.join(states, `${slug}-filter.png`) })
  await page.close()
}

for (const slug of ['contact', 'signin']) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 })
  await page.goto(`${base}/${slug}.html`)
  await settle(page)
  const form = page.locator('form').first()
  await form.locator('input').first().focus()
  await form.screenshot({ path: path.join(states, `${slug}-focus.png`) })
  await form.locator('button').first().click()
  await page.waitForTimeout(150)
  await form.screenshot({ path: path.join(states, `${slug}-validity.png`) })
  await page.close()
}

await fs.writeFile(path.join(output, 'measurements.json'), `${JSON.stringify(measurements, null, 2)}\n`)
await browser.close()
