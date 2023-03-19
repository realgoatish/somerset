import { expect, test } from '@playwright/test';

const imageData = {"@context":"https://schema.org","@type":"ImageObject","contentUrl":"http://www.example.com/images/image.png","creator":{"@type":"Person","name":"Jane Doe"},"creditText":"Jane Doe","copyrightNotice":"© Jane Doe","license":"http://www.example.com/license","acquireLicensePage":"http://www.example.com/acquire-license"}

test('ImageJsonLd renders correctly', async ({ page }) => {
  await page.goto('/')
  const element = await page.locator("//script[@key='jsonld-image']")
  const jsonLd = await element.innerHTML()

  // remove leading whitespace that shows up in the DOM
  const trimmedJsonLd = jsonLd.trim()

  await expect(trimmedJsonLd).toBe(JSON.stringify(imageData))
})