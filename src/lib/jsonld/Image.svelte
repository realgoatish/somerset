<script context="module" lang="ts">
	type Creator = {
		'@type': 'Person' | 'Organisation';
		name: string;
	};

	interface ImageJsonLd {
		contentUrl?: string;
		creator?: Creator;
		creditText?: string;
		copyrightNotice?: string;
		license?: string;
		acquireLicensePage?: string;
	}

	export interface ImageJsonLdProps extends JsonLdProps {
		images: ImageJsonLd[];
	}
</script>

<script lang="ts">
	/* eslint-disable no-redeclare */

	import { JsonLd } from './jsonld.js';
	import type { JsonLdProps } from './jsonld.js';

	export let keyOverride: ImageJsonLdProps['keyOverride'] = undefined;
	export let images: ImageJsonLdProps['images'];

	function ImageJsonLd({ keyOverride, images, ...rest }: ImageJsonLdProps) {
		return JsonLd({
			...rest,
			type: 'ImageObject',
			keyOverride,
			dataArray: images,
			scriptKey: 'image'
		});
	}
</script>

<svelte:head>
	{@html ImageJsonLd({
		keyOverride,
		images
	})}
</svelte:head>
