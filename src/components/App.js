import React from 'react';

import Graph from './Graph';
import Input from './Input';
import Month from './Month';
import Week from './Week';
import Weights from './Weights';
import styles from '../styles/App.module.css';

function App() {
  return (
    <main className={styles.main}>
      <div className={styles.input}>
        <Input />
      </div>
      <div className={styles.weights}>
        <Weights />
      </div>
      <div className={styles.averages}>
        <div className={styles.week}>
          <Week />
        </div>
        <div className={styles.month}>
          <Month />
        </div>
      </div>
      <div className={styles.graph}>
        <Graph />
      </div>
    </main>
  );
}

export default App;
