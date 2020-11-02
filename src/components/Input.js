import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from '../styles/Input.module.css';
import { useInterval } from '../utilities/hooks';
import { getDate, getTime } from '../utilities/time';
import { addWeight, setOptionsOpen } from '../redux/weights/actions';
import Icon from './Icon';

function Input({
  addWeight,
  setOptionsOpen,
}) {
  const [now, setNow] = useState(Date.now());

  const [value, setValue] = useState('');
  useInterval(() => {
    setNow(Date.now());
  }, 10000);

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
        <button onClick={() => setOptionsOpen(true)}>
          <Icon name='threeDots' color='currentColor' />
        </button>
      </div>
    </main>
  );
}

Input.propTypes = {
  addWeight: PropTypes.func.isRequired,
  setOptionsOpen: PropTypes.func.isRequired,
};

const mapDispatch = {
  addWeight,
  setOptionsOpen,
};

export default connect(null, mapDispatch)(Input);
