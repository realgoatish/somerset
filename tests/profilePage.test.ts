import { expect, test } from '@playwright/test';

const profilePageData = {"@context":"https://schema.org","@type":"ProfilePage","lastReviewed":"2014-10-01T19:30","breadcrumb":{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"https://example.com/books","name":"Books"}},{"@type":"ListItem","position":2,"item":{"@id":"https://example.com/books/authors","name":"Authors"}}]}}

test('ProfilePageJsonLd renders correctly', async ({ page }) => {
  await page.goto('/')
  const element = await page.locator("//script[@key='jsonld-ProfilePage']")
  const jsonLd = await element.innerHTML()

  // remove leading whitespace that shows up in the DOM
  const trimmedJsonLd = jsonLd.trim()

  await expect(trimmedJsonLd).toBe(JSON.stringify(profilePageData))
})