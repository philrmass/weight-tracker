import { calculateWeeks, calculateMonths } from '../../utilities/averages';
//??? remove once in local storage
import { data } from './temp';
data.sort((a, b) => b.at - a.at);

import {
  ADD_WEIGHT,
  REMOVE_WEIGHT,
} from './actions';

const defaultState = {
  all: data,
  weeks: calculateWeeks(data),
  months: calculateMonths(data),
};

export default function weightsReducer(state = defaultState, action) {
  switch (action.type) {
    case ADD_WEIGHT: {
      const value = {
        at: action.at,
        weight: action.weight,
      };
      const all = [value, ...state.all];
      const weeks = calculateWeeks(all);
      const months= calculateMonths(all);
      console.log('Ms', months);
      console.log('WKs', weeks);
      return {
        ...state,
        all,
        weeks,
        months,
      };
    }
    case REMOVE_WEIGHT: {
      const all = state.all.filter((value) => value.at !== action.at);
      const weeks = calculateWeeks(all);
      const months= calculateMonths(all);
      return {
        ...state,
        all,
        weeks,
        months,
      };
    }
    default:
      return state;
  }
}
