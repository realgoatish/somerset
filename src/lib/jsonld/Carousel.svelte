<script context="module" lang="ts">
	type Director = {
		name: string;
	};

	interface DefaultDataProps {
		url: string;
	}

	interface ExtendedCourseJsonLdProps extends DefaultDataProps, CourseJsonLdProps {}

	interface ExtendedRecipeJsonLdProps extends DefaultDataProps, RecipeJsonLdProps {}

	export interface MovieJsonLdProps {
		name: string;
		url: string;
		image: string;
		dateCreated?: string;
		director?: Director | Director[];
		review?: Review;
		aggregateRating?: AggregateRating;
	}

	export interface CarouselJsonLdProps extends JsonLdProps {
		ofType: 'default' | 'movie' | 'recipe' | 'course';
		data:
			| any
			| DefaultDataProps[]
			| MovieJsonLdProps[]
			| ExtendedCourseJsonLdProps[]
			| ExtendedRecipeJsonLdProps[];
	}
</script>

<script lang="ts">
	import { JsonLd } from './jsonld.js';
	import type { JsonLdProps } from './jsonld.js';

	import type { CourseJsonLdProps, RecipeJsonLdProps } from '../index.js';
	import type { Review, AggregateRating } from '../types.js';
	import { setReviews } from '../utils/schema/setReviews.js';
	import { setAuthor } from '../utils/schema/setAuthor.js';
	import { setNutrition } from '../utils/schema/setNutrition.js';
	import { setAggregateRating } from '../utils/schema/setAggregateRating.js';
	import { setVideo } from '../utils/schema/setVideo.js';
	import { setInstruction } from '../utils/schema/setInstruction.js';

	export let keyOverride: CarouselJsonLdProps['keyOverride'] = undefined;
	export let data: CarouselJsonLdProps['data'];
	export let ofType: CarouselJsonLdProps['ofType'];

	function CarouselJsonLd({ type = 'Carousel', keyOverride, ofType, data }: CarouselJsonLdProps) {
		function generateList(
			data: CarouselJsonLdProps['data'],
			ofType: CarouselJsonLdProps['ofType']
		) {
			switch (ofType) {
				case 'default':
					return (data as DefaultDataProps[]).map((item, index) => ({
						'@type': 'ListItem',
						position: `${index + 1}`,
						url: item.url
					}));

				case 'course':
					return (data as ExtendedCourseJsonLdProps[]).map((item, index) => ({
						'@type': 'ListItem',
						position: `${index + 1}`,
						item: {
							'@context': 'https://schema.org',
							'@type': 'Course',
							url: item.url,
							name: item.courseName,
							description: item.description,
							provider: {
								'@type': 'Organization',
								name: item.providerName,
								sameAs: item.providerUrl
							}
						}
					}));

				case 'movie':
					return (data as MovieJsonLdProps[]).map((item, index) => ({
						'@type': 'ListItem',
						position: `${index + 1}`,
						item: {
							'@context': 'https://schema.org',
							'@type': 'Movie',
							name: item.name,
							url: item.url,
							image: item.image,
							dateCreated: item.dateCreated,
							director: item.director
								? Array.isArray(item.director)
									? item.director.map((director) => ({
											'@type': 'Person',
											name: director.name
									  }))
									: {
											'@type': 'Person',
											name: item.director.name
									  }
								: undefined,
							review: setReviews(item.review)
						}
					}));

				case 'recipe':
					return (data as ExtendedRecipeJsonLdProps[]).map(
						(
							{
								authorName,
								images,
								yields,
								category,
								calories,
								aggregateRating,
								video,
								ingredients,
								instructions,
								cuisine,
								...rest
							},
							index
						) => ({
							'@type': 'ListItem',
							position: `${index + 1}`,
							item: {
								'@context': 'https://schema.org',
								'@type': 'Recipe',
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
							}
						})
					);
			}
		}

		const d = {
			'@type': 'ItemList',
			itemListElement: generateList(data, ofType)
		};

		return JsonLd({
			type,
			keyOverride,
			...d,
			scriptKey: 'Carousel'
		});
	}
</script>

<svelte:head>
	{@html CarouselJsonLd({
		keyOverride,
		data,
		ofType
	})}
</svelte:head>
