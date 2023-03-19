<script context="module" lang="ts">
	export interface NewsArticleJsonLdProps extends JsonLdProps {
		url: string;
		title: string;
		images: ReadonlyArray<string>;
		section: string;
		keywords: string;
		dateCreated: string;
		datePublished: string;
		dateModified?: string;
		authorName: string | string[];
		description: string;
		body: string;
		publisherName: string;
		publisherLogo: string;
	}
</script>

<script lang="ts">
	import { setAuthor } from '../utils/schema/setAuthor.js';
	import { setPublisher } from '../utils/schema/setPublisher.js';

	import { JsonLd } from './jsonld.js';
	import type { JsonLdProps } from './jsonld.js';

	export let keyOverride: NewsArticleJsonLdProps['keyOverride'] = undefined;
	export let url: NewsArticleJsonLdProps['url'];
	export let title: NewsArticleJsonLdProps['title'];
	export let images: NewsArticleJsonLdProps['images'];
	export let section: NewsArticleJsonLdProps['section'];
	export let keywords: NewsArticleJsonLdProps['keywords'];
	export let dateCreated: NewsArticleJsonLdProps['dateCreated'];
	export let datePublished: NewsArticleJsonLdProps['datePublished'];
	export let dateModified: NewsArticleJsonLdProps['dateModified'];
	export let authorName: NewsArticleJsonLdProps['authorName'];
	export let description: NewsArticleJsonLdProps['description'];
	export let body: NewsArticleJsonLdProps['body'];
	export let publisherName: NewsArticleJsonLdProps['publisherName'];
	export let publisherLogo: NewsArticleJsonLdProps['publisherLogo'];

	function NewsArticleJsonLd({
		type = 'NewsArticle',
		keyOverride,
		url,
		title,
		images,
		section,
		dateCreated,
		datePublished,
		dateModified,
		authorName,
		publisherName,
		publisherLogo,
		body,
		...rest
	}: NewsArticleJsonLdProps) {
		const data = {
			...rest,
			mainEntityOfPage: {
				'@type': 'WebPage',
				'@id': url
			},
			headline: title,
			image: images,
			articleSection: section,
			dateCreated: dateCreated || datePublished,
			datePublished,
			dateModified: dateModified || datePublished,
			author: setAuthor(authorName),
			publisher: setPublisher(publisherName, publisherLogo),
			articleBody: body
		};

		return JsonLd({
			type,
			keyOverride,
			...data,
			scriptKey: 'NewsArticle'
		});
	}
</script>

<svelte:head>
	{@html NewsArticleJsonLd({
		keyOverride,
		url,
		title,
		images,
		section,
		keywords,
		dateCreated,
		datePublished,
		dateModified,
		authorName,
		description,
		body,
		publisherName,
		publisherLogo
	})}
</svelte:head>
