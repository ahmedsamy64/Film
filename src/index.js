import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./index.css";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducer';
import { BrowserRouter } from 'react-router-dom';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);


