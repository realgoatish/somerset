import { expect, test } from '@playwright/test';

const corporateContactData = {"@context":"https://schema.org","@type":"Organization","url":"http://www.your-company-site.com","logo":"http://www.example.com/logo.png","contactPoint":[{"telephone":"+1-401-555-1212","contactType":"customer service","email":"customerservice@email.com","areaServed":"US","availableLanguage":["English","Spanish","French"],"@type":"ContactPoint"},{"telephone":"+1-877-746-0909","contactType":"customer service","email":"servicecustomer@email.com","contactOption":"TollFree","availableLanguage":"English","@type":"ContactPoint"},{"telephone":"+1-877-453-1304","contactType":"technical support","contactOption":"TollFree","areaServed":["US","CA"],"availableLanguage":["English","French"],"@type":"ContactPoint"}]}

test('CorporateContactJsonLd renders correctly', async ({ page }) => {
  await page.goto('/')
  const element = await page.locator("//script[@key='jsonld-CorporateContact']")
  const jsonLd = await element.innerHTML()

  // remove leading whitespace that shows up in the DOM
  const trimmedJsonLd = jsonLd.trim()

  await expect(trimmedJsonLd).toBe(JSON.stringify(corporateContactData))
})