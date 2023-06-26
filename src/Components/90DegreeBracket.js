import React from 'react';
import ReactDOM from 'react-dom';
import _90DegreeBracket from './Page/90DegreeBracket';
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
      document.getElementById('90-degree-bracket')
    );
  };

  document.addEventListener('DOMContentLoaded', function() {

    var element = document.getElementById('90-degree-bracket');

    if ( typeof element !== 'undefined' && element !== null) {

        renderApp(_90DegreeBracket);

    }


  });


  if (module.hot) {
    module.hot.accept('./Page/90DegreeBracket', () => {
      const NextApp = require('./Page/90DegreeBracket').default;
      renderApp(NextApp);
    });
  }

  unregister();