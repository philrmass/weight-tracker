import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from '../styles/Week.module.css';

function Week({ weeks }) {
  const week = weeks[0];

  if (!week) {
    return null;
  }

  return (
    <main className={styles.main}>
      {JSON.stringify(week)}
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
