<script lang="ts">
	import buildTags from './buildTags.js';
	import type { SomersetProps } from '../types.js';

	export let title: SomersetProps['title'];
	export let themeColor: SomersetProps['themeColor'];
	export let noindex: SomersetProps['noindex'] = false;
	export let nofollow: SomersetProps['nofollow'];
	export let robotsProps: SomersetProps['robotsProps'];
	export let description: SomersetProps['description'];
	export let canonical: SomersetProps['canonical'];
	export let openGraph: SomersetProps['openGraph'];
	export let facebook: SomersetProps['facebook'];
	export let twitter: SomersetProps['twitter'];
	export let additionalMetaTags: SomersetProps['additionalMetaTags'];
	export let titleTemplate: SomersetProps['titleTemplate'];
	export let defaultTitle: SomersetProps['defaultTitle'];
	export let mobileAlternate: SomersetProps['mobileAlternate'];
	export let languageAlternates: SomersetProps['languageAlternates'];
	export let additionalLinkTags: SomersetProps['additionalLinkTags'];
</script>

<svelte:head>
	{@html buildTags({
		title,
		themeColor,
		noindex,
		nofollow,
		robotsProps,
		description,
		canonical,
		openGraph,
		facebook,
		twitter,
		additionalMetaTags,
		titleTemplate,
		defaultTitle,
		mobileAlternate,
		languageAlternates,
		additionalLinkTags
	})}
</svelte:head>
