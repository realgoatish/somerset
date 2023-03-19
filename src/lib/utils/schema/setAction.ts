import type { Action } from '../../types.js';

export function setAction(action?: Action) {
  if (action) {
    return {
      '@type': action.actionType,
      name: action.actionName,
      target: action.target,
    };
  }

  return undefined;
}