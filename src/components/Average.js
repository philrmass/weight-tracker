import styles from './Average.module.css';

export default function Average({
  data,
  getDateString,
}) {
  return (
    <div
      className={styles.main}
    >
      <div className={styles.date}>
        {data && getDateString(data.atStart)}
      </div>
      <div className={styles.average}>
        {data && data.average.toFixed(1)}
      </div>
      <div className={styles.measurements}>
        {data && `${data.items.length} measurements`}
      </div>
    </div>
  );
}
