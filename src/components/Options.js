import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadData } from '../utilities/files';
import { importWeights, setOptionsOpen } from '../redux/weights/actions';
import styles from '../styles/Options.module.css';

function Options({
  importWeights,
  setOptionsOpen,
}) {
  async function importFile() {
    importWeights(await loadData());
  }

  return (
    <main>
      <div className={styles.top}>
        <button
          onClick={() => setOptionsOpen(false)}
        >
          x 
        </button>
      </div>
      <div className={styles.controls}>
        <button onClick={importFile}>
        Import
        </button>
      </div>
    </main>
  );
}

Options.propTypes = {
  importWeights: PropTypes.func.isRequired,
  setOptionsOpen: PropTypes.func.isRequired,
};

const mapDispatch = {
  importWeights,
  setOptionsOpen,
};

export default connect(null, mapDispatch)(Options);
