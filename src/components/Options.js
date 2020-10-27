import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadData, saveData } from '../utilities/files';
import { importWeights, exportWeights, setOptionsOpen } from '../redux/weights/actions';
import styles from '../styles/Options.module.css';

function Options({
  items,
  message,
  importWeights,
  exportWeights,
  setOptionsOpen,
}) {
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

  //??? start weight, start date
  //??? goal weight, goal date
  /*
  value={value}
  onChange={handleChange}
  onKeyUp={handleKeyUp}

  value={dateToEdit(activeEvent.date)}
  onChange={(e) => handleDateChange(e.target.value)}
  */
  return (
    <main className={styles.main}>
      <section className={styles.top}>
        <button
          onClick={() => setOptionsOpen(false)}
        >
          x 
        </button>
      </section>
      <section className={styles.controls}>
        <section className={styles.goal}>
          <div className={styles.title}>Goal</div>
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
        </section>
        <section className={styles.data}>
          <div className={styles.title}>Data</div>
          <div className={styles.dataControls}>
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
      </section>
    </main>
  );
}

Options.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  message: PropTypes.string.isRequired,
  importWeights: PropTypes.func.isRequired,
  exportWeights: PropTypes.func.isRequired,
  setOptionsOpen: PropTypes.func.isRequired,
};

const mapState = (state) => ({
  items: state.weights.all,
  message: state.weights.message,
});

const mapDispatch = {
  importWeights,
  exportWeights,
  setOptionsOpen,
};

export default connect(mapState, mapDispatch)(Options);
