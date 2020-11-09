import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getWeek } from '../utilities/time';
import styles from '../styles/Weekly.module.css';
import Averages from './Averages';
import Icon from './Icon';

function Weekly({
  weeks,
  goal,
}) {
  const history = useHistory();

  return (
    <main className={styles.main}>
      <div className={styles.close}>
        <button onClick={() => history.push('/weight-tracker')}>
          <Icon name='close' color='currentColor' />
        </button>
      </div>
      <Averages
        eras={weeks}
        goal={goal}
        getDateString={getWeek}
      />
    </main>
  );
}

Weekly.propTypes = {
  weeks: PropTypes.arrayOf(PropTypes.object).isRequired,
  goal: PropTypes.object,
};

const mapState = (state) => ({
  weeks: state.weights.weeks,
  goal: state.weights.goal,
});

export default connect(mapState)(Weekly);
