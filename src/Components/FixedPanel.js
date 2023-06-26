import React from 'react';
import ReactDOM from 'react-dom';
import FixedPanel from './Page/FixedPanel';
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
      document.getElementById('fixed-panel')
    );
  };

  document.addEventListener('DOMContentLoaded', function() {

    var element = document.getElementById('fixed-panel');

    if ( typeof element !== 'undefined' && element !== null) {

        renderApp(FixedPanel);

    }


  });


  if (module.hot) {
    module.hot.accept('./Page/FixedPanel', () => {
      const NextApp = require('./Page/FixedPanel').default;
      renderApp(NextApp);
    });
  }

  unregister();