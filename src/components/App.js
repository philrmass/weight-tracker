import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import GraphPage from './GraphPage';
import Home from './Home';
import Monthly from './Monthly';
import Weekly from './Weekly';

function App({ version }) {
  return (
    <main>
      <Switch>
        <Route path='/weight-tracker' exact><Home version={version} /></Route>
        <Route path='/weight-tracker/weekly'><Weekly /></Route>
        <Route path='/weight-tracker/monthly'><Monthly /></Route>
        <Route path='/weight-tracker/graph'><GraphPage /></Route>
        <Redirect from='*' to='/weight-tracker' />
      </Switch>
    </main>
  );
}

App.propTypes = {
  version: PropTypes.string.isRequired,
};

export default App;
