import type { Performer } from '../../types.js';

export function setPerformer(performer?: Performer) {
  if (performer) {
    const { type, ...restPerformer } = performer;
    return {
      ...restPerformer,
      '@type': type || 'PerformingGroup',
    };
  }

  return undefined;
}