import React from 'react';
import ReactDOM from 'react-dom';
import _90DegreeWallToGlassHinge from './Page/90DegreeWallToGlassHinge';
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
      document.getElementById('90-degree-wall-to-glass-hinge')
    );
  };

  document.addEventListener('DOMContentLoaded', function() {

    var element = document.getElementById('90-degree-wall-to-glass-hinge');

    if ( typeof element !== 'undefined' && element !== null) {

        renderApp(_90DegreeWallToGlassHinge);

    }


  });


  if (module.hot) {
    module.hot.accept('./Page/90DegreeWallToGlassHinge', () => {
      const NextApp = require('./Page/90DegreeWallToGlassHinge').default;
      renderApp(NextApp);
    });
  }

  unregister();