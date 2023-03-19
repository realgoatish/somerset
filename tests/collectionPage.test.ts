import { expect, test } from '@playwright/test';

const collectionPageData = {"@context":"https://schema.org","@type":"CollectionPage","name":"Resistance 3: Fall of Man","hasPart":[{"about":"Britten Four Sea Interludes and Passacaglia from Peter Grimes","author":"John Doe","name":"Schema.org Ontology","datePublished":"2021-03-09","audience":"Internet","keywords":"schema","thumbnailUrl":"https://i.ytimg.com/vi/eXSJ3PO9Tas/hqdefault.jpg","image":"hqdefault.jpg","@type":"CreativeWork"},{"about":"Shostakovich Symphony No. 7 (Leningrad)","author":"John Smith","name":"Creative work name","datePublished":"2014-10-01T19:30","@type":"CreativeWork"}]}

test('CollectionPageJsonLd renders correctly', async ({ page }) => {
  await page.goto('/')
  const element = await page.locator("//script[@key='jsonld-CollectionPage']")
  const jsonLd = await element.innerHTML()

  // remove leading whitespace that shows up in the DOM
  const trimmedJsonLd = jsonLd.trim()

  await expect(trimmedJsonLd).toBe(JSON.stringify(collectionPageData))
})