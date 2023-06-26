import React from 'react';
import ReactDOM from 'react-dom';
import _3panelInlineScreenHingePanelDoorFixedPanel from './Components/3panelInlineScreenHingePanelDoorFixedPanel';
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
      document.getElementById('3-panel-inline-screen-hinge-panel-door-fixed-panel')
    );
  };

  document.addEventListener('DOMContentLoaded', function() {

    var element = document.getElementById('3-panel-inline-screen-hinge-panel-door-fixed-panel');

    if ( typeof element !== 'undefined' && element !== null) {

        renderApp(_3panelInlineScreenHingePanelDoorFixedPanel);

    }


  });


  if (module.hot) {
    module.hot.accept('./Components/3panelInlineScreenHingePanelDoorFixedPanel', () => {
      const NextApp = require('./Components/3panelInlineScreenHingePanelDoorFixedPanel').default;
      renderApp(NextApp);
    });
  }

  unregister();