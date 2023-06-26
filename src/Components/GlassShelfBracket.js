import React from 'react';
import ReactDOM from 'react-dom';
import GlassShelfBracket from './Page/GlassShelfBracket';
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
      document.getElementById('glass-shelf-bracket')
    );
  };

  document.addEventListener('DOMContentLoaded', function() {

    var element = document.getElementById('glass-shelf-bracket');

    if ( typeof element !== 'undefined' && element !== null) {

        renderApp(GlassShelfBracket);

    }


  });


  if (module.hot) {
    module.hot.accept('./Page/GlassShelfBracket', () => {
      const NextApp = require('./Page/GlassShelfBracket').default;
      renderApp(NextApp);
    });
  }

  unregister();