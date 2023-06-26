import React from 'react';
import ReactDOM from 'react-dom';
import _3mmPackers from './Page/3mmPackers';
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
      document.getElementById('3mm-packers')
    );
  };

  document.addEventListener('DOMContentLoaded', function() {

    var element = document.getElementById('3mm-packers');

    if ( typeof element !== 'undefined' && element !== null) {

        renderApp(_3mmPackers);

    }


  });


  if (module.hot) {
    module.hot.accept('./Page/3mmPackers', () => {
      const NextApp = require('./Page/3mmPackers').default;
      renderApp(NextApp);
    });
  }

  unregister();