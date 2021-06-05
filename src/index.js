import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./index.css";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducer';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


