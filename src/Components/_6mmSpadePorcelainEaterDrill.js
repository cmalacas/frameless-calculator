import React from 'react';
import ReactDOM from 'react-dom';
import _6mmSpadePorcelainEaterDrill from './Page/6mmSpadePorcelainEaterDrill';
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
      document.getElementById('6mm-spade-porcelain-eater-drill')
    );
  };

  document.addEventListener('DOMContentLoaded', function() {

    var element = document.getElementById('6mm-spade-porcelain-eater-drill');

    if ( typeof element !== 'undefined' && element !== null) {

        renderApp(_6mmSpadePorcelainEaterDrill);

    }


  });


  if (module.hot) {
    module.hot.accept('./Page/6mmSpadePorcelainEaterDrill', () => {
      const NextApp = require('./Page/6mmSpadePorcelainEaterDrill').default;
      renderApp(NextApp);
    });
  }

  unregister();