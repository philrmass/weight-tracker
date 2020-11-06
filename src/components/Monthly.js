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

  function buildMonth(month) {
    return (
      <li
        key={month.atStart}
        className={styles.month}
      >
        <div className={styles.top}>
          <div className={styles.date}>
            {getMonth(month.atStart)}
          </div>
          <div className={styles.count}>
            {`${month.items.length} measurements`}
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.average}>
            <div className={styles.averageValue}>
              {month.average.toFixed(1)}
            </div>
            <div className={styles.stdDev}>
              {`\u00b1 ${month.stdDev.toFixed(1)}`}
            </div>
          </div>
          {buildGoalDiff(month)}
        </div>
      </li>
    );
  }

  function buildGoalDiff(month) {
    const goalWeight = getRangeGoal(month.atStart, month.atEnd, goal);
    if (!goalWeight) {
      return null;
    }

    const diff = month.average - goalWeight;
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
      <div>
        <section className={styles.close}>
          <button onClick={() => history.push('/')}>
            <Icon name='close' color='currentColor' />
          </button>
        </section>
        <section>
          <ul className={styles.months}>
            {months.map((month) => buildMonth(month))}
          </ul>
        </section>
      </div>
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
