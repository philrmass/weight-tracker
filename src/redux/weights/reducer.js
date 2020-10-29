import { calculateWeeks, calculateMonths } from '../../utilities/averages';
import { importData } from '../../utilities/data';
import { getObject, setObject } from '../../utilities/storage';

import {
  ADD_WEIGHT,
  REMOVE_WEIGHT,
  SET_GOAL,
  IMPORT_WEIGHTS,
  EXPORT_WEIGHTS,
  SET_OPTIONS_OPEN,
} from './actions';

const all = getObject('weightTrackerAll', []);
const goal = getObject('weightTrackerGoal', null);
const defaultState = {
  all,
  weeks: calculateWeeks(all),
  months: calculateMonths(all),
  goal,
  message: '',
  isOptionsOpen: false,
};

function getImportMessage(stats) {
  return `Added ${stats.added} measurements\n` +
    ` to ${stats.existing} existing measurements,\n` +
    ` removed ${stats.duplicates} duplicates\n` +
    ` for a total of ${stats.all}`;
}

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
    case SET_GOAL:
      setObject('weightTrackerGoal', action.goal);
      return {
        ...state,
        goal: action.goal,
      };
    case IMPORT_WEIGHTS: {
      const { all, stats } = importData(state.all, action.items);
      const weeks = calculateWeeks(all);
      const months= calculateMonths(all);
      const message = getImportMessage(stats);
      setObject('weightTrackerAll', all);
      return {
        ...state,
        all,
        weeks,
        months,
        message,
      };
    }
    case EXPORT_WEIGHTS: {
      const message = `Exported ${action.count} measurements`;
      return {
        ...state,
        message,
      };
    }
    case SET_OPTIONS_OPEN:
      return {
        ...state,
        isOptionsOpen: action.value,
        message: '',
      };
    default:
      return state;
  }
}
