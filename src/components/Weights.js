import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getDate, getTime } from '../utilities/time';
import { removeWeight } from '../redux/weights/actions';
import styles from '../styles/Weights.module.css';
import Icon from './Icon';

function Weights({
  weights,
  removeWeight,
}) {
  function buildWeight(value) {
    return (
      <li
        key={value.at}
        className={styles.item}
      >
        <div className={styles.weight}>
          {value.weight.toFixed(1)}
        </div>
        <div className={styles.time}>
          <div>
            {getDate(value.at)}
          </div>
          <div>
            {getTime(value.at)}
          </div>
        </div>
        <div className={styles.buttons}>
          <button onClick={() => removeWeight(value.at)}>
            <Icon name='close' color='currentColor' />
          </button>
        </div>
      </li>
    );
  }

  return (
    <main>
      <ul className={styles.weights}>
        {weights.map((value) => buildWeight(value))}
      </ul>
    </main>
  );
}

Weights.propTypes = {
  weights: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeWeight: PropTypes.func.isRequired,
};

const mapState = (state) => ({
  weights: state.weights.all,
});

const mapDispatch = {
  removeWeight,
};

export default connect(mapState, mapDispatch)(Weights);
