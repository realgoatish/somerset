import { expect, test } from '@playwright/test';

const carouselData = {"@context":"https://schema.org","@type":"ItemList","itemListElement":[{"@type":"ListItem","position":"1","url":"http://example.com/peanut-butter-cookies.html"},{"@type":"ListItem","position":"2","url":"http://example.com/triple-chocolate-chunk.html"}]}

test('CarouselJsonLd renders correctly', async ({ page }) => {
  await page.goto('/')
  const element = await page.locator("//script[@key='jsonld-Carousel']")
  const jsonLd = await element.innerHTML()

  // remove leading whitespace that shows up in the DOM
  const trimmedJsonLd = jsonLd.trim()

  await expect(trimmedJsonLd).toBe(JSON.stringify(carouselData))
})