import type { Geo } from '../../types.js';

export function setGeo(geo?: Geo) {
  if (geo) {
    return {
      ...geo,
      '@type': 'GeoCoordinates',
    };
  }

  return undefined;
}