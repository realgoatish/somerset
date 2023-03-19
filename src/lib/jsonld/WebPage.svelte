<script context="module" lang="ts">
	export interface WebPageJsonLdProps {
		keyOverride?: string;
		id: string;
		description?: string;
		lastReviewed?: string;
		reviewedBy?: ReviewedBy;
	}
</script>

<script lang="ts">
	import type { ReviewedBy } from '../types.js';

	import { JsonLd } from './jsonld.js';
	import { setReviewedBy } from '../utils/schema/setReviewedBy.js';

	export let keyOverride: WebPageJsonLdProps['keyOverride'] = undefined;
	export let id: WebPageJsonLdProps['id'];
	export let description: WebPageJsonLdProps['description'] = undefined;
	export let lastReviewed: WebPageJsonLdProps['lastReviewed'] = undefined;
	export let reviewedBy: WebPageJsonLdProps['reviewedBy'] = undefined;

	function WebPageJsonLd({ keyOverride, reviewedBy, ...rest }: WebPageJsonLdProps) {
		const data = {
			...rest,
			reviewedBy: setReviewedBy(reviewedBy)
		};
		return JsonLd({
			keyOverride,
			...data,
			type: 'WebPage',
			scriptKey: 'WebPage'
		});
	}
</script>

<svelte:head>
	{@html WebPageJsonLd({
		keyOverride,
		id,
		description,
		lastReviewed,
		reviewedBy
	})}
</svelte:head>
