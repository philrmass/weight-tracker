import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from '../styles/Input.module.css';
import { getDataFilePath } from '../utilities/data';
import { saveData } from '../utilities/files';
import { useInterval } from '../utilities/hooks';
import { getDate, getTime, inSameMonth } from '../utilities/time';
import { addWeight, setOptionsOpen } from '../redux/weights/actions';
import Icon from './Icon';
import Modal from './Modal';

function Input({
  items,
  addWeight,
  setOptionsOpen,
}) {
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

  function checkSave(at) {
    const atLast = items[0]?.at;
    if (items.length > 10 && !inSameMonth(at, atLast)) {
      setShowOpen(true);
    }
  }

  function verifySave() {
    setShowOpen(false);
    const filePath = getDataFilePath();
    saveData(filePath, items);
  }

  function buildSaveModal() {
    return (
      <div className={styles.save}>
        Would you like to back up your data?
        <div className={styles.saveButtons}>
          <button onClick={verifySave}>
            Save
          </button>
          <button onClick={() => setShowOpen(false)}>
            Cancel
          </button>
        </div>
      </div>
    );
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
      <Modal isOpen={isSaveOpen}>
        {buildSaveModal()}
      </Modal>
    </main>
  );
}

Input.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  addWeight: PropTypes.func.isRequired,
  setOptionsOpen: PropTypes.func.isRequired,
};

const mapState = (state) => ({
  items: state.weights.all,
});

const mapDispatch = {
  addWeight,
  setOptionsOpen,
};

export default connect(mapState, mapDispatch)(Input);
