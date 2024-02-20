// index.js
// Point d'entrée de l'application, fournissant le store Redux à l'ensemble de l'application.

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './components/store';
import App from './App';

// Rend le composant App à l'intérieur du Provider, qui donne accès au store à l'ensemble de l'application
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
