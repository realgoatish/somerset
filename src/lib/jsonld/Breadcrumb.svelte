<script context="module" lang="ts">
	export interface BreadCrumbJsonLdProps extends JsonLdProps {
		itemListElements: ItemListElements[];
	}
</script>

<script lang="ts">
	import type { ItemListElements } from '../types.js';
	import { setItemListElements } from '../utils/schema/setItemListElements.js';

	import { JsonLd } from './jsonld.js';
	import type { JsonLdProps } from './jsonld.js';

	export let keyOverride: BreadCrumbJsonLdProps['keyOverride'] = undefined;
	export let itemListElements: BreadCrumbJsonLdProps['itemListElements'];

	function BreadCrumbJsonLd({
		type = 'BreadcrumbList',
		keyOverride,
		itemListElements
	}: BreadCrumbJsonLdProps) {
		const data = {
			itemListElement: setItemListElements(itemListElements)
		};

		return JsonLd({
			type,
			keyOverride,
			...data,
			scriptKey: 'breadcrumb'
		});
	}
</script>

<svelte:head>
	{@html BreadCrumbJsonLd({
		keyOverride,
		itemListElements
	})}
</svelte:head>
