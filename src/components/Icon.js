import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/Icon.module.css';

const symbols = {
  close: (
    <polygon points='27,30 12,15 15,12 30,27 45,12 48,15 33,30 48,45 45,48 30,33 15,48 12,45' />
  ),
  arrowUp: (
    <polygon points='25,30 25,55 35,55 35,30 55,30 30,5 5,30' />
  ),
  arrowDown: (
    <polygon points='25,30 25,5 35,5 35,30 55,30 30,55 5,30' />
  ),
  threeDots: (
    <g>
      <circle cx='10' cy='30' r='5' />
      <circle cx='30' cy='30' r='5' />
      <circle cx='50' cy='30' r='5' />
    </g>
  ),
};

function Icon({
  name,
  color = '#ffffff',
}) {
  const symbol = symbols[name];

  if (!symbol) {
    return <div className={styles.error}>!</div>;
  }

  const style = { fill: color };

  return (
    <div className={styles.icon} style={style}>
      <svg width='100%' height='100%' viewBox='0 0 60 60'>
        {symbol}
      </svg>
    </div>
  );
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default Icon;
