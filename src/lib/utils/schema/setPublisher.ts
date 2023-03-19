import { setImage } from './setImage.js';

export function setPublisher(
  publisherName: string | undefined,
  publisherLogo?: string | undefined,
) {
  if (!publisherName) {
    return undefined;
  }
  return {
    '@type': 'Organization',
    name: publisherName,
    logo: setImage(publisherLogo),
  };
}