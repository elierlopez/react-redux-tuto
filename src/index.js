import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import store from './store'
import { Provider } from 'react-redux'
import { replaceProducts } from './actionCreators'
store.dispatch(replaceProducts())
ReactDOM.render(
  < Provider store={store} >
    <App />
  </Provider >,
  document.getElementById('root')
);
