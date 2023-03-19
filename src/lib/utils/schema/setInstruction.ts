import type { Instruction } from '../../types.js';

export function setInstruction(instruction: Instruction) {
  if (instruction) {
    return {
      ...instruction,
      '@type': 'HowToStep',
    };
  }

  return undefined;
}