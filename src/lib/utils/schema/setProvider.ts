import type { Provider } from '../../types.js';

export function setProvider(provider: Provider) {
  if (provider) {
    return {
      '@type': provider.type || 'Organization',
      name: provider.name,
      sameAs: provider.url,
    };
  }

  return undefined;
}