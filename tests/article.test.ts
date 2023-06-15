import { expect, test } from '@playwright/test';

  const articleData = {"@context":"https://schema.org","@type":"Article","datePublished":"2015-02-05T08:00:00+08:00","description":"This is a mighty good description of this article.","mainEntityOfPage":{"@type":"WebPage","@id":"https://example.com/article"},"headline":"Article headline","image":["https://example.com/photos/1x1/photo.jpg","https://example.com/photos/4x3/photo.jpg","https://example.com/photos/16x9/photo.jpg"],"dateModified":"2015-02-05T09:00:00+08:00","author":[{"@type":"Person","name":"Jane Blogs","url":"https://example.com"},{"@type":"Person","name":"Mary Stone","url":"https://example.com"}],"publisher":{"@type":"Organization","name":"Gary Meehan","logo":{"@type":"ImageObject","url":"https://www.example.com/photos/logo.jpg"}},"isAccessibleForFree":true}


test('ArticleJsonLd renders correctly', async ({ page }) => {

  await page.goto('/')
  const element = await page.locator("//script[@key='jsonld-article']")
  const jsonLd = await element.innerHTML()

  // remove leading whitespace that shows up in the DOM
  const trimmedJsonLd = jsonLd.trim()

  await expect(trimmedJsonLd).toBe(JSON.stringify(articleData))
})
