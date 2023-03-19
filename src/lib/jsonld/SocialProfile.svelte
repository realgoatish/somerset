<script context="module" lang="ts">
	export interface SocialProfileJsonLdProps extends JsonLdProps {
		type: 'Person' | 'Organization';
		name: string;
		url: string;
		sameAs: string[];
	}
</script>

<script lang="ts">
	import { JsonLd } from './jsonld.js';
	import type { JsonLdProps } from './jsonld.js';

	export let keyOverride: SocialProfileJsonLdProps['keyOverride'] = undefined;
	export let type: SocialProfileJsonLdProps['type'];
	export let name: SocialProfileJsonLdProps['name'];
	export let url: SocialProfileJsonLdProps['url'];
	export let sameAs: SocialProfileJsonLdProps['sameAs'];

	function SocialProfileJsonLd({ type, keyOverride, ...rest }: SocialProfileJsonLdProps) {
		return JsonLd({
			type,
			keyOverride,
			...rest,
			scriptKey: 'social'
		});
	}
</script>

<svelte:head>
	{@html SocialProfileJsonLd({
		keyOverride,
		type,
		name,
		url,
		sameAs
	})}
</svelte:head>
