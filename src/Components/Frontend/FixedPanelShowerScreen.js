import React from 'react';
import ReactDOM from 'react-dom';
import FixedPanelShowerScreen from './Components/FixedPanelShowerScreen';

//import {BrowserRouter as Router} from 'react-router-dom';

//import { unregister } from '../registerServiceWorker';

//import configureStore from '../../config/configureStore'; 

//import { Provider } from 'react-redux'; 

//const store = configureStore(); 

const renderApp = Component => {
    ReactDOM.render(
          <Component />
        ,
      document.getElementById('fixed-panel-shower-screen')
    );
  };

  document.addEventListener('DOMContentLoaded', function() {

    var element = document.getElementById('fixed-panel-shower-screen');

    if ( typeof element !== 'undefined' && element !== null) {

        renderApp(FixedPanelShowerScreen);

    }


  });


  /* if (module.hot) {
    module.hot.accept('./Components/FixedPanelShowerScreen', () => {
      const NextApp = require('./Components/FixedPanelShowerScreen').default;
      renderApp(NextApp);
    });
  } */

  //unregister();