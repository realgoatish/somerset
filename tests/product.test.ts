import { expect, test } from '@playwright/test';

const productData = {"@context":"https://schema.org","@type":"Product","description":"Sleeker than ACME&apos;s Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height.","mpn":"925872","color":"blue","material":"steel","slogan":"For the business traveller looking for something to drop from a height.","disambiguatingDescription":"Executive Anvil, perfect for the business traveller.","productionDate":"2015-02-05T08:00:00+08:00","purchaseDate":"2015-02-06T08:00:00+08:00","releaseDate":"2014-02-05T08:00:00+08:00","award":"Best Executive Anvil Award.","image":["https://example.com/photos/1x1/photo.jpg","https://example.com/photos/4x3/photo.jpg","https://example.com/photos/16x9/photo.jpg"],"brand":{"@type":"Brand","name":"ACME"},"review":[{"datePublished":"2017-01-06T03:37:40Z","reviewBody":"This is my favorite product yet! Thanks Nate for the example products and reviews.","name":"So awesome!!!","@type":"Review","author":{"@type":"Person","name":"Jim"},"reviewRating":{"bestRating":"5","ratingValue":"5","worstRating":"1","@type":"Rating"},"publisher":{"@type":"Organization","name":"TwoVit"}}],"aggregateRating":{"@type":"AggregateRating","reviewCount":"89","ratingValue":"4.4"},"manufacturer":{"@type":"Organization","name":"Gary Meehan","logo":{"@type":"ImageObject","url":"https://www.example.com/photos/logo.jpg"}},"offers":[{"price":"119.99","priceCurrency":"USD","priceValidUntil":"2020-11-05","itemCondition":"https://schema.org/UsedCondition","availability":"https://schema.org/InStock","url":"https://www.example.com/executive-anvil","@type":"Offer","seller":{"@type":"Organization","name":"Executive Objects"}},{"price":"139.99","priceCurrency":"CAD","priceValidUntil":"2020-09-05","itemCondition":"https://schema.org/UsedCondition","availability":"https://schema.org/InStock","url":"https://www.example.ca/executive-anvil","@type":"Offer","seller":{"@type":"Organization","name":"Executive Objects"}}],"name":"Executive Anvil"}

test('ProductJsonLd renders correctly', async ({ page }) => {
  await page.goto('/')
  const element = await page.locator("//script[@key='jsonld-Product']")
  const jsonLd = await element.innerHTML()

  // remove leading whitespace that shows up in the DOM
  const trimmedJsonLd = jsonLd.trim()

  await expect(trimmedJsonLd).toBe(JSON.stringify(productData))
})