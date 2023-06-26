import React from 'react';
import ReactDOM from 'react-dom';
import _180DegreeBracket from './Page/180DegreeBracket';
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
      document.getElementById('180-degree-bracket')
    );
  };

  document.addEventListener('DOMContentLoaded', function() {

    var element = document.getElementById('180-degree-bracket');

    if ( typeof element !== 'undefined' && element !== null) {

        renderApp(_180DegreeBracket);

    }


  });


  if (module.hot) {
    module.hot.accept('./Page/180DegreeBracket', () => {
      const NextApp = require('./Page/180DegreeBracket').default;
      renderApp(NextApp);
    });
  }

  unregister();