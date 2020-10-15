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

  return (
    <main className={styles.main}>
      <div className={styles.top}>
        <button
          onClick={() => setOptionsOpen(false)}
        >
          x 
        </button>
      </div>
      <div className={styles.controls}>
        <div className={styles.data}>
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
