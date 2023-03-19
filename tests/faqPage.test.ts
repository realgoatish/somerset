import { expect, test } from '@playwright/test';

const faqPageData = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How long is the delivery time?","acceptedAnswer":{"@type":"Answer","text":"3-5 business days."}},{"@type":"Question","name":"Where can I find information about product recalls?","acceptedAnswer":{"@type":"Answer","text":"Read more on under information."}}]}

test('FaqPageJsonLd renders correctly', async ({ page }) => {
  await page.goto('/')
  const element = await page.locator("//script[@key='jsonld-faq-page']")
  const jsonLd = await element.innerHTML()

  // remove leading whitespace that shows up in the DOM
  const trimmedJsonLd = jsonLd.trim()

  await expect(trimmedJsonLd).toBe(JSON.stringify(faqPageData))
})