import React from 'react';
import { useHistory } from 'react-router-dom';

import styles from '../styles/Weekly.module.css';
import Icon from './Icon';

function Weekly() {
  const history = useHistory();

  return (
    <main>
      <section className={styles.close}>
        <button onClick={() => history.push('/')}>
          <Icon name='close' color='currentColor' />
        </button>
      </section>
      WEEKLY
    </main>
  );
}

export default Weekly;
