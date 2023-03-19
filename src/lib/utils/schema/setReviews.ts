import type { Review } from '../../types.js';
import { setAuthor } from './setAuthor.js';
import { setPublisher } from './setPublisher.js';
import { setReviewRating } from './setReviewRating.js';

export function setReviews(reviews?: Review | Review[]) {
  function mapReview({ reviewRating, author, publisher, ...rest }: Review) {
    return {
      ...rest,
      '@type': 'Review',
      ...(author && { author: setAuthor(author) }),
      ...(reviewRating && { reviewRating: setReviewRating(reviewRating) }),
      ...(publisher && { publisher: setPublisher(publisher.name) }),
    };
  }

  if (Array.isArray(reviews)) {
    return reviews.map(mapReview);
  } else if (reviews) {
    return mapReview(reviews);
  }

  return undefined;
}