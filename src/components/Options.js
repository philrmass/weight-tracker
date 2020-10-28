import React, { useState }  from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadData, saveData } from '../utilities/files';
import {
  setGoal,
  importWeights,
  exportWeights,
  setOptionsOpen,
} from '../redux/weights/actions';
import styles from '../styles/Options.module.css';

function Options({
  items,
  goal,
  message,
  setGoal,
  importWeights,
  exportWeights,
  setOptionsOpen,
}) {
  const [goalOpen, setGoalOpen] = useState(false);
  const [goalLbs, setGoalLbs] = useState(10);
  const [goalMonths, setGoalMonths] = useState(6);

  function saveGoal() {
    console.log('SAVE');
  }

  async function importFile() {
    importWeights(await loadData());
  }

  async function exportFile() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const filePath = `weights_${year}_${month}_${date}.json`;

    await saveData(filePath, items);
    exportWeights(items.length);
  }

  function buildGoal() {
    return (
      <section className={styles.goal}>
        <div className={styles.title}>Goal</div>
        {buildGoalContent()}
      </section>
    );
  }

    /*
    value={value}
    onChange={handleChange}
    onKeyUp={handleKeyUp}

    value={dateToEdit(activeEvent.date)}
    onChange={(e) => handleDateChange(e.target.value)}
    return (
        <div className={styles.label}>From</div>
        <div className={styles.goalControls}>
          <input
            type='number'
            min='0'
            max='1000'
            step='0.1'
            value={201.6}
            onChange={() => {}}
          />
          <input
            type='date'
            className={styles.dateInput}
          />
        </div>
        <div className={styles.label}>To</div>
        <div className={styles.goalControls}>
          <input
            type='number'
            min='0'
            max='1000'
            step='0.1'
            value={201.6}
            onChange={() => {}}
          />
          <input
            type='date'
            className={styles.dateInput}
          />
        </div>
    );
  */

  function buildGoalContent() {
    if (goalOpen) {
      return (
        <div>
          <div className={styles.goalInputs}>
            OPEN GOAL
          </div>
          <div className={styles.buttons}>
            <button onClick={saveGoal}>
              Set
            </button>
          </div>
        </div>
      );
    }

    if (goal) {
      return (
        <div>
          <div className={styles.goalMessage}>
            OPEN GOAL
          </div>
          <div className={styles.buttons}>
            <button onClick={() => console.log('RESET')}>
              Reset
            </button>
            <button onClick={() => console.log('CLEAR')}>
              Clear
            </button>
          </div>
        </div>
      );
    }

    return (
      <div>NO GOAL
        <div className={styles.buttons}>
          <div className={styles.buttons}>
            <button onClick={() => setGoalOpen(true)}>
              Set
            </button>
          </div>
        </div>
      </div>
    );
  }
  // { at/weight Start/End }
  //??? if (goalOpen) "grid layout"
  // Lose [] lbs
  // In [6] months
  // <Save>
  //??? if (goal)
  // Reach 200.0 lbs by
  // Septermber 20, 2021
  // <Reset> <Clear>
  //??? 
  // 'There is no goal set'
  // <Set>

  function buildData() {
    return (
      <section>
        <div className={styles.title}>Data</div>
        <div className={styles.buttons}>
          <button onClick={importFile}>
            Import
          </button>
          <button onClick={exportFile}>
            Export
          </button>
        </div>
        <div className={styles.message}>
          {message}
        </div>
      </section>
    );
  }

  return (
    <main className={styles.main}>
      <section className={styles.close}>
        <button
          onClick={() => setOptionsOpen(false)}
        >
          x 
        </button>
      </section>
      <section className={styles.controls}>
        {buildGoal()}
        {buildData()}
      </section>
    </main>
  );
}

Options.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  goal: PropTypes.object,
  message: PropTypes.string.isRequired,
  setGoal: PropTypes.func.isRequired,
  importWeights: PropTypes.func.isRequired,
  exportWeights: PropTypes.func.isRequired,
  setOptionsOpen: PropTypes.func.isRequired,
};

const mapState = (state) => ({
  items: state.weights.all,
  goal: state.weights.goal,
  message: state.weights.message,
});

const mapDispatch = {
  setGoal,
  importWeights,
  exportWeights,
  setOptionsOpen,
};

export default connect(mapState, mapDispatch)(Options);
