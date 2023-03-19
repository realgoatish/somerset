import type { PriceSpecification } from '../../types.js';

export function setCost(cost?: PriceSpecification) {
  if (cost) {
    return {
      ...cost,
      '@type': 'MonetaryAmount',
    };
  }
  return undefined;
}