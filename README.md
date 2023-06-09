# Somerset

Literally just [Next SEO](https://github.com/garmeeh/next-seo) for SvelteKit.

### Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Usage](#usage)
  - [Setup](#setup)
  - [Add SEO to Page](#add-seo-to-page)
  - [Handling Global SEO Data](#handling-global-seo-data)
  - [Somerset Options](#somerset-options)
    - [Title Template](#title-template)
    - [Default Title](#default-title)
    - [No Index](#no-index)
    - [No Follow](#no-follow)
    - [robotsProps](#robotsprops)
    - [Twitter](#twitter)
    - [facebook](#facebook)
    - [Canonical URL](#canonical-url)
    - [Alternate](#alternate)
    - [Additional Meta Tags](#additional-meta-tags)
    - [Additional Link Tags](#additional-link-tags)
- [Open Graph](#open-graph)
  - [Open Graph Examples](#open-graph-examples)
    - [Basic](#basic)
    - [Video](#video)
    - [Audio](#audio)
    - [Article](#article)
    - [Book](#book)
    - [Profile](#profile)
- [JSON-LD](#json-ld)
    - [JSON-LD Security](#json-ld-security)
    - [Handling multiple instances](#handling-multiple-instances)
  - [Article](#article-1)
  - [Breadcrumb](#breadcrumb)
  - [Blog](#blog)
  - [Recipe](#recipe)
  - [Sitelinks Search Box](#sitelinks-search-box)
  - [Course](#course)
  - [Dataset](#dataset)
  - [Corporate Contact](#corporate-contact)
  - [FAQ Page](#faq-page)
  - [How-to](#how-to)
  - [Job Posting](#job-posting)
  - [Local Business](#local-business)
  - [Logo](#logo)
  - [Product](#product)
  - [Social Profile](#social-profile)
  - [News Article](#news-article)
  - [Video](#video-1)
  - [VideoGame](#videogame)
  - [Event](#event)
  - [Q&A](#qa)
  - [Collection Page](#collection-page)
  - [Profile page](#profile-page)
  - [Carousel](#carousel)
    - [Default (Summary List)](#default-summary-list)
    - [Course](#course-1)
    - [Movie](#movie)
    - [Recipe](#recipe-1)
  - [Software App](#software-app)
  - [Organization](#organization)
  - [Brand](#brand)
  - [WebPage](#webpage)
  - [Image Metadata](#image-metadata)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Usage

`Somerset` works by including it on pages where you would like SEO attributes to be added and passing it props to render OpenGraph/Meta tags. It also offers components for rendering JSON-LD.

### Setup

First, install it:

```bash
npm install somerset
```

or

```bash
yarn add somerset
```

### Add SEO to Page

Then you need to import `Somerset` and add the desired properties. This will render out the tags in the `<head>` for SEO. At a bare minimum, you should add a title and description.

**Example with just title and description:**

```svelte
<script>

  import { Somerset } from 'somerset';

</script>

<Somerset
  title="Simple Usage Example"
  description="A short description goes here."
/>
<p>Simple Usage</p>

```

But `Somerset` gives you many more options that you can add. See below for a typical example of a page.

**Typical page example:**

```svelte
<script>

  import { Somerset } from 'somerset';

</script>

<Somerset
  title="Using More of Config"
  description="This example uses more of the available config options."
  canonical="https://www.canonical.ie/"
  openGraph={{
    url: 'https://www.url.ie/a',
    title: 'Open Graph Title',
    description: 'Open Graph Description',
    images: [
      {
        url: 'https://www.example.ie/og-image-01.jpg',
        width: 800,
        height: 600,
        alt: 'Og Image Alt',
        type: 'image/jpeg',
      },
      {
        url: 'https://www.example.ie/og-image-02.jpg',
        width: 900,
        height: 800,
        alt: 'Og Image Alt Second',
        type: 'image/jpeg',
      },
      { url: 'https://www.example.ie/og-image-03.jpg' },
      { url: 'https://www.example.ie/og-image-04.jpg' },
    ],
    siteName: 'SiteName',
  }}
  twitter={{
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  }}
/>
<p>SEO Added to Page</p>
```

**A note on Twitter Tags**

Props `cardType`, `site`, `handle` are equivalent to `twitter:card`, `twitter:site`, `twitter:creator`. Documentation can be found [here](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary).

Twitter will read the `og:title`, `og:image` and `og:description` tags for their card. `somerset` omits `twitter:title`, `twitter:image` and `twitter:description` to avoid duplication.

Some tools may report this an error. If you want to add these tags, you can do so via the `additionalMetaTags` [prop](#additional-meta-tags)

### Handling Global SEO Data

`somerset` doesn't offer something equivalent to `next-seo`'s `DefaultSeo` component. `somerset` uses simple JavaScript template strings to render `<head>` tags, so it can't currently do per-page overrides of global defaults. I recommend using the `Somerset` component to set all the meta & openGraph tags you want on each page. 

You can still centrally manage your global SEO data by passing it "downward" from a `+layout.svelte` page & feeding it to the `Somerset` component on each page. Here's an example of how this might look with data coming from a CMS:

```svelte
<!-- MyPage.svelte -->
<script>

  import { Somerset } from 'somerset'

  export let data;

  const { pageSeo, globalSeo } = data;

</script>

<Somerset
  title={pageSeo.title}
  description={pageSeo.description}
  canonical={`${globalSeo.url}${data.slug}`}
  openGraph={{
    type: 'website',
    url: `${globalSeo.url}${data.slug}`,
    title: pageSeo.openGraph.title,
    description: pageSeo.openGraph.description,
    locale: 'en_US',
    siteName: globalSeo.name,
    images: [
      {
        url: pageSeo.openGraph.image.url,
        width: 1200,
        height: 630,
	alt: pageSeo.openGraph.image.alt
      }
    ]
  }}
/>
```

### Somerset Options

| Property                           | Type                    | Description                                                                                                                                                                          |
| ---------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `titleTemplate`                    | string                  | Allows you to set default title template that will be added to your title [More Info](#title-template)                                                                               |
| `title`                            | string                  | Set the meta title of the page                                                                                                                                                       |
| `defaultTitle`                     | string                  | If no title is set on a page, this string will be used instead of an empty `titleTemplate` [More Info](#default-title)                                                               |
| `noindex`                          | boolean (default false) | Sets whether page should be indexed or not [More Info](#no-index)                                                                                                                    |
| `nofollow`                         | boolean (default false) | Sets whether page should be followed or not [More Info](#no-follow)                                                                                                                  |
| `robotsProps`                      | Object                  | Set the more meta information for the `X-Robots-Tag` [More Info](#robotsprops)                                                                                                       |
| `description`                      | string                  | Set the page meta description                                                                                                                                                        |
| `canonical`                        | string                  | Set the page canonical url                                                                                                                                                           |
| `mobileAlternate.media`            | string                  | Set what screen size the mobile website should be served from                                                                                                                        |
| `mobileAlternate.href`             | string                  | Set the mobile page alternate url                                                                                                                                                    |
| `languageAlternates`               | array                   | Set the language of the alternate urls. Expects array of objects with the shape: `{ hrefLang: string, href: string }`                                                                |
| `themeColor`                       | string                  | Indicates a suggested color that user agents should use to customize the display of the page or of the surrounding user interface. Must contain a valid CSS color                    |
| `additionalMetaTags`               | array                   | Allows you to add a meta tag that is not documented here. [More Info](#additional-meta-tags)                                                                                         |
| `additionalLinkTags`               | array                   | Allows you to add a link tag that is not documented here. [More Info](#additional-link-tags)                                                                                         |
| `twitter.cardType`                 | string                  | The card type, which will be one of `summary`, `summary_large_image`, `app`, or `player`                                                                                             |
| `twitter.site`                     | string                  | @username for the website used in the card footer                                                                                                                                    |
| `twitter.handle`                   | string                  | @username for the content creator / author (outputs as `twitter:creator`)                                                                                                            |
| `facebook.appId`                   | string                  | Used for Facebook Insights, you must add a facebook app ID to your page to for it [More Info](#facebook)                                                                             |
| `openGraph.url`                    | string                  | The canonical URL of your object that will be used as its permanent ID in the graph                                                                                                  |
| `openGraph.type`                   | string                  | The type of your object. Depending on the type you specify, other properties may also be required [More Info](#open-graph)                                                           |
| `openGraph.title`                  | string                  | The open graph title, this can be different than your meta title.                                                                                                                    |
| `openGraph.description`            | string                  | The open graph description, this can be different than your meta description.                                                                                                        |
| `openGraph.images`                 | array                   | An array of images (object) to be used by social media platforms, slack etc as a preview. If multiple supplied you can choose one when sharing. [See Examples](#open-graph-examples) |
| `openGraph.videos`                 | array                   | An array of videos (object)                                                                                                                                                          |
| `openGraph.locale`                 | string                  | The locale the open graph tags are marked up in. Of the format language_TERRITORY. Default is en_US.                                                                                 |
| `openGraph.siteName`               | string                  | If your object is part of a larger web site, the name which should be displayed for the overall site.                                                                                |
| `openGraph.profile.firstName`      | string                  | Person's first name.                                                                                                                                                                 |
| `openGraph.profile.lastName`       | string                  | Person's last name.                                                                                                                                                                  |
| `openGraph.profile.username`       | string                  | Person's username.                                                                                                                                                                   |
| `openGraph.profile.gender`         | string                  | Person's gender.                                                                                                                                                                     |
| `openGraph.book.authors`           | string[]                | Writers of the article. [See Examples](#open-graph-examples)                                                                                                                         |
| `openGraph.book.isbn`              | string                  | The [ISBN](https://en.wikipedia.org/wiki/International_Standard_Book_Number)                                                                                                         |
| `openGraph.book.releaseDate`       | datetime                | The date the book was released.                                                                                                                                                      |
| `openGraph.book.tags`              | string[]                | Tag words associated with this book.                                                                                                                                                 |
| `openGraph.article.publishedTime`  | datetime                | When the article was first published. [See Examples](#open-graph-examples)                                                                                                           |
| `openGraph.article.modifiedTime`   | datetime                | When the article was last changed.                                                                                                                                                   |
| `openGraph.article.expirationTime` | datetime                | When the article is out of date after.                                                                                                                                               |
| `openGraph.article.authors`        | string[]                | Writers of the article.                                                                                                                                                              |
| `openGraph.article.section`        | string                  | A high-level section name. E.g. Technology                                                                                                                                           |
| `openGraph.article.tags`           | string[]                | Tag words associated with this article.                                                                                                                                              |

#### Title Template

Replaces `%s` with your title string

```js
title = 'This is my title';
titleTemplate = 'Somerset | %s';
// outputs: Somerset | This is my title
```

```js
title = 'This is my title';
titleTemplate = '%s | Somerset';
// outputs: This is my title | Somerset
```

#### Default Title

```js
title = undefined;
titleTemplate = 'Somerset | %s';
defaultTitle = 'Somerset';
// outputs: Somerset
```

#### No Index

Setting this to `true` will set `noindex,follow` (to set `nofollow`, please refer to [`nofollow`](#no-follow)). This works on a page by page basis. This property works in tandem with the `nofollow` property and together they populate the `robots` meta tag.

**Note:** If you want to set all pages to `noindex`, do so in your `+layout.svelte`. Just be aware that you can not override this at the page level (it would only produce another `robots` tag). 

**Example No Index on a single page:**

If you have a single page that you want no indexed you can achieve this by:

```svelte
<script>

  import { Somerset } from 'somerset';

</script>

<Somerset noindex={true} />
<p>This page is no indexed</p>

<!-- 
<meta name="robots" content="noindex,follow"> 
-->

```

#### No Follow

Setting this to `true` will set `index,nofollow` (to set `noindex`, please refer to [`noindex`](#no-index)). This works on a page by page basis. This property works in tandem with the `noindex` property and together they populate the `robots` meta tag.

**Note:** If you want to set all pages to `nofollow`, do so in your `+layout.svelte`. Just be aware that you can not override this at the page level (it would only produce another `robots` tag). 

**Example No Follow on a single page:**

If you have a single page that you want no followed you can achieve this by:

```svelte
<script>

  import { Somerset } from 'somerset';

</script>

<Somerset nofollow={true} />
<p>This page is no followed</p>

<!-- 
<meta name="robots" content="index,nofollow"> 
-->
```

| `noindex` | `nofollow` | `meta` content of `robots` |
| --------- | ---------- | -------------------------- |
| --        | --         | `index,follow` (default)   |
| false     | false      | `index,follow`             |
| true      | --         | `noindex,follow`           |
| true      | false      | `noindex,follow`           |
| --        | true       | `index,nofollow`           |
| false     | true       | `index,nofollow`           |
| true      | true       | `noindex,nofollow`         |

#### robotsProps

In addition to `index, follow` the `robots` meta tag accepts more properties to archive a more accurate crawling and serve better snippets for SEO bots that crawl your page.

Example:

```svelte
<script>

import { Somerset } from 'somerset';

</script>

<Somerset
  robotsProps={{
    nosnippet: true,
    notranslate: true,
    noimageindex: true,
    noarchive: true,
    maxSnippet: -1,
    maxImagePreview: 'none',
    maxVideoPreview: -1,
  }}
/>
<p>Additional robots props in Somerset!!</p>

<!--
<meta name="robots" content="index,follow,nosnippet,max-snippet:-1,max-image-preview:none,noarchive,noimageindex,max-video-preview:-1,notranslate">
-->
```

**Available properties**

| Property            | Type                      | Description                                                                                                                                                                                     |
| ------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `noarchive`         | boolean                   | Do not show a [cached link](https://support.google.com/websearch/answer/1687222) in search results.                                                                                             |
| `nosnippet`         | boolean                   | Do not show a text snippet or video preview in the search results for this page.                                                                                                                |
| `max-snippet`       | number                    | Use a maximum of [number] characters as a textual snippet for this search result. [Read more](https://developers.google.com/search/reference/robots_meta_tag?hl=en-GB#directives)               |
| `max-image-preview` | 'none','standard','large' | Set the maximum size of an image preview for this page in a search results.                                                                                                                     |
| `max-video-preview` | number                    | Use a maximum of [number] seconds as a video snippet for videos on this page in search results. [Read more](https://developers.google.com/search/reference/robots_meta_tag?hl=en-GB#directives) |
| `notranslate`       | boolean                   | Do not offer translation of this page in search results.                                                                                                                                        |
| `noimageindex`      | boolean                   | Do not index images on this page.                                                                                                                                                               |
| `unavailable_after` | string                    | Do not show this page in search results after the specified date/time. The date/time must be specified in a widely adopted format including, but not limited to RFC 822, RFC 850, and ISO 8601. |

For more reference about the `X-Robots-Tag` visit [Google Search Central - Control Crawling and Indexing](https://developers.google.com/search/reference/robots_meta_tag?hl=en-GB#directives)

#### Twitter

Twitter will read the `og:title`, `og:image` and `og:description` tags for their card, this is why `somerset` omits `twitter:title`, `twitter:image` and `twitter:description` so not to duplicate.

Some tools may report this an error. If you want to add these tags, you can do so via the `additionalMetaTags` [prop](#additional-meta-tags)

#### facebook

```jsx
facebook={{
  appId: '1234567890',
}}
```

Add this to your `facebook` prop object to include the fb:app_id meta if you need to enable Facebook insights for your site. Information regarding this can be found in facebook's documentation

#### Canonical URL

Add this on a page per page basis when you want to consolidate duplicate URLs.

```js
canonical = 'https://www.canonical.ie/';
```

#### Alternate

This link relation is used to indicate a relation between a desktop and a mobile website to search engines.

Example:

```jsx
mobileAlternate={{
  media: 'only screen and (max-width: 640px)',
  href: 'https://m.canonical.ie',
}}
```

```jsx
languageAlternates={[{
  hrefLang: 'de-AT',
  href: 'https://www.canonical.ie/de',
}]}
```

#### Additional Meta Tags

This allows you to add any other meta tags that are not covered in the `config` and
should be used instead of `children` prop.

`content` is required. Then either `name`, `property` or `httpEquiv`. (Only one on each)

Example:

```js
additionalMetaTags={[{
  property: 'dc:creator',
  content: 'Jane Doe'
}, {
  name: 'application-name',
  content: 'Somerset'
}, {
  httpEquiv: 'x-ua-compatible',
  content: 'IE=edge; chrome=1'
}]}
```

Invalid Examples:

These are invalid as they contain more than one of `name`, `property` and `httpEquiv` on the same entry.

```js
additionalMetaTags={[{
  property: 'dc:creator',
  name: 'dc:creator',
  content: 'Jane Doe'
}, {
  property: 'application-name',
  httpEquiv: 'application-name',
  content: 'Somerset'
}]}
```

#### Additional Link Tags

This allows you to add any other link tags that are not covered in the `config`.

`rel` and `href` is required.

Example:

```js
additionalLinkTags={[
  {
    rel: 'icon',
    href: 'https://www.test.ie/favicon.ico',
  },
  {
    rel: 'apple-touch-icon',
    href: 'https://www.test.ie/touch-icon-ipad.jpg',
    sizes: '76x76'
  },
  {
    rel: 'manifest',
    href: '/manifest.json'
  },
  {
    rel: 'preload',
    href: 'https://www.test.ie/font/sample-font.woof2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous'
  }
]}
```

it will result in this being rendered:

```html
<link rel="icon" href="https://www.test.ie/favicon.ico" />
<link
  rel="apple-touch-icon"
  href="https://www.test.ie/touch-icon-ipad.jpg"
  sizes="76x76"
/>
<link rel="manifest" href="/manifest.json" />
<link
  rel="preload"
  href="https://www.test.ie/font/sample-font.woof2"
  as="font"
  type="font/woff2"
  crossorigin="anonymous"
/>
```

## Open Graph

For the full specification please check out <http://ogp.me/>

Somerset currently supports:

- [basic](#basic)
- [video](#video)
- [article](#article)
- [book](#book)
- [profile](#profile)

### Open Graph Examples

#### Basic

```svelte
<script>

  import { Somerset } from 'somerset';

</script>

<Somerset
  openGraph={{
    type: 'website',
    url: 'https://www.example.com/page',
    title: 'Open Graph Title',
    description: 'Open Graph Description',
    images: [
      {
        url: 'https://www.example.ie/og-image.jpg',
        width: 800,
        height: 600,
        alt: 'Og Image Alt',
      },
      {
        url: 'https://www.example.ie/og-image-2.jpg',
        width: 800,
        height: 600,
        alt: 'Og Image Alt 2',
      },
    ],
  }}
/>
<p>Basic</p>
```

#### Video

Full info on [http://ogp.me/](http://ogp.me/#type_video)

```svelte
<script>

  import { Somerset } from 'somerset';

</script>

<Somerset
  title="Video Page Title"
  description="Description of video page"
  openGraph={{
    title: 'Open Graph Video Title',
    description: 'Description of open graph video',
    url: 'https://www.example.com/videos/video-title',
    type: 'video.movie',
    video: {
      actors: [
        {
          profile: 'https://www.example.com/actors/@firstnameA-lastnameA',
          role: 'Protagonist',
        },
        {
          profile: 'https://www.example.com/actors/@firstnameB-lastnameB',
          role: 'Antagonist',
        },
      ],
      directors: [
        'https://www.example.com/directors/@firstnameA-lastnameA',
        'https://www.example.com/directors/@firstnameB-lastnameB',
      ],
      writers: [
        'https://www.example.com/writers/@firstnameA-lastnameA',
        'https://www.example.com/writers/@firstnameB-lastnameB',
      ],
      duration: 680000,
      releaseDate: '2022-12-21T22:04:11Z',
      tags: ['Tag A', 'Tag B', 'Tag C'],
    },
    siteName: 'SiteName',
  }}
/>
<h1>Video Page SEO</h1>
```

#### Audio

Full info on [http://ogp.me/](https://ogp.me/#structured)

```svelte
<script>

  import { Somerset } from 'somerset';

</script>

<Somerset
  title="Audio Page Title"
  description="Description of audio page"
  openGraph={{
    title: 'Open Graph Audio',
    description: 'Description of open graph audio',
    url: 'https://www.example.com/audio/audio',
    audio: [
      {
        url: 'http://examples.opengraphprotocol.us/media/audio/1khz.mp3',
        secureUrl: 'https://d72cgtgi6hvvl.cloudfront.net/media/audio/1khz.mp3',
        type: "audio/mpeg"
      },
      {
        url: 'http://examples.opengraphprotocol.us/media/audio/250hz.mp3',
        secureUrl: 'https://d72cgtgi6hvvl.cloudfront.net/media/audio/250hz.mp3',
        type: "audio/mpeg"
      },
    ]
    site_name: 'SiteName',
  }}
/>
<h1>Audio Page SEO</h1>
```

#### Article

```svelte
<script>

  import { Somerset } from 'somerset';

</script>

<Somerset
  openGraph={{
    title: 'Open Graph Article Title',
    description: 'Description of open graph article',
    url: 'https://www.example.com/articles/article-title',
    type: 'article',
    article: {
      publishedTime: '2017-06-21T23:04:13Z',
      modifiedTime: '2018-01-21T18:04:43Z',
      expirationTime: '2022-12-21T22:04:11Z',
      section: 'Section II',
      authors: [
        'https://www.example.com/authors/@firstnameA-lastnameA',
        'https://www.example.com/authors/@firstnameB-lastnameB',
      ],
      tags: ['Tag A', 'Tag B', 'Tag C'],
    },
    images: [
      {
        url: 'https://www.test.ie/images/cover.jpg',
        width: 850,
        height: 650,
        alt: 'Photo of text',
      },
    ],
  }}
/>
<p>Article</p>
```

#### Book

```svelte
<script>

  import { Somerset } from 'somerset';

</script>

<Somerset
  openGraph={{
    title: 'Open Graph Book Title',
    description: 'Description of open graph book',
    url: 'https://www.example.com/books/book-title',
    type: 'book',
    book: {
      releaseDate: '2018-09-17T11:08:13Z',
      isbn: '978-3-16-148410-0',
      authors: [
        'https://www.example.com/authors/@firstnameA-lastnameA',
        'https://www.example.com/authors/@firstnameB-lastnameB',
      ],
      tags: ['Tag A', 'Tag B', 'Tag C'],
    },
    images: [
      {
        url: 'https://www.test.ie/images/book.jpg',
        width: 850,
        height: 650,
        alt: 'Cover of the book',
      },
    ],
  }}
/>
<p>Book</p>
```

#### Profile

```svelte
<script>

  import { Somerset } from 'somerset';

</script>

<Somerset
  openGraph={{
    title: 'Open Graph Profile Title',
    description: 'Description of open graph profile',
    url: 'https://www.example.com/@firstlast123',
    type: 'profile',
    profile: {
      firstName: 'First',
      lastName: 'Last',
      username: 'firstlast123',
      gender: 'female',
    },
    images: [
      {
        url: 'https://www.test.ie/images/profile.jpg',
        width: 850,
        height: 650,
        alt: 'Profile Photo',
      },
    ],
  }}
/>
<p>Profile</p>
```

## JSON-LD

Somerset has the ability to set JSON-LD a form of structured data. Structured data is a standardised format for providing information about a page and classifying the page content.

Google has excellent content on JSON-LD -> [HERE](https://developers.google.com/search/docs/data-types/article)

Below you will find a very basic page implementing each of the available JSON-LD types:

- [Article](#article-1)
- [Breadcrumb](#breadcrumb)
- [Blog](#blog)
- [Recipe](#recipe)
- [Sitelinks Search Box](#sitelinks-search-box)
- [Course](#course)
- [Dataset](#dataset)
- [Corporate Contact](#corporate-contact)
- [FAQ Page](#faq-page)
- [How-to](#how-to)
- [Job Posting](#job-posting)
- [Local Business](#local-business)
- [Product](#product)
- [Social Profile](#social-profile)
- [News Article](#news-article)

Pull request very welcome to add any from the list [found on here](https://developers.google.com/search/docs/data-types/article)

#### JSON-LD Security

Just a quick note on security. To get JSON-LD onto the page it needs to be in a script tag. `somerset` achieves this by using a JavaScript template strings.

So if passing anything directly from a URL to one of the components below please ensure you sanitize it first if needed.

View `toJson.tsx` for implementation detail.

#### Handling multiple instances

If your page requires multiple instances of a given JSON-LD component, you can specify unique `keyOverride` properties, and `somerset` will handle the rest.

This comes in handy for blog rolls, search results, and overview pages.

Please fully research when you should and shouldn't add multiple instances of JSON-LD.

```jsx
<ExampleJsonLd keyOverride="my-new-key" />
```

### Article

```svelte
<script>

  import { ArticleJsonLd } from 'somerset';

</script>

<h1>Article JSON-LD</h1>
<ArticleJsonLd
  useAppDir={false}
  url="https://example.com/article"
  title="Article headline"
  images={[
    'https://example.com/photos/1x1/photo.jpg',
    'https://example.com/photos/4x3/photo.jpg',
    'https://example.com/photos/16x9/photo.jpg',
  ]}
  datePublished="2015-02-05T08:00:00+08:00"
  dateModified="2015-02-05T09:00:00+08:00"
  authorName={[
    {
      name: 'Jane Blogs',
      url: 'https://example.com',
    },
    {
      name: 'Mary Stone',
      url: 'https://example.com',
    },
  ]}
  publisherName="Gary Meehan"
  publisherLogo="https://www.example.com/photos/logo.jpg"
  description="This is a mighty good description of this article."
  isAccessibleForFree={true}
/>
```

### Breadcrumb

```svelte
<script>

  import { BreadcrumbJsonLd } from 'somerset';

</script>

<h1>Breadcrumb JSON-LD</h1>
<BreadcrumbJsonLd
  itemListElements={[
    {
      position: 1,
      name: 'Books',
      item: 'https://example.com/books',
    },
    {
      position: 2,
      name: 'Authors',
      item: 'https://example.com/books/authors',
    },
    {
      position: 3,
      name: 'Ann Leckie',
      item: 'https://example.com/books/authors/annleckie',
    },
    {
      position: 4,
      name: 'Ancillary Justice',
      item: 'https://example.com/books/authors/ancillaryjustice',
    },
  ]}
/>
```

**Required properties**

| Property                    | Info                                                                                                     |
| --------------------------- | -------------------------------------------------------------------------------------------------------- |
| `itemListElements`          |                                                                                                          |
| `itemListElements.position` | The position of the breadcrumb in the breadcrumb trail. Position 1 signifies the beginning of the trail. |
| `itemListElements.name`     | The title of the breadcrumb displayed for the user.                                                      |
| `itemListElements.item`     | The URL to the webpage that represents the breadcrumb.                                                 |

### Blog

```svelte
<script>

  import { ArticleJsonLd } from 'somerset';

</script>

<h1>Blog JSON-LD</h1>
<ArticleJsonLd
  type="BlogPosting"
  url="https://example.com/blog"
  title="Blog headline"
  images={[
    'https://example.com/photos/1x1/photo.jpg',
    'https://example.com/photos/4x3/photo.jpg',
    'https://example.com/photos/16x9/photo.jpg',
  ]}
  datePublished="2015-02-05T08:00:00+08:00"
  dateModified="2015-02-05T09:00:00+08:00"
  authorName="Jane Blogs"
  description="This is a mighty good description of this blog."
/>
```

### Recipe

```svelte
<script>

  import { RecipeJsonLd } from 'somerset';

</script>

<h1>Recipe JSON-LD</h1>
<RecipeJsonLd
  name="Party Coffee Cake"
  description="This coffee cake is awesome and perfect for parties."
  datePublished="2018-03-10"
  authorName={['Jane Blogs', 'Mary Stone']}
  prepTime="PT20M"
  cookTime="PT30M"
  totalTime="PT50M"
  keywords="cake for a party, coffee"
  yields="10"
  category="Dessert"
  cuisine="American"
  calories={270}
  images={[
    'https://example.com/photos/1x1/photo.jpg',
    'https://example.com/photos/4x3/photo.jpg',
    'https://example.com/photos/16x9/photo.jpg',
  ]}
  ingredients={[
    '2 cups of flour',
    '3/4 cup white sugar',
    '2 teaspoons baking powder',
    '1/2 teaspoon salt',
    '1/2 cup butter',
    '2 eggs',
    '3/4 cup milk',
  ]}
  instructions={[
    {
      name: 'Preheat',
      text: 'Preheat the oven to 350 degrees F. Grease and flour a 9x9 inch pan.',
      url: 'https://example.com/party-coffee-cake#step1',
      image: 'https://example.com/photos/party-coffee-cake/step1.jpg',
    },
  ]}
  aggregateRating={{
    ratingValue: '5',
    ratingCount: '18',
  }}
  video={{
    name: 'How to make a Party Coffee Cake',
    description: 'This is how you make a Party Coffee Cake.',
    contentUrl: 'http://www.example.com/video123.mp4',
    embedUrl: 'http://www.example.com/videoplayer?video=123',
    uploadDate: '2018-02-05T08:00:00+08:00',
    duration: 'PT1M33S',
    thumbnailUrls: [
      'https://example.com/photos/1x1/photo.jpg',
      'https://example.com/photos/4x3/photo.jpg',
      'https://example.com/photos/16x9/photo.jpg',
    ],
    expires: '2019-02-05T08:00:00+08:00',
    hasPart: {
      '@type': 'Clip',
      name: 'Preheat oven',
      startOffset: 30,
      url: 'http://www.example.com/example?t=30',
    },
    watchCount: 2347,
    publication: {
      '@type': 'BroadcastEvent',
      isLiveBroadcast: true,
      startDate: '2020-10-24T14:00:00+00:00',
      endDate: '2020-10-24T14:37:14+00:00',
    },
    regionsAllowed: ['IT', 'NL'],
  }}
/>
```

**Required properties**

| Property            | Info                                                                |
| ------------------- | ------------------------------------------------------------------- |
| `name`              | The name of the recipe                                              |
| `description`       | A description of the recipe                                         |
| `authorName`        | The name of the recipe author. Can be a string or array of strings. |
| `ingredients`       | A list of ingredient strings                                        |
| `instructions`      | -                                                                   |
| `instructions.name` | The name of the instruction step.                                   |
| `instructions.text` | The directions of the instruction step.                             |

### Sitelinks Search Box

```svelte
<script>

  import { SiteLinksSearchBoxJsonLd } from 'somerset';

</script>

<h1>Sitelinks Search Box JSON-LD</h1>
<SiteLinksSearchBoxJsonLd
  url="https://www.example.com"
  potentialActions={[
    {
      target: 'https://query.example.com/search?q',
      queryInput: 'search_term_string',
    },
    {
      target: 'android-app://com.example/https/query.example.com/search/?q',
      queryInput: 'search_term_string',
    },
  ]}
/>
```

**Required properties**

| Property                      | Info                                                                                                                                                                            |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `url`                         | URL of the website associated with the sitelinks searchbox                                                                                                                      |
| `potentialActions`            | Array of one or two SearchAction objects. Describes the URI to send the query to, and the syntax of the request that is sent                                                    |
| `potentialActions.target`     | For websites, the URL of the handler that should receive and handle the search query; for apps, the URI of the intent handler for your search engine that should handle queries |
| `potentialActions.queryInput` | Placeholder used in target, gets substituted for user given query                                                                                                               |

Read the [documentation](https://developers.google.com/search/docs/appearance/structured-data/sitelinks-searchbox)

### Course

```svelte
<script>

  import { CourseJsonLd } from 'somerset';

</script>

<h1>Course JSON-LD</h1>
<CourseJsonLd
  courseName="Course Name"
  description="Introductory CS course laying out the basics."
  provider={{
    name: 'Course Provider',
    url: 'https//www.example.com/provider',
  }}
/>
```

**Required properties**

| Property        | Info                                                         |
| --------------- | ------------------------------------------------------------ |
| `courseName`    | The title of the course.                                     |
| `description`   | A description of the course. Display limit of 60 characters. |
| `provider.name` | The course provider name.                                    |
| `provider.url`  | The course provider name url.                                |

**Recommended properties**

| Property      | Info                            |
| ------------- | ------------------------------- |
| `providerUrl` | The url to the course provider. |

### Dataset

```svelte
<script>

  import { DatasetJsonLd } from 'somerset';

</script>

<h1>Dataset JSON-LD</h1>
<DatasetJsonLd
  description="The description needs to be at least 50 characters long"
  name="name of the dataset"
  license="https//www.example.com"
/>
```

**Required properties**

| Property      | Info                                                                              |
| ------------- | --------------------------------------------------------------------------------- |
| `description` | A short summary describing a dataset. Needs to be between 50 and 5000 characters. |
| `name`        | A license under which the dataset is distributed.                                 |

**Recommended properties**

| Property  | Info                            |
| --------- | ------------------------------- |
| `license` | The url to the course provider. |

### Corporate Contact

```svelte
<script>

  import { CorporateContactJsonLd } from 'somerset';

</script>

<h1>Corporate Contact JSON-LD</h1>
<CorporateContactJsonLd
  url="http://www.your-company-site.com"
  logo="http://www.example.com/logo.png"
  contactPoint={[
    {
      telephone: '+1-401-555-1212',
      contactType: 'customer service',
      email: 'customerservice@email.com',
      areaServed: 'US',
      availableLanguage: ['English', 'Spanish', 'French'],
    },
    {
      telephone: '+1-877-746-0909',
      contactType: 'customer service',
      email: 'servicecustomer@email.com',
      contactOption: 'TollFree',
      availableLanguage: 'English',
    },
    {
      telephone: '+1-877-453-1304',
      contactType: 'technical support',
      contactOption: 'TollFree',
      areaServed: ['US', 'CA'],
      availableLanguage: ['English', 'French'],
    },
  ]}
/>
```

**Required properties**

| Property                   | Info                                                                                            |
| -------------------------- | ----------------------------------------------------------------------------------------------- |
| `url`                      | Url to the home page of the company's official site.                                            |
| `contactPoint`             |                                                                                                 |
| `contactPoint.telephone`   | An internationalized version of the phone number, starting with the "+" symbol and country code |
| `contactPoint.contactType` | Description of the purpose of the phone number i.e. `Technical Support`.                        |

**Recommended ContactPoint properties**

| Property                         | Info                                                                                                       |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `contactPoint.areaServed`        | `String` or `Array` of geographical regions served by the business. Example `"US"` or `["US", "CA", "MX"]` |
| `contactPoint.availableLanguage` | Details about the language spoken. Example `"English"` or `["English", "French"]`                          |
| `contactPoint.email`             | Email asscosiated with the business`                                                                       |
| `gecontactPointo.contactOption`  | Details about the phone number. Example `"TollFree"`                                                       |

### FAQ Page

```svelte
<script>

  import { FAQPageJsonLd } from 'somerset';

</script>

<h1>FAQ Page JSON-LD</h1>
<FAQPageJsonLd
  mainEntity={[
    {
      questionName: 'How long is the delivery time?',
      acceptedAnswerText: '3-5 business days.',
    },
    {
      questionName: 'Where can I find information about product recalls?',
      acceptedAnswerText: 'Read more on under information.',
    },
  ]}
/>
```

**Required properties**

| Property                        | Info                                                                          |
| ------------------------------- | ----------------------------------------------------------------------------- |
| `mainEntity`                    |                                                                               |
| `mainEntity.questionName`       | The full text of the question. For example, "How long is the delivery time?". |
| `mainEntity.acceptedAnswerText` | The full answer to the question.                                              |

### How-to

```svelte
<script>

  import { HowToJsonLd } from 'somerset';

</script>

<h1>How-to JSON-LD</h1>
<HowToJsonLd
  name="How to tile a kitchen backsplash"
  image="https://example.com/photos/1x1/photo.jpg"
  estimatedCost={{ currency: 'USD', value: '100' }}
  supply={['tiles', 'thin-set', 'mortar', 'tile grout', 'grout sealer']}
  tool={['notched trowel', 'bucket', 'large sponge']}
  step={[
    {
      url: 'https://example.com/kitchen#step1',
      name: 'Prepare the surfaces',
      itemListElement: [
        {
          type: 'HowToTip',
          text: 'Turn off the power to the kitchen and then remove everything that is on the wall, such as outlet covers, switchplates, and any other item in the area that is to be tiled.',
        },
        {
          type: 'HowToDirection',
          text: 'Then clean the surface thoroughly to remove any grease or other debris and tape off the area.',
        },
      ],
      image: 'https://example.com/photos/1x1/photo-step1.jpg',
    },
  ]}
  totalTime="P2D"
/>
```

**Required properties**

| Property | Info                                                                               |
| -------- | ---------------------------------------------------------------------------------- |
| `name`   | Name of the HowTo                                                                  |
| `step`   | An array of HowToStep elements which comprise the full instructions of the how-to. |

**Supported properties**

| Property        | Info                                                                                                                                     |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `estimatedCost` | The estimated cost of the supplies consumed when performing instructions.                                                                |
| `image`         | Image of the completed how-to.                                                                                                           |
| `supply`        | A supply consumed when performing instructions or a direction.                                                                           |
| `tool`          | An object used (but not consumed) when performing instructions or a direction.                                                           |
| `totalTime`     | The total time required to perform all instructions or directions (including time to prepare the supplies), in ISO 8601 duration format. |

### Job Posting

```svelte
<script>

  import { JobPostingJsonLd } from 'somerset';

</script>

<h1>Job Posting JSON-LD</h1>
<JobPostingJsonLd
  datePosted="2020-01-06T03:37:40Z"
  description="Company is looking for a software developer...."
  hiringOrganization={{
    name: 'company name',
    sameAs: 'www.company-website-url.dev',
  }}
  jobLocation={{
    streetAddress: '17 street address',
    addressLocality: 'Paris',
    addressRegion: 'Ile-de-France',
    postalCode: '75001',
    addressCountry: 'France',
  }}
  title="Job Title"
  baseSalary={{
    currency: 'EUR',
    value: 40, // Can also be a salary range, like [40, 50]
    unitText: 'HOUR',
  }}
  employmentType="FULL_TIME"
  jobLocationType="TELECOMMUTE"
  validThrough="2020-01-06"
  applicantLocationRequirements="FR"
  experienceRequirements={{
    occupational: {
      minimumMonthsOfExperience: 12,
    },
    educational: {
      credentialCategory: 'high school',
    },
    experienceInPlaceOfEducation: true,
  }}
/>
```

**Required properties**

| Property                    | Info                                                                                                                                       |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `datePosted`                | The original date that employer posted the job in ISO 8601 format                                                                          |
| `description`               | The full description of the job in HTML format                                                                                             |
| `hiringOrganization`        | An object containing information about the company hiring with the following fields or the string `'confidential'` when hiring anonymously |
| `hiringOrganization.name`   | Name of the company offering the job position                                                                                              |
| `hiringOrganization.sameAs` | URL of a reference Web page                                                                                                                |
| `title`                     | The title of the job (not the title of the posting)                                                                                        |
| `validThrough`              | The date when the job posting will expire in [ISO 8601 format](https://en.wikipedia.org/wiki/ISO_8601)                                     |

**Supported properties**

| Property                                                        | Info                                                                                                                                                                                                                                                    |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `applicantLocationRequirements`                                 | The geographic location(s) in which employees may be located for to be eligible for the remote job                                                                                                                                                      |
| `baseSalary`                                                    |                                                                                                                                                                                                                                                         |
| `baseSalary.currency`                                           | The currency in which the monetary amount is expressed                                                                                                                                                                                                  |
| `baseSalary.value`                                              | The value of the quantitative value. You can also provide an array of minimum and maximum salaries. .                                                                                                                                                   |
| `baseSalary.unitText`                                           | A string indicating the unit of measurement [Base salary guideline](https://developers.google.com/search/docs/data-types/job-posting#basesalary)                                                                                                        |
| `employmentType`                                                | Type of employment [Employement type guideline](https://developers.google.com/search/docs/data-types/job-posting#basesalary)                                                                                                                            |
| `jobLocation`                                                   | The physical location(s) of the business where the employee will report to work (such as an office or worksite), not the location where the job was posted.                                                                                             |
| `jobLocation.streetAddress`                                     | The street address. For example, 1600 Amphitheatre Pkwy                                                                                                                                                                                                 |
| `jobLocation.addressLocality`                                   | The locality. For example, Mountain View.                                                                                                                                                                                                               |
| `jobLocation.addressRegion`                                     | The region. For example, CA.                                                                                                                                                                                                                            |
| `jobLocation.postalCode`                                        | The postal code. For example, 94043                                                                                                                                                                                                                     |
| `jobLocation.addressCountry`                                    | The country. For example, USA. You can also provide the two-letter ISO 3166-1 alpha-2 country code.                                                                                                                                                     |
| `jobLocationType`                                               | A description of the job location [Job Location type guideline](https://developers.google.com/search/docs/data-types/job-posting#job-location-type)                                                                                                     |
| `hiringOrganization.logo`                                       | Logos on third-party job sites [Hiring Organization guideline](https://developers.google.com/search/docs/data-types/job-posting#hiring)                                                                                                                 |
| `experienceRequirements.occupational.minimumMonthsOfExperience` | The minimum number of months of experience that are required for the job posting. [Experience and Education Requirements](https://developers.google.com/search/docs/appearance/structured-data/job-posting#education-and-experience-properties-beta)    |
| `experienceRequirements.educational.credentialCategory`         | The level of education that's required for the job posting. Use one of the following: `high school`, `associate degree`, `bachelor degree`, `professional certificate`, `postgraduate degree`                                                           |
| `experienceRequirements.experienceInPlaceOfEducation`           | Boolean: If set to true, this property indicates whether a job posting will accept experience in place of its formal educational qualifications. If set to true, you must include both the experienceRequirements and educationRequirements properties. |

### Local Business

Local business is supported with a sub-set of properties.

```jsx
<LocalBusinessJsonLd
  type="Store"
  id="http://davesdeptstore.example.com"
  name="Dave's Department Store"
  description="Dave's latest department store in San Jose, now open"
  url="http://www.example.com/store-locator/sl/San-Jose-Westgate-Store/1427"
  telephone="+14088717984"
  address={{
    streetAddress: '1600 Saratoga Ave',
    addressLocality: 'San Jose',
    addressRegion: 'CA',
    postalCode: '95129',
    addressCountry: 'US',
  }}
  geo={{
    latitude: '37.293058',
    longitude: '-121.988331',
  }}
  images={[
    'https://example.com/photos/1x1/photo.jpg',
    'https://example.com/photos/4x3/photo.jpg',
    'https://example.com/photos/16x9/photo.jpg',
  ]}
  sameAs={[
    'www.company-website-url1.dev',
    'www.company-website-url2.dev',
    'www.company-website-url3.dev',
  ]}
  openingHours={[
    {
      opens: '08:00',
      closes: '23:59',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      validFrom: '2019-12-23',
      validThrough: '2020-04-02',
    },
    {
      opens: '14:00',
      closes: '20:00',
      dayOfWeek: 'Sunday',
      validFrom: '2019-12-23',
      validThrough: '2020-04-02',
    },
  ]}
  rating={{
    ratingValue: '4.5',
    ratingCount: '2',
  }}
  review={[
    {
      author: 'John Doe',
      datePublished: '2006-05-04',
      name: 'A masterpiece of literature',
      reviewBody:
        'I really enjoyed this book. It captures the essential challenge people face as they try make sense of their lives and grow to adulthood.',
      reviewRating: {
        bestRating: '5',
        worstRating: '1',
        reviewAspect: 'Ambiance',
        ratingValue: '4',
      },
    },
    {
      author: 'Bob Smith',
      datePublished: '2006-06-15',
      name: 'A good read.',
      reviewBody: "Catcher in the Rye is a fun book. It's a good book to read.",
      reviewRating: {
        ratingValue: '4',
      },
    },
  ]}
  makesOffer={[
    {
      priceSpecification: {
        type: 'UnitPriceSpecification',
        priceCurrency: 'EUR',
        price: '1000-10000',
      },
      itemOffered: {
        name: 'Motion Design Services',
        description:
          'We are the expert of animation and motion design productions.',
      },
    },
    {
      priceSpecification: {
        type: 'UnitPriceSpecification',
        priceCurrency: 'EUR',
        price: '2000-10000',
      },
      itemOffered: {
        name: 'Branding Services',
        description:
          'Real footage is a powerful tool when it comes to show what the business is about. Can be used to present your company, show your factory, promote a product packshot, or just tell any story. It can help create emotional links with your audience by showing punchy images.',
      },
    },
  ]}
  areaServed={[
    {
      geoMidpoint: {
        latitude: '41.108237',
        longitude: '-80.642982',
      },
      geoRadius: '1000',
    },
    {
      geoMidpoint: {
        latitude: '51.108237',
        longitude: '-80.642982',
      },
      geoRadius: '1000',
    },
  ]}
  action={{
    actionName: 'potentialAction',
    actionType: 'ReviewAction',
    target: 'https://www.example.com/review/this/business',
  }}
/>
```

**Required properties**

| Property                  | Info                                                                       |
| ------------------------- | -------------------------------------------------------------------------- |
| `@id`                     | Globally unique ID of the specific business location in the form of a URL. |
| `type`                    | LocalBusiness or any sub-type                                              |
| `address`                 | Address of the specific business location                                  |
| `address.addressCountry`  | The 2-letter ISO 3166-1 alpha-2 country code                               |
| `address.addressLocality` | City                                                                       |
| `address.addressRegion`   | State or province, if applicable.                                          |
| `address.postalCode`      | Postal or zip code.                                                        |
| `address.streetAddress`   | Street number, street name, and unit number.                               |
| `name`                    | Business name.                                                             |

**Supported properties**

| Property                                            | Info                                                                                                                                                 |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `description`                                       | Description of the business location                                                                                                                 |
| `geo`                                               | Geographic coordinates of the business.                                                                                                              |
| `geo.latitude`                                      | The latitude of the business location                                                                                                                |
| `geo.longitude`                                     | The longitude of the business location                                                                                                               |
| `rating`                                            | The average rating of business based on multiple ratings or reviews.                                                                                 |
| `rating.ratingValue`                                | The rating for the content.                                                                                                                          |
| `rating.ratingCount`                                | The count of total number of ratings.                                                                                                                |
| `priceRange`                                        | The relative price range of the business.                                                                                                            |
| `servesCuisine`                                     | The type of cuisine the restaurant serves.                                                                                                           |
| `images`                                            | An image or images of the business. Required for valid markup depending on the type                                                                  |
| `telephone`                                         | A business phone number meant to be the primary contact method for customers.                                                                        |
| `url`                                               | The fully-qualified URL of the specific business location.                                                                                           |
| `sameAs`                                            | An array of URLs that represent this business                                                                                                        |
| `openingHours`                                      | Opening hour specification of business. You can provide this as a single object, or an array of objects with the properties below.                   |
| `openingHours.opens`                                | The opening hour of the place or service on the given day(s) of the week.                                                                            |
| `openingHours.closes`                               | The closing hour of the place or service on the given day(s) of the week.                                                                            |
| `openingHours.dayOfWeek`                            | The day of the week for which these opening hours are valid. Can be a string or array of strings. Refer to [DayOfWeek](https://schema.org/DayOfWeek) |
| `openingHours.validFrom`                            | The date when the item becomes valid.                                                                                                                |
| `openingHours.validThrough`                         | The date after when the item is not valid.                                                                                                           |
| `review`                                            | A review of the local business.                                                                                                                      |
| `review.author`                                     | The author of this content or rating.                                                                                                                |
| `review.reviewBody`                                 | The actual body of the review.                                                                                                                       |
| `review.datePublished`                              | Date of first broadcast/publication.                                                                                                                 |
| `review.name`                                       | The name of the item.                                                                                                                                |
| `review.rating`                                     | The rating given in this review                                                                                                                      |
| `review.rating.ratingValue`                         | The rating for the content.                                                                                                                          |
| `review.rating.reviewAspect`                        | This Review or Rating is relevant to this part or facet of the itemReviewed.                                                                         |
| `review.rating.worstRating`                         | The lowest value allowed in this rating system. If worstRating is omitted, 1 is assumed.                                                             |
| `review.rating.bestRating`                          | The highest value allowed in this rating system. If bestRating is omitted, 5 is assumed                                                              |
| `areasServed`                                       | The geographic area where a service or offered item is provided.                                                                                     |
| `areasServed.GeoCircle`                             | A GeoCircle is a GeoShape representing a circular geographic area.                                                                                   |
| `areasServed.GeoCircle.geoMidpoint`                 | Indicates the GeoCoordinates at the centre of a GeoShape e.g. GeoCircle.                                                                             |
| `areasServed.GeoCircle.geoMidpoint.latitude`        | The latitude of a location. For example 37.42242                                                                                                     |
| `areasServed.GeoCircle.geoMidpoint.longitude`       | The name of the item.                                                                                                                                |
| `areasServed.GeoCircle.geoRadius`                   | Indicates the approximate radius of a GeoCircle (metres unless indicated otherwise via Distance notation).                                           |
| `makesOffer`                                        | A pointer to products or services offered by the organization or person.                                                                             |
| `makesOffer.offer`                                  | An offer to transfer some rights to an item or to provide a service                                                                                  |
| `makesOffer.offer.priceSpecification`               | One or more detailed price specifications, indicating the unit price and delivery or payment charges.                                                |
| `makesOffer.offer.priceSpecification.priceCurrency` | The currency of the price, or a price component when attached to PriceSpecification and its subtypes.                                                |
| `makesOffer.offer.priceSpecification.price`         | The offer price of a product, or of a price component when attached to PriceSpecification and its subtypes.                                          |
| `makesOffer.offer.itemOffered`                      | An item being offered (or demanded)                                                                                                                  |
| `makesOffer.offer.itemOffered.name`                 | The name of the item                                                                                                                                 |
| `makesOffer.offer.itemOffered.description`          | The description of the item.                                                                                                                         |
| `action`                                            | An action performed by a direct agent and indirect participants upon a direct object.                                                                |
| `action.target`                                     | Indicates a target EntryPoint for an Action.                                                                                                         |

**NOTE:**

Images are recommended for most of the types that you can use for `LocalBusiness`, if in doubt you should add an image. You can check your generated JSON over at Google's [Structured Data Testing Tool](https://search.google.com/structured-data/testing-tool)

### Logo

```svelte
<script>

  import { LogoJsonLd } from 'somerset';

</script>

<h1>Logo JSON-LD</h1>
<LogoJsonLd
  logo="http://www.your-site.com/images/logo.jpg"
  url="http://www.your-site.com"
/>
```

| Property | Info                                                                                                                                      |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `url`    | The URL of the website associated with the logo. [Logo guidelines](https://developers.google.com/search/docs/data-types/logo#definitions) |
| `logo`   | URL of a logo that is representative of the organization.                                                                                 |

### Product

```svelte
<script>

  import { ProductJsonLd } from 'somerset';

</script>

<h1>Product JSON-LD</h1>
<ProductJsonLd
  productName="Executive Anvil"
  images={[
    'https://example.com/photos/1x1/photo.jpg',
    'https://example.com/photos/4x3/photo.jpg',
    'https://example.com/photos/16x9/photo.jpg',
  ]}
  description="Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height."
  brand="ACME"
  color="blue"
  manufacturerName="Gary Meehan"
  manufacturerLogo="https://www.example.com/photos/logo.jpg"
  material="steel"
  slogan="For the business traveller looking for something to drop from a height."
  disambiguatingDescription="Executive Anvil, perfect for the business traveller."
  releaseDate="2014-02-05T08:00:00+08:00"
  productionDate="2015-02-05T08:00:00+08:00"
  purchaseDate="2015-02-06T08:00:00+08:00"
  award="Best Executive Anvil Award."
  reviews={[
    {
      author: 'Jim',
      datePublished: '2017-01-06T03:37:40Z',
      reviewBody:
        'This is my favorite product yet! Thanks Nate for the example products and reviews.',
      name: 'So awesome!!!',
      reviewRating: {
        bestRating: '5',
        ratingValue: '5',
        worstRating: '1',
      },
      publisher: {
        type: 'Organization',
        name: 'TwoVit',
      },
    },
  ]}
  aggregateRating={{
    ratingValue: '4.4',
    reviewCount: '89',
  }}
  offers={[
    {
      price: '119.99',
      priceCurrency: 'USD',
      priceValidUntil: '2020-11-05',
      itemCondition: 'https://schema.org/UsedCondition',
      availability: 'https://schema.org/InStock',
      url: 'https://www.example.com/executive-anvil',
      seller: {
        name: 'Executive Objects',
      },
    },
    {
      price: '139.99',
      priceCurrency: 'CAD',
      priceValidUntil: '2020-09-05',
      itemCondition: 'https://schema.org/UsedCondition',
      availability: 'https://schema.org/InStock',
      url: 'https://www.example.ca/executive-anvil',
      seller: {
        name: 'Executive Objects',
      },
    },
  ]}
  mpn="925872"
/>
```

Also available: `sku`, `gtin8`, `gtin13`, `gtin14`.

Valid values for `offers.itemCondition`:

- <https://schema.org/DamagedCondition>
- <https://schema.org/NewCondition>
- <https://schema.org/RefurbishedCondition>
- <https://schema.org/UsedCondition>

Valid values for `offers.availability`:

- <https://schema.org/Discontinued>
- <https://schema.org/InStock>
- <https://schema.org/InStoreOnly>
- <https://schema.org/LimitedAvailability>
- <https://schema.org/OnlineOnly>
- <https://schema.org/OutOfStock>
- <https://schema.org/PreOrder>
- <https://schema.org/PreSale>
- <https://schema.org/SoldOut>

The property `aggregateOffer` is also available:
(It is ignored if `offers` is set)

**Required properties**

| Property        | Info                                                                              |
| --------------- | --------------------------------------------------------------------------------- |
| `lowPrice`      | The lowest price of all offers available. Use a floating point number.            |
| `priceCurrency` | The currency used to describe the product price, in three-letter ISO 4217 format. |

**Recommended properties**

| Property     | Info                                                                                                                                                            |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `highPrice`  | The highest price of all offers available. Use a floating point number.                                                                                         |
| `offerCount` | The number of offers for the product.                                                                                                                           |
| `offers`     | An offer to transfer some rights to an item or to provide a service. You can provide this as a single object, or an array of objects with the properties below. |

More info on the product data type can be found [here](https://developers.google.com/search/docs/data-types/product).

### Social Profile

```svelte
<script>

  import { SocialProfileJsonLd } from 'somerset';

</script>

<h1>Social Profile JSON-LD</h1>
<SocialProfileJsonLd
  type="Person"
  name="your name"
  url="http://www.your-site.com"
  sameAs={[
    'http://www.facebook.com/your-profile',
    'http://instagram.com/yourProfile',
    'http://www.linkedin.com/in/yourprofile',
    'http://plus.google.com/your_profile',
  ]}
/>
```

**Required properties**

| Property | Info                                                                                      |
| -------- | ----------------------------------------------------------------------------------------- |
| `type`   | Person or Organization                                                                    |
| `name`   | The name of the person or organization                                                    |
| `url`    | The URL for the person's or organization's official website.                              |
| `sameAs` | An array of URLs for the person's or organization's official social media profile page(s) |

**Google Supported Social Profiles**

- Facebook
- Twitter
- Google+
- Instagram
- YouTube
- LinkedIn
- Myspace
- Pinterest
- SoundCloud
- Tumblr

### News Article

```svelte
<script>

  import { NewsArticleJsonLd } from 'somerset';

</script>

<h1>News Article JSON-LD</h1>
<NewsArticleJsonLd
  url="https://example.com/article"
  title="Article headline"
  images={[
    'https://example.com/photos/1x1/photo.jpg',
    'https://example.com/photos/4x3/photo.jpg',
    'https://example.com/photos/16x9/photo.jpg',
  ]}
  section="politic"
  keywords="prayuth,taksin"
  datePublished="2015-02-05T08:00:00+08:00"
  dateModified="2015-02-05T09:00:00+08:00"
  authorName="Jane Blogs"
  publisherName="Gary Meehan"
  publisherLogo="https://www.example.com/photos/logo.jpg"
  description="This is a mighty good description of this article."
  body="This is all text for this news article"
  isAccessibleForFree={true}
/>
```

[Google Docs for Social Profile](https://developers.google.com/search/docs/data-types/social-profile)

### Video

```svelte
<script>

  import { VideoJsonLd } from 'somerset';

</script>

<h1>Video JSON-LD</h1>
<VideoJsonLd
  name="How to make a Party Coffee Cake"
  description="This is how you make a Party Coffee Cake."
  contentUrl="http://www.example.com/video123.mp4"
  embedUrl="http://www.example.com/videoplayer?video=123"
  uploadDate="2018-02-05T08:00:00+08:00"
  duration="PT1M33S"
  thumbnailUrls={[
    'https://example.com/photos/1x1/photo.jpg',
    'https://example.com/photos/4x3/photo.jpg',
    'https://example.com/photos/16x9/photo.jpg',
  ]}
  expires="2019-02-05T08:00:00+08:00"
  hasPart={{
    name: 'Preheat oven',
    startOffset: 30,
    url: 'http://www.example.com/example?t=30',
  }}
  watchCount={2347}
  publication={{
    isLiveBroadcast: true,
    startDate: '2020-10-24T14:00:00+00:00',
    endDate: '2020-10-24T14:37:14+00:00',
  }}
  regionsAllowed={['IT', 'NL']}
/>
```

**Required properties**

| Property       | Info                                                        |
| -------------- | ----------------------------------------------------------- |
| `name`         | The title of the video.                                     |
| `description`  | The description of the video. HTML tags are ignored.        |
| `thumbnailUrl` | A URL pointing to the video thumbnail image file.           |
| `uploadDate`   | The date the video was first published, in ISO 8601 format. |

**Recommended properties**

| Property               | Info                                                                                     |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| `contentUrl`           | A URL pointing to the actual video media file, in one of the supported encoding formats. |
| `duration`             | The duration of the video in ISO 8601 format                                             |
| `embedUrl`             | A URL pointing to a player for the specific video.                                       |
| `expires`              | If applicable, the date after which the video will no longer be available.               |
| `interactionStatistic` | The number of times the video has been watched.                                          |
| `publication`          | If your video is happening live and you want to be eligible for the LIVE badge.          |
| `regionsAllowed`       | The regions where the video is allowed.                                                  |

### VideoGame

```svelte
<script>

  import { VideoGameJsonLd } from 'somerset';

</script>

<h1>VideoGame JSON-LD</h1>
<VideoGameJsonLd
  name="Red Dead Redemption 2"
  translatorName={['Translator 1', 'Translator 2']}
  languageName={['English', 'Kurdish']}
  description="Arthur Morgan and the Van der Linde gang are outlaws on the run. With federal agents and the best bounty hunters in the nation massing on their heels, the gang must rob, steal and fight their way across the rugged heartland of America in order to survive."
  processorRequirements="4 GHz"
  memoryRequirements="16 Gb"
  playMode="SinglePlayer"
  applicationCategory="Game"
  url="https://example.com/rdr2-game"
  platformName={['PC game', 'PlayStation 4']}
  operatingSystemName="windows"
  keywords="outlaw, gang, federal agents"
  datePublished="2019-02-05T08:00:00+08:00"
  image="https://example.com/photos/1x1/photo.jpg"
  publisherName="Vertical Games"
  producerName="Rockstar Games"
  producerUrl="https//www.example.com/producer"
  offers={[
    {
      price: '119.99',
      priceCurrency: 'USD',
      priceValidUntil: '2020-11-05',
      availability: 'https://schema.org/InStock',
      url: 'https://example.net/rdr2-game',
      seller: {
        name: 'Executive Gaming',
      },
    },
    {
      price: '139.99',
      priceCurrency: 'CAD',
      priceValidUntil: '2020-09-05',
      availability: 'https://schema.org/InStock',
      url: 'https://example.org/rdr2-game',
      seller: {
        name: 'Executive Gaming',
      },
    },
  ]}
  aggregateRating={{
    ratingValue: '44',
    reviewCount: '89',
    ratingCount: '684',
    bestRating: '100',
  }}
  reviews={[
    {
      author: {
        type: 'Person',
        name: 'AhmetKaya',
      },
      publisher: {
        type: 'Organization',
        name: 'Gam Production',
      },
      datePublished: '2017-01-06T03:37:40Z',
      reviewBody: 'Iki gozum.',
      name: 'Rica ederim.',
      reviewRating: {
        bestRating: '5',
        ratingValue: '5',
        worstRating: '1',
      },
    },
  ]}
/>
```

**Required properties**

| Property | Info                         |
| -------- | ---------------------------- |
| `name`   | The title of the video game. |

[More information about the schema](https://schema.org/VideoGame)

### Event

```svelte
<script>
  
  import { EventJsonLd } from 'somerset';

</script>

<h1>Event JSON-LD</h1>
<EventJsonLd
  name="My Event"
  startDate="2020-01-23T00:00:00.000Z"
  endDate="2020-01-24T00:00:00.000Z"
  location={{
    name: 'My Place',
    sameAs: 'https://example.com/my-place',
    address: {
      streetAddress: '1600 Saratoga Ave',
      addressLocality: 'San Jose',
      addressRegion: 'CA',
      postalCode: '95129',
      addressCountry: 'US',
    },
  }}
  url="https://example.com/my-event"
  images={['https://example.com/photos/photo.jpg']}
  description="My event @ my place"
  offers={[
    {
      price: '119.99',
      priceCurrency: 'USD',
      priceValidUntil: '2020-11-05',
      itemCondition: 'https://schema.org/UsedCondition',
      availability: 'https://schema.org/InStock',
      url: 'https://www.example.com/executive-anvil',
      seller: {
        name: 'John Doe',
      },
      validFrom: '2020-11-01T00:00:00.000Z',
    },
    {
      price: '139.99',
      priceCurrency: 'CAD',
      priceValidUntil: '2020-09-05',
      itemCondition: 'https://schema.org/UsedCondition',
      availability: 'https://schema.org/InStock',
      url: 'https://www.example.ca/executive-anvil',
      seller: {
        name: 'John Doe Sr.',
      },
      validFrom: '2020-08-05T00:00:00.000Z',
    },
  ]}
  performers={[
    {
      name: 'Adele',
    },
    {
      name: 'Kira and Morrison',
    },
  ]}
  organizer={{
    type: 'Organization',
    name: 'Unnamed organization',
    url: 'https://www.unnamed.com',
  }}
  eventStatus="EventScheduled"
  eventAttendanceMode="OfflineEventAttendanceMode"
/>
```

**Required properties**

| Property    | Info                                                       |
| ----------- | ---------------------------------------------------------- |
| `name`      | The name of the event                                      |
| `startDate` | The start date time of the event in iso8601 format         |
| `endDate`   | The end date time of the event in iso8601 format           |
| `location`  | Location of the event, can be `Place` or `VirtualLocation` |

**`Place` type**
Requires `address` property and `name`.

**`VirtualLocation` type**
Requires `url` property, doesn't require `name`.

**Supported properties**

| Property              | Info                                                                                                                                                            |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `description`         | Description of the event                                                                                                                                        |
| `location.name`       | Name of the location                                                                                                                                            |
| `location.sameAs`     | URL of a reference web page that identifies location                                                                                                            |
| `images`              | An image or images of the event.                                                                                                                                |
| `url`                 | The fully-qualified URL of the event.                                                                                                                           |
| `offers`              | An offer to transfer some rights to an item or to provide a service. You can provide this as a single object, or an array of objects with the properties below. |
| `performers`          | All artists that perform at this event. You can provide this as a single object, or an array of objects with the properties below.                              |
| `performers.name`     | The name of the performer                                                                                                                                       |
| `performers.type`     | Either `Person` or `PerformingGroup`                                                                                                                            |
| `organizer`           | The organizer of the event                                                                                                                                      |
| `organizer.type`      | Either `Organization` or `Person`                                                                                                                               |
| `organizer.name`      | Name of the organizer of the event                                                                                                                              |
| `organizer.url`       | URL of the organizer of the event                                                                                                                               |
| `eventStatus`         | Status of the event, type `EventStatus`                                                                                                                         |
| `eventAttendanceMode` | Attendance mode of the event, type `EventAttendanceMode`                                                                                                        |

**`EventStatus` type**

- 'EventCancelled'
- 'EventMovedOnline'
- 'EventPostponed'
- 'EventRescheduled'
- 'EventScheduled'

**`EventAttendanceMode` type**

- 'MixedEventAttendanceMode'
- 'OfflineEventAttendanceMode'
- 'OnlineEventAttendanceMode'

**`offers` Required properties**

| Property               | Info                      |
| ---------------------- | ------------------------- |
| `offers.price`         | The cost of the offer     |
| `offers.priceCurrency` | The currency of the offer |

**`offers` Recommended properties**

| Property                 | Info                                                                                |
| ------------------------ | ----------------------------------------------------------------------------------- |
| `offers.priceValidUntil` | Until when the price of the offer expires                                           |
| `offers.itemCondition`   | The condition of the product or service                                             |
| `offers.availability`    | The availability of this item — for example In stock, Out of stock, Pre-order, etc. |
| `offers.url`             | URL of the item                                                                     |
| `offers.seller`          | The person who is selling this item                                                 |
| `offers.seller.name`     | The name of the person                                                              |
| `offers.validFrom`       | Since when the price of the offer is valid                                          |

The property `aggregateOffer` is also available:
(It is ignored if `offers` is set)

**Required properties**

| Property        | Info                                                                              |
| --------------- | --------------------------------------------------------------------------------- |
| `lowPrice`      | The lowest price of all offers available. Use a floating point number.            |
| `priceCurrency` | The currency used to describe the product price, in three-letter ISO 4217 format. |

**Recommended properties**

| Property     | Info                                                                    |
| ------------ | ----------------------------------------------------------------------- |
| `highPrice`  | The highest price of all offers available. Use a floating point number. |
| `offerCount` | The number of offers for the product.                                   |

For reference and more info check [Google's Search Event DataType](https://developers.google.com/search/docs/data-types/event)

### Q&A

Q&A pages are web pages that contain data in a question and answer format, which is one question followed by its answers.

```svelte
<script>

  import { QAPageJsonLd } from 'somerset';

</script>

<h1>Q&A Page JSON-LD</h1>
<QAPageJsonLd
  mainEntity={{
    name: 'How many ounces are there in a pound?',
    text: 'I have taken up a new interest in baking and keep running across directions in ounces and pounds. I have to translate between them and was wondering how many ounces are in a pound?',
    answerCount: 3,
    upvoteCount: 26,
    dateCreated: '2016-07-23T21:11Z',
    author: { name: 'New Baking User' },
    acceptedAnswer: {
      text: '1 pound (lb) is equal to 16 ounces (oz).',
      dateCreated: '2016-11-02T21:11Z',
      upvoteCount: 1337,
      url: 'https://example.com/question1#acceptedAnswer',
      author: {
        name: 'SomeUser',
      },
    },
    suggestedAnswer: [
      {
        text: 'Are you looking for ounces or fluid ounces? If you are looking for fluid ounces there are 15.34 fluid ounces in a pound of water.',
        dateCreated: '2016-11-02T21:11Z',
        upvoteCount: 42,
        url: 'https://example.com/question1#suggestedAnswer1',
        author: {
          name: 'AnotherUser',
        },
      },
      {
        text: `I can't remember exactly, but I think 18 ounces in a lb. You might want to double check that.`,
        dateCreated: '2016-11-06T21:11Z',
        upvoteCount: 0,
        url: 'https://example.com/question1#suggestedAnswer2',
        author: {
          name: 'ConfusedUser',
        },
      },
    ],
  }}
/>
```

**Required properties**

| Property     | Info                                                                                                   |
| ------------ | ------------------------------------------------------------------------------------------------------ |
| `mainEntity` | The Question for this page must be nested under the mainEntity property of the QAPageJsonld component. |

**`mainEntity` Required properties**

| Property                              | Info                                                                                                                          |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `answerCount`                         | The total number of answers to the question.                                                                                  |
| `acceptedAnswer` or `suggestedAnswer` | To be eligible for the rich result, a question must have at least one answer – either an acceptedAnswer or a suggestedAnswer. |
| `name`                                | The full text of the short form of the question.                                                                              |

**`mainEntity` Supported properties**

| Property      | Info                                                                      |
| ------------- | ------------------------------------------------------------------------- |
| `author`      | The author of the question.                                               |
| `dateCreated` | The date at which the question was added to the page, in ISO-8601 format. |
| `text`        | The full text of the long form of the question.                           |
| `upvoteCount` | The total number of votes that this question has received.                |

**`acceptedAnswer`/`suggestedAnswer` Required properties**

| Property | Info                         |
| -------- | ---------------------------- |
| `text`   | The full text of the answer. |

**`acceptedAnswer`/`suggestedAnswer` Supported properties**

| Property      | Info                                                                      |
| ------------- | ------------------------------------------------------------------------- |
| `author`      | The author of the question.                                               |
| `dateCreated` | The date at which the question was added to the page, in ISO-8601 format. |
| `upvoteCount` | The total number of votes that this question has received.                |
| `url`         | A URL that links directly to this answer.                                 |

For reference and more info check [Google's Search Q&A DataType](https://developers.google.com/search/docs/data-types/qapage)

### Collection Page

Collection pages are web pages. Every web page is implicitly assumed to be declared to be of type WebPage, so the various properties about that webpage, such as breadcrumb may be used. We recommend explicit declaration if these properties are specified, but if they are found outside of an itemscope, they will be assumed to be about the page.

```svelte
<script>

  import { CollectionPageJsonLd } from 'somerset';

</script>

<h1>Collection Page JSON-LD</h1>
<CollectionPageJsonLd
  name="Resistance 3: Fall of Man"
  hasPart={[
    {
      about:
        'Britten Four Sea Interludes and Passacaglia from Peter Grimes',
      author: 'John Doe',
      name: 'Schema.org Ontology',
      datePublished: '2021-03-09',
      audience: 'Internet',
      keywords: 'schema',
      thumbnailUrl: 'https://i.ytimg.com/vi/eXSJ3PO9Tas/hqdefault.jpg',
      image: 'hqdefault.jpg',
    },
    {
      about: 'Shostakovich Symphony No. 7 (Leningrad)',
      author: 'John Smith',
      name: 'Creative work name',
      datePublished: '2014-10-01T19:30',
    },
  ]}
/>
```

**Required properties**

| Property  | Info                                                                                          |
| --------- | --------------------------------------------------------------------------------------------- |
| `name`    | The name of the item.                                                                         |
| `hasPart` | Indicates an item or CreativeWork that is part of this item, or CreativeWork (in some sense). |

**Supported properties**

| Property               | Info                                                                                                                                    |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `hasPart.creativeWork` | The most generic kind of [creative work](https://schema.org/CreativeWork), including books, movies, photographs, software programs, etc |

**`creativeWork` Required properties**

| Property                             | Info                                                                                                                                                                                                                        |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hasPart.creativeWork.author`        | The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably. |
| `hasPart.creativeWork.about`         | The subject matter of the content.                                                                                                                                                                                          |
| `hasPart.creativeWork.datePublished` | Date of first broadcast/publication.                                                                                                                                                                                        |
| `hasPart.creativeWork.name`          | The name of the item.                                                                                                                                                                                                       |

**`creativeWork` Supported properties**

| Property                            | Info                                                                                                                   |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `hasPart.creativeWork.audience`     | An intended audience, i.e. a group for whom something was created.                                                     |
| `hasPart.creativeWork.keywords`     | Keywords or tags used to describe this content. Multiple entries in a keywords list are typically delimited by commas. |
| `hasPart.creativeWork.thumbnailUrl` | A thumbnail image relevant to the Thing.                                                                               |
| `hasPart.creativeWork.image`        | An image of the item. This can be a URL or a fully described ImageObject.                                              |

For reference and more info check [Collection Page DataType](https://schema.org/CollectionPage)

### Profile page

Profile pages are web pages. Every web page is implicitly assumed to be declared to be of type WebPage, so the various properties about that webpage, such as breadcrumb may be used. We recommend explicit declaration if these properties are specified, but if they are found outside of an itemscope, they will be assumed to be about the page.

```svelte
<script>

  import { ProfilePageJsonLd } from 'somerset';

</script>

<h1>Profile page JSON-LD</h1>
<ProfilePageJsonLd
  lastReviewed="2014-10-01T19:30"
  breadcrumb={[
    {
      position: 1,
      name: 'Books',
      item: 'https://example.com/books',
    },
    {
      position: 2,
      name: 'Authors',
      item: 'https://example.com/books/authors',
    },
  ]}
/>
```

**Required properties**

| Property     | Info                                                                                                                                    |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| `breadcrumb` | A set of links that can help a user understand and navigate a website hierarchy represented as string or [BreadcrumbList](#breadcrumb). |

**Supported properties**

| Property       | Info                                                                                           |
| -------------- | ---------------------------------------------------------------------------------------------- |
| `lastReviewed` | Date on which the content on this web page was last reviewed for accuracy and/or completeness. |

For reference and more info check [Profile Page DataType](https://schema.org/ProfilePage)

### Carousel

**Required properties of Carousel Component**

| Property | Info                                                               |
| -------- | ------------------------------------------------------------------ |
| `type`   | The type of carousel                                               |
| `data`   | The data in the form of an array for the item list in the carousel |

#### Default (Summary List)

```svelte
<script>

  import { CarouselJsonLd } from 'somerset';

</script>

<h1>Carousel Default JSON-LD</h1>
<CarouselJsonLd
  ofType="default"
  data={[
    { url: 'http://example.com/peanut-butter-cookies.html' },
    {
      url: 'http://example.com/triple-chocolate-chunk.html',
    },
  ]}
/>
```

**Data required properties**

| Property | Info                             |
| -------- | -------------------------------- |
| `url`    | URL of the item's detailed page. |

#### Course

```svelte
<script>

  import { CarouselJsonLd } from 'somerset';

</script>

<h1>Carousel Course JSON-LD</h1>
<CarouselJsonLd
  ofType="course"
  data={[
    {
      courseName: 'Course 1',
      description: 'Course 1 Description',
      providerName: 'Course Provider',
      url: 'http://example.com/course-1.html',
    },
    {
      courseName: 'Course 2',
      description: 'Course 2 Description',
      providerName: 'Course Provider',
      url: 'http://example.com/course-2.html',
    },
  ]}
/>
```

**Data required properties**

| Property       | Info                                                         |
| -------------- | ------------------------------------------------------------ |
| `courseName`   | The title of the course.                                     |
| `description`  | A description of the course. Display limit of 60 characters. |
| `providerName` | The course provider name.                                    |
| `url`          | URL of the item's detailed page .                            |

**Data Recommended properties**

| Property      | Info                            |
| ------------- | ------------------------------- |
| `providerUrl` | The url to the course provider. |

#### Movie

```svelte
<script>

  import { CarouselJsonLd } from 'somerset';

</script>

<h1>Carousel Movie JSON-LD</h1>
<CarouselJsonLd
  ofType="movie"
  data={[
    {
      name: 'Movie 1',
      url: 'http://example.com/movie-1.html',
      image:
        'https://i.pinimg.com/originals/96/a0/0d/96a00d42b0ff8f80b7cdf2926a211e47.jpg',
      director: {
        name: 'John Doe',
      },
      review: {
        author: { type: 'Person', name: 'Ronan Farrow' },
        reviewBody:
          'Heartbreaking, inpsiring, moving. Bradley Cooper is a triple threat.',
        reviewRating: { ratingValue: '5' },
      },
    },
    {
      name: 'Movie 2',
      url: 'http://example.com/movie-1.html',
      image:
        'https://i.pinimg.com/originals/96/a0/0d/96a00d42b0ff8f80b7cdf2926a211e47.jpg',
      director: [
        {
          name: 'Mary Doe',
        },
        {
          name: 'John Doe',
        },
      ],
      review: {
        author: { type: 'Person', name: 'Ronan Farrow' },
        reviewBody:
          'Heartbreaking, inpsiring, moving. Rowan Atkinson is a triple threat.',
        reviewRating: { ratingValue: '5' },
      },
    },
  ]}
/>
```

**Data required properties**

| Property | Info                                |
| -------- | ----------------------------------- |
| `name`   | Name of the movie.                  |
| `image`  | An image that represents the movie. |
| `url`    | URL of the item's detailed page.    |

**Data Recommended properties**

| Property          | Info                                   |
| ----------------- | -------------------------------------- |
| `director`        | The directors of the movie.            |
| `dateCreated`     | The date the movie was released.       |
| `aggregateRating` | Aggregate Rating object for the movie. |
| `review`          | Review for the movie.                  |

#### Recipe

```svelte
<script>

import { CarouselJsonLd } from 'somerset';

</script>

<h1>Carousel Recipe JSON-LD</h1>
<CarouselJsonLd
  ofType="recipe"
  data={[
    {
      name: 'Party Coffee Cake',
      url: 'http://example.com/recipe-1.html',
      images: [
        'https://example.com/photos/1x1/photo.jpg',
        'https://example.com/photos/4x3/photo.jpg',
        'https://example.com/photos/16x9/photo.jpg',
      ],
      authorName: 'Mary Stone',
      datePublished: '2018-03-10',
      description: 'This coffee cake is awesome and perfect for parties.',
      prepTime: 'PT20M',
      cookTime: 'PT30M',
      totalTime: 'PT50M',
      keywords: 'cake for a party, coffee',
      yields: '10',
      category: 'Dessert',
      calories: 270,
      cuisine: 'American',
      ingredients: [
        '2 cups of flour',
        '3/4 cup white sugar',
        '2 teaspoons baking powder',
        '1/2 teaspoon salt',
        '1/2 cup butter',
        '2 eggs',
        '3/4 cup milk',
      ],
      instructions: [
        {
          name: 'Preheat',
          text: 'Preheat the oven to 350 degrees F. Grease and flour a 9x9 inch pan.',
          url: 'https://example.com/party-coffee-cake#step1',
          image: 'https://example.com/photos/party-coffee-cake/step1.jpg',
        },
        {
          name: 'Mix dry ingredients',
          text: 'In a large bowl, combine flour, sugar, baking powder, and salt.',
          url: 'https://example.com/party-coffee-cake#step2',
          image: 'https://example.com/photos/party-coffee-cake/step2.jpg',
        },
        {
          name: 'Spread into pan',
          text: 'Spread into the prepared pan.',
          url: 'https://example.com/party-coffee-cake#step4',
          image: 'https://example.com/photos/party-coffee-cake/step4.jpg',
        },
        {
          name: 'Bake',
          text: 'Bake for 30 to 35 minutes, or until firm.',
          url: 'https://example.com/party-coffee-cake#step5',
          image: 'https://example.com/photos/party-coffee-cake/step5.jpg',
        },
      ],
      aggregateRating: {
        ratingValue: '5',
        ratingCount: '18',
      },
      video: {
        name: 'How to make a Party Coffee Cake',
        description: 'This is how you make a Party Coffee Cake.',
        thumbnailUrls: [
          'https://example.com/photos/1x1/photo.jpg',
          'https://example.com/photos/4x3/photo.jpg',
          'https://example.com/photos/16x9/photo.jpg',
        ],
        contentUrl: 'http://www.example.com/video123.mp4',
        embedUrl: 'http://www.example.com/videoplayer?video=123',
        uploadDate: '2018-02-05T08:00:00+08:00',
        duration: 'PT1M33S',
        expires: '2019-02-05T08:00:00+08:00',
      },
    },
    {
      name: 'Party Coffee Cake 2',
      url: 'http://example.com/recipe-2.html',
      images: [
        'https://example.com/photos/1x1/photo.jpg',
        'https://example.com/photos/4x3/photo.jpg',
        'https://example.com/photos/16x9/photo.jpg',
      ],
      authorName: 'Mary Stone 2',
      datePublished: '2018-03-10',
      description: 'This coffee cake is awesome and perfect for parties.',
      prepTime: 'PT20M',
      cookTime: 'PT30M',
      totalTime: 'PT50M',
      keywords: 'cake for a party, coffee',
      yields: '10',
      category: 'Dessert',
      calories: 270,
      cuisine: 'American',
      ingredients: [
        '2 cups of flour',
        '3/4 cup white sugar',
        '2 teaspoons baking powder',
        '1/2 teaspoon salt',
        '1/2 cup butter',
        '2 eggs',
        '3/4 cup milk',
      ],
      instructions: [
        {
          name: 'Preheat',
          text: 'Preheat the oven to 350 degrees F. Grease and flour a 9x9 inch pan.',
          url: 'https://example.com/party-coffee-cake#step1',
          image: 'https://example.com/photos/party-coffee-cake/step1.jpg',
        },
        {
          name: 'Mix dry ingredients',
          text: 'In a large bowl, combine flour, sugar, baking powder, and salt.',
          url: 'https://example.com/party-coffee-cake#step2',
          image: 'https://example.com/photos/party-coffee-cake/step2.jpg',
        },
        {
          name: 'Spread into pan',
          text: 'Spread into the prepared pan.',
          url: 'https://example.com/party-coffee-cake#step4',
          image: 'https://example.com/photos/party-coffee-cake/step4.jpg',
        },
        {
          name: 'Bake',
          text: 'Bake for 30 to 35 minutes, or until firm.',
          url: 'https://example.com/party-coffee-cake#step5',
          image: 'https://example.com/photos/party-coffee-cake/step5.jpg',
        },
      ],
      aggregateRating: {
        ratingValue: '5',
        ratingCount: '18',
      },
      video: {
        name: 'How to make a Party Coffee Cake',
        description: 'This is how you make a Party Coffee Cake.',
        thumbnailUrls: [
          'https://example.com/photos/1x1/photo.jpg',
          'https://example.com/photos/4x3/photo.jpg',
          'https://example.com/photos/16x9/photo.jpg',
        ],
        contentUrl: 'http://www.example.com/video123.mp4',
        embedUrl: 'http://www.example.com/videoplayer?video=123',
        uploadDate: '2018-02-05T08:00:00+08:00',
        duration: 'PT1M33S',
        expires: '2019-02-05T08:00:00+08:00',
      },
    },
  ]}
/>
```

**Data required properties**

| Property            | Info                                    |
| ------------------- | --------------------------------------- |
| `name`              | The name of the dish.                   |
| `description`       | A description of the recipe             |
| `authorName`        | The name of the recipe author           |
| `ingredients`       | A list of ingredient strings            |
| `instructions`      | -                                       |
| `instructions.name` | The name of the instruction step.       |
| `instructions.text` | The directions of the instruction step. |
| `url`               | URL of the item's detailed page.        |

### Software App

```svelte
<script>

  import { SoftwareAppJsonLd } from 'somerset';

</script>

<h1>Software App JSON-LD</h1>
<SoftwareAppJsonLd
  name="Angry Birds"
  price="1.00"
  priceCurrency="USD"
  aggregateRating={{ ratingValue: '4.6', reviewCount: '8864' }}
  operatingSystem="ANDROID"
  applicationCategory="GameApplication"
/>
```

**Data required properties**

| Property          | Info                                                                      |
| ----------------- | ------------------------------------------------------------------------- |
| `name`            | The name of the app.                                                      |
| `price`           | Price of the app. If the app is free of charge, set offers.price to 0     |
| `priceCurrency`   | If the app has a price greater than 0, you must include offers.currency.  |
| `aggregateRating` | The average review score of the app. (Not required if review is present.) |
| `review`          | A single review of the app. (Not required if aggregateRating is present.) |

**Data Recommended properties**

| Property              | Info                              |
| --------------------- | --------------------------------- |
| `operatingSystem`     | The operating System suuported    |
|                       | By the game it self.              |
| `applicationCategory` | Desktop Software or Video Game... |

For reference and more info check [Google docs for Software App](https://developers.google.com/search/docs/data-types/software-app)

### Organization

```svelte
<script>

  import { OrganizationJsonLd } from 'somerset';

</script>

<h1>Organization JSON-LD</h1>
<OrganizationJsonLd
  type="Corporation"
  id="https://www.purpule-fox.io/#corporation"
  logo="https://www.example.com/photos/logo.jpg"
  legalName="Purple Fox LLC"
  name="Purple Fox"
  address={{
    streetAddress: '1600 Saratoga Ave',
    addressLocality: 'San Jose',
    addressRegion: 'CA',
    postalCode: '95129',
    addressCountry: 'US',
  }}
  contactPoint={[
    {
      telephone: '+1-401-555-1212',
      contactType: 'customer service',
      email: 'customerservice@email.com',
      areaServed: 'US',
      availableLanguage: ['English', 'Spanish', 'French'],
    },
    {
      telephone: '+1-877-746-0909',
      contactType: 'customer service',
      email: 'servicecustomer@email.com',
      contactOption: 'TollFree',
      availableLanguage: 'English',
    },
    {
      telephone: '+1-877-453-1304',
      contactType: 'technical support',
      contactOption: 'TollFree',
      areaServed: ['US', 'CA'],
      availableLanguage: ['English', 'French'],
    },
  ]}
  sameAs={['https://www.orange-fox.com']}
  url="https://www.purpule-fox.io/"
/>
```

**Data required properties**

| Property                   | Info                                                                                            |
| -------------------------- | ----------------------------------------------------------------------------------------------- |
| `name`                     | The name of the Organization.                                                                   |
| `url`                      | Url of the organization                                                                         |
| `contactPoint`             |                                                                                                 |
| `contactPoint.telephone`   | An internationalized version of the phone number, starting with the "+" symbol and country code |
| `contactPoint.contactType` | Description of the purpose of the phone number i.e. `Technical Support`.                        |

**Data Recommended properties**

| Property                         | Info                                                                                                       |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `logo`                           | ImageObject or URL an associated logo to the Organization.                                                 |
| `type`                           | Organization type, check [here](https://schema.org/Organization#subtypes)                                  |
| `legalName`                      | The official name of the organization, e.g. the registered company name.                                   |
| `sameAs`                         | URL of a reference Web page that unambiguously indicates the item's identity.                              |
| `address`                        | Address of the specific business location                                                                  |
| `address.addressCountry`         | The 2-letter ISO 3166-1 alpha-2 country code                                                               |
| `address.addressLocality`        | City                                                                                                       |
| `address.addressRegion`          | State or province, if applicable.                                                                          |
| `address.postalCode`             | Postal or zip code.                                                                                        |
| `address.streetAddress`          | Street number, street name, and unit number.                                                               |
| `contactPoint.areaServed`        | `String` or `Array` of geographical regions served by the business. Example `"US"` or `["US", "CA", "MX"]` |
| `contactPoint.availableLanguage` | Details about the language spoken. Example `"English"` or `["English", "French"]`                          |
| `contactPoint.email`             | Email asscosiated with the business`                                                                       |

For reference and more info check [Docs](https://schema.org/Organization)

### Brand

```svelte
<script>

  import { BrandJsonLd } from 'somerset';

</script>

<h1>Brand JSON-LD</h1>
<BrandJsonLd
  slogan="What does the fox say?"
  id="https://www.purpule-fox.io/#corporation"
  logo="https://www.example.com/photos/logo.jpg"
  aggregateRating={{
    ratingValue: '5',
    ratingCount: '18',
  }}
/>
```

**Data required properties**

| Property | Info                         |
| -------- | ---------------------------- |
| `id`     | 'URL to main entity of page' |

**Data Recommended properties**

| Property                      | Info                                                                                     |
| ----------------------------- | ---------------------------------------------------------------------------------------- |
| `logo`                        | ImageObject or URL an associated logo to the Organization.                               |
| `slogan`                      | A slogan or motto associated with the item.                                              |
| `aggregateRating.ratingValue` | The rating for the content.(Check the [reference](https://schema.org/ratingValue)        |
| `aggregateRating.ratingCount` | The count of total number of ratings.                                                    |
| `aggregateRating.reviewCount` | The count of total number of reviews.                                                    |
| `aggregateRating.bestRating`  | The highest value allowed in this rating system. If bestRating is omitted, 5 is assumed. |

For reference and more info check [Docs](https://schema.org/Brand)

### WebPage

```svelte
<script>

  import { WebPageJsonLd } from 'somerset';

</script>

<h1>WebPage JSON-LD</h1>
<WebPageJsonLd
  description="What does the fox say?"
  id="https://www.purpule-fox.io/#corporation"
  lastReviewed="2021-05-26T05:59:02.085Z"
  reviewedBy={{
    type: 'Person',
    name: 'Garmeeh',
  }}
/>
```

**Data required properties**

| Property | Info                         |
| -------- | ---------------------------- |
| `id`     | 'URL to main entity of page' |

**Data Recommended properties**

| Property          | Info                                                                                                 |
| ----------------- | ---------------------------------------------------------------------------------------------------- |
| `description`     | ImageObject or URL an associated logo to the Organization.                                           |
| `lastReviewed`    | Date on which the content on this web page was last reviewed for accuracy and/or completeness.       |
| `reviewedBy.type` | People or organizations that will review the content of the web page.                                |
| `reviewedBy.name` | Name of the entity that have reviewed the content on this web page for accuracy and/or completeness. |

For reference and more info check [Docs](https://schema.org/WebPage)

### Image Metadata

```svelte
<script>

  import { ImageJsonLd } from 'somerset';

</script>

<h1>Image</h1>
<ImageJsonLd
  images={[
    {
      contentUrl: 'http://www.example.com/images/image.png',
      creator: {
        '@type': 'Person',
        name: 'Jane Doe',
      },
      creditText: 'Jane Doe',
      copyrightNotice: '© Jane Doe',
      license: 'http://www.example.com/license',
      acquireLicensePage: 'http://www.example.com/acquire-license',
    },
  ]}
/>
```

**Data Recommended properties**

| Property             | Info                                                                                                                                                    |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contentUrl`         | A URL to the actual image content. Google uses contentUrl to determine which image the photo metadata applies to.                                       |
| `creator.name`       | The name of the creator.                                                                                                                                |
| `creditText`         | The name of person and/or organization that is credited for the image when it's published.                                                              |
| `copyrightNotice`    | The copyright notice for claiming the intellectual property for this photograph. This identifies the current owner of the copyright for the photograph. |
| `license`            | A URL to a page that describes the license governing an image's use. For example, it could be the terms and conditions that you have on your website.   |
| `acquireLicensePage` | A URL to a page where the user can find information on how to license that image.                                                                       |

For reference and more info check [Google Docs](https://developers.google.com/search/docs/appearance/structured-data/image-license-metadata)

