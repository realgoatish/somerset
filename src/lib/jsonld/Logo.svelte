<script context="module" lang="ts">
	export interface LogoJsonLdProps extends JsonLdProps {
		logo: string;
		url: string;
	}
</script>

<script lang="ts">
	import { JsonLd } from './jsonld.js';
	import type { JsonLdProps } from './jsonld.js';

	export let keyOverride: LogoJsonLdProps['keyOverride'] = undefined;
	export let logo: LogoJsonLdProps['logo'];
	export let url: LogoJsonLdProps['url'];

	function LogoJsonLd({ type = 'Organization', keyOverride, ...rest }: LogoJsonLdProps) {
		return JsonLd({
			type,
			keyOverride,
			...rest,
			scriptKey: 'Logo'
		});
	}
</script>

<svelte:head>
	{@html LogoJsonLd({
		keyOverride,
		logo,
		url
	})}
</svelte:head>
