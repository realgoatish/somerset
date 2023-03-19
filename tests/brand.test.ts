import { expect, test } from '@playwright/test';

const brandData = {"@context":"https://schema.org","@type":"Brand","aggregateRating":{"@type":"AggregateRating","ratingCount":"18","ratingValue":"5"},"@id":"https://www.purpule-fox.io/#corporation","slogan":"What does the fox say?","logo":"https://www.example.com/photos/logo.jpg"}

test('BrandJsonLd renders correctly', async ({ page }) => {
  await page.goto('/')
  const element = await page.locator("//script[@key='jsonld-brand']")
  const jsonLd = await element.innerHTML()

  // remove leading whitespace that shows up in the DOM
  const trimmedJsonLd = jsonLd.trim()

  await expect(trimmedJsonLd).toBe(JSON.stringify(brandData))
})