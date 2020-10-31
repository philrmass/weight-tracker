import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getWeek, getMonth } from '../utilities/time';
import styles from '../styles/Home.module.css';
import Average from './Average';
import Graph from './Graph';
import Input from './Input';
import Modal from './Modal';
import Options from './Options';
import Weights from './Weights';

function Home({
  version,
  weeks,
  months,
  goal,
  isOptionsOpen,
}) {
  const history = useHistory();

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
                handleClick={() => history.push('/weekly')}
              />
            </div>
            <div className={styles.spacer}></div>
            <div className={styles.month}>
              <Average
                data={months[0]}
                goal={goal}
                getDateString={getMonth}
                handleClick={() => history.push('/monthly')}
              />
            </div>
          </div>
          <div
            className={styles.graph}
            onClick={() => history.push('/graph')}
          >
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

Home.propTypes = {
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

export default connect(mapState)(Home);
