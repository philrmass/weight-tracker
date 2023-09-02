/*
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getDataFilePath } from '../utilities/data';
import { saveData } from '../utilities/files';
import { useInterval } from '../utilities/hooks';
import { getDate, getTime, inSameMonth } from '../utilities/time';
import { addWeight, setMenuOpen } from '../redux/weights/actions';
import Icon from './Icon';
import Modal from './Modal';
*/
import styles from './Input.module.css';

export default function Input({
  addWeight,
  setMenuOpen,
}) {
  console.log('INPUT', typeof addWeight);
  /*
  const [now, setNow] = useState(Date.now());
  const [isSaveOpen, setShowOpen] = useState(false);

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
    const at = Date.now();
    const weight = Number(value);
    if (weight > 0) {
      addWeight(Number(weight), at);
    }
    setValue('');
    checkSave(at);
  }
  */

  return (
    <main className={styles.main}>
      INPUT
      {/*
      <div className={styles.weight}>
        <input
          type='number'
          min='0'
          max='1000'
          step='0.1'
          className={styles.input}
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
      */}
      <div className={styles.buttons}>
        <button onClick={() => setMenuOpen(true)}>
          Menu
          {/*
          <Icon name='threeDots' color='currentColor' />
          */}
        </button>
      </div>
    </main>
  );
}
