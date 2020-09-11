import {
  ADD_WEIGHT,
  REMOVE_WEIGHT,
} from './actions';

const defaultState = {
  all: [],
};

export default function weightsReducer(state = defaultState, action) {
  switch (action.type) {
    case ADD_WEIGHT: {
      const value = {
        at: action.at,
        weight: action.weight,
      };
      return {
        ...state,
        all: [value, ...state.all],
      };
    }
    case REMOVE_WEIGHT: {
      const all = state.all.filter((value) => value.at !== action.at);
      return {
        ...state,
        all,
      };
    }
    default:
      return state;
  }
}
