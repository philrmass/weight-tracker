import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from '../styles/Weights.module.css';

function Weights({ weights }) {
  return (
    <main className={styles.main}>
      <div>
        {JSON.stringify(weights, null, 2)}
      </div>
      <div>
        {'Weights\n'.repeat(80)}
      </div>
    </main>
  );
}

Weights.propTypes = {
  weights: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapState = (state) => ({
  weights: state.weights.all,
});

export default connect(mapState)(Weights);
