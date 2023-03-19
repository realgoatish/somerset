import { expect, test } from '@playwright/test';

const webPageData = {"@context":"https://schema.org","@type":"WebPage","@id":"https://www.purpule-fox.io/#corporation","description":"What does the fox say?","lastReviewed":"2021-05-26T05:59:02.085Z","reviewedBy":{"@type":"Person","type":"Person","name":"Garmeeh"}}

test('WebPageJsonLd renders correctly', async ({ page }) => {
  await page.goto('/')
  const element = await page.locator("//script[@key='jsonld-WebPage']")
  const jsonLd = await element.innerHTML()

  // remove leading whitespace that shows up in the DOM
  const trimmedJsonLd = jsonLd.trim()

  await expect(trimmedJsonLd).toBe(JSON.stringify(webPageData))
})