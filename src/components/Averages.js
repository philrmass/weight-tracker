import classnames from 'classnames';
import Icon from 'utilities/Icon';
import styles from './Averages.module.css';

export default function Averages({
  eras,
  getDateString,
  trackingStartAt,
}) {
  const renderDiff = (diff) => {
    const value = Math.abs(diff);
    const classes = classnames(
      styles.icon,
      {
        [styles.up]: diff > 0,
        [styles.down]: diff < 0,
      },
    );
    let icon = 'flat';
    let sign = '';

    if (diff > 0) {
      icon = 'caretUp';
      sign = '+';
    } else if (diff < 0) {
      icon = 'caretDown';
      sign = '-';
    }

    return (
      <div className={styles.diff}>
        <Icon name={icon} className={classes} />
        { `${sign} ${value.toFixed(1)}` }
      </div>
    );
  };

  const renderTracking = (era, index) => {
    if (trackingStartAt < era.atStart) {
      const lastEra = eras[index + 1];

      if (lastEra) {
        return renderDiff(era.average - lastEra.average);
      }
    } else if (trackingStartAt < era.atEnd) {
      return renderDiff(0);
    }

    return null;
  };

  return (
    <ul>
      {eras.map((era, index) => (
        <li
          key={era.atStart}
          className={styles.era}
        >
          <div className={styles.item}>
            <div>
              {getDateString(era.atStart)}
            </div>
            <div className={styles.count}>
              {`${era.items.length} measurements`}
            </div>
            <div className={styles.average}>
              <span>
                {era.average.toFixed(1)}
              </span>
              <span className={styles.stddev}>
                {`\u00b1 ${era.stdDev.toFixed(1)}`}
              </span>
            </div>
            { renderTracking(era, index) }
          </div>
        </li>
      )) }
    </ul>
  );
}
