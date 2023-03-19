import { expect, test } from '@playwright/test';

const videoGameData = {"@context":"https://schema.org","@type":"VideoGame","name":"Red Dead Redemption 2","url":"https://example.com/rdr2-game","description":"Arthur Morgan and the Van der Linde gang are outlaws on the run. With federal agents and the best bounty hunters in the nation massing on their heels, the gang must rob, steal and fight their way across the rugged heartland of America in order to survive.","applicationCategory":"Game","datePublished":"2019-02-05T08:00:00+08:00","keywords":"outlaw, gang, federal agents","playMode":"SinglePlayer","processorRequirements":"4 GHz","memoryRequirements":"16 Gb","aggregateRating":{"@type":"AggregateRating","ratingCount":"684","reviewCount":"89","bestRating":"100","ratingValue":"44"},"review":[{"datePublished":"2017-01-06T03:37:40Z","reviewBody":"Iki gozum.","name":"Rica ederim.","@type":"Review","author":{"@type":"Person","name":"AhmetKaya"},"reviewRating":{"bestRating":"5","ratingValue":"5","worstRating":"1","@type":"Rating"},"publisher":{"@type":"Organization","name":"Gam Production"}}],"image":{"@type":"ImageObject","url":"https://example.com/photos/1x1/photo.jpg"},"producer":{"@type":"Organization","sameAs":"https//www.example.com/producer","name":"Rockstar Games"},"offers":[{"price":"119.99","priceCurrency":"USD","priceValidUntil":"2020-11-05","availability":"https://schema.org/InStock","url":"https://example.net/rdr2-game","@type":"Offer","seller":{"@type":"Organization","name":"Executive Gaming"}},{"price":"139.99","priceCurrency":"CAD","priceValidUntil":"2020-09-05","availability":"https://schema.org/InStock","url":"https://example.org/rdr2-game","@type":"Offer","seller":{"@type":"Organization","name":"Executive Gaming"}}],"operatingSystem":"windows","gamePlatform":["PC game","PlayStation 4"],"translator":["Translator 1","Translator 2"],"inLanguage":["English","Kurdish"],"publisher":"Vertical Games"}

test('VideoGameJsonLd renders correctly', async ({ page }) => {
  await page.goto('/')
  const element = await page.locator("//script[@key='jsonld-VideoGame']")
  const jsonLd = await element.innerHTML()

  // remove leading whitespace that shows up in the DOM
  const trimmedJsonLd = jsonLd.trim()

  await expect(trimmedJsonLd).toBe(JSON.stringify(videoGameData))
})