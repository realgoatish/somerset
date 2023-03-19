<script context="module" lang="ts">
	export interface CourseJsonLdProps extends JsonLdProps {
		courseName: string;
		description: string;
		provider: Provider;
	}
</script>

<script lang="ts">
	import type { Provider } from '../types.js';
	import { setProvider } from '../utils/schema/setProvider.js';

	import { JsonLd } from './jsonld.js';
	import type { JsonLdProps } from './jsonld.js';

	export let keyOverride: CourseJsonLdProps['keyOverride'] = undefined;
	export let courseName: CourseJsonLdProps['courseName'];
	export let description: CourseJsonLdProps['description'];
	export let provider: CourseJsonLdProps['provider'];

	function CourseJsonLd({
		type = 'Course',
		keyOverride,
		courseName,
		provider,
		...rest
	}: CourseJsonLdProps) {
		const data = {
			name: courseName,
			...rest,
			provider: setProvider(provider)
		};
		return JsonLd({
			type,
			keyOverride,
			...data,
			scriptKey: 'course'
		});
	}
</script>

<svelte:head>
	{@html CourseJsonLd({
		keyOverride,
		courseName,
		description,
		provider
	})}
</svelte:head>
