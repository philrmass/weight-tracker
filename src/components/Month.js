import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from '../styles/Month.module.css';
import { getMonth } from '../utilities/times';

function Month({ months }) {
  const month = months[0] ?? {};

  return (
    <main className={styles.main}>
      <div>{getMonth(month.at)}</div>
      <div className={styles.average}>
        {month.average.toFixed(1)}
      </div>
    </main>
  );
}

Month.propTypes = {
  months: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapState = (state) => ({
  months: state.weights.months,
});

export default connect(mapState)(Month);
