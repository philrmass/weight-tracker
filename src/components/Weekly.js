/*
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getWeek } from '../utilities/time';
import Averages from './Averages';
import Icon from './Icon';
*/
import { route } from 'preact-router';
import styles from './Weekly.module.css';

export default function Weekly({
  weeks,
  trackingStartAt,
}) {
  console.log('WKS', weeks.length, trackingStartAt);
  //const history = useHistory();

  return (
    <div className={styles.main}>
      WEEKLY
      <button onClick={() => route('/')}>
        X
      </button>
    </div>
  );
  /*
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
    */
}
