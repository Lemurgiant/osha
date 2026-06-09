import { chromium } from 'playwright'
import fs from 'node:fs'

const shotDir = 'C:/Users/Marlon/PROJECTS/shadow/osha/.shots'
fs.mkdirSync(shotDir, { recursive: true })

const browser = await chromium.launch({ args: ['--disable-dev-shm-usage', '--no-sandbox', '--disable-gpu'] })
const page = await browser.newPage({ viewport: { width: 1280, height: 860 } })
const errors = []
page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()) })
page.on('pageerror', (err) => errors.push(String(err)))

await page.goto('http://127.0.0.1:5174/')
await page.waitForSelector('text=SafeOps')
await page.screenshot({ path: `${shotDir}/01-dashboard-dark.png` })

// Toggle theme to light
await page.click('button:has-text("Light Mode")')
await page.waitForTimeout(300)
await page.screenshot({ path: `${shotDir}/02-dashboard-light.png` })
await page.click('button:has-text("Dark Mode")')
await page.waitForTimeout(300)

// Switch through forms
await page.click('button:has-text("Incident & Near-Miss Report")')
await page.waitForTimeout(200)
await page.screenshot({ path: `${shotDir}/03-incident-submissions.png` })

// Switch tabs: Analytics
await page.click('button:has-text("Analytics")')
await page.waitForTimeout(400)
await page.screenshot({ path: `${shotDir}/04-incident-analytics.png` })

// Reports
await page.click('button:has-text("Reports")')
await page.waitForTimeout(300)
await page.screenshot({ path: `${shotDir}/05-incident-reports.png` })

// Alerts
await page.click('button:has-text("Alerts")')
await page.waitForTimeout(300)
await page.screenshot({ path: `${shotDir}/06-incident-alerts.png` })

// Answer Form - check HeroStatBar hidden
await page.click('button:has-text("Answer Form")')
await page.waitForTimeout(300)
const heroVisible = await page.locator('text=Days Without Recordable Injury').count()
await page.screenshot({ path: `${shotDir}/07-incident-answerform.png` })

// Fill the incident form to trigger critical banner
await page.selectOption('select >> nth=0', 'Site B - Riverside Plaza')
await page.fill('input[type="text"] >> nth=0', 'Test Reporter')
await page.selectOption('select >> nth=1', 'Critical')
await page.selectOption('select >> nth=2', 'OSHA Recordable')
await page.fill('textarea', 'Automated verification test description of the incident scenario for screenshot purposes.')
await page.waitForTimeout(200)
await page.screenshot({ path: `${shotDir}/08-incident-form-banner.png` })

// Submit
await page.click('button:has-text("Submit Incident")')
await page.waitForTimeout(300)
await page.screenshot({ path: `${shotDir}/09-incident-success.png` })

// Go to submissions to confirm new row appears
await page.click('button:has-text("Submissions")')
await page.waitForTimeout(300)
await page.screenshot({ path: `${shotDir}/10-incident-submissions-after.png` })

console.log('HERO_VISIBLE_ON_ANSWER_FORM:', heroVisible)
console.log('CONSOLE_ERRORS:', JSON.stringify(errors))

await browser.close()
