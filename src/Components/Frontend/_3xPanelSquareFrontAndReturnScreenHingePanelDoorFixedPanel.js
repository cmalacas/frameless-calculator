import React from 'react';
import ReactDOM from 'react-dom';
import _3xPanelSquareFrontAndReturnScreenHingePanelDoorFixedPanel from './Components/3xPanelSquareFrontAndReturnScreenHingePanelDoorFixedPanel';
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
      document.getElementById('3-x-panel-square-front-and-return-screen-hinge-panel-door-fixed-panel')
    );
  };

  document.addEventListener('DOMContentLoaded', function() {

    var element = document.getElementById('3-x-panel-square-front-and-return-screen-hinge-panel-door-fixed-panel');

    if ( typeof element !== 'undefined' && element !== null) {

        renderApp(_3xPanelSquareFrontAndReturnScreenHingePanelDoorFixedPanel);

    }


  });


  if (module.hot) {
    module.hot.accept('./Components/3xPanelSquareFrontAndReturnScreenHingePanelDoorFixedPanel', () => {
      const NextApp = require('./Components/3xPanelSquareFrontAndReturnScreenHingePanelDoorFixedPanel').default;
      renderApp(NextApp);
    });
  }

  unregister();