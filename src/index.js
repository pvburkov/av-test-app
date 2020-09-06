import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import App from 'modules/App';
import reducer from 'store/reducers';

const initialState = {
  notifications: []
};

const store = process.env.NODE_ENV === 'development'
  ? createStore(reducer, initialState, applyMiddleware(logger))
  : createStore(reducer, initialState);

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
