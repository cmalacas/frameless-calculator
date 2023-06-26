import React from 'react';
import ReactDOM from 'react-dom';
import HalfRoundWaterBar from './Page/HalfRoundWaterBar';
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
      document.getElementById('half-round-water-bar')
    );
  };

  document.addEventListener('DOMContentLoaded', function() {

    var element = document.getElementById('half-round-water-bar');

    if ( typeof element !== 'undefined' && element !== null) {

        renderApp(HalfRoundWaterBar);

    }


  });


  if (module.hot) {
    module.hot.accept('./Page/HalfRoundWaterBar', () => {
      const NextApp = require('./Page/HalfRoundWaterBar').default;
      renderApp(NextApp);
    });
  }

  unregister();