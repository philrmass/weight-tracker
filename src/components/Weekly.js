import React from 'react';
import { useHistory } from 'react-router-dom';

import styles from '../styles/Weekly.module.css';

function Weekly() {
  const history = useHistory();

  return (
    <main>
      <section className={styles.close}>
        <button onClick={() => history.push('/')}>
          x 
        </button>
      </section>
      WEEKLY
    </main>
  );
}

export default Weekly;
