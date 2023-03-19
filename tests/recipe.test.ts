import { expect, test } from '@playwright/test';

const recipeData = {"@context":"https://schema.org","@type":"Recipe","name":"Party Coffee Cake","description":"This coffee cake is awesome and perfect for parties.","datePublished":"2018-03-10","prepTime":"PT20M","cookTime":"PT30M","totalTime":"PT50M","keywords":"cake for a party, coffee","author":[{"@type":"Person","name":"Jane Blogs"},{"@type":"Person","name":"Mary Stone"}],"image":["https://example.com/photos/1x1/photo.jpg","https://example.com/photos/4x3/photo.jpg","https://example.com/photos/16x9/photo.jpg"],"recipeCategory":"Dessert","recipeCuisine":"American","nutrition":{"@type":"NutritionInformation","calories":"270 calories"},"aggregateRating":{"@type":"AggregateRating","ratingCount":"18","ratingValue":"5"},"video":{"name":"How to make a Party Coffee Cake","description":"This is how you make a Party Coffee Cake.","contentUrl":"http://www.example.com/video123.mp4","embedUrl":"http://www.example.com/videoplayer?video=123","uploadDate":"2018-02-05T08:00:00+08:00","duration":"PT1M33S","expires":"2019-02-05T08:00:00+08:00","regionsAllowed":["IT","NL"],"@type":"VideoObject","thumbnailUrl":["https://example.com/photos/1x1/photo.jpg","https://example.com/photos/4x3/photo.jpg","https://example.com/photos/16x9/photo.jpg"],"hasPart":{"@type":"Clip","name":"Preheat oven","startOffset":30,"url":"http://www.example.com/example?t=30"},"interactionStatistic":{"@type":"InteractionCounter","interactionType":"https://schema.org/WatchAction","userInteractionCount":2347},"publication":{"@type":"BroadcastEvent","isLiveBroadcast":true,"startDate":"2020-10-24T14:00:00+00:00","endDate":"2020-10-24T14:37:14+00:00"}},"recipeIngredient":["2 cups of flour","3/4 cup white sugar","2 teaspoons baking powder","1/2 teaspoon salt","1/2 cup butter","2 eggs","3/4 cup milk"],"recipeInstructions":[{"name":"Preheat","text":"Preheat the oven to 350 degrees F. Grease and flour a 9x9 inch pan.","url":"https://example.com/party-coffee-cake#step1","image":"https://example.com/photos/party-coffee-cake/step1.jpg","@type":"HowToStep"}]}

test('RecipeJsonLd renders correctly', async ({ page }) => {
  await page.goto('/')
  const element = await page.locator("//script[@key='jsonld-recipe']")
  const jsonLd = await element.innerHTML()

  // remove leading whitespace that shows up in the DOM
  const trimmedJsonLd = jsonLd.trim()

  await expect(trimmedJsonLd).toBe(JSON.stringify(recipeData))
})