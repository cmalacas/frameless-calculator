import React from 'react';
import ReactDOM from 'react-dom';
import _2xPanelInlineScreenHingePanelDoor from './Components/2xPanelInlineScreenHingePanelDoor';
import {BrowserRouter as Router} from 'react-router-dom';
import { unregister } from '../registerServiceWorker';

import configureStore from '../../config/configureStore'; 

import { Provider } from 'react-redux';

const store = configureStore(); 

const renderApp = Component => {
    ReactDOM.render(
      <Provider store={ store }>
        <Router>
          <Component />
        </Router>
      </Provider>,
      document.getElementById('2-x-panel-inline-screen-hinge-panel-door')
    );
  };

  document.addEventListener('DOMContentLoaded', function() {

    var element = document.getElementById('2-x-panel-inline-screen-hinge-panel-door');

    if ( typeof element !== 'undefined' && element !== null) {

        renderApp(_2xPanelInlineScreenHingePanelDoor);

    }


  });


  if (module.hot) {
    module.hot.accept('./Components/_2xPanelInlineScreenHingePanelDoor', () => {
      const NextApp = require('./Components/_2xPanelInlineScreenHingePanelDoor').default;
      renderApp(NextApp);
    });
  }

  unregister();