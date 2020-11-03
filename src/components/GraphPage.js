import React from 'react';
import { useHistory } from 'react-router-dom';

import styles from '../styles/GraphPage.module.css';
import Icon from './Icon';

function GraphPage() {
  const history = useHistory();

  return (
    <main>
      <section className={styles.close}>
        <button onClick={() => history.push('/')}>
          <Icon name='close' color='currentColor' />
        </button>
      </section>
      GRAPH PAGE
    </main>
  );
}

export default GraphPage;
