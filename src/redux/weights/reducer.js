import { calculateWeeks, calculateMonths } from '../../utilities/averages';

import {
  ADD_WEIGHT,
  REMOVE_WEIGHT,
} from './actions';

//??? remove once in local storage
const tempData = [
  {
    'at': 1599869422299,
    'weight': 194.2,
  },
  {
    'at': 1599869421988,
    'weight': 195,
  },
  {
    'at': 1599869421675,
    'weight': 196.5,
  },
  {
    'at': 1599869420450,
    'weight': 196.6,
  },
  {
    'at': 1599869420214,
    'weight': 197.9,
  },
  {
    'at': 1599869419537,
    'weight': 198.9,
  },
  {
    'at': 1599869419058,
    'weight': 199,
  },
  {
    'at': 1599869418245,
    'weight': 199,
  },
  {
    'at': 1599869418034,
    'weight': 200.4,
  },
  {
    'at': 1599869417825,
    'weight': 199.5,
  },
  {
    'at': 1599869417607,
    'weight': 200,
  },
  {
    'at': 1599869417151,
    'weight': 198.9,
  },
  {
    'at': 1599869416680,
    'weight': 199,
  },
  {
    'at': 1599869416211,
    'weight': 200,
  },
];

const defaultState = {
  all: tempData,
  weeks: [],
  months: [],
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
