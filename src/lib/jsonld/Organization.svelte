<script context="module" lang="ts">
	export interface OrganizationJsonLdProps extends JsonLdProps {
		type?: OrganizationCategory;
		id?: string;
		name: string;
		logo?: string;
		url: string;
		legalName?: string;
		sameAs?: string[];
		address?: Address | Address[];
		contactPoints?: ContactPoint[];
	}
</script>

<script lang="ts">
	import type { Address, OrganizationCategory, ContactPoint } from '../types.js';
	import { JsonLd } from './jsonld.js';
	import type { JsonLdProps } from './jsonld.js';
	import { setAddress } from '../utils/schema/setAddress.js';
	import { setContactPoints } from '../utils/schema/setContactPoints.js';

	export let keyOverride: OrganizationJsonLdProps['keyOverride'] = undefined;
	export let type: OrganizationJsonLdProps['type'] = undefined;
	export let id: OrganizationJsonLdProps['id'] = undefined;
	export let name: OrganizationJsonLdProps['name'];
	export let logo: OrganizationJsonLdProps['logo'] = undefined;
	export let url: OrganizationJsonLdProps['url'];
	export let legalName: OrganizationJsonLdProps['legalName'] = undefined;
	export let sameAs: OrganizationJsonLdProps['sameAs'] = undefined;
	export let address: OrganizationJsonLdProps['address'] = undefined;
	export let contactPoints: OrganizationJsonLdProps['contactPoints'] = undefined;

	function OrganizationJsonLd({
		type = 'Organization',
		keyOverride,
		address,
		contactPoints,
		...rest
	}: OrganizationJsonLdProps) {
		const data = {
			...rest,
			address: setAddress(address),
			contactPoints: setContactPoints(contactPoints)
		};
		return JsonLd({
			type,
			keyOverride,
			...data,
			scriptKey: 'organization'
		});
	}
</script>

<svelte:head>
	{@html OrganizationJsonLd({
		keyOverride,
		type,
		id,
		name,
		logo,
		url,
		legalName,
		sameAs,
		address,
		contactPoints
	})}
</svelte:head>
