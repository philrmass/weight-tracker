import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from '../styles/Week.module.css';
import { getWeek } from '../utilities/times';

function Week({ weeks }) {
  const week = weeks[0];
  const date = new Date(week.at);
  console.log('WEEK', week);
  console.log(' _', date);

  if (!week) {
    return null;
  }

  return (
    <main className={styles.main}>
      {getWeek(week.at)}
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
