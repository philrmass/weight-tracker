import { getDate } from '../utilities/time';
import Icon from 'utilities/Icon';
import styles from './Options.module.css';

export default function Options({
  trackingStartAt,
  setTrackingStartAt,
  onClose,
  onExport,
  onImport,
}) {
  const handleDateChange = (value) => {
    const date = new Date(value);
    setTrackingStartAt(date.valueOf());
  };

  const renderStart = () => {
    if (!trackingStartAt) {
      return (
        <div className={styles.start}>
          <input
            className={styles.date}
            type='date'
            value={trackingStartAt}
            placeholder="OY!"
            onChange={(e) => handleDateChange(e.target.value)}
          />
        </div>
      );
    }

    return (
      <div className={styles.start}>
        { getDate(trackingStartAt) }
        <button onClick={() => setTrackingStartAt(null)}>
          <Icon name="cross" className="icon" />
        </button>
      </div>
    );
  };

  return (
    <>
      <div className={styles.header}>
        <button onClick={onClose}>
          <Icon name="cross" className="icon" />
        </button>
      </div >
      <div className={styles.options}>
        <div>
          <button onClick={onImport}>
            Import Weights
          </button>
        </div>
        <div>
          <button onClick={onExport}>
            Export Weights
          </button>
        </div>
        <div>
          Tracking Start:
          { renderStart() }
        </div>
      </div>
    </>
  );
}
