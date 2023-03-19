import { expect, test } from '@playwright/test';

const jobPostingData = {"@context":"https://schema.org","@type":"JobPosting","datePosted":"2020-01-06T03:37:40Z","description":"Company is looking for a software developer....","title":"Job Title","validThrough":"2020-01-06","employmentType":"FULL_TIME","jobLocationType":"TELECOMMUTE","baseSalary":{"@type":"MonetaryAmount","currency":"EUR","value":{"@type":"QuantitativeValue","unitText":"HOUR","value":40}},"hiringOrganization":{"@type":"Organization","name":"company name","sameAs":"www.company-website-url.dev"},"jobLocation":{"@type":"Place","address":{"@type":"PostalAddress","addressCountry":"France","addressLocality":"Paris","addressRegion":"Ile-de-France","postalCode":"75001","streetAddress":"17 street address"}},"applicantLocationRequirements":{"@type":"Country","name":"FR"},"experienceRequirements":{"@type":"OccupationalExperienceRequirements","monthsOfExperience":12},"educationRequirements":{"@type":"EducationalOccupationalCredential","credentialCategory":"high school"},"experienceInPlaceOfEducation":true}

test('JobPostingJsonLd renders correctly', async ({ page }) => {
  await page.goto('/')
  const element = await page.locator("//script[@key='jsonld-JobPosting']")
  const jsonLd = await element.innerHTML()

  // remove leading whitespace that shows up in the DOM
  const trimmedJsonLd = jsonLd.trim()

  await expect(trimmedJsonLd).toBe(JSON.stringify(jobPostingData))
})