import { useEffect, useState } from 'preact/hooks';
import { Router } from 'preact-router';
import { createHashHistory } from 'history';
import { useLocalStorage } from 'utilities/hooks';
import { getIconSvgs } from 'utilities/Icon';
import { calculateWeeks, calculateMonths } from '../utilities/averages';
import GraphPage from './GraphPage';
import Home from './Home';
import Monthly from './Monthly';
import Redirect from './Redirect';
import Weekly from './Weekly';

const icons = [
  'cross',
  'menu',
];

export default function Routes() {
  const [weights, setWeights] = useLocalStorage('wtWeights', []);
  const [trackingStartAt, setTrackingStartAt] = useLocalStorage('wtStartAt', null);
  const [weeks, setWeeks] = useState([]);
  const [months, setMonths] = useState([]);

  useEffect(() => {
    setWeeks(calculateWeeks(weights));
    setMonths(calculateMonths(weights));
  }, [weights]);

  return (
    <>
      <Router history={createHashHistory()}>
        <Home
          path='/' 
          months={months}
          trackingStartAt={trackingStartAt}
          weeks={weeks}
          weights={weights}
          setTrackingStartAt={setTrackingStartAt}
          setWeights={setWeights}
        />
        <GraphPage path='/graph' />
        <Monthly
          path='/monthly'
          months={months}
          trackingStartAt={trackingStartAt}
        />
        <Weekly
          path='/weekly'
          trackingStartAt={trackingStartAt}
          weeks={weeks}
        />
        <Redirect default to="/" />
      </Router>
      { getIconSvgs(icons) }
    </>
  );
}
