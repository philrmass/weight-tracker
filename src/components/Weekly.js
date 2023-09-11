import { route } from 'preact-router';
import { getWeek } from '../utilities/time';
import Averages from './Averages';
import Icon from 'utilities/Icon';
import styles from './Weekly.module.css';

export default function Weekly({
  weeks,
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
          eras={weeks}
          getDateString={getWeek}
          trackingStartAt={trackingStartAt}
        />
      </div>
    </div>
  );
}
