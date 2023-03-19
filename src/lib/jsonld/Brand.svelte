<script context="module" lang="ts">
	export interface BrandJsonLdProps extends JsonLdProps {
		id: string;
		slogan?: string;
		logo?: string;
		aggregateRating?: AggregateRating;
	}
</script>

<script lang="ts">
	import type { AggregateRating } from '../types.js';
	import { setAggregateRating } from '../utils/schema/setAggregateRating.js';
	import { JsonLd } from './jsonld.js';
	import type { JsonLdProps } from './jsonld.js';

	export let keyOverride: BrandJsonLdProps['keyOverride'] = undefined;
	export let id: BrandJsonLdProps['id'];
	export let slogan: BrandJsonLdProps['slogan'] = undefined;
	export let logo: BrandJsonLdProps['logo'] = undefined;
	export let aggregateRating: BrandJsonLdProps['aggregateRating'] = undefined;

	function BrandJsonLd({
		type = 'Brand',
		id,
		keyOverride,
		aggregateRating,
		...rest
	}: BrandJsonLdProps) {
		const data = {
			aggregateRating: setAggregateRating(aggregateRating),
			'@id': id,
			...rest
		};
		return JsonLd({
			type,
			keyOverride,
			...data,
			scriptKey: 'brand'
		});
	}
</script>

<svelte:head>
	{@html BrandJsonLd({
		keyOverride,
		id,
		slogan,
		logo,
		aggregateRating
	})}
</svelte:head>
