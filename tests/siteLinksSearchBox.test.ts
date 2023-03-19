import { expect, test } from '@playwright/test';

const siteLinksSearchBoxData = {"@context":"https://schema.org","@type":"WebSite","url":"https://www.example.com","potentialAction":[{"@type":"SearchAction","target":"https://query.example.com/search?q={search_term_string}","query-input":"required name=search_term_string"},{"@type":"SearchAction","target":"android-app://com.example/https/query.example.com/search/?q={search_term_string}","query-input":"required name=search_term_string"}]}

test('SiteLinksSearchBoxJsonLd renders correctly', async ({ page }) => {
  await page.goto('/')
  const element = await page.locator("//script[@key='jsonld-siteLinksSearchBox']")
  const jsonLd = await element.innerHTML()

  // remove leading whitespace that shows up in the DOM
  const trimmedJsonLd = jsonLd.trim()

  await expect(trimmedJsonLd).toBe(JSON.stringify(siteLinksSearchBoxData))
})