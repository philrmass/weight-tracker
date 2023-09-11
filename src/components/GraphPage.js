import { route } from 'preact-router';
import Graph from './Graph';
import styles from './GraphPage.module.css';

function GraphPage({ weights }) {
  return (
    <main className={styles.main}>
      <button
        onClick={() => route('/')}
      >
        RETURN
      </button>
      {/*
      <div className={styles.close}>
        <button onClick={() => history.push('/weight-tracker')}>
          <Icon name='close' color='currentColor' />
        </button>
      </div>
      */}
      <Graph weights={weights} />
    </main>
  );
}

export default GraphPage;
