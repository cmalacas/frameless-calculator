import React from 'react';
import ReactDOM from 'react-dom';
import Silicone from './Page/Silicone';
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
      document.getElementById('silicone')
    );
  };

  document.addEventListener('DOMContentLoaded', function() {

    var element = document.getElementById('silicone');

    if ( typeof element !== 'undefined' && element !== null) {

        renderApp(Silicone);

    }


  });


  if (module.hot) {
    module.hot.accept('./Page/Silicone', () => {
      const NextApp = require('./Page/Silicone').default;
      renderApp(NextApp);
    });
  }

  unregister();