import type { OpeningHoursSpecification } from '../../types.js';

export function setOpeningHours(openingHours?: OpeningHoursSpecification) {
  if (openingHours) {
    return {
      ...openingHours,
      '@type': 'OpeningHoursSpecification',
    };
  }

  return undefined;
}