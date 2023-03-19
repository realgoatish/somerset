import { expect, test } from '@playwright/test';

const videoData = {"@context":"https://schema.org","@type":"VideoObject","name":"How to make a Party Coffee Cake","description":"This is how you make a Party Coffee Cake.","uploadDate":"2018-02-05T08:00:00+08:00","contentUrl":"http://www.example.com/video123.mp4","duration":"PT1M33S","embedUrl":"http://www.example.com/videoplayer?video=123","expires":"2019-02-05T08:00:00+08:00","regionsAllowed":["IT","NL"],"thumbnailUrl":["https://example.com/photos/1x1/photo.jpg","https://example.com/photos/4x3/photo.jpg","https://example.com/photos/16x9/photo.jpg"],"hasPart":{"name":"Preheat oven","startOffset":30,"url":"http://www.example.com/example?t=30","@type":"Clip"},"interactionStatistic":{"@type":"InteractionCounter","interactionType":"https://schema.org/WatchAction","userInteractionCount":2347},"publication":{"isLiveBroadcast":true,"startDate":"2020-10-24T14:00:00+00:00","endDate":"2020-10-24T14:37:14+00:00","@type":"BroadcastEvent"}}

test('VideoJsonLd renders correctly', async ({ page }) => {
  await page.goto('/')
  const element = await page.locator("//script[@key='jsonld-Video']")
  const jsonLd = await element.innerHTML()

  // remove leading whitespace that shows up in the DOM
  const trimmedJsonLd = jsonLd.trim()

  await expect(trimmedJsonLd).toBe(JSON.stringify(videoData))
})