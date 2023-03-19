import type { Organizer } from '../../types.js';

export function setOrganizer(organizer?: Organizer) {
  if (organizer) {
    const { type, ...restOrganizer } = organizer;
    return {
      ...restOrganizer,
      '@type': type || 'Person',
    };
  }

  return undefined;
}