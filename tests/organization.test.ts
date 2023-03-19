import { expect, test } from '@playwright/test';

const organizationData = {"@context":"https://schema.org","@type":"Corporation","@id":"https://www.purpule-fox.io/#corporation","name":"Purple Fox","logo":"https://www.example.com/photos/logo.jpg","url":"https://www.purpule-fox.io/","legalName":"Purple Fox LLC","sameAs":["https://www.orange-fox.com"],"address":{"@type":"PostalAddress","streetAddress":"1600 Saratoga Ave","addressLocality":"San Jose","addressRegion":"CA","postalCode":"95129","addressCountry":"US"}}

test('OrganizationJsonLd renders correctly', async ({ page }) => {
  await page.goto('/')
  const element = await page.locator("//script[@key='jsonld-organization']")
  const jsonLd = await element.innerHTML()

  // remove leading whitespace that shows up in the DOM
  const trimmedJsonLd = jsonLd.trim()

  await expect(trimmedJsonLd).toBe(JSON.stringify(organizationData))
})