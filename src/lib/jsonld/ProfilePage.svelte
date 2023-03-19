<script context="module" lang="ts">
	export interface ProfilePageJsonLdProps extends JsonLdProps {
		breadcrumb: string | ItemListElements[];
		lastReviewed?: string;
	}
</script>

<script lang="ts">
	import { JsonLd } from './jsonld.js';
	import type { JsonLdProps } from './jsonld.js';
	import type { ItemListElements } from '../types.js';
	import { setItemListElements } from '../utils/schema/setItemListElements.js';

	export let keyOverride: ProfilePageJsonLdProps['keyOverride'] = undefined;
	export let breadcrumb: ProfilePageJsonLdProps['breadcrumb'];
	export let lastReviewed: ProfilePageJsonLdProps['lastReviewed'] = undefined;

	function ProfilePageJsonLd({
		type = 'ProfilePage',
		keyOverride,
		breadcrumb,
		...rest
	}: ProfilePageJsonLdProps) {
		const data = {
			...rest,
			breadcrumb: Array.isArray(breadcrumb)
				? {
						'@type': 'BreadcrumbList',
						itemListElement: setItemListElements(breadcrumb)
				  }
				: breadcrumb
		};

		return JsonLd({
			type,
			keyOverride,
			...data,
			scriptKey: 'ProfilePage'
		});
	}
</script>

<svelte:head>
	{@html ProfilePageJsonLd({
		keyOverride,
		breadcrumb,
		lastReviewed
	})}
</svelte:head>
