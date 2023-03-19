<script context="module" lang="ts">
	export interface FAQPageJsonLdProps extends JsonLdProps {
		mainEntity: Question[];
	}
</script>

<script lang="ts">
	import type { Question } from '../types.js';
	import { JsonLd } from './jsonld.js';
	import type { JsonLdProps } from './jsonld.js';
	import { setQuestions } from '../utils/schema/setQuestions.js';

	export let keyOverride: FAQPageJsonLdProps['keyOverride'] = undefined;
	export let mainEntity: FAQPageJsonLdProps['mainEntity'];

	function FAQPageJsonLd({
		type = 'FAQPage',
		keyOverride,
		mainEntity,
		...rest
	}: FAQPageJsonLdProps) {
		const data = {
			...rest,
			mainEntity: setQuestions(mainEntity)
		};

		return JsonLd({
			type,
			keyOverride,
			...data,
			scriptKey: 'faq-page'
		});
	}
</script>

<svelte:head>
	{@html FAQPageJsonLd({
		keyOverride,
		mainEntity
	})}
</svelte:head>
