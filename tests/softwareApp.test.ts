import { expect, test } from '@playwright/test';

const softwareAppData = {"@context":"https://schema.org","@type":"SoftwareApplication","name":"Angry Birds","applicationCategory":"GameApplication","operatingSystem":"ANDROID","offers":{"@type":"Offer","price":"1.00","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","reviewCount":"8864","ratingValue":"4.6"}}

test('SoftwareAppJsonLd renders correctly', async ({ page }) => {
  await page.goto('/')
  const element = await page.locator("//script[@key='jsonld-SoftwareApp']")
  const jsonLd = await element.innerHTML()

  // remove leading whitespace that shows up in the DOM
  const trimmedJsonLd = jsonLd.trim()

  await expect(trimmedJsonLd).toBe(JSON.stringify(softwareAppData))
})