<script lang="ts">
	import {
		// Somerset,
		ArticleJsonLd,
		BrandJsonLd,
		BreadcrumbJsonLd,
		CarouselJsonLd,
		JobPostingJsonLd,
		VideoJsonLd,
		VideoGameJsonLd,
		WebPageJsonLd,
		CollectionPageJsonLd,
		RecipeJsonLd,
		SiteLinksSearchBoxJsonLd,
		CourseJsonLd,
		DatasetJsonLd,
		CorporateContactJsonLd,
		FAQPageJsonLd,
		HowToJsonLd,
		LocalBusinessJsonLd,
		LogoJsonLd,
		ProductJsonLd,
		SocialProfileJsonLd,
		NewsArticleJsonLd,
		EventJsonLd,
		QAPageJsonLd,
		ProfilePageJsonLd,
		SoftwareAppJsonLd,
		OrganizationJsonLd,
		ImageJsonLd
	} from '$prod/index.js';
</script>

<!-- <Somerset
	title="Using More of Config"
	description="This example uses more of the available config options."
	canonical="https://www.canonical.ie/"
	openGraph={{
		url: 'https://www.url.ie/a',
		title: 'Open Graph Title',
		description: 'Open Graph Description',
		images: [
			{
				url: 'https://www.example.ie/og-image-01.jpg',
				width: 800,
				height: 600,
				alt: 'Og Image Alt',
				type: 'image/jpeg'
			},
			{
				url: 'https://www.example.ie/og-image-02.jpg',
				width: 900,
				height: 800,
				alt: 'Og Image Alt Second',
				type: 'image/jpeg'
			},
			{ url: 'https://www.example.ie/og-image-03.jpg' },
			{ url: 'https://www.example.ie/og-image-04.jpg' }
		],
		siteName: 'SiteName'
	}}
	twitter={{
		handle: '@handle',
		site: '@site',
		cardType: 'summary_large_image'
	}}
/> -->

<ImageJsonLd
	images={[
		{
			contentUrl: 'http://www.example.com/images/image.png',
			creator: {
				'@type': 'Person',
				name: 'Jane Doe'
			},
			creditText: 'Jane Doe',
			copyrightNotice: '© Jane Doe',
			license: 'http://www.example.com/license',
			acquireLicensePage: 'http://www.example.com/acquire-license'
		}
	]}
/>

<OrganizationJsonLd
	type="Corporation"
	id="https://www.purpule-fox.io/#corporation"
	logo="https://www.example.com/photos/logo.jpg"
	legalName="Purple Fox LLC"
	name="Purple Fox"
	address={{
		streetAddress: '1600 Saratoga Ave',
		addressLocality: 'San Jose',
		addressRegion: 'CA',
		postalCode: '95129',
		addressCountry: 'US'
	}}
	contactPoint={[
		{
			telephone: '+1-401-555-1212',
			contactType: 'customer service',
			email: 'customerservice@email.com',
			areaServed: 'US',
			availableLanguage: ['English', 'Spanish', 'French']
		},
		{
			telephone: '+1-877-746-0909',
			contactType: 'customer service',
			email: 'servicecustomer@email.com',
			contactOption: 'TollFree',
			availableLanguage: 'English'
		},
		{
			telephone: '+1-877-453-1304',
			contactType: 'technical support',
			contactOption: 'TollFree',
			areaServed: ['US', 'CA'],
			availableLanguage: ['English', 'French']
		}
	]}
	sameAs={['https://www.orange-fox.com']}
	url="https://www.purpule-fox.io/"
/>

<SoftwareAppJsonLd
	name="Angry Birds"
	price="1.00"
	priceCurrency="USD"
	aggregateRating={{ ratingValue: '4.6', reviewCount: '8864' }}
	operatingSystem="ANDROID"
	applicationCategory="GameApplication"
/>

<ProfilePageJsonLd
	lastReviewed="2014-10-01T19:30"
	breadcrumb={[
		{
			position: 1,
			name: 'Books',
			item: 'https://example.com/books'
		},
		{
			position: 2,
			name: 'Authors',
			item: 'https://example.com/books/authors'
		}
	]}
/>

<QAPageJsonLd
	mainEntity={{
		name: 'How many ounces are there in a pound?',
		text: 'I have taken up a new interest in baking and keep running across directions in ounces and pounds. I have to translate between them and was wondering how many ounces are in a pound?',
		answerCount: 3,
		upvoteCount: 26,
		dateCreated: '2016-07-23T21:11Z',
		author: { name: 'New Baking User' },
		acceptedAnswer: {
			text: '1 pound (lb) is equal to 16 ounces (oz).',
			dateCreated: '2016-11-02T21:11Z',
			upvoteCount: 1337,
			url: 'https://example.com/question1#acceptedAnswer',
			author: {
				name: 'SomeUser'
			}
		},
		suggestedAnswer: [
			{
				text: 'Are you looking for ounces or fluid ounces? If you are looking for fluid ounces there are 15.34 fluid ounces in a pound of water.',
				dateCreated: '2016-11-02T21:11Z',
				upvoteCount: 42,
				url: 'https://example.com/question1#suggestedAnswer1',
				author: {
					name: 'AnotherUser'
				}
			},
			{
				text: `I can't remember exactly, but I think 18 ounces in a lb. You might want to double check that.`,
				dateCreated: '2016-11-06T21:11Z',
				upvoteCount: 0,
				url: 'https://example.com/question1#suggestedAnswer2',
				author: {
					name: 'ConfusedUser'
				}
			}
		]
	}}
/>

<EventJsonLd
	name="My Event"
	startDate="2020-01-23T00:00:00.000Z"
	endDate="2020-01-24T00:00:00.000Z"
	location={{
		name: 'My Place',
		sameAs: 'https://example.com/my-place',
		address: {
			streetAddress: '1600 Saratoga Ave',
			addressLocality: 'San Jose',
			addressRegion: 'CA',
			postalCode: '95129',
			addressCountry: 'US'
		}
	}}
	url="https://example.com/my-event"
	images={['https://example.com/photos/photo.jpg']}
	description="My event @ my place"
	offers={[
		{
			price: '119.99',
			priceCurrency: 'USD',
			priceValidUntil: '2020-11-05',
			itemCondition: 'https://schema.org/UsedCondition',
			availability: 'https://schema.org/InStock',
			url: 'https://www.example.com/executive-anvil',
			seller: {
				name: 'John Doe'
			},
			validFrom: '2020-11-01T00:00:00.000Z'
		},
		{
			price: '139.99',
			priceCurrency: 'CAD',
			priceValidUntil: '2020-09-05',
			itemCondition: 'https://schema.org/UsedCondition',
			availability: 'https://schema.org/InStock',
			url: 'https://www.example.ca/executive-anvil',
			seller: {
				name: 'John Doe Sr.'
			},
			validFrom: '2020-08-05T00:00:00.000Z'
		}
	]}
	performers={[
		{
			name: 'Adele'
		},
		{
			name: 'Kira and Morrison'
		}
	]}
	organizer={{
		type: 'Organization',
		name: 'Unnamed organization',
		url: 'https://www.unnamed.com'
	}}
	eventStatus="EventScheduled"
	eventAttendanceMode="OfflineEventAttendanceMode"
/>

<VideoGameJsonLd
	name="Red Dead Redemption 2"
	translatorName={['Translator 1', 'Translator 2']}
	languageName={['English', 'Kurdish']}
	description="Arthur Morgan and the Van der Linde gang are outlaws on the run. With federal agents and the best bounty hunters in the nation massing on their heels, the gang must rob, steal and fight their way across the rugged heartland of America in order to survive."
	processorRequirements="4 GHz"
	memoryRequirements="16 Gb"
	playMode="SinglePlayer"
	applicationCategory="Game"
	url="https://example.com/rdr2-game"
	platformName={['PC game', 'PlayStation 4']}
	operatingSystemName="windows"
	keywords="outlaw, gang, federal agents"
	datePublished="2019-02-05T08:00:00+08:00"
	image="https://example.com/photos/1x1/photo.jpg"
	publisherName="Vertical Games"
	producerName="Rockstar Games"
	producerUrl="https//www.example.com/producer"
	offers={[
		{
			price: '119.99',
			priceCurrency: 'USD',
			priceValidUntil: '2020-11-05',
			availability: 'https://schema.org/InStock',
			url: 'https://example.net/rdr2-game',
			seller: {
				name: 'Executive Gaming'
			}
		},
		{
			price: '139.99',
			priceCurrency: 'CAD',
			priceValidUntil: '2020-09-05',
			availability: 'https://schema.org/InStock',
			url: 'https://example.org/rdr2-game',
			seller: {
				name: 'Executive Gaming'
			}
		}
	]}
	aggregateRating={{
		ratingValue: '44',
		reviewCount: '89',
		ratingCount: '684',
		bestRating: '100'
	}}
	reviews={[
		{
			author: {
				type: 'Person',
				name: 'AhmetKaya'
			},
			publisher: {
				type: 'Organization',
				name: 'Gam Production'
			},
			datePublished: '2017-01-06T03:37:40Z',
			reviewBody: 'Iki gozum.',
			name: 'Rica ederim.',
			reviewRating: {
				bestRating: '5',
				ratingValue: '5',
				worstRating: '1'
			}
		}
	]}
/>

<NewsArticleJsonLd
	url="https://example.com/article"
	title="Article headline"
	images={[
		'https://example.com/photos/1x1/photo.jpg',
		'https://example.com/photos/4x3/photo.jpg',
		'https://example.com/photos/16x9/photo.jpg'
	]}
	section="politic"
	keywords="prayuth,taksin"
	datePublished="2015-02-05T08:00:00+08:00"
	dateModified="2015-02-05T09:00:00+08:00"
	authorName="Jane Blogs"
	publisherName="Gary Meehan"
	publisherLogo="https://www.example.com/photos/logo.jpg"
	description="This is a mighty good description of this article."
	body="This is all text for this news article"
	isAccessibleForFree={true}
/>

<SocialProfileJsonLd
	type="Person"
	name="your name"
	url="http://www.your-site.com"
	sameAs={[
		'http://www.facebook.com/your-profile',
		'http://instagram.com/yourProfile',
		'http://www.linkedin.com/in/yourprofile',
		'http://plus.google.com/your_profile'
	]}
/>

<ProductJsonLd
	productName="Executive Anvil"
	images={[
		'https://example.com/photos/1x1/photo.jpg',
		'https://example.com/photos/4x3/photo.jpg',
		'https://example.com/photos/16x9/photo.jpg'
	]}
	description="Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height."
	brand="ACME"
	color="blue"
	manufacturerName="Gary Meehan"
	manufacturerLogo="https://www.example.com/photos/logo.jpg"
	material="steel"
	slogan="For the business traveller looking for something to drop from a height."
	disambiguatingDescription="Executive Anvil, perfect for the business traveller."
	releaseDate="2014-02-05T08:00:00+08:00"
	productionDate="2015-02-05T08:00:00+08:00"
	purchaseDate="2015-02-06T08:00:00+08:00"
	award="Best Executive Anvil Award."
	reviews={[
		{
			author: 'Jim',
			datePublished: '2017-01-06T03:37:40Z',
			reviewBody:
				'This is my favorite product yet! Thanks Nate for the example products and reviews.',
			name: 'So awesome!!!',
			reviewRating: {
				bestRating: '5',
				ratingValue: '5',
				worstRating: '1'
			},
			publisher: {
				type: 'Organization',
				name: 'TwoVit'
			}
		}
	]}
	aggregateRating={{
		ratingValue: '4.4',
		reviewCount: '89'
	}}
	offers={[
		{
			price: '119.99',
			priceCurrency: 'USD',
			priceValidUntil: '2020-11-05',
			itemCondition: 'https://schema.org/UsedCondition',
			availability: 'https://schema.org/InStock',
			url: 'https://www.example.com/executive-anvil',
			seller: {
				name: 'Executive Objects'
			}
		},
		{
			price: '139.99',
			priceCurrency: 'CAD',
			priceValidUntil: '2020-09-05',
			itemCondition: 'https://schema.org/UsedCondition',
			availability: 'https://schema.org/InStock',
			url: 'https://www.example.ca/executive-anvil',
			seller: {
				name: 'Executive Objects'
			}
		}
	]}
	mpn="925872"
/>

<LogoJsonLd logo="http://www.your-site.com/images/logo.jpg" url="http://www.your-site.com" />

<LocalBusinessJsonLd
	type="Store"
	id="http://davesdeptstore.example.com"
	name="Dave's Department Store"
	description="Dave's latest department store in San Jose, now open"
	url="http://www.example.com/store-locator/sl/San-Jose-Westgate-Store/1427"
	telephone="+14088717984"
	address={{
		streetAddress: '1600 Saratoga Ave',
		addressLocality: 'San Jose',
		addressRegion: 'CA',
		postalCode: '95129',
		addressCountry: 'US'
	}}
	geo={{
		latitude: '37.293058',
		longitude: '-121.988331'
	}}
	images={[
		'https://example.com/photos/1x1/photo.jpg',
		'https://example.com/photos/4x3/photo.jpg',
		'https://example.com/photos/16x9/photo.jpg'
	]}
	sameAs={[
		'www.company-website-url1.dev',
		'www.company-website-url2.dev',
		'www.company-website-url3.dev'
	]}
	openingHours={[
		{
			opens: '08:00',
			closes: '23:59',
			dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
			validFrom: '2019-12-23',
			validThrough: '2020-04-02'
		},
		{
			opens: '14:00',
			closes: '20:00',
			dayOfWeek: 'Sunday',
			validFrom: '2019-12-23',
			validThrough: '2020-04-02'
		}
	]}
	rating={{
		ratingValue: '4.5',
		ratingCount: '2'
	}}
	review={[
		{
			author: 'John Doe',
			datePublished: '2006-05-04',
			name: 'A masterpiece of literature',
			reviewBody:
				'I really enjoyed this book. It captures the essential challenge people face as they try make sense of their lives and grow to adulthood.',
			reviewRating: {
				bestRating: '5',
				worstRating: '1',
				reviewAspect: 'Ambiance',
				ratingValue: '4'
			}
		},
		{
			author: 'Bob Smith',
			datePublished: '2006-06-15',
			name: 'A good read.',
			reviewBody: "Catcher in the Rye is a fun book. It's a good book to read.",
			reviewRating: {
				ratingValue: '4'
			}
		}
	]}
	makesOffer={[
		{
			priceSpecification: {
				type: 'UnitPriceSpecification',
				priceCurrency: 'EUR',
				price: '1000-10000'
			},
			itemOffered: {
				name: 'Motion Design Services',
				description: 'We are the expert of animation and motion design productions.'
			}
		},
		{
			priceSpecification: {
				type: 'UnitPriceSpecification',
				priceCurrency: 'EUR',
				price: '2000-10000'
			},
			itemOffered: {
				name: 'Branding Services',
				description:
					'Real footage is a powerful tool when it comes to show what the business is about. Can be used to present your company, show your factory, promote a product packshot, or just tell any story. It can help create emotional links with your audience by showing punchy images.'
			}
		}
	]}
	areaServed={[
		{
			geoMidpoint: {
				latitude: '41.108237',
				longitude: '-80.642982'
			},
			geoRadius: '1000'
		},
		{
			geoMidpoint: {
				latitude: '51.108237',
				longitude: '-80.642982'
			},
			geoRadius: '1000'
		}
	]}
	action={{
		actionName: 'potentialAction',
		actionType: 'ReviewAction',
		target: 'https://www.example.com/review/this/business'
	}}
/>

<HowToJsonLd
	name="How to tile a kitchen backsplash"
	image="https://example.com/photos/1x1/photo.jpg"
	estimatedCost={{ currency: 'USD', value: '100' }}
	supply={['tiles', 'thin-set', 'mortar', 'tile grout', 'grout sealer']}
	tool={['notched trowel', 'bucket', 'large sponge']}
	step={[
		{
			url: 'https://example.com/kitchen#step1',
			name: 'Prepare the surfaces',
			itemListElement: [
				{
					type: 'HowToTip',
					text: 'Turn off the power to the kitchen and then remove everything that is on the wall, such as outlet covers, switchplates, and any other item in the area that is to be tiled.'
				},
				{
					type: 'HowToDirection',
					text: 'Then clean the surface thoroughly to remove any grease or other debris and tape off the area.'
				}
			],
			image: 'https://example.com/photos/1x1/photo-step1.jpg'
		}
	]}
	totalTime="P2D"
/>

<FAQPageJsonLd
	mainEntity={[
		{
			questionName: 'How long is the delivery time?',
			acceptedAnswerText: '3-5 business days.'
		},
		{
			questionName: 'Where can I find information about product recalls?',
			acceptedAnswerText: 'Read more on under information.'
		}
	]}
/>

<CorporateContactJsonLd
	url="http://www.your-company-site.com"
	logo="http://www.example.com/logo.png"
	contactPoint={[
		{
			telephone: '+1-401-555-1212',
			contactType: 'customer service',
			email: 'customerservice@email.com',
			areaServed: 'US',
			availableLanguage: ['English', 'Spanish', 'French']
		},
		{
			telephone: '+1-877-746-0909',
			contactType: 'customer service',
			email: 'servicecustomer@email.com',
			contactOption: 'TollFree',
			availableLanguage: 'English'
		},
		{
			telephone: '+1-877-453-1304',
			contactType: 'technical support',
			contactOption: 'TollFree',
			areaServed: ['US', 'CA'],
			availableLanguage: ['English', 'French']
		}
	]}
/>

<DatasetJsonLd
	description="The description needs to be at least 50 characters long"
	name="name of the dataset"
	license="https//www.example.com"
/>

<ArticleJsonLd
	title="Article headline"
	url="https://example.com/article"
	images={[
		'https://example.com/photos/1x1/photo.jpg',
		'https://example.com/photos/4x3/photo.jpg',
		'https://example.com/photos/16x9/photo.jpg'
	]}
	datePublished="2015-02-05T08:00:00+08:00"
	dateModified="2015-02-05T09:00:00+08:00"
	authorName={[
		{
			name: 'Jane Blogs',
			url: 'https://example.com'
		},
		{
			name: 'Mary Stone',
			url: 'https://example.com'
		}
	]}
	publisherName="Gary Meehan"
	publisherLogo="https://www.example.com/photos/logo.jpg"
	description="This is a mighty good description of this article."
	isAccessibleForFree={true}
/>

<BrandJsonLd
	slogan="What does the fox say?"
	id="https://www.purpule-fox.io/#corporation"
	logo="https://www.example.com/photos/logo.jpg"
	aggregateRating={{
		ratingValue: '5',
		ratingCount: '18'
	}}
/>

<BreadcrumbJsonLd
	itemListElements={[
		{
			position: 1,
			name: 'Books',
			item: 'https://example.com/books'
		},
		{
			position: 2,
			name: 'Authors',
			item: 'https://example.com/books/authors'
		},
		{
			position: 3,
			name: 'Ann Leckie',
			item: 'https://example.com/books/authors/annleckie'
		},
		{
			position: 4,
			name: 'Ancillary Justice',
			item: 'https://example.com/books/authors/ancillaryjustice'
		}
	]}
/>

<CarouselJsonLd
	ofType="default"
	data={[
		{ url: 'http://example.com/peanut-butter-cookies.html' },
		{
			url: 'http://example.com/triple-chocolate-chunk.html'
		}
	]}
/>

<CollectionPageJsonLd
	name="Resistance 3: Fall of Man"
	hasPart={[
		{
			about: 'Britten Four Sea Interludes and Passacaglia from Peter Grimes',
			author: 'John Doe',
			name: 'Schema.org Ontology',
			datePublished: '2021-03-09',
			audience: 'Internet',
			keywords: 'schema',
			thumbnailUrl: 'https://i.ytimg.com/vi/eXSJ3PO9Tas/hqdefault.jpg',
			image: 'hqdefault.jpg'
		},
		{
			about: 'Shostakovich Symphony No. 7 (Leningrad)',
			author: 'John Smith',
			name: 'Creative work name',
			datePublished: '2014-10-01T19:30'
		}
	]}
/>

<CourseJsonLd
	courseName="Course Name"
	description="Introductory CS course laying out the basics."
	provider={{
		name: 'Course Provider',
		url: 'https//www.example.com/provider'
	}}
/>

<RecipeJsonLd
	name="Party Coffee Cake"
	description="This coffee cake is awesome and perfect for parties."
	datePublished="2018-03-10"
	authorName={['Jane Blogs', 'Mary Stone']}
	prepTime="PT20M"
	cookTime="PT30M"
	totalTime="PT50M"
	keywords="cake for a party, coffee"
	yields="10"
	category="Dessert"
	cuisine="American"
	calories={270}
	images={[
		'https://example.com/photos/1x1/photo.jpg',
		'https://example.com/photos/4x3/photo.jpg',
		'https://example.com/photos/16x9/photo.jpg'
	]}
	ingredients={[
		'2 cups of flour',
		'3/4 cup white sugar',
		'2 teaspoons baking powder',
		'1/2 teaspoon salt',
		'1/2 cup butter',
		'2 eggs',
		'3/4 cup milk'
	]}
	instructions={[
		{
			name: 'Preheat',
			text: 'Preheat the oven to 350 degrees F. Grease and flour a 9x9 inch pan.',
			url: 'https://example.com/party-coffee-cake#step1',
			image: 'https://example.com/photos/party-coffee-cake/step1.jpg'
		}
	]}
	aggregateRating={{
		ratingValue: '5',
		ratingCount: '18'
	}}
	video={{
		name: 'How to make a Party Coffee Cake',
		description: 'This is how you make a Party Coffee Cake.',
		contentUrl: 'http://www.example.com/video123.mp4',
		embedUrl: 'http://www.example.com/videoplayer?video=123',
		uploadDate: '2018-02-05T08:00:00+08:00',
		duration: 'PT1M33S',
		thumbnailUrls: [
			'https://example.com/photos/1x1/photo.jpg',
			'https://example.com/photos/4x3/photo.jpg',
			'https://example.com/photos/16x9/photo.jpg'
		],
		expires: '2019-02-05T08:00:00+08:00',
		hasPart: {
			'@type': 'Clip',
			name: 'Preheat oven',
			startOffset: 30,
			url: 'http://www.example.com/example?t=30'
		},
		watchCount: 2347,
		publication: {
			'@type': 'BroadcastEvent',
			isLiveBroadcast: true,
			startDate: '2020-10-24T14:00:00+00:00',
			endDate: '2020-10-24T14:37:14+00:00'
		},
		regionsAllowed: ['IT', 'NL']
	}}
/>

<SiteLinksSearchBoxJsonLd
	url="https://www.example.com"
	potentialActions={[
		{
			target: 'https://query.example.com/search?q',
			queryInput: 'search_term_string'
		},
		{
			target: 'android-app://com.example/https/query.example.com/search/?q',
			queryInput: 'search_term_string'
		}
	]}
/>

<VideoJsonLd
	name="How to make a Party Coffee Cake"
	description="This is how you make a Party Coffee Cake."
	contentUrl="http://www.example.com/video123.mp4"
	embedUrl="http://www.example.com/videoplayer?video=123"
	uploadDate="2018-02-05T08:00:00+08:00"
	duration="PT1M33S"
	thumbnailUrls={[
		'https://example.com/photos/1x1/photo.jpg',
		'https://example.com/photos/4x3/photo.jpg',
		'https://example.com/photos/16x9/photo.jpg'
	]}
	expires="2019-02-05T08:00:00+08:00"
	hasPart={{
		name: 'Preheat oven',
		startOffset: 30,
		url: 'http://www.example.com/example?t=30'
	}}
	watchCount={2347}
	publication={{
		isLiveBroadcast: true,
		startDate: '2020-10-24T14:00:00+00:00',
		endDate: '2020-10-24T14:37:14+00:00'
	}}
	regionsAllowed={['IT', 'NL']}
/>

<JobPostingJsonLd
	datePosted="2020-01-06T03:37:40Z"
	description="Company is looking for a software developer...."
	hiringOrganization={{
		name: 'company name',
		sameAs: 'www.company-website-url.dev'
	}}
	jobLocation={{
		streetAddress: '17 street address',
		addressLocality: 'Paris',
		addressRegion: 'Ile-de-France',
		postalCode: '75001',
		addressCountry: 'France'
	}}
	title="Job Title"
	baseSalary={{
		currency: 'EUR',
		value: 40, // Can also be a salary range, like [40, 50]
		unitText: 'HOUR'
	}}
	employmentType="FULL_TIME"
	jobLocationType="TELECOMMUTE"
	validThrough="2020-01-06"
	applicantLocationRequirements="FR"
	experienceRequirements={{
		occupational: {
			minimumMonthsOfExperience: 12
		},
		educational: {
			credentialCategory: 'high school'
		},
		experienceInPlaceOfEducation: true
	}}
/>

<WebPageJsonLd
	description="What does the fox say?"
	id="https://www.purpule-fox.io/#corporation"
	lastReviewed="2021-05-26T05:59:02.085Z"
	reviewedBy={{
		type: 'Person',
		name: 'Garmeeh'
	}}
/>

<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
