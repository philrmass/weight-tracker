import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/Average.module.css';

function Average({
  data = { at: 0, weight: 0, items: [], average: 0 },
  getDateString,
  handleClick,
}) {
  function buildGoalDiff() {
    if (data.average !== 0) {
      return null;
    }

    return (
      <div className={styles.diff}>
        {'+ 0.0'}
      </div>
    );
  }

  return (
    <div
      className={styles.main}
      onClick={handleClick}
    >
      <div className={styles.date}>
        {getDateString(data.at)}
      </div>
      <div className={styles.average}>
        {data.average.toFixed(1)}
        {buildGoalDiff()}
      </div>
      <div className={styles.measurements}>
        {`${data.items.length} measurements`}
      </div>
    </div>
  );
}

Average.propTypes = {
  data: PropTypes.object,
  getDateString: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Average;
