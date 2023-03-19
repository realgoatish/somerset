import { expect, test } from '@playwright/test';

const datasetData = {"@context":"https://schema.org","@type":"Dataset","description":"The description needs to be at least 50 characters long","name":"name of the dataset","license":"https//www.example.com"}

test('DatasetJsonLd renders correctly', async ({ page }) => {
  await page.goto('/')
  const element = await page.locator("//script[@key='jsonld-dataset']")
  const jsonLd = await element.innerHTML()

  // remove leading whitespace that shows up in the DOM
  const trimmedJsonLd = jsonLd.trim()

  await expect(trimmedJsonLd).toBe(JSON.stringify(datasetData))
})