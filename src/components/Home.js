import { useState } from 'preact/hooks';
import { route } from 'preact-router';
import { loadJsonFile, saveJsonFile } from 'utilities/file';
import { getDataFilePath, getImportMessage, importData } from '../utilities/data';
import { getWeek, getMonth, inSameMonth } from '../utilities/time';
import { version } from '../../package.json';
import Average from './Average';
import Backup from './Backup';
import Input from './Input';
import Graph from './Graph';
import Message from './Message';
import Modal from './Modal';
import Options from './Options';
import Weights from './Weights';
import styles from './Home.module.css';
// ??? implement GraphPage
// ??? implement Backup
// ??? remove unused utilities

// averages.js
//  calculateWeeks
//  calculateMonths

// data.js
//  getDataFilePath
//  getImportMessage
//  importData

// graph.js
//  calcAtView
//  getAtLimits
//  adjustAtView
//  render

// time.js
// getDate 
// getDays 
// getMonth
// getTime 
// getWeek 
// inSameMonth 

function checkBackup(weights, at) {
  if (weights.length < 10) {
    return false;
  }
  return !inSameMonth(weights[0].at, at);
}

export default function Home({
  months,
  weeks,
  trackingStartAt,
  weights,
  setTrackingStartAt,
  setWeights,
}) {
  const [backupOpen, setBackupOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [message, setMessage] = useState(null);

  const addWeight = (weight, at) => {
    const value = { weight, at };
    setBackupOpen(checkBackup(weights, at));
    setWeights((all) => [value, ...all]);
  };

  const removeWeight = (at) => {
    setWeights((all) => all.filter((val) => val.at !== at));
  };

  const importWeights = async () => {
    const data = await loadJsonFile();
    const { all, stats } = importData(weights, data);

    setWeights(all);
    setMenuOpen(false);
    setMessage(getImportMessage(stats));
  };

  const exportWeights = () => {
    saveJsonFile(getDataFilePath(), weights);
    setMenuOpen(false);
  };

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
            onClick={() => route('/weekly')}
          >
            <Average
              data={weeks[0]}
              getDateString={getWeek}
            />
          </div>
          <div
            className={styles.month}
            onClick={() => route('/monthly')}
          >
            <Average
              data={months[0]}
              getDateString={getMonth}
            />
          </div>
        </div>
        <div
          className={styles.graph}
          onClick={() => route('/graph')}
        >
          <Graph weights={weights} />
          <div className={styles.version}>
            {`v ${version}`}
          </div>
        </div>
      </main>
      <Modal isOpen={menuOpen}>
        <Options
          trackingStartAt={trackingStartAt}
          setTrackingStartAt={setTrackingStartAt}
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
      </Modal>
      <Modal isOpen={Boolean(message)}>
        <Message 
          message={message}
          onClose={() => setMessage(null)}
        />
      </Modal>
    </>
  );
}
