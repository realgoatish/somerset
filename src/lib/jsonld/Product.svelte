<script context="module" lang="ts">
	export interface ProductJsonLdProps extends JsonLdProps {
		productName: string;
		images?: string[];
		description?: string;
		brand?: string;
		reviews?: Review[];
		aggregateRating?: AggregateRating;
		offers?: Offers | Offers[];
		aggregateOffer?: AggregateOffer;
		sku?: string;
		gtin8?: string;
		gtin13?: string;
		gtin14?: string;
		mpn?: string;
		color?: string;
		manufacturerName?: string;
		manufacturerLogo?: string;
		material?: string;
		slogan?: string;
		disambiguatingDescription?: string;
		productionDate?: string;
		purchaseDate?: string;
		releaseDate?: string;
		award?: string;
	}
</script>

<script lang="ts">
	import { JsonLd } from './jsonld.js';
	import type { JsonLdProps } from './jsonld.js';
	import type { Review, AggregateRating, AggregateOffer, Offers } from '../types.js';

	import { setOffers } from '../utils/schema/setOffers.js';
	import { setReviews } from '../utils/schema/setReviews.js';
	import { setAggregateRating } from '../utils/schema/setAggregateRating.js';
	import { setAggregateOffer } from '../utils/schema/setAggregateOffer.js';
	import { setManufacturer } from '../utils/schema/setManufacturer.js';
	import { setBrand } from '../utils/schema/setBrand.js';

	export let keyOverride: ProductJsonLdProps['keyOverride'] = undefined;
	export let productName: ProductJsonLdProps['productName'];
	export let images: ProductJsonLdProps['images'] = undefined;
	export let description: ProductJsonLdProps['description'] = undefined;
	export let brand: ProductJsonLdProps['brand'] = undefined;
	export let reviews: ProductJsonLdProps['reviews'] = undefined;
	export let aggregateRating: ProductJsonLdProps['aggregateRating'] = undefined;
	export let offers: ProductJsonLdProps['offers'] = undefined;
	export let aggregateOffer: ProductJsonLdProps['aggregateOffer'] = undefined;
	export let sku: ProductJsonLdProps['sku'] = undefined;
	export let gtin8: ProductJsonLdProps['gtin8'] = undefined;
	export let gtin13: ProductJsonLdProps['gtin13'] = undefined;
	export let gtin14: ProductJsonLdProps['gtin14'] = undefined;
	export let mpn: ProductJsonLdProps['mpn'] = undefined;
	export let color: ProductJsonLdProps['color'] = undefined;
	export let manufacturerName: ProductJsonLdProps['manufacturerName'] = undefined;
	export let manufacturerLogo: ProductJsonLdProps['manufacturerLogo'] = undefined;
	export let material: ProductJsonLdProps['material'] = undefined;
	export let slogan: ProductJsonLdProps['slogan'] = undefined;
	export let disambiguatingDescription: ProductJsonLdProps['disambiguatingDescription'] = undefined;
	export let productionDate: ProductJsonLdProps['productionDate'] = undefined;
	export let purchaseDate: ProductJsonLdProps['purchaseDate'] = undefined;
	export let releaseDate: ProductJsonLdProps['releaseDate'] = undefined;
	export let award: ProductJsonLdProps['award'] = undefined;

	function ProductJsonLd({
		type = 'Product',
		keyOverride,
		images,
		brand,
		reviews,
		aggregateRating,
		manufacturerLogo,
		manufacturerName,
		offers,
		aggregateOffer,
		productName,
		...rest
	}: ProductJsonLdProps) {
		const data = {
			...rest,
			image: images,
			brand: setBrand(brand),
			review: setReviews(reviews),
			aggregateRating: setAggregateRating(aggregateRating),
			manufacturer: setManufacturer({ manufacturerLogo, manufacturerName }),
			offers: offers ? setOffers(offers) : setAggregateOffer(aggregateOffer),
			name: productName
		};
		return JsonLd({
			type,
			keyOverride,
			...data,
			scriptKey: 'Product'
		});
	}
</script>

<svelte:head>
	{@html ProductJsonLd({
		keyOverride,
		productName,
		images,
		description,
		brand,
		reviews,
		aggregateRating,
		offers,
		aggregateOffer,
		sku,
		gtin8,
		gtin13,
		gtin14,
		mpn,
		color,
		manufacturerName,
		manufacturerLogo,
		material,
		slogan,
		disambiguatingDescription,
		productionDate,
		purchaseDate,
		releaseDate,
		award
	})}
</svelte:head>
