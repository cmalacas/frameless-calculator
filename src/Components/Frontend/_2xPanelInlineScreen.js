import React from 'react';
import ReactDOM from 'react-dom';
import _2xPanelInlineScreen from './Components/2xPanelInlineScreen';
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
      document.getElementById('2-x-panel-inline-screen')
    );
  };

  document.addEventListener('DOMContentLoaded', function() {

    var element = document.getElementById('2-x-panel-inline-screen');

    if ( typeof element !== 'undefined' && element !== null) {

        renderApp(_2xPanelInlineScreen);

    }


  });


  if (module.hot) {
    module.hot.accept('./Components/FixedPanelShowerScreen', () => {
      const NextApp = require('./Components/FixedPanelShowerScreen').default;
      renderApp(NextApp);
    });
  }

  unregister();