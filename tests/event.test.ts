import { expect, test } from '@playwright/test';

const eventData = {"@context":"https://schema.org","@type":"Event","name":"My Event","startDate":"2020-01-23T00:00:00.000Z","endDate":"2020-01-24T00:00:00.000Z","url":"https://example.com/my-event","description":"My event @ my place","location":{"name":"My Place","sameAs":"https://example.com/my-place","address":{"@type":"PostalAddress","streetAddress":"1600 Saratoga Ave","addressLocality":"San Jose","addressRegion":"CA","postalCode":"95129","addressCountry":"US"},"@type":"Place"},"image":["https://example.com/photos/photo.jpg"],"offers":[{"price":"119.99","priceCurrency":"USD","priceValidUntil":"2020-11-05","itemCondition":"https://schema.org/UsedCondition","availability":"https://schema.org/InStock","url":"https://www.example.com/executive-anvil","validFrom":"2020-11-01T00:00:00.000Z","@type":"Offer","seller":{"@type":"Organization","name":"John Doe"}},{"price":"139.99","priceCurrency":"CAD","priceValidUntil":"2020-09-05","itemCondition":"https://schema.org/UsedCondition","availability":"https://schema.org/InStock","url":"https://www.example.ca/executive-anvil","validFrom":"2020-08-05T00:00:00.000Z","@type":"Offer","seller":{"@type":"Organization","name":"John Doe Sr."}}],"performer":[{"name":"Adele","@type":"PerformingGroup"},{"name":"Kira and Morrison","@type":"PerformingGroup"}],"eventStatus":"https://schema.org/EventScheduled","eventAttendanceMode":"https://schema.org/OfflineEventAttendanceMode"}

test('EventJsonLd renders correctly', async ({ page }) => {
  await page.goto('/')
  const element = await page.locator("//script[@key='jsonld-Event']")
  const jsonLd = await element.innerHTML()

  // remove leading whitespace that shows up in the DOM
  const trimmedJsonLd = jsonLd.trim()

  await expect(trimmedJsonLd).toBe(JSON.stringify(eventData))
})