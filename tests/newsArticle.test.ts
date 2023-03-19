import { expect, test } from '@playwright/test';

const newsArticleData = {"@context":"https://schema.org","@type":"NewsArticle","keywords":"prayuth,taksin","description":"This is a mighty good description of this article.","mainEntityOfPage":{"@type":"WebPage","@id":"https://example.com/article"},"headline":"Article headline","image":["https://example.com/photos/1x1/photo.jpg","https://example.com/photos/4x3/photo.jpg","https://example.com/photos/16x9/photo.jpg"],"articleSection":"politic","dateCreated":"2015-02-05T08:00:00+08:00","datePublished":"2015-02-05T08:00:00+08:00","dateModified":"2015-02-05T09:00:00+08:00","author":{"@type":"Person","name":"Jane Blogs"},"publisher":{"@type":"Organization","name":"Gary Meehan","logo":{"@type":"ImageObject","url":"https://www.example.com/photos/logo.jpg"}},"articleBody":"This is all text for this news article"}

test('NewsArticleJsonLd renders correctly', async ({ page }) => {
  await page.goto('/')
  const element = await page.locator("//script[@key='jsonld-NewsArticle']")
  const jsonLd = await element.innerHTML()

  // remove leading whitespace that shows up in the DOM
  const trimmedJsonLd = jsonLd.trim()

  await expect(trimmedJsonLd).toBe(JSON.stringify(newsArticleData))
})