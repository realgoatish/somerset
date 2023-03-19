<script context="module" lang="ts">
	export interface EventJsonLdProps extends JsonLdProps {
		name: string;
		startDate: string;
		endDate: string;
		location: Location;
		url?: string;
		description?: string;
		images?: string[];
		offers?: Offers | Offers[];
		aggregateOffer?: AggregateOffer;
		performers?: Performer | Performer[];
		organizer?: Organizer;
		eventStatus?: EventStatus;
		eventAttendanceMode?: EventAttendanceMode;
	}
</script>

<script lang="ts">
	import { JsonLd } from './jsonld.js';
	import type { JsonLdProps } from './jsonld.js';
	import type {
		Location,
		AggregateOffer,
		Offers,
		Performer,
		Organizer,
		EventStatus,
		EventAttendanceMode
	} from '../types.js';
	import { setLocation } from '../utils/schema/setLocation.js';
	import { setPerformer } from '../utils/schema/setPerformer.js';
	import { setOffers } from '../utils/schema/setOffers.js';
	import { setAggregateOffer } from '../utils/schema/setAggregateOffer.js';
	import { setOrganizer } from '../utils/schema/setOrganizer.js';

	export let keyOverride: EventJsonLdProps['keyOverride'] = undefined;
	export let name: EventJsonLdProps['name'];
	export let startDate: EventJsonLdProps['startDate'];
	export let endDate: EventJsonLdProps['endDate'];
	export let location: EventJsonLdProps['location'];
	export let url: EventJsonLdProps['url'] = undefined;
	export let description: EventJsonLdProps['description'] = undefined;
	export let images: EventJsonLdProps['images'] = undefined;
	export let offers: EventJsonLdProps['offers'] = undefined;
	export let aggregateOffer: EventJsonLdProps['aggregateOffer'] = undefined;
	export let performers: EventJsonLdProps['performers'] = undefined;
	export let eventStatus: EventJsonLdProps['eventStatus'] = undefined;
	export let eventAttendanceMode: EventJsonLdProps['eventAttendanceMode'] = undefined;

	function EventJsonLd({
		type = 'Event',
		keyOverride,
		location,
		images,
		offers,
		aggregateOffer,
		performers,
		organizer,
		eventStatus,
		eventAttendanceMode,
		...rest
	}: EventJsonLdProps) {
		const data = {
			...rest,
			location: setLocation(location),
			image: images,
			offers: offers ? setOffers(offers) : setAggregateOffer(aggregateOffer),
			performer: Array.isArray(performers)
				? performers.map(setPerformer)
				: setPerformer(performers),
			organizer: Array.isArray(organizer) ? organizer.map(setOrganizer) : setOrganizer(organizer),
			eventStatus: `https://schema.org/${eventStatus}`,
			eventAttendanceMode: `https://schema.org/${eventAttendanceMode}`
		};

		return JsonLd({
			type,
			keyOverride,
			...data,
			scriptKey: 'Event'
		});
	}
</script>

<svelte:head>
	{@html EventJsonLd({
		keyOverride,
		name,
		startDate,
		endDate,
		location,
		url,
		description,
		images,
		offers,
		aggregateOffer,
		performers,
		eventStatus,
		eventAttendanceMode
	})}
</svelte:head>
