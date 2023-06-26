import React from 'react';
import ReactDOM from 'react-dom';
import DoorKnob from './Page/DoorKnob';
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
      document.getElementById('door-knob')
    );
  };

  document.addEventListener('DOMContentLoaded', function() {

    var element = document.getElementById('door-knob');

    if ( typeof element !== 'undefined' && element !== null) {

        renderApp(DoorKnob);

    }


  });


  if (module.hot) {
    module.hot.accept('./Page/DoorKnob', () => {
      const NextApp = require('./Page/DoorKnob').default;
      renderApp(NextApp);
    });
  }

  unregister();