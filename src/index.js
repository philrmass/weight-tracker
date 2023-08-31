import Routes from './components/Routes';
import './styles/normalize.css';
import './style';

// ??? restore or replace
// import store from './redux/store';
// import { BrowserRouter } from 'react-router-dom';
//  <Provider store={store}>
//    <BrowserRouter>
//      <App version={version} />
//    </BrowserRouter>
//  </Provider>,
export default function App() {
  return <Routes />;
}
