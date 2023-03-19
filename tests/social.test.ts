import { expect, test } from '@playwright/test';

const socialData = {"@context":"https://schema.org","@type":"Person","name":"your name","url":"http://www.your-site.com","sameAs":["http://www.facebook.com/your-profile","http://instagram.com/yourProfile","http://www.linkedin.com/in/yourprofile","http://plus.google.com/your_profile"]}

test('SocialJsonLd renders correctly', async ({ page }) => {
  await page.goto('/')
  const element = await page.locator("//script[@key='jsonld-social']")
  const jsonLd = await element.innerHTML()

  // remove leading whitespace that shows up in the DOM
  const trimmedJsonLd = jsonLd.trim()

  await expect(trimmedJsonLd).toBe(JSON.stringify(socialData))
})