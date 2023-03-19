<script context="module" lang="ts">
	export interface CollectionPageJsonLdProps extends JsonLdProps {
		name: string;
		hasPart: CreativeWork[];
	}
</script>

<script lang="ts">
	import { JsonLd } from './jsonld.js';
	import type { JsonLdProps } from './jsonld.js';
	import type { CreativeWork } from '../types.js';
	import { setCreativeWork } from '../utils/schema/setCreativeWork.js';

	export let keyOverride: CollectionPageJsonLdProps['keyOverride'] = undefined;
	export let name: CollectionPageJsonLdProps['name'];
	export let hasPart: CollectionPageJsonLdProps['hasPart'];

	function CollectionPageJsonLd({
		type = 'CollectionPage',
		keyOverride,
		hasPart,
		...rest
	}: CollectionPageJsonLdProps) {
		const data = {
			...rest,
			hasPart: hasPart.map(setCreativeWork)
		};
		return JsonLd({
			type,
			keyOverride,
			...data,
			scriptKey: 'CollectionPage'
		});
	}
</script>

<svelte:head>
	{@html CollectionPageJsonLd({
		keyOverride,
		name,
		hasPart
	})}
</svelte:head>
