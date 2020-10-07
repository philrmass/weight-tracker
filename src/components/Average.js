import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/Average.module.css';

function Average({
  data = { at: 0, weight: 0, items: [], average: 0 },
  getDateString,
  handleClick,
}) {
  return (
    <div
      className={styles.main}
      onClick={handleClick}
    >
      <div className={styles.top}>
        <div>{getDateString(data.at)}</div>
        <div className={styles.average}>
          {data.average.toFixed(1)}
        </div>
      </div>
      <div className={styles.measurements}>
        <div>
          {`${data.items.length} measurements`}
        </div>
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
