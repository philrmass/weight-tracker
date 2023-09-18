import styles from './Backup.module.css';

export default function Backup({
  onExport,
  onClose,
}) {
  const handleSave = () => {
    onExport();
    onClose();
  };

  return (
    <div>
      Would you like to back up your data?
      <div className={styles.buttons}>
        <button onClick={handleSave}>
          Save
        </button>
        <button onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
