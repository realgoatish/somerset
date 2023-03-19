<script context="module" lang="ts">
	export interface SoftwareAppJsonLdProps extends JsonLdProps {
		name: string;
		price: string;
		priceCurrency: string;
		applicationCategory?: string;
		operatingSystem?: string;
		review?: Review;
		aggregateRating?: AggregateRating;
	}
</script>

<script lang="ts">
	import { JsonLd } from './jsonld.js';
	import type { JsonLdProps } from './jsonld.js';
	import type { Review, AggregateRating } from '../types.js';
	import { setAggregateRating } from '../utils/schema/setAggregateRating.js';
	import { setReviews } from '../utils/schema/setReviews.js';

	export let keyOverride: SoftwareAppJsonLdProps['keyOverride'] = undefined;
	export let name: SoftwareAppJsonLdProps['name'];
	export let price: SoftwareAppJsonLdProps['price'];
	export let priceCurrency: SoftwareAppJsonLdProps['priceCurrency'];
	export let applicationCategory: SoftwareAppJsonLdProps['applicationCategory'] = undefined;
	export let operatingSystem: SoftwareAppJsonLdProps['operatingSystem'] = undefined;
	export let review: SoftwareAppJsonLdProps['review'] = undefined;
	export let aggregateRating: SoftwareAppJsonLdProps['aggregateRating'] = undefined;

	function SoftwareAppJsonLd({
		type = 'SoftwareApplication',
		keyOverride,
		priceCurrency,
		price,
		aggregateRating,
		review,
		...rest
	}: SoftwareAppJsonLdProps) {
		const data = {
			...rest,
			offers: {
				'@type': 'Offer',
				price,
				priceCurrency
			},
			aggregateRating: setAggregateRating(aggregateRating),
			review: setReviews(review)
		};
		return JsonLd({
			type,
			keyOverride,
			...data,
			scriptKey: 'SoftwareApp'
		});
	}
</script>

<svelte:head>
	{@html SoftwareAppJsonLd({
		keyOverride,
		name,
		price,
		priceCurrency,
		applicationCategory,
		operatingSystem,
		review,
		aggregateRating
	})}
</svelte:head>
