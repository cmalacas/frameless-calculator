import React from 'react';
import ReactDOM from 'react-dom';
import DoorSeal from './Page/DoorSeal';
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
      document.getElementById('door-seal')
    );
  };

  document.addEventListener('DOMContentLoaded', function() {

    var element = document.getElementById('door-seal');

    if ( typeof element !== 'undefined' && element !== null) {

        renderApp(DoorSeal);

    }


  });


  if (module.hot) {
    module.hot.accept('./Page/DoorSeal', () => {
      const NextApp = require('./Page/DoorSeal').default;
      renderApp(NextApp);
    });
  }

  unregister();