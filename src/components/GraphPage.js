import { route } from 'preact-router';
import Graph from './Graph';
import styles from './GraphPage.module.css';

export default function GraphPage({ weights }) {
  return (
    <div
      className={styles.main}
      onClick={() => route('/')}
    >
      <Graph weights={weights} />
    </div>
  );
}
