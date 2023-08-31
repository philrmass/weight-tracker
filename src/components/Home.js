import { version } from '../../package.json';
/*
import { getWeek, getMonth } from '../utilities/time';
import styles from '../styles/Home.module.css';
import Average from './Average';
import Graph from './Graph';
import Input from './Input';
import Modal from './Modal';
import Options from './Options';
import Weights from './Weights';
*/

export default function Home({
  // weeks, months, goal, isOptionsOpen,
}) {
  console.log('version', version);

  return (
    <div>HOME</div>
    /*
    <>
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.input}>
            <Input />
          </div>
          <div className={styles.weights}>
            <Weights />
          </div>
          <div className={styles.averages}>
            <div className={styles.week}>
              <Average
                data={weeks[0]}
                goal={goal}
                getDateString={getWeek}
                handleClick={() => history.push('/weight-tracker/weekly')}
              />
            </div>
            <div className={styles.spacer}></div>
            <div className={styles.month}>
              <Average
                data={months[0]}
                goal={goal}
                getDateString={getMonth}
                handleClick={() => history.push('/weight-tracker/monthly')}
              />
            </div>
          </div>
          <div
            className={styles.graph}
            onClick={() => history.push('/weight-tracker/graph')}
          >
            <Graph />
          </div>
          <div className={styles.version}>
            {`v ${version}`}
          </div>
        </div>
      </main>
      <Modal isOpen={isOptionsOpen}>
        <Options />
      </Modal>
    </>
    */
  );
}

/*
import { calculateWeeks, calculateMonths } from '../../utilities/averages';
import { importData } from '../../utilities/data';
import { getObject, setObject } from '../../utilities/storage';
import { demoData } from './demoData.js';

import {
  ADD_WEIGHT,
  REMOVE_WEIGHT,
  SET_GOAL,
  IMPORT_WEIGHTS,
  EXPORT_WEIGHTS,
  SET_OPTIONS_OPEN,
} from './actions';

const all = getObject('weightTrackerAll', demoData);
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
      const isDemoData = state.all[0]?.at === 1637678071575;
      const existing = isDemoData ? [] : state.all;
      const all = [value, ...existing];
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
*/
