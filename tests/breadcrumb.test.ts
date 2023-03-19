import { expect, test } from '@playwright/test';

const breadcrumbData = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"https://example.com/books","name":"Books"}},{"@type":"ListItem","position":2,"item":{"@id":"https://example.com/books/authors","name":"Authors"}},{"@type":"ListItem","position":3,"item":{"@id":"https://example.com/books/authors/annleckie","name":"Ann Leckie"}},{"@type":"ListItem","position":4,"item":{"@id":"https://example.com/books/authors/ancillaryjustice","name":"Ancillary Justice"}}]}

test('BreadcrumbJsonLd renders correctly', async ({ page }) => {
  await page.goto('/')
  const element = await page.locator("//script[@key='jsonld-breadcrumb']")
  const jsonLd = await element.innerHTML()

  // remove leading whitespace that shows up in the DOM
  const trimmedJsonLd = jsonLd.trim()

  await expect(trimmedJsonLd).toBe(JSON.stringify(breadcrumbData))
})