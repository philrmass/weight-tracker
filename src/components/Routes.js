import { Router } from 'preact-router';
import { createHashHistory } from 'history';
import GraphPage from './GraphPage';
import Home from './Home';
import Redirect from './Redirect';
// ??? restore routes
// import Monthly from './Monthly';
// import Weekly from './Weekly';

export default function Routes() {
  return (
    <Router history={createHashHistory()}>
      <Home path="/" />
      <GraphPage path='/graph' />
      <Redirect default to="/" />
      {/*
        <Route path='/weight-tracker/weekly'><Weekly /></Route>
        <Route path='/weight-tracker/monthly'><Monthly /></Route>
        */}
    </Router>
  );
}
