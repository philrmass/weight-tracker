// ???
/*
import React from 'react';
import PropTypes from 'prop-types';

import { getRangeGoal } from '../utilities/averages';
import Icon from './Icon';
*/
import styles from './Average.module.css';

export default function Average({
  // data = { at: 0, weight: 0, items: [], average: 0 },
  // goal,
  // getDateString,
  onClick,
}) {
  console.log('AVERAGE', typeof onClick);
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

  return (
    <div
      className={styles.main}
      onClick={onClick}
    >
      AVERAGE
      {/*
      <div className={styles.date}>
        {getDateString(data.atStart)}
      </div>
      <div className={styles.average}>
        {data.average.toFixed(1)}
        {buildGoalDiff()}
      </div>
      <div className={styles.measurements}>
        {`${data.items.length} measurements`}
      </div>
      */}
    </div>
  );
}
