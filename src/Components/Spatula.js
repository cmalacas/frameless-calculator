import React from 'react';
import ReactDOM from 'react-dom';
import Spatula from './Page/Spatula';
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
      document.getElementById('spatula')
    );
  };

  document.addEventListener('DOMContentLoaded', function() {

    var element = document.getElementById('spatula');

    if ( typeof element !== 'undefined' && element !== null) {

        renderApp(Spatula);

    }


  });


  if (module.hot) {
    module.hot.accept('./Page/Spatula', () => {
      const NextApp = require('./Page/Spatula').default;
      renderApp(NextApp);
    });
  }

  unregister();