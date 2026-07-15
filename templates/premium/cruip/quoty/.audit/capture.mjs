import { chromium } from '../../../../../scripts/record-demos/node_modules/playwright/index.mjs'
import fs from 'node:fs/promises'
import path from 'node:path'

const [base, output] = process.argv.slice(2)
const browser = await chromium.launch({ headless: true })
const pages = ['index', 'details', 'contact', 'pay']
const measurements = []

for (const slug of pages) {
  for (const width of [390, 768, 1280]) {
    for (const theme of ['light', 'dark']) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 })
      await page.addInitScript(value => localStorage.setItem('dark-mode', value), theme === 'dark' ? 'true' : 'false')
      await page.goto(`${base}/${slug}.html`)
      await page.waitForLoadState('networkidle')
      await page.evaluate(() => document.fonts.ready)
      await page.waitForTimeout(400)
      const dimensions = await page.evaluate(() => ({ width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight }))
      const directory = path.join(output, 'responsive')
      await fs.mkdir(directory, { recursive: true })
      await page.screenshot({ path: path.join(directory, `${slug}-${width}-${theme}.png`), fullPage: true })
      measurements.push({ slug, viewport: width, theme, ...dimensions })
      await page.close()
    }
  }
}

const states = path.join(output, 'states')
await fs.mkdir(states, { recursive: true })
const home = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 })
await home.goto(`${base}/index.html`)
await home.waitForLoadState('networkidle')
const accordion = home.locator('[x-data*="expanded"]').first()
await accordion.locator('button').click()
await home.waitForTimeout(250)
await accordion.screenshot({ path: path.join(states, 'accordion-open.png') })
await home.locator('label[for="light-switch"]').click()
await home.waitForTimeout(100)
await home.screenshot({ path: path.join(states, 'theme-toggle.png'), fullPage: true })
await home.close()

const pay = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 })
await pay.goto(`${base}/pay.html`)
await pay.waitForLoadState('networkidle')
const methods = pay.locator('[x-data*="card"]')
await methods.locator('button').nth(1).click()
await pay.waitForTimeout(250)
await methods.screenshot({ path: path.join(states, 'paypal.png') })
await pay.close()

const contact = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 })
await contact.goto(`${base}/contact.html`)
await contact.waitForLoadState('networkidle')
const form = contact.locator('form')
await form.locator('input').first().focus()
await form.screenshot({ path: path.join(states, 'contact-focus.png') })
await form.locator('button').click()
await contact.waitForTimeout(150)
await form.screenshot({ path: path.join(states, 'contact-validity.png') })
await contact.close()

await fs.writeFile(path.join(output, 'measurements.json'), `${JSON.stringify(measurements, null, 2)}\n`)
await browser.close()
