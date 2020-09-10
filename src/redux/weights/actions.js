export const ADD_WEIGHT = 'ADD_WEIGHT';
export const REMOVE_WEIGHT = 'REMOVE_WEIGHT';

export function addWeight(weight) {
  const at = Date.now();

  console.log('ACTION_ADD', weight);
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
