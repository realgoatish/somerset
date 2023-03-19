import { expect, test } from '@playwright/test';

const howToData = {"@context":"https://schema.org","@type":"HowTo","name":"How to tile a kitchen backsplash","totalTime":"P2D","image":{"@type":"ImageObject","url":"https://example.com/photos/1x1/photo.jpg"},"estimatedCost":{"currency":"USD","value":"100","@type":"MonetaryAmount"},"supply":[{"@type":"HowToSupply","name":"tiles"},{"@type":"HowToSupply","name":"thin-set"},{"@type":"HowToSupply","name":"mortar"},{"@type":"HowToSupply","name":"tile grout"},{"@type":"HowToSupply","name":"grout sealer"}],"tool":[{"@type":"HowToTool","name":"notched trowel"},{"@type":"HowToTool","name":"bucket"},{"@type":"HowToTool","name":"large sponge"}],"step":[{"url":"https://example.com/kitchen#step1","name":"Prepare the surfaces","itemListElement":[{"@type":"HowToTip","text":"Turn off the power to the kitchen and then remove everything that is on the wall, such as outlet covers, switchplates, and any other item in the area that is to be tiled."},{"@type":"HowToDirection","text":"Then clean the surface thoroughly to remove any grease or other debris and tape off the area."}],"image":{"@type":"ImageObject","url":"https://example.com/photos/1x1/photo-step1.jpg"},"@type":"HowToStep"}]}

test('HowToJsonLd renders correctly', async ({ page }) => {
  await page.goto('/')
  const element = await page.locator("//script[@key='jsonld-howTo']")
  const jsonLd = await element.innerHTML()

  // remove leading whitespace that shows up in the DOM
  const trimmedJsonLd = jsonLd.trim()

  await expect(trimmedJsonLd).toBe(JSON.stringify(howToData))
})