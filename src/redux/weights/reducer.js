import { calculateWeeks, calculateMonths } from '../../utilities/averages';
import { importData } from '../../utilities/data';
import { getObject, setObject } from '../../utilities/storage';

import {
  ADD_WEIGHT,
  REMOVE_WEIGHT,
  IMPORT_WEIGHTS,
} from './actions';

const all = getObject('weightTrackerAll', []);
const defaultState = {
  all,
  weeks: calculateWeeks(all),
  months: calculateMonths(all),
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
      setObject('weightTrackerAll', all);
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
      setObject('weightTrackerAll', all);
      return {
        ...state,
        all,
        weeks,
        months,
      };
    }
    case IMPORT_WEIGHTS: {
      const all = importData(state.all, action.items);
      const weeks = calculateWeeks(all);
      const months= calculateMonths(all);
      setObject('weightTrackerAll', all);
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
