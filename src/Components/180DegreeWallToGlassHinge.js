import React from 'react';
import ReactDOM from 'react-dom';
import _180DegreeWallToGlassHinge from './Page/180DegreeWallToGlassHinge';
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
      document.getElementById('180-degree-wall-to-glass-hinge')
    );
  };

  document.addEventListener('DOMContentLoaded', function() {

    var element = document.getElementById('180-degree-wall-to-glass-hinge');

    if ( typeof element !== 'undefined' && element !== null) {

        renderApp(_180DegreeWallToGlassHinge);

    }


  });


  if (module.hot) {
    module.hot.accept('./Page/180DegreeWallToGlassHinge', () => {
      const NextApp = require('./Page/180DegreeWallToGlassHinge').default;
      renderApp(NextApp);
    });
  }

  unregister();