import type { Producer } from '../../types.js';

export function setProducer(producer?: Producer) {
  if (producer) {
    return {
      '@type': 'Organization',
      sameAs: producer.url,
      name: producer.name,
    };
  }

  return undefined;
}