import React from 'react';
import { useHistory } from 'react-router-dom';

import styles from '../styles/GraphPage.module.css';
import Graph from './Graph';
import Icon from './Icon';

function GraphPage() {
  const history = useHistory();

  return (
    <main className={styles.main}>
      <div className={styles.close}>
        <button onClick={() => history.push('/')}>
          <Icon name='close' color='currentColor' />
        </button>
      </div>
      <Graph />
    </main>
  );
}

export default GraphPage;
