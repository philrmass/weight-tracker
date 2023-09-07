import { route } from 'preact-router';
import { getMonth } from '../utilities/time';
import Averages from './Averages';
import Icon from 'utilities/Icon';
import styles from './Monthly.module.css';

export default function Monthly({
  months,
  trackingStartAt,
}) {
  return (
    <div className={styles.main}>
      <div
        className={styles.header}
        onClick={() => route('/')}
      >
        <Icon name="cross" className="icon" />
      </div>
      <div className={styles.averages}>
        <Averages
          eras={months}
          getDateString={getMonth}
          trackingStartAt={trackingStartAt}
        />
      </div>
    </div>
  );
}
