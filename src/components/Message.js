import Icon from 'utilities/Icon';
import styles from './Message.module.css';

export default function Message({
  message,
  onClose,
}) {
  return (
    <>
      <div className={styles.header}>
        <button onClick={onClose}>
          <Icon name="cross" className="icon" />
        </button>
      </div >
      <div className={styles.message}>
        { message }
      </div>
    </>
  );
}
