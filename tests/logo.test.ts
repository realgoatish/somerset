import { expect, test } from '@playwright/test';

const logoData = {"@context":"https://schema.org","@type":"Organization","logo":"http://www.your-site.com/images/logo.jpg","url":"http://www.your-site.com"}

test('LogoJsonLd renders correctly', async ({ page }) => {
  await page.goto('/')
  const element = await page.locator("//script[@key='jsonld-Logo']")
  const jsonLd = await element.innerHTML()

  // remove leading whitespace that shows up in the DOM
  const trimmedJsonLd = jsonLd.trim()

  await expect(trimmedJsonLd).toBe(JSON.stringify(logoData))
})