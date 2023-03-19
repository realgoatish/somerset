<script context="module" lang="ts">
	export interface VideoGameJsonLdProps extends JsonLdProps {
		keyOverride?: string;
		name: string;
		url?: string;
		image?: string;
		description?: string;
		languageName?: string | string[];
		translatorName?: string | string[];
		authorName?: string;
		aggregateRating?: AggregateRating;
		applicationCategory?: ApplicationCategory;
		platformName?: string | string[];
		operatingSystemName?: string | string[];
		datePublished?: string;
		keywords?: string;
		producerName?: string;
		producerUrl?: string;
		providerName?: string;
		providerUrl?: string;
		publisherName?: string | string[];
		offers?: Offers | Offers[];
		genreName?: string | string[];
		playMode?: GamePlayMode | GamePlayMode[];
		processorRequirements?: string;
		memoryRequirements?: string;
		storageRequirements?: string;
		trailer?: Video;
		reviews?: Review[];
	}
</script>

<script lang="ts">
	import type {
		Offers,
		AggregateRating,
		GamePlayMode,
		Video,
		Review,
		ApplicationCategory
	} from '../types.js';
	import { setAggregateRating } from '../utils/schema/setAggregateRating.js';
	import { setAuthor } from '../utils/schema/setAuthor.js';
	import { setImage } from '../utils/schema/setImage.js';
	import { setOffers } from '../utils/schema/setOffers.js';
	import { setProducer } from '../utils/schema/setProducer.js';
	import { setProvider } from '../utils/schema/setProvider.js';
	import { setReviews } from '../utils/schema/setReviews.js';
	import { setVideo } from '../utils/schema/setVideo.js';

	import { JsonLd } from './jsonld.js';
	import type { JsonLdProps } from './jsonld.js';

	export let keyOverride: VideoGameJsonLdProps['keyOverride'] = undefined;
	export let name: VideoGameJsonLdProps['name'];
	export let url: VideoGameJsonLdProps['url'] = undefined;
	export let image: VideoGameJsonLdProps['image'] = undefined;
	export let description: VideoGameJsonLdProps['description'] = undefined;
	export let languageName: VideoGameJsonLdProps['languageName'] = undefined;
	export let translatorName: VideoGameJsonLdProps['translatorName'] = undefined;
	export let authorName: VideoGameJsonLdProps['authorName'] = undefined;
	export let aggregateRating: VideoGameJsonLdProps['aggregateRating'] = undefined;
	export let applicationCategory: VideoGameJsonLdProps['applicationCategory'] = undefined;
	export let platformName: VideoGameJsonLdProps['platformName'] = undefined;
	export let operatingSystemName: VideoGameJsonLdProps['operatingSystemName'] = undefined;
	export let datePublished: VideoGameJsonLdProps['datePublished'] = undefined;
	export let keywords: VideoGameJsonLdProps['keywords'] = undefined;
	export let producerName: VideoGameJsonLdProps['producerName'] = undefined;
	export let producerUrl: VideoGameJsonLdProps['producerUrl'] = undefined;
	export let providerName: VideoGameJsonLdProps['providerName'] = undefined;
	export let providerUrl: VideoGameJsonLdProps['providerUrl'] = undefined;
	export let publisherName: VideoGameJsonLdProps['publisherName'] = undefined;
	export let offers: VideoGameJsonLdProps['offers'] = undefined;
	export let genreName: VideoGameJsonLdProps['genreName'] = undefined;
	export let playMode: VideoGameJsonLdProps['playMode'] = undefined;
	export let processorRequirements: VideoGameJsonLdProps['processorRequirements'] = undefined;
	export let memoryRequirements: VideoGameJsonLdProps['memoryRequirements'] = undefined;
	export let storageRequirements: VideoGameJsonLdProps['storageRequirements'] = undefined;
	export let trailer: VideoGameJsonLdProps['trailer'] = undefined;
	export let reviews: VideoGameJsonLdProps['reviews'] = undefined;

	function VideoGameJsonLd({
		type = 'VideoGame',
		keyOverride,
		aggregateRating,
		trailer,
		reviews,
		image,
		authorName,
		provider,
		producerName,
		producerUrl,
		offers,
		operatingSystemName,
		platformName,
		translatorName,
		languageName,
		genreName,
		publisherName,
		...rest
	}: VideoGameJsonLdProps) {
		const data = {
			...rest,
			aggregateRating: setAggregateRating(aggregateRating),
			trailer: setVideo(trailer),
			review: setReviews(reviews),
			image: setImage(image),
			author: setAuthor(authorName),
			provider: setProvider(provider),
			producer: setProducer({ name: producerName, url: producerUrl } as any),
			offers: setOffers(offers),
			operatingSystem: operatingSystemName,
			gamePlatform: platformName,
			translator: translatorName,
			inLanguage: languageName,
			genre: genreName,
			publisher: publisherName
		};

		return JsonLd({
			type,
			keyOverride,
			...data,
			scriptKey: 'VideoGame'
		});
	}
</script>

<svelte:head>
	{@html VideoGameJsonLd({
		keyOverride,
		name,
		url,
		image,
		description,
		languageName,
		translatorName,
		authorName,
		aggregateRating,
		applicationCategory,
		platformName,
		operatingSystemName,
		datePublished,
		keywords,
		producerName,
		producerUrl,
		providerName,
		providerUrl,
		publisherName,
		offers,
		genreName,
		playMode,
		processorRequirements,
		memoryRequirements,
		storageRequirements,
		trailer,
		reviews
	})}
</svelte:head>
