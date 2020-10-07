export const ADD_WEIGHT = 'ADD_WEIGHT';
export const REMOVE_WEIGHT = 'REMOVE_WEIGHT';
export const IMPORT_WEIGHTS = 'IMPORT_WEIGHTS';

export function addWeight(weight) {
  const at = Date.now();

  return {
    type: ADD_WEIGHT,
    at,
    weight,
  };
}

export function removeWeight(at) {
  return {
    type: REMOVE_WEIGHT,
    at,
  };
}

export function importWeights(items) {
  return {
    type: IMPORT_WEIGHTS,
    items,
  };
}
