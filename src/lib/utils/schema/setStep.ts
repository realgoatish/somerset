import type { Step } from '../../types.js';
import { setImage } from './setImage.js';

export function setStep(step?: Step[]) {
  if (step) {
    return step.map(stepElement => {
      const { itemListElement, image } = stepElement;
      const currentListElements = itemListElement?.map(({ type, text }) => ({
        '@type': type,
        text,
      }));
      return {
        ...stepElement,
        '@type': 'HowToStep',
        itemListElement: currentListElements,
        image: setImage(image),
      };
    });
  }

  return undefined;
}