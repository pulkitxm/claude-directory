import { chromium } from '../../../../../scripts/record-demos/node_modules/playwright/index.mjs'
import fs from 'node:fs/promises'
import path from 'node:path'

const [base, output] = process.argv.slice(2)
const browser = await chromium.launch({ headless: true })
const pages = ['index', 'podcast', 'subscribe']
const measurements = []

async function settle(page) {
  await page.waitForLoadState('networkidle')
  await page.evaluate(async () => {
    await document.fonts.ready
    for (let y = 0; y < document.documentElement.scrollHeight; y += window.innerHeight * 0.8) {
      window.scrollTo(0, y)
      await new Promise(resolve => setTimeout(resolve, 70))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(650)
}

for (const slug of pages) {
  for (const width of [390, 768, 1280]) {
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
const home = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 })
await home.goto(`${base}/index.html`)
await settle(home)
const filters = home.locator('[x-data*="category"]')
await filters.scrollIntoViewIfNeeded()
for (const category of [1, 2, 3, 4]) {
  await filters.locator('button').nth(category - 1).click()
  await home.waitForTimeout(250)
  await filters.screenshot({ path: path.join(states, `filter-${category}.png`) })
}
await home.close()

const player = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 })
await player.goto(`${base}/podcast.html`)
await settle(player)
const controls = player.locator('[x-data]').first()
await controls.locator('button').first().click()
await player.waitForTimeout(400)
await controls.screenshot({ path: path.join(states, 'audio-playing.png') })
await player.close()

const subscribe = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 })
await subscribe.goto(`${base}/subscribe.html`)
await settle(subscribe)
const email = subscribe.locator('input').first()
await email.focus()
await subscribe.screenshot({ path: path.join(states, 'subscribe-focus.png') })
await email.locator('xpath=..').locator('button').click()
await subscribe.waitForTimeout(150)
await subscribe.screenshot({ path: path.join(states, 'subscribe-validity.png') })
await subscribe.close()

await fs.writeFile(path.join(output, 'measurements.json'), `${JSON.stringify(measurements, null, 2)}\n`)
await browser.close()
