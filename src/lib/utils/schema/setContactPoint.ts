import type { ContactPoint } from '../../types.js';

export function setContactPoint(contactPoint: ContactPoint) {
  if (contactPoint) {
    return {
      ...contactPoint,
      '@type': 'ContactPoint',
    };
  }

  return undefined;
}