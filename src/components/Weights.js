import { getDate, getTime } from '../utilities/time';
import Icon from 'utilities/Icon';
import styles from './Weights.module.css';

export default function Weights({
  weights,
  removeWeight,
}) {
  const buildWeight = ({ at, weight }) => (
    <li
      key={at}
      className={styles.item}
    >
      <div className={styles.weight}>
        {weight.toFixed(1)}
      </div>
      <div className={styles.time}>
        <div>
          {getDate(at)}
        </div>
        <div>
          {getTime(at)}
        </div>
      </div>
      <div className={styles.buttons}>
        <button className="button" onClick={() => removeWeight(at)}>
          <Icon name="cross" className="icon" />
        </button>
      </div>
    </li>
  );

  return (
    <ul>
      {weights.map((value) => buildWeight(value))}
    </ul>
  );
}
