import type { ReviewedBy } from '../../types.js';

export function setReviewedBy(reviewedBy?: ReviewedBy) {
  if (reviewedBy) {
    return {
      '@type': reviewedBy?.type || 'Organization',
      ...reviewedBy,
    };
  }

  return undefined;
}