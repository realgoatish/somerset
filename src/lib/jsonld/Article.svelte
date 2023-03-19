<script context="module" lang="ts">
	export interface ArticleJsonLdProps extends JsonLdProps {
		type?: 'Article' | 'BlogPosting' | 'NewsArticle' | 'Blog';
		url: string;
		title: string;
		images: ReadonlyArray<string>;
		datePublished: string;
		dateModified?: string;
		authorName: string | string[] | ArticleAuthor | ArticleAuthor[];
		description: string;
		publisherName?: string;
		publisherLogo?: string;
		isAccessibleForFree?: boolean;
	}
</script>

<script lang="ts">
	import type { JsonLdProps } from './jsonld.js';
	import { JsonLd } from './jsonld.js';
	import { setAuthor } from '../utils/schema/setAuthor.js';
	import { setPublisher } from '../utils/schema/setPublisher.js';
	import type { ArticleAuthor } from '../types.js';

	export let type: ArticleJsonLdProps['type'] = 'Article';
	export let keyOverride: ArticleJsonLdProps['keyOverride'];
	export let url: ArticleJsonLdProps['url'];
	export let title: ArticleJsonLdProps['title'];
	export let images: ArticleJsonLdProps['images'];
	export let datePublished: ArticleJsonLdProps['datePublished'];
	export let dateModified: ArticleJsonLdProps['dateModified'] = undefined;
	export let authorName: ArticleJsonLdProps['authorName'];
	export let description: ArticleJsonLdProps['description'];
	export let publisherName: ArticleJsonLdProps['publisherName'] = undefined;
	export let publisherLogo: ArticleJsonLdProps['publisherLogo'] = undefined;
	export let isAccessibleForFree: ArticleJsonLdProps['isAccessibleForFree'] = undefined;

	function ArticleJsonLd({
		type = 'Article',
		keyOverride,
		url,
		title,
		images,
		datePublished,
		dateModified,
		authorName,
		publisherName = undefined,
		publisherLogo = undefined,
		description,
		isAccessibleForFree,
		...rest
	}: ArticleJsonLdProps) {
		const data = {
			datePublished,
			description,
			mainEntityOfPage: {
				'@type': 'WebPage',
				'@id': url
			},
			headline: title,
			image: images,
			dateModified: dateModified || datePublished,
			author: setAuthor(authorName),
			publisher: setPublisher(publisherName, publisherLogo),
			isAccessibleForFree,
			...rest
		};
		return JsonLd({
			type,
			keyOverride,
			...data,
			scriptKey: 'article'
		});
	}
</script>

<svelte:head>
	{@html ArticleJsonLd({
		type,
		keyOverride,
		url,
		title,
		images,
		datePublished,
		dateModified,
		authorName,
		publisherName,
		publisherLogo,
		description,
		isAccessibleForFree
	})}
</svelte:head>
