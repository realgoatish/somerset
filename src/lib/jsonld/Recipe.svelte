<script context="module" lang="ts">
	export interface RecipeJsonLdProps extends JsonLdProps {
		name: string;
		description: string;
		authorName: string | string[];
		ingredients: string[];
		instructions: Instruction[];
		images?: string[];
		datePublished?: string;
		prepTime?: string;
		cookTime?: string;
		totalTime?: string;
		keywords?: string;
		yields?: string;
		category?: string;
		cuisine?: string;
		calories?: number;
		aggregateRating?: AggregateRating;
		video?: Video;
	}
</script>

<script lang="ts">
	import { JsonLd } from './jsonld.js';
	import type { JsonLdProps } from './jsonld.js';
	import type { Instruction, AggregateRating, Video } from '../types.js';

	import { setAggregateRating } from '../utils/schema/setAggregateRating.js';
	import { setAuthor } from '../utils/schema/setAuthor.js';
	import { setVideo } from '../utils/schema/setVideo.js';
	import { setInstruction } from '../utils/schema/setInstruction.js';
	import { setNutrition } from '../utils/schema/setNutrition.js';

	export let keyOverride: RecipeJsonLdProps['keyOverride'] = undefined;
	export let name: RecipeJsonLdProps['name'];
	export let description: RecipeJsonLdProps['description'];
	export let authorName: RecipeJsonLdProps['authorName'];
	export let ingredients: RecipeJsonLdProps['ingredients'];
	export let instructions: RecipeJsonLdProps['instructions'];
	export let images: RecipeJsonLdProps['images'] = undefined;
	export let datePublished: RecipeJsonLdProps['datePublished'] = undefined;
	export let prepTime: RecipeJsonLdProps['prepTime'] = undefined;
	export let cookTime: RecipeJsonLdProps['cookTime'] = undefined;
	export let totalTime: RecipeJsonLdProps['totalTime'] = undefined;
	export let keywords: RecipeJsonLdProps['keywords'] = undefined;
	export let yeilds: RecipeJsonLdProps['yields'] = undefined;
	export let category: RecipeJsonLdProps['category'] = undefined;
	export let cuisine: RecipeJsonLdProps['cuisine'] = undefined;
	export let calories: RecipeJsonLdProps['calories'] = undefined;
	export let aggregateRating: RecipeJsonLdProps['aggregateRating'] = undefined;
	export let video: RecipeJsonLdProps['video'] = undefined;

	function RecipeJsonLd({
		type = 'Recipe',
		keyOverride,
		authorName,
		images,
		yields,
		category,
		cuisine,
		calories,
		aggregateRating,
		video,
		ingredients,
		instructions,
		...rest
	}: RecipeJsonLdProps) {
		const data = {
			...rest,
			author: setAuthor(authorName),
			image: images,
			recipeYield: yields,
			recipeCategory: category,
			recipeCuisine: cuisine,
			nutrition: setNutrition(calories),
			aggregateRating: setAggregateRating(aggregateRating),
			video: setVideo(video),
			recipeIngredient: ingredients,
			recipeInstructions: instructions.map(setInstruction)
		};

		return JsonLd({
			type,
			keyOverride,
			...data,
			scriptKey: 'recipe'
		});
	}
</script>

<svelte:head>
	{@html RecipeJsonLd({
		keyOverride,
		name,
		description,
		authorName,
		ingredients,
		instructions,
		images,
		datePublished,
		prepTime,
		cookTime,
		totalTime,
		keywords,
		yeilds,
		category,
		cuisine,
		calories,
		aggregateRating,
		video
	})}
</svelte:head>
