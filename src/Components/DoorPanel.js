import React from 'react';
import ReactDOM from 'react-dom';
import DoorPanel from './Page/DoorPanel';
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
      document.getElementById('door-panel')
    );
  };

  document.addEventListener('DOMContentLoaded', function() {

    var element = document.getElementById('door-panel');

    if ( typeof element !== 'undefined' && element !== null) {

        renderApp(DoorPanel);

    }


  });


  if (module.hot) {
    module.hot.accept('./Page/DoorPanel', () => {
      const NextApp = require('./Page/DoorPanel').default;
      renderApp(NextApp);
    });
  }

  unregister();