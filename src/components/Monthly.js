import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getMonth } from '../utilities/time';
import styles from '../styles/Monthly.module.css';
import Averages from './Averages';
import Icon from './Icon';

function Monthly({
  months,
  goal,
}) {
  const history = useHistory();

  return (
    <main className={styles.main}>
      <section className={styles.close}>
        <button onClick={() => history.push('/')}>
          <Icon name='close' color='currentColor' />
        </button>
      </section>
      <Averages
        eras={months}
        goal={goal}
        getDateString={getMonth}
      />
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
