<script context="module" lang="ts">
	export interface QAPageJsonLdProps extends JsonLdProps {
		mainEntity: Question;
	}
</script>

<script lang="ts">
	import type { Question } from '../types.js';
	import { setAuthor } from '../utils/schema/setAuthor.js';

	import { JsonLd } from './jsonld.js';
	import type { JsonLdProps } from './jsonld.js';

	export let keyOverride: QAPageJsonLdProps['keyOverride'] = undefined;
	export let mainEntity: QAPageJsonLdProps['mainEntity'];

	function QAPageJsonLd({ type = 'QAPage', keyOverride, mainEntity, ...rest }: QAPageJsonLdProps) {
		const data = {
			...rest,
			mainEntity: {
				...mainEntity,
				'@type': 'Question',
				author: setAuthor(mainEntity.author?.name),
				...(mainEntity.acceptedAnswer && {
					acceptedAnswer: {
						...mainEntity.acceptedAnswer,
						'@type': 'Answer',
						author: setAuthor(mainEntity.acceptedAnswer?.author?.name)
					}
				}),
				...(mainEntity.suggestedAnswer && {
					suggestedAnswer: mainEntity.suggestedAnswer.map(({ upvoteCount, ...rest }) => ({
						...rest,
						'@type': 'Answer',
						upvoteCount: upvoteCount || 0,
						author: setAuthor(rest.author?.name)
					}))
				})
			}
		};

		return JsonLd({
			type,
			keyOverride,
			...data,
			scriptKey: 'QAPage'
		});
	}
</script>

<svelte:head>
	{@html QAPageJsonLd({
		keyOverride,
		mainEntity
	})}
</svelte:head>
