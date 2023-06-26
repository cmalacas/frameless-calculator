import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import { unregister } from './registerServiceWorker';

import configureStore from '../config/configureStore'; 

import { Provider } from 'react-redux';

const store = configureStore(); 

const renderApp = Component => {
    ReactDOM.render(
      <Provider store={ store }>
        <Router>
          <Component />
        </Router>
      </Provider>,
      document.getElementById('frameless-calculator-app')
    );
  };

  document.addEventListener('DOMContentLoaded', function() {

    var element = document.getElementById('frameless-calculator-app');

    if ( typeof element !== 'undefined' && element !== null) {

        renderApp(App);

    }


  });


  if (module.hot) {
    module.hot.accept('./App', () => {
      const NextApp = require('./App').default;
      renderApp(NextApp);
    });
  }

  unregister();