import React from 'react';
import ReactDOM from 'react-dom';
import HingedPanel from './Page/HingedPanel';
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
      document.getElementById('hinged-panel')
    );
  };

  document.addEventListener('DOMContentLoaded', function() {

    var element = document.getElementById('hinged-panel');

    if ( typeof element !== 'undefined' && element !== null) {

        renderApp(HingedPanel);

    }


  });


  if (module.hot) {
    module.hot.accept('./Page/HingedPanel', () => {
      const NextApp = require('./Page/HingedPanel').default;
      renderApp(NextApp);
    });
  }

  unregister();