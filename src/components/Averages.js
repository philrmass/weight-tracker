import React from 'react';
import PropTypes from 'prop-types';

import { getRangeGoal } from '../utilities/averages';
import styles from '../styles/Averages.module.css';
import Icon from './Icon';

function Averages({
  eras,
  goal,
  getDateString,
}) {
  function buildEra(era, goal) {
    return (
      <li
        key={era.atStart}
        className={styles.era}
      >
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
      </li>
    );
  }

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

  return (
    <ul>
      {eras.map((era) => buildEra(era, goal))}
    </ul>
  );
}

Averages.propTypes = {
  eras: PropTypes.arrayOf(PropTypes.object).isRequired,
  goal: PropTypes.object,
  getDateString: PropTypes.func.isRequired,
};

export default Averages;
