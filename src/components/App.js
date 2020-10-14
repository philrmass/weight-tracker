import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//import { loadData } from '../utilities/files';
import { getWeek, getMonth } from '../utilities/times';
import { importWeights, setOptionsOpen } from '../redux/weights/actions';
import styles from '../styles/App.module.css';
import Average from './Average';
import Graph from './Graph';
import Input from './Input';
import Modal from './Modal';
import Options from './Options';
import Weights from './Weights';

function App({
  weeks,
  months,
  isOptionsOpen,
  importWeights,
  setOptionsOpen,
}) {
  console.log('OPT', isOptionsOpen, typeof importWeights, typeof setOptionsOpen);
  //??? move to App
  //??? add Modal around options
  /*
  async function importFile() {
    importWeights(await loadData());
  }
  */

  return (
    <Fragment>
      <main className={styles.main}>
        <div className={styles.input}>
          <Input />
        </div>
        <div className={styles.weights}>
          <Weights />
        </div>
        <div className={styles.averages}>
          <div className={styles.week}>
            <Average
              data={weeks[0]}
              getDateString={getWeek}
              handleClick={() => console.log('week click')}
            />
          </div>
          <div className={styles.spacer}></div>
          <div className={styles.month}>
            <Average
              data={months[0]}
              getDateString={getMonth}
              handleClick={() => console.log('month click')}
            />
          </div>
        </div>
        <div className={styles.graph}>
          <Graph />
        </div>
      </main>
      <Modal isOpen={isOptionsOpen}>
        <Options />
      </Modal>
    </Fragment>
  );
}

App.propTypes = {
  weeks: PropTypes.arrayOf(PropTypes.object).isRequired,
  months: PropTypes.arrayOf(PropTypes.object).isRequired,
  isOptionsOpen: PropTypes.bool.isRequired,
  importWeights: PropTypes.func.isRequired,
  setOptionsOpen: PropTypes.func.isRequired,
};

const mapState = (state) => ({
  weeks: state.weights.weeks,
  months: state.weights.months,
  isOptionsOpen: state.weights.isOptionsOpen,
});

const mapDispatch = {
  importWeights,
  setOptionsOpen,
};

export default connect(mapState, mapDispatch)(App);
