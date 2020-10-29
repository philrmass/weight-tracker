import React from 'react';
//import PropTypes from 'prop-types';

import styles from '../styles/Icon.module.css';

function Icon() {
  return (
    <main className={styles.main}>
      ...
    </main>
  );
}
/*
import React from 'react';
import PropTypes from 'prop-types';
import colors from '../data/colors';
import symbols from '../data/symbols';
import styles from '../styles/PhonemeDisplay.module.css';

function svgSymbol(shape, color) {
  const stroke = '#404040';
  if (shape === 'circle') {
    return (<circle cx='50%' cy='50%' r='45%' strokeWidth='5%' stroke={stroke} fill={color} />);
  } else if (shape === 'square') {
    return (<rect x='5%' y='5%' width='90%' height='90%' strokeWidth='5%' stroke={stroke} fill={color} />);
  } else if (shape === 'triangle') {
    return (<polygon points='5,95 95,95 50,5' strokeWidth='5%' stroke={stroke} fill={color} />);
  } else if (shape === 'rhombus') {
    return (<polygon points='50,95 90,50 50,5 10,50' strokeWidth='5%' stroke={stroke} fill={color} />);
  } else if (shape === 'star') {
    return (<polygon
      points='50,0 38.8,34.5 2.4,34.5 31.8,55.9 20.6,90.5 50,69.1 79.4,90.5 68.2,55.9 97.6,34.5 61.2,34.5'
      strokeWidth='5%'
      stroke={stroke}
      fill={color}/>);
  } else if (shape === 'hexagon') {
    return (<polygon
      points='98,50 74,91.6 26,91.6 2,50 26,8.4 74,8.4'
      strokeWidth='5%'
      stroke={stroke}
      fill={color}/>);
  }
    return null;
  ;
}

function PhonemeDisplay(props) {
  const symbol = symbols[props.phoneme];
  const colorCode = colors[symbol.color];

  const handleDragStart = (e) => {
    e.stopPropagation();
    e.dataTransfer.setData('text', props.phoneme);
  };

  return (
    <div draggable='true' onDragStart={handleDragStart} className={styles.phonemeDisplay}>
      <div className={styles.symbolWrap}>
        <div className={styles.symbol}>
          <svg width='100%' height='100%' viewBox='0 0 100 100'>
            {svgSymbol(symbol.shape, colorCode)}
          </svg>
        </div>
      </div>
      <div className={styles.phoneme}>
        {props.phoneme}
      </div>
    </div>
  );
}

PhonemeDisplay.propTypes = {
  phoneme: PropTypes.string,
};
*/

export default Icon;
