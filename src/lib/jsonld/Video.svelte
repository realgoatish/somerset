<script context="module" lang="ts">
	export interface VideoJsonLdProps extends JsonLdProps, Video {}
</script>

<script lang="ts">
	import type { Video } from '../types.js';

	import { JsonLd } from './jsonld.js';
	import type { JsonLdProps } from './jsonld.js';
	import { setVideo } from '../utils/schema/setVideo.js';

	export let keyOverride: VideoJsonLdProps['keyOverride'] = undefined;
	export let name: VideoJsonLdProps['name'];
	export let description: VideoJsonLdProps['description'];
	export let thumbnailUrls: VideoJsonLdProps['thumbnailUrls'];
	export let uploadDate: VideoJsonLdProps['uploadDate'];
	export let contentUrl: VideoJsonLdProps['contentUrl'] = undefined;
	export let duration: VideoJsonLdProps['duration'] = undefined;
	export let embedUrl: VideoJsonLdProps['embedUrl'] = undefined;
	export let expires: VideoJsonLdProps['expires'] = undefined;
	export let hasPart: VideoJsonLdProps['hasPart'] = undefined;
	export let watchCount: VideoJsonLdProps['watchCount'] = undefined;
	export let publication: VideoJsonLdProps['publication'] = undefined;
	export let regionsAllowed: VideoJsonLdProps['regionsAllowed'] = undefined;

	function VideoJsonLd({ type = 'Video', keyOverride, ...rest }: VideoJsonLdProps) {
		const data = setVideo(rest, true);
		return JsonLd({
			type,
			keyOverride,
			...data,
			scriptKey: 'Video'
		});
	}
</script>

<svelte:head>
	{@html VideoJsonLd({
		keyOverride,
		name,
		description,
		thumbnailUrls,
		uploadDate,
		contentUrl,
		duration,
		embedUrl,
		expires,
		hasPart,
		watchCount,
		publication,
		regionsAllowed
	})}
</svelte:head>
