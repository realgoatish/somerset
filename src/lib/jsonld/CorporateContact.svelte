<script context="module" lang="ts">
	export interface CorporateContactJsonLdProps extends JsonLdProps {
		url: string;
		contactPoint: ContactPoint[];
		logo?: string;
	}
</script>

<script lang="ts">
	import { JsonLd } from './jsonld.js';
	import type { JsonLdProps } from './jsonld.js';
	import type { ContactPoint } from '../types.js';

	import { setContactPoint } from '../utils/schema/setContactPoint.js';

	export let keyOverride: CorporateContactJsonLdProps['keyOverride'] = undefined;
	export let url: CorporateContactJsonLdProps['url'];
	export let contactPoint: CorporateContactJsonLdProps['contactPoint'];
	export let logo: CorporateContactJsonLdProps['logo'] = undefined;

	function CorporateContactJsonLd({
		type = 'Organization',
		keyOverride,
		contactPoint,
		...rest
	}: CorporateContactJsonLdProps) {
		const data = {
			...rest,
			contactPoint: contactPoint.map(setContactPoint)
		};
		return JsonLd({
			type,
			keyOverride,
			...data,
			scriptKey: 'CorporateContact'
		});
	}
</script>

<svelte:head>
	{@html CorporateContactJsonLd({
		keyOverride,
		url,
		contactPoint,
		logo
	})}
</svelte:head>
