import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import './config/reactotronConfig';
import { ToastContainer } from 'react-toastify';
import Routes from './routes/_index';

import history from './config/history';
import { store, persistor } from './store';
import GlobalStyles from './config/globalStyles';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Routes />
          <GlobalStyles />
          <ToastContainer autoClose={3000} />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
