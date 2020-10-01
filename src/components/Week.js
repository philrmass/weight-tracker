import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from '../styles/Week.module.css';
import { getWeek } from '../utilities/times';

function Week({ weeks }) {
  const week = weeks[0] ?? {};

  return (
    <main className={styles.main}>
      <div>{getWeek(week.at)}</div>
      <div className={styles.average}>
        {week.average.toFixed(1)}
      </div>
    </main>
  );
}

Week.propTypes = {
  weeks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapState = (state) => ({
  weeks: state.weights.weeks,
});

export default connect(mapState)(Week);
