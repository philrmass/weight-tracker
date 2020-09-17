import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from '../styles/Month.module.css';

function Month({ months }) {
  return (
    <main className={styles.main}>
      {months.length}
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
