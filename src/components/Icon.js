import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/Icon.module.css';

//??? fill defined as white by outer svg definition
//??? try defining icon color differently in two places
//??? transparent or undefined background 

const symbols = {
  circle: (
    <circle cx='50' cy='50' r='50' fill='#ffffff' />
  ),
};
//return (<rect x='5%' y='5%' width='90%' height='90%' strokeWidth='5%' stroke={stroke} fill={color} />);
//return (<polygon points='5,95 95,95 50,5' strokeWidth='5%' stroke={stroke} fill={color} />);
//return (<polygon points='50,95 90,50 50,5 10,50' strokeWidth='5%' stroke={stroke} fill={color} />);
/*
return (<polygon
      points='50,0 38.8,34.5 2.4,34.5 31.8,55.9 20.6,90.5 50,69.1 79.4,90.5 68.2,55.9 97.6,34.5 61.2,34.5'
      strokeWidth='5%'
      stroke={stroke}
      fill={color}/>);
return (<polygon
      points='98,50 74,91.6 26,91.6 2,50 26,8.4 74,8.4'
      strokeWidth='5%'
      stroke={stroke}
      fill={color}/>);
*/

function Icon({
  name,
  size = 32,
}) {
  const sizePx = `${size}px`;
  const style = { width: sizePx, height: sizePx };
  const symbol = symbols[name];

  if (!symbol) {
    return <div className={styles.error}>!</div>;
  }

  return (
    <main className={styles.main} style={style}>
      <svg width='100%' height='100%' viewBox='0 0 200 200'>
        {symbol}
      </svg>
    </main>
  );
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
};

export default Icon;
