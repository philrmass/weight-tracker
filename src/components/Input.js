import { useState } from 'preact/hooks';
import { useInterval } from 'utilities/hooks';
import { getDate, getTime } from '../utilities/time';
import Icon from 'utilities/Icon';
import styles from './Input.module.css';

export default function Input({
  addWeight,
  setMenuOpen,
}) {
  const [value, setValue] = useState('');
  const [now, setNow] = useState(Date.now());

  useInterval(() => {
    setNow(Date.now());
  }, 10000);

  const submitWeight = () => {
    const at = Date.now();
    const weight = Number(value);
    if (weight > 0) {
      addWeight(Number(weight), at);
    }
    setValue('');
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      submitWeight();
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.weight}>
        <input
          type='number'
          min='0'
          max='1000'
          step='0.1'
          className={styles.input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyUp={handleKeyUp}
        />
      </div>
      <div>
        <div>{ getDate(now) }</div>
        <div>{ getTime(now) }</div>
      </div>
      <div className={styles.buttons}>
        <button className="button" onClick={() => setMenuOpen(true)}>
          <Icon name="menu" className="icon" />
        </button>
      </div>
    </main>
  );
}
