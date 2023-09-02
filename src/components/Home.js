import { useEffect, useState } from 'preact/hooks';
import { useLocalStorage } from 'utilities/hooks';
import { calculateWeeks, calculateMonths } from '../utilities/averages';
import { getWeek, getMonth, inSameMonth } from '../utilities/time';
import { version } from '../../package.json';
import Average from './Average';
import Backup from './Backup';
import Input from './Input';
import Graph from './Graph';
import Modal from './Modal';
import Options from './Options';
import Weights from './Weights';
import styles from './Home.module.css';
// ??? remove unused utilities
// import { importData } from '../../utilities/data';
// import { getObject, setObject } from '../../utilities/storage';
// import { demoData } from './demoData.js';

function checkBackup(weights, at) {
  if (weights.length < 10) {
    return false;
  }
  return !inSameMonth(weights[0].at, at);
}

export default function Home() {
  const [weights, setWeights] = useLocalStorage('weightTrackerAll', []);
  // ??? add goalStart in storage
  const [weeks, setWeeks] = useState(false);
  const [months, setMonths] = useState(false);
  const [backupOpen, setBackupOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setWeeks(calculateWeeks(weights));
    setMonths(calculateMonths(weights));
  }, [weights]);

  const addWeight = (weight, at) => {
    const value = { weight, at };
    setBackupOpen(checkBackup(weights, at));
    setWeights((all) => [value, ...all]);
  };

  const removeWeight = (at) => {
    setWeights((all) => all.filter((val) => val.at !== at));
  };

  const importWeights = () => {
    /*
    const { all, stats } = importData(state.all, action.items);
    const message = getImportMessage(stats);

    function getImportMessage(stats) {
      return `Added ${stats.added} measurements\n` +
        ` to ${stats.existing} existing measurements,\n` +
        ` removed ${stats.duplicates} duplicates\n` +
        ` for a total of ${stats.all}`;
    }
    */
  };

  const exportWeights = () => {
    /*
      const message = `Exported ${action.count} measurements`;
    */
  };

  // ??? change history.push to route
  return (
    <>
      <main className={styles.main}>
        <Input
          addWeight={addWeight}
          setMenuOpen={setMenuOpen}
        />
        <div className={styles.weights}>
          <Weights
            weights={weights}
            removeWeight={removeWeight}
          />
        </div>
        <div className={styles.averages}>
          <div
            className={styles.week}
            onClick={() => history.push('/weight-tracker/weekly')}
          >
            <Average
              data={weeks[0]}
              getDateString={getWeek}
            />
          </div>
          <div
            className={styles.month}
            onClick={() => history.push('/weight-tracker/monthly')}
          >
            <Average
              data={months[0]}
              getDateString={getMonth}
            />
          </div>
        </div>
        <div
          className={styles.graph}
          onClick={() => history.push('/weight-tracker/graph')}
        >
          <Graph />
          <div className={styles.version}>
            {`v ${version}`}
          </div>
        </div>
      </main>
      <Modal isOpen={menuOpen}>
        <Options
          onImport={importWeights}
          onExport={exportWeights}
          onClose={() => setMenuOpen(false)}
        />
      </Modal>
      <Modal isOpen={backupOpen}>
        <Backup
          onExport={exportWeights}
          onClose={() => setBackupOpen(false)}
        />
        BACKUP
      </Modal>
    </>
  );
}
