import React, { useState }  from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getWeightAverage } from '../utilities/averages';
import { loadData, saveData } from '../utilities/files';
import { getDate, getMonthsFrom } from '../utilities/times';
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
  const defaultLbs = 10;
  const defaultMonths = 6;
  const [goalOpen, setGoalOpen] = useState(false);
  const [goalLbs, setGoalLbs] = useState(defaultLbs);
  const [goalMonths, setGoalMonths] = useState(defaultMonths);

  function saveGoal() {
    const atStart = Date.now();
    const atEnd = getMonthsFrom(goalMonths, atStart);
    const weightStart = getWeightAverage(items, 30);
    const weightEnd = weightStart - goalLbs;

    setGoal({
      atStart,
      atEnd,
      weightStart,
      weightEnd,
    });
    resetGoalInterface();
  }

  function clearGoal(isOpen) {
    setGoal(null);
    resetGoalInterface(isOpen);
  }

  function resetGoalInterface(isOpen = false) {
    setGoalOpen(isOpen);
    setGoalLbs(defaultLbs);
    setGoalMonths(defaultMonths);
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
      <section>
        <div className={styles.title}>Goal</div>
        <div className={styles.section}>
          {buildGoalContent()}
        </div>
      </section>
    );
  }

  function buildGoalContent() {
    if (goalOpen) {
      return (
        <div>
          <div className={styles.goalInputs}>
            <div>Lose</div>
            <input
              type='number'
              min='0'
              max='1000'
              step='0.1'
              value={goalLbs}
              onChange={(e) => setGoalLbs(e.target.value)}
            />
            <div>lbs</div>
            <div>In</div>
            <input
              type='number'
              min='1'
              max='100'
              value={goalMonths}
              onChange={(e) => setGoalMonths(e.target.value)}
            />
            <div>months</div>
          </div>
          <div className={styles.buttons}>
            <button onClick={saveGoal}>
              Save
            </button>
            <button onClick={resetGoalInterface}>
              Cancel
            </button>
          </div>
        </div>
      );
    }

    if (goal) {
      const date = getDate(goal.atEnd);

      return (
        <div>
          <div className={styles.goalMessage}>
            {`Reach ${goal.weightEnd} lbs by\n${date}`}
          </div>
          <div className={styles.buttons}>
            <button onClick={() => clearGoal(true)}>
              Reset
            </button>
            <button onClick={() => clearGoal(false)}>
              Clear
            </button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className={styles.goalMessage}>
          No goal has been set
        </div>
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

  function buildData() {
    return (
      <section>
        <div className={styles.title}>Data</div>
        <div className={styles.section}>
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
