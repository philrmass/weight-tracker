import styles from './Modal.module.css';

export default function Modal({
  isOpen = false,
  children,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.main}>
      <div className={styles.modal}>
        { children }
      </div>
    </div>
  );
}
