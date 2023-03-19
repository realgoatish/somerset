import type { CreativeWork } from '../../types.js';

export function setCreativeWork(creativeWork: CreativeWork) {
  if (creativeWork) {
    return {
      ...creativeWork,
      '@type': 'CreativeWork',
    };
  }

  return undefined;
}