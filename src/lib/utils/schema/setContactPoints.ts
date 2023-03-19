import type { ContactPoint } from '../../types.js';

export function setContactPoints(contactPoint?: ContactPoint[]) {
  if (contactPoint && contactPoint.length) {
    return contactPoint.map(contactPoint => ({
      '@type': 'ContactPoint',
      ...contactPoint,
    }));
  }

  return undefined;
}