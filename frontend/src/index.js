import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import Routing from './Components/Routing'
import Store from './Store/storeFile'
import "./index.scss"



ReactDOM.render(
  <Provider store={Store}>
    <Routing />
  </Provider>,
  document.getElementById('root')
);


