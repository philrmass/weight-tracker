// import { getRangeGoal } from '../utilities/averages';
import styles from './Averages.module.css';

export default function Averages({
  eras,
  getDateString,
  trackingStartAt,
}) {
  console.log('AVES', eras.length, trackingStartAt, typeof getDateString);
  function buildEra(era) {
    return (
      <li
        key={era.atStart}
        className={styles.era}
      >
        {/*
        <div className={styles.top}>
          <div className={styles.date}>
            {getDateString(era.atStart)}
          </div>
          <div className={styles.count}>
            {`${era.items.length} measurements`}
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.average}>
            <div className={styles.averageValue}>
              {era.average.toFixed(1)}
            </div>
            <div className={styles.stdDev}>
              {`\u00b1 ${era.stdDev.toFixed(1)}`}
            </div>
          </div>
          {buildGoalDiff(era, goal)}
        </div>
        */}
      </li>
    );
  }

  /*
  function buildGoalDiff(era, goal) {
    const goalWeight = getRangeGoal(era.atStart, era.atEnd, goal);
    if (!goalWeight) {
      return null;
    }

    const diff = era.average - goalWeight;
    const iconName = diff > 0 ? 'arrowUp' : 'arrowDown';
    const iconColor = diff > 0 ? '#ff2105' : '#12d025';
    const value = Math.abs(diff).toFixed(1);

    return (
      <div className={styles.goal}>
        <div className={styles.icon}>
          <Icon name={iconName} color={iconColor} />
        </div>
        <div className={styles.diff}>
          {`${value}`}
        </div>
        <div className={styles.goalTitle}>
          Goal
        </div>
        <div className={styles.goalValue}>
          {goalWeight.toFixed(1)}
        </div>
      </div>
    );
  }
  */

  return (
    <ul>
      {eras.map((era) => buildEra(era))}
    </ul>
  );
}

/*
  function buildGoalDiff() {
    const goalWeight = getRangeGoal(data.atStart, data.atEnd, goal);
    if (!goalWeight) {
      return null;
    }

    const diff = data.average - goalWeight;
    const iconName = diff > 0 ? 'arrowUp' : 'arrowDown';
    const iconColor = diff > 0 ? '#ff2105' : '#12d025';
    const value = Math.abs(diff).toFixed(1);

    return (
      <div className={styles.diff}>
        <div className={styles.icon}>
          <Icon name={iconName} color={iconColor} />
        </div>
        {`${value}`}
      </div>
    );
  }
  */
//import { getRangeGoal } from '../utilities/averages';
