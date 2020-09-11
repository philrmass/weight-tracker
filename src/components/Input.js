import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from '../styles/Input.module.css';
import { getDate, getTime } from '../utilities/times';
import { addWeight } from '../redux/weights/actions';

function Input({ addWeight }) {
  const now = Date.now();
  //???
  const [value, setValue] = useState('200.0');
  //const [value, setValue] = useState('');

  /*
  const date = new Date();
  const dayOptions = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
  const timeOptions = { hour: 'numeric', minute: '2-digit' };
  const day = date.toLocaleString('en-us', dayOptions);
  const time = date.toLocaleString('en-us', timeOptions);
  */

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleKeyUp(e) {
    if (e.key === 'Enter') {
      submitWeight();
    }
  }

  function submitWeight() {
    const weight = Number(value);
    if (weight > 0) {
      addWeight(Number(weight));
    }
    setValue('');
    //??? remove
    if (weight > 0) {
      const change = Math.round(30 * Math.random() - 15) / 10;
      const value = Math.round(10 * (weight + change)) / 10;
      setValue(`${value}`);
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.weight}>
        <input
          type='number'
          min='0'
          max='1000'
          step='0.1'
          value={value}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
        />
      </div>
      <div className={styles.time}>
        <div>
          {getDate(now)}
        </div>
        <div>
          {getTime(now)}
        </div>
      </div>
      <div className={styles.buttons}>
        <button onClick={() => console.log('OPTIONS')}>
          ...
        </button>
      </div>
    </main>
  );
}

Input.propTypes = {
  addWeight: PropTypes.func.isRequired,
};

const mapDispatch = {
  addWeight,
};

export default connect(null, mapDispatch)(Input);
