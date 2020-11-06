import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getRangeGoal } from '../utilities/averages';
import { getMonth } from '../utilities/time';
import styles from '../styles/Monthly.module.css';
import Icon from './Icon';

function Monthly({
  months,
  goal,
}) {
  const history = useHistory();

  function buildContent(items, goal) {
    return (
      <ul className={styles.months}>
        {items.map((item) => buildItem(item, goal))}
      </ul>
    );
  }

  function buildItem(item, goal) {
    return (
      <li
        key={item.atStart}
        className={styles.item}
      >
        <div className={styles.top}>
          <div className={styles.date}>
            {getMonth(item.atStart)}
          </div>
          <div className={styles.count}>
            {`${item.items.length} measurements`}
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.average}>
            <div className={styles.averageValue}>
              {item.average.toFixed(1)}
            </div>
            <div className={styles.stdDev}>
              {`\u00b1 ${item.stdDev.toFixed(1)}`}
            </div>
          </div>
          {buildGoalDiff(item, goal)}
        </div>
      </li>
    );
  }

  function buildGoalDiff(item, goal) {
    const goalWeight = getRangeGoal(item.atStart, item.atEnd, goal);
    if (!goalWeight) {
      return null;
    }

    const diff = item.average - goalWeight;
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
    <main className={styles.main}>
      <div className={styles.close}>
        <button onClick={() => history.push('/')}>
          <Icon name='close' color='currentColor' />
        </button>
      </div >
      {buildContent(months, goal)}
    </main>
  );
}

Monthly.propTypes = {
  months: PropTypes.arrayOf(PropTypes.object).isRequired,
  goal: PropTypes.object,
};

const mapState = (state) => ({
  months: state.weights.months,
  goal: state.weights.goal,
});

export default connect(mapState)(Monthly);
