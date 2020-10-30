import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

//import { connect } from 'react-redux';

import GraphPage from './GraphPage';
import Monthly from './Monthly';
import Weekly from './Weekly';

/*
import { getWeek, getMonth } from '../utilities/time';
//import styles from '../styles/App.module.css';
import Average from './Average';
import Input from './Input';
import Modal from './Modal';
import Options from './Options';
import Weights from './Weights';
*/
import Home from './Home';

function App({ version }) {
  return (
    <main>
      <Switch>
        <Route path='/' render={() => <Home version={version} />} exact />
        <Route path='/weekly' component={Weekly} exact />
        <Route path='/monthly' component={Monthly} exact />
        <Route path='/graph' component={GraphPage} exact />
        <Redirect from='*' to='/' />
      </Switch>
    </main>
  );
}

App.propTypes = {
  version: PropTypes.string.isRequired,
};

/*
  version,
  weeks,
  months,
  goal,
  isOptionsOpen,
}) {
  return (
    <Fragment>
      <main className={styles.main}>
        <div className={styles.content}>
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
                goal={goal}
                getDateString={getWeek}
                handleClick={() => console.log('week click')}
              />
            </div>
            <div className={styles.spacer}></div>
            <div className={styles.month}>
              <Average
                data={months[0]}
                goal={goal}
                getDateString={getMonth}
                handleClick={() => console.log('month click')}
              />
            </div>
          </div>
          <div className={styles.graph}>
            <Graph />
          </div>
          <div className={styles.version}>
            {`v ${version}`}
          </div>
        </div>
      </main>
      <Modal isOpen={isOptionsOpen}>
        <Options />
      </Modal>
    </Fragment>
  );
}

App.propTypes = {
  version: PropTypes.string.isRequired,
  weeks: PropTypes.arrayOf(PropTypes.object).isRequired,
  months: PropTypes.arrayOf(PropTypes.object).isRequired,
  goal: PropTypes.object,
  isOptionsOpen: PropTypes.bool.isRequired,
};

const mapState = (state) => ({
  weeks: state.weights.weeks,
  months: state.weights.months,
  goal: state.weights.goal,
  isOptionsOpen: state.weights.isOptionsOpen,
});
*/

export default App;
