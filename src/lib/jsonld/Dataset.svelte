<script context="module" lang="ts">
	export interface DatasetJsonLdProps extends JsonLdProps {
		description: string;
		name: string;
		license?: string;
	}
</script>

<script lang="ts">
	import { JsonLd } from './jsonld.js';
	import type { JsonLdProps } from './jsonld.js';

	export let keyOverride: DatasetJsonLdProps['keyOverride'] = undefined;
	export let description: DatasetJsonLdProps['description'];
	export let name: DatasetJsonLdProps['name'];
	export let license: DatasetJsonLdProps['license'] = undefined;

	function DatasetJsonLd({ type = 'Dataset', keyOverride, ...rest }: DatasetJsonLdProps) {
		return JsonLd({
			type,
			keyOverride,
			...rest,
			scriptKey: 'dataset'
		});
	}
</script>

<svelte:head>
	{@html DatasetJsonLd({
		keyOverride,
		description,
		name,
		license
	})}
</svelte:head>
