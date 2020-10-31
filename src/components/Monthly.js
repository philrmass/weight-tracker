import React from 'react';
import { useHistory } from 'react-router-dom';

import styles from '../styles/Monthly.module.css';

function Monthly() {
  const history = useHistory();

  return (
    <main>
      <section className={styles.close}>
        <button onClick={() => history.push('/')}>
          x 
        </button>
      </section>
      MONTHLY
    </main>
  );
}

export default Monthly;
