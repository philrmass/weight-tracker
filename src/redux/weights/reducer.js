import { calculateWeeks, calculateMonths } from '../../utilities/averages';
import { importData } from '../../utilities/data';
import { getObject, setObject } from '../../utilities/storage';
//??? remove once in local storage
import { testData } from './temp';
const fromLocal = getObject('weightTrackerAll', []);
const myAll = importData(fromLocal, testData);

import {
  ADD_WEIGHT,
  REMOVE_WEIGHT,
} from './actions';

const defaultState = {
  all: myAll,
  weeks: calculateWeeks(myAll),
  months: calculateMonths(myAll),
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
