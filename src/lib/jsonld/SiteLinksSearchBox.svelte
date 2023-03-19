<script context="module" lang="ts">
	export interface PotentialAction {
		target: string;
		queryInput: string;
	}

	export interface SiteLinksSearchBoxJsonLdProps extends JsonLdProps {
		url: string;
		potentialActions: PotentialAction[];
	}
</script>

<script lang="ts">
	import { JsonLd } from './jsonld.js';
	import type { JsonLdProps } from './jsonld.js';

	export let keyOverride: SiteLinksSearchBoxJsonLdProps['keyOverride'] = undefined;
	export let url: SiteLinksSearchBoxJsonLdProps['url'];
	export let potentialActions: SiteLinksSearchBoxJsonLdProps['potentialActions'];

	function SiteLinksSearchBoxJsonLd({
		type = 'WebSite',
		keyOverride,
		potentialActions,
		...rest
	}: SiteLinksSearchBoxJsonLdProps) {
		function setPotentialAction(action: PotentialAction) {
			if (action) {
				const { target, queryInput } = action;
				return {
					'@type': 'SearchAction',
					target: `${target}={${queryInput}}`,
					'query-input': `required name=${queryInput}`
				};
			}
			return undefined;
		}

		const data = {
			...rest,
			potentialAction: potentialActions.map(setPotentialAction)
		};

		return JsonLd({
			type,
			keyOverride,
			...data,
			scriptKey: 'siteLinksSearchBox'
		});
	}
</script>

<svelte:head>
	{@html SiteLinksSearchBoxJsonLd({
		keyOverride,
		url,
		potentialActions
	})}
</svelte:head>
