<script context="module" lang="ts">
	export interface LocalBusinessJsonLdProps extends JsonLdProps {
		type: string;
		id: string;
		name: string;
		description: string;
		url?: string;
		telephone?: string;
		address: Address | Address[];
		geo?: Geo;
		images?: string[];
		rating?: AggregateRating;
		review?: Review[];
		priceRange?: string;
		servesCuisine?: string | string[];
		sameAs?: string[];
		openingHours?: OpeningHoursSpecification | OpeningHoursSpecification[];
		action?: Action;
		areaServed?: GeoCircle[];
		makesOffer?: Offer[];
	}
</script>

<script lang="ts">
	import { JsonLd } from './jsonld.js';
	import type { JsonLdProps } from './jsonld.js';
	import type {
		Address,
		Geo,
		AggregateRating,
		Review,
		Action,
		GeoCircle,
		OpeningHoursSpecification,
		Offer
	} from '../types.js';
	import { setAddress } from '../utils/schema/setAddress.js';
	import { setReviews } from '../utils/schema/setReviews.js';
	import { setGeo } from '../utils/schema/setGeo.js';
	import { setAggregateRating } from '../utils/schema/setAggregateRating.js';
	import { setAction } from '../utils/schema/setAction.js';
	import { setGeoCircle } from '../utils/schema/setGeoCircle.js';
	import { setOffer } from '../utils/schema/setOffer.js';
	import { setOpeningHours } from '../utils/schema/setOpeningHours.js';

	export let keyOverride: LocalBusinessJsonLdProps['keyOverride'] = undefined;
	export let type: LocalBusinessJsonLdProps['type'];
	export let id: LocalBusinessJsonLdProps['id'];
	export let name: LocalBusinessJsonLdProps['name'];
	export let description: LocalBusinessJsonLdProps['description'];
	export let url: LocalBusinessJsonLdProps['url'] = undefined;
	export let telephone: LocalBusinessJsonLdProps['telephone'] = undefined;
	export let address: LocalBusinessJsonLdProps['address'];
	export let geo: LocalBusinessJsonLdProps['geo'] = undefined;
	export let images: LocalBusinessJsonLdProps['images'] = undefined;
	export let rating: LocalBusinessJsonLdProps['rating'] = undefined;
	export let review: LocalBusinessJsonLdProps['review'] = undefined;
	export let priceRange: LocalBusinessJsonLdProps['priceRange'] = undefined;
	export let servesCuisine: LocalBusinessJsonLdProps['servesCuisine'] = undefined;
	export let sameAs: LocalBusinessJsonLdProps['sameAs'] = undefined;
	export let openingHours: LocalBusinessJsonLdProps['openingHours'] = undefined;
	export let action: LocalBusinessJsonLdProps['action'] = undefined;
	export let areaServed: LocalBusinessJsonLdProps['areaServed'] = undefined;
	export let makesOffer: LocalBusinessJsonLdProps['makesOffer'] = undefined;

	function LocalBusinessJsonLd({
		type = 'LocalBusiness',
		keyOverride,
		address,
		geo,
		rating,
		review,
		action,
		areaServed,
		makesOffer,
		openingHours,
		images,
		...rest
	}: LocalBusinessJsonLdProps) {
		const data = {
			...rest,
			image: images,
			address: setAddress(address),
			geo: setGeo(geo),
			aggregateRating: setAggregateRating(rating),
			review: setReviews(review),
			potentialAction: setAction(action),
			areaServed: areaServed && areaServed.map(setGeoCircle),
			makesOffer: makesOffer?.map(setOffer),
			openingHoursSpecification: Array.isArray(openingHours)
				? openingHours.map(setOpeningHours)
				: setOpeningHours(openingHours)
		};

		return JsonLd({
			type,
			keyOverride,
			...data,
			scriptKey: 'LocalBusiness'
		});
	}
</script>

<svelte:head>
	{@html LocalBusinessJsonLd({
		keyOverride,
		type,
		id,
		name,
		description,
		url,
		telephone,
		address,
		geo,
		images,
		rating,
		review,
		priceRange,
		servesCuisine,
		sameAs,
		openingHours,
		action,
		areaServed,
		makesOffer
	})}
</svelte:head>
