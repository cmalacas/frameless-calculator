import React from 'react';
import ReactDOM from 'react-dom';
import GlassShelf from './Page/GlassShelf';
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
      document.getElementById('glass-shelf')
    );
  };

  document.addEventListener('DOMContentLoaded', function() {

    var element = document.getElementById('glass-shelf');

    if ( typeof element !== 'undefined' && element !== null) {

        renderApp(GlassShelf);

    }


  });


  if (module.hot) {
    module.hot.accept('./Page/GlassShelf', () => {
      const NextApp = require('./Page/GlassShelf').default;
      renderApp(NextApp);
    });
  }

  unregister();