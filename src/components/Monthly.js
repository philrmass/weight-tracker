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
        <div className={styles.date}>
          {getMonth(month.atStart)}
        </div>
        <div className={styles.average}>
          {month.average.toFixed(1)}
          {buildGoalDiff(month)}
        </div>
        <div className={styles.count}>
          {`${month.items.length} measurements`}
        </div>
        <div className={styles.stdDev}>
          {month.stdDev.toFixed(1)}
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
    console.log('GW', goalWeight, diff, iconName, iconColor, value);

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
    <main className={styles.main}>
      <section className={styles.close}>
        <button onClick={() => history.push('/')}>
          <Icon name='close' color='currentColor' />
        </button>
      </section>
      <section className={styles.data}>
        <ul className={styles.weights}>
          {months.map((month) => buildMonth(month))}
        </ul>
        {/*
        */}
      </section>
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
