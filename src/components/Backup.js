import styles from './Backup.module.css';

export default function Backup({
  onExport,
  onClose,
}) {
  // ??? implememt Backup
  console.log('BACKUP', typeof onExport, typeof onClose);

  return (
    <div className={styles.main}>
      BACKUP
    </div>
  );
}
/*
  function buildSaveModal() {
    return (
      <div className={styles.save}>
        Would you like to back up your data?
        <div className={styles.saveButtons}>
          <button onClick={verifySave}>
            Save
          </button>
          <button onClick={() => setShowOpen(false)}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  function verifySave() {
    setShowOpen(false);
    const filePath = getDataFilePath();
    saveData(filePath, weights);
  }
  */
