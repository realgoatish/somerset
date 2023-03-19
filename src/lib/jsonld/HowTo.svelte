<script context="module" lang="ts">
	export interface HowToJsonLdProps extends JsonLdProps {
		name: string;
		image?: string;
		estimatedCost?: PriceSpecification;
		supply?: string[];
		tool?: string[];
		step: Step[];
		totalTime?: string;
	}
</script>

<script lang="ts">
	import { JsonLd } from './jsonld.js';
	import type { JsonLdProps } from './jsonld.js';
	import { setImage } from '../utils/schema/setImage.js';
	import { setCost } from '../utils/schema/setCost.js';
	import { setSupply } from '../utils/schema/setSupply.js';
	import { setTool } from '../utils/schema/setTool.js';
	import { setStep } from '../utils/schema/setStep.js';

	import type { PriceSpecification, Step } from '../types.js';

	export let keyOverride: HowToJsonLdProps['keyOverride'] = undefined;
	export let name: HowToJsonLdProps['name'];
	export let image: HowToJsonLdProps['image'] = undefined;
	export let estimatedCost: HowToJsonLdProps['estimatedCost'] = undefined;
	export let supply: HowToJsonLdProps['supply'] = undefined;
	export let tool: HowToJsonLdProps['tool'] = undefined;
	export let step: HowToJsonLdProps['step'];
	export let totalTime: HowToJsonLdProps['totalTime'] = undefined;

	function howToJsonLd({
		type = 'HowTo',
		keyOverride,
		image,
		estimatedCost,
		supply,
		tool,
		step,
		...rest
	}: HowToJsonLdProps) {
		const data = {
			...rest,
			image: setImage(image),
			estimatedCost: setCost(estimatedCost),
			supply: setSupply(supply),
			tool: setTool(tool),
			step: setStep(step)
		};
		return JsonLd({
			type,
			keyOverride,
			...data,
			scriptKey: 'howTo'
		});
	}
</script>

<svelte:head>
	{@html howToJsonLd({
		keyOverride,
		name,
		image,
		estimatedCost,
		supply,
		tool,
		step,
		totalTime
	})}
</svelte:head>
