import React from 'react';
import PropTypes from 'prop-types';

import { getRangeGoal } from '../utilities/averages';
import styles from '../styles/Average.module.css';
import Icon from './Icon';

function Average({
  data = { at: 0, weight: 0, items: [], average: 0 },
  goal,
  getDateString,
  handleClick,
}) {
  function buildGoalDiff() {
    const goalWeight = getRangeGoal(data.atStart, data.atEnd, goal);
    if (!goalWeight) {
      return null;
    }

    const diff = data.average - goalWeight;
    const iconName = diff < 0 ? 'arrowUp' : 'arrowDown';
    //??? use defined colors
    const iconColor = diff < 0 ? 'red' : 'green';
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

  return (
    <div
      className={styles.main}
      onClick={handleClick}
    >
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
    </div>
  );
}

Average.propTypes = {
  data: PropTypes.object,
  goal: PropTypes.object,
  getDateString: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Average;
