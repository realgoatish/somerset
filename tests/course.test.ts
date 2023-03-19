import { expect, test } from '@playwright/test';

const courseData = {"@context":"https://schema.org","@type":"Course","name":"Course Name","description":"Introductory CS course laying out the basics.","provider":{"@type":"Organization","name":"Course Provider","sameAs":"https//www.example.com/provider"}}

test('CourseJsonLd renders correctly', async ({ page }) => {
  await page.goto('/')
  const element = await page.locator("//script[@key='jsonld-course']")
  const jsonLd = await element.innerHTML()

  // remove leading whitespace that shows up in the DOM
  const trimmedJsonLd = jsonLd.trim()

  await expect(trimmedJsonLd).toBe(JSON.stringify(courseData))
})